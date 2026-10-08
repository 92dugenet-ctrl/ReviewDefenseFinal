document.addEventListener('DOMContentLoaded', () => {
  const orbit = document.querySelector('#reponse-type .reponse-type-orbit');
  if (!orbit) return;
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { orbit.classList.add('is-active'); observer.disconnect(); }
  }), { threshold: 0.25 });
  observer.observe(orbit);
});
