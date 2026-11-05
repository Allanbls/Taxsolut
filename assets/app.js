const $=id=>document.getElementById(id);
const WA='https://wa.me/5511991311931?text=';
const brl=v=>v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});

let tw;function tween(el,to){const from=+(el.dataset.v||0);el.dataset.v=to;cancelAnimationFrame(tw);
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||!from){el.textContent=brl(to);return}
  const t0=performance.now(),d=500;(function f(t){const k=Math.min(1,(t-t0)/d),e=1-Math.pow(1-k,3);el.textContent=brl(from+(to-from)*e);if(k<1)tw=requestAnimationFrame(f)})(t0)}
/* Holerite: INSS 2026 + IRRF 2026 (Lei 15.270/2025) */
function inss(s){const f=[[1621.00,.075],[2902.84,.09],[4354.27,.12],[8475.55,.14]];let a=0,t=0;for(const[l,p]of f){if(s>a)t+=(Math.min(s,l)-a)*p;a=l}return Math.round(t*100)/100}
function irT(b){if(b<=2428.80)return 0;if(b<=2826.65)return b*.075-182.16;if(b<=3751.05)return b*.15-394.16;if(b<=4664.68)return b*.225-675.49;return b*.275-908.73}
function irrf(b,i,d){let ir=Math.max(0,Math.min(irT(Math.max(0,b-i-d*189.59)),irT(Math.max(0,b-607.20))));let r=0;if(b<=5000)r=ir;else if(b<=7350)r=Math.max(0,978.62-.133145*b);return Math.round(Math.max(0,ir-r)*100)/100}
function hol(){const raw=Math.max(0,+$('bruto').value||0),h=$('bruto').closest('.hol');h.classList.toggle('empty',!raw);h.classList.toggle('ready',!!raw&&!window.__holOn);
  const b=window.__holOn?raw:0,d=Math.max(0,+$('dep').value||0),i=inss(b),r=irrf(b,i,d);
  $('h-b').textContent=brl(b);$('h-i').textContent='− '+brl(i);$('h-ia').textContent=b?'('+(i/b*100).toFixed(1).replace('.',',')+'%)':'';
  $('h-r').textContent=b?(r?'− '+brl(r):'isento'):brl(0);tween($('h-l'),Math.max(0,b-i-r));
  const hint=$('hol-hint');if(hint)hint.innerHTML=raw?'Toque em <b>Ver resultado</b> para calcular':'↑ Digite o seu <b>salário bruto</b> para ver o cálculo';
  const wa=$('hol-wa');if(wa){const ri=inss(raw),rr=irrf(raw,ri,d),txt=raw?`Olá, TaxSolut! Fiz a simulação de holerite no site:\n• Salário bruto: ${brl(raw)}\n• Dependentes: ${d}\n• INSS: ${brl(ri)}\n• Imposto de Renda: ${rr?brl(rr):'isento'}\n• Líquido: ${brl(Math.max(0,raw-ri-rr))}\nGostaria de falar com um contador.`:'Olá, TaxSolut! Quero tirar uma dúvida sobre o meu holerite.';wa.href='https://wa.me/5511991311931?text='+encodeURIComponent(txt)}}
['bruto','dep'].forEach(x=>$(x).addEventListener('input',()=>{window.__holOn=false;hol()}));hol();

/* Stages */
const stages=[
 {h:'Primeiro, uma conversa',p:'Pelo WhatsApp, em poucos minutos: você conta o que faz, quanto fatura e onde quer chegar. Sem compromisso.'},
 {h:'Depois, a proposta',p:'Preço fixo por mês, com tudo o que está incluso por escrito. Nada de cobrança surpresa.'},
 {h:'Então, a gente organiza',p:'Abrimos o CNPJ ou buscamos seus documentos com o contador antigo. Você não para de trabalhar.'},
 {h:'Por fim, você acompanha',p:'Guias, holerites e relatórios chegam pelo WhatsApp, sempre antes do prazo.'}];
