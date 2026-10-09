/* ReviewDefense — Intelligence explanation tabs */
(() => {
  const init = () => {
    const root = document.querySelector("#intelligence-explanation");
    if (!root || root.dataset.explanationReady === "true") return;

    const tabs = Array.from(root.querySelectorAll("[data-intelligence-explanation]"));
    const panels = Array.from(root.querySelectorAll("[data-intelligence-panel]"));
    if (!tabs.length || !panels.length) return;

    const activate = (selected) => {
      const key = selected.dataset.intelligenceExplanation;
      tabs.forEach((tab) => {
        const active = tab === selected;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", String(active));
        tab.tabIndex = active ? 0 : -1;
      });
      panels.forEach((panel) => {
        panel.hidden = panel.dataset.intelligencePanel !== key;
      });
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activate(tab));
      tab.addEventListener("keydown", (event) => {
        let next = index;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % tabs.length;
        else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = tabs.length - 1;
        else return;
        event.preventDefault();
        tabs[next].focus();
        activate(tabs[next]);
      });
    });

    activate(tabs.find((tab) => tab.getAttribute("aria-selected") === "true") || tabs[0]);
    root.dataset.explanationReady = "true";
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
