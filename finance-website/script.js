(() => {
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const toggle=$('.menu-toggle'),nav=$('.nav');
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'×':'☰';});
$$('.nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰';}));
const reveal=$$('.reveal');if('IntersectionObserver'in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});reveal.forEach(el=>io.observe(el));}else reveal.forEach(el=>el.classList.add('visible'));
let category='all';const search=$('#service-search'),cards=$$('.service-card'),filters=$$('.filter'),empty=$('#no-results');
function filter(){let n=0;const term=search.value.trim().toLowerCase();cards.forEach(card=>{const ok=(category==='all'||card.dataset.category===category)&&(card.dataset.search+' '+card.innerText).toLowerCase().includes(term);card.hidden=!ok;if(ok)n++;});empty.hidden=n>0;}
search.addEventListener('input',filter);filters.forEach(b=>b.addEventListener('click',()=>{category=b.dataset.filter;filters.forEach(x=>x.classList.toggle('active',x===b));filter();}));
const interest=$('#interest');$$('.enquire-service').forEach(b=>b.addEventListener('click',()=>{interest.value=b.dataset.service;$('#contact').scrollIntoView({behavior:'smooth'});setTimeout(()=>interest.focus({preventScroll:true}),450);}));
$('#contact-form').addEventListener('submit',e=>{e.preventDefault();if(!e.currentTarget.reportValidity())return;const fd=new FormData(e.currentTarget);const result=$('#form-result');result.textContent=`Enquiry preview prepared for ${fd.get('name')} about ${fd.get('interest')}. Nothing was sent or saved. Connect a secure form backend before real use.`;result.hidden=false;result.scrollIntoView({behavior:'smooth',block:'nearest'});});
$$('.faq-list details').forEach(detail=>detail.addEventListener('toggle',()=>{const mark=$('summary span',detail);if(mark)mark.textContent=detail.open?'−':'+';}));
$('#year').textContent=new Date().getFullYear();
})();