const steps=[['Conversa inicial','15 min'],['Proposta enviada','em 1 dia útil'],['Documentos recebidos','pelo WhatsApp'],['CNPJ ativo ou transferência feita','sem você sair'],['Primeira guia enviada','antes do dia 20']];
const map=[0,1,3,5];
function stage(n){const s=stages[n],h=$('st-h'),p=$('st-p');h.style.opacity=p.style.opacity=0;
  setTimeout(()=>{h.textContent=s.h;p.textContent=s.p;h.style.opacity=p.style.opacity=1},180);
  $('proc').innerHTML=steps.map((x,i)=>{const c=i<map[n]?'done':i===map[n]?'now':'wait';return `<li class="${c}"><i></i><span>${x[0]}</span><small>${c==='done'?'feito':x[1]}</small></li>`}).join('');
  [...$('stage-names').children].forEach((li,i)=>li.classList.toggle('cur',i===n));
  const r=$('stage');r.value=n;$('rail').style.setProperty('--p',(n/3*100)+'%');r.setAttribute('aria-valuetext',$('stage-names').children[n].textContent)}
$('stage').addEventListener('input',e=>stage(+e.target.value));
[...$('stage-names').children].forEach((li,i)=>li.addEventListener('click',()=>stage(i)));
stage(0);$('st-date').textContent=new Date().toLocaleDateString('pt-BR',{day:'numeric',month:'short'});

/* MEI */
function mei(){const m=+$('mes').value,f=Math.max(0,+$('fat').value||0),lim=6750*(13-m),p=f/lim*100;
  $('m-lim').textContent=brl(lim).replace(',00','');$('m-uso').textContent=p.toFixed(0)+'%';$('m-res').textContent=brl(Math.max(0,lim-f)).replace(',00','');
  const g=$('gb');g.style.width=Math.min(100,p)+'%';g.className=p>100?'over':p>=80?'warn':'';
  $('m-msg').textContent=p>120?'Passou mais de 20% do limite: o desenquadramento vale desde janeiro. Fale com a gente hoje.':p>100?'Passou do limite em até 20%: você paga DAS complementar e vira ME em janeiro. Vamos planejar.':p>=80?'Você está perto do limite. É hora de planejar a mudança para ME.':'Tudo certo por enquanto. Acompanhe todo mês.'}
['mes','fat'].forEach(x=>$(x).addEventListener('input',mei));mei();

/* Agenda board */
const ag=[
 ['Salários do mês','5º dia útil','mensal','Folha','soon','O pagamento dos salários vence até o 5º dia útil do mês seguinte. A gente confirma o dia exato de cada mês.'],
 ['DAS do MEI','dia 20','mensal','MEI','soon','Guia única do MEI com INSS e ISS ou ICMS. Mandamos o boleto pronto no WhatsApp.'],
 ['DAS do Simples Nacional','dia 20','mensal','Simples','soon','Calculado sobre o faturamento do mês anterior. Conferimos as notas antes de gerar a guia.'],
 ['FGTS Digital','dia 20','mensal','Folha','soon','Depósito do FGTS dos funcionários, gerado a partir da folha enviada ao eSocial.'],
 ['INSS da folha (DCTFWeb)','dia 20','mensal','Folha','soon','Contribuições previdenciárias da folha, declaradas pela DCTFWeb.'],
 ['13º salário, 1ª parcela','30 de nov.','anual','Folha','soon','Metade do 13º, sem descontos, para todos os funcionários.'],
 ['13º salário, 2ª parcela','20 de dez.','anual','Folha','','Segunda metade, já com os descontos de INSS e Imposto de Renda.'],
 ['Declaração anual do MEI','31 de mai.','anual','MEI','','A DASN-SIMEI informa quanto o MEI faturou no ano anterior.']];
const rows=$('rows');
rows.innerHTML=ag.map((a,i)=>`<button class="r" aria-expanded="${i===5}" aria-controls="d${i}"><span>${a[0]}</span><span class="f">${a[1]}</span><span class="f">${a[2]} · ${a[3]}</span><span class="tag-st ${a[4]}">${a[4]?'Próximo':'Em breve'}</span><span class="det" id="d${i}">${a[5]}</span></button>`).join('');
rows.querySelectorAll('.r').forEach(b=>b.addEventListener('click',()=>{rows.querySelectorAll('.r').forEach(x=>x.setAttribute('aria-expanded',x===b))}));

