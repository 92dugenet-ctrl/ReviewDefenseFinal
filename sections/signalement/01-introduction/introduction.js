document.addEventListener('DOMContentLoaded',()=>{
  const root=document.getElementById('signalement-introduction');
  if(!root)return;
  const items=root.querySelectorAll('[data-reveal],[data-step]');
  if(!('IntersectionObserver' in window))return items.forEach((item)=>item.classList.add('is-visible'));
  const observer=new IntersectionObserver((entries)=>entries.forEach((entry)=>{
    if(entry.isIntersecting)entry.target.classList.add('is-visible');
  }),{threshold:.2});
  items.forEach((item)=>observer.observe(item));
});
