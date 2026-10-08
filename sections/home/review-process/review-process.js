(() => {
  const steps=[...document.querySelectorAll("[data-step]")];
  if(!steps.length)return;
  const activate=(name)=>steps.forEach(step=>step.classList.toggle("rd-process__step--active",step.dataset.step===name));
  steps.forEach(step=>step.addEventListener("click",()=>activate(step.dataset.step)));
})();