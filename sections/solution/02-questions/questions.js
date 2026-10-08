// FUNCTIONAL PROTOTYPE — question switching.
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("[data-question]");
  const panels = document.querySelectorAll("[data-panel]");
  if (!buttons.length || !panels.length) return;
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.question;
      panels.forEach((panel) => { panel.hidden = panel.dataset.panel !== target; });
      buttons.forEach((item) => { item.classList.toggle("is-active", item === button); });
    });
  });
  buttons[0].click();
});
