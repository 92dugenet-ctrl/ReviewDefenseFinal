# ReviewDefense — Analyse

## Purpose

`pages/analyse.html` is the first product-demonstration page after Accueil and Solution.

Narrative:

1. Un avis n'est que le début
2. L'avis seul ne suffit pas
3. Le moteur observe
4. Plusieurs signaux. Une analyse.
5. Le score
6. Pourquoi ce score ?
7. Le système recommande. Vous décidez.
8. Une analyse. Plusieurs réponses.
9. Walkthrough ReviewDefense
10. Analyser avant d'agir

## Design principles

- One idea per section.
- One primary visual system per section.
- Motion explains the analysis; it is not decoration.
- The page never presents suspicion as proof.
- The same review is reused as the narrative anchor.
- The score is introduced only after signals are explained.
- Human validation remains explicit.
- No image assets are required for this structural version.
- The product interface appears only after the reasoning has been established.

## Technical structure

`pages/analyse.html` is the assembly point.

Each section has its own directory:

- `sections/analyse/01-introduction/`
- `sections/analyse/02-context/`
- `sections/analyse/03-observation/`
- `sections/analyse/04-signals/`
- `sections/analyse/05-score/`
- `sections/analyse/06-explanation/`
- `sections/analyse/07-decision/`
- `sections/analyse/08-actions/`
- `sections/analyse/09-walkthrough/`
- `sections/analyse/10-conclusion/`

Each directory contains its HTML contract, CSS and JS.

## Content model

The page distinguishes:

`Avis -> Contenu / Contexte / Signaux -> Analyse -> Score -> Explication -> Recommandation -> Décision`

An individual signal is never presented as sufficient proof of fraud.

## Relationship with other pages

- `accueil.html`: why ReviewDefense exists.
- `solution.html`: how the solution works.
- `analyse.html`: how an individual review is understood.
- `intelligence.html`: the deeper AI/intelligence layer.
- `reponse.html`: response generation and editing.
- `signalement.html`: action/reporting flow.
