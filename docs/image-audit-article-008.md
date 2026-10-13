# Audit d’illustration — article 008

Date : 2026-10-13  
Article : « Faut-il répondre à tous les avis négatifs ? »

## Contrôles du dépôt

- HTML : `content/articles/html/008-faut-il-r-pondre-tous-les-avis-n-gatifs.html`
- Registre : `content/articles/data/articles.json`
- SVG : `assets/articles/008-faut-il-r-pondre-tous-les-avis-n-gatifs.svg`
- Présence du SVG sur `main` : confirmée.
- Concordance du chemin dans le registre et le HTML : confirmée.
- Dimensions déclarées : 1140 × 760.
- Pertinence : bonne ; le visuel montre un document d’avis et un symbole de validation.
- Test de rendu navigateur/mobile : (N/A), non exécuté.

## Défaut observé

Le libellé visible dans le SVG est « Avis n gatifs » au lieu de « Avis négatifs ». Le texte accessible SVG (`<desc>`) répète le titre au lieu de décrire la composition. Le texte alternatif HTML est présent, mais générique.

**Recommandation :** corriger le libellé et la description accessible dans une étape dédiée après revue. Ce rapport ne modifie pas le SVG ni le HTML afin de préserver les illustrations et fichiers d’articles existants.

La balise HTML `<img>` comporte aussi un attribut `viewBox`, qui ne s’applique pas à cet élément. Son retrait peut être évalué séparément ; il n’est pas nécessaire pour afficher le SVG externe.

## Photographie gratuite examinée

- Ressource : « Wooden figures with feedback text on marble »
- Auteur indiqué sur la fiche : Ann H
- Fiche de l’image : https://www.pexels.com/photo/wooden-figures-with-feedback-text-on-marble-38728538/
- Licence officielle Pexels : https://www.pexels.com/license/
- Conditions : la licence Pexels autorise généralement les usages commerciaux gratuits sans attribution obligatoire ; un crédit reste apprécié. Les restrictions s’appliquent notamment aux usages trompeurs ou suggérant l’approbation d’un produit par une personne ou une marque.
- Vérification indépendante des droits de tiers/consentements : (N/A).

**Décision : ne pas intégrer cette photographie.** Le fond noir marbré et les figurines décoratives ne s’accordent pas assez avec le SVG clair existant et n’illustrent pas directement le processus de décision. L’ajouter créerait surtout un doublon visuel.

## Périmètre

Aucun article, SVG, registre, header, footer ou processus d’importation n’a été modifié. Aucune suppression, publication ou mise en production. Tests visuels : (N/A).
