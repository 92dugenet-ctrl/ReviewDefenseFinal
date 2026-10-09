document.addEventListener('DOMContentLoaded', () => {
  const buttons = Array.from(document.querySelectorAll('#analyse-explanation [data-explanation]'));
  const panels = Array.from(document.querySelectorAll('#analyse-explanation [data-explanation-panel]'));

  if (!buttons.length || !panels.length) return;

  const activate = (selectedButton) => {
    const key = selectedButton.dataset.explanation;

    buttons.forEach((button) => {
      const active = button === selectedButton;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
    });

    panels.forEach((panel) => {
      panel.hidden = panel.dataset.explanationPanel !== key;
    });
  };

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => activate(button));
    button.addEventListener('keydown', (event) => {
      let nextIndex = index;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % buttons.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + buttons.length) % buttons.length;
      else if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = buttons.length - 1;
      else return;

      event.preventDefault();
      buttons[nextIndex].focus();
      activate(buttons[nextIndex]);
    });
  });

  const initiallySelected = buttons.find((button) => button.getAttribute('aria-selected') === 'true') || buttons[0];
  activate(initiallySelected);
});
