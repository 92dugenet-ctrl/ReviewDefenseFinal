/* ReviewDefense pricing page interactions. Scoped to the public pricing page. */
(() => {
  const init = () => {
    const page = document.querySelector(".rd-tarifs");
    if (!page || page.dataset.tarifsReady === "true") return;
    page.dataset.tarifsReady = "true";

    page.querySelectorAll(".tarifs-rail").forEach((rail) => {
      rail.addEventListener("wheel", (event) => {
        if (rail.scrollWidth <= rail.clientWidth) return;
        const mostlyVertical = Math.abs(event.deltaY) > Math.abs(event.deltaX);
        if (!mostlyVertical) return;
        event.preventDefault();
        rail.scrollLeft += event.deltaY;
      }, { passive: false });

      let pointerStart = null;
      let scrollStart = 0;
      rail.addEventListener("pointerdown", (event) => {
        if (event.pointerType === "touch" || event.button !== 0) return;
        pointerStart = event.clientX;
        scrollStart = rail.scrollLeft;
        rail.dataset.dragging = "false";
      });
      rail.addEventListener("pointermove", (event) => {
        if (pointerStart === null) return;
        const delta = event.clientX - pointerStart;
        if (Math.abs(delta) > 5) rail.dataset.dragging = "true";
        if (rail.dataset.dragging === "true") rail.scrollLeft = scrollStart - delta;
      });
      const stopDrag = () => {
        pointerStart = null;
        window.setTimeout(() => { delete rail.dataset.dragging; }, 0);
      };
      rail.addEventListener("pointerup", stopDrag);
      rail.addEventListener("pointercancel", stopDrag);
      rail.addEventListener("pointerleave", stopDrag);
      rail.addEventListener("click", (event) => {
        if (rail.dataset.dragging === "true") {
          event.preventDefault();
          event.stopPropagation();
        }
      }, true);
    });

    if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const sections = page.querySelectorAll(".tarifs-section:not(.tarifs-hero)");
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });
      sections.forEach((section) => {
        section.classList.add("tarifs-reveal");
        observer.observe(section);
      });
    }
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
