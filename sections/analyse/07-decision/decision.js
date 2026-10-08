document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('#analyse-decision');
  if (!section) return;
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { section.classList.add('is-active'); observer.disconnect(); }
  }), { threshold: 0.3 });
  observer.observe(section);
});
