// ReviewDefense — Global Header
(() => {
  const header = document.querySelector("[data-header]");
  if (!header) return;

  const mobileToggle = header.querySelector("[data-mobile-toggle]");
  const mobilePanel = header.querySelector("[data-mobile-panel]");
  const dropdowns = [...header.querySelectorAll("[data-dropdown]")];

  const updateScrollState = () => header.classList.toggle("is-scrolled", window.scrollY > 16);
  updateScrollState();
  window.addEventListener("scroll", updateScrollState, { passive: true });

  const closeDropdowns = (except = null) => {
    dropdowns.forEach((group) => {
      if (group === except) return;
      group.classList.remove("is-open");
      group.querySelector(".rd-nav-trigger")?.setAttribute("aria-expanded", "false");
    });
  };

  dropdowns.forEach((group) => {
    const trigger = group.querySelector(".rd-nav-trigger");
    if (!trigger) return;
    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      const willOpen = !group.classList.contains("is-open");
      closeDropdowns(group);
      group.classList.toggle("is-open", willOpen);
      trigger.setAttribute("aria-expanded", String(willOpen));
    });
    group.querySelectorAll(".rd-nav-dropdown a").forEach((link) => {
      link.addEventListener("click", () => closeDropdowns());
    });
  });

  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) closeDropdowns();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDropdowns();
      mobilePanel?.classList.remove("is-open");
      mobilePanel?.setAttribute("aria-hidden", "true");
      mobileToggle?.setAttribute("aria-expanded", "false");
      document.body.classList.remove("rd-mobile-menu-open");
    }
  });

  if (mobileToggle && mobilePanel) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = mobilePanel.classList.toggle("is-open");
      mobilePanel.setAttribute("aria-hidden", String(!isOpen));
      mobileToggle.setAttribute("aria-expanded", String(isOpen));
      mobileToggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
      document.body.classList.toggle("rd-mobile-menu-open", isOpen);
    });
    mobilePanel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobilePanel.classList.remove("is-open");
        mobilePanel.setAttribute("aria-hidden", "true");
        mobileToggle.setAttribute("aria-expanded", "false");
        mobileToggle.setAttribute("aria-label", "Ouvrir le menu");
        document.body.classList.remove("rd-mobile-menu-open");
      });
    });
  }
})();
