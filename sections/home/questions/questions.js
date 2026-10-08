(() => {
  const states = {
    negative:["Un avis négatif mérite d'abord d'être compris.","Une mauvaise expérience peut être réelle. ReviewDefense aide à distinguer le problème client de ce qui mérite une action différente.","Contexte avant réaction."],
    fake:["La suspicion se construit avec plusieurs signaux.","Un signal isolé ne suffit pas : le système rapproche contexte, historique et éléments observables.","Signaux avant conclusion."],
    action:["La bonne action dépend de la situation.","Répondre, examiner, signaler ou attendre sont des options différentes selon les faits disponibles.","Décision avant automatisme."],
    ai:["Le système transforme l'analyse en orientation exploitable.","Les éléments retenus sont expliqués pour aider l'utilisateur à choisir et valider la suite.","Orientation avant action."]
  };
  const title=document.querySelector("[data-question-title]");
  const copy=document.querySelector("[data-question-copy]");
  const action=document.querySelector("[data-question-action]");
  document.querySelectorAll("[data-question]").forEach(button=>button.addEventListener("click",()=>{
    document.querySelectorAll("[data-question]").forEach(item=>item.setAttribute("aria-pressed",String(item===button)));
    const state=states[button.dataset.question]||states.negative;
    if(title) title.textContent=state[0];
    if(copy) copy.textContent=state[1];
    if(action) action.textContent=state[2];
  }));
})();