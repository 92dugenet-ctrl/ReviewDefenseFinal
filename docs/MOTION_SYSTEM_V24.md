# ReviewDefense — Motion System V24

## Principe
Le mouvement sert la compréhension. Il ne doit jamais remplacer le contenu, ralentir la lecture ou transformer l'interface en démonstration permanente.

## Règles
- Apparition au viewport : opacity + translation légère.
- Groupes : stagger court de 70 ms par élément.
- Sections importantes : déplacement latéral ponctuel pour créer une profondeur éditoriale.
- Cartes : élévation très légère au survol.
- Mosaïque : halo localisé suivant le pointeur + illustration SVG discrète.
- Défilement : barre de progression de 2 px en haut de page.
- Parallaxe : uniquement sur les éléments explicitement marqués `data-parallax`.
- Entrée de page : transition très courte, sans écran de chargement.
- `prefers-reduced-motion` désactive les mouvements non essentiels.

## Mosaïque
Les SVG du dossier `assets/mosaic/` sont des placeholders vectoriels. Ils servent à valider les proportions, la densité visuelle et le rythme avant l'intégration de photographies ou d'illustrations finales.

## À éviter
- Animations en boucle sur le texte.
- Zooms importants.
- Déplacements de contenu qui rendent la lecture instable.
- Parallaxe sur toute la page.
- Même animation appliquée mécaniquement à toutes les sections.
