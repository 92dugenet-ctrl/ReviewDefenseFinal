# ReviewDefense — Page Tarifs V12

## Base
V12 repart intégralement de la consolidation V11. La page `pages/tarifs.html`
de V11 était un placeholder ; elle est remplacée par une page tarifaire
fonctionnelle sans modification du backend ou des interfaces admin.

## Tarifs conservés depuis la page historique `frontend/tarif.html`

### Audit de réputation
- 1 à 9 avis : 79 € / audit
- 10 à 49 avis : 149 € / audit
- 50 à 99 avis : 249 € / audit
- 100 à 249 avis : 399 € / audit
- 250 à 499 avis : 599 € / audit
- 500 à 999 avis : 899 € / audit
- 1 000 à 2 499 avis : 1 290 € / audit
- 2 500 à 4 999 avis : 1 790 € / audit
- 5 000 à 9 999 avis : 2 490 € / audit

### Traitement d'une situation liée à un avis
- Analyse de conformité : 49 € à partir de
- Préparation du signalement : 99 € à partir de
- Dossier renforcé : 159 € à partir de
- Suivi du signalement : 219 € à partir de
- Dossier complet : 275 € maximum

### Packs de traitement
- Starter 5 : 490 € / pack
- Plus 10 : 990 € / pack
- Pro 25 : 1 990 € / pack
- Business 50 : 3 490 € / pack
- Enterprise 100 : 5 900 € / pack

### Protection continue
- Essential : 49 € / mois
- Professional : 89 € / mois
- Business : 159 € / mois

## Structure visuelle
1. Hero éditorial avec mosaïque CSS de petits carrés.
2. Audit de réputation en rail horizontal avec cartes d'avis empilées en perspective CSS.
3. Traitement en rail horizontal avec visuels géométriques CSS.
4. Packs en rail horizontal avec mosaïques de carrés proportionnelles au volume.
5. Protection continue en trois cartes.
6. Synthèse tarifaire dans une matrice légère.
7. Conclusion et CTA.

## Interactions
- Révélation progressive des sections au scroll.
- Défilement horizontal tactile.
- Défilement horizontal à la molette sur les rails.
- Glisser-déposer à la souris ou au pointeur.
- Hover léger sur les cartes.
- Animation discrète des carrés de la mosaïque.
- Respect de `prefers-reduced-motion`.

## Règles produit
- Un avis négatif n'est pas automatiquement considéré comme faux.
- L'IA recommande ; le professionnel décide.
- Aucun signalement n'est présenté comme automatique.
- ReviewDefense ne garantit pas la suppression d'un avis.
