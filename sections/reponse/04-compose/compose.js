document.addEventListener('DOMContentLoaded', () => {
  const lines = document.querySelectorAll('#reponse-compose [data-compose-line]');
  if (!('IntersectionObserver' in window)) return lines.forEach((line) => line.classList.add('is-visible'));
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  }), { threshold: 0.25 });
  lines.forEach((line) => observer.observe(line));
});
