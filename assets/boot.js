/* Se uma imagem/vídeo de "imagens/" não carregar, tenta o mesmo arquivo na raiz (antes era onerror dentro do HTML,
   que a política de segurança (CSP) não permite). */
document.addEventListener('error', function (e) {
  var t = e.target;
  if (!t || !t.tagName) return;
  var n = t.tagName;
  if ((n === 'IMG' || n === 'VIDEO') && !t.getAttribute('data-fb')) {
    t.setAttribute('data-fb', '1');
    var s = t.getAttribute('src');
    if (s && s.indexOf('/') > -1) t.setAttribute('src', s.split('/').pop());
  }
}, true);