/* Contato */
const FORM_T0=Date.now();
const clean=(s,max)=>String(s==null?'':s).normalize('NFC').replace(/<[^>]*>/g,'').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F​-‏‪-‮⁠-⁩﻿]/g,'').replace(/[ \t]+/g,' ').replace(/ ?\n ?/g,'\n').replace(/\n{3,}/g,'\n\n').trim().slice(0,max);
const store={get(k){try{return JSON.parse(localStorage.getItem(k)||'null')}catch(_){return null}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(_){}}};
/* limite de envios no navegador: 3 a cada 10 minutos */
function rateOk(key,max,ms){const now=Date.now(),a=(store.get(key)||[]).filter(t=>now-t<ms);if(a.length>=max){store.set(key,a);return false}a.push(now);store.set(key,a);return true}
const normTel=d=>(d.length>11&&d.startsWith('55'))?d.slice(2):d;
const telOk=d=>(d.length===10||d.length===11)&&/^[1-9][1-9]/.test(d)&&(d.length===10||d[2]==='9');
const fmtTel=d=>d.length===11?`(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`:`(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`;
const nomeOk=s=>/^[\p{L}][\p{L}\s'.\-]{1,79}$/u.test(s);
const mailOk=s=>s.length<=120&&/^[^\s@<>()\[\]\\,;:"]+@[^\s@<>()\[\]\\,;:"]+\.[A-Za-z]{2,}$/.test(s);
$('cform2').addEventListener('submit',e=>{e.preventDefault();
  const h=$('f-help'),fail=(m,el)=>{h.textContent=m;h.className='after err';el&&el.focus()};
  if($('f-site')&&$('f-site').value){h.textContent='Pronto!';h.className='after ok';return} /* campo-isca: robôs preenchem */
  const nome=clean($('f-nome').value,80).replace(/[*_~`]/g,''),mail=clean($('f-mail').value,120).replace(/[*_~`]/g,''),
    msgTxt=clean($('f-msg').value,800),tel=normTel($('f-tel').value.replace(/\D/g,'')),
    assuntos=[...$('f-ass').options].map(o=>o.value),ass=assuntos.includes($('f-ass').value)?$('f-ass').value:'Outro assunto';
  if(!nomeOk(nome))return fail('Digite seu nome para a gente saber com quem fala.',$('f-nome'));
  if(!telOk(tel))return fail('Confira o WhatsApp: use o DDD e os 8 ou 9 dígitos, por exemplo (11) 9 1234-5678.',$('f-tel'));
  if(mail&&!mailOk(mail))return fail('Confira o e-mail. Ele deve ser parecido com nome@empresa.com.br.',$('f-mail'));
  if(Date.now()-FORM_T0<1500)return fail('Aguarde um instante e envie novamente.');
  if(!rateOk('ts_form',3,600000))return fail('Você já enviou algumas mensagens. Aguarde alguns minutos ou chame direto pelo WhatsApp.');
  const L=['Olá, TaxSolut! 👋','Vim pelo site e gostaria de atendimento.','',
    '*Nome:* '+nome,'*Assunto:* '+ass,'*WhatsApp:* '+fmtTel(tel)];
  if(mail)L.push('*E-mail:* '+mail);
  if(msgTxt)L.push('','*Mensagem:*',msgTxt);
  const url=WA+encodeURIComponent(L.join('\n'));
  h.innerHTML='Pronto! <a href="'+url+'" target="_blank" rel="noopener noreferrer">Toque aqui se o WhatsApp não abrir sozinho</a>.';h.className='after ok';
  const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';document.body.appendChild(a);a.click();a.remove()});



/* v3: progresso, menu flutuante, inclinação, papéis, calendário, painel */
const prog=$('prog'),fnav=$('fnav'),heroEl=document.querySelector('.hero');
function onScroll(){const h=document.documentElement,max=h.scrollHeight-h.clientHeight;prog.style.transform=`scaleX(${max?h.scrollTop/max:0})`;
  fnav.classList.toggle('show',h.scrollTop>$('inicio-wrap').offsetHeight-innerHeight*.6)}
addEventListener('scroll',onScroll,{passive:true});onScroll();
const tilt=$('tilt'),hr=document.querySelector('.hero-r');
if(matchMedia('(hover:hover) and (prefers-reduced-motion:no-preference)').matches){
  hr.addEventListener('pointermove',e=>{const r=hr.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;tilt.style.transform=`perspective(1200px) rotateY(${x*10}deg) rotateX(${-y*8}deg)`});
  hr.addEventListener('pointerleave',()=>tilt.style.transform='')}
const stack=$('stack'),txs=['-210px','-72px','72px','210px'];
new IntersectionObserver((es,o)=>es.forEach(en=>{if(en.isIntersecting){setTimeout(()=>stack.classList.add('fan'),350);o.disconnect()}}),{threshold:.4}).observe(stack);
stack.querySelectorAll('.doc').forEach((d,i)=>{d.style.setProperty('--tx',txs[i]);const t=()=>{const on=!d.classList.contains('up');stack.querySelectorAll('.doc').forEach(x=>x.classList.remove('up'));d.classList.toggle('up',on)};
  d.addEventListener('click',t);d.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();t()}})});
