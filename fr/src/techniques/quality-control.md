# Contrôle qualité avec Claude

Des tests qui passent sont nécessaires mais pas suffisants — un agent peut satisfaire une suite de tests faible alors que le comportement sous-jacent reste faux. Voici les techniques utilisées au quotidien pour vérifier la production d'un agent plutôt que de simplement croire que vert veut dire correct.

## Mutation testing {#mutation-testing}

Casser délibérément le code — inverser une comparaison, décaler un index d'une unité, supprimer une négation — et vérifier que la suite de tests existante s'en aperçoit réellement. Une suite de tests qui reste verte malgré des bugs injectés ne vérifie pas le comportement qu'elle prétend couvrir ; elle passe par hasard. C'est d'autant plus important avec des tests écrits par un agent, car un agent qui cherche à faire passer un test n'a aucune incitation propre à rendre ce test *strict*.

## Revue de code par un second avis {#second-opinion-code-review}

Ne jamais laisser l'agent qui a écrit le code en être le seul relecteur. Un second modèle, un autre fournisseur ou un humain relit le diff de manière indépendante avant le merge. Il ne s'agit pas de redondance pour elle-même — c'est qu'un agent unique qui relit sa propre production partage les mêmes angles morts que ceux qui ont produit cette production. L'accord entre deux revues menées indépendamment est un signal bien plus fort que l'auto-évaluation d'un seul agent.

## Property testing {#property-testing}

Au lieu de vérifier une poignée d'entrées d'exemple, énoncer une propriété générale qui doit être vraie pour *toute* entrée valide — `decode(encode(x)) == x`, un tri qui ne réordonne jamais les doublons, un solde qui ne devient jamais négatif — et laisser un framework de property testing générer des entrées adverses pour tenter de la mettre en défaut. Les tests par l'exemple ne vérifient que ce que quelqu'un a pensé à écrire ; les tests de propriétés vérifient ce que l'agent (ou un humain) n'a pas pensé à vérifier.

## Injection de fautes {#fault-injection}

Déclencher délibérément des défaillances — un appel réseau perdu, un timeout, une réponse malformée d'une dépendance — pour vérifier que le système se dégrade comme il est censé le faire, plutôt que de supposer que le code de gestion d'erreurs écrit par un agent gère réellement les erreurs qu'il prétend gérer. La gestion d'erreurs écrite par un agent est un endroit fréquent où l'on trouve du code d'apparence sûre qui n'a jamais été confronté à une vraie défaillance.

## Pourquoi les quatre ensemble {#why-all-four-together}

Chaque technique détecte un mode de défaillance différent du code généré par un agent :

| Technique | Détecte |
| --- | --- |
| Mutation testing | Des tests qui ne vérifient en réalité rien |
| Revue par un second avis | Les angles morts partagés entre l'agent et sa propre revue de lui-même |
| Property testing | Les cas limites pour lesquels personne n'a pensé à écrire d'exemple |
| Injection de fautes | Du code de gestion d'erreurs qui n'a jamais été exercé |

Aucune ne remplace le développement [spec-driven](sdd.md) et [test-driven](tdd.md) — elles sont ce qui s'exécute *à l'intérieur* de l'étape de revue de cette boucle, pour que « les tests passent » signifie quelque chose de plus proche de « le comportement est réellement correct ».
