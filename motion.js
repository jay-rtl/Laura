(()=>{'use strict';


const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
let intro=null,finished=false,guard;
const finish=()=>{if(finished)return;finished=true;clearTimeout(guard);if(intro)intro.remove();document.body.classList.remove('intro-running');};
let first=true;try{first=!sessionStorage.getItem('laura-entrance-seen');sessionStorage.setItem('laura-entrance-seen','1');}catch(e){}
if(first&&!reduce&&window.gsap){
 intro=document.createElement('div');intro.className='entrance';intro.setAttribute('role','dialog');intro.setAttribute('aria-label','Laura Mountainspring introduction');
 intro.innerHTML='<div class="entrance-inner"><img class="entrance-logo" src="/Laura/assets/laura-logo.png" alt="Laura Mountainspring — Independent Author" width="394" height="394"><div class="entrance-rule"></div><p class="entrance-caption">Stories to wander into</p></div>';
 document.body.append(intro);document.body.classList.add('intro-running');
 const esc=e=>{if(e.key==='Escape'){finish();document.removeEventListener('keydown',esc)}};document.addEventListener('keydown',esc);
 guard=setTimeout(finish,3500);
 gsap.timeline({onComplete:finish}).fromTo('.entrance-logo',{autoAlpha:0,scale:.88,y:18},{autoAlpha:1,scale:1,y:0,duration:.9,ease:'power3.out'}).from('.entrance-rule',{scaleX:0,duration:.55},.45).from('.entrance-caption',{opacity:0,y:9,duration:.5},.65).to(intro,{opacity:0,yPercent:-5,duration:.55,ease:'power2.inOut'},1.7);
}
if(!window.gsap||reduce)return;
try{
 if(window.ScrollTrigger)gsap.registerPlugin(ScrollTrigger);
 gsap.from('header .brand',{opacity:0,y:-8,duration:.7,delay:first?1.95:.05,clearProps:'all'});
 gsap.from('header nav a',{opacity:0,y:-8,stagger:.07,duration:.5,delay:first?2.05:.1,clearProps:'all'});
 const hero=document.querySelector('.home-content,.page-head,.author-hero');
 if(hero)gsap.from(hero.children,{opacity:0,y:22,stagger:.11,duration:.85,ease:'power2.out',delay:first?2.05:.1,clearProps:'all'});
 if(window.ScrollTrigger){
 const targets=document.querySelectorAll('.featured-novel,.story-path,.author-introduction,.book-layout,.author-text,.questions,.next,.footer-top');
 targets.forEach(el=>gsap.from(el,{y:28,opacity:0,duration:.85,ease:'power2.out',clearProps:'all',scrollTrigger:{trigger:el,start:'top 92%',once:true}}));
 document.querySelectorAll('details').forEach(el=>el.addEventListener('toggle',()=>ScrollTrigger.refresh()));
 window.addEventListener('load',()=>ScrollTrigger.refresh(),{once:true});
 document.fonts?.ready.then(()=>ScrollTrigger.refresh());
}
}catch(e){finish();}
window.addEventListener('pageshow',e=>{if(e.persisted)finish()});
})();