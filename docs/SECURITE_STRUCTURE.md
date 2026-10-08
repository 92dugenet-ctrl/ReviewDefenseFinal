# Sécurité — structure V15

La page Sécurité utilise un langage d'interaction distinct des pages narratives verticales.

## Concept

Le système est présenté comme une **orbite de confiance**.
Un noyau central représente le principe actif et six principes gravitent autour :

1. Données
2. Accès
3. Analyse
4. Validation
5. Action
6. Traçabilité

Le changement de principe se fait par rotation de l'orbite, au clic, au geste horizontal
ou à la molette sur la zone interactive. Il n'y a pas de parcours de révélation verticale
pour les six principes.

## Fichiers

- `pages/securite.html`
- `styles/securite-structure.css`
- `scripts/securite.js`
- `sections/securite/01-orbite/`
- `sections/securite/02-principes/`
- `sections/securite/03-conclusion/`

Les anciens modules de sections verticales de Sécurité ont été supprimés afin d'éviter
les restes inutilisés.

## Interaction

- clic sur les six commandes numérotées ;
- glissement horizontal sur l'orbite ;
- molette sur l'orbite ;
- rotation CSS du système ;
- principe actif mis en avant ;
- texte central synchronisé ;
- prise en charge de `prefers-reduced-motion`.

## Positionnement

La page évite les promesses de sécurité absolue ou de certification non démontrée.
Elle présente des principes de conception : minimisation, explicabilité, validation humaine
et traçabilité.
