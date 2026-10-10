(() => {
  const hero = document.querySelector("#home-hero");
  const phrase = hero?.querySelector("[data-hero-phrase]");
  if (!hero || !phrase) return;

  const phrases = [
    "Tu construis.",
    "Tu répares.",
    "Tu conseilles.",
    "Tu accueilles.",
    "Tu crées.",
    "Tu entreprends."
  ];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) return;

  let index = 0;
  let intervalId;

  const showNextPhrase = () => {
    index = (index + 1) % phrases.length;
    phrase.style.animation = "none";
    phrase.textContent = phrases[index];
    void phrase.offsetWidth;
    phrase.style.animation = "";
  };

  const start = () => {
    if (intervalId || document.hidden) return;
    intervalId = window.setInterval(showNextPhrase, 2600);
  };

  const stop = () => {
    if (!intervalId) return;
    window.clearInterval(intervalId);
    intervalId = undefined;
  };

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });

  start();
})();