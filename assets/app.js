(function(){
function safe(n,f){try{f();}catch(e){try{console.error("[site] "+n,e);}catch(_){}}}
const VERSAO="22";
{const mv=document.querySelector('meta[name="versao-site"]');if(mv&&mv.content!==VERSAO)console.warn("[site] HTML v"+mv.content+" com JS v"+VERSAO+": envie todos os arquivos (assets/app.js inclusive).");}
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasG = typeof gsap !== 'undefined';
if(hasG && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
const $=id=>document.getElementById(id);

/* ---------- cartões-postais das cidades (ilustrações) ---------- */
const sky=(id,a,b)=>`<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="320" height="200" fill="url(#${id})"/>`;
const sun=(x,y,r,c='#FFF3C4')=>`<circle cx="${x}" cy="${y}" r="${r+10}" fill="${c}" opacity=".35"/><circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
const waves=(y,c='#fff')=>`<path d="M0 ${y} q20 -6 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" fill="none" stroke="${c}" stroke-width="2.5" opacity=".55"/>`;
const palm=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 C-4 -30 -2 -60 10 -86" fill="none" stroke="#8A5A3A" stroke-width="7" stroke-linecap="round"/><g fill="#2F9E4F"><ellipse cx="-8" cy="-88" rx="26" ry="7" transform="rotate(-25 -8 -88)"/><ellipse cx="28" cy="-88" rx="26" ry="7" transform="rotate(25 28 -88)"/><ellipse cx="10" cy="-98" rx="22" ry="6" transform="rotate(-80 10 -98)"/><ellipse cx="-2" cy="-78" rx="22" ry="6" transform="rotate(-55 -2 -78)"/><ellipse cx="24" cy="-78" rx="22" ry="6" transform="rotate(50 24 -78)"/></g></g>`;
const ART={
 rio:()=>`${sky('g1','#FF9A3D','#FFD86B')}${sun(240,60,28)}
  <path d="M0 150 V108 Q28 96 48 62 Q57 46 66 62 Q86 100 124 150Z" fill="#2A7A4C"/>
  <rect x="56.4" y="30" width="3.2" height="19" fill="#FFF8EC"/><rect x="50" y="35" width="16" height="2.8" fill="#FFF8EC"/>
  <path d="M112 150 Q124 110 141 112 Q154 116 158 150Z" fill="#3E9A5A"/>
  <path d="M150 150 Q168 70 204 72 Q230 76 240 150Z" fill="#1F6B45"/>
  <path d="M141 112 L204 74" stroke="#3A1F1A" stroke-width="1.2"/><rect x="170" y="90" width="7" height="5" fill="#D12E5E"/>
  <rect y="146" width="320" height="54" fill="#0BA5A4"/>${waves(162)}${waves(182)}
  <path d="M250 150 l12 -24 l12 24z" fill="#fff"/><path d="M246 152h32l-5 6h-22z" fill="#3A1F1A"/>`,
 maua:()=>`${sky('g2','#FFC94A','#FFF1C9')}${sun(262,52,24)}
  <path d="M0 128 Q80 88 160 118 T320 108 V200 H0Z" fill="#8CC861"/>
  <path d="M0 150 Q100 124 200 146 T320 140 V200H0Z" fill="#3E9A4E"/>
  <rect y="168" width="320" height="5" fill="#6A4038"/>${Array.from({length:16},(_,i)=>`<rect x="${i*21}" y="173" width="10" height="4" fill="#6A4038"/>`).join('')}
  <g><rect x="30" y="132" width="78" height="32" rx="6" fill="#D12E5E"/><rect x="36" y="114" width="28" height="22" rx="3" fill="#D12E5E"/><rect x="41" y="119" width="18" height="10" rx="2" fill="#FFF3C4"/><rect x="84" y="118" width="10" height="16" fill="#3A1F1A"/>
  <rect x="114" y="136" width="64" height="28" rx="5" fill="#0B7471"/><rect x="184" y="136" width="64" height="28" rx="5" fill="#FF9A3D"/>
  ${[120,140,160,190,210,230].map(x=>`<rect x="${x}" y="142" width="12" height="9" rx="2" fill="#FFF8EC"/>`).join('')}
  ${[46,70,96,128,164,198,234].map(x=>`<circle cx="${x}" cy="166" r="6" fill="#3A1F1A"/>`).join('')}</g>
  <circle cx="92" cy="104" r="8" fill="#fff" opacity=".8"/><circle cx="104" cy="92" r="10" fill="#fff" opacity=".65"/><circle cx="120" cy="82" r="12" fill="#fff" opacity=".5"/>`,
 salvador:()=>`${sky('g3','#FF7E6B','#FFC46B')}${sun(70,58,26)}
  <path d="M126 96 H320 V200 H150 Z" fill="#C9822F"/>
  ${['#FFB81C','#D12E5E','#19B5B0','#FFF8EC','#2F9E4F','#FF9A3D','#8BC7E8'].map((c,i)=>`<rect x="${158+i*23}" y="70" width="22" height="27" fill="${c}"/><path d="M${157+i*23} 71 l12 -10 l12 10z" fill="#A2412F"/><rect x="${165+i*23}" y="82" width="7" height="10" fill="#3A1F1A" opacity=".55"/>`).join('')}
  <rect x="120" y="58" width="46" height="18" rx="2" fill="#FFF8EC"/><rect x="128" y="76" width="22" height="80" fill="#FFF8EC"/>
  ${[86,100,114,128,142].map(y=>`<rect x="133" y="${y}" width="12" height="6" fill="#8BC7E8"/>`).join('')}
  <rect x="166" y="62" width="10" height="8" fill="#FFF8EC"/>
  <rect y="152" width="320" height="48" fill="#0B8F9A"/>${waves(166)}${waves(186)}`,
 fortaleza:()=>`${sky('g4','#FFC94A','#FFEFC2')}${sun(64,56,26,'#FFF8EC')}
  <rect y="118" width="320" height="48" fill="#12A5B0"/>${waves(132)}${waves(150)}
  <path d="M0 160 Q160 148 320 162 V200 H0Z" fill="#F6D59A"/>
  <path d="M94 136 L94 54" stroke="#6A4038" stroke-width="3"/><path d="M96 56 L150 128 L96 132Z" fill="#D12E5E"/><path d="M96 70 L132 120 L96 122Z" fill="#FFB81C" opacity=".9"/>
  <path d="M60 134 L150 134 L140 144 L70 144Z" fill="#6A4038"/>
  ${palm(262,182,1)}${palm(296,186,.8)}`,
 maceio:()=>`${sky('g5','#7FD3E0','#EAFBF6')}${sun(254,50,24,'#FFD23F')}
  <rect y="104" width="320" height="70" fill="#19B5B0"/>
  <ellipse cx="90" cy="126" rx="56" ry="10" fill="#7FE0D2"/><ellipse cx="200" cy="140" rx="70" ry="12" fill="#9BEADF"/><ellipse cx="140" cy="116" rx="30" ry="6" fill="#9BEADF"/>${waves(156)}
  <path d="M0 170 Q160 160 320 172 V200 H0Z" fill="#F8DDA4"/>
  <path d="M196 132 L196 82" stroke="#6A4038" stroke-width="2.5"/><path d="M198 84 L228 128 L198 130Z" fill="#FFB81C"/><path d="M178 132 L232 132 L226 139 L184 139Z" fill="#6A4038"/>
  ${palm(34,190,.9)}${palm(66,192,.7)}`,
 recife:()=>`${sky('g6','#FFB07A','#FFE1A8')}
  ${[['#FFF8EC',20,70],['#8BC7E8',54,52],['#FFB81C',92,80],['#FFF8EC',126,60],['#D12E5E',162,74],['#19B5B0',196,58]].map(([c,x,h])=>`<rect x="${x}" y="${128-h}" width="30" height="${h}" fill="${c}"/><g fill="#3A1F1A" opacity=".25">${Array.from({length:Math.floor(h/16)},(_,j)=>`<rect x="${x+7}" y="${128-h+8+j*16}" width="6" height="7"/><rect x="${x+17}" y="${128-h+8+j*16}" width="6" height="7"/>`).join('')}</g>`).join('')}
  <rect y="134" width="320" height="66" fill="#1C8FA0"/>${waves(170)}${waves(188)}
  <rect x="0" y="124" width="320" height="10" fill="#FFF8EC"/>
  ${[20,96,172,248].map(x=>`<path d="M${x} 134 a38 26 0 0 1 76 0" fill="none" stroke="#FFF8EC" stroke-width="6"/>`).join('')}
  <g transform="translate(262 64)"><path d="M-36 0 A36 36 0 0 1 -18 -31 L0 0Z" fill="#FFB81C"/><path d="M-18 -31 A36 36 0 0 1 18 -31 L0 0Z" fill="#2F9E4F"/><path d="M18 -31 A36 36 0 0 1 36 0 L0 0Z" fill="#D12E5E"/><path d="M-36 0 H36" stroke="#3A1F1A" stroke-width="2"/><path d="M0 0 V38" stroke="#3A1F1A" stroke-width="3"/><path d="M-18 -31 L0 0 L18 -31" stroke="#fff" stroke-width="1.5" fill="none"/></g>`,
 embu:()=>`${sky('g7','#FFD36B','#FFF6DA')}${sun(56,50,22)}
  <path d="M0 24 Q80 44 160 24 T320 24" fill="none" stroke="#6A4038" stroke-width="1.5"/>
  ${Array.from({length:14},(_,i)=>{const x=10+i*22,y=26+Math.sin(i/13*Math.PI*2)*-4+ (i%7<3.5?6:2);return `<path d="M${x} ${y} l9 0 l-4.5 11z" fill="${['#D12E5E','#19B5B0','#FFB81C','#2F9E4F','#FF9A3D'][i%5]}"/>`}).join('')}
  <rect y="160" width="320" height="40" fill="#E0A35A"/>
  <rect x="122" y="80" width="80" height="82" fill="#FFF8EC"/><path d="M118 82 L162 54 L206 82Z" fill="#FFF8EC"/><path d="M118 82 L162 54 L206 82" fill="none" stroke="#0B7471" stroke-width="3"/>
  <rect x="198" y="46" width="28" height="116" fill="#FFF8EC"/><path d="M194 48 L212 22 L230 48Z" fill="#A2412F"/><rect x="206" y="62" width="12" height="16" rx="6" fill="#0B7471"/>
  <path d="M150 162 V128 a12 12 0 0 1 24 0 V162Z" fill="#0B7471"/><circle cx="162" cy="100" r="7" fill="none" stroke="#0B7471" stroke-width="3"/>
  ${[[18,'#D12E5E'],[66,'#19B5B0'],[246,'#FF9A3D'],[288,'#2F9E4F']].map(([x,c])=>`<path d="M${x-22} 138 L${x} 118 L${x+22} 138Z" fill="${c}"/><rect x="${x-18}" y="138" width="36" height="24" fill="#FFF8EC"/><rect x="${x-18}" y="146" width="36" height="5" fill="${c}" opacity=".6"/>`).join('')}`
 ,padrao:()=>`${sky('g8','#FFC94A','#FFF1C9')}${sun(250,56,26)}
  <path d="M0 140 Q90 112 180 134 T320 124 V200H0Z" fill="#2F9E4F" opacity=".9"/>
  <rect y="158" width="320" height="42" fill="#19B5B0"/>${waves(172)}${waves(190)}
  <path d="M140 150 C124 130 118 122 118 110 a22 22 0 0 1 44 0 c0 12 -6 20 -22 40z" fill="#D12E5E"/><circle cx="140" cy="110" r="8" fill="#FFF8EC"/>`
};
let pcN=0;
const pc=k=>{const n=++pcN;return `<svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${(ART[k]||ART.padrao)().replace(/\b(g\d)\b/g,'$1_'+n)}</svg>`;};

/* ---------- agenda ---------- */
/* ================= AGENDA: ATUALIZAR 1x POR SEMANA =================
   É só mexer neste bloco. Cada parada tem:
   ini / fim  -> datas no formato 'AAAA-MM-DD' (um dia só? ini e fim iguais)
   cidade     -> nome grande no box
   uf         -> texto pequeno embaixo (ex.: 'São Paulo · SP')
   arte       -> rio, maua, salvador, fortaleza, maceio, recife, embu
                 (cidade nova? deixe '' que entra uma arte padrão até a gente desenhar a dela)
   As paradas que já passaram ficam apagadinhas; a próxima ganha destaque e contagem regressiva. */
const AGENDA={
  mes:'Novembro',
  atualizadoEm:'2026-11-03',
  paradas:[
    {ini:'2026-11-02',fim:'2026-11-05',cidade:'Rio de Janeiro',uf:'Rio de Janeiro · RJ',arte:'rio'},
    {ini:'2026-11-07',fim:'2026-11-09',cidade:'Mauá',uf:'São Paulo · SP',arte:'maua'},
    {ini:'2026-11-15',fim:'2026-11-17',cidade:'Salvador',uf:'Bahia · BA',arte:'salvador'},
    {ini:'2026-11-18',fim:'2026-11-23',cidade:'Fortaleza',uf:'Ceará · CE',arte:'fortaleza'},
    {ini:'2026-11-24',fim:'2026-11-26',cidade:'Maceió',uf:'Alagoas · AL',arte:'maceio'},
    {ini:'2026-11-27',fim:'2026-11-28',cidade:'Recife',uf:'Pernambuco · PE',arte:'recife'},
    {ini:'2026-11-29',fim:'2026-11-29',cidade:'Embu das Artes',uf:'São Paulo · SP',arte:'embu'}
  ]};
/* ================= fim do bloco da agenda ================= */

/* ---- segurança: valida e higieniza os dados da agenda antes de usar (nada vira HTML sem passar por aqui) ---- */
const escH=s=>String(s).replace(/[&<>"'`]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','`':'&#96;'}[c]));
const limpaTxt=(s,max)=>String(s==null?'':s).replace(/[\u0000-\u001f\u007f<>]/g,'').trim().slice(0,max);
const okData=s=>/^\d{4}-\d{2}-\d{2}$/.test(s)&&!isNaN(new Date(s+'T00:00:00'));
AGENDA.paradas=AGENDA.paradas.filter(p=>{
  const ok=p&&okData(p.ini)&&okData(p.fim)&&p.ini<=p.fim&&limpaTxt(p.cidade,60);
  if(!ok)console.warn('[agenda] parada ignorada (dados inválidos):',p);
  return ok;}).map(p=>({ini:p.ini,fim:p.fim,cidade:limpaTxt(p.cidade,60),uf:limpaTxt(p.uf,60),
    arte:Object.prototype.hasOwnProperty.call(ART,p.arte)?p.arte:'padrao'}));
if(!/^[\p{L} ]{3,20}$/u.test(AGENDA.mes)){const m=new Date().toLocaleString('pt-BR',{month:'long'});AGENDA.mes=m.charAt(0).toUpperCase()+m.slice(1);}


const MESES=['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
const iso=s=>{const [y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d);};
const pad2=n=>String(n).padStart(2,'0');
const now=new Date();let nextIdx=-1;
const stops=AGENDA.paradas.map(p=>{const a=iso(p.ini),b=iso(p.fim);
  return {c:p.cidade,u:p.uf,k:p.arte,
    d:p.ini===p.fim?pad2(a.getDate()):pad2(a.getDate())+'–'+pad2(b.getDate()),
    mes:a.getMonth()===b.getMonth()?MESES[a.getMonth()]:MESES[a.getMonth()]+'–'+MESES[b.getMonth()],
    start:a,end:new Date(b.getFullYear(),b.getMonth(),b.getDate(),23,59)};});
stops.forEach((st,i)=>{
  st.state=now>st.end?'Realizado':(now>=st.start?'Acontecendo agora':'Em breve');
  if(nextIdx<0&&now<=st.end)nextIdx=i;});

/* textos que dependem da agenda */
document.querySelectorAll('[data-ag-mes]').forEach(e=>{e.textContent=e.hasAttribute('data-lc')?AGENDA.mes.toLowerCase():AGENDA.mes;});
const NUM=['zero','uma','duas','três','quatro','cinco','seis','sete','oito','nove','dez','onze','doze'];
const nCid=new Set(stops.map(s=>s.c)).size;
const capz=s=>s.charAt(0).toUpperCase()+s.slice(1);
const cidTxt=nCid===1?'Uma cidade':capz(NUM[nCid]||String(nCid))+' cidades';
const subTxt=!stops.length?'Novas datas em breve.':(nCid===1?'Uma parada: '+stops[0].c+'.':cidTxt+', de '+stops[0].c+' a '+stops[stops.length-1].c+'.');
$('agSub').textContent=subTxt;
$('popSub').textContent=stops.length?cidTxt+', muita aula e muito chocolate. Veja quando a chef chega perto de você.':'Novas datas em breve.';
const upd=iso(AGENDA.atualizadoEm);$('agUpd').textContent=pad2(upd.getDate())+'/'+pad2(upd.getMonth()+1);

const countHTML='<div class="count" aria-label="Contagem regressiva"><div><b data-cd="d">0</b><span>dias</span></div><div><b data-cd="h">0</b><span>horas</span></div><div><b data-cd="m">0</b><span>min</span></div></div>';
function card(st,i){
  const cls='card'+(st.state==='Realizado'?' past':'')+(i===nextIdx?' is-next':'');
  const lbl=i===nextIdx&&st.state==='Em breve'?'Próxima parada':st.state;
  return `<article class="${cls}"><div class="art">${pc(st.k)}<span class="state">${lbl}</span></div>
   <div class="info"><div class="dt">${st.d}<small>${st.mes}</small></div><h3>${escH(st.c)}</h3><div class="uf">${escH(st.u)}</div>${i===nextIdx?countHTML:''}</div></article>`;}
$('cards').innerHTML=stops.map(card).join('');
$('popStrip').innerHTML=stops.map(card).join('');
function tick(){
  if(nextIdx<0)return;const st=stops[nextIdx];let ms=Math.max(0,st.start-new Date());
  const v={d:Math.floor(ms/864e5),h:Math.floor(ms%864e5/36e5),m:Math.floor(ms%36e5/6e4)};
  document.querySelectorAll('[data-cd]').forEach(b=>b.textContent=v[b.dataset.cd]);}
if(nextIdx>=0){const st=stops[nextIdx];$('popCity').textContent=st.c+' · '+st.d+' '+st.mes;
  if(st.state==='Acontecendo agora'){$('popLbl').textContent='Acontecendo agora';document.querySelectorAll('.count').forEach(c=>c.hidden=true);}
  tick();setInterval(tick,30000);}
else{$('popLbl').textContent='Agenda concluída';$('popCity').textContent='Nova agenda em breve';document.querySelectorAll('.count').forEach(c=>c.hidden=true);}

/* ---------- pop-up ---------- */
const dlg=$('agendaPop');
function openPop(){
  if(!dlg.showModal){location.hash='agenda';return;}
  if(dlg.open)return;dlg.showModal();
  carousels.forEach(c=>c.layout());$('popStrip').scrollLeft=0;carousels.forEach(c=>c.update());   /* v19: começa sempre no primeiro dia */
  if(hasG&&!reduce){
    gsap.fromTo('.pop-box',{y:40,scale:.94,opacity:0},{y:0,scale:1,opacity:1,duration:.7,ease:'expo.out'});
    gsap.fromTo('.pop-sun',{y:120,rotate:-40},{y:0,rotate:0,duration:1.4,ease:'expo.out'});
    gsap.fromTo('.pop-strip .card .art',{yPercent:30,opacity:0},{yPercent:0,opacity:1,duration:.8,ease:'expo.out',stagger:.06,delay:.25,clearProps:'transform,opacity'});
  }}
function closePop(goTop=true){if(!dlg.open)return;
  const done=()=>{dlg.close();if(hasG)gsap.set('.pop-box',{clearProps:'all'});if(goTop&&firstOpen)scrollTo({top:0,behavior:'instant'});firstOpen=false;};
  if(hasG&&!reduce){gsap.to('.pop-box',{y:30,opacity:0,scale:.96,duration:.3,ease:'power2.in',onComplete:done});}else done();}
$('popClose').addEventListener('click',closePop);
$('popGo').addEventListener('click',e=>{e.preventDefault();firstOpen=false;closePop(false);setTimeout(()=>$('agenda').scrollIntoView({behavior:reduce?'auto':'smooth'}),320);});
dlg.addEventListener('click',e=>{if(e.target===dlg)closePop();});
dlg.addEventListener('cancel',e=>{e.preventDefault();closePop();});
document.querySelectorAll('[data-open-agenda]').forEach(b=>b.addEventListener('click',()=>{firstOpen=false;openPop();}));
let seen=false;try{seen=sessionStorage.getItem('agendaVista')==='1';sessionStorage.setItem('agendaVista','1');}catch(e){}
let firstOpen=false;
try{history.scrollRestoration='manual';}catch(e){}
if(!seen){scrollTo({top:0,behavior:'instant'});setTimeout(()=>{firstOpen=true;openPop();},700);}

safe("nav",function(){
/* ---------- nav + progresso ---------- */
const nav=$('nav'),prog=$('progress');
function onScroll(){const h=document.scrollingElement||document.documentElement;const p=h.scrollTop/(h.scrollHeight-h.clientHeight||1);prog.style.transform='scaleX('+p+')';nav.classList.toggle('scrolled',h.scrollTop>20);}
addEventListener('scroll',onScroll,{passive:true});onScroll();
});

safe("granulado",function(){
/* ---------- granulado no hero ---------- */
const cv=$('sprinkles'),ctx=cv.getContext('2d');
const cols=['#D12E5E','#FFB81C','#19B5B0','#FF9A3D','#2F9E4F','#0B7471'];
let W=0,H=0,parts=[],mouse={x:-999,y:-999};
function size(){const r=cv.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);W=r.width;H=r.height;cv.width=W*d;cv.height=H*d;ctx.setTransform(d,0,0,d,0,0);parts=Array.from({length:Math.round(Math.min(80,W/16))},()=>mk(true));}
function mk(any){return{x:Math.random()*W,y:any?Math.random()*H:-20,l:8+Math.random()*10,a:Math.random()*Math.PI,va:(Math.random()-.5)*.03,vy:.3+Math.random()*.55,vx:(Math.random()-.5)*.2,c:cols[Math.random()*cols.length|0],o:.55+Math.random()*.4}}
function draw(){ctx.clearRect(0,0,W,H);ctx.lineCap='round';
  for(const p of parts){
    if(!reduce){const dx=p.x-mouse.x,dy=p.y-mouse.y,d2=dx*dx+dy*dy;if(d2<12000){const f=(12000-d2)/12000*1.8,dd=Math.sqrt(d2+1);p.x+=dx/dd*f;p.y+=dy/dd*f;}
      p.y+=p.vy;p.x+=p.vx;p.a+=p.va;if(p.y>H+20)Object.assign(p,mk(false));}
    ctx.globalAlpha=p.o;ctx.strokeStyle=p.c;ctx.lineWidth=4.5;ctx.beginPath();
    ctx.moveTo(p.x-Math.cos(p.a)*p.l/2,p.y-Math.sin(p.a)*p.l/2);ctx.lineTo(p.x+Math.cos(p.a)*p.l/2,p.y+Math.sin(p.a)*p.l/2);ctx.stroke();}
  if(!reduce)requestAnimationFrame(draw);}
size();draw();addEventListener('resize',size);
const hero=document.querySelector('.hero');
hero.addEventListener('pointermove',e=>{const r=cv.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top;});
hero.addEventListener('pointerleave',()=>{mouse.x=mouse.y=-999});
const hv=$('heroVisual');
if(!reduce&&hasG&&matchMedia('(pointer:fine)').matches){
  hero.addEventListener('pointermove',e=>{const cx=e.clientX/innerWidth-.5,cy=e.clientY/innerHeight-.5;
    hv.querySelectorAll('[data-depth]').forEach(el=>{const d=+el.dataset.depth;gsap.to(el,{x:cx*30*d,y:cy*24*d,duration:.9,ease:'power3.out'});});});}
});

safe("letreiro",function(){
/* ---------- letreiro ---------- */
const mq=$('marquee');mq.innerHTML+=mq.innerHTML;
let mx=0,vel=0,last=scrollY;
function loop(){const s=scrollY;vel+=((s-last)*.25-vel)*.1;last=s;mx-=(.7+Math.abs(vel)*.6)*(vel<-0.5?-1:1);
  const w=mq.scrollWidth/2;if(mx<-w)mx+=w;if(mx>0)mx-=w;mq.style.transform='translateX('+mx+'px)';requestAnimationFrame(loop);}
if(!reduce)loop();
});

safe("entradas",function(){
/* ---------- entradas ---------- */
if(hasG&&!reduce){
  gsap.from('.hero h1 .line > span',{yPercent:105,duration:1.1,ease:'expo.out',stagger:.12,delay:.1});
  gsap.from('.hero .tag, .hero-lead, .roles, .hero-ctas',{y:24,opacity:0,duration:.9,ease:'expo.out',stagger:.08,delay:.35});
  gsap.from('.hero-visual .arch',{clipPath:'inset(100% 0 0 0 round 999px 999px 28px 28px)',duration:1.3,ease:'power4.inOut',delay:.15});
  gsap.from('.hero-visual .blob',{scale:.4,duration:1.4,ease:'expo.out',delay:.1});
  gsap.from('.hero-visual .mini, .hero-visual .followers',{scale:.5,rotate:-20,opacity:0,duration:1,ease:'back.out(1.7)',stagger:.15,delay:.8});
  gsap.from('.hero-visual .seal',{scale:0,duration:.9,ease:'back.out(2)',delay:1});
  document.querySelectorAll('[data-count]').forEach(el=>{const t=+el.dataset.count,o={v:0};gsap.to(o,{v:t,duration:1.8,ease:'power2.out',delay:.6,onUpdate:()=>el.textContent=Math.round(o.v)});});
  if(window.ScrollTrigger){
    gsap.utils.toArray('.reveal').forEach(el=>gsap.from(el,{y:40,opacity:0,duration:.9,ease:'expo.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}}));
    gsap.utils.toArray('[data-parallax]').forEach(img=>gsap.fromTo(img,{yPercent:-6},{yPercent:6,ease:'none',scrollTrigger:{trigger:img.parentElement,start:'top bottom',end:'bottom top',scrub:true}}));
    if(innerWidth>600)gsap.from('#cards .card',{clearProps:'all',y:60,rotate:()=>gsap.utils.random(-5,5),opacity:0,duration:.9,ease:'expo.out',stagger:.07,scrollTrigger:{trigger:'#cards',start:'top 85%',once:true}});
    gsap.to('.agenda-sun svg',{rotate:120,ease:'none',scrollTrigger:{trigger:'#agenda',start:'top bottom',end:'bottom top',scrub:true}});
    gsap.fromTo('.agenda-sun',{y:140},{y:0,ease:'none',scrollTrigger:{trigger:'#agenda',start:'top bottom',end:'top 30%',scrub:true}});
  }
}
});

safe("video",function(){
/* ---------- vídeo ---------- */
const kv=$('kVideo'),kb=$('kPlay'),ki=$('kIcon');
document.querySelectorAll('video[poster]').forEach(v=>{const t=new Image();t.onerror=()=>{v.poster=v.getAttribute('poster').split('/').pop();};t.src=v.getAttribute('poster');});
kb.addEventListener('click',()=>{if(kv.paused){kv.play();ki.innerHTML='<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>';kb.setAttribute('aria-label','Pausar vídeo');}
  else{kv.pause();ki.innerHTML='<path d="M8 5v14l11-7z"/>';kb.setAttribute('aria-label','Tocar vídeo');}});
});

/* ---------- carrosséis com efeito 3D ---------- */
function makeCarousel(el,dotsEl,auto,align){
  const start=align==='start';
  let hover=false,visible=false,dragging=false,dx=0,sl0=0,moved=false,target=null,tt=0,lastManual=0,anim=0,started=false;
  const kids=()=>[...el.children];
  const padL=()=>parseFloat(getComputedStyle(el).paddingLeft)||0;
  const isOn=()=>getComputedStyle(el).overflowX!=='visible'&&el.scrollWidth>el.clientWidth+4;
  function layout(){
    const on=isOn();el.classList.toggle('is-carousel',on);
    if(!on){if(!start)el.style.paddingInline='';if(dotsEl)dotsEl.hidden=true;return;}
    const f=el.firstElementChild;
    if(f&&!start&&!el.hasAttribute('data-nopad')){el.style.paddingInline='';const w=el.clientWidth,fw=f.getBoundingClientRect().width;const pad=Math.max(0,Math.round((w-fw)/2));el.dataset.pad=pad;el.style.paddingInline=pad+'px';}
    if(dotsEl){dotsEl.hidden=false;if(dotsEl.children.length!==kids().length){dotsEl.innerHTML=kids().map((_,i)=>`<button type="button" aria-label="Ir para o item ${i+1}"></button>`).join('');
      [...dotsEl.children].forEach((d,i)=>d.onclick=()=>goTo(i));}}
    update();}
  function current(){
    const r=el.getBoundingClientRect(),ref=start?r.left+padL():r.left+r.width/2;let best=0,bd=1e9;
    kids().forEach((c,i)=>{const b=c.getBoundingClientRect(),p=start?b.left:b.left+b.width/2,d=Math.abs(p-ref);if(d<bd){bd=d;best=i;}});
    if(start&&el.scrollLeft>=el.scrollWidth-el.clientWidth-2)best=kids().length-1;
    return best;}
  function update(){
    if(!el.classList.contains('is-carousel'))return;
    const i=current();kids().forEach((c,j)=>c.classList.toggle('active',j===i));
    if(dotsEl)[...dotsEl.children].forEach((d,j)=>d.setAttribute('aria-current',j===i));}
  function xFor(i){const c=kids()[i],first=el.firstElementChild;
    if(start)return Math.max(0,Math.min(el.scrollWidth-el.clientWidth,c.offsetLeft-first.offsetLeft));
    return c.offsetLeft+c.offsetWidth/2-el.clientWidth/2-(first.offsetLeft-parseFloat(el.style.paddingInline||0));}
  /* rolagem animada própria (não depende do "smooth" do navegador, que no iPhone falha com snap) */
  function scrollX(x){
    cancelAnimationFrame(anim);
    const from=el.scrollLeft,dist=x-from;
    if(reduce||Math.abs(dist)<2){el.scrollLeft=x;return;}
    const dur=Math.min(750,Math.max(380,Math.abs(dist)*.9)),t0=performance.now();
    const ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
    el.style.scrollSnapType='none';
    (function step(now){const t=Math.min(1,(now-t0)/dur);el.scrollLeft=from+dist*ease(t);
      if(t<1)anim=requestAnimationFrame(step);else{el.scrollLeft=x;el.style.scrollSnapType='';}})(t0);}
  function stopAnim(){cancelAnimationFrame(anim);if(!dragging)el.style.scrollSnapType='';}
  function goTo(i,manual=true){if(!kids()[i])return;if(manual)lastManual=Date.now();target=i;clearTimeout(tt);tt=setTimeout(()=>target=null,900);scrollX(xFor(i));}
  function next(d=1,manual=true){const n=kids().length,i=target!==null?target:current();goTo(((i+d)%n+n)%n,manual);}
  let raf=0;el.addEventListener('scroll',()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(update);},{passive:true});
  let lastW=innerWidth;addEventListener('resize',()=>{if(Math.abs(innerWidth-lastW)<2)return;lastW=innerWidth;layout();});
  el.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')hover=true;});el.addEventListener('pointerleave',()=>hover=false);
  el.addEventListener('focusin',()=>hover=true);el.addEventListener('focusout',()=>hover=false);
  el.addEventListener('touchstart',()=>{hover=true;lastManual=Date.now();stopAnim();clearTimeout(el._t);},{passive:true});
  el.addEventListener('touchend',()=>{el._t=setTimeout(()=>hover=false,3000);},{passive:true});
  el.addEventListener('wheel',stopAnim,{passive:true});
  el.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||!el.classList.contains('is-carousel'))return;stopAnim();dragging=true;moved=false;dx=e.clientX;sl0=el.scrollLeft;el.classList.add('drag');el.style.scrollSnapType='none';});
  addEventListener('pointermove',e=>{if(!dragging)return;if(Math.abs(e.clientX-dx)>4)moved=true;el.scrollLeft=sl0-(e.clientX-dx);});
  addEventListener('pointerup',()=>{if(!dragging)return;dragging=false;el.classList.remove('drag');el.style.scrollSnapType='';target=null;goTo(current());});
  el.addEventListener('click',e=>{if(moved){e.preventDefault();e.stopPropagation();moved=false;}},true);
  const podeAvancar=()=>visible&&!hover&&!dragging&&Date.now()-lastManual>4000&&el.classList.contains('is-carousel')&&!document.hidden;
  if('IntersectionObserver' in window)new IntersectionObserver(es=>es.forEach(x=>{
    visible=x.isIntersecting;
    if(visible&&!started&&auto&&!reduce){started=true;setTimeout(()=>{if(podeAvancar())next(1,false);},1300);}   /* primeira rolagem logo ao aparecer */
  }),{threshold:.3}).observe(el);
  if(auto&&!reduce)setInterval(()=>{if(podeAvancar())next(1,false);},auto);
  return {layout,update,next,goTo,current,xFor,el};
}
/* v19: sem rolagem automática; a pessoa navega com o dedo, o mouse ou as setas */
const carousels=[makeCarousel($('cards'),$('cDots'),0,'start'),makeCarousel($('popStrip'),$('pDots'),0)];
carousels.forEach(c=>c.layout());
/* v19: agenda sempre começa no primeiro dia; setas para avançar e voltar */
safe("agenda-setas",function(){
  const el=$('cards'),c=carousels[0],pv=$('cPrev'),nx=$('cNext');
  el.style.scrollSnapType='none';el.scrollLeft=0;el.style.scrollSnapType='';c.update();
  if(!pv||!nx)return;
  const n=()=>el.children.length;
  function upd(){const on=el.classList.contains('is-carousel');pv.hidden=nx.hidden=!on;if(!on)return;
    pv.disabled=el.scrollLeft<=2;nx.disabled=el.scrollLeft>=el.scrollWidth-el.clientWidth-2;}
  /* anda pela posição real do trilho: perto do fim, "cartão anterior" pode cair no mesmo ponto e a seta parecia travada */
  pv.addEventListener('click',()=>{const x=el.scrollLeft;let t=0;for(let i=0;i<n();i++)if(c.xFor(i)<x-4)t=i;c.goTo(t);});
  nx.addEventListener('click',()=>{const x=el.scrollLeft;let t=n()-1;for(let i=0;i<n();i++)if(c.xFor(i)>x+4){t=i;break;}c.goTo(t);});
  let raf=0;el.addEventListener('scroll',()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(upd);},{passive:true});
  addEventListener('resize',upd);upd();
});

/* ---------- benefícios: carrossel (rolagem do dedo + botões) ---------- */
safe("beneficios",function(){
  const track=$('bTrack'),dots=$('bDots'),prev=$('bPrev'),next=$('bNext');if(!track)return;
  const slides=[...track.children];
  dots.innerHTML=slides.map((_,i)=>`<button type="button" aria-label="Ir para o benefício ${i+1}"></button>`).join('');
  [...dots.children].forEach((d,i)=>d.onclick=()=>go(i));
  const step=()=>slides.length>1?slides[1].offsetLeft-slides[0].offsetLeft:track.clientWidth;
  const maxLeft=()=>track.scrollWidth-track.clientWidth;
  const cur=()=>track.scrollLeft>=maxLeft()-2?slides.length-1:Math.max(0,Math.min(slides.length-1,Math.round(track.scrollLeft/step())));
  function go(i){i=Math.max(0,Math.min(slides.length-1,i));track.scrollTo({left:i*step(),behavior:reduce?'auto':'smooth'});}
  function upd(){const i=cur();[...dots.children].forEach((d,j)=>d.setAttribute('aria-current',j===i));
    prev.disabled=track.scrollLeft<=2;next.disabled=track.scrollLeft>=maxLeft()-2;}
  const antes=()=>Math.ceil(track.scrollLeft/step()-.02)-1,depois=()=>Math.floor(track.scrollLeft/step()+.02)+1;   /* anda de um em um mesmo quando o fim do trilho não alinha */
  prev.onclick=()=>go(antes());next.onclick=()=>go(depois());
  track.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();go(depois());}if(e.key==='ArrowLeft'){e.preventDefault();go(antes());}});
  let raf=0;track.addEventListener('scroll',()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(upd);},{passive:true});
  addEventListener('resize',upd);upd();
});

