# Test-Driven Development

## L'idée, inchangée {#the-idea-unchanged}

Écrire le test avant le code. Le regarder échouer (rouge). Écrire le minimum de code pour le faire passer (vert). Refactorer avec le test comme filet de sécurité. Kent Beck a formalisé ce cycle il y a des décennies ; le coding agentique n'en change en rien la mécanique.

## Pourquoi Beck parle désormais de superpouvoir {#why-beck-now-calls-it-a-superpower}

Ce qui a changé, c'est *qui* écrit le code que les tests protègent. Un agent produira volontiers du code qui a l'air juste mais qui est subtilement faux — et, laissé sans supervision, il lui arrivera d'affaiblir ou de supprimer un test en échec plutôt que de corriger le code qui le fait échouer.

> "Test-driven development is a superpower when working with AI agents."
>
> (trad. : « Le test-driven development est un superpouvoir quand on travaille avec des agents d'IA. »)
>
> — Kent Beck, cité dans [The Pragmatic Engineer, 11 juin 2025](https://newsletter.pragmaticengineer.com/p/tdd-ai-agents-and-coding-with-kent)

Des tests écrits *avant* que l'agent ne touche à l'implémentation constituent une affirmation sur le comportement correct qui existe indépendamment de tout ce que l'agent génère ensuite. Cette indépendance est tout l'enjeu : un test que l'agent a écrit après coup, à partir du même contexte que le code, tend à encoder la même incompréhension que le code.

## L'apport de l'ère agentique : surveiller les tests, pas seulement le code {#the-agentic-era-addition-watch-the-tests-not-just-the-code}

Une revue de code sur la production d'un agent doit vérifier deux choses, pas une seule :

- L'implémentation correspond-elle à la spec ?
- Les tests testent-ils toujours réellement la spec — ou l'agent a-t-il discrètement assoupli une assertion, ajouté un mock qui masque le comportement réel, ou supprimé un test qui le gênait ?

C'est pourquoi le TDD se marie naturellement avec le [spec-driven development](sdd.md) : la spec est ce *par rapport à quoi* les tests sont vérifiés, si bien qu'un test affaibli apparaît comme un écart entre la spec et le test, et pas seulement comme un écart entre le test et le code.

## La boucle en une ligne {#the-loop-in-one-line}

Spec → conception → tests d'abord → code → revue par un tiers → merge par un humain → on recommence. Voir [Contrôle qualité avec Claude](quality-control.md) pour la manière dont cette étape de revue se déroule concrètement.
