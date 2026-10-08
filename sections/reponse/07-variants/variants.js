document.addEventListener('DOMContentLoaded', () => {
  const data = [
    ["EMPATHIQUE", "Nous sommes sincèrement désolés que votre expérience n'ait pas été à la hauteur de vos attentes."],
    ["PROFESSIONNELLE", "Nous regrettons que votre expérience n'ait pas répondu à vos attentes et prenons votre remarque en considération."],
    ["DIRECTE", "Nous avons bien pris connaissance de votre remarque et souhaitons échanger avec vous pour comprendre la situation."]
  ];
  let index = 0;
  const label = document.querySelector('[data-variant-label]');
  const copy = document.querySelector('[data-variant-copy]');
  const dots = document.querySelectorAll('[data-variant-dot]');
  const render = (next) => {
    index = (next + data.length) % data.length;
    label.textContent = data[index][0];
    copy.textContent = data[index][1];
    dots.forEach((dot) => dot.classList.toggle('is-active', Number(dot.dataset.variantDot) === index));
  };
  document.querySelector('[data-variant-prev]')?.addEventListener('click', () => render(index - 1));
  document.querySelector('[data-variant-next]')?.addEventListener('click', () => render(index + 1));
  dots.forEach((dot) => dot.addEventListener('click', () => render(Number(dot.dataset.variantDot))));
});
