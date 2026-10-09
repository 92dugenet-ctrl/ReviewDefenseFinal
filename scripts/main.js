// ReviewDefense — global public-site runtime.
(() => {
  const loadText = async (url) => {
    const response = await fetch(url, { credentials: "same-origin" });
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
    target.dataset.mounted = "true";
    return true;
  };

  const init = async () => {
    try {
      const headerMounted = await mount("[data-global-header]", "/components/header/header.html");
      const footerMounted = await mount("[data-global-footer]", "/components/footer/footer.html");
      if (headerMounted) await loadScript("/components/header/header.js");
      if (footerMounted) await loadScript("/components/footer/footer.js");
    } catch (error) {
      console.error(error);
    }
  };

  init();
})();