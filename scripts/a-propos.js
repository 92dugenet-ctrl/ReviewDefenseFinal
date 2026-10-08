(() => {
  const choice = document.querySelector("[data-about-choice]");
  const buttons = [...document.querySelectorAll("[data-choice]")];
  const note = document.querySelector("[data-choice-note]");
  const methods = [...document.querySelectorAll("[data-method-item]")];

  const messages = {
    respond: "Répondre peut être juste. Encore faut-il comprendre l'expérience et le ton à adopter.",
    report: "Signaler demande davantage qu'un score : il faut examiner les règles et les éléments disponibles.",
    ignore: "Ignorer est aussi une décision. Elle peut être pertinente lorsque l'avis ne nécessite aucune action."
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => item.classList.remove("is-selected"));
      button.classList.add("is-selected");
      choice?.classList.add("has-choice");
      if (note) note.textContent = messages[button.dataset.choice] || "Comprendre avant d'agir.";
    });
  });

  if (methods.length) {
    let active = 0;
    const setMethod = (index) => {
      methods.forEach((item, itemIndex) => {
        item.classList.toggle("is-active", itemIndex === index);
      });
    };
    setMethod(active);
    methods.forEach((item, index) => {
      item.addEventListener("mouseenter", () => {
        active = index;
        setMethod(active);
      });
      item.addEventListener("focusin", () => {
        active = index;
        setMethod(active);
      });
    });
  }
})();