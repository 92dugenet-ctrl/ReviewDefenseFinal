# Comment ça marche — V14

## Principe

La page est conçue comme un grand parcours animé continu. Le même avis traverse toutes les étapes du produit : avis, analyse, intelligence, évaluation, décision, action, validation, suivi et interface finale.

## Parcours

01. Les avis arrivent
02. L'avis seul ne suffit pas
03. Les signaux se rapprochent
04. Le raisonnement devient lisible
05. L'IA recommande, l'utilisateur décide
06. Une décision devient une action
07. Validation humaine
08. Suivi et historique
09. Une seule interface
10. Conclusion

## Interaction

- Les étapes apparaissent avec IntersectionObserver.
- Les petits carrés forment le fil visuel de la page.
- Les couches d'analyse changent progressivement.
- Le score est présenté comme score de suspicion, jamais comme preuve de non-conformité.
- Les branches représentent Répondre, Examiner et Signaler.
- Les actions sont des démonstrations visuelles et ne déclenchent aucun traitement backend.
- prefers-reduced-motion est respecté.

## Fichiers

- pages/comment-ca-marche.html
- styles/comment-ca-marche-structure.css
- sections/comment-ca-marche/comment-ca-marche.js
