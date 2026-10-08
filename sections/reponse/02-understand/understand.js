document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('#reponse-understand [data-understand]');
  if (!('IntersectionObserver' in window)) return items.forEach((item) => item.classList.add('is-visible'));
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  }), { threshold: 0.25 });
  items.forEach((item) => observer.observe(item));
});
