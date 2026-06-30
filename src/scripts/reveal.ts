// Phase 2 scroll reveal — IntersectionObserver, fire-once, zero deps
(function initReveal() {
  // Mark JS as active so animations.css opacity:0 guard applies
  document.documentElement.classList.add('js');

  const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!els.length) return;

  // Respect prefers-reduced-motion — reveal everything instantly
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    els.forEach(el => {
      el.style.opacity = '1';
      el.classList.add('is-visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('is-visible');
          observer.unobserve(entry.target); // fire once only
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px', // trigger slightly before element hits bottom of viewport
    }
  );

  els.forEach(el => observer.observe(el));
})();
