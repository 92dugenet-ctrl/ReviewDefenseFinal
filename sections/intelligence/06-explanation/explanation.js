document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('[data-intelligence-explanation]');
  const panels = document.querySelectorAll('[data-intelligence-panel]');
  buttons.forEach((button) => button.addEventListener('click', () => {
    const key = button.dataset.intelligenceExplanation;
    buttons.forEach((item) => item.classList.toggle('is-active', item === button));
    panels.forEach((panel) => { panel.hidden = panel.dataset.intelligencePanel !== key; });
  }));
});
