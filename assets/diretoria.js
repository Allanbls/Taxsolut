/* Diretoria da União Chefs Empreendedores: fileira de miniaturas no site + pop-up com scrollytelling bordado.
   EDITAR: cada chef é um item de D (mesma ordem das miniaturas no index.html).
   - n: nome (aparece grande na placa da foto e no texto) · r: cidade/cargo (aparece na placa)
   - t: frase de destaque (para marcar uma palavra use <span class="hl">palavra</span>)
   - b: parágrafos; cada parágrafo é um "passo" da rolagem
   - e: bordados que aparecem em cada passo (um grupo por parágrafo). Nomes disponíveis em ICON. */
(function () {
  "use strict";
  var D = [
    { n: "Ligia do Vale", r: "Fundadora & CEO", f: "ligia-do-vale", lead: true,       t: 'Fundadora e <span class="hl">CEO</span> da União Chefs Empreendedores',
      b: ["Chef Ligia do Vale, fundadora e CEO da União Chefs Empreendedores.",
          "Chef confeiteira, professora e embaixadora oficial da Cobertop. Roda o Brasil dando aulas e demonstrações em feiras e eventos, com técnica, alegria e muito chocolate.",
          "Na União Chefs Empreendedores, ajuda chefs de confeitaria, gastronomia e panificação a se tornarem professores e a crescer na profissão.",
          "“Aqui, crescemos juntos.”"],
      e: [["rings"], ["chocolate", "mic"], ["gradcap"], ["heart"]] },
    { n: "Paula Santana", r: "Guarulhos, SP", f: "paula-santana", t: 'Gastrônoma e <span class="hl">confeiteira</span> artesanal infantil',
      b: ["Sou a Chef Paula Santana, de Guarulhos, SP.", "Gastrônoma, com especialização em confeitaria artesanal infantil.", "Apaixonada pelo mundão da arte em pasta americana e em constante aprendizado!", "Proprietária Paula’s Cakes Confeitaria, onde o amor pelo mundo doce se torna único!"],
      e: [["pin"], ["chefhat", "whisk"], ["cake"], ["heart"]] },
    { n: "Iuri Sena", r: "Guarujá, SP", f: "iuri-sena", t: 'Ninguém é <span class="hl">Campeão</span> Sozinho.',
      b: ["Chef Iuri Sena é professor, empreendedor e Cake Designer, natural de Guarujá, litoral de São Paulo. Campeão do programa Que Seja Doce (GNT), também conquistou os títulos de Melhor Brigadeiro, em Mauá-SP, e Melhor Sobremesa de Pitanga, em Guarujá-SP.", "É criador da Bailarina Elétrica, equipamento inovador desenvolvido para revolucionar o trabalho na confeitaria.", "Sua trajetória é marcada pela dedicação, determinação e perseverança, levando conhecimento, inovação e inspiração à gastronomia."],
      e: [["trophy", "brigadeiro"], ["stand"], ["star", "book"]] },
    { n: "Priscilla Junia", r: "Ribeirão das Neves e Esmeraldas, MG", f: "priscilla-junia", t: 'Liderar é transformar <span class="hl">paixão</span> em oportunidades',
      b: ["Chef Priscilla Junia, Diretora na União Chefs Empreendedores.", "Representante dos municípios de Ribeirão das Neves e Esmeraldas – Minas Gerais.", "“Liderar é transformar paixão em oportunidades e valorizar quem faz da gastronomia uma arte.”"],
      e: [["crown"], ["pin"], ["flame", "heart"]] },
    { n: "Joelma Venâncio", r: "Diretora · Todo o Brasil", f: "joelma-venancio", t: 'Quando Deus está à frente, o impossível vira <span class="hl">testemunho</span>',
      b: ["Chef Joelma Venâncio, especialista em chantininho, atendimento em camarins e produção de artistas em todo o Brasil. Diretora da União Chefs Empreendedores.", "Sou movida por sonhos, propósito e fé. Acredito em pessoas que sonham, persistem e confiam que Deus é capaz de transformar sonhos em realidade. Afinal, quando Deus está à frente, o impossível se torna testemunho! 🍒✨"],
      e: [["pipingbag", "star"], ["cherry", "heart"]] },
    { n: "Demontiez Alves", r: "Juazeiro do Norte, CE", f: "demontiez-alves", t: 'Mais que doces, <span class="hl">experiências</span> surpreendentes',
      b: ["Sou o Chef Demontiez Alves, de Juazeiro do Norte/CE, Tecnólogo em Alimentos, e juntamente com a minha esposa, formamos o Atelier Ideias Doces, uma doceria de produção artesanal.", "A nossa visão da confeitaria vai muito além de fazermos doces, queremos promover experiências surpreendentes. Na União Chefs Empreendedores temos a oportunidade de mostrarmos o nosso trabalho e crescermos profissionalmente."],
      e: [["rings", "cupcake"], ["gift", "star"]] },
    { n: "Leandro Acevedo", r: "Argentino · Interior de São Paulo", f: "leandro-acevedo", t: 'Criatividade, dedicação e <span class="hl">amor</span> pelo que faço',
      b: ["Chef Leandro Acevedo, argentino morando no interior de São Paulo. Confeiteiro profissional e empreendedor, apaixonado pela confeitaria e pela arte de transformar ingredientes em experiências e emoções.", "Em constante evolução, buscando novos conhecimentos, aperfeiçoamento e inovação, sempre com criatividade, dedicação e amor pelo que faço."],
      e: [["sun", "whisk"], ["book", "heart"]] },
    { n: "Angélica Oliveira", r: "Poconé, MT", f: "angelica-oliveira", t: 'Transformar ingredientes em <span class="hl">amor</span>',
      b: ["Olá! Sou Angélica Oliveira, de Poconé–MT, formada em Gastronomia e pós-graduada em Confeitaria e Panificação. Sou confeiteira, empreendedora e apaixonada pelo universo doce!", "Acredito que a confeitaria vai muito além de produzir doces. É uma forma de transformar ingredientes em amor, criar memórias afetivas e levar felicidade às pessoas.", "Fazer parte da União Chefs Empreendedores é uma oportunidade de compartilhar experiências, adquirir conhecimentos e crescer ao lado de profissionais que, assim como eu, acreditam no poder da gastronomia para transformar vidas! 💕"],
      e: [["gradcap", "bread"], ["heart", "cake"], ["rings"]] },
    { n: "Ariana Silva", r: "Feira de Santana, BA", f: "ariana-silva", t: 'Talento, experiência e <span class="hl">dedicação</span>',
      b: ["Ariana Silva é uma renomada chef de cozinha de Feira de Santana, na Bahia, e também faz parte da diretoria da União Chefs Empreendedores, contribuindo com seu talento, experiência e dedicação ao crescimento da nossa associação."],
      e: [["chefhat", "pot", "star", "rings"]] }
  ];
  var COR = ["#BC2350", "#FFB81C", "#FF9A3D", "#BC2350", "#19B5B0", "#2F9E4F", "#74ACDF", "#FF9A3D", "#0B7471"];
  var SCENE = ["#FFB81C", "#FFB81C", "#FF9A3D", "#BC2350", "#19B5B0", "#2F9E4F", "#74ACDF", "#FF9A3D", "#0B7471"];
  var THREAD = ["#BC2350", "#0B7471", "#3A1F1A", "#FF9A3D", "#2F9E4F", "#0A2244", "#19B5B0"];
  var IMG = "imagens/diretoria/";

  /* bordados: desenhos em linha (grade 64x64) */
  var ICON = {
    heart: "M32 52C14 40 8 31 8 22 8 14 14 9 21 9c5 0 9 3 11 7 2-4 6-7 11-7 7 0 13 5 13 13 0 9-6 18-24 30z",
    star: "M32 8l6.5 16L56 25 42.5 36 47 53 32 43.5 17 53l4.5-17L8 25l17.5-1z",
    sparkle: "M32 6c2 18 8 24 26 26-18 2-24 8-26 26-2-18-8-24-26-26 18-2 24-8 26-26z",
    whisk: "M32 58V36M28 58h8M32 36C20 30 18 10 32 6c14 4 12 24 0 30M32 36c-6-8-6-24 0-30 6 6 6 22 0 30",
    cake: "M10 54h44M14 54V40h36v14M20 40V28h24v12M32 28V19M32 11c-3 3-3 6 0 8 3-2 3-5 0-8zM14 47c6 4 12-4 18 0s12-4 18 0",
    cupcake: "M16 34h32l-5 22H21zM25 34l2 22M32 34v22M39 34l-2 22M14 34c-4-12 8-20 14-16 2-10 14-10 16 0 8-2 12 10 6 16M32 10c1-4 4-6 7-6",
    trophy: "M20 10h24v14c0 10-6 16-12 16s-12-6-12-16zM20 15h-8c0 10 4 14 9 15M44 15h8c0 10-4 14-9 15M32 40v8M22 56h20v-6H22z",
    crown: "M10 46l4-28 10 14 8-20 8 20 10-14 4 28zM12 54h40",
    chefhat: "M18 40c-10-2-10-18 2-18 0-10 10-14 14-8 6-8 20-2 16 8 8 0 8 16-4 18zM18 40v14h28V40M18 48h28",
    cherry: "M13 50a9 9 0 1 0 18 0 9 9 0 1 0-18 0zM33 46a9 9 0 1 0 18 0 9 9 0 1 0-18 0zM22 41c2-15 8-25 18-31M42 37c-2-11-4-19-2-27M40 10c6-4 12-2 14 2-6 2-10 1-14-2z",
    pipingbag: "M10 16c6-6 14-6 20 0l22 34-6 6zM46 56l3 5M52 50l5 2M18 24l8 2M24 34l8 2",
    wheat: "M32 58V14M32 18c-6-2-8-8-6-12 4 2 6 6 6 12 0-6 2-10 6-12 2 4 0 10-6 12M32 30c-8-2-10-8-8-12 4 2 8 6 8 12 0-6 4-10 8-12 2 4 0 10-8 12M32 42c-8-2-10-8-8-12 4 2 8 6 8 12 0-6 4-10 8-12 2 4 0 10-8 12",
    bread: "M10 40c0-18 44-18 44 0v10H10zM22 30l4 8M32 28l3 9M42 30l2 8",
    gradcap: "M4 26l28-12 28 12-28 12zM16 32v14c8 8 24 8 32 0V32M60 26v16",
    pin: "M32 58C22 44 14 36 14 26 14 16 22 8 32 8s18 8 18 18c0 10-8 18-18 32zM25 26a7 7 0 1 0 14 0 7 7 0 1 0-14 0z",
    mic: "M24 18a8 8 0 0 1 16 0v14a8 8 0 0 1-16 0zM16 30c0 10 8 16 16 16s16-6 16-16M32 46v10M22 56h20",
    plane: "M56 40v-5L36 22V9a4 4 0 0 0-8 0v13L8 35v5l20-6v15l-5 4v4l9-2.5 9 2.5v-4l-5-4V34z",
    rings: "M8 32a13 13 0 1 0 26 0 13 13 0 1 0-26 0zM30 32a13 13 0 1 0 26 0 13 13 0 1 0-26 0z",
    gift: "M10 26h44v8H10zM14 34v22h36V34M32 26v30M32 26c-6-10-16-10-14-4 2 4 10 4 14 4 4 0 12 0 14-4 2-6-8-6-14 4",
    sun: "M20 32a12 12 0 1 0 24 0 12 12 0 1 0-24 0zM32 6v8M32 50v8M6 32h8M50 32h8M13.6 13.6l5.7 5.7M44.7 44.7l5.7 5.7M13.6 50.4l5.7-5.7M44.7 19.3l5.7-5.7",
    flame: "M32 58c-14 0-20-10-18-20 2-10 12-14 12-26 8 6 10 12 8 18 4-2 6-6 6-10 8 8 12 16 10 24-2 8-8 14-18 14zM32 58c-6 0-8-6-6-12 2-4 6-6 6-10 4 4 8 8 6 14-1 5-3 8-6 8",
    book: "M32 16c-8-6-18-6-26-2v38c8-4 18-4 26 2 8-6 18-6 26-2V14c-8-4-18-4-26 2zM32 16v38",
    stand: "M12 24h40M14 24c0 8 36 8 36 0M32 30v18M20 56h24l-4-8H24zM50 12c5 2 7 6 5 10M14 12c-5 2-7 6-5 10",
    pot: "M10 26h44M14 26v20c0 6 4 10 10 10h16c6 0 10-4 10-10V26M6 30h8M50 30h8M26 26v-6h12v6M25 15c0-4 4-4 4-8M35 15c0-4 4-4 4-8",
    spoon: "M32 60V30M32 30c-8 0-10-10-10-16 0-6 4-10 10-10s10 4 10 10c0 6-2 16-10 16z",
    chocolate: "M14 10h36v44H14zM14 24h36M14 39h36M32 10v44",
    brigadeiro: "M18 32a14 14 0 1 0 28 0 14 14 0 1 0-28 0zM14 46c6 6 30 6 36 0l-4 12H18zM26 26h2M34 24h2M38 32h2M28 36h2M24 31h1"
  };
  var uid = 0;
  /* patch bordado: feltro + borda em ponto cheio + desenho em ponto corrido que "costura" ao aparecer */
  function patch(name, thread, felt, cls, rot) {
    var d = ICON[name] || ICON.star, id = "drm" + (uid++);
    return '<svg class="drp-patch ' + (cls || "") + '" viewBox="-4 -4 72 72" style="--r:' + (rot || 0) + 'deg" aria-hidden="true">' +
      '<circle cx="32" cy="32" r="31" fill="' + felt + '"/>' +
      '<circle class="st" cx="32" cy="32" r="30" stroke="' + thread + '" stroke-width="4" stroke-dasharray="1.3 .8"/>' +
      '<circle class="st" cx="32" cy="32" r="25" stroke="' + thread + '" stroke-opacity=".55" stroke-width="1.2" stroke-dasharray="3 2.4"/>' +
      '<g transform="translate(14 14) scale(.5625)"><mask id="' + id + '"><path class="drw" d="' + d + '" pathLength="1" stroke-width="10"/></mask>' +
      '<path class="st" d="' + d + '" stroke="rgba(58,31,26,.22)" stroke-width="4" stroke-dasharray="6 3.4" transform="translate(.8 1.2)" mask="url(#' + id + ')"/>' +
      '<path class="st" d="' + d + '" stroke="' + thread + '" stroke-width="4" stroke-dasharray="6 3.4" mask="url(#' + id + ')"/></g></svg>';
  }
  /* ilustração de fundo: [esquerda %, topo %, tamanho, velocidade da paralaxe] */
  var BGPOS = [[-10, 4, 1, 1], [74, 26, .8, -.8], [-6, 56, .9, .7], [70, 80, .75, -1]];
  function bgArt(name, pos) {
    return '<svg class="drp-bgi" viewBox="0 0 64 64" style="left:' + pos[0] + "%;top:" + pos[1] + "%;--k:" + pos[2] + ";--sp:" + pos[3] + '"><path d="' + (ICON[name] || ICON.sparkle) + '"/></svg>';
  }
  /* lugares ao redor da foto (em % da caixa da foto) */
  var SLOT = [[-20, 26], [84, 10], [-18, 54], [86, 38], [84, 64]];
  var ROT = [-12, 9, 6, -8, 14, -5, -14, 10];

  /* logo da ficha de inscrição: some sem deixar buraco se a imagem faltar */
  [].forEach.call(document.querySelectorAll("img.fm-logo, img.am-logo"), function (im) {
    var hide = function () { im.style.display = "none"; };
    if (im.complete && !im.naturalWidth) hide(); else im.addEventListener("error", hide);
  });
  var pop = document.getElementById("drPop");
  if (!pop) return;
  var $ = function (s, r) { return (r || pop).querySelector(s); };
  var list = $("#drpList"), dots = $("#drpDots"), count = $("#drpCount"), bar = $("#drpBar");
  var hero = $("#drpHero"), end = $("#drpEnd"), motifs = $(".drp-motifs"), washes = [].slice.call(pop.querySelectorAll(".drp-wash"));
  var pad = function (n) { return String(n + 1).padStart(2, "0"); };
  var esc = function (s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;"); };
  var N = D.length;
  var reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
  var desk = matchMedia("(min-width:900px)");

  /* logo: se a imagem não carregar, some sem deixar buraco */
  [].forEach.call(pop.querySelectorAll("img[data-logo]"), function (im) {
    var hide = function () { im.style.display = "none"; };
    if (im.complete && !im.naturalWidth) hide(); else im.addEventListener("error", hide);
  });

  /* ---- monta as cenas (só quando a fileira chega perto da tela, ou na primeira abertura) ---- */
  var scenes = [], dotEls = [], heroBg = null, moEls = [], moPos = null, built = false;
  function buildScenes() {
  var html = "";
  D.forEach(function (d, i) {
    var emb = "", k = 0;
    d.e.forEach(function (group, step) {
      group.forEach(function (name) {
        var s = SLOT[k % SLOT.length], alt = k % 2;
        /* .drp-ps balança com a rolagem; o patch dentro dele "costura" quando o parágrafo chega */
        emb += '<span class="drp-ps" style="left:' + s[0] + "%;top:" + s[1] + "%;--dx:" + (k % 2 ? 12 : -12) + "px;--rr:" + (k % 2 ? -10 : 10) + 'deg">' +
          patch(name, alt ? "#FFF8EC" : THREAD[(i + k) % THREAD.length], alt ? THREAD[(i + k) % THREAD.length] : "#FFFDF8", "", ROT[k % ROT.length])
            .replace('style="', 'data-step="' + step + '" style="') + "</span>";
        k++;
      });
    });
    /* ilustrações bordadas grandes no fundo da cena, ligadas ao que a chef conta */
    var bgIcons = [], flat = [].concat.apply([], d.e).concat(["whisk", "cake", "heart", "cupcake"]);
    flat.forEach(function (n) { if (bgIcons.indexOf(n) < 0 && bgIcons.length < 4) bgIcons.push(n); });
    var bg = bgIcons.map(function (n, b) { return bgArt(n, BGPOS[b]); }).join("");
    html += '<section class="drp-scene' + (d.lead ? " lead" : "") + '" id="drp' + i + '" data-i="' + i + '" style="--c:' + SCENE[i] + '" aria-label="Chef ' + esc(d.n) + '">' +
      '<div class="drp-bg" aria-hidden="true">' + bg + "</div>" +
      '<div class="drp-fig"><div class="drp-pic"><div class="drp-giant" aria-hidden="true">' + esc(d.n.split(" ")[0]) + '</div><div class="drp-blob"></div>' +
      '<div class="drp-arch"><img src="' + IMG + d.f + '.jpg" width="800" height="1067" alt="Chef ' + esc(d.n) + '" loading="' + (i < 2 ? "eager" : "lazy") + '" decoding="async"></div>' +
      '<svg class="drp-frame" viewBox="0 0 300 400" preserveAspectRatio="none" aria-hidden="true"><mask id="drf' + i + '"><path class="drw" pathLength="1" stroke-width="12" d="M-12 412V150a162 162 0 0 1 324 0v262z"/></mask><path class="th" d="M-12 412V150a162 162 0 0 1 324 0v262z" mask="url(#drf' + i + ')"/></svg>' +
      (d.lead ? '<div class="drp-crown">' + patch("crown", "#BC2350", "#FFB81C", "on") + "</div>" : "") +
      '<div class="drp-plate"><b>' + esc(d.n) + '</b><small>' + esc(d.r) + '</small></div>' +
      '<div class="drp-seal" aria-hidden="true"><svg viewBox="0 0 140 140"><circle cx="70" cy="70" r="68" fill="' + (d.lead ? "#BC2350" : "#3A1F1A") + '"/><circle cx="70" cy="70" r="62" fill="none" stroke="#FFB81C" stroke-opacity=".5" stroke-width="1.4" stroke-dasharray="4 3"/><defs><path id="drpc' + i + '" d="M70 70m-50 0a50 50 0 1 1 100 0a50 50 0 1 1-100 0"/></defs><text font-family="Figtree,sans-serif" font-weight="800" font-size="11" fill="#FFB81C"><textPath href="#drpc' + i + '" textLength="312" lengthAdjust="spacing">UNIÃO CHEFS · DIRETORIA · UNIÃO CHEFS · DIRETORIA ·</textPath></text></svg><b>' + (d.lead ? "CEO" : pad(i)) + "</b></div>" +
      '<div class="drp-emb">' + emb + "</div></div></div>" +
      '<div class="drp-txt"><div class="drp-head"><span class="drp-kick">' + (d.lead ? "Fundadora &amp; CEO" : "Chef") + '</span><h2 class="drp-nm">' + esc(d.n) + '</h2><p class="drp-quote">' + d.t + "</p></div>" +
      d.b.map(function (x, s) { return '<div class="drp-step" data-step="' + s + '"><p class="drp-b">' + esc(x) + "</p></div>"; }).join("") + "</div></section>";
  });
  list.innerHTML = html;
  dots.innerHTML = D.map(function (d, i) { return '<button type="button" data-i="' + i + '" aria-label="Ir para Chef ' + esc(d.n) + '"></button>'; }).join("");
  scenes = [].slice.call(list.children); dotEls = [].slice.call(dots.children);
  heroBg = $(".drp-hero .drp-bg");
  if (heroBg) heroBg.innerHTML = ["cake", "whisk", "cupcake", "chocolate"].map(function (n, b) { return bgArt(n, [[-6, 6, 1, 1], [80, 10, .85, -.8], [74, 58, .9, .7], [-4, 62, .8, -1]][b]); }).join("");
  }

  /* ---- fundo interativo: bordados soltos no tecido ---- */
  var MO = ["whisk", "chefhat", "heart", "star", "cupcake", "wheat", "sparkle", "cherry", "rings", "pot", "cake", "sun", "bread", "spoon"];
  var seed = 7, rnd = function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  function buildMotifs() {
  var moHTML = "";
  for (var m = 0; m < 16; m++) {
    var name = MO[m % MO.length], d = ICON[name] || ICON.sparkle;
    moHTML += '<i class="drp-mo" style="left:' + ((m % 4) * 25 + rnd() * 18).toFixed(1) + "%;top:" + (Math.floor(m / 4) * 25 + rnd() * 18).toFixed(1) + "%;--s:" + (34 + rnd() * 26).toFixed(0) + "px;--r:" + (rnd() * 60 - 30).toFixed(0) + "deg;--d:-" + (rnd() * 7).toFixed(1) + "s;--py:" + ((m % 2 ? -1 : 1) * (40 + rnd() * 70)).toFixed(0) + "px;--mc:" + THREAD[m % THREAD.length] + '"><svg viewBox="0 0 64 64"><path d="' + d + '" fill="none" stroke="currentColor" stroke-width="2.6" stroke-dasharray="5 3.4" stroke-linecap="round" stroke-linejoin="round"/></svg></i>';
  }
  motifs.innerHTML = moHTML;
  moEls = [].slice.call(motifs.children); moPos = null;
  }
  function measureMotifs() { moPos = moEls.map(function (e) { var r = e.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }); }
  function nearMotifs(x, y, rad) {
    if (!moPos) measureMotifs();
    moEls.forEach(function (e, i) { var dx = moPos[i][0] - x, dy = moPos[i][1] - y; e.classList.toggle("near", dx * dx + dy * dy < rad * rad); });
  }
  var pmT = 0;
  pop.addEventListener("pointermove", function (e) {
    if (e.pointerType !== "mouse" || reduce) return;
    if (pmT) return; pmT = requestAnimationFrame(function () { pmT = 0; nearMotifs(e.clientX, e.clientY, 140); });
  }, { passive: true });
  /* toque em área vazia: pontinhos bordados saltam do dedo */
  pop.addEventListener("click", function (e) {
    if (reduce || e.target.closest("button,a,.drp-pic,.drp-txt")) return;
    var kit = motifs.parentNode;
    for (var k = 0; k < 7; k++) {
      var a = (k / 7) * Math.PI * 2 + rnd(), dist = 50 + rnd() * 40, b = document.createElement("i");
      b.className = "drp-burst";
      b.style.cssText = "left:" + e.clientX + "px;top:" + e.clientY + "px;--bx:" + (Math.cos(a) * dist).toFixed(0) + "px;--by:" + (Math.sin(a) * dist).toFixed(0) + "px;--bc:" + THREAD[k % THREAD.length];
      b.innerHTML = '<svg viewBox="0 0 64 64" width="22" height="22"><path d="' + (k % 2 ? ICON.heart : ICON.sparkle) + '" fill="none" stroke="currentColor" stroke-width="5" stroke-dasharray="6 4" stroke-linecap="round"/></svg>';
      kit.append(b);
      setTimeout(b.remove.bind(b), 850);
    }
    nearMotifs(e.clientX, e.clientY, 170);
    setTimeout(function () { moEls.forEach(function (el) { el.classList.remove("near"); }); }, 700);
  });
  addEventListener("resize", function () { moPos = null; });

  /* cor de fundo acompanha a chef atual (troca suave entre duas camadas) */
  var wi = 0, washColor = "";
  function wash(c) {
    if (c === washColor) return; washColor = c;
    wi = 1 - wi; washes[wi].style.setProperty("--w", c); washes[wi].classList.add("on"); washes[1 - wi].classList.remove("on");
  }

  /* ---- scrollytelling: passos ---- */
  var KB = [[1.18, 0, 0], [1.06, 0, 2], [1.14, -4, 6], [1.08, 3, -1], [1.16, 0, 8]];
  var curScene = -1;
  function setScene(i) {
    if (i === curScene) return;
    curScene = i;
    count.textContent = i > -1 ? pad(i) + " / " + pad(N - 1) : N + " chefs";
    dotEls.forEach(function (d, k) { d.classList.toggle("on", k === i); });
    wash(i > -1 ? SCENE[i] : "#FFB81C");
  }
  function activate(stepEl) {
    var s = stepEl.closest(".drp-scene"), i = +s.dataset.i, n = +stepEl.dataset.step;
    /* rolagem rápida pode pular passos: tudo antes deste fica completo */
    scenes.forEach(function (sc, k) { if (k < i) complete(sc); });
    s.classList.add("in");
    [].forEach.call(s.querySelectorAll(".drp-step"), function (st) { if (+st.dataset.step <= n) st.classList.add("on"); });
    [].forEach.call(s.querySelectorAll(".drp-emb .drp-patch"), function (p) { if (+p.getAttribute("data-step") <= n) p.classList.add("on"); });
    s.setAttribute("data-step", n);
    var kb = KB[(n + 1) % KB.length], img = s.querySelector(".drp-arch img");
    img.style.transform = "scale(" + kb[0] + ") translate(" + kb[1] + "%," + kb[2] + "%)";
    setScene(i);
  }
  function complete(s) {
    if (s.dataset.done) return; s.dataset.done = 1;
    s.classList.add("in");
    [].forEach.call(s.querySelectorAll(".drp-step,.drp-emb .drp-patch"), function (el) { el.classList.add("on"); });
  }
  var stepIO = null, sceneIO, miscIO;
  function buildStepIO() {
    if (stepIO) stepIO.disconnect();
    /* linha de leitura: meio da tela no computador; no celular, meio da área de texto abaixo da foto */
    stepIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) activate(e.target); });
    }, { root: pop, rootMargin: desk.matches ? "-48% 0px -48% 0px" : "-72% 0px -27% 0px" });
    [].forEach.call(pop.querySelectorAll(".drp-step"), function (st) { stepIO.observe(st); });
  }
  function buildObservers() {
  if ("IntersectionObserver" in window) {
    buildStepIO();
    (desk.addEventListener ? desk.addEventListener("change", buildStepIO) : desk.addListener(buildStepIO));
    sceneIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { root: pop, rootMargin: "0px 0px -15% 0px" });
    scenes.forEach(function (s) { sceneIO.observe(s); });
    miscIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var t = e.target;
        if (t === hero) { t.classList.toggle("in", e.isIntersecting); if (e.isIntersecting) setScene(-1); return; }
        if (e.isIntersecting) { t.classList.add("in"); [].forEach.call(t.querySelectorAll(".drp-patch"), function (p, k) { setTimeout(function () { p.classList.add("on"); }, k * 160); }); }
      });
    }, { root: pop, threshold: 0.25 });
    [hero, end].forEach(function (el) { if (el) miscIO.observe(el); });
  } else {
    scenes.forEach(complete); hero.classList.add("in"); end.classList.add("in");
  }
  }
  function build() {
    if (built) return; built = true;
    buildScenes(); buildMotifs(); buildObservers();
  }

  /* barra de progresso: CSS cuida dela onde há suporte; senão, um cálculo leve */
  if (!(window.CSS && CSS.supports && CSS.supports("animation-timeline: scroll()"))) {
    var tick = false;
    pop.addEventListener("scroll", function () {
      if (tick) return; tick = true;
      requestAnimationFrame(function () { tick = false; var m = pop.scrollHeight - pop.clientHeight; bar.style.transform = "scaleX(" + (m > 0 ? pop.scrollTop / m : 0).toFixed(4) + ")"; });
    }, { passive: true });
  }

  function sceneTop(i) {
    var s = scenes[i];
    return Math.max(0, Math.round(s.getBoundingClientRect().top - pop.getBoundingClientRect().top + pop.scrollTop - (desk.matches ? 0 : 0)));
  }

  /* ---- abrir / fechar ---- */
  var lastBtn = null, others = [], settleT = 0, viaHistory = false, afterClose = null;
  function setOrigin(el) {
    var r = el && el.getBoundingClientRect ? el.getBoundingClientRect() : null;
    pop.style.setProperty("--ox", r ? (r.left + r.width / 2) + "px" : "50%");
    pop.style.setProperty("--oy", r && r.bottom > 0 && r.top < innerHeight ? (r.top + r.height / 2) + "px" : "50%");
  }
  function open(btn, i) {
    if (pop.classList.contains("is-open")) return;
    build();
    lastBtn = btn; setOrigin(btn);
    var root = document.documentElement;
    root.style.setProperty("--dr-sbw", (innerWidth - root.clientWidth) + "px");
    root.classList.add("dr-lock");
    others = [].filter.call(document.body.children, function (el) { return el !== pop && !/^(SCRIPT|DIALOG|svg)$/i.test(el.tagName) && !el.inert; });
    others.forEach(function (el) { el.inert = true; });
    pop.classList.add("is-open");
    if (i != null) {
      scenes.forEach(function (sc, k) { if (k < i) complete(sc); });
      pop.scrollTop = sceneTop(i);
      scenes[i].classList.add("in");
      setScene(i);
    } else { pop.scrollTop = 0; setScene(-1); hero.classList.add("in"); }
    moPos = null;
    pop.focus({ preventScroll: true });
    settleT = setTimeout(function () { pop.classList.add("is-settled"); }, 950);
    try { history.pushState({ drp: 1 }, ""); viaHistory = true; } catch (e) { viaHistory = false; }
  }
  function close(fromPop) {
    if (!pop.classList.contains("is-open")) return;
    if (viaHistory && !fromPop) { viaHistory = false; history.back(); return; }
    viaHistory = false;
    clearTimeout(settleT);
    setOrigin(lastBtn);
    pop.classList.remove("is-settled");
    void pop.offsetWidth;
    pop.classList.remove("is-open");
    document.documentElement.classList.remove("dr-lock");
    others.forEach(function (el) { el.inert = false; }); others = [];
    if (lastBtn) lastBtn.focus({ preventScroll: true });
    if (afterClose) { var f = afterClose; afterClose = null; setTimeout(f, 60); }
  }
  addEventListener("popstate", function () { if (pop.classList.contains("is-open")) { viaHistory = false; close(true); } });

  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest("[data-dr-open]");
    if (t) { e.preventDefault(); var i = t.getAttribute("data-dr-open"); open(t, i === "" ? null : +i); }
  });
  pop.addEventListener("click", function (e) {
    var c = e.target.closest("[data-dr-close]");
    if (c) {
      if (c.hasAttribute("data-dr-goto")) {
        var id = c.getAttribute("data-dr-goto");
        afterClose = function () { var el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); };
      }
      close(); return;
    }
    var d = e.target.closest(".drp-dots button");
    if (d) pop.scrollTo({ top: sceneTop(+d.dataset.i), behavior: "smooth" });
  });
  document.addEventListener("keydown", function (e) {
    if (!pop.classList.contains("is-open")) return;
    if (e.key === "Escape") { e.preventDefault(); close(); }
    else if (e.key === "Tab") {
      var f = [].filter.call(pop.querySelectorAll("button,a[href]"), function (el) { return el.offsetParent !== null; });
      if (!f.length) return;
      var a = f[0], z = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === a || document.activeElement === pop)) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    }
  });

  /* ---- fileira de miniaturas: dedo (nativo), mouse (arrastar) e setas ----
     As setas e o arrasto usam uma animação própria e desligam o encaixe enquanto andam:
     "smooth" do navegador + encaixe obrigatório trava no iPhone e dá trancos no Android. */
  var track = document.getElementById("drTrack");
  if (track) {
    var prev = document.getElementById("drPrev"), next = document.getElementById("drNext"), anim = 0;
    var items = function () { return [].slice.call(track.children); };
    var maxX = function () { return track.scrollWidth - track.clientWidth; };
    var xOf = function (i) { var it = items(); return Math.max(0, Math.min(maxX(), it[i].offsetLeft - it[0].offsetLeft)); };
    var nearest = function (x) { var best = 0, bd = 1e9; items().forEach(function (_, i) { var d = Math.abs(xOf(i) - x); if (d < bd) { bd = d; best = i; } }); return best; };
    function stopAnim() { cancelAnimationFrame(anim); track.style.scrollSnapType = ""; }
    function animTo(x) {
      cancelAnimationFrame(anim);
      var from = track.scrollLeft, dist = x - from;
      if (reduce || Math.abs(dist) < 2) { track.scrollLeft = x; return; }
      var dur = Math.min(700, Math.max(320, Math.abs(dist) * 0.8)), t0 = performance.now();
      track.style.scrollSnapType = "none";
      (function step(now) {
        var t = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - t, 3);
        track.scrollLeft = from + dist * e;
        if (t < 1) anim = requestAnimationFrame(step); else { track.scrollLeft = x; track.style.scrollSnapType = ""; }
      })(t0);
    }
    var upd = function () { if (prev) prev.disabled = track.scrollLeft <= 2; if (next) next.disabled = track.scrollLeft >= maxX() - 2; };
    if (prev) prev.addEventListener("click", function () { var x = track.scrollLeft, t = 0; items().forEach(function (_, i) { if (xOf(i) < x - 4) t = i; }); animTo(xOf(t)); });
    if (next) next.addEventListener("click", function () { var x = track.scrollLeft, n = items().length, t = n - 1; for (var i = 0; i < n; i++) if (xOf(i) > x + 4) { t = i; break; } animTo(xOf(t)); });
    var ur = 0;
    track.addEventListener("scroll", function () { cancelAnimationFrame(ur); ur = requestAnimationFrame(upd); }, { passive: true });
    track.addEventListener("touchstart", stopAnim, { passive: true });
    track.addEventListener("wheel", stopAnim, { passive: true });
    addEventListener("resize", upd); upd();
    /* arrastar com o mouse (o toque já é nativo) */
    var down = false, moved = false, sx = 0, sl = 0, lx = 0, lt = 0, v = 0;
    track.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      stopAnim(); down = true; moved = false; sx = lx = e.clientX; sl = track.scrollLeft; lt = performance.now(); v = 0;
    });
    addEventListener("pointermove", function (e) {
      if (!down) return;
      var dx = e.clientX - sx;
      if (!moved && Math.abs(dx) > 6) { moved = true; track.classList.add("is-drag"); track.style.scrollSnapType = "none"; }
      if (!moved) return;
      var now = performance.now(); v = (e.clientX - lx) / Math.max(1, now - lt); lx = e.clientX; lt = now;
      track.scrollLeft = sl - dx;
    });
    addEventListener("pointerup", function () {
      if (!down) return; down = false;
      if (!moved) return;
      track.classList.remove("is-drag");
      animTo(xOf(nearest(track.scrollLeft - v * 220)));  /* impulso do arrasto e para encaixado num card */
      setTimeout(function () { moved = false; }, 0);
    });
    track.addEventListener("click", function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
    track.addEventListener("dragstart", function (e) { e.preventDefault(); });
  }

  /* pré-monta quando a fileira se aproxima da tela, para o pop-up abrir sem engasgo; quem não chega lá não paga o custo */
  if (track && "IntersectionObserver" in window) {
    var pre = new IntersectionObserver(function (es) {
      if (es.some(function (e) { return e.isIntersecting; })) { pre.disconnect(); (window.requestIdleCallback || setTimeout)(build); }
    }, { rootMargin: "600px 0px" });
    pre.observe(track);
  } else { setTimeout(build, 1500); }
})();
