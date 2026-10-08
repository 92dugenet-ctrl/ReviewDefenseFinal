document.addEventListener('DOMContentLoaded',()=>{
  const root=document.getElementById('signalement-alternative');
  if(!root)return;
  const texts={
    reply:'Répondre lorsque l’avis semble correspondre à une expérience réelle et qu’une réponse peut traiter la situation.',
    review:'Examiner davantage lorsque les éléments disponibles ne permettent pas encore de choisir une action avec suffisamment de contexte.',
    report:'Signaler lorsque plusieurs éléments convergents justifient un examen par la plateforme concernée.'
  };
  const result=root.querySelector('[data-alt-result]');
  root.querySelectorAll('[data-alt]').forEach((button)=>button.addEventListener('click',()=>{
    root.querySelectorAll('[data-alt]').forEach((item)=>item.classList.remove('is-active'));
    button.classList.add('is-active');
    result.textContent=texts[button.dataset.alt];
  }));
});