const ev={2:{h:1,t:'Dia 2, Finados: feriado nacional.'},15:{h:1,t:'Dia 15, Proclamação da República: feriado nacional (cai num domingo).'},
 20:{v:1,h:1,t:'Dia 20: DAS, FGTS e INSS da folha. Como é feriado da Consciência Negra, a gente confirma a data certa de cada guia.'},
 30:{v:1,t:'Dia 30: pagamento da 1ª parcela do 13º salário.'}};
const cg=$('calg');let html=['D','S','T','Q','Q','S','S'].map(w=>`<span class="w">${w}</span>`).join('');
for(let d=1;d<=30;d++){const e=ev[d];html+=e?`<button type="button" class="${e.v?'v ':''}${e.h?'h':''}" data-d="${d}" aria-label="${e.t}">${d}</button>`:`<button type="button" tabindex="-1" disabled>${d}</button>`}
cg.innerHTML=html;
cg.querySelectorAll('[data-d]').forEach(b=>b.addEventListener('click',()=>{cg.querySelectorAll('.sel').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');$('calinfo').textContent=ev[b.dataset.d].t}));

/* capa: sem vídeo, fica o fundo escuro */
const cv=$('cover-video'),cover=document.querySelector('.cover');
[...cv.querySelectorAll('source')].pop().addEventListener('error',()=>cover.classList.add('novideo'));
if(matchMedia('(prefers-reduced-motion: reduce)').matches){cv.removeAttribute('autoplay');cv.pause()}


/* vidro: reflexo segue o dedo/mouse */
document.querySelectorAll('.btn,.fnav,.ticker,.summary,.cover .top-link,.one button').forEach(el=>{
  el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.setProperty('--mx',(e.clientX-r.left)+'px');el.style.setProperty('--my',(e.clientY-r.top)+'px')});
  el.addEventListener('pointerleave',()=>{el.style.removeProperty('--mx');el.style.removeProperty('--my')})});


/* v21: seu caso — painéis lado a lado, rolagem nativa com o dedo, abas e setas sincronizadas */
(function(){const sec=document.querySelector('.cases'),stg=sec.querySelector('.case-stage'),tabs=[...sec.querySelectorAll('.case-tab')],pans=[...sec.querySelectorAll('.case-pan')],cnt=sec.querySelector('.case-count b');
 let cur=-1,timer=null,auto=!matchMedia('(prefers-reduced-motion: reduce)').matches,inView=false;const DUR=7000;
 function mark(i){if(i===cur)return;cur=i;tabs.forEach((t,j)=>t.setAttribute('aria-selected',j===i));pans.forEach((p,j)=>{p.classList.toggle('on',j===i);p.setAttribute('aria-hidden',j!==i);p.inert=j!==i});
  if(cnt)cnt.textContent=String(i+1).padStart(2,'0');const bar=tabs[0].parentElement;if(bar.scrollWidth>bar.clientWidth)bar.scrollTo({left:tabs[i].offsetLeft-16,behavior:'smooth'})}
 function show(i){i=(i+pans.length)%pans.length;stg.scrollTo({left:i*stg.clientWidth,behavior:'smooth'});mark(i);schedule()}
 function schedule(){clearTimeout(timer);if(auto&&inView)timer=setTimeout(()=>show(cur+1),DUR)}
 function stop(){auto=false;sec.classList.add('paused');clearTimeout(timer)}
 let raf;stg.addEventListener('scroll',()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>mark(Math.round(stg.scrollLeft/stg.clientWidth)))},{passive:true});
 stg.addEventListener('pointerdown',stop);stg.addEventListener('touchstart',stop,{passive:true});
 tabs.forEach((t,i)=>{t.addEventListener('click',()=>{stop();show(i)});t.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();stop();show(cur+(e.key==='ArrowRight'?1:-1));tabs[cur].focus()}})});
 sec.querySelectorAll('.case-arr').forEach(b=>b.addEventListener('click',()=>{stop();show(cur+(+b.dataset.cd))}));
 new IntersectionObserver(es=>{inView=es[0].isIntersecting;schedule()},{threshold:.35}).observe(sec);
 addEventListener('resize',()=>{stg.scrollLeft=cur*stg.clientWidth});
 mark(0);if(!auto)sec.classList.add('paused');})();


