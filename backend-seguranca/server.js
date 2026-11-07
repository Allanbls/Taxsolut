'use strict';
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const rateLimit = require('express-rate-limit');
const pino = require('pino');
const { authenticator } = require('otplib');

const PROD = process.env.NODE_ENV === 'production';
const need = k => { if (!process.env[k]) { console.error('Variável ausente: ' + k); process.exit(1); } return process.env[k]; };
const SESSION_SECRET = need('SESSION_SECRET');
const DATA_KEY = Buffer.from(need('DATA_KEY'), 'base64');
if (DATA_KEY.length !== 32) { console.error('DATA_KEY deve ter 32 bytes (base64)'); process.exit(1); }
const ORIGINS = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);

/* ---------- LOGS (sem dados pessoais em claro) ---------- */
const log = pino({ level: process.env.LOG_LEVEL || 'info', redact: ['req.headers.cookie', 'req.headers.authorization'] });
const mask = s => String(s).replace(/\d(?=\d{2})/g, '*');
const audit = (evento, extra = {}) => log.info({ audit: true, evento, ...extra });

/* ---------- CRIPTOGRAFIA: AES-256-GCM para dados em repouso ---------- */
function encrypt(obj) {
  const iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv('aes-256-gcm', DATA_KEY, iv);
  const enc = Buffer.concat([c.update(JSON.stringify(obj), 'utf8'), c.final()]);
  return Buffer.concat([iv, c.getAuthTag(), enc]).toString('base64');
}
function decrypt(b64) {
  const b = Buffer.from(b64, 'base64');
  const d = crypto.createDecipheriv('aes-256-gcm', DATA_KEY, b.subarray(0, 12));
  d.setAuthTag(b.subarray(12, 28));
  return JSON.parse(Buffer.concat([d.update(b.subarray(28)), d.final()]).toString('utf8'));
}

/* ---------- VALIDAÇÃO E SANITIZAÇÃO ---------- */
const clean = (s, max) => String(s == null ? '' : s).normalize('NFC')
  .replace(/<[^>]*>/g, '')
  .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F​-‏‪-‮⁠-⁩﻿]/g, '')
  .replace(/[ \t]+/g, ' ').trim().slice(0, max);
