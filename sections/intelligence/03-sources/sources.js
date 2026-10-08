document.addEventListener('DOMContentLoaded', () => {
  const map = document.querySelector('#intelligence-sources .intelligence-source-map');
  if (!map) return;
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { map.classList.add('is-active'); observer.disconnect(); }
  }), { threshold: 0.25 });
  observer.observe(map);
});
