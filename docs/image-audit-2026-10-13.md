# Image audit — ReviewDefenseFinal

Date: 2026-10-13
Branch: audit/image-inventory-2026-10-13

## Verified first pass

- The article registry at content/articles/data/articles.json contains 91 entries.
- All 91 entries have non-empty illustration, HTML, and Markdown path fields.
- Illustration paths in the registry are local SVG paths under /assets/articles/. The existence and rendering of every asset have not yet been checked.
- The SVG files for articles 001 and 091 were fetched successfully. Both use a consistent purple editorial style and a 1140 × 760 viewBox.
- scripts/ressources.js renders article.illustration in resource cards and article pages. Preserve this connector and the Markdown/HTML import workflow.
- pages/accueil.html has no img elements but includes inline SVG illustrations. The hero uses a placeholder surface; inspect hero-video.js before deciding whether a media asset is missing.
- pages/ressources/index.html has 13 text-only beige/blue category tiles. Keep that visual direction unless there is a clear design reason to change it.

## Recommendation

Do not replace the 91 existing SVGs in bulk. Audit the SVGs one by one for file existence, rendering, accessibility text, title relevance, duplicates, and mobile behavior. Consider adding occasional locally stored, optimized photographs inside article bodies only when they add real context and fit the current visual identity.

Candidate for later review: article 090, “Une entreprise veut automatiser l’analyse de 10 000 avis : quelles précautions prendre ?” — Unsplash photo “Person reviewing documents with calculator and laptop” by Kelly Sikkema. Source page: https://unsplash.com/photos/person-reviewing-documents-with-calculator-and-laptop-0oZpRxG5Hkk. The page labels it free to use under the Unsplash License; attribution is optional but appreciated. Official terms: https://unsplash.com/license. The image is not integrated in this run: final visual suitability and any third-party rights visible in the image remain N/A. If selected later, download and optimize a local copy and preserve provenance rather than hotlinking the image.

For every candidate, record the source page, creator, license, date checked, attribution requirements, and any rights questions involving identifiable people, logos, artwork, or locations. For Wikimedia Commons, verify the specific file page and its attribution/share-alike conditions: https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia.

## Status

- Registry count: 91 articles.
- SVGs checked directly: articles 001 and 091.
- Full file-by-file and visual audit: pending.
- External images integrated: none.
