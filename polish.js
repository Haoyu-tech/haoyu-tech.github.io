(function(){
  var nav=document.querySelector('.site-nav');
  var top=document.createElement('button');
  top.className='to-top';top.type='button';top.setAttribute('aria-label','Back to top');
  top.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  top.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})});
  document.body.appendChild(top);
  /* Scroll spy: highlight the last section whose top has passed 40% of the viewport */
  var links=[].slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  var secs=links.map(function(a){return document.querySelector(a.getAttribute('href'))});
  function onScroll(){
    var y=window.scrollY;if(nav)nav.classList.toggle('scrolled',y>10);top.classList.toggle('show',y>600);
    var cur=-1,line=window.innerHeight*.4;
    secs.forEach(function(s,i){if(s&&s.getBoundingClientRect().top<=line)cur=i});
    links.forEach(function(a,i){a.classList.toggle('active',i===cur)});
  }
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();

  if(!('IntersectionObserver' in window))return;

  /* Reveal tiles as they scroll into view */
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var tiles=[].slice.call(document.querySelectorAll('.bento>.t:not(.top)'));
  document.documentElement.classList.add('js-reveal');
  var rev=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');rev.unobserve(e.target)}})},{rootMargin:'0px 0px -6% 0px'});
  tiles.forEach(function(t,i){t.classList.add('reveal');t.style.transitionDelay=((i%3)*70)+'ms';rev.observe(t)});
})();
