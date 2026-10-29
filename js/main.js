document.querySelector('.tg').onclick=()=>document.querySelector('.nav').classList.toggle('open');
document.querySelectorAll('.tabs:not(.dtabs):not(.stabs)').forEach(t=>t.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
t.querySelectorAll('button').forEach(x=>x.classList.remove('on'));b.classList.add('on');const k=b.dataset.k;
document.querySelectorAll('[data-c]').forEach(c=>c.style.display=(k==='all'||c.dataset.c===k)?'':'none')}));
document.querySelectorAll('form:not([data-wa]):not([data-search])').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();const m=f.querySelector('.msg');if(m)m.style.display='block';f.reset()}));

document.querySelectorAll('.sw').forEach(s=>{const i=new Image();i.src=s.dataset.src});
document.addEventListener('click',e=>{const s=e.target.closest('.sw');if(!s)return;
const c=s.closest('[data-model]'),im=c.querySelector('img.bike');
c.querySelectorAll('.sw').forEach(x=>x.classList.toggle('on',x===s));
if(im.getAttribute('src')===s.dataset.src)return;im.classList.add('fade');
setTimeout(()=>{im.src=s.dataset.src;im.classList.remove('fade')},140)});

/* WhatsApp forms (test ride + dealer application) */
const WA_NO='923133666617';
function sendWhatsApp(q){
 const url="https://wa.me/"+WA_NO+"?text="+encodeURIComponent(q);
 const w=window.open(url,'_blank');if(!w)location.href=url}
document.querySelectorAll('form[data-wa]').forEach(f=>f.addEventListener('submit',e=>{
 e.preventDefault();
 const fields=[...f.querySelectorAll('[name]')].map(el=>{const v=el.value.trim();
  return "*"+(el.dataset.label||el.name)+":* "+(v||(el.name==='message'?"No additional message.":"-"))});
 const text=["Hello Elexa EV,","","*"+f.dataset.wa+"*",""].concat(fields).join("\n");
 sendWhatsApp(text);
 const m=f.querySelector('.msg');if(m)m.style.display='block'}));
document.querySelectorAll('input[type=date]').forEach(d=>d.min=new Date().toISOString().split('T')[0]);