const ASSUNTOS = ['Abertura de empresa', 'Troca de contador', 'MEI', 'Regularização de CPF ou CNPJ', 'Planejamento tributário', 'BPO financeiro', 'Outro assunto'];
function validarContato(b) {
  const nome = clean(b.nome, 80), mail = clean(b.email, 120), msg = clean(b.mensagem, 800);
  let tel = String(b.telefone || '').replace(/\D/g, ''); if (tel.length > 11 && tel.startsWith('55')) tel = tel.slice(2);
  const assunto = ASSUNTOS.includes(b.assunto) ? b.assunto : 'Outro assunto';
  const erros = [];
  if (!/^[\p{L}][\p{L}\s'.\-]{1,79}$/u.test(nome)) erros.push('nome');
  if (!((tel.length === 10 || tel.length === 11) && /^[1-9][1-9]/.test(tel) && (tel.length === 10 || tel[2] === '9'))) erros.push('telefone');
  if (mail && !/^[^\s@<>()\[\]\\,;:"]+@[^\s@<>()\[\]\\,;:"]+\.[A-Za-z]{2,}$/.test(mail)) erros.push('email');
  return { erros, dados: { nome, telefone: tel, email: mail, assunto, mensagem: msg } };
}
const eq = (a, b) => { const x = Buffer.from(String(a)), y = Buffer.from(String(b)); return x.length === y.length && crypto.timingSafeEqual(x, y); };
function senhaOk(senha) {
  const [saltHex, hashHex] = String(process.env.CLIENT_PASS_HASH || ':').split(':');
  if (!saltHex || !hashHex) return false;
  const h = crypto.scryptSync(String(senha), Buffer.from(saltHex, 'hex'), 64);
  return crypto.timingSafeEqual(h, Buffer.from(hashHex, 'hex'));
}

/* ---------- APP ---------- */
const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(helmet({ hsts: { maxAge: 63072000, includeSubDomains: true, preload: true }, crossOriginResourcePolicy: { policy: 'same-site' } }));
app.use((req, res, next) => { // HTTPS obrigatório em produção
  if (PROD && req.secure === false) return res.redirect(301, 'https://' + req.headers.host + req.originalUrl);
  next();
});

/* CORS: apenas origens autorizadas */
app.use(cors({
  origin: (origin, cb) => (!origin || ORIGINS.includes(origin)) ? cb(null, true) : cb(null, false),
  methods: ['GET', 'POST'], allowedHeaders: ['Content-Type'], credentials: true, maxAge: 600
}));
app.use((req, res, next) => { // bloqueia explicitamente origem não listada
  const o = req.headers.origin;
  if (o && !ORIGINS.includes(o)) { audit('cors_bloqueado', { origem: o, ip: req.ip }); return res.status(403).json({ erro: 'origem não autorizada' }); }
  next();
});
app.use(express.json({ limit: '10kb' }));

/* RATE LIMIT */
const limite = (max, min, msg) => rateLimit({ windowMs: min * 60000, max, standardHeaders: true, legacyHeaders: false,
  handler: (req, res) => { audit('rate_limit', { rota: req.path, ip: req.ip }); res.status(429).json({ erro: msg }); } });
app.use(limite(120, 15, 'Muitas requisições. Tente novamente em instantes.'));

/* SESSÃO: cookie httpOnly, 15 min de inatividade (renovável) e 8 h no máximo */
const IDLE = 15 * 60 * 1000, ABS = 8 * 3600 * 1000;
app.use(session({
  name: 'ts.sid', secret: SESSION_SECRET, resave: false, saveUninitialized: false, rolling: true,
  cookie: { httpOnly: true, secure: PROD, sameSite: 'strict', maxAge: IDLE }
  // Produção: troque o MemoryStore por Redis (connect-redis).
}));
const exigeSessao = (req, res, next) => {
  const s = req.session;
  if (!s.auth || Date.now() - s.criada > ABS) { if (s.auth) audit('sessao_expirada', { ip: req.ip }); return s.destroy(() => res.status(401).json({ erro: 'sessão expirada' })); }
  next();
};

/* ROTAS */
app.post('/api/contato', limite(5, 10, 'Você já enviou algumas mensagens. Aguarde alguns minutos.'), (req, res) => {
  if (req.body && req.body.website) return res.json({ ok: true }); // campo-isca
  const { erros, dados } = validarContato(req.body || {});
  if (erros.length) return res.status(400).json({ erro: 'dados inválidos', campos: erros });
  fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
  fs.appendFileSync(path.join(__dirname, 'data', 'leads.enc'), encrypt({ ...dados, em: new Date().toISOString() }) + '\n', { mode: 0o600 });
  audit('contato_recebido', { assunto: dados.assunto, tel: mask(dados.telefone) });
  res.status(201).json({ ok: true });
});

const falhas = new Map(); // bloqueio por documento + IP
app.post('/api/login', limite(10, 15, 'Muitas tentativas. Aguarde 15 minutos.'), (req, res) => {
  const doc = String((req.body || {}).documento || '').replace(/\D/g, '');
  const chave = doc + '|' + req.ip, f = falhas.get(chave) || { n: 0, ate: 0 };
  if (Date.now() < f.ate) return res.status(423).json({ erro: 'conta temporariamente bloqueada' });
  const ok = eq(doc, process.env.CLIENT_DOC || '') & senhaOk((req.body || {}).senha || '') &
    (authenticator.check(String((req.body || {}).codigo || ''), process.env.CLIENT_TOTP_SECRET || 'AAAAAAAAAAAAAAAA') ? 1 : 0);
  if (!ok) {
    f.n++; if (f.n >= 5) { f.ate = Date.now() + 15 * 60000; f.n = 0; }
    falhas.set(chave, f); audit('login_falhou', { doc: mask(doc), ip: req.ip });
    return res.status(401).json({ erro: 'credenciais inválidas' });
  }
  falhas.delete(chave);
  req.session.regenerate(() => { req.session.auth = true; req.session.criada = Date.now(); audit('login_ok', { doc: mask(doc), ip: req.ip }); res.json({ ok: true, expiraEmMin: 15 }); });
});
app.get('/api/sessao', exigeSessao, (req, res) => res.json({ ok: true }));
app.post('/api/logout', (req, res) => req.session.destroy(() => { res.clearCookie('ts.sid'); res.json({ ok: true }); }));

app.use((req, res) => res.status(404).json({ erro: 'não encontrado' }));
app.use((err, req, res, next) => { log.error({ err: err.message }); res.status(err.status === 400 ? 400 : 500).json({ erro: 'falha na requisição' }); });

if (require.main === module) app.listen(process.env.PORT || 3000, () => log.info('API TaxSolut no ar'));
module.exports = { app, encrypt, decrypt };