/* v11: setas nos botões */
const ARROW='<span class="bi" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>';
document.querySelectorAll('.btn').forEach(b=>{if(!b.querySelector('.bi'))b.insertAdjacentHTML('beforeend',ARROW)});
/* v11: efeitos de rolagem nos cards */
(function(){const groups=[['.svc'],['.case-tab'],['.doc'],['.kpi'],['.r'],['.grp'],['.q'],['.cdata div']];
 const items=[...document.querySelectorAll('.case-stage,.hol,.meter,.dash,.cal,.chat,.proc,.pane,.r,.kpi,.grp,.svc')];
 items.forEach(el=>{el.classList.add('sc');const sib=[...el.parentElement.children].filter(x=>x.classList.contains('sc'));el.style.setProperty('--k',Math.min(sib.indexOf(el),6))});
 document.querySelectorAll('.case-img,.svc-ph').forEach(el=>el.classList.add('reveal-img'));
 const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('vis');io.unobserve(en.target)}}),{threshold:0,rootMargin:'0px 0px 12% 0px'});
 document.querySelectorAll('.sc,.reveal-img').forEach(el=>io.observe(el));
 /* parallax suave nas fotos */
 if(matchMedia('(prefers-reduced-motion: reduce)').matches||!matchMedia('(hover:hover)').matches)return;
 const px=[...document.querySelectorAll('.case-img img,.svc-ph img')];let tick=false;
 function upd(){const vh=innerHeight;px.forEach(img=>{const r=img.parentElement.getBoundingClientRect();if(r.bottom<0||r.top>vh)return;const t=(r.top+r.height/2-vh/2)/vh;img.style.setProperty('--py',(t*-28).toFixed(1)+'px')});
  const m=document.querySelector('.mei');if(m){const r=m.getBoundingClientRect();if(r.bottom>0&&r.top<vh)m.style.backgroundPosition='center '+(50+((r.top+r.height/2-vh/2)/vh)*-18).toFixed(1)+'%'}tick=false}
 addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});upd();})();


/* v13: animações só rodam quando visíveis */
(function(){const io=new IntersectionObserver(es=>es.forEach(en=>en.target.classList.toggle('playing',en.isIntersecting)),{threshold:.2});
 document.querySelectorAll('.gf').forEach(g=>io.observe(g));})();
/* v14: especialidades */
(function(){const bs=[...document.querySelectorAll('.ni')],ps=[...document.querySelectorAll('.np')];
 function pick(i,f){bs.forEach((b,j)=>b.setAttribute('aria-selected',i===j));ps.forEach((p,j)=>p.hidden=i!==j);if(f)bs[i].focus();
  const l=bs[0].parentElement;if(l.scrollWidth>l.clientWidth)l.scrollTo({left:bs[i].offsetLeft-16,behavior:'smooth'})}
 bs.forEach((b,i)=>{b.onclick=()=>pick(i);b.onkeydown=e=>{const k={ArrowDown:1,ArrowRight:1,ArrowUp:-1,ArrowLeft:-1}[e.key];if(k){e.preventDefault();pick((i+k+bs.length)%bs.length,true)}}});
 const st=document.querySelector('.ni-stage');let x0=null,y0=0;
 st.addEventListener('touchstart',e=>{x0=e.touches[0].clientX;y0=e.touches[0].clientY},{passive:true});
 st.addEventListener('touchend',e=>{if(x0===null)return;const dx=e.changedTouches[0].clientX-x0,dy=e.changedTouches[0].clientY-y0;x0=null;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.3){const c=bs.findIndex(b=>b.getAttribute('aria-selected')==='true');pick((c+(dx<0?1:-1)+bs.length)%bs.length)}},{passive:true});})();