/* ---------- aviso de privacidade ---------- */
safe("privacidade",function(){
  const box=$('ck');if(!box)return;
  const KEY='ld_privacidade';
  /* v22: guarda a escolha (v:2). Quem só viu o aviso antigo (v:1) vê o novo, porque agora existe Analytics */
  const visto=()=>{try{const v=JSON.parse(localStorage.getItem(KEY)||'null');return v&&v.v>=2?v:null;}catch(e){return null;}};
  const grava=ok=>{try{localStorage.setItem(KEY,JSON.stringify({v:2,analytics:!!ok,t:Date.now()}));}catch(e){}
    try{dispatchEvent(new CustomEvent('ld:consent',{detail:{analytics:!!ok}}));}catch(e){}};
  function abre(){box.hidden=false;requestAnimationFrame(()=>requestAnimationFrame(()=>box.classList.add('on')));}
  function fecha(){box.classList.remove('on');setTimeout(()=>{box.hidden=true;},550);}
  $('ckOk').addEventListener('click',()=>{grava(true);fecha();});
  const no=$('ckNo');if(no)no.addEventListener('click',()=>{grava(false);fecha();});
  const re=$('reopenCookies');if(re)re.addEventListener('click',abre);
  if(!visto())setTimeout(abre,1400);
});

