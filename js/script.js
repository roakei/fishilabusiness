(function(){
  const yearEl = document.getElementById('year');
  if(yearEl){ yearEl.textContent = `© ${new Date().getFullYear()}`; }

  const menuBtn = document.getElementById('menuToggle');
  const navList = document.getElementById('navList');
  if(menuBtn && navList){
    menuBtn.addEventListener('click', () => {
      const open = navList.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
  }

  const a11yToggle = document.getElementById('a11yToggle');
  if(a11yToggle){
    a11yToggle.addEventListener('click', () => {
      const pressed = a11yToggle.getAttribute('aria-pressed') === 'true';
      a11yToggle.setAttribute('aria-pressed', String(!pressed));
      document.documentElement.style.setProperty('filter', pressed ? 'none' : 'contrast(1.15)');
      document.documentElement.style.setProperty('font-size', pressed ? '' : '18px');
    });
  }

  const track = document.getElementById('carouselTrack');
  if(track){
    const slides = Array.from(track.querySelectorAll('.slide'));
    const prev = document.getElementById('prevBtn');
    const next = document.getElementById('nextBtn');
    const status = document.getElementById('carouselStatus');
    let index = 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const setIndex = (i) => {
      index = (i + slides.length) % slides.length;
      slides.forEach((s, idx) => s.classList.toggle('is-current', idx === index));
      if(!prefersReducedMotion){
        track.style.transition = 'transform 350ms ease';
      }else{
        track.style.transition = 'none';
      }
      track.style.transform = `translateX(${index * -100}%)`;
      if(status){ status.textContent = `Slide ${index+1} of ${slides.length}`; }
    };
    prev?.addEventListener('click', () => setIndex(index - 1));
    next?.addEventListener('click', () => setIndex(index + 1));
    track.tabIndex = 0;
    track.addEventListener('keydown', (e) => {
      if(e.key === 'ArrowRight'){ setIndex(index + 1); }
      if(e.key === 'ArrowLeft'){ setIndex(index - 1); }
    });
    setIndex(0);
  }
})();
