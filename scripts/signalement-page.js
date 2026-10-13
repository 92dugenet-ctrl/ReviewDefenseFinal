/* Signalement page interactions. Selection only: no report or publication is submitted. */
(() => {
  const root = document.querySelector("main.rd-signalement");
  if (!root) return;

  const buttons = [...root.querySelectorAll("[data-decision]")];
  const status = root.querySelector(".signalement-decision-status");
  const labels = {
    report: "Signaler",
    reply: "Répondre",
    review: "Examiner",
    none: "Ne pas agir"
  };

  buttons.forEach((button) => {
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => {
      const selected = button.dataset.decision;
      buttons.forEach((item) => {
        const active = item === button;
        item.setAttribute("aria-pressed", String(active));
        item.classList.toggle("is-selected", active);
      });

      if (status) {
        const label = labels[selected] || "Orientation à confirmer";
        status.textContent = `Orientation choisie : ${label}. Cette sélection ne déclenche aucune action et doit être confirmée par un professionnel.`;
      }
    });
  });
})();