/* ---- shared dealer / service-center locator ---- */
const ELEXA_LOCATIONS=[
{"n":"Elexa Centre Lahore","a":"Main Boulevard, Gulberg, Lahore","ph":"0300 1234567","prov":"Punjab","city":"Lahore","lat":31.512,"lng":74.343},
{"n":"Elexa Model Town Lahore","a":"Model Town Link Road, Lahore","ph":"0300 5551122","prov":"Punjab","city":"Lahore","lat":31.483,"lng":74.326},
{"n":"Rana Elexa Autos","a":"Khudian Khas, District Kasur","ph":"0321 9876543","prov":"Punjab","city":"Kasur","lat":31.1833,"lng":74.2167},
{"n":"Elexa Motors Faisalabad","a":"Susan Road, Faisalabad","ph":"0311 2223344","prov":"Punjab","city":"Faisalabad","lat":31.418,"lng":73.093},
{"n":"Elexa Multan Centre","a":"Bosan Road, Multan","ph":"0322 3334455","prov":"Punjab","city":"Multan","lat":30.21,"lng":71.46},
{"n":"Elexa Rawalpindi Showroom","a":"Murree Road, Rawalpindi","ph":"0333 4445566","prov":"Punjab","city":"Rawalpindi","lat":33.61,"lng":73.06},
{"n":"Elexa Karachi Centre","a":"Shahrah-e-Faisal, Karachi","ph":"0300 6667788","prov":"Sindh","city":"Karachi","lat":24.86,"lng":67.065},
{"n":"Elexa Hyderabad Autos","a":"Auto Bhan Road, Hyderabad","ph":"0345 7778899","prov":"Sindh","city":"Hyderabad","lat":25.396,"lng":68.3578},
{"n":"Elexa Sukkur Motors","a":"Military Road, Sukkur","ph":"0312 8889900","prov":"Sindh","city":"Sukkur","lat":27.7052,"lng":68.8574},
{"n":"Elexa Peshawar Centre","a":"University Road, Peshawar","ph":"0301 1002003","prov":"Khyber Pakhtunkhwa","city":"Peshawar","lat":34.0034,"lng":71.488},
{"n":"Taj Elexa Centre Charsada","a":"GT Road, Charsada","ph":"0333 7654321","prov":"Khyber Pakhtunkhwa","city":"Charsada","lat":34.1453,"lng":71.7308},
{"n":"Swabi Elexa Centre","a":"Main GT Road, Swabi","ph":"0345 1112233","prov":"Khyber Pakhtunkhwa","city":"Swabi","lat":34.12,"lng":72.47},
{"n":"Elexa Mardan Autos","a":"Bank Road, Mardan","ph":"0334 3003004","prov":"Khyber Pakhtunkhwa","city":"Mardan","lat":34.1986,"lng":72.0404},
{"n":"Elexa Quetta Centre","a":"Jinnah Road, Quetta","ph":"0333 5005006","prov":"Balochistan","city":"Quetta","lat":30.19,"lng":66.995},
{"n":"Elexa Islamabad Centre","a":"Blue Area, Islamabad","ph":"0300 9990001","prov":"Islamabad","city":"Islamabad","lat":33.7104,"lng":73.0551},
{"n":"Elexa Muzaffarabad Centre","a":"Upper Chattar, Muzaffarabad","ph":"0355 1231234","prov":"Azad Kashmir","city":"Muzaffarabad","lat":34.3592,"lng":73.4716}
];
function initLocator(cfg){
 const $=id=>document.getElementById(id);
 const D=ELEXA_LOCATIONS;
 const grid=$(cfg.gridId),info=$(cfg.infoId),fp=$(cfg.provId),fc=$(cfg.cityId),tabs=document.querySelector(cfg.tabsSel);
 if(!grid||!fp||!fc||!tabs)return;
 const PIN='<svg class="i" viewBox="0 0 24 24" style="width:14px;height:14px;vertical-align:-2px"><path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11zM12 12a2 2 0 100-4 2 2 0 000 4z"/></svg>';
 const PH='<svg class="i" viewBox="0 0 24 24" style="width:14px;height:14px;vertical-align:-2px"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z"/></svg>';
 let S={prov:'',city:''};
 function fillCities(){const l=[...new Set(D.filter(d=>!fp.value||d.prov===fp.value).map(d=>d.city))].sort();
  fc.innerHTML='<option value="">Select City</option>'+l.map(c=>'<option>'+c+'</option>').join('');fc.value=S.city&&l.includes(S.city)?S.city:''}
 function card(d){const i=D.indexOf(d);return '<div class="card dl"><img src="images/d'+((i%4)+1)+'.jpg" alt="'+d.n+'"><div class="b"><h3>'+d.n.toUpperCase()+'</h3><p>'+PIN+' '+d.a+'</p><p>'+PH+' <a href="tel:'+d.ph.replace(/\s/g,'')+'">'+d.ph+'</a></p><button type="button" class="btn o vm" data-i="'+i+'">View on Map</button></div></div>'}
 function render(){const l=D.filter(d=>(!S.prov||d.prov===S.prov)&&(!S.city||d.city===S.city));
  tabs.querySelectorAll('button').forEach(bt=>bt.classList.toggle('on',bt.dataset.k===(S.prov||'all')));
  const w=[S.city,S.prov].filter(Boolean).join(', ');
  info.textContent=l.length?'Showing '+l.length+' '+(l.length>1?cfg.plural:cfg.singular)+(w?' in '+w:' across Pakistan'):'';
  grid.innerHTML=l.length?l.map(card).join(''):'<div class="card" style="grid-column:1/-1;text-align:center;padding:34px"><h3>No '+cfg.singular+' in '+w+' yet</h3><p style="margin:8px 0 16px">We are expanding fast. Call +92 42 35297199 or reach out to us.</p>'+cfg.emptyCta+'</div>'}
 fp.onchange=()=>{S.city='';fillCities()};
 fc.onchange=()=>{if(fc.value&&!fp.value){fp.value=D.find(d=>d.city===fc.value).prov;fillCities();fc.value=S.city=fc.value}};
 const form=$(cfg.formId);
 if(form)form.onsubmit=e=>{e.preventDefault();S={prov:fp.value,city:fc.value};render();const anc=$(cfg.anchorId);if(anc)anc.scrollIntoView({behavior:'smooth'})};
 tabs.onclick=e=>{const bt=e.target.closest('button');if(!bt)return;S={prov:bt.dataset.k==='all'?'':bt.dataset.k,city:''};fp.value=S.prov;fillCities();render()};
 const M=$('mapModal');
 if(M){
  const mf=$('mmF');
  mf.onload=()=>{if(mf.getAttribute('src')==='about:blank')return;clearTimeout(window.__mt);$('mmLoad').classList.add('hide')};
  grid.onclick=e=>{const bt=e.target.closest('.vm');if(!bt)return;const d=D[bt.dataset.i];
   $('mmT').textContent=d.n;$('mmA').textContent=d.a+' - '+d.prov;
   $('mmLoad').classList.remove('hide');clearTimeout(window.__mt);window.__mt=setTimeout(()=>$('mmLoad').classList.add('hide'),15000);
   mf.src='https://maps.google.com/maps?q='+d.lat+','+d.lng+'&z=16&output=embed';
   $('mmL').href='https://www.google.com/maps/search/?api=1&query='+d.lat+','+d.lng;
   M.classList.add('open');document.body.style.overflow='hidden'};
  function closeM(){M.classList.remove('open');mf.src='about:blank';document.body.style.overflow=''}
  M.onclick=e=>{if(e.target===M||e.target.closest('.mx'))closeM()};
  if(!window.__mmEsc){window.__mmEsc=1;document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.querySelectorAll('.mapmodal.open').forEach(m=>{m.classList.remove('open');const f=m.querySelector('iframe');if(f)f.src='about:blank';document.body.style.overflow=''})}})}
 }
 fillCities();render();
}
/* ---- "Become a Dealer" smooth-scroll (only intercepts on the page that has the form) ---- */
(function(){
 const f=document.getElementById('bForm');
 function goBecome(){f.scrollIntoView({behavior:'smooth',block:'center'});f.classList.remove('flash');void f.offsetWidth;f.classList.add('flash');setTimeout(()=>{const inp=f.querySelector('input');if(inp)inp.focus({preventScroll:true})},600)}
 if(f){
  document.addEventListener('click',e=>{const a=e.target.closest('a[href$="#become"]');if(a){e.preventDefault();history.replaceState(null,'','#become');goBecome()}});
  if(location.hash==='#become')setTimeout(goBecome,300);
 }
})();
if(document.getElementById('dsForm'))initLocator({formId:'dsForm',provId:'dsProv',cityId:'dsCity',tabsSel:'.dtabs',gridId:'dGrid',infoId:'dInfo',anchorId:'dealers-list',singular:'dealer',plural:'dealers',emptyCta:'<a class="btn" href="#become">Become a Dealer</a>'});
if(document.getElementById('svForm'))initLocator({formId:'svForm',provId:'svProv',cityId:'svCity',tabsSel:'.stabs',gridId:'svGrid',infoId:'svInfo',anchorId:'service-list',singular:'service center',plural:'service centers',emptyCta:'<a class="btn" href="contact.html">Contact Support</a>'});
