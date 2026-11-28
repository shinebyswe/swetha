document.addEventListener('DOMContentLoaded',()=>{
  const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
  const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  const y=$('#year'); if(y) y.textContent=new Date().getFullYear();

  // Loader
  const hide=()=>setTimeout(()=>$('#loader')&&$('#loader').classList.add('done'),700);
  if(document.readyState==='complete') hide(); else window.addEventListener('load',hide);
  setTimeout(()=>$('#loader')&&$('#loader').classList.add('done'),3500);

  // Reveal with stagger
  $$('.row').forEach(r=>r.querySelectorAll(':scope > .reveal').forEach((el,i)=>el.style.transitionDelay=(i%4)*110+'ms'));
  $$('.hero-text .reveal').forEach((el,i)=>el.style.transitionDelay=(.9+i*.12)+'s');
  if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});$$('.reveal').forEach(el=>io.observe(el));}
  else $$('.reveal').forEach(el=>el.classList.add('visible'));

  // Gallery filter
  $$('.filter-btn').forEach(btn=>btn.addEventListener('click',()=>{
    $$('.filter-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
    const f=btn.dataset.filter;$$('.gallery-item').forEach(i=>i.style.display=(f==='all'||i.dataset.category.split(' ').includes(f))?'':'none');
  }));

  // Scroll: navbar, progress, back-to-top
  const top=$('#backToTop'),nav=$('.site-nav'),bar=$('#progress');
  const onScroll=()=>{const s=scrollY,h=document.documentElement.scrollHeight-innerHeight;
    nav.classList.toggle('scrolled',s>40);bar.style.width=(s/h*100)+'%';if(top)top.style.display=s>500?'block':'none'};
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  if(top) top.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
  $$('#mainNav a').forEach(a=>a.addEventListener('click',()=>{const n=$('#mainNav');if(n.classList.contains('show')&&window.bootstrap)bootstrap.Collapse.getOrCreateInstance(n).hide()}));

  // Rotating specialities
  const rot=$('#rot'),words=['Bridal makeup','Party glam','Hair styling','Saree draping'];let w=0;
  if(rot&&!reduce) setInterval(()=>{rot.classList.add('swap');setTimeout(()=>{w=(w+1)%words.length;rot.textContent=words[w];rot.classList.remove('swap')},400)},2600);

  // Hero mouse parallax + card tilt (devices with a mouse)
  if(matchMedia('(hover:hover)').matches&&!reduce){
    const art=$('.hero-art');
    if(art) $('.hero').addEventListener('mousemove',e=>{art.style.transform=""});
    $$('.service-card,.look-card').forEach(c=>{
      c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(800px) rotateY(${x*7}deg) rotateX(${-y*7}deg) translateY(-6px)`});
      c.addEventListener('mouseleave',()=>c.style.transform='');
    });
  }

  // Floating gold sparkles in hero
  const cv=$('#sparkles');
  if(cv&&!reduce){
    const ctx=cv.getContext('2d');let W,H,P=[];
    const size=()=>{W=cv.width=cv.offsetWidth;H=cv.height=cv.offsetHeight;P=Array.from({length:Math.min(55,W/22)},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.8+.4,v:Math.random()*.4+.15,a:Math.random()*6.28}))};
    size();addEventListener('resize',size);
    (function draw(){ctx.clearRect(0,0,W,H);P.forEach(p=>{p.y-=p.v;p.a+=.03;if(p.y<-5){p.y=H+5;p.x=Math.random()*W}
      ctx.globalAlpha=.35+.5*Math.abs(Math.sin(p.a));ctx.fillStyle='#c98a25';ctx.shadowColor='#d9a441';ctx.shadowBlur=6;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,6.28);ctx.fill()});requestAnimationFrame(draw)})();
  }
});
