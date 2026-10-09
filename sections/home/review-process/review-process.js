(() => {
  const steps = [...document.querySelectorAll("#home-process [data-step]")];
  if (!steps.length) return;
  const activate = selected => steps.forEach(step => {
    const active = step === selected;
    step.classList.toggle("rd-process__step--active", active);
    step.setAttribute("aria-pressed", String(active));
  });
  steps.forEach(step => {
    step.addEventListener("click", () => activate(step));
    step.addEventListener("keydown", event => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      activate(step);
    });
  });
})();