# Site Chef Ligia do Vale (v22 + otimizações)

Site estático. Não precisa de `npm install`.

## Estrutura
- `index.html`, `privacidade.html` (política de privacidade, LGPD), `assets/app.js` (JavaScript principal), `assets/boot.js`, `assets/perf.js` (vídeo só perto da tela, economia de dados), `assets/form-popup.js`, `assets/diretoria.js` (monta as cenas só quando a fileira se aproxima da tela), `assets/analytics.js` (GTM/GA4 só após o Aceitar), `robots.txt`, `sitemap.xml`, `.well-known/security.txt`, `imagens/og-chef-ligia.jpg` (prévia no WhatsApp/Instagram), `assets/textura-granulado.svg` (fundo da seção de serviços)
- `vendor/` GSAP 3.12.5 hospedado aqui (antes vinha de CDN) · `fonts/` fontes hospedadas aqui (antes vinham do Google)
- `imagens/` traz só as imagens novas (Caravana, 4 cards, selo Cozinhe se Puder, vídeo e capa da aula). **Copie para dentro dela as imagens que você já tinha.** `caravana.jpg` não é mais usada e pode ser apagada do repositório.
- `api/log.js` recebe erros do site e relatórios de segurança (Vercel) · `vercel.json` e `_headers` cabeçalhos de segurança
- `alternativas/.htaccess` para hospedagem Apache (copie para a raiz como `.htaccess`)

## Publicar
- **Vercel:** suba a pasta inteira (mantenha `api/` e `vercel.json` na raiz). HTTPS é automático.
- **Netlify / Cloudflare Pages:** o `_headers` já funciona. A pasta `api/` não roda nelas; o site funciona, só o monitoramento fica desligado.
- **Apache:** use o `.htaccess` de `alternativas/`.
- Opcional na Vercel: crie a variável `LOG_SALT` (qualquer texto longo) para o hash de IP do log.

## Atualizar a agenda toda semana
Abra `assets/app.js`: o bloco `AGENDA` está no começo da seção "agenda". Edite datas, cidade, UF e arte. Dados inválidos são ignorados e avisados no console.

## ANTES DE PUBLICAR
1. O domínio `uniaochefsempreendedores.com.br` já está nas páginas, no `robots.txt`, no `sitemap.xml` e no `security.txt`. Conecte esse domínio na Vercel (sem `www` como principal).
2. Confira no GTM (GTM-MLJ7H56F) a tag do GA4 e os acionadores dos eventos (veja `SEGURANCA.md`, item 6). O `analytics.js` lê o ID da meta `gtm-id` do `index.html`.
3. Crie `LOG_SALT` na Vercel (veja `SEGURANCA.md`).
4. A CSP agora fica só no `vercel.json`; não existe mais `<meta>` de CSP nas páginas.

## Segurança: o que foi aplicado
| Item | O que foi feito |
|---|---|
| HTTPS | HSTS de 2 anos, `upgrade-insecure-requests`, nenhuma chamada `http://`; `.htaccess` redireciona no Apache |
| Rate limit | `/api/log`: 20 requisições/min por IP, depois 429. É por instância; para limite global use uma regra de Rate Limiting no Vercel Firewall |
| Validação de inputs | O site não tem mais formulário (o assistente da carta saiu). Restam a agenda (datas AAAA-MM-DD, início ≤ fim, tamanhos máximos, arte só da lista) e a API (POST, mesma origem, tipo de conteúdo, máx. 4 KB, JSON, só campos permitidos) |
| Sanitização | Textos da agenda passam por escape de HTML; demais textos usam `textContent`; CSP bloqueia script injetado; links externos com `noopener noreferrer` |
| Controle de acesso | Site público, sem login. Anti-clickjacking (`frame-ancestors 'none'`), `Cross-Origin-*` same-origin, câmera/microfone/localização desligados, API só POST. Ative 2FA no GitHub e na Vercel |
| Expiração de sessão | Não há login nem cookies. Armazenamento no aparelho: `sessionStorage` (pop-up da agenda, some ao fechar a aba) e `localStorage` com a chave `ld_privacidade` (só lembra que o aviso de privacidade foi visto) |
| Criptografia | TLS + HSTS. Nada sensível é guardado; o IP no log vira um hash curto com sal |
| Dependências | Zero scripts, fontes ou estilos de terceiros em tempo de execução. GSAP e fontes fixados e conferíveis: `sha256sum -c vendor/SHA256SUMS` (licenças em `fonts/LICENSES.txt`) |
| Monitoramento | Erros de JavaScript e violações de CSP vão para `/api/log` e aparecem em Vercel > Logs (busque `[monitor]`). Para alerta por e-mail, use um Log Drain ou um monitor de uptime |

## Limites
- `style-src 'unsafe-inline'` continua porque o HTML usa estilos inline.
- Se a hospedagem não bloquear `package.json` e `vercel.json`, eles ficam visíveis; não contêm segredos.

## Aviso de privacidade
O site usa Google Analytics somente após o visitante tocar em Aceitar (aviso com aceitar/recusar). Meta Pixel ou outros rastreadores exigem atualizar o aviso e a política antes de entrar. Revise o texto de `privacidade.html` com um profissional jurídico antes de considerá-lo definitivo.

## Espaçamento
Todo o espaçamento usa uma escala de 4/8px definida no fim do `<style>` do `index.html` (bloco "SISTEMA DE ESPAÇAMENTO"): `--sp-1` (4px) até `--sp-10` (96px). Os tokens `--sec-y`, `--sec-head`, `--block-gap`, `--col-gap` e `--card-pad` crescem em 600px, 900px e 1200px. Para mudar o respiro do site inteiro, altere só esses tokens. Line-height: `--lh-display` 1.04, `--lh-title` 1.15, `--lh-body` 1.65, `--lh-ui` 1.3.

## Se o site aparecer "quebrado" depois de publicar
Quase sempre é arquivo faltando ou versão misturada: o `index.html` novo com um `assets/app.js` antigo (ou o contrário). Suba TODOS os arquivos do zip juntos (em especial `index.html` e `assets/app.js`), espere a Vercel terminar o deploy e recarregue o celular (feche e abra a aba). O `index.html` carrega `app.js?v=22` para forçar o navegador a pegar o arquivo novo, e o console avisa se as versões não combinarem.

## Velocidade (otimizações desta versão)
- Cache longo para fontes, `vendor/` e imagens (`vercel.json`); poster do hero com `preload`; imagens abaixo da dobra com `loading="lazy"`.
- `assets/perf.js`: o vídeo "Aula com a mão na massa" só baixa perto da tela; vídeos pausam fora da tela; com economia de dados, rede 2G/3G ou "reduzir movimento" fica só o poster (toque para tocar).
- **Pendente (precisa dos arquivos de mídia):** comprimir os dois MP4 (H.264, 720p, `-movflags +faststart`, meta < 1,5 MB cada), converter JPG/PNG para WebP/AVIF e preencher `width`/`height` das imagens.
