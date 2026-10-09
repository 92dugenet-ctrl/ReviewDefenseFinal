// ReviewDefense — shared header, accessible mega-menus and mobile navigation.
(() => {
  const header = document.querySelector("[data-header]");
  if (!header || header.dataset.initialized === "true") return;
  header.dataset.initialized = "true";

  const menuItems = [...header.querySelectorAll(".rd-header__item")];
  const menuToggles = [...header.querySelectorAll("[data-menu-toggle]")];
  const mobileToggle = header.querySelector("[data-mobile-toggle]");
  const mobilePanel = header.querySelector("[data-mobile-panel]");

  const closeMenus = (except = null) => {
    menuItems.forEach((item) => {
      if (item === except) return;
      const menu = item.querySelector("[data-mega-menu]");
      const toggle = item.querySelector("[data-menu-toggle]");
      if (menu) menu.classList.remove("is-open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    });
  };

  menuItems.forEach((item) => {
    const menu = item.querySelector("[data-mega-menu]");
    const toggle = item.querySelector("[data-menu-toggle]");
    if (!menu || !toggle) return;

    item.addEventListener("mouseenter", () => closeMenus(item));
    item.addEventListener("mouseleave", () => {
      if (!item.contains(document.activeElement)) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
    toggle.addEventListener("click", (event) => {
      event.preventDefault();
      const shouldOpen = !menu.classList.contains("is-open");
      closeMenus(item);
      menu.classList.toggle("is-open", shouldOpen);
      toggle.setAttribute("aria-expanded", String(shouldOpen));
    });
    item.addEventListener("focusout", (event) => {
      if (!item.contains(event.relatedTarget) && !item.matches(":hover")) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  document.addEventListener("pointerdown", (event) => {
    if (!header.contains(event.target)) closeMenus();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenus();
      if (mobilePanel && mobilePanel.classList.contains("is-open")) {
        mobilePanel.classList.remove("is-open");
        mobilePanel.setAttribute("aria-hidden", "true");
        if (mobileToggle) mobileToggle.setAttribute("aria-expanded", "false");
      }
    }
  });

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