/* v16: vídeo toca só quando aparece; botão pausar */
(function(){const v=$('todo-video'),b=$('vid-btn');if(!v)return;const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;let user=false;
 const set=()=>{const p=v.paused;b.classList.toggle('paused',p);b.setAttribute('aria-label',p?'Tocar vídeo':'Pausar vídeo')};
 b.onclick=()=>{user=true;if(v.paused){v.play().catch(()=>{})}else v.pause();};v.addEventListener('play',set);v.addEventListener('pause',set);
 if(reduce){set();return}
 new IntersectionObserver(es=>{if(user&&v.paused)return;es[0].isIntersecting?v.play().catch(()=>{}):v.pause()},{threshold:.35}).observe(v);set();})();

/* Entradas */
const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('vis');io.unobserve(en.target)}}),{threshold:0,rootMargin:'0px 0px 12% 0px'});
document.querySelectorAll('[data-in]').forEach(el=>io.observe(el));

/* v20: serviços na horizontal (setas e bolinhas, volta ao início no fim) */
(()=>{const tr=$('sv-track');if(!tr||!document.querySelector('.sv-dots'))return;const cards=[...tr.children],dots=document.querySelector('.sv-dots');
 const step=()=>cards[1].offsetLeft-cards[0].offsetLeft;
 const pages=()=>Math.max(1,Math.ceil((tr.scrollWidth-tr.clientWidth)/step()-0.01)+1);
 let np=0;function build(){np=pages();dots.innerHTML='';for(let i=0;i<np;i++){const b=document.createElement('button');b.type='button';b.setAttribute('role','tab');b.setAttribute('aria-label','Ir para o serviço '+(i+1));b.onclick=()=>go(i);dots.appendChild(b)}mark()}
 function cur(){return Math.round(tr.scrollLeft/step())}
 function mark(){const c=Math.min(np-1,tr.scrollLeft+tr.clientWidth>=tr.scrollWidth-4?np-1:cur());[...dots.children].forEach((d,i)=>d.setAttribute('aria-selected',i===c))}
 function go(i){i=(i+np)%np;tr.scrollTo({left:i*step(),behavior:'smooth'})}
 document.querySelectorAll('.sv-arr').forEach(b=>b.addEventListener('click',()=>{const end=tr.scrollLeft+tr.clientWidth>=tr.scrollWidth-4;const d=+b.dataset.dir;if(d>0&&end)go(0);else if(d<0&&tr.scrollLeft<4)go(np-1);else go(cur()+d)}));
 let t;tr.addEventListener('scroll',()=>{cancelAnimationFrame(t);t=requestAnimationFrame(mark)},{passive:true});
 tr.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();go(cur()+1)}if(e.key==='ArrowLeft'){e.preventDefault();go(cur()-1)}});
 addEventListener('resize',build);build();})();
/* v20: valores — pausa ao tocar */
(()=>{const m=document.querySelector('.val-mq');if(!m)return;m.addEventListener('pointerdown',()=>m.classList.add('hold'));addEventListener('pointerup',()=>m.classList.remove('hold'));addEventListener('pointercancel',()=>m.classList.remove('hold'))})();
/* v28: calculadora — resultado só aparece em "Ver resultado" */
(()=>{const b=$('bruto'),d=$('dep'),h=b.closest('.hol');if(!b||!d)return;
 const show=()=>{if(!(+b.value>0)){b.focus();return}window.__holOn=true;hol();d.blur();b.blur();const l=$('h-l');h.classList.remove('flash');void h.offsetWidth;h.classList.add('flash');l.scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})};
 $('hol-ok').addEventListener('click',show);
 b.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();d.focus();d.select&&d.select()}});
 d.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();show()}});
 document.querySelectorAll('.sv-list .sv2-ill').forEach((el,i)=>el.style.setProperty('--i',i));})();

