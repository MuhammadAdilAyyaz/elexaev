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
{"n":"Muhammadi Autos Lahore","a":"Lahore","ph":"0300 4230364","prov":"Punjab","city":"Lahore","lat":31.512,"lng":74.343},
{"n":"Ehsan Traders","a":"Lahore","ph":"0322 4107041","prov":"Punjab","city":"Lahore","lat":31.483,"lng":74.326},
{"n":"Rana Business Corporation","a":"Lahore","ph":"0333 4214154","prov":"Punjab","city":"Lahore","lat":31.1833,"lng":74.2167},
{"n":"Madina Autos","a":"Lahore","ph":"0306 3811903","prov":"Punjab","city":"Lahore","lat":31.1833,"lng":74.2167},
{"n":"Azmat Elexa Center","a":"Gujranwala","ph":"0301 8415157","prov":"Punjab","city":"Gujranwala","lat":31.1833,"lng":74.2167},
{"n":"Rana Autos","a":"Khuddian Khas","ph":"0300 4084323","prov":"Punjab","city":"Khuddian Khas","lat":31.1833,"lng":74.2167},
{"n":"Chaudary Autos","a":"Okara","ph":"0300 6968239","prov":"Punjab","city":"Okara","lat":31.1833,"lng":74.2167},
{"n":"Umar Elexa Center","a":"Hafizabad","ph":"0300 6520334","prov":"Punjab","city":"Hafizabad","lat":31.1833,"lng":74.2167},
{"n":"Zain Traders","a":"Dina","ph":"0332 3737771","prov":"Punjab","city":"Dina","lat":31.418,"lng":73.093},
{"n":"DLC","a":"Jhelum","ph":"0332 3737771","prov":"Punjab","city":"Jhelum","lat":31.418,"lng":73.093},
{"n":"Abbas Motors","a":"Multan","ph":"0300 6342717","prov":"Punjab","city":"Multan","lat":30.21,"lng":71.46},
{"n":"Khawaja Madni Motors","a":"Multan","ph":"0304 2162153","prov":"Punjab","city":"Multan","lat":30.21,"lng":71.46},
{"n":"Evergreen Corporation","a":"Peshawar","ph":"0301 8404222","prov":"Khyber Pakhtunkhwa","city":"Peshawar","lat":34.0034,"lng":71.488},
{"n":"Taj Elexa Center","a":"Peshawar","ph":"0309 1134111","prov":"Khyber Pakhtunkhwa","city":"Peshawar","lat":34.0034,"lng":71.488},
{"n":"Ittifaq Elexa Center","a":"Peshawar","ph":"0300 9175482","prov":"Khyber Pakhtunkhwa","city":"Peshawar","lat":34.0034,"lng":71.488},
{"n":"Swabi Elexa Center","a":"Peshawar","ph":"0312 9400700","prov":"Khyber Pakhtunkhwa","city":"Peshawar","lat":34.0034,"lng":71.488},
{"n":"Khan Elexa Center","a":"Peshawar","ph":"0314 5491050","prov":"Khyber Pakhtunkhwa","city":"Peshawar","lat":34.0034,"lng":71.488},
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
 function card(d){const i=D.indexOf(d);return '<div class="card dl"><img src="images/d'+((i%4)+1)+'.jpg" alt="'+d.n+'"><div class="b"><h3>'+d.n.toUpperCase()+'</h3><p>'+PIN+' '+d.a+'</p><p>'+PH+' <a href="tel:'+d.ph.replace(/\s/g,'')+'">'+d.ph+'</a></p></div></div>'} 
//  <button type="button" class="btn o vm" data-i="'+i+'">View on Map</button>
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






(function () {
  /* ---- tracking helper (safe if GA/Pixel not loaded) ---- */
  function track(name, params) {
    try { if (window.gtag) gtag('event', name, params || {}); } catch (e) {}
    try { if (window.fbq) fbq('trackCustom', name, params || {}); } catch (e) {}
  }

  /* ---- which model page is being viewed ---- */
  var h1 = document.querySelector('.det h1');
  var model = h1 ? h1.textContent.replace(/\s+/g, ' ').trim() : null;
  if (model) {
    track('view_model', { model: model });
    try { if (window.fbq) fbq('track', 'ViewContent', { content_name: model, content_type: 'product' }); } catch (e) {}
  }

  /* ---- click tracking (event delegation) ---- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a'), sw = e.target.closest('.sw');
    var page = model || 'Home';
    if (sw) track('color_select', { model: page, color: sw.getAttribute('title') });
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href.indexOf('test-ride') > -1) track('book_test_ride_click', { model: page });
    else if (href.indexOf('dealers.html#become') > -1) track('become_dealer_click', { model: page });
    else if (href.indexOf('dealers') > -1) track('find_dealer_click', { model: page });
    else if (/(signature-1000|supreme-1200|galaxy-1500|grand-2000)\.html/.test(href))
      track('model_card_click', { target: href.replace('.html', ''), from: page });
    else if (href.indexOf('tel:') === 0) track('phone_click', { model: page });
    else if (href.indexOf('wa.me') > -1 || href.indexOf('whatsapp') > -1) track('whatsapp_click', { model: page });
  });

  /* ---- video facade: loads the player only on click ---- */
  document.querySelectorAll('.vid-box').forEach(function (box) {
    box.addEventListener('click', function () {
      if (box.classList.contains('on')) return;
      var el, yt = box.dataset.yt, mp4 = box.dataset.mp4, title = box.dataset.title || 'ELEXA EV video';
      if (yt) {
        el = document.createElement('iframe');
        el.src = 'https://www.youtube-nocookie.com/embed/' + yt + '?autoplay=1&rel=0&modestbranding=1';
        el.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        el.allowFullscreen = true;
        el.title = title;
      } else if (mp4) {
        el = document.createElement('video');
        el.src = mp4; el.controls = true; el.autoplay = true; el.playsInline = true;
        var img = box.querySelector('img'); if (img) el.poster = img.getAttribute('src');
      } else return;
      box.appendChild(el);
      box.classList.add('on');
      track('video_play', { video_title: title, model: model || 'Home' });
    });
  });
})();
