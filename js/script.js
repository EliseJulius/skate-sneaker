document.addEventListener('DOMContentLoaded', function() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const revealOnScroll = () => {
    reveals.forEach(el => {
      if (el.classList.contains("active")) return;
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight - 150) {
        el.classList.add("active");
      }
    });
  };

  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        revealOnScroll();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener("scroll", onScroll);
  revealOnScroll();
});