/* v31: leveza */
(()=>{
 // vídeo da capa: começa a baixar só depois que a página carregou, e pausa fora da tela
 const v=document.getElementById('cover-video');
 if(v&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const start=()=>{v.preload='auto';v.load();v.play().catch(()=>{});
   new IntersectionObserver(es=>{es[0].isIntersecting?v.play().catch(()=>{}):v.pause()}).observe(v)};
  if(document.readyState==='complete')setTimeout(start,600);else addEventListener('load',()=>setTimeout(start,600))}
 // animações infinitas só rodam na seção que está na tela
 const io=new IntersectionObserver(es=>es.forEach(en=>en.target.classList.toggle('off',!en.isIntersecting)),{rootMargin:'150px 0px'});
 document.querySelectorAll('main > section, main > div > section, footer, .valores').forEach(el=>{el.classList.add('off');io.observe(el)});
})();

/* v32: menu do topo (celular/tablet) */
(()=>{const nav=document.getElementById('cover-nav');if(!nav)return;const t=nav.querySelector('.cn-toggle');
 const set=o=>{nav.classList.toggle('open',o);t.setAttribute('aria-expanded',o);t.setAttribute('aria-label',o?'Fechar menu':'Abrir menu')};
 t.addEventListener('click',e=>{e.stopPropagation();set(!nav.classList.contains('open'))});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>set(false)));
 document.addEventListener('click',e=>{if(!nav.contains(e.target))set(false)});
 addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){set(false);t.focus()}});})();
/* v33: typewriter dinâmico na última palavra do título (Versão Robusta) */
(()=>{const el=document.querySelector('.tw');if(!el)return;
 const wrap=el.parentElement,caret=wrap.querySelector('.tw-caret'),words=el.dataset.words.split('|');
 const fit=()=>{const m=el.cloneNode();m.removeAttribute('data-words');m.style.cssText='position:absolute;left:0;top:0;visibility:hidden;white-space:nowrap';wrap.appendChild(m);
  let w=0;words.forEach(t=>{m.textContent=t;w=Math.max(w,m.getBoundingClientRect().width)});m.remove();
  wrap.style.setProperty('--tw-w',Math.ceil(w+parseFloat(getComputedStyle(el).fontSize)*.3)+'px')};
 (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(fit);
 let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(fit,150)});
 let i=0,n=words[0].length,isDel=true;
 const step=()=>{const w=words[i];isDel?n--:n++;el.textContent=w.substring(0,n);
  if(caret)caret.classList.add('typing');let speed=isDel?40:80;
  if(!isDel&&n===w.length){speed=2500;isDel=true;if(caret)caret.classList.remove('typing');}
  else if(isDel&&n===0){isDel=false;i=(i+1)%words.length;speed=400;if(caret)caret.classList.remove('typing');}
  setTimeout(step,speed)};
 setTimeout(step,2600);
})();

/* v34: flocos dourados nos cabeçalhos de seção (posições fixas, sempre iguais) */
(()=>{let seed=7;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
 document.querySelectorAll('.cases-head').forEach(h=>{const f=document.createElement('span');f.className='flk';f.setAttribute('aria-hidden','true');
  for(let k=0;k<18;k++){const b=document.createElement('b'),star=k%3!==2;b.className=star?'st':'dt';
   // metade perto do título (esquerda) e metade perto do número grande (direita)
   const left=k%2===0,x=left?4+rnd()*50:58+rnd()*40,y=6+rnd()*88;
   const s=star?(k%5===0?15+rnd()*6:7+rnd()*7):3+rnd()*4;
   b.style.cssText=`--x:${x.toFixed(1)}%;--y:${y.toFixed(1)}%;--s:${s.toFixed(1)}px;--d:${(rnd()*5).toFixed(2)}s;--t:${(3.6+rnd()*3.4).toFixed(2)}s;--dx:${((rnd()-.5)*28).toFixed(0)}px`;
   f.appendChild(b)}
  h.appendChild(f)})})();

