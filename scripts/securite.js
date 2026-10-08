(() => {
  const orbit = document.querySelector("[data-security-orbit]");
  const nodes = [...document.querySelectorAll("[data-orbit-node]")];
  const controls = [...document.querySelectorAll("[data-security-control]")];
  const center = document.querySelector("[data-security-center]");
  const detail = document.querySelector("[data-security-center-detail]");

  if (!orbit || nodes.length !== 6 || !center || !detail) return;

  const states = [
    { title: "Vos données", detail: "Les données utiles restent au cœur du traitement." },
    { title: "Accès contrôlés", detail: "Les accès sont organisés selon les rôles et les besoins." },
    { title: "Analyse et recommandations", detail: "Le système analyse et recommande sans transformer son analyse en action automatique." },
    { title: "Validation humaine", detail: "Les décisions importantes restent sous le contrôle de l'utilisateur." },
    { title: "Action maîtrisée", detail: "Les recommandations restent distinctes des actions effectivement engagées." },
    { title: "Traçabilité", detail: "Les étapes importantes restent compréhensibles et suivables." }
  ];

  let active = 0;
  let startX = null;
  let startY = null;

  const setActive = (index, animate = true) => {
    active = (index + states.length) % states.length;
    orbit.style.setProperty("--security-rotation", `${active * -60}deg`);
    orbit.classList.toggle("is-animating", animate);
    center.textContent = states[active].title;
    detail.textContent = states[active].detail;
    nodes.forEach((node, nodeIndex) => node.classList.toggle("is-active", nodeIndex === active));
    controls.forEach((control, controlIndex) => {
      const selected = controlIndex === active;
      control.classList.toggle("is-active", selected);
      control.setAttribute("aria-selected", String(selected));
    });
  };

  controls.forEach((control) => {
    control.addEventListener("click", () => setActive(Number(control.dataset.securityControl)));
  });

  orbit.addEventListener("pointerdown", (event) => {
    startX = event.clientX;
    startY = event.clientY;
    orbit.setPointerCapture(event.pointerId);
  });

  orbit.addEventListener("pointerup", (event) => {
    if (startX === null || startY === null) return;
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    startX = null;
    startY = null;
    if (Math.abs(dx) < 28 && Math.abs(dy) < 28) return;
    if (Math.abs(dx) >= Math.abs(dy)) setActive(active + (dx < 0 ? 1 : -1));
  });

  orbit.addEventListener("wheel", (event) => {
    if (Math.abs(event.deltaY) < 8 && Math.abs(event.deltaX) < 8) return;
    event.preventDefault();
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    setActive(active + (delta > 0 ? 1 : -1));
  }, { passive: false });

  setActive(0, false);
})();