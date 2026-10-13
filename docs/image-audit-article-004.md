# Image audit — Article 004

Date checked: 2026-10-13. Source-level inspection of `main`; browser rendering and deployed loading are (N/A).

## Article
- ID: 004
- Title: Comment distinguer un avis très enthousiaste d’un avis réellement fictif ?
- Registry: `content/articles/data/articles.json`
- HTML: `content/articles/html/004-comment-distinguer-un-avis-tr-s-enthousiaste-d-un-avis-r-ellement-fictif.html`
- Illustration: `assets/articles/004-comment-distinguer-un-avis-tr-s-enthousiaste-d-un-avis-r-ellement-fictif.svg`

## Findings
- The registry path and HTML hero image source point to the same local SVG; the SVG exists on `main`.
- The HTML image declares 1140 × 760 dimensions, an `alt` value, and eager loading.
- The SVG is a self-contained 1140 × 760 vector with `role="img"` and `aria-labelledby`; its composition shows a review/document card, a gauge-like indicator, and a magnifying glass. The green/teal palette is consistent and the concept fits the article.
- The SVG description is generic and does not describe the visible composition. This is a modest accessibility improvement opportunity; no change made.
- The HTML `img` includes `viewBox`, which does not control rendering on an HTML image element. No HTML change made.
- Browser rendering, responsive crop, contrast at display size, and deployed loading are (N/A).

## Free image candidate reviewed
- Candidate: “A person holding a cell phone in front of a laptop”, Michael Lima.
- Source: https://unsplash.com/photos/a-person-holding-a-cell-phone-in-front-of-a-laptop-kRv6EgQ45IE
- The specific page labels it free to use under the Unsplash License. Official terms: https://unsplash.com/license
- Attribution is not required under the Unsplash License, but is appreciated.
- Review of any identifiable-person, trademark, or property-release considerations: (N/A).
- Decision: do not integrate. The candidate is a generic phone/laptop scene, while the existing SVG is more specific to review analysis and better preserves the article illustration system.

## Recommendation and preservation
Keep the SVG. If approved later, improve only its `<desc>` to describe the review card, indicator, and magnifier, preserving appearance and dimensions. External image integrated: no. Article HTML/Markdown, registry, existing illustration, shared header/footer, and import workflow modified: no.
