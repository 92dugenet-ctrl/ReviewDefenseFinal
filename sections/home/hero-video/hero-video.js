(() => {
  const hero = document.querySelector("#home-hero");
  if (!hero) return;
  const media = hero.querySelector(".rd-hero-video__media");
  const video = hero.querySelector("video");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (reducedMotion) {
    if (video) video.pause();
    return;
  }
  if (!media || !finePointer) return;
  hero.addEventListener("pointermove", event => {
    if (event.pointerType !== "mouse") return;
    const rect = hero.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    media.style.transform = `translate3d(${(x * 6).toFixed(1)}px, ${(y * 6).toFixed(1)}px, 0)`;
  });
  hero.addEventListener("pointerleave", () => { media.style.transform = ""; });
})();