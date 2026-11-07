/* Google Analytics com consentimento (LGPD), carregado pelo Google Tag Manager (ou direto, se só houver ID G-).
   - Só carrega depois que a pessoa toca em "Aceitar" no aviso de privacidade.
   - Se ela recusar (ou mudar de ideia depois em "Aviso de cookies"), nada é carregado e os cookies do GA são apagados.
   - IDs ficam no index.html: <meta name="gtm-id" content="GTM-XXXXXXX"> (preferido) ou <meta name="ga-id" content="G-XXXXXXXXXX">.
   - Consent Mode v2: publicidade sempre negada; só "analytics_storage" é concedido, e somente após o aceite.
   - No GTM, os eventos abaixo chegam como dataLayer.push({event: "nome"}): crie um acionador de "Evento personalizado"
     para cada um e um evento do GA4 ligado a ele. */
(function () {
  "use strict";
  var gtmMeta = document.querySelector('meta[name="gtm-id"]');
  var gaMeta = document.querySelector('meta[name="ga-id"]');
  var GTM = gtmMeta && gtmMeta.content ? gtmMeta.content.trim() : "";
  var GA = gaMeta && gaMeta.content ? gaMeta.content.trim() : "";
  var usaGTM = /^GTM-[A-Z0-9]{4,}$/.test(GTM);
  var usaGA = !usaGTM && /^G-[A-Z0-9]{4,}$/.test(GA) && !/^G-X+$/.test(GA);
  if (!usaGTM && !usaGA) return;
  var ID = usaGTM ? GTM : GA;

  var KEY = "ld_privacidade", loaded = false, ativo = false;
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); } // o GTM exige "arguments", não um array
  window.gtag = window.gtag || gtag;

  function consentiu() {
    try { var v = JSON.parse(localStorage.getItem(KEY) || "null"); return !!(v && v.v >= 2 && v.analytics === true); }
    catch (e) { return false; }
  }
  function carrega() {
    ativo = true;
    if (loaded) { // aceitou de novo na mesma visita
      if (usaGTM) gtag("consent", "update", { analytics_storage: "granted" });
      else window["ga-disable-" + GA] = false;
      return;
    }
    loaded = true;
    var s = document.createElement("script");
    s.async = true;
    if (usaGTM) {
      gtag("consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
      gtag("consent", "update", { analytics_storage: "granted" });
      window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      s.src = "https://www.googletagmanager.com/gtm.js?id=" + encodeURIComponent(GTM);
    } else {
      window["ga-disable-" + GA] = false;
      gtag("js", new Date());
      /* sem sinais de publicidade: só contagem de visitas */
      gtag("config", GA, { allow_google_signals: false, allow_ad_personalization_signals: false });
      s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA);
    }
    document.head.appendChild(s);
  }
  function apagaCookies() {
    ativo = false;
    if (usaGTM) { if (loaded) gtag("consent", "update", { analytics_storage: "denied" }); }
    else window["ga-disable-" + GA] = true;
    var host = location.hostname, partes = host.split("."), dominios = [host];
    for (var i = 1; i < partes.length - 1; i++) dominios.push("." + partes.slice(i).join("."));
    document.cookie.split(";").forEach(function (c) {
      var nome = c.split("=")[0].trim();
      if (nome === "_ga" || nome.indexOf("_ga_") === 0 || nome === "_gid") {
        dominios.forEach(function (d) { document.cookie = nome + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=" + d; });
        document.cookie = nome + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      }
    });
  }
  if (consentiu()) carrega();
  addEventListener("ld:consent", function (e) {
    if (e.detail && e.detail.analytics) carrega(); else apagaCookies();
  });

  /* eventos que importam para a cliente (aparecem no GA em Relatórios > Engajamento > Eventos) */
  function evento(nome, extra) {
    if (!loaded || !ativo) return;
    if (usaGTM) {
      var o = { event: nome };
      if (extra) for (var k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) o[k] = extra[k];
      window.dataLayer.push(o);
    } else gtag("event", nome, extra || {});
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target : null; if (!t) return;
    if (t.closest('a[href*="wa.me"]')) evento("contato_whatsapp");
    else if (t.closest("[data-open-form]")) evento("abrir_inscricao");
    else if (t.closest("[data-dr-open]")) evento("abrir_diretoria", { chef: (t.closest("[data-dr-open]").getAttribute("aria-label") || "").replace("Conhecer a ", "") });
    else if (t.closest("[data-open-agenda]")) evento("abrir_agenda");
    else if (t.closest('a[href*="instagram.com"]')) evento("abrir_instagram");
  }, true);
  /* eventos disparados por outros scripts, sem dados pessoais (ex.: ficha enviada) */
  document.addEventListener("ld:evento", function (e) {
    if (e.detail && /^[a-z_]{3,40}$/.test(e.detail.nome || "")) evento(e.detail.nome, e.detail.extra);
  });
})();
