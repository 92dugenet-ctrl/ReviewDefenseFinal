#!/usr/bin/env python3
"""Importe le package éditorial Review Defense (91 articles) dans le site statique."""
from __future__ import annotations
import argparse
import html
import json
import re
import sys
import zipfile
from pathlib import Path, PurePosixPath

EXPECTED_ARTICLES = 91
PACKAGE_ROOT = "review_defense_articles_package/"
SLUG_RE = re.compile(r"^[a-z0-9-]+$")

ARTICLE_CSS = """
.article-site-header{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:22px max(24px,calc((100% - 1140px)/2));border-bottom:1px solid var(--rd-border,#dce2e8);background:var(--rd-surface,#fff)}
.article-site-header a{color:inherit;text-decoration:none;font-weight:650}.article-site-header nav{display:flex;gap:20px;flex-wrap:wrap;font-size:.92rem}
.article-page{width:min(900px,calc(100% - 40px));margin:54px auto 88px}.article-page article{overflow:hidden}
.article-kicker{color:var(--rd-ink-soft,#536171);font-size:.75rem;letter-spacing:.12em;text-transform:uppercase;font-weight:700;margin-bottom:18px}
.article-page h1{font-size:clamp(2rem,5vw,3.5rem);line-height:1.08;letter-spacing:-.035em;max-width:820px;margin:0 0 24px}
.article-sub{font-size:1.15rem;color:var(--rd-ink-soft,#536171);line-height:1.6}
.article-hero{margin:28px 0 36px}.article-hero img{display:block;width:100%;height:auto;border-radius:18px;border:1px solid var(--rd-border,#dce2e8)}
.article-body{font-size:1.06rem;line-height:1.82;color:var(--rd-ink,#18212b)}.article-body h2{font-size:clamp(1.45rem,3vw,2rem);line-height:1.2;letter-spacing:-.02em;margin:2.3em 0 .7em}.article-body h3{font-size:1.25rem;margin:1.8em 0 .5em}.article-body p,.article-body ul,.article-body ol{margin:0 0 1.2em}.article-body li{margin:.35em 0}.article-body a{color:var(--rd-primary,#315be8);text-underline-offset:3px}
.article-site-footer{border-top:1px solid var(--rd-border,#dce2e8);padding:28px max(24px,calc((100% - 1140px)/2));color:var(--rd-ink-soft,#536171);font-size:.9rem}
.resources-index{width:min(1140px,calc(100% - 40px));margin:108px auto 96px}.resources-index h1{font-size:clamp(2.2rem,5vw,3.6rem);letter-spacing:-.04em;line-height:1.08;margin:.2em 0}.resources-lede{max-width:720px;color:var(--rd-ink-soft,#536171);font-size:1.1rem;line-height:1.7}
.resources-search{width:100%;max-width:560px;margin:28px 0;padding:14px 16px;border:1px solid var(--rd-border,#dce2e8);border-radius:10px;font:inherit;background:white;color:inherit}
.resources-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.resource-card{display:flex;flex-direction:column;gap:12px;padding:22px;border:1px solid var(--rd-border,#dce2e8);border-radius:16px;background:var(--rd-surface,#fff);text-decoration:none;color:inherit;transition:transform .16s ease,border-color .16s ease}.resource-card:hover{transform:translateY(-3px);border-color:var(--rd-primary,#315be8)}.resource-card small{color:var(--rd-ink-soft,#536171);text-transform:uppercase;letter-spacing:.08em;font-size:.7rem}.resource-card strong{line-height:1.35;font-size:1.08rem}.resource-card span{font-size:.88rem;color:var(--rd-ink-soft,#536171);margin-top:auto}
@media(max-width:800px){.resources-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.article-page{margin:36px auto 60px}.article-site-header{padding:18px 20px}}
@media(max-width:540px){.resources-grid{grid-template-columns:1fr}.article-site-header{align-items:flex-start;flex-direction:column}.article-site-header nav{gap:14px}}
"""

def safe_member(zf: zipfile.ZipFile, relative: str) -> bytes:
    rel = PurePosixPath(relative.lstrip("/"))
    if rel.is_absolute() or ".." in rel.parts:
        raise ValueError(f"Chemin invalide dans le manifeste: {relative}")
    candidate = PACKAGE_ROOT + str(rel)
    try:
        return zf.read(candidate)
    except KeyError as exc:
        raise ValueError(f"Fichier manquant dans le ZIP: {candidate}") from exc

