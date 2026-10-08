(() => {
  const hero=document.querySelector("#home-hero");
  if(!hero)return;
  const media=hero.querySelector(".rd-hero-video__media");
  if(!media)return;
  hero.addEventListener("pointermove",event=>{
    const rect=hero.getBoundingClientRect();
    const x=(event.clientX-rect.left)/rect.width-.5;
    const y=(event.clientY-rect.top)/rect.height-.5;
    media.style.transform=`translate3d(${(x*10).toFixed(1)}px,${(y*10).toFixed(1)}px,0)`;
  });
  hero.addEventListener("pointerleave",()=>{media.style.transform="";});
})();