safe("copiar",function(){
/* ---------- copiar número ---------- */
function copyText(txt,toastEl,okMsg){
  const done=()=>{toastEl.textContent=okMsg;};
  const fallback=()=>{toastEl.textContent='Segure o número para copiar.';};
  try{navigator.clipboard.writeText(txt).then(done,fallback);}catch(e){fallback();}}
$('copyNum').addEventListener('click',()=>{const t=$('numToast');copyText('+55 11 98283-9250',t,'número copiado!');setTimeout(()=>{t.textContent='toque para copiar'},3600);});
$('toTop').addEventListener('click',()=>scrollTo({top:0,behavior:reduce?'auto':'smooth'}));
});

/* ---------- caravana: texto rotativo ---------- */
safe("rotativo",function(){
  const root=$('rot');if(!root)return;
  const items=[...root.children];
  items.forEach(it=>{const words=it.textContent.trim().split(/\s+/);it.textContent='';
    words.forEach((w,wi)=>{const ws=document.createElement('span');ws.className='rw';
      [...w].forEach(ch=>{const c=document.createElement('span');c.className='rc';c.textContent=ch;ws.appendChild(c);});
      it.appendChild(ws);if(wi<words.length-1)it.appendChild(document.createTextNode(' '));});});
  if(reduce||!items[0].animate)return;           /* sem movimento: fica a primeira frase parada */
  root.classList.add('is-ready');
  let cur=0,timer=0,started=false,vis=false;
  const chars=i=>[...items[i].querySelectorAll('.rc')];
  const IN={duration:760,easing:'cubic-bezier(.2,1.35,.35,1)',fill:'both'},OUT={duration:380,easing:'cubic-bezier(.55,0,.85,.4)',fill:'both'};
  function enter(i){items[i].classList.add('on');chars(i).forEach((c,j)=>c.animate([{transform:'translateY(120%)'},{transform:'translateY(0)'}],{...IN,delay:j*26}));}
  function leave(i){const cs=chars(i);
    const an=cs.map((c,j)=>c.animate([{transform:'translateY(0)'},{transform:'translateY(-120%)'}],{...OUT,delay:j*12}));
    return Promise.all(an.map(a=>a.finished)).then(()=>{items[i].classList.remove('on');cs.forEach(c=>c.getAnimations().forEach(a=>a.cancel()));});}
  function schedule(){clearTimeout(timer);timer=setTimeout(()=>{if(vis&&!document.hidden){leave(cur).then(()=>{cur=(cur+1)%items.length;enter(cur);schedule();});}else schedule();},3000);}
  function start(){if(started)return;started=true;enter(0);schedule();}
  if('IntersectionObserver' in window){new IntersectionObserver(es=>es.forEach(x=>{vis=x.isIntersecting;if(vis)start();}),{threshold:.2}).observe(root);}
  else{vis=true;start();}
});

