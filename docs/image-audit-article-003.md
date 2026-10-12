# Image audit — Article 003

Date checked: 2026-10-13  
Repository ref inspected: `main`  
Scope: GitHub source-level inspection only; browser rendering and deployed-page loading are (N/A).

## Article
- ID: 003
- Title: Une série d’avis 5 étoiles publiés en quelques heures est-elle forcément suspecte ?
- Registry: `content/articles/data/articles.json`
- HTML: `content/articles/html/003-une-s-rie-d-avis-5-toiles-publi-s-en-quelques-heures-est-elle-forc-ment-suspecte.html`
- Illustration: `assets/articles/003-une-s-rie-d-avis-5-toiles-publi-s-en-quelques-heures-est-elle-forc-ment-suspecte.svg`

## Findings
- The registry contains an illustration path for this article, and the referenced SVG was fetched successfully from `main`.
- The HTML hero image `src` matches that local SVG path; it has explicit width/height and an `alt` value.
- The SVG is a 1140 × 760 vector composition with a horizontal sequence of five timeline markers and repeated review/document cards. The visual is directly relevant to review activity clustered over a short time period.
- The SVG includes a `<title>` and `<desc>`, but the description repeats the article title instead of describing the timeline composition. This is a modest accessibility improvement opportunity, not a broken-image defect.
- The HTML `<img>` has a `viewBox` attribute, which does not control an HTML image's rendering. Do not change the article HTML as part of this audit-only step.
- Browser rendering, mobile crop, contrast at actual display size, and deployed loading status are (N/A).

## Free-to-use candidate reviewed
- Candidate: “Smartphone user profile with five stars”
- Creator: YuguDesign
- Source page: https://unsplash.com/illustrations/smartphone-user-profile-with-five-stars-MM-pPH8ljlA
- License stated on the specific page: Unsplash License; the page labels the illustration free to use.
- Official license terms: https://unsplash.com/license
- Attribution: not required by the Unsplash License, but appreciated.
- Third-party people/logos/property concerns: (N/A) from the available page information; recheck if the asset is ever selected.
- Decision: do not integrate in this article during this run. The existing timeline SVG communicates the article's key idea more specifically, and the candidate would be largely redundant. Avoid adding stock media solely to increase image count.

## Recommendation
Keep the existing SVG. If an accessibility-focused change is approved later, revise only the SVG `<desc>` to explain the timeline of multiple review posts, while preserving its appearance, path, title, dimensions, and role. Verify the visual in a browser before considering any design changes.

## Scope and preservation
- External image integrated: no.
- Article Markdown/HTML or registry modified: no.
- Existing illustration modified or deleted: no.
- Shared header/footer and import workflow modified: no.
