/* ── theme follows UK time, click clock to override ── */
var root=document.documentElement,
    btn=document.getElementById('tclock'),
    ico=document.getElementById('tico'),
    hr=document.getElementById('thr'),
    manual=false;

function ukParts(){
  try{
    var f=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/London',hour:'2-digit',minute:'2-digit',hour12:false}),
        s=f.format(new Date()).split(':');
    return {h:parseInt(s[0],10), m:s[1]};
  }catch(e){
    var d=new Date();
    return {h:d.getHours(), m:String(d.getMinutes()).padStart(2,'0')};
  }
}
function setTheme(t){
  root.setAttribute('data-theme',t);
  ico.textContent=(t==='light')?'☀':'☾';
}
function tick(){
  var p=ukParts();
  hr.textContent=String(p.h).padStart(2,'0')+':'+p.m;
  if(!manual) setTheme((p.h>=7 && p.h<19)?'light':'dark');
}
tick();
setInterval(tick,60000);
btn.addEventListener('click',function(){
  manual=true;
  setTheme(root.getAttribute('data-theme')==='light'?'dark':'light');
});

/* ── reveal on scroll ── */
var io=new IntersectionObserver(function(es){
  es.forEach(function(e,i){
    if(e.isIntersecting){setTimeout(function(){e.target.classList.add('in');},(i%4)*60);io.unobserve(e.target);}
  });
},{threshold:.1,rootMargin:'0px 0px -50px 0px'});
document.querySelectorAll('.rv').forEach(function(el){io.observe(el);});

document.getElementById('yr').textContent=new Date().getFullYear();
