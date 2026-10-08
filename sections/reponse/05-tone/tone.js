document.addEventListener('DOMContentLoaded', () => {
  const copy = document.querySelector('[data-tone-copy]');
  const buttons = document.querySelectorAll('[data-tone]');
  const texts = {
    professionnel: "Nous sommes désolés que votre expérience n'ait pas répondu à vos attentes.",
    chaleureux: "Nous sommes sincèrement désolés que votre expérience n'ait pas été à la hauteur de vos attentes.",
    direct: "Nous avons bien pris connaissance de votre remarque et souhaitons comprendre ce qui s'est passé."
  };
  buttons.forEach((button) => button.addEventListener('click', () => {
    buttons.forEach((item) => item.classList.toggle('is-active', item === button));
    copy.style.opacity = '0';
    window.setTimeout(() => {
      copy.textContent = texts[button.dataset.tone];
      copy.style.opacity = '1';
    }, 160);
  }));
});
