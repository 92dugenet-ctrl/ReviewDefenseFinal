document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('[data-explanation]');
  const panels = document.querySelectorAll('[data-explanation-panel]');
  buttons.forEach((button) => button.addEventListener('click', () => {
    const key = button.dataset.explanation;
    buttons.forEach((item) => item.classList.toggle('is-active', item === button));
    panels.forEach((panel) => { panel.hidden = panel.dataset.explanationPanel !== key; });
  }));
});
