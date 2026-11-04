# Segurança do site TaxSolut

O site é estático (HTML) e o contato sai pelo WhatsApp. Por isso a proteção está em três camadas.

| Protocolo | Onde está | O que fazer |
|---|---|---|
| HTTPS com SSL/TLS | Hospedagem + `HSTS` e `upgrade-insecure-requests` (já nos arquivos) | Ativar o certificado no painel do domínio (Vercel/Cloudflare/Hostinger fazem isso sozinhos) e forçar HTTPS |
| WAF | Configuração na hospedagem, não é código | Cloudflare (plano gratuito): proxy ligado, "Bot Fight Mode", regras gerenciadas. Na Vercel: Firewall do projeto |
| MFA | `backend-seguranca/` (TOTP em app autenticador) | Só vale quando a Área do cliente for real. Hoje o login do site é demonstração |
| Rate limit | Navegador: 3 envios/10 min no formulário, 5 tentativas/5 min no login. Servidor: `backend-seguranca/` | O limite do navegador só barra uso casual. O definitivo é o do servidor/WAF |
| Validação de inputs | `index.html` (nome, telefone com DDD, e-mail, assunto em lista fixa, tamanhos máximos) e `server.js` | — |
| Sanitização | `index.html` e `server.js` (remove tags HTML e caracteres de controle/invisíveis) | — |
| Expiração de sessão | `server.js`: 15 min sem uso e 8 h no máximo, cookie `httpOnly`, `sameSite=strict` | Em produção, trocar o MemoryStore por Redis |
| CORS | Cabeçalhos `Cross-Origin-*` (site) e lista de origens em `ALLOWED_ORIGINS` (API) | Informar o domínio final no `.env` |
| Logs | `server.js` (pino): login, bloqueios, rate limit, contatos; telefone/CPF mascarados | Enviar para um serviço de logs em produção |
| Criptografia | HTTPS em trânsito; AES-256-GCM nos contatos guardados; senhas com scrypt | Guardar `DATA_KEY` só em variáveis de ambiente |

Também aplicados no site: CSP (bloqueia scripts de fora), `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, campo-isca contra robôs e `rel="noopener noreferrer"` nos links externos.

## Cabeçalhos de segurança (escolha o arquivo da sua hospedagem)
- Vercel: `vercel.json`
- Netlify / Cloudflare Pages: `_headers`
- Apache / Hostinger: `.htaccess`

## Importante
- A CSP do `index.html` libera os scripts pelo hash. Se editar o `<script>` do `index.html`, rode `python3 atualizar-csp.py`, senão o navegador bloqueia o JavaScript.
- Os cabeçalhos só têm efeito depois de publicados na hospedagem. A `<meta>` CSP do HTML funciona em qualquer lugar.
- `backend-seguranca/`: `npm install`, `npm run segredos -- "SenhaDoCliente"`, copiar para `.env` e `npm start`. A API não é usada pelo site atual.
