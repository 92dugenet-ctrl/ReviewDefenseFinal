// ReviewDefense — Global Footer
(() => {
  document.querySelectorAll("[data-footer-group]").forEach((group) => {
    const button = group.querySelector(".rd-footer__group-title");
    if (!button) return;
    button.addEventListener("click", () => {
      const open = group.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(open));
    });
  });

  const footer = document.querySelector(".rd-footer");
  if (!footer) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    footer.classList.add("is-visible");
    return;
  }

  // Enable the entrance transition only once the observer is ready.
  footer.classList.add("rd-footer--motion-ready");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      footer.classList.toggle("is-visible", entry.isIntersecting);
    });
  }, {
    threshold: 0.06,
    rootMargin: "0px 0px -5% 0px"
  });

  observer.observe(footer);
})();