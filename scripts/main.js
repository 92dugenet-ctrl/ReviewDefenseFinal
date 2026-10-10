// ReviewDefense — global public-site runtime.
(() => {
  const siteBase = location.pathname.startsWith("/ReviewDefenseFinal/") ? "/ReviewDefenseFinal" : "";
  const sitePath = (path) => siteBase && path.startsWith("/") && !path.startsWith(siteBase + "/") ? siteBase + path : path;

  const rewriteRootPaths = (root) => {
    root.querySelectorAll("[href^='/'], [src^='/']").forEach((element) => {
      for (const attribute of ["href", "src"]) {
        const value = element.getAttribute(attribute);
        if (value && value.startsWith("/") && !value.startsWith(siteBase + "/")) {
          element.setAttribute(attribute, sitePath(value));
        }
      }
    });
  };

  const loadText = async (url) => {
    const response = await fetch(sitePath(url), { credentials: "same-origin", cache: "no-store" });
    if (!response.ok) throw new Error(`ReviewDefense: ${response.status} ${url}`);
    return response.text();
  };

  const loadScript = (src) => new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = sitePath(src);
    script.async = false;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`ReviewDefense: impossible de charger ${src}`));
    document.body.appendChild(script);
  });

  const mount = async (selector, url) => {
    const target = document.querySelector(selector);
    if (!target || target.dataset.mounted === "true") return false;
    target.innerHTML = await loadText(url);
    rewriteRootPaths(target);
    target.dataset.mounted = "true";
    return true;
  };

  const init = async () => {
    try {
      const headerMounted = await mount("[data-global-header]", "/components/header/header.html?v=dropdown-glass-motion-20261010");
      const footerMounted = await mount("[data-global-footer]", "/components/footer/footer.html?v=footer-liquid-glass-reveal-20261010");
      if (headerMounted) await loadScript("/components/header/header.js");
      if (footerMounted) await loadScript("/components/footer/footer.js?v=footer-liquid-glass-reveal-20261010");
    } catch (error) {
      console.error(error);
    }
  };

  init();
})();
