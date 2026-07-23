/* Shared behaviours for every MOTIV page — one organism (burger, media, reveal, hovers). */

/* ---- Burger / mobile menu (component) ---- */
(function(){
  var burger=document.getElementById('burgerBtn'),
      menu=document.getElementById('mobileMenu'),
      ov=document.getElementById('mmOverlay');
  if(!burger||!menu||!ov) return;
  function open(){ burger.classList.add('open'); menu.classList.add('open'); ov.classList.add('open'); burger.setAttribute('aria-expanded','true'); }
  function close(){ burger.classList.remove('open'); menu.classList.remove('open'); ov.classList.remove('open'); burger.setAttribute('aria-expanded','false'); }
  burger.addEventListener('click',function(){ menu.classList.contains('open')?close():open(); });
  ov.addEventListener('click',close);
  var closeBtn=document.getElementById('mmClose'); if(closeBtn) closeBtn.addEventListener('click',close);
  menu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click',close); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') close(); });
  window.addEventListener('resize',function(){ if(window.innerWidth>1080) close(); });
})();

/* ---- Pexels media sourcing (photos + video) — quality, one pass ---- */
var PEXELS_KEY='WaeBQ61eXdor76RHLLCa3G5EYRvu2MJPqd1V35nRkfVZDQg4X5bJngYq';
/* Stable media: deterministic pick + localStorage cache, so the SAME query always
   resolves to the SAME asset — images never change on reload or page navigation. */
function cacheGet(k){ try{ return localStorage.getItem(k)||null; }catch(e){ return null; } }
function cacheSet(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }
async function pexels(q,o){
  o=o||'landscape';
  var key='mvimg:'+o+':'+q, cached=cacheGet(key);
  if(cached) return cached;
  try{
    var r=await fetch('https://api.pexels.com/v1/search?query='+encodeURIComponent(q)+'&per_page=20&orientation='+o,{headers:{Authorization:PEXELS_KEY}});
    if(!r.ok) return null;
    var d=await r.json();
    var min=(o==='landscape')?1400:900;
    var p=(d.photos||[]).filter(function(x){ return x.width>=min && x.height>=min; });
    if(!p.length) p=d.photos||[];
    if(!p.length) return null;
    var pick=p[0]; // deterministic — top relevant result
    var u=(o==='landscape')?(pick.src.large2x||pick.src.original):(pick.src.portrait||pick.src.large2x||pick.src.large);
    if(u) cacheSet(key,u);
    return u;
  }catch(e){ return null; }
}
document.querySelectorAll('img[data-q]').forEach(function(el){
  pexels(el.dataset.q, el.dataset.o).then(function(u){ if(u){ el.loading='lazy'; el.onerror=function(){el.remove();}; el.src=u; }});
});
async function pexelsVideo(q){
  var key='mvvid:'+q, cached=cacheGet(key);
  if(cached) return cached;
  try{
    var r=await fetch('https://api.pexels.com/videos/search?query='+encodeURIComponent(q)+'&per_page=15&orientation=landscape&size=medium',{headers:{Authorization:PEXELS_KEY}});
    if(!r.ok) return null;
    var d=await r.json();
    var vids=(d.videos||[]).filter(function(v){ return (v.width||0)>=1280; });
    if(!vids.length) vids=d.videos||[];
    if(!vids.length) return null;
    var pick=vids[0]; // deterministic
    var files=(pick.video_files||[]).filter(function(f){ return f.file_type==='video/mp4' && f.width; });
    files.sort(function(a,b){ return b.width-a.width; });
    var f=files.filter(function(x){ return x.width<=1920; })[0] || files[files.length-1] || files[0];
    var u=f?f.link:null;
    if(u) cacheSet(key,u);
    return u;
  }catch(e){ return null; }
}
document.querySelectorAll('video[data-vq]').forEach(function(v){
  pexelsVideo(v.dataset.vq).then(function(u){ if(u){ v.src=u; var pr=v.play(); if(pr&&pr.catch) pr.catch(function(){}); } });
});

var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var G=window.gsap;

/* ---- Kinetic marquee (home only; guarded) ---- */
(function(){
  var track=document.getElementById('mqTrack');
  if(!track) return;
  track.innerHTML+=track.innerHTML;
  if(G && !reduce){
    var half=track.scrollWidth/2;
    G.to(track,{x:-half,duration:22,ease:'none',repeat:-1});
  }
})();

/* ---- GSAP reveals + hovers ---- */
if(G){
  G.registerPlugin(window.ScrollTrigger);
  var mm=G.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', function(){
    // Base reveal (every project/page): opacity 0->1, y -15->0, duration .8s, delay .45s, power3.out, once.
    var above=G.utils.toArray('.hero [data-reveal], .page-hero [data-reveal]');
    if(above.length) G.from(above,{y:-15,autoAlpha:0,duration:.8,delay:.45,ease:'power3.out',stagger:.12});
    G.utils.toArray('[data-reveal]').forEach(function(el){
      if(el.closest('.hero')||el.closest('.page-hero')) return;
      G.from(el,{y:-15,autoAlpha:0,duration:.8,delay:.45,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}});
    });

    // Hover transition duration hardcoded to 350ms.
    function hov(el,build){ var tl=G.timeline({paused:true}); build(tl); el.addEventListener('mouseenter',function(){tl.play();}); el.addEventListener('mouseleave',function(){tl.reverse();}); }
    G.utils.toArray('.btn').forEach(function(b){ var a=b.querySelector('.arw'); if(a) hov(b,function(tl){ tl.to(a,{x:6,duration:.35,ease:'power2.out'},0); }); });
    G.utils.toArray('.mainnav a').forEach(function(l){ var u=l.querySelector('.u'); if(!u)return; hov(l,function(tl){ tl.fromTo(u,{scaleX:0,transformOrigin:'left'},{scaleX:1,duration:.35,ease:'power3.out'},0); }); });
    G.utils.toArray('.proj, .member').forEach(function(c){ var f=c.querySelector('.fill'), h=c.querySelector('h3'); hov(c,function(tl){ if(f) tl.to(f,{scale:1.05,duration:.35,ease:'power2.out'},0); if(h) tl.to(h,{color:'#ff5b23',duration:.35},0); }); });
    G.utils.toArray('.srv').forEach(function(s){ var h=s.querySelector('h4'); hov(s,function(tl){ tl.to(h,{color:'#ff5b23',duration:.35,ease:'power2.out'},0); }); });
    G.utils.toArray('.fcol a').forEach(function(a){ hov(a,function(tl){ tl.to(a,{x:5,color:'#f2ede3',duration:.35,ease:'power2.out'},0); }); });
    // Logo: the accent letter disintegrates into dots and reassembles on hover (stays left).
    G.utils.toArray('.logo').forEach(function(b){ var dots=b.querySelectorAll('.logo-mark circle'); if(!dots.length) return;
      hov(b,function(tl){ dots.forEach(function(dot,i){ tl.to(dot,{x:Math.cos(i*1.7)*9,y:Math.sin(i*2.3)*9,opacity:.25,duration:.35,ease:'power2.out'},0); }); }); });
  });
}
