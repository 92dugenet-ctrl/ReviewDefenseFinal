# Audit initial — ReviewDefenseFinal

- Date : 2026-10-12
- Branche de référence : `main`
- Commit de référence : `3fd48b5dcc97e19caad58d0df468f271a0596a56`
- Nature : audit statique initial, lecture du dépôt GitHub ; aucun test navigateur ou déploiement exécuté.
- Périmètre prioritaire : parcours Ressources, registre et connecteur des 91 articles.

## 1. Inventaire vérifié

L'arbre GitHub récursif a été récupéré sans troncature. Il contient 801 entrées, dont 631 fichiers suivis.

Le registre `content/articles/registry.json` contient 91 entrées. Les contrôles automatiques sur les données et l'arborescence confirment :

- 91 identifiants uniques et 91 slugs uniques ;
- 91 sources HTML sous `content/articles/html/` ;
- 91 sources Markdown sous `content/articles/markdown/` ;
- 91 illustrations SVG sous `assets/articles/` ;
- 91 pages générées sous `ressources/<slug>/index.html` ;
- aucun fichier référencé manquant dans les champs `html_file`, `markdown_file`, `illustration_file` ou pour les pages générées ;
- les valeurs `url` et `page` suivent le motif attendu `/ressources/<slug>/`.

Le fichier `content/articles/data/articles.json` existe et possède le même SHA de blob que `content/articles/registry.json` dans l'état inspecté.

Ces résultats prouvent la présence et la cohérence des références du registre, mais pas encore le chargement des pages dans un navigateur ni l'intégrité éditoriale complète de chaque article.

## 2. Constat R-001 — Parcours mosaïque / connecteur à clarifier

**Priorité : élevée — à valider fonctionnellement**

La page `pages/ressources/index.html` contient une mosaïque de 13 liens statiques vers des pages thématiques telles que `avis-fictifs.html`, `avis-negatifs.html` et `cas-concrets.html`. Elle charge `scripts/main.js` et `scripts/motion.js`, mais pas `scripts/ressources.js` et ne contient pas les points d'injection `data-topic-mosaic`, `data-content-mosaic` ou `data-resource-search`.

Un autre parcours dynamique existe via `pages/ressources/theme.html`, `pages/ressources/article.html` et `scripts/ressources.js`. Les pages thématiques dynamiques utilisent le registre JSON et génèrent des liens vers `article.html?article=<id>`.

**Risque :** deux parcours éditoriaux coexistent et la mosaïque principale n'est pas directement reliée au parcours dynamique des 91 articles dans son HTML actuel. Il faut vérifier le comportement attendu avant de choisir entre rétablir le connecteur dynamique ou conserver les pages thématiques statiques comme parcours principal.

**Validation requise :** tester les 13 cartes dans le navigateur, les destinations directes, la recherche, les pages thématiques et l'ouverture d'un article depuis chaque chemin.

## 3. Constat R-002 — Chemin du fallback Markdown sur GitHub Pages

**Priorité : élevée — correction ciblée à préparer**

Dans `scripts/ressources.js`, le chargement du HTML utilise `fetch(sitePath(article.html))`, mais le fallback Markdown utilise `fetch(article.markdown)` sans appliquer `sitePath()`. Les chemins du registre commencent par `/content/...`.

Sur un déploiement GitHub Pages de projet servi sous `/ReviewDefenseFinal/`, si le chargement HTML échoue et que le fallback Markdown est utilisé, la requête Markdown risque de viser la racine du domaine au lieu du sous-chemin du projet.

**Correction envisagée :** appliquer la même adaptation de base au chemin Markdown, puis tester le chargement HTML normal et le fallback Markdown sur la racine locale et sous le chemin GitHub Pages. Aucun changement de code n'a été effectué dans cette étape.

## 4. Constat R-003 — Branches de travail existantes à examiner avant toute correction

Le dépôt contient déjà les branches suivantes, qui semblent liées aux problèmes de Ressources :

- `fix/resources-markdown-network-fallback`
- `fix/resources-invalid-article-route`
- `refactor/resources-index-connector`

Une inspection des fichiers sur ces branches montre que les deux premières utilisent `sitePath(article.markdown)` et que leurs pages Ressources contiennent les points d'injection du connecteur. Cela suggère que des travaux de correction existent déjà hors de `main`.

**Action requise avant une nouvelle correction :** comparer les commits et les diffs de ces branches avec `main`, puis décider s'il faut réutiliser une correction existante ou en produire une nouvelle. Ne pas fusionner automatiquement.

## 5. Automatisation de l'import éditorial

Le workflow `.github/workflows/import-resource-articles.yml` est prévu pour valider et importer 91 articles. Il contient des contrôles de présence des pages générées, des sources HTML et Markdown, des SVG, du registre et de l'index. Son déclenchement automatique sur push est limité à la branche `prepare/91-article-import` et aux changements du workflow ou du script ; il peut aussi être déclenché manuellement.

Le workflow dispose de la permission `contents: write` et pousse des changements sur la branche sélectionnée. Il faudra auditer séparément ses conditions de déclenchement, ses effets sur les fichiers générés et son interaction avec toute chaîne de publication. Aucun workflow n'a été lancé pendant cet audit.

## 6. Limites de cette étape

Non encore réalisés :

- tests navigateur Playwright sur toutes les pages ;
- validation HTTP réelle des routes et ressources publiées ;
- audit de sécurité des scripts, liens, formulaires et dépendances ;
- mesure Lighthouse et Core Web Vitals ;
- vérification du contenu complet et des illustrations de chacun des 91 articles ;
- comparaison exhaustive des branches de correction avec `main`.

## 7. Prochaine étape recommandée

Comparer les trois branches Ressources déjà présentes à `main`, puis exécuter un test ciblé du parcours mosaïque → thème → article et du fallback Markdown sous le sous-chemin GitHub Pages. Choisir ensuite une seule correction isolée, sans toucher aux sources éditoriales, aux illustrations ou à la branche `main`.