/* ---------- caravana: leve inclinação 3D na foto (só mouse) ---------- */
safe("inclinacao",function(){
  const f=document.querySelector('.cvh-frame');if(!f||reduce||!matchMedia('(pointer:fine)').matches)return;
  const v=f.parentElement;
  v.addEventListener('pointermove',e=>{const r=v.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    f.style.transform='perspective(1000px) rotateY('+(x*9)+'deg) rotateX('+(-y*9)+'deg) rotate(1.6deg)';});
  v.addEventListener('pointerleave',()=>{f.style.transform='';});
});

/* ---------- serviços: leque de cards ---------- */
safe("leque",function(){
  const stage=$('fanStage');if(!stage)return;
  const cards=[...stage.querySelectorAll('.fan-card')],n=cards.length,dots=$('fanDots');
  let a=0,hover=false,vis=false,last=0,drag=null;
  dots.innerHTML=cards.map((_,i)=>`<button type="button" aria-label="Ir para o serviço ${i+1}"></button>`).join('');
  [...dots.children].forEach((d,i)=>d.onclick=()=>go(i,true));
  function off(i){let d=((i-a)%n+n)%n;if(d>n/2)d-=n;return d;}
  function render(){
    cards.forEach((c,i)=>{const d=off(i),ad=Math.abs(d),act=d===0;
      c.style.setProperty('--d',d);c.style.setProperty('--ad',ad);
      c.classList.toggle('is-active',act);c.classList.toggle('is-far',ad>1);
      c.setAttribute('aria-hidden',act?'false':'true');
      c.setAttribute('aria-label',(i+1)+' de '+n);
      c.querySelectorAll('a').forEach(l=>l.tabIndex=act?0:-1);});
    [...dots.children].forEach((b,i)=>b.setAttribute('aria-current',i===a));}
  function go(i,manual){a=((i%n)+n)%n;if(manual)last=Date.now();render();}
  $('fanPrev').onclick=()=>go(a-1,true);
  $('fanNext').onclick=()=>go(a+1,true);
  stage.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();go(a+1,true);}if(e.key==='ArrowLeft'){e.preventDefault();go(a-1,true);}});
  stage.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button!==0)return;drag={x:e.clientX,y:e.clientY,id:e.pointerId,moved:false,dx:0};});
  stage.addEventListener('pointermove',e=>{
    if(!drag||e.pointerId!==drag.id)return;
    const dx=e.clientX-drag.x,dy=e.clientY-drag.y;
    if(!drag.moved){if(Math.abs(dx)>8&&Math.abs(dx)>Math.abs(dy)){drag.moved=true;try{stage.setPointerCapture(e.pointerId);}catch(_){}stage.classList.add('dragging');}else return;}
    drag.dx=dx;stage.style.setProperty('--drag',(dx*.6)+'px');});
  function end(e){
    if(!drag||(e&&e.pointerId!==drag.id))return;
    const d=drag;drag=null;stage.classList.remove('dragging');stage.style.removeProperty('--drag');
    if(d.moved){stage._moved=true;setTimeout(()=>{stage._moved=false;},50);if(d.dx<-45)go(a+1,true);else if(d.dx>45)go(a-1,true);}}
  stage.addEventListener('pointerup',end);stage.addEventListener('pointercancel',end);
  stage.addEventListener('click',e=>{
    if(stage._moved){e.preventDefault();e.stopPropagation();return;}
    const c=e.target.closest('.fan-card');
    if(c&&!c.classList.contains('is-active')){e.preventDefault();e.stopPropagation();go(cards.indexOf(c),true);}},true);
  stage.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')hover=true;});
  stage.addEventListener('pointerleave',()=>hover=false);
  stage.addEventListener('focusin',()=>hover=true);stage.addEventListener('focusout',()=>hover=false);
  if('IntersectionObserver' in window)new IntersectionObserver(es=>es.forEach(x=>vis=x.isIntersecting),{threshold:.4}).observe(stage);
  if(!reduce)setInterval(()=>{if(vis&&!hover&&!drag&&!document.hidden&&Date.now()-last>7000)go(a+1,false);},4800);
  render();
  stage.parentElement.classList.add('js-fan');
});

