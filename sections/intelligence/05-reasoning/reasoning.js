document.addEventListener('DOMContentLoaded', () => {
  const steps = document.querySelectorAll('#intelligence-reasoning [class="intelligence-reasoning-flow"] div');
  if (!('IntersectionObserver' in window)) return steps.forEach((step) => step.classList.add('is-visible'));
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  }), { threshold: 0.25 });
  steps.forEach((step) => observer.observe(step));
});
