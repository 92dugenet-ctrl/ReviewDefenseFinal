# Image audit — Article 005

Date: 2026-10-13. Source-level inspection only; browser rendering and deployed loading: (N/A).

- Article: Les faux avis négatifs existent-ils vraiment et comment les identifier ?
- Registry: `content/articles/data/articles.json`
- HTML: `content/articles/html/005-les-faux-avis-n-gatifs-existent-ils-vraiment-et-comment-les-identifier.html`
- Illustration: `assets/articles/005-les-faux-avis-n-gatifs-existent-ils-vraiment-et-comment-les-identifier.svg`

## Findings
- Registry path and HTML image source match; the SVG exists on `main`.
- The 1140 × 760 SVG shows a review/document card, an orange gauge, a magnifier/alert mark, and the label “Avis fictifs”. The concept fits the article and the visual is consistent within the asset.
- The SVG description repeats the article title rather than describing the visible composition; this is an accessibility improvement opportunity. No existing file was changed.
- The HTML `img` has a `viewBox` attribute, which does not control rendering for an HTML image. No HTML change made.
- Browser rendering, responsive crop, contrast at actual display size, deployed loading: (N/A).

## Free image candidate reviewed
- “Reviews of a Negative Customer Experience.jpg”, Zuko.io Images, Wikimedia Commons: https://commons.wikimedia.org/wiki/File:Reviews_of_a_Negative_Customer_Experience.jpg
- Original JPEG (4000 × 2667): https://upload.wikimedia.org/wikipedia/commons/d/d0/Reviews_of_a_Negative_Customer_Experience.jpg
- The specific file page states Creative Commons Attribution 2.0 Generic (CC BY 2.0): https://creativecommons.org/licenses/by/2.0/.
- If used, credit Zuko.io Images, link to the file page and license, indicate adaptations, and follow the source page’s request to link to zuko.io. Additional privacy/publicity permissions: (N/A).
- Decision: do not integrate now. The vivid red/pink photo conflicts with the restrained orange SVG, and a one-star review photo could wrongly imply that a negative review is evidence of fraud. Keep the existing illustration.

## Preservation
No image integrated. Article Markdown/HTML, registry, existing illustration, shared header/footer, and import workflow unchanged. Registry, HTML source and SVG path were cross-checked. Automated tests and browser checks: (N/A).
