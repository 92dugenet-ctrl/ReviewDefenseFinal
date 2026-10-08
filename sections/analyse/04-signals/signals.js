document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('#analyse-signals');
  if (!section) return;
  const activate = () => section.classList.add('is-active');
  if (!('IntersectionObserver' in window)) return activate();
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { activate(); observer.disconnect(); }
  }), { threshold: 0.25 });
  observer.observe(section);
});
