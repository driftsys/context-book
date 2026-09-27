# Spec-Driven Development

## L'idée {#the-idea}

Écrire la spécification d'abord, dans un fichier versionné que l'agent et chaque relecteur peuvent lire, et jamais la négocier en direct dans une fenêtre de chat qui disparaît avec la session. C'est la spec, et non la transcription du chat, qui fait foi.

La conférence de Sean Grove, « The New Code », défend l'idée de considérer la spec comme plus précieuse que le code qu'elle produit :

> « Code itself is actually a lossy projection from the specification. »
>
> (trad. : « Le code lui-même n'est en réalité qu'une projection avec perte de la spécification. »)
>
> — Sean Grove, OpenAI, « The New Code » ([transcription](https://lawwu.github.io/transcripts/8rABwKRsec4.html))

Son argument : une spec bien écrite capture l'*intention* derrière un système, sous une forme sur laquelle les humains peuvent s'accorder et que les modèles peuvent exécuter. Contrairement au code, elle survit à une régénération dans un autre langage ou selon une autre architecture.

## Pourquoi c'est plus important avec des agents que sans {#why-it-matters-more-with-agents-than-without-them}

Sans spec, une longue session agentique dérive : le contexte de travail de l'agent est résumé, modifié et partiellement oublié, et au cinquantième échange le code s'est discrètement éloigné de ce qui était réellement voulu. Une spec est le point fixe à l'aune duquel chacun (humain comme agent) peut vérifier l'état courant.

## En pratique {#in-practice}

1. **Spécifier** — décrire le comportement attendu avec suffisamment de précision pour que « terminé » soit vérifiable, et non une affaire de goût.
2. **Concevoir** — esquisser l'approche au regard de la spec avant d'en générer du code.
3. **Tester d'abord** — transformer les affirmations vérifiables de la spec en tests qui échouent (voir [Test-Driven Development](tdd.md)).
4. **Générer** — laisser l'agent écrire le code à partir de la spec et des tests, et non d'une description vague.
5. **Relire** — un second relecteur (idéalement un autre modèle ou un humain, jamais le même agent qui évalue son propre travail) vérifie le diff au regard de la spec.
6. **Merger** — un humain merge. La boucle reprend pour l'incrément suivant.

## Greenfield ou brownfield {#greenfield-vs-brownfield}

Sur un projet greenfield, la spec constitue de fait *tout* le contexte : il n'y a rien d'autre que l'agent puisse mal interpréter. Sur un projet brownfield, la spec doit coexister avec les conventions propres à une base de code existante, et c'est souvent un [golden master test](../glossary/methodology.md) qui tient lieu de spec pour un comportement historique qui n'a jamais été mis par écrit.

## Trois niveaux de spec-driven development {#three-levels-of-spec-driven-development}

L'analyse de Birgitta Böckeler sur martinfowler.com (octobre 2025) distingue trois niveaux d'engagement envers la spec :

- **Spec-first :** une spec est écrite avant le travail et utilisée pour cette tâche, puis peut être jetée.
- **Spec-anchored :** la spec est conservée et maintenue comme un document vivant au fil de l'évolution de la fonctionnalité.
- **Spec-as-source :** la spec est l'artefact principal ; le code en est généré et les humains ne modifient pas directement le code.

La plupart des outils actuels relèvent du spec-first ou du spec-anchored. Le spec-as-source reste une aspiration, et il rappelle l'échec passé du model-driven development.

## Frameworks {#frameworks}

Ne sont présentés ici que les pionniers, les plus largement adoptés et les plus prometteurs, à la fin 2026. L'adoption évolue vite. Les nombres d'étoiles ne sont que des ordres de grandeur approximatifs.

**GitHub Spec Kit** — *pionnier, largement adopté*
Publié en open source par GitHub en septembre 2025 (MIT), avec des slash commands pour plus de 30 agents. Un `constitution.md` à l'échelle du projet contient les principes non négociables, et chaque fonctionnalité passe par *specify* (`spec.md`) → *plan* (`plan.md`) → *tasks* (`tasks.md`) → *implement*. C'est l'outil dédié au SDD qui compte le plus d'étoiles sur GitHub. ([GitHub](https://github.com/github/spec-kit), [annonce](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/))

**Kiro** — *pionnier ; a popularisé le terme*
L'IDE agentique d'AWS, disponible pour tous depuis novembre 2025, dont le mode spec écrit `requirements.md`, `design.md` et `tasks.md` dans `.kiro/specs/<feature>/`. Les exigences utilisent la notation EARS (Easy Approach to Requirements Syntax) : *« WHEN [condition] THE SYSTEM SHALL [behavior]. »* (trad. : *« QUAND [condition], LE SYSTÈME DOIT [comportement]. »*). Il ne fonctionne qu'avec l'agent propre à Kiro. ([documentation Kiro](https://kiro.dev/docs/specs/))

**Tessl** — *pionnier du spec-as-source*
Fondé par Guy Podjarny (fondateur de Snyk), Tessl a été lancé en 2025 avec un framework dans lequel le code est généré à partir des specs et marqué « do not edit » (« ne pas modifier »). En 2026, il s'est repositionné comme plateforme de distribution de skills pour agents, le spec-driven development n'étant plus qu'un workflow installable parmi d'autres. ([Tessl](https://docs.tessl.io/use/spec-driven-development-with-tessl))

**BMAD Method** — *largement adopté*
Une méthode open source de Brian Madison (MIT) qui recrée une équipe agile sous forme de personas d'agents, de l'Analyst au QA. Le travail passe du brief → au PRD → à l'architecture → à des fichiers de story « shardés » (découpés) qui portent tout le contexte dont chaque agent développeur a besoin. C'est la plus lourde de ces méthodes. ([GitHub](https://github.com/bmad-code-org/BMAD-METHOD))

**OpenSpec** — *largement adopté, conçu pour les bases de code existantes*
Par Fission AI (MIT). `openspec/specs/` contient la vérité actuelle sur le système, et chaque changement porte sa propre proposition, ses tâches et ses *delta specs*. L'archivage d'un changement terminé fusionne ses deltas dans les specs principales, si bien que la spécification s'enrichit de façon incrémentale. ([GitHub](https://github.com/Fission-AI/OpenSpec))

**Taskmaster AI** — *pionnier de la première heure, largement adopté*
Lancé en mars 2025, avant que « spec-driven development » ne soit un terme courant. Il transforme un PRD en un `tasks.json` avec dépendances et sous-tâches, et fournit à l'agent une tâche à la fois via un serveur MCP ou une CLI. Sa licence est MIT avec la Commons Clause : il n'est donc pas open source au sens strict. ([GitHub](https://github.com/eyaltoledano/claude-task-master))

**GSD (« Get Shit Done »)** — *largement adopté*
Lancé en décembre 2025 (MIT), d'abord pour Claude Code puis pour plus d'une douzaine d'agents. Il conserve l'état du projet dans des fichiers, découpe le travail en petits plans et exécute chacun d'eux dans un contexte de sous-agent neuf, explicitement pour se prémunir contre le [context rot](../glossary/failure-modes.md#context-failures). ([GitHub](https://github.com/open-gsd/gsd-core))

**Superpowers** — *largement adopté ; proche du SDD*
Une bibliothèque de skills de Jesse Vincent (MIT) pour Claude Code et une douzaine d'autres agents. Son workflow va du brainstorming d'une conception à un plan écrit composé de petites tâches, puis à l'exécution par des sous-agents, au [TDD](tdd.md) et à la revue de code au regard du plan. C'est davantage une méthodologie de planification et de TDD qu'un outil centré sur l'artefact de spec. ([GitHub](https://github.com/obra/superpowers))

**Conductor** — *prometteur*
L'outil de « context-driven development » de Google, présenté en préversion en décembre 2025 (Apache 2.0). Il a été conçu comme extension de Gemini CLI et fonctionne aussi avec Claude Code ; Gemini CLI est lui-même en cours d'intégration dans Antigravity CLI. Le contexte du projet vit dans des fichiers `conductor/`, et chaque unité de travail est un *track* doté de ses propres `spec.md` et `plan.md`. ([Google](https://developers.googleblog.com/conductor-introducing-context-driven-development-for-gemini-cli/))

**Intent** — *prometteur*
L'espace de travail multi-agents d'Augment Code, en bêta publique depuis février 2026 (propriétaire). Un agent coordinateur transforme une tâche en « living spec » (spec vivante), des agents d'implémentation travaillent en parallèle dans des worktrees git, et un agent vérificateur contrôle le résultat au regard de la spec. Il fonctionne avec l'agent d'Augment ainsi qu'avec Claude Code, Codex et OpenCode. ([Augment](https://www.augmentcode.com/blog/intent-a-workspace-for-agent-orchestration))

**Les plan modes (le socle minimal)**
Claude Code, Codex et Cursor disposent chacun d'un *plan mode* en lecture seule : l'agent explore et propose un plan, et rien n'est modifié tant que vous ne l'avez pas approuvé. Par défaut, le plan n'est ni enregistré ni versionné : c'est donc du spec-first dans sa forme la plus faible. Demander à l'agent d'écrire le plan dans un fichier du dépôt suffit souvent à en faire une véritable spec.

| Framework | Niveau | Artefacts | Agents |
|---|---|---|---|
| Spec Kit | spec-first → anchored | constitution, spec, plan, tâches | 30+ |
| Kiro | spec-first → anchored | exigences (EARS), conception, tâches, steering | Kiro uniquement |
| Tessl | spec-as-source | specs, code généré | agents MCP |
| BMAD | spec-first | brief, PRD, architecture, stories | nombreux |
| OpenSpec | spec-anchored | specs + changements delta | 30+ |
| Taskmaster | task-first | PRD, tasks.json | nombreux (MCP) |
| GSD | spec-first | projet, roadmap, plans | 14+ |
| Superpowers | plan-first | conception, plan | 15+ |
| Conductor | spec-anchored | contexte produit/tech, tracks (spec, plan) | Gemini CLI, Claude Code |
| Intent | spec-anchored | living spec | plusieurs |

## Critiques {#criticisms}

Le spec-driven development a suscité de sérieuses critiques, et les frameworks ci-dessus y répondent en partie.

- **Le retour du waterfall.** Une spécification lourde en amont et une livraison en « big bang » sont précisément les antipatterns auxquels l'agilité a voulu échapper. Thoughtworks, qui a placé le SDD dans l'anneau « Assess » en novembre 2025, met en garde contre exactement cela, tout comme des praticiens qui ont testé Spec Kit ([marmelab](https://marmelab.com/blog/2025/11/12/spec-driven-development-waterfall-strikes-back.html), [Scott Logic](https://blog.scottlogic.com/2025/11/26/putting-spec-kit-through-its-paces-radical-idea-or-reinvented-waterfall.html)).
- **Pas de solution universelle.** Böckeler a vu une petite correction de bug se transformer en quatre user stories assorties de seize critères d'acceptation.
- **Surcharge de Markdown.** Les specs générées sont longues, répétitives et difficiles à relire. Comme l'a dit Böckeler, elle préférerait « rather review code than all these markdown files » (trad. : « relire du code plutôt que tous ces fichiers Markdown »).
- **Faux sentiment de contrôle.** Une spec ne garantit pas que l'agent la suive. Lors d'un test sur un projet brownfield, l'agent a lu la description des classes existantes dans la spec, puis les a recréées en doublon.
- **Dérive.** Si personne ne la maintient, une spec s'écarte du code. Les delta specs (OpenSpec), les living specs (Intent) et la réécriture vers la spec (Tessl) sont autant de réponses à ce problème.

La leçon pragmatique : adapter le cérémonial à la taille du changement. Une spec d'un paragraphe et un test qui échoue suffisent souvent. Réservez le pipeline complet aux fonctionnalités pour lesquelles un malentendu coûterait cher.
