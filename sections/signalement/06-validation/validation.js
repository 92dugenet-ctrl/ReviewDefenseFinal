document.addEventListener('DOMContentLoaded',()=>{
  const root=document.getElementById('signalement-validation');
  if(!root)return;
  const items=root.querySelectorAll('[data-reveal]');
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver((entries)=>entries.forEach((entry)=>{
      if(entry.isIntersecting)entry.target.classList.add('is-visible');
    }),{threshold:.2});
    items.forEach((item)=>observer.observe(item));
  }else items.forEach((item)=>item.classList.add('is-visible'));
  const status=root.querySelector('[data-decision-status]');
  const labels={report:'Signalement sélectionné — dossier prêt pour validation.',reply:'Réponse sélectionnée — passer à la rédaction.',review:'Examen complémentaire sélectionné — conserver le dossier ouvert.',none:'Aucune action sélectionnée — conserver le dossier.'};
  root.querySelectorAll('[data-decision]').forEach((button)=>button.addEventListener('click',()=>{
    root.querySelectorAll('[data-decision]').forEach((item)=>item.classList.remove('is-active'));
    button.classList.add('is-active');
    status.textContent=labels[button.dataset.decision];
  }));
});
