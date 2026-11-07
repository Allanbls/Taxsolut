'use strict';
// Função serverless (Vercel): recebe a ficha do site e repassa ao Google Forms do cliente.
// Fica no servidor para o navegador falar só com o próprio site (CSP connect-src 'self').
// Não grava nem registra dados pessoais: o que chega só é repassado ao Google Forms.

const FORM_ID = '1FAIpQLSdfyX739x7UEjZ0RVe3qCy8Pl9KXnCUXPDyyyX_kwvqW2_-Ug';

// Números de cada campo do Google Forms (entry.NNNNNNNNN), lidos do próprio formulário.
// Se o cliente trocar/adicionar perguntas, estes números podem mudar.
const ENTRY = {
  nome: '1781500597',
  telefone: '297979220',
  instagram: '833403130',
  endereco: '367656459',
  bairro: '238443229',
  pais: '850197443',
  cidade: '1578013334',
  cep: '2094014561',
  nascimento: '4560003', // data: o código envia entry.X_year, entry.X_month e entry.X_day
  area: '547137726',
  carta: '2040870261',
  origem: '2022160394',
  aceite: '1700356356'
};

const LIMITE = { carta: 5000, default: 300 };
const MAX_BYTES = 16384;               // corpo máximo (a carta já tem até 5000 caracteres)
const MAX_ENVIOS = 6;                  // por IP, na janela abaixo (quem erra e tenta de novo não é barrado)
const JANELA_MS = 10 * 60 * 1000;
const envios = new Map();              // melhor esforço por instância; o limite global é a regra do Firewall da Vercel
const TIPOS_OK = ['application/json', 'text/plain'];

const OBRIGATORIOS = ['email', 'nome', 'telefone', 'instagram', 'endereco', 'bairro', 'pais', 'cidade', 'cep', 'nascimento', 'area', 'carta', 'origem', 'aceite'];

function ip(req) {
  const h = req.headers;
  return String(h['x-real-ip'] || h['x-vercel-forwarded-for'] || h['x-forwarded-for'] || (req.socket && req.socket.remoteAddress) || '').split(',')[0].trim();
}
function limitado(chave) {
  const agora = Date.now();
  const lista = (envios.get(chave) || []).filter(function (t) { return agora - t < JANELA_MS; });
  lista.push(agora);
  envios.set(chave, lista);
  if (envios.size > 5000) envios.clear();
  return lista.length > MAX_ENVIOS;
}
function origemOk(req) {
  const o = req.headers.origin || req.headers.referer;
  if (!o) return false;                // o formulário do site sempre envia Origin
  try { return new URL(o).host === req.headers.host; } catch (e) { return false; }
}
// tira caracteres de controle (a carta pode ter quebras de linha)
function limpa(v, max, multilinha) {
  const re = multilinha ? /[\u0000-\u0009\u000b\u000c\u000e-\u001f\u007f]/g : /[\u0000-\u001f\u007f]/g;
  return String(v).replace(re, ' ').trim().slice(0, max);
}
function dataValida(s) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const p = s.split('-').map(Number);
  const d = new Date(Date.UTC(p[0], p[1] - 1, p[2]));
  if (d.getUTCFullYear() !== p[0] || d.getUTCMonth() !== p[1] - 1 || d.getUTCDate() !== p[2]) return false;
  const ano = new Date().getUTCFullYear();
  return p[0] >= 1900 && p[0] <= ano - 10;
}
const erro = function (res, codigo, campo) { return res.status(codigo).json(campo ? { ok: false, error: campo } : { ok: false }); };

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return erro(res, 405); }
  if (!origemOk(req)) return erro(res, 403);
  const ct = String(req.headers['content-type'] || '').split(';')[0].trim().toLowerCase();
  if (TIPOS_OK.indexOf(ct) < 0) return erro(res, 415);
  if (Number(req.headers['content-length'] || 0) > MAX_BYTES) return erro(res, 413);
  if (limitado(ip(req))) { res.setHeader('Retry-After', '600'); return erro(res, 429); }

  let d = req.body;
  if (typeof d === 'string') { if (d.length > MAX_BYTES) return erro(res, 413); try { d = JSON.parse(d); } catch (e) { d = null; } }
  if (!d || typeof d !== 'object' || Array.isArray(d)) return erro(res, 400);
  if (d.site) return res.status(200).json({ ok: true }); // robô: finge sucesso

  if (Object.values(ENTRY).some(function (v) { return !v; })) return erro(res, 503, 'entry IDs ainda não configurados');

  for (const k of OBRIGATORIOS) {
    if (typeof d[k] !== 'string' || !d[k].trim()) return erro(res, 400, 'campo ' + k);
  }
  const email = limpa(d.email, 254);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return erro(res, 400, 'email');
  if (!dataValida(d.nascimento)) return erro(res, 400, 'nascimento');
  if (String(d.telefone).replace(/\D/g, '').length < 8) return erro(res, 400, 'telefone');
  const outro = d.origem === '__outro__';
  if (outro && (typeof d.origem_outro !== 'string' || !d.origem_outro.trim())) return erro(res, 400, 'origem_outro');

  const cut = function (k) { return limpa(d[k], k === 'carta' ? LIMITE.carta : LIMITE.default, k === 'carta'); };
  const body = new URLSearchParams();
  body.set('emailAddress', email);
  ['nome', 'telefone', 'instagram', 'endereco', 'bairro', 'pais', 'cidade', 'cep', 'area', 'carta'].forEach(function (k) {
    body.set('entry.' + ENTRY[k], cut(k));
  });

  const p = d.nascimento.split('-');
  body.set('entry.' + ENTRY.nascimento + '_year', p[0]);
  body.set('entry.' + ENTRY.nascimento + '_month', String(parseInt(p[1], 10)));
  body.set('entry.' + ENTRY.nascimento + '_day', String(parseInt(p[2], 10)));

  if (outro) {
    body.set('entry.' + ENTRY.origem, '__other_option__');
    body.set('entry.' + ENTRY.origem + '.other_option_response', cut('origem_outro') || 'Outro');
  } else {
    body.set('entry.' + ENTRY.origem, cut('origem'));
  }
  body.set('entry.' + ENTRY.aceite, 'Sim');
  body.set('fvv', '1');
  body.set('pageHistory', '0');

  const ctl = new AbortController();
  const to = setTimeout(function () { ctl.abort(); }, 8000);
  try {
    const r = await fetch('https://docs.google.com/forms/d/e/' + FORM_ID + '/formResponse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
      redirect: 'manual',
      signal: ctl.signal
    });
    // o Google responde 200 (ou 302) quando aceita; 4xx quando rejeita
    if (r.status >= 400) return erro(res, 502);
    return res.status(200).json({ ok: true });
  } catch (e) {
    return erro(res, 502);
  } finally {
    clearTimeout(to);
  }
};