def source_relative(manifest_path: str, folder: str) -> str:
    name = PurePosixPath(manifest_path).name
    if not name or name in {".", ".."}:
        raise ValueError(f"Chemin de source invalide: {manifest_path}")
    return f"{folder}/{name}"

def inject_page(raw_html: str, item: dict) -> str:
    slug = item["slug"]
    svg_name = PurePosixPath(item["illustration"]).name
    title = html.escape(item["title"], quote=True)
    description = html.escape((item.get("meta_description") or item["title"]).strip(), quote=True)
    # Les chemins restent relatifs : compatibles avec un domaine racine et un GitHub Pages de projet.
    raw_html = re.sub(r'(<link\s+rel=["\']canonical["\']\s+href=)["\'][^"\']*["\']', r'\1"./"', raw_html, flags=re.I)
    raw_html = re.sub(r'src=["\']/assets/articles/[^"\']+["\']', f'src="../../assets/articles/{svg_name}"', raw_html, flags=re.I)
    if re.search(r'<meta\s+name=["\']description["\']', raw_html, re.I):
        raw_html = re.sub(r'(<meta\s+name=["\']description["\']\s+content=)["\'][^"\']*["\']', lambda m: m.group(1) + '"' + description + '"', raw_html, count=1, flags=re.I)
    else:
        raw_html = re.sub(r'</head>', f'<meta name="description" content="{description}"></head>', raw_html, count=1, flags=re.I)
    if re.search(r'<link\s+rel=["\']stylesheet["\']\s+href=["\']\.\./\.\./styles/main\.css["\']', raw_html, re.I) is None:
        raw_html = re.sub(r'</head>', '<link rel="stylesheet" href="../../styles/main.css"><style>' + ARTICLE_CSS + '</style></head>', raw_html, count=1, flags=re.I)
    header = '<div data-global-header></div>'
    footer = '<footer class="article-site-footer"><a href="../">Toutes les ressources</a> · ReviewDefense — Comprendre avant d’agir.</footer>'
    raw_html = re.sub(r'</head>', '<link rel="stylesheet" href="../../components/header/header.css"></head>', raw_html, count=1, flags=re.I)
    raw_html = raw_html.replace('margin:54px auto 88px', 'margin:108px auto 88px')
    raw_html = re.sub(r'<body([^>]*)>', lambda m: m.group(0) + header, raw_html, count=1, flags=re.I)
    raw_html = re.sub(r'</body>', '<script src="../../scripts/main.js" defer></script></body>', raw_html, count=1, flags=re.I)
    raw_html = re.sub(r'</main>', '</main>' + footer, raw_html, count=1, flags=re.I)
    return raw_html

