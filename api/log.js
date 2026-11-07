'use strict';
/* Recebe avisos de erro do site e relatórios de CSP. Só grava no log do servidor (Vercel > Logs).
   Não guarda IP puro (só um hash curto com sal secreto), não usa cookies e descarta qualquer campo fora da lista. */
const crypto = require('crypto');

const MAX_BYTES = 4096;          // corpo máximo
const LIMITE = 20;               // requisições por IP por janela
const JANELA_MS = 60 * 1000;
const TIPOS = ['text/plain', 'application/json', 'application/csp-report', 'application/reports+json'];
const hits = new Map();          // melhor esforço por instância; para limite global use Vercel Firewall > Rate limiting
// Sal secreto: defina LOG_SALT na Vercel. Sem ele, usa um sal aleatório por instância (nunca um valor conhecido).
const SAL = process.env.LOG_SALT || crypto.randomBytes(16).toString('hex');
const EXTENSAO = /^(chrome|moz|safari|edge|webkit-masked-url)[-a-z]*:/i; // ruído de extensões do navegador

const fim = (res, codigo) => { res.statusCode = codigo; res.end(); };
const limpa = (v, n) => String(v == null ? '' : v).replace(/[\u0000-\u001f\u007f]/g, ' ').slice(0, n);
const semQuery = (v, n) => limpa(v, n * 2).replace(/[?#].*$/, '').slice(0, n);

function ipHash(req) {
  // Na Vercel, x-real-ip e x-vercel-forwarded-for vêm do próprio edge, não do visitante.
  const h = req.headers;
  const ip = String(h['x-real-ip'] || h['x-vercel-forwarded-for'] || h['x-forwarded-for'] || (req.socket && req.socket.remoteAddress) || '').split(',')[0].trim();
  return crypto.createHmac('sha256', SAL).update(ip).digest('hex').slice(0, 12);
}
function limitado(chave) {
  const agora = Date.now();
  const lista = (hits.get(chave) || []).filter(t => agora - t < JANELA_MS);
  lista.push(agora);
  hits.set(chave, lista);
  if (hits.size > 5000) hits.clear();
  return lista.length > LIMITE;
}
function origemOk(req) {
  const o = req.headers.origin || req.headers.referer;
  if (!o) return true;           // relatórios de CSP podem vir sem Origin
  try { return new URL(o).host === req.headers.host; } catch (e) { return false; }
}
function lerCorpo(req) {
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === 'string') return Promise.resolve(req.body);
    if (Buffer.isBuffer(req.body)) return Promise.resolve(req.body.toString('utf8'));
    try { return Promise.resolve(JSON.stringify(req.body)); } catch (e) { return Promise.resolve(''); }
  }
  return new Promise((ok, erro) => {
    let n = 0, estourou = false; const partes = [];
    req.on('data', c => { n += c.length; if (estourou) return; if (n > MAX_BYTES) { estourou = true; erro(new Error('grande')); } else partes.push(c); });
    req.on('end', () => ok(Buffer.concat(partes).toString('utf8')));
    req.on('error', erro);
  });
}
function normaliza(o) {
  if (o && o['csp-report']) {
    const r = o['csp-report'];
    const bloqueado = semQuery(r['blocked-uri'], 200);
    if (EXTENSAO.test(bloqueado)) return null;
    return { tipo: 'csp', diretiva: limpa(r['effective-directive'] || r['violated-directive'], 80), bloqueado, pagina: semQuery(r['document-uri'], 200) };
  }
  if (o && o.type === 'csp-violation' && o.body) {
    const r = o.body;
    const bloqueado = semQuery(r.blockedURL, 200);
    if (EXTENSAO.test(bloqueado)) return null;
    return { tipo: 'csp', diretiva: limpa(r.effectiveDirective, 80), bloqueado, pagina: semQuery(r.documentURL, 200) };
  }
  if (o && typeof o === 'object') {
    const arquivo = semQuery(o.s, 200);
    if (EXTENSAO.test(arquivo)) return null;
    return { tipo: limpa(o.t, 20), msg: limpa(o.m, 300), arquivo, linha: Number(o.l) | 0, pagina: semQuery(o.p, 100), versao: limpa(o.v, 10) };
  }
  return null;
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return fim(res, 405); }
  if (!origemOk(req)) return fim(res, 403);
  const ct = String(req.headers['content-type'] || '').split(';')[0].trim().toLowerCase();
  if (!TIPOS.includes(ct)) return fim(res, 415);
  if (Number(req.headers['content-length'] || 0) > MAX_BYTES) return fim(res, 413);
  const ip = ipHash(req);
  if (limitado(ip)) { res.setHeader('Retry-After', '60'); return fim(res, 429); }
  let texto;
  try { texto = await lerCorpo(req); } catch (e) { return fim(res, 413); }
  if (texto.length > MAX_BYTES) return fim(res, 413);
  let dados;
  try { dados = JSON.parse(texto); } catch (e) { return fim(res, 400); }
  const lista = Array.isArray(dados) ? dados.slice(0, 5) : [dados];
  for (const item of lista) {
    const reg = normaliza(item);
    if (reg) console.log('[monitor]', JSON.stringify(Object.assign({ ip }, reg)));
  }
  return fim(res, 204);
};
