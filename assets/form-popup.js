/* Pop-up da ficha de inscrição (União Chefs). Arquivo externo por causa do CSP (script-src 'self'). */
(function () {
  'use strict';
  var dlg = document.getElementById('formPop');
  var form = document.getElementById('formInscricao');
  if (!dlg || !form || typeof dlg.showModal !== 'function') return; // sem suporte: o link abre o Google Forms em nova aba

  var root = document.documentElement;
  var btnSend = document.getElementById('fmSend');
  var msg = document.getElementById('fmMsg');
  var done = document.getElementById('fmDone');
  var outro = document.getElementById('f-outro');
  var lastTrigger = null;
  var FALLBACK_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdfyX739x7UEjZ0RVe3qCy8Pl9KXnCUXPDyyyX_kwvqW2_-Ug/viewform';

  function open(trigger) {
    lastTrigger = trigger || null;
    msg.textContent = '';
    dlg.classList.remove('is-done');
    dlg.showModal();
    root.classList.add('fm-lock');
    var box = dlg.querySelector('.pop-box');
    if (box) box.scrollTop = 0;
  }
  function close() { if (dlg.open) dlg.close(); }

  dlg.addEventListener('close', function () {
    root.classList.remove('fm-lock');
    if (dlg.classList.contains('is-done')) { form.reset(); outro.hidden = true; }
    if (lastTrigger && lastTrigger.focus) lastTrigger.focus();
  });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) close(); });
  document.getElementById('formClose').addEventListener('click', close);
  document.getElementById('fmDoneClose').addEventListener('click', close);

  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-open-form]') : null;
    if (!t) return;
    e.preventDefault();
    open(t);
  });

  // "Outro": mostra o campo de texto
  form.addEventListener('change', function (e) {
    if (e.target.name !== 'origem') return;
    var isOutro = e.target.value === '__outro__';
    outro.hidden = !isOutro;
    outro.required = isOutro;
    if (isOutro) outro.focus();
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    msg.textContent = '';
    if (!form.checkValidity()) { form.reportValidity(); return; }

    var data = {};
    new FormData(form).forEach(function (v, k) { data[k] = String(v).trim(); });
    if (data.site) return; // isca anti-robô preenchida

    btnSend.disabled = true;
    var label = btnSend.firstChild.nodeValue;
    btnSend.firstChild.nodeValue = 'Enviando…';

    var ctl = 'AbortController' in window ? new AbortController() : null;
    var to = setTimeout(function () { if (ctl) ctl.abort(); }, 20000); // rede ruim: não fica "Enviando…" para sempre
    fetch('/api/inscricao', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal: ctl ? ctl.signal : undefined
    }).then(function (r) {
      if (r.status === 429) throw new Error('limite');
      if (!r.ok) throw new Error('http ' + r.status);
      dlg.classList.add('is-done');
      done.focus();
      document.dispatchEvent(new CustomEvent('ld:evento', { detail: { nome: 'enviar_inscricao' } })); // conversão no GA, sem dados pessoais
    }).catch(function (err) {
      if (err && err.message === 'limite') {
        msg.textContent = 'Muitas tentativas seguidas. Aguarde um minuto e tente de novo.';
      } else {
        msg.innerHTML = 'Não foi possível enviar agora. Tente de novo ou <a href="' + FALLBACK_URL + '" target="_blank" rel="noopener noreferrer">abra a ficha original</a>.';
      }
    }).then(function () {
      clearTimeout(to);
      btnSend.disabled = false;
      btnSend.firstChild.nodeValue = label;
    });
  });
})();