def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--zip", required=True, help="Chemin relatif du ZIP")
    parser.add_argument("--root", default=".", help="Racine du dépôt")
    args = parser.parse_args()
    root = Path(args.root).resolve()
    zip_path = (root / args.zip).resolve()
    if root not in zip_path.parents or zip_path.suffix.lower() != ".zip" or not zip_path.is_file():
        raise SystemExit("ZIP introuvable ou chemin hors du dépôt.")
    with zipfile.ZipFile(zip_path) as zf:
        manifest_bytes = safe_member(zf, "data/articles.json")
        items = json.loads(manifest_bytes.decode("utf-8"))
        if not isinstance(items, list) or len(items) != EXPECTED_ARTICLES:
            raise SystemExit(f"Manifeste invalide : {len(items) if isinstance(items, list) else 'format inconnu'} articles, {EXPECTED_ARTICLES} attendus.")
        slugs = [item.get("slug", "") for item in items]
        if len(set(slugs)) != EXPECTED_ARTICLES or any(not SLUG_RE.fullmatch(s) for s in slugs):
            raise SystemExit("Slugs invalides ou dupliqués : aucune écriture effectuée.")
        # Valider l'intégralité du package avant de modifier le dépôt.
        records = []
        for item in items:
            for key in ("title", "slug", "html", "markdown", "illustration"):
                if not item.get(key):
                    raise SystemExit(f"Champ {key} manquant dans l'article {item.get('id')}.")
            html_rel = source_relative(item["html"], "articles/html")
            md_rel = source_relative(item["markdown"], "articles/markdown")
            svg_rel = source_relative(item["illustration"], "illustrations")
            page_bytes = safe_member(zf, html_rel)
            md_bytes = safe_member(zf, md_rel)
            svg_bytes = safe_member(zf, svg_rel)
            if not svg_bytes.lstrip().startswith(b"<svg") and b"<svg" not in svg_bytes[:500]:
                raise SystemExit(f"Illustration SVG invalide: {svg_rel}")
            records.append((item, page_bytes.decode("utf-8"), md_bytes, svg_bytes, html_rel, md_rel, svg_rel))
        # Écriture seulement après validation complète des 91 articles et 273 fichiers.
        registry = []
        for item, page_html, md_bytes, svg_bytes, html_rel, md_rel, svg_rel in records:
            slug = item["slug"]
            (root / "ressources" / slug).mkdir(parents=True, exist_ok=True)
            (root / "ressources" / slug / "index.html").write_text(inject_page(page_html, item), encoding="utf-8")
            html_out = root / "content/articles/html" / PurePosixPath(html_rel).name
            md_out = root / "content/articles/markdown" / PurePosixPath(md_rel).name
            svg_out = root / "assets/articles" / PurePosixPath(svg_rel).name
            for out in (html_out, md_out, svg_out):
                out.parent.mkdir(parents=True, exist_ok=True)
            html_out.write_text(page_html, encoding="utf-8")
            md_out.write_bytes(md_bytes)
            svg_out.write_bytes(svg_bytes)
            registry.append({
                **item,
                "page": f"/ressources/{slug}/",
                "html_file": str(html_out.relative_to(root)).replace("\\", "/"),
                "markdown_file": str(md_out.relative_to(root)).replace("\\", "/"),
                "illustration_file": str(svg_out.relative_to(root)).replace("\\", "/"),
            })
        registry_json = json.dumps(registry, ensure_ascii=False, indent=2) + "\n"
        registry_path = root / "content/articles/registry.json"
        registry_path.parent.mkdir(parents=True, exist_ok=True)
        registry_path.write_text(registry_json, encoding="utf-8")
        # Le connecteur de ressources du site lit précisément ce chemin; conserver ce registre à jour.
        site_registry_path = root / "content/articles/data/articles.json"
        site_registry_path.parent.mkdir(parents=True, exist_ok=True)
        site_registry_path.write_text(registry_json, encoding="utf-8")
        cards = []
        for item, *_ in records:
            title = html.escape(item["title"])
            category = html.escape(str(item.get("category", "Ressources")).replace("_", " "))
            slug = html.escape(item["slug"], quote=True)
            cards.append(f'<a class="resource-card" href="./{slug}/" data-search="{title.lower()} {category.lower()}"><small>{category}</small><strong>{title}</strong><span>Lire l’article →</span></a>')
        index_html = """<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Ressources et guides — ReviewDefense</title><meta name="description" content="91 guides pour comprendre les avis clients, analyser les signaux et choisir une action adaptée.">
<link rel="stylesheet" href="../styles/main.css"><style>""" + ARTICLE_CSS + """</style><link rel="stylesheet" href="../components/header/header.css"></head><body>
<div data-global-header></div>
<main class="resources-index"><p class="article-kicker">CENTRE DE RESSOURCES</p><h1>Comprendre les avis. Décider avec méthode.</h1>
<p class="resources-lede">91 guides pratiques sur l’analyse des avis, la réputation en ligne, les règles des plateformes et les actions possibles. Un avis négatif n’est pas automatiquement un faux avis : le contexte compte.</p>
<label for="resource-search">Rechercher un guide</label><input id="resource-search" class="resources-search" type="search" placeholder="Ex. faux avis, Google, réponse, signalement" autocomplete="off">
<p id="resource-count" aria-live="polite">91 articles</p><div class="resources-grid" id="resources-grid">""" + "\n".join(cards) + """</div></main>
<footer class="article-site-footer">ReviewDefense — Comprendre avant d’agir.</footer>
<script>const input=document.getElementById('resource-search');const cards=[...document.querySelectorAll('.resource-card')];const count=document.getElementById('resource-count');input.addEventListener('input',()=>{const q=input.value.trim().toLocaleLowerCase('fr');let n=0;for(const card of cards){const show=card.dataset.search.includes(q);card.hidden=!show;if(show)n++;}count.textContent=n+' article'+(n>1?'s':'');});</script>
<script src="../scripts/main.js" defer></script>
</body></html>"""
        (root / "ressources/index.html").parent.mkdir(parents=True, exist_ok=True)
        (root / "ressources/index.html").write_text(index_html, encoding="utf-8")
        print(f"Import validé : {len(records)} articles, {len(records)} pages, {len(records)} Markdown et {len(records)} SVG.")
        print("Index généré : ressources/index.html")
    return 0

if __name__ == "__main__":
    sys.exit(main())
