(() => {
  const states = {
    context:["Un avis négatif peut être parfaitement réel.","Le premier réflexe n'est donc pas de supprimer : c'est de comprendre."],
    language:["Le langage donne une première lecture, pas une conclusion.","Les mots employés sont replacés dans le contexte de l'expérience."],
    activity:["Un signal inhabituel mérite un examen.","L'activité peut attirer l'attention sans constituer une preuve."]
  };
  const title=document.querySelector("[data-scan-title]");
  const copy=document.querySelector("[data-scan-copy]");
  document.querySelectorAll("[data-signal]").forEach(button=>button.addEventListener("click",()=>{
    document.querySelectorAll("[data-signal]").forEach(item=>item.setAttribute("aria-pressed",String(item===button)));
    const state=states[button.dataset.signal]||states.context;
    if(title) title.textContent=state[0];
    if(copy) copy.textContent=state[1];
  }));
})();