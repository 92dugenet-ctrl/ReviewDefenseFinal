# ReviewDefense — V13 — Structure de la page Signalement

## Intention

La page présente le signalement comme une décision issue de l'analyse, et non comme une réponse automatique à un avis négatif.

Fil directeur :

**avis → contexte → signaux → raisonnement → score de suspicion → décision → dossier → suivi**

Principe central : **Le système recommande. Vous décidez.**

Le score présenté est un score de suspicion indicatif. Il ne constitue ni une preuve de violation ni une garantie de suppression.

## Narration

1. **Quand il faut agir.** Le signalement apparaît après l'analyse.
2. **Un avis négatif n'est pas forcément un avis à signaler.** Trois orientations : répondre, examiner, signaler.
3. **Un signal n'est pas une conclusion.** Contenu, contexte, chronologie et signaux convergent vers une évaluation.
4. **Le raisonnement devient lisible.** Observation, contexte, interprétation.
5. **Une recommandation, pas un verdict.** Score de suspicion 87/100, niveau élevé, raisons explicites.
6. **Le système recommande. Vous décidez.** Quatre décisions possibles : signaler, répondre, examiner, ne pas agir.
7. **Le signalement se construit.** Dossier progressif avec validation requise.
8. **Une action traçable.** Historique et état du dossier.
9. **Et si le signalement n'est pas la bonne réponse ?** Arbre de décision vers répondre, examiner ou signaler.
10. **Agir quand c'est pertinent.** Retour à l'analyse.

## Direction visuelle

- Fond blanc et surfaces bleu très pâle.
- Typographie éditoriale, bleu nuit, accents bleu ReviewDefense.
- Mosaïque de petits carrés en CSS, utilisée comme fil visuel et non comme décoration gratuite.
- Cartes produit sobres et limitées aux moments où elles expliquent une décision.
- Transformations au scroll avec `IntersectionObserver`.
- Pas de grand dashboard.
- Pas d'image externe nécessaire.
- Respect de `prefers-reduced-motion`.

## Fonctionnel structurel

- Révélation progressive des éléments principaux.
- Sélection de l'orientation dans la section Décision.
- Sélection des branches Répondre / Examiner / Signaler.
- Démonstration purement frontend : aucune action réelle de signalement et aucun appel backend.
