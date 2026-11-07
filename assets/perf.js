'use strict';
/* Desempenho no celular: carrega vídeo só perto da tela, pausa vídeo fora da tela,
   respeita economia de dados / rede lenta e reajusta as animações quando imagens lazy terminam de carregar. */
(function () {
  var vids = [].slice.call(document.querySelectorAll('video'));
  var cx = navigator.connection || {};
  var lenta = !!cx.saveData || /^(slow-2g|2g|3g)$/.test(cx.effectiveType || '');
  var semMovimento = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var economia = lenta || semMovimento;

  function tocar(v) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
  function carregar(v) {
    if (v.dataset.src && !v.getAttribute('src')) { v.src = v.dataset.src; v.load(); }
  }
  function estado(v) {
    if (v._s) return v._s;
    var s = v._s = { vis: false, porMim: false, user: false };
    v.addEventListener('pause', function () { if (!s.porMim && s.vis) s.user = true; s.porMim = false; });
    v.addEventListener('play', function () { s.user = false; });
    return s;
  }

  vids.forEach(function (v) {
    if (!economia) return;
    // Economia de dados: fica só o poster; um toque no vídeo carrega e toca.
    if (v.getAttribute('src')) { v.dataset.src = v.getAttribute('src'); v.removeAttribute('src'); }
    v.removeAttribute('autoplay');
    v.pause();
    v.load();
    var caixa = v.parentNode;
    caixa.addEventListener('click', function (e) {
      if (v.getAttribute('src')) return;
      e.stopPropagation();
      carregar(v); tocar(v);
    }, true);
  });

  if (!economia && vids.length) {
    if (!('IntersectionObserver' in window)) {
      vids.forEach(function (v) { carregar(v); });
    } else {
      var io = new IntersectionObserver(function (lista) {
        lista.forEach(function (en) {
          var v = en.target, s = estado(v);
          s.vis = en.isIntersecting;
          if (en.isIntersecting) {
            carregar(v);
            if (!s.user) tocar(v);
          } else if (!v.paused) {
            s.porMim = true; v.pause();
          }
        });
      }, { rootMargin: '200px 0px' });
      vids.forEach(function (v) { io.observe(v); });
    }
  }

  // Imagens lazy mudam a altura da página: pede ao ScrollTrigger para recalcular.
  var t;
  function recalcular() {
    clearTimeout(t);
    t = setTimeout(function () { if (window.ScrollTrigger) window.ScrollTrigger.refresh(); }, 200);
  }
  [].slice.call(document.querySelectorAll('img[loading="lazy"]')).forEach(function (img) {
    if (!img.complete) img.addEventListener('load', recalcular, { once: true });
  });
})();
