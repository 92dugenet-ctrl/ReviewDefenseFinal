// ReviewDefense — Global Header
(() => {
  const header = document.querySelector("[data-header]");
  const mobileToggle = document.querySelector("[data-mobile-toggle]");
  const mobilePanel = document.querySelector("[data-mobile-panel]");
  if (!header) return;

  const updateScrollState = () => header.classList.toggle("is-scrolled", window.scrollY > 16);
  updateScrollState();
  window.addEventListener("scroll", updateScrollState, { passive: true });

  if (mobileToggle && mobilePanel) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = mobilePanel.classList.toggle("is-open");
      mobilePanel.setAttribute("aria-hidden", String(!isOpen));
      mobileToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("rd-mobile-menu-open", isOpen);
    });
  }
})();