/* ---------- convite final: granulado flutuante ---------- */
safe("granulado-convite",function(){
  const box=document.querySelector('.join-spr');if(!box)return;
  const cols=['#FFB81C','#19B5B0','#FF9A3D','#2F9E4F','#FFD873'];
  for(let i=0;i<26;i++){const s=document.createElement('i');
    const x=i%2?78+(i*7)%20:2+(i*11)%20,y=(i*37+9)%94;
    s.style.cssText=`left:${x}%;top:${y}%;--c:${cols[i%cols.length]};--r:${(i*47)%180}deg;--d:${4+(i%5)}s;animation-delay:-${i%7}s`;
    box.appendChild(s);}
});
})();

/* ---------- monitoramento leve: erros do site viram uma linha no log do servidor (sem terceiros, sem dados pessoais) ---------- */
(function(){
  if(location.protocol==='file:')return;
  let enviados=0;const vistos=new Set();
  function envia(tipo,msg,src,lin){
    try{
      if(enviados>=5)return;
      const chave=tipo+'|'+msg+'|'+src+'|'+lin;if(vistos.has(chave))return;vistos.add(chave);enviados++;
      const corpo=JSON.stringify({t:tipo,m:String(msg).slice(0,300),s:String(src||'').replace(/[?#].*$/,'').slice(0,200),l:lin|0,p:location.pathname.slice(0,100),v:'22'});
      if(navigator.sendBeacon)navigator.sendBeacon('/api/log',new Blob([corpo],{type:'text/plain'}));
    }catch(e){}
  }
  addEventListener('error',function(e){
    if(e.target&&e.target!==window&&e.target.tagName){envia('recurso',e.target.tagName,e.target.getAttribute&&e.target.getAttribute('src'),0);return;}
    envia('js',e.message,e.filename,e.lineno);
  },true);
  addEventListener('unhandledrejection',function(e){envia('promise',(e.reason&&e.reason.message)||e.reason||'rejeicao','',0);});
})();

