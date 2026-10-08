(() => {
  const topics = [
    ["avis-fictifs","Avis fictifs et suspects","Identifier les signaux qui méritent un examen.",8],
    ["avis-negatifs","Avis négatifs","Distinguer insatisfaction réelle et situation à examiner.",10],
    ["repondre","Répondre aux avis","Construire une réponse adaptée au contexte.",9],
    ["signaler","Signaler un avis","Préparer une action lorsque les éléments le justifient.",7],
    ["score-suspicion","Comprendre le score de suspicion","Lire un niveau de suspicion sans le confondre avec une preuve.",6],
    ["google-reviews","Google Reviews","Comprendre les règles et les situations courantes.",8],
    ["reputation","Réputation et tendances","Suivre les évolutions importantes dans le temps.",5],
    ["crise","Gestion de crise réputationnelle","Structurer les décisions lorsque plusieurs avis arrivent.",4],
    ["preuves","Preuves et documentation","Conserver les éléments utiles et leur contexte.",5],
    ["multi-etablissements","Gestion multi-établissements","Comparer et suivre plusieurs établissements.",4],
    ["regles","Règles, limites et bonnes pratiques","Comprendre ce qui peut être fait et ce qui doit être vérifié.",7],
    ["cas-concrets","Cas clients / situations réelles","Voir comment une situation peut conduire à plusieurs actions.",6],
    ["methodes","Méthodes d’analyse","Comprendre les méthodes, signaux et explications du système.",5]
  ].map(([id,title,description,count]) => ({id,title,description,count}));

  const types = {guide:"Guide",analysis:"Analyse",case:"Cas client",product:"Explication produit"};
  const articles = topics.flatMap((topic, topicIndex) => [
    {id:`${topic.id}-01`,topic:topic.id,type:topicIndex%4===0?"guide":topicIndex%4===1?"analysis":"product",title:`${topic.title} : les premiers éléments à examiner`,intro:topic.description,time:"5 min",date:"2026"},
    {id:`${topic.id}-02`,topic:topic.id,type:topicIndex%3===0?"case":"guide",title:`Que faire lorsque la situation demande une décision ?`,intro:"Une méthode simple pour passer de l'observation à une action adaptée.",time:"6 min",date:"2026"}
  ]);
  const topicMap = Object.fromEntries(topics.map(topic => [topic.id, topic]));
  const articleMap = Object.fromEntries(articles.map(article => [article.id, article]));

  const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[char]));

  const card = (article, index) => {
    const topic = topicMap[article.topic];
    return `<a class="resource-content rd-motion-item" href="article.html?article=${encodeURIComponent(article.id)}" style="--rd-span:${index%5===0?2:1}"><span class="resources-eyebrow">${escapeHtml(types[article.type])}</span><h3>${escapeHtml(article.title)}</h3><p>${escapeHtml(topic.title)}</p></a>`;
  };

  const renderTopics = () => {
    const root = document.querySelector("[data-topic-mosaic]");
    if (!root) return;
    const query = document.querySelector("[data-resource-search]")?.value.trim().toLowerCase() || "";
    const visible = topics.filter(topic => !query || `${topic.title} ${topic.description}`.toLowerCase().includes(query));
    root.innerHTML = visible.map(topic => `<a class="resource-topic" href="theme.html?theme=${encodeURIComponent(topic.id)}"><img class="rd-mosaic-visual" src="../../assets/mosaic/${topic.id}.svg" alt="" aria-hidden="true"><span class="resources-eyebrow">${topic.count} ressources</span><h3>${escapeHtml(topic.title)}</h3><p>${escapeHtml(topic.description)}</p></a>`).join("");
  };

  const renderContent = filter => {
    const root = document.querySelector("[data-content-mosaic]");
    if (!root) return;
    const query = document.querySelector("[data-resource-search]")?.value.trim().toLowerCase() || "";
    const visible = articles.filter(article => {
      const topic = topicMap[article.topic];
      const formatOk = !filter || article.type === filter || (filter === "analysis" && article.type === "analysis");
      return formatOk && (!query || `${article.title} ${topic.title}`.toLowerCase().includes(query));
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
    document.querySelector("[data-theme-count]")?.replaceChildren(document.createTextNode(String(articles.filter(a => a.topic === topic.id).length)));
    document.querySelector("[data-theme-kicker]")?.replaceChildren(document.createTextNode(`THÈME · ${topic.title.toUpperCase()}`));
    renderContent(topic.id);
  };

  const renderArticle = () => {
    const params = new URLSearchParams(location.search);
    const article = articleMap[params.get("article")] || articles[0];
    const topic = topicMap[article.topic];
    const set = (selector,value) => document.querySelector(selector)?.replaceChildren(document.createTextNode(value));
    set("[data-article-kicker]",types[article.type]); set("[data-article-title]",article.title);
    set("[data-article-intro]",article.intro); set("[data-article-theme]",topic.title);
    set("[data-article-time]",article.time); set("[data-article-date]",article.date);
    const back=document.querySelector("[data-article-back]"); if(back) back.href=`theme.html?theme=${encodeURIComponent(topic.id)}`;
    const body=document.querySelector("[data-article-body]");
    if(body) body.innerHTML=[["Le point de départ",article.intro],["Ce qu'il faut observer","Commencer par les faits disponibles, le contexte, les signaux inhabituels et ce qui manque avant de conclure."],["Comment décider","Un signal isolé ne suffit pas. La recommandation doit rester explicable et proportionnée."],["La suite","Répondre, examiner, signaler ou ne rien faire : l'action découle de la situation et reste validée par l'utilisateur."]].map(([title,text],i)=>`<section class="resource-article-block"><span>0${i+1}</span><div><h2>${escapeHtml(title)}</h2><p>${escapeHtml(text)}</p></div></section>`).join("");
    const related=document.querySelector("[data-related-grid]");
    if(related) related.innerHTML=articles.filter(a=>a.topic===article.topic&&a.id!==article.id).slice(0,3).map(card).join("");
  };

  const init=()=>{
    const view=document.body.dataset.resourceView;
    if(view==="topics"){renderTopics();document.querySelector("[data-resource-search]")?.addEventListener("input",renderTopics);}
    if(view==="theme"){renderTheme();document.querySelector("[data-resource-search]")?.addEventListener("input",renderTheme);}
    if(view==="format"){const filter=document.body.dataset.formatFilter||"";renderContent(filter);document.querySelector("[data-resource-search]")?.addEventListener("input",()=>renderContent(filter));}
    if(view==="article") renderArticle();
  };
  init();
})();