/* Nossos valores: rolagem automática contínua, suave, com toque e arraste */
(function(){
 const car=document.getElementById('qc-car');if(!car)return;
 const view=car.querySelector('.qc-view'),track=car.querySelector('.qc-track');
 const prev=car.querySelector('[data-qc="prev"]'),next=car.querySelector('[data-qc="next"]'),tog=car.querySelector('[data-qc="toggle"]');
 const originals=[...track.children];
 const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const IDLE=1800;
 let setW=0,pos=0,lastSet=-1,lastUser=0,lastT=0,userPaused=reduce,inView=false,hover=false,focused=false,dragging=false;
 const speed=()=>innerWidth<700?22:28; /* px por segundo */
 const setPause=p=>{userPaused=p;tog.setAttribute('aria-pressed',p);tog.setAttribute('aria-label',p?'Retomar a rolagem automática':'Pausar a rolagem automática')};
 setPause(reduce);
 function build(){
  const ratio=setW?Math.max(0,(view.scrollLeft-setW)/setW):0;
  track.querySelectorAll('[data-clone]').forEach(n=>n.remove());
  const gap=parseFloat(getComputedStyle(track).columnGap)||12;
  setW=originals.reduce((s,c)=>s+c.getBoundingClientRect().width+gap,0);
  const n=Math.ceil(view.clientWidth/setW)+2;
  for(let i=0;i<n;i++)originals.forEach(c=>{const k=c.cloneNode(true);k.setAttribute('aria-hidden','true');k.dataset.clone='';track.appendChild(k)});
  pos=setW*(1+ratio);lastSet=pos;view.scrollLeft=pos;
 }
 function tick(t){
  requestAnimationFrame(tick);
  const dt=Math.min(64,t-(lastT||t));lastT=t;
  const run=!userPaused&&inView&&!hover&&!focused&&!dragging&&!document.hidden&&(performance.now()-lastUser>IDLE);
  if(run){pos+=speed()*dt/1000;if(pos>=2*setW)pos-=setW;lastSet=pos;view.scrollLeft=pos}
  else pos=view.scrollLeft;
 }
 view.addEventListener('scroll',()=>{
  const sl=view.scrollLeft;
  if(Math.abs(sl-lastSet)>2)lastUser=performance.now();
  if(sl>=2*setW){view.scrollLeft=pos=lastSet=sl-setW}
  else if(sl<setW-1){view.scrollLeft=pos=lastSet=sl+setW}
 },{passive:true});
 const touch=()=>{lastUser=performance.now()};
 view.addEventListener('touchstart',touch,{passive:true});view.addEventListener('touchend',touch,{passive:true});view.addEventListener('wheel',touch,{passive:true});
 /* arraste com o mouse (no toque, a rolagem é nativa) */
 let x0=0,s0=0;
 view.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0||e.target.closest('button'))return;dragging=true;x0=e.clientX;s0=view.scrollLeft;view.classList.add('drag');view.setPointerCapture(e.pointerId);touch()});
 view.addEventListener('pointermove',e=>{if(!dragging)return;view.scrollLeft=s0-(e.clientX-x0);touch()});
 const end=()=>{if(!dragging)return;dragging=false;view.classList.remove('drag');touch()};
 view.addEventListener('pointerup',end);view.addEventListener('pointercancel',end);
 /* botões: andam um card, com rolagem suave */
 const step=()=>originals[0].getBoundingClientRect().width+(parseFloat(getComputedStyle(track).columnGap)||12);
 function by(dir){
  touch();let sl=view.scrollLeft;const d=step()*dir;
  if(sl+d>=2*setW)view.scrollLeft=sl-=setW;else if(sl+d<setW)view.scrollLeft=sl+=setW;
  view.scrollTo({left:sl+d,behavior:reduce?'auto':'smooth'});
 }
 next.addEventListener('click',()=>by(1));prev.addEventListener('click',()=>by(-1));
 tog.addEventListener('click',()=>setPause(!userPaused));
 if(matchMedia('(hover:hover)').matches){car.addEventListener('mouseenter',()=>{hover=true});car.addEventListener('mouseleave',()=>{hover=false;touch()})}
 car.addEventListener('focusin',()=>{focused=true});car.addEventListener('focusout',()=>{focused=false;touch()});
 new IntersectionObserver(es=>{inView=es[0].isIntersecting},{threshold:.12}).observe(car);
 let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(build,200)});
 addEventListener('load',build);
 build();requestAnimationFrame(tick);
})();
