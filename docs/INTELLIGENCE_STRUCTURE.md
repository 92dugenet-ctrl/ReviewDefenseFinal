# ReviewDefense — Intelligence

## Purpose

`pages/intelligence.html` explains the intelligence layer behind the ReviewDefense analysis without turning the page into a technical specification.

Narrative:

1. L'intelligence derrière chaque avis.
2. Le système ne regarde pas qu’une phrase.
3. Plusieurs sources. Une même compréhension.
4. Un signal n'est pas une conclusion.
5. Le raisonnement devient lisible.
6. Une intelligence qui explique ce qu'elle voit.
7. La bonne action dépend du contexte.
8. Le système recommande. Vous décidez.
9. Le chemin de l'intelligence, au même endroit.
10. Une IA qui explique ce qu'elle voit.

## Product principles

- The AI is presented as an analysis and recommendation system, not an oracle.
- Signals are observations, not proof.
- Context changes the appropriate action.
- Explanations expose observation, interpretation and limitation.
- Human validation remains explicit.
- Motion is used to reveal relationships and sequence, never as decoration.
- The page follows the editorial/product storytelling principles used by premium technology product pages, while retaining ReviewDefense's own identity.

## Technical structure

`pages/intelligence.html` is the assembly point.

Each section is isolated under:

- `sections/intelligence/01-introduction/`
- `sections/intelligence/02-layers/`
- `sections/intelligence/03-sources/`
- `sections/intelligence/04-signals/`
- `sections/intelligence/05-reasoning/`
- `sections/intelligence/06-explanation/`
- `sections/intelligence/07-context/`
- `sections/intelligence/08-human-loop/`
- `sections/intelligence/09-walkthrough/`
- `sections/intelligence/10-conclusion/`

Each section contains HTML, CSS and JS.

## Relationship with existing pages

- `accueil.html`: why ReviewDefense exists.
- `solution.html`: how the solution works.
- `analyse.html`: how an individual review is analyzed.
- `intelligence.html`: how the intelligence behind the analysis works.
- `reponse.html`: response generation and editing.
- `signalement.html`: action/reporting flow.

## Content boundary

This page is a product/UX explanation, not a technical claim about a finalized model implementation. Concrete model architecture, thresholds, data sources and production scoring rules belong in the internal product/developer documentation when they are finalized.
