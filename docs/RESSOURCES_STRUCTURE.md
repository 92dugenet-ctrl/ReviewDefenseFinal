# ReviewDefense — V17 Ressources

## Intention

Les Ressources ne sont pas conçues comme un blog classique. Elles forment une cartographie des problèmes que ReviewDefense aide à comprendre et à traiter.

Le principe visuel est une mosaïque de thèmes dont la taille représente la richesse du contenu disponible. Plus un thème possède de ressources, plus sa tuile prend de place.

## Niveaux

### Niveau 1 — Mosaïque des situations

La page `pages/ressources/index.html` présente les grands thèmes :

- Avis fictifs
- Avis négatifs
- Répondre
- Google Reviews
- Score de suspicion
- Signaler
- Réputation
- IA et avis
- Crise réputationnelle
- Preuves & dossiers
- Multi-établissements
- Règles & limites
- Cas concrets

Chaque tuile affiche son volume de ressources et mène vers la page du thème.

### Niveau 2 — Mosaïque d'un thème

La page `pages/ressources/theme.html?theme=<id>` affiche uniquement les contenus du thème choisi.

Les contenus mélangent plusieurs formats : guide, analyse, cas client et explication produit. Les formats ne constituent donc pas des univers éditoriaux séparés.

### Niveau 3 — Article

La page `pages/ressources/article.html?article=<id>` fournit une structure éditoriale commune. Les blocs changent selon le type de contenu.

Formats prévus :

- `guide` : problème, signaux, interprétation, action.
- `analysis` : question, observation, analyse, contre-exemple, conclusion.
- `case` : contexte, analyse, décision, résultat.
- `product` : point de départ, signaux, recommandation, validation.

## Routes historiques conservées

- `guides.html` : vue filtrée sur le format guide.
- `cas-clients.html` : vue filtrée sur le format cas client.
- `blog.html` : vue filtrée sur les analyses et articles.

Ces routes sont conservées pour la navigation existante, mais ne créent pas de bibliothèques concurrentes.

## Données de démonstration

`../../scripts/ressources.js` contient un jeu de contenus de démonstration suffisamment dense pour visualiser la logique de taille des tuiles. Ces contenus doivent être remplacés par les contenus éditoriaux définitifs lorsque ceux-ci seront rédigés.

## Règles de conception

- Une tuile = une situation ou une ressource.
- La taille traduit la richesse, pas la priorité commerciale.
- Aucun dashboard géant.
- Aucun hero plein écran obligatoire.
- Les articles restent lisibles et éditoriaux.
- Les mini-interfaces servent à démontrer le produit, pas à décorer.
- L'IA recommande. L'utilisateur décide.
- La suspicion n'est jamais présentée comme une preuve.
