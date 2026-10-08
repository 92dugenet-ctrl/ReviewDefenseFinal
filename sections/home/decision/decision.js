(() => {
  const states={
    respond:["Répondre avec contexte.","Un avis négatif n'a pas besoin d'être supprimé pour mériter une réponse soignée."],
    examine:["Examiner avant d'agir.","Plusieurs signaux peuvent justifier une vérification complémentaire."],
    report:["Préparer un signalement.","Lorsque les règles semblent pouvoir être en cause, le dossier doit être vérifié avant action."]
  };
  const title=document.querySelector("[data-decision-title]");
  const copy=document.querySelector("[data-decision-copy]");
  document.querySelectorAll("[data-decision]").forEach(button=>button.addEventListener("click",()=>{
    document.querySelectorAll("[data-decision]").forEach(item=>item.setAttribute("aria-pressed",String(item===button)));
    const state=states[button.dataset.decision]||states.respond;
    if(title) title.textContent=state[0];
    if(copy) copy.textContent=state[1];
  }));
})();