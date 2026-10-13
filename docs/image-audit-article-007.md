# Image audit — Article 007

Date: 2026-10-13. Source-level inspection of main only; browser and deployed rendering: (N/A).

- Article: Que faire lorsqu’on soupçonne un faux avis mais qu’on n’a pas de preuve directe ?
- Registry: content/articles/data/articles.json
- HTML: content/articles/html/007-que-faire-lorsqu-on-soup-onne-un-faux-avis-mais-qu-on-n-a-pas-de-preuve-directe.html
- SVG: assets/articles/007-que-faire-lorsqu-on-soup-onne-un-faux-avis-mais-qu-on-n-a-pas-de-preuve-directe.svg

Findings:
- The registry path, HTML image source, and SVG path match; the SVG was fetched successfully.
- The landscape 1140 × 760 illustration shows a document, an activity chart, and a checkmark. It fits the article's advice to document observable facts without treating suspicion as proof.
- The SVG has a title and description, but the description repeats the article title instead of explaining the visual. Accessibility improvement opportunity; existing asset unchanged.
- The HTML img includes viewBox, which does not control rendering for an HTML img. No HTML change made.
- Browser rendering, mobile crop, contrast at display size, deployed loading: (N/A).

Free image candidate:
- Mikhail Nilov, “A Person Examining Documents”, Pexels: https://www.pexels.com/photo/a-person-examining-documents-8297020/
- Listed size: 4000 × 6000, portrait.
- Pexels marks the photo free. Its official license help says uploaded photos and videos may be used for personal and commercial purposes without attribution: https://help.pexels.com/hc/en-us/articles/360042295174-What-is-the-license-of-the-photos-and-videos-on-Pexels
- Attribution: not required; release/privacy assessment beyond the page: (N/A).
- Decision: do not integrate. The custom vector is more directly relevant to evidence and documentation and better matches the site's landscape illustration system. The portrait photo would add little and may crop awkwardly.

Preservation:
No stock image integrated. Article Markdown/HTML, registry, SVG, shared header/footer, and import workflow unchanged. Automated tests and browser checks: (N/A).
