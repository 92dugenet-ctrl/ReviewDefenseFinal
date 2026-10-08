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
})();