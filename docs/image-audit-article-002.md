# Image audit — Article 002

Date checked: 2026-10-13
Repository ref inspected: main
Scope: source-level check only; browser rendering has not been tested.

## Article
- ID: 002
- Title: Quels signaux permettent de repérer un profil d’avis suspect ?
- Registry: `content/articles/data/articles.json`
- SVG: `assets/articles/002-quels-signaux-permettent-de-rep-rer-un-profil-d-avis-suspect.svg`
- HTML: `content/articles/html/002-quels-signaux-permettent-de-rep-rer-un-profil-d-avis-suspect.html`

## Findings
- The SVG exists on `main` and its path matches the registry entry.
- The article HTML references the same local SVG path.
- The SVG has a descriptive `<title>` and `<desc>`; the HTML image has an `alt` description.
- Its document-card, gauge, and magnifying-glass motifs are relevant to an article about identifying suspicious reviewer profiles.
- The SVG uses a light-blue palette, which differs from the purple palette noted in earlier sample assets. This is a possible consistency-review item, not a confirmed defect.
- The HTML `<img>` element also carries a `viewBox` attribute, which does not control an HTML image's rendering. No code change is recommended based on this alone.
- Broken loading, responsive rendering, and actual visual quality remain (N/A) until checked in a browser.

## Recommendation
Keep the current local SVG for this article for now. Do not add a stock photograph just to add one: the existing illustration is relevant and has accessibility text. Revisit only if browser review shows a visual or responsive issue.

## Rights and provenance
- Asset type: repository-authored/local SVG (external source/license: (N/A) based on inspected file content).
- External stock photo integrated: no.
- Changes to article Markdown/HTML, shared header/footer, import workflow, or existing illustration: none.
