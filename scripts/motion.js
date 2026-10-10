/* ReviewDefense — scroll, reveal and micro-interaction runtime V24 */
(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const addMotionItems = () => {
    const selectors = [
      "main:not(.rd-home) > section",
      ".rd-home > #home-hero > .rd-hero-video__content",
      ".rd-home > #home-review-scan > .rd-home-scan__intro",
      ".rd-home > #home-questions > .rd-home-questions__heading",
      ".rd-home > #home-decision > .rd-decision-copy",
      "main > section > header",
      "main > section > .solution-introduction__copy",
      "main > section > .solution-introduction__visual",
      "main > section > .questions-layout > *",
      "main > section > .rd-how-copy",
      "main > section > .rd-how-object",
      "main > section > .rd-how-signal-field",
      "main > section > .rd-score-object",
      "main > section > .rd-decision-object",
      "main > section > .rd-about-object",
      "main > section > .rd-about-copy",
      "main > section > .rd-security-orbit",
      "main > section > .rd-security-content",
      "main > section > .rd-tariffs-card",
      "main > section > .rd-tariffs-copy",
      ".rd-home > .rd-home-conclusion",
      ".resources-intro__copy, .resources-intro__note, .resources-section-head, .resources-format-copy, .resources-format-nav",
      ".rd-home-premium > #home-method > .rd-home-about"
    ];
    document.querySelectorAll(selectors.join(",")).forEach((element, index) => {
      if (element.dataset.motionReady) return;
      element.dataset.motionReady = "true";
      element.classList.add("rd-motion-item");
      if (index % 5 === 1) element.dataset.motion = "left";
      if (index % 5 === 2) element.dataset.motion = "right";
    });
    document.querySelectorAll(".rd-questions__list, .rd-scan-signals, .rd-process__story, .rd-decision-board, .resources-topic-mosaic, .resources-content-mosaic, .resources-related-grid, .rd-signal-grid, .rd-card-grid, .rd-home-steps, .rd-home-feature-grid, .rd-home-values").forEach(group => group.classList.add("rd-motion-group"));
    document.querySelectorAll(".rd-motion-group > *").forEach(item => {
      if (!item.dataset.motionReady) {
        item.dataset.motionReady = "true";
        item.classList.add("rd-motion-item");
      }
    });
  };

  const reveal = () => {
    const items = document.querySelectorAll(".rd-motion-item");
    if (reduced || !("IntersectionObserver" in window)) {
      items.forEach(item => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    }, { threshold: .14, rootMargin: "0px 0px -8% 0px" });
    items.forEach(item => observer.observe(item));
  };

  const setupProgress = () => {
    const bar = document.createElement("div");
    bar.className = "rd-scroll-progress";
    document.body.appendChild(bar);
    let ticking = false;
    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
    update();
  };

  const setupHeaderState = () => {
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      document.body.classList.toggle("rd-header-scrolling", y > 12);
      document.body.classList.toggle("rd-scroll-up", y < lastY && y > 80);
      document.body.classList.toggle("rd-scroll-down", y > lastY && y > 80);
      lastY = y;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
  };

  const setupParallax = () => {
    if (reduced) return;
    const items = document.querySelectorAll("[data-parallax]");
    if (!items.length) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      items.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;
        const strength = Number(item.dataset.parallax || 0.08);
        const offset = (rect.top + rect.height / 2 - vh / 2) * -strength;
        item.style.setProperty("--rd-parallax-y", `${offset.toFixed(1)}px`);
      });
    };
    window.addEventListener("scroll", () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  };

  const setupPointerTiles = () => {
    if (reduced) return;
    document.querySelectorAll(".resource-topic, .resource-content").forEach(tile => {
      tile.addEventListener("pointermove", event => {
        const rect = tile.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        tile.style.setProperty("--rd-mx", `${x}%`);
        tile.style.setProperty("--rd-my", `${y}%`);
      });
    });
  };

  const setupMagnetic = () => {
    if (reduced) return;
    document.querySelectorAll(".rd-button, .rd-magnetic").forEach(button => {
      button.addEventListener("pointermove", event => {
        const rect = button.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - .5) * 5;
        const y = ((event.clientY - rect.top) / rect.height - .5) * 5;
        button.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      });
      button.addEventListener("pointerleave", () => { button.style.transform = ""; });
    });
  };

  const boot = () => {
    document.documentElement.classList.add("rd-motion-enabled");
    document.body.classList.add("rd-page-enter");
    addMotionItems();
    reveal();
    setupProgress();
    setupHeaderState();
    setupParallax();
    setupPointerTiles();
    setupMagnetic();
    window.setTimeout(() => document.body.classList.remove("rd-page-enter"), 750);
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
})();