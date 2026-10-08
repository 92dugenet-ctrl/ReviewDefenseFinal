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

  const menus = {
    product: "/components/header/menus/product-menu.html",
    solutions: "/components/header/menus/solutions-menu.html",
    intelligence: "/components/header/menus/intelligence-menu.html"
  };
  const container = header.querySelector("[data-header-menus]");
  const triggers = header.querySelectorAll("[data-menu]");
  if (!container) return;

  const closeMenus = () => {
    container.classList.remove("is-open");
    container.innerHTML = "";
    triggers.forEach((trigger) => trigger.setAttribute("aria-expanded", "false"));
  };

  triggers.forEach((trigger) => trigger.addEventListener("click", async () => {
    const key = trigger.dataset.menu;
    if (!menus[key]) return;
    if (trigger.getAttribute("aria-expanded") === "true") return closeMenus();
    try {
      const response = await fetch(menus[key], { credentials: "same-origin" });
      if (!response.ok) throw new Error(response.status);
      container.innerHTML = await response.text();
      container.classList.add("is-open");
      triggers.forEach((item) => item.setAttribute("aria-expanded", String(item === trigger)));
    } catch (error) {
      console.error(error);
    }
  }));

  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) closeMenus();
  });
})();