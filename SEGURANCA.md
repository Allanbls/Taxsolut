# Segurança do site — Chef Ligia do Vale (Vercel)

## 1. HTTPS via SSL/TLS — já ativo (nada a fazer)
- A Vercel emite e renova o certificado sozinha (Let's Encrypt), com TLS 1.2 e 1.3 e cifras fortes.
- Todo acesso por `http://` é redirecionado para `https://` (código 308).
- O HSTS também já vem ligado. Não coloquei `includeSubDomains`/`preload` no domínio próprio de propósito:
  só faça isso se TODOS os subdomínios do domínio (e-mail, webmail etc.) funcionarem em HTTPS, porque é difícil desfazer.
- Conferir: https://www.ssllabs.com/ssltest/ (digite o domínio; a meta é nota A ou A+).

## 2. Cabeçalhos de segurança HTTP — arquivo `vercel.json`
- Bloqueiam o site dentro de iframe de terceiros (clickjacking), "adivinhação" de tipo de arquivo,
  vazamento do endereço completo para outros sites e acesso a câmera/microfone/localização.
- A política de conteúdo completa (CSP) agora fica SÓ no `vercel.json` (cabeçalho), com `frame-ancestors` e
  envio de violações para `/api/log`. Para liberar um novo domínio externo, edite a CSP no `vercel.json`.
- IMPORTANTE: se o seu `vercel.json` já tiver outras chaves (rewrites, redirects, cleanUrls...),
  NÃO substitua o arquivo: copie só o bloco `"headers"` para dentro dele.
- O arquivo `_headers` da pasta é do formato Netlify/Cloudflare: a Vercel IGNORA esse arquivo.
  O que estiver nele não está valendo hoje.
- Conferir depois do deploy: https://securityheaders.com (meta: nota A).
  Ou no terminal: `curl -I https://uniaochefsempreendedores.com.br`

## 3. SSH com chave criptografada (acesso ao GitHub)
Na Vercel não existe servidor para entrar por SSH: o deploy sai do GitHub.
Então o ponto a proteger é o seu acesso ao repositório. No PowerShell do Windows:

```powershell
# 1) criar a chave (ed25519) — quando pedir, defina uma senha (passphrase)
ssh-keygen -t ed25519 -C "seu-email@exemplo.com"

# 2) guardar a chave no agente do Windows (para não digitar a senha toda hora)
Get-Service ssh-agent | Set-Service -StartupType Automatic
Start-Service ssh-agent
ssh-add $env:USERPROFILE\.ssh\id_ed25519

# 3) copiar a chave PÚBLICA
Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub | Set-Clipboard
```

4. GitHub → Settings → SSH and GPG keys → New SSH key → cole (tipo **Authentication Key**).
   Repita colando de novo com tipo **Signing Key** (para assinar commits).
5. Teste e troque o repositório para SSH:

```powershell
ssh -T git@github.com
git remote set-url origin git@github.com:USUARIO/REPOSITORIO.git

# commits assinados com a mesma chave
git config --global gpg.format ssh
git config --global user.signingkey "$env:USERPROFILE\.ssh\id_ed25519.pub"
git config --global commit.gpgsign true
```

6. Complete com:
   - verificação em duas etapas (2FA) no GitHub e na Vercel;
   - proteção do branch `main` no GitHub (Settings → Branches).
   Nunca envie o arquivo `id_ed25519` (sem `.pub`) para ninguém.

## 4. WAF (Firewall da Vercel)
Vercel → projeto → **Firewall** → **Configure** → **+ New Rule**.
No plano Hobby cabem 3 regras (só 1 de limite de requisições). Crie cada uma primeiro em
**Log**, observe 1 ou 2 dias no painel do Firewall e depois troque para **Deny**.

| Regra | Se (If) | Então (Then) |
|---|---|---|
| Limite na API | Request Path **starts with** `/api/` | **Rate Limit**: 30 requisições / 60 s por IP → 429 |
| Robôs procurando falhas | Request Path **matches regex** `^/(wp-admin\|wp-login\.php\|xmlrpc\.php\|\.env\|\.git\|phpmyadmin)` | **Deny** |
| Métodos estranhos | Request Method **is any of** `PUT, DELETE, PATCH, TRACE, CONNECT` | **Deny** |

ATENÇÃO: NÃO inclua `vendor/` nesta regra. O site serve o GSAP em `/vendor/` e o bloqueio quebraria as animações.

Expressão da regra 2 para colar no painel (sem barras invertidas):

```
^/(wp-admin|wp-login\.php|xmlrpc\.php|\.env|\.git|phpmyadmin)
```

Em **Bot Management**, ligue a proteção contra bots (Bot Protection), também começando em Log.

## 5. Mitigação de DDoS — já ativa (saiba onde está o botão)
- A Vercel bloqueia sozinha ataques de camada 3, 4 e 7, em todos os planos, e não cobra pelo tráfego bloqueado.
- Se o site sofrer um ataque direcionado: Firewall → **Bot Management** → **Attack Challenge Mode** → Enable.
  Todo visitante passa por um desafio automático; Google e outros robôs legítimos passam direto.
  Desligue quando o ataque acabar.
- O site é estático e fica em cache na rede da Vercel, o que já absorve picos de acesso.

## Plano da Vercel
O plano gratuito (Hobby) é só para uso pessoal e não comercial. Site de cliente conta como uso
comercial e precisa do plano Pro. No Pro também dá para ligar o Spend Management (limite de gastos).

## 6. Itens novos (v23)
- **LOG_SALT (obrigatório):** Vercel → Settings → Environment Variables → `LOG_SALT` com um texto longo e aleatório
  (Production). Sem ele o código usa um sal aleatório por instância, que também é seguro, mas muda a cada partida.
- **Cache:** fontes e `vendor/` por 1 ano; `imagens/` por 1 dia (+7 dias em segundo plano); `assets/` por 1 dia.
  Ao trocar uma imagem pelo mesmo nome, ela pode demorar até 1 dia para aparecer. Para forçar, mude o nome do arquivo.
- **Previews da Vercel:** em Settings → Deployment Protection, ative "Vercel Authentication". Em Domains, deixe o
  domínio próprio como principal e redirecione `*.vercel.app` para ele. As URLs `*.vercel.app` já saem com `noindex`.
- **Domínio:** crie registros CAA (Let's Encrypt), SPF, DKIM e DMARC se houver e-mail no domínio, e ative o bloqueio
  de transferência no registrador, com 2FA.
- **Domínio:** já definido como `uniaochefsempreendedores.com.br` (sem `www`) em `index.html`, `privacidade.html`, `robots.txt`, `sitemap.xml` e `.well-known/security.txt`. No painel da Vercel, deixe o domínio sem `www` como principal e redirecione o `www` para ele.
- **Google Analytics via Google Tag Manager (GTM-MLJ7H56F):** o `analytics.js` só carrega o GTM depois do "Aceitar" e usa Consent Mode v2 (publicidade sempre negada). Dentro do GTM você precisa ter: (1) uma tag "Google tag / GA4" com o ID de métricas `G-...`, disparando em "Initialization - All Pages"; (2) para cada evento (`contato_whatsapp`, `abrir_inscricao`, `enviar_inscricao`, `abrir_diretoria`, `abrir_agenda`, `abrir_instagram`) um acionador "Evento personalizado" com o mesmo nome e uma tag de evento GA4. Sem isso o GTM carrega, mas nada chega ao Analytics. No modo Visualização do GTM (tagmanager.google.com), a CSP bloqueia o painel de depuração: teste com a aba Tempo real do GA4 ou relaxe a CSP só durante o teste.
- **Ficha de inscrição:** o site envia os dados (nascimento, endereço, telefone) para `/api/inscricao`. Esse arquivo não faz parte desta entrega: confira que ele valida cada campo no servidor, limita envios por IP, não grava dados pessoais nos logs e que a política de privacidade descreve o destino real.
