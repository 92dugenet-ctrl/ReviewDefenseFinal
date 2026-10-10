(() => {
  "use strict";

  const siteBase = location.pathname.startsWith("/ReviewDefenseFinal/") ? "/ReviewDefenseFinal" : "";
  const sitePath = path => siteBase && typeof path === "string" && path.startsWith("/") ? siteBase + path : path;

  // Connecteur éditorial ReviewDefense :
  // data/articles.json = registre éditorial ; content/articles/html = contenu ;
  // assets/articles = illustrations. Le site conserve son gabarit et sa mosaïque.
  const topics = [
    ["avis-fictifs","Avis fictifs","Repérez les signaux d’un avis potentiellement fictif."],
    ["avis-negatifs","Avis négatifs","Analysez les critiques et choisissez la bonne réponse."],
    ["repondre","Répondre aux avis","Rédigez des réponses utiles, claires et professionnelles."],
    ["google-reviews","Google Reviews","Comprenez les règles, signalements et recours Google."],
    ["score-suspicion","Score de suspicion","Évaluez les signaux sans confondre suspicion et preuve."],
    ["signaler","Signalement","Préparez un signalement documenté et pertinent."],
    ["reputation","E-réputation","Suivez et protégez la réputation de votre entreprise."],
    ["ia","IA et avis","Explorez les usages, limites et contrôles de l’intelligence artificielle."],
    ["crise","Crise réputationnelle","Organisez votre réponse face à une vague d’avis."],
    ["preuves","Preuves et dossiers","Conservez les éléments utiles de façon claire et chronologique."],
    ["multi-etablissements","Multi-établissements","Pilotez les avis et la réputation de plusieurs sites."],
    ["regles","Règles et limites","Maîtrisez les bonnes pratiques et les limites juridiques."],
    ["cas-concrets","Cas concrets","Découvrez des situations pratiques et les décisions possibles."]
  ].map(([id,title,description]) => ({id,title,description,count:0}));

  const categoryToTopic = {
    "Avis_fictifs":"avis-fictifs",
    "Avis_n_gatifs":"avis-negatifs",
    "R_pondre":"repondre",
    "Google_Reviews":"google-reviews",
    "Score_de_suspicion":"score-suspicion",
    "Signaler":"signaler",
    "R_putation":"reputation",
    "IA_et_avis":"ia",
    "Crise_r_putationnelle":"crise",
    "Preuves_dossiers":"preuves",
    "Multi-_tablissements":"multi-etablissements",
    "R_gles_limites":"regles",
    "Cas_concrets":"cas-concrets"
  };
  const types = {
    "Guide pratique":"Guide",
    "Analyse":"Analyse",
    "Cas concret":"Cas concret",
    "Cas client":"Cas concret",
    "Explication produit":"Explication produit"
  };
  const topicMap = Object.fromEntries(topics.map(topic => [topic.id, topic]));
  let articles = [];
  let articleMap = {};

  const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, char => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[char]));
  const labelForType = type => types[type] || type || "Guide";
  const articleHref = article => `article.html?article=${encodeURIComponent(article.id)}`;
  const card = (article, index) => {
    const topic = topicMap[article.topic] || topics[0];
    return `<a class="resource-content rd-motion-item" href="${articleHref(article)}" style="--rd-span:${index%5===0?2:1}"><span class="resources-eyebrow">${escapeHtml(labelForType(article.type))}</span><h3>${escapeHtml(article.title)}</h3><p>${escapeHtml(topic.title)}</p></a>`;
  };

  const renderTopics = () => {
    const root = document.querySelector("[data-topic-mosaic]");
    if (!root) return;
    const query = document.querySelector("[data-resource-search]")?.value.trim().toLocaleLowerCase("fr") || "";
    const visible = topics.filter(topic => !query || `${topic.title} ${topic.description}`.toLocaleLowerCase("fr").includes(query));
    root.innerHTML = visible.map((topic, index) => `<a class="resource-topic rd-motion-item" href="theme.html?theme=${encodeURIComponent(topic.id)}" aria-label="Explorer la catégorie ${escapeHtml(topic.title)}, ${topic.count} articles"><img class="rd-mosaic-visual" src="../../assets/mosaic/${topic.id}.svg" alt="" aria-hidden="true" loading="lazy"><span class="resource-topic__panel"><span class="resource-topic__number">${String(topics.indexOf(topic)+1).padStart(2,"0")}</span><h3>${escapeHtml(topic.title)}</h3><span class="resource-topic__meta">${topic.count} articles</span><p class="resource-topic__description">${escapeHtml(topic.description)}</p></span><span class="resource-topic__arrow" aria-hidden="true">→</span></a>`).join("");
    const empty = document.querySelector("[data-resource-empty]");
    if (empty) empty.hidden = visible.length > 0;
  };

  const renderContent = filter => {
    const root = document.querySelector("[data-content-mosaic]");
    if (!root) return;
    const query = document.querySelector("[data-resource-search]")?.value.trim().toLocaleLowerCase("fr") || "";
    const visible = articles.filter(article => {
      const topic = topicMap[article.topic] || topics[0];
      const formatOk = !filter || article.topic === filter || article.type === filter || labelForType(article.type).toLocaleLowerCase("fr") === filter.toLocaleLowerCase("fr");
      return formatOk && (!query || `${article.title} ${topic.title} ${article.intro || ""}`.toLocaleLowerCase("fr").includes(query));
    });
    root.innerHTML = visible.map(card).join("");
    const count = document.querySelector("[data-format-count]");
    if (count) count.textContent = String(visible.length);
  };

  const renderTheme = () => {
    const params = new URLSearchParams(location.search);
    const topic = topicMap[params.get("theme")] || topics[0];
    document.querySelector("[data-theme-title]")?.replaceChildren(document.createTextNode(topic.title));
    document.querySelector("[data-theme-description]")?.replaceChildren(document.createTextNode(topic.description));
    document.querySelector("[data-theme-count]")?.replaceChildren(document.createTextNode(String(articles.filter(article => article.topic === topic.id).length)));
    document.querySelector("[data-theme-kicker]")?.replaceChildren(document.createTextNode(`THÈME · ${topic.title.toLocaleUpperCase("fr")}`));
    renderContent(topic.id);
  };

  const markdownToHtml = source => {
    const escape = value => escapeHtml(value);
    const inline = value => escape(value)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`(.+?)`/g, "<code>$1</code>");
    const lines = source.replace(/\r/g, "").split("\n");
    const out = [];
    let paragraph = [];
    let list = false;
    const flush = () => { if (paragraph.length) { out.push("<p>" + inline(paragraph.join(" ")) + "</p>"); paragraph = []; } };
    const closeList = () => { if (list) { out.push("</ul>"); list = false; } };
    for (const raw of lines) {
      const line = raw.trim();
      if (!line) { flush(); closeList(); continue; }
      const heading = line.match(/^(#{1,4})\s+(.+)$/);
      if (heading) { flush(); closeList(); const level = Math.min(heading[1].length + 1, 6); out.push(`<h${level}>${inline(heading[2])}</h${level}>`); continue; }
      if (/^-\s+/.test(line)) { flush(); if (!list) { out.push("<ul>"); list = true; } out.push("<li>" + inline(line.replace(/^-\s+/, "")) + "</li>"); continue; }
      closeList();
      paragraph.push(line);
    }
    flush(); closeList();
    return out.join("\n");
  };

  const loadArticleBody = async article => {
    const body = document.querySelector("[data-article-body]");
    if (!body) return;
    try {
      if (article.html) {
        const response = await fetch(sitePath(article.html), {headers: {"Accept":"text/html"}});
        if (response.ok) {
          const parsed = new DOMParser().parseFromString(await response.text(), "text/html");
          const articleBody = parsed.querySelector(".article-body") || parsed.querySelector("article");
          if (articleBody) { body.innerHTML = articleBody.innerHTML; return; }
        }
      }
      if (article.markdown) {
        const response = await fetch(article.markdown, {headers: {"Accept":"text/markdown, text/plain"}});
        if (response.ok) {
          const markdown = (await response.text()).replace(/^# .+\n/, "").replace(/^\*\*.+?\*\*\n/m, "").replace(/^## SEO[\s\S]*?(?=^## )/m, "");
          body.innerHTML = markdownToHtml(markdown);
          return;
        }
      }
      throw new Error("Contenu d’article introuvable");
    } catch (error) {
      body.innerHTML = '<p class="resource-connector-error">Le contenu complet de cet article n’est pas encore disponible. Vérifiez les fichiers dans content/articles/html et content/articles/markdown.</p>';
    }
  };

  const renderArticle = () => {
    const params = new URLSearchParams(location.search);
    const article = articleMap[params.get("article")] || articles[0];
    if (!article) return;
    const topic = topicMap[article.topic] || topics[0];
    const set = (selector,value) => document.querySelector(selector)?.replaceChildren(document.createTextNode(value ?? ""));
    set("[data-article-kicker]",labelForType(article.type));
    set("[data-article-title]",article.title);
    set("[data-article-intro]",article.intro || article.meta_description || "");
    set("[data-article-theme]",topic.title);
    set("[data-article-time]",article.time || "6 min");
    set("[data-article-date]",article.date || "2026");
    const back = document.querySelector("[data-article-back]");
    if (back) back.href = `theme.html?theme=${encodeURIComponent(topic.id)}`;
    const visual = document.querySelector("[data-article-visual]");
    if (visual && article.illustration) {
      visual.innerHTML = `<img class="rd-article-illustration" src="${escapeHtml(sitePath(article.illustration))}" alt="Illustration — ${escapeHtml(article.title)}" loading="eager">`;
    }
    loadArticleBody(article);
    const related = document.querySelector("[data-related-grid]");
    if (related) related.innerHTML = articles.filter(item => item.topic === article.topic && item.id !== article.id).slice(0,3).map(card).join("");
    document.title = `${article.seo_title || article.title} — ReviewDefense`;
  };

  const init = async () => {
    // Le registre est la source de vérité ; aucun article n’est réécrit ici.
    try {
      const response = await fetch(sitePath("/content/articles/data/articles.json"), {cache:"no-cache"});
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const registry = await response.json();
      if (!Array.isArray(registry) || registry.length === 0) throw new Error("Registre éditorial vide");
      articles = registry.map(item => {
        const topic = categoryToTopic[item.category] || categoryToTopic[item.category_label] || "cas-concrets";
        const html = item.html || "";\n        const markdown = item.markdown || "";
        const illustration = item.illustration || "";
        return {
          id:String(item.id),
          sourceId:item.id,
          topic,
          type:item.type || "Guide",
          title:item.title || "Ressource ReviewDefense",
          intro:item.meta_description || "",
          html,
          illustration,
          seo_title:item.seo_title || "",
          meta_description:item.meta_description || "",
          slug:item.slug || "",
          url:item.url || "",
          time:"6 min",
          date:"2026"
        };
      });
      topics.forEach(topic => { topic.count = articles.filter(article => article.topic === topic.id).length; });
      articleMap = Object.fromEntries(articles.map(article => [article.id, article]));
    } catch (error) {
      // Si le registre n’a pas encore été déployé, on ne fabrique pas de faux articles.
      articles = [];
      articleMap = {};
      topics.forEach(topic => { topic.count = 0; });
      const roots = document.querySelectorAll("[data-topic-mosaic], [data-content-mosaic]");
      roots.forEach(root => root.innerHTML = '<p class="resource-connector-error">Le catalogue des articles n’est pas encore déployé. Le connecteur attend content/articles/data/articles.json et les fichiers associés.</p>');
    }

    const view = document.body.dataset.resourceView;
    if (view === "topics") { renderTopics(); document.querySelector("[data-resource-search]")?.addEventListener("input",renderTopics); }
    if (view === "theme") { renderTheme(); document.querySelector("[data-resource-search]")?.addEventListener("input",renderTheme); }
    if (view === "format") { const filter = document.body.dataset.formatFilter || ""; renderContent(filter); document.querySelector("[data-resource-search]")?.addEventListener("input",() => renderContent(filter)); }
    if (view === "article") renderArticle();
  };
  init();
})();