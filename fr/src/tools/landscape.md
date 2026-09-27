# Le paysage des agents de code

Ce chapitre donne une vue d'ensemble des principaux agents de code à fin septembre 2026. Le domaine évolue chaque mois : considérez les détails sur les produits comme un instantané. Les catégories et les conventions durent plus longtemps que n'importe quel produit.

## Catégories {#categories}

Les agents de code se distinguent selon trois axes.

**Format**
- **Agents en terminal (CLI/TUI) :** Claude Code, Codex CLI, OpenCode, Pi, Copilot CLI, Aider, Amp, Droid de Factory.
- **IDE nativement IA,** généralement des forks de VS Code : Cursor, Kiro, Antigravity, Devin Desktop (anciennement Windsurf), Zed.
- **Extensions d'IDE :** GitHub Copilot, Cline, Kilo Code, ainsi que les versions IDE de Claude Code et de Codex.
- **Agents cloud / en arrière-plan**, qui travaillent de manière asynchrone et rendent une pull request : Codex cloud, Copilot coding agent, Claude Code on the web, Cursor cloud agents, Jules, Devin.
- **« Gestionnaires d'agents » de bureau**, pour faire tourner plusieurs agents en parallèle : l'application de bureau Claude, l'application Codex, l'Agents Window de Cursor 3, Antigravity, JetBrains Air.

**Licence**
- **Open source :** Codex CLI, OpenCode, Pi, Cline, Kilo Code, Goose, Aider, Zed, Warp.
- **Propriétaire :** Claude Code, Cursor, Copilot, Devin, Kiro, Antigravity, Junie, Amp, Factory.

**Lien avec les modèles**
- **Liés aux modèles de l'éditeur :** Claude Code (Claude), Codex (GPT), Antigravity (Gemini en priorité).
- **Multi-modèles, sélectionnés par l'éditeur :** Copilot, Cursor, Kiro, Amp, Devin.
- **Modèle au choix de l'utilisateur :** OpenCode, Pi, Cline, Kilo Code, Aider, Goose, Zed.

Les frontières entre catégories s'estompent. En 2026, la plupart des grands éditeurs proposent une CLI, une intégration IDE, une application de bureau *et* des agents cloud. À mesure que les modèles de pointe ont convergé en capacités, le *harness* est devenu un facteur de différenciation clé : les outils, les prompts, la gestion du contexte et le workflow qui entourent le modèle.

## Les principaux agents {#the-major-agents}

### Claude Code (Anthropic) {#claude-code-anthropic}

- **Sortie :** research preview en février 2025 avec Claude 3.7 Sonnet ; disponibilité générale en mai 2025.
- **Où il tourne :** le terminal (son format phare), VS Code et JetBrains, une application de bureau, le web (claude.ai/code), le mobile, Slack et la CI (GitHub Actions, GitLab). Le Claude Agent SDK expose le même harness pour construire des agents sur mesure.
- **Licence et modèles :** propriétaire ; uniquement les modèles Claude, également disponibles via AWS Bedrock, Google Vertex AI et Microsoft Foundry.
- **À noter :** il a établi bon nombre des conventions que les autres agents ont adoptées : les fichiers de règles `CLAUDE.md` (il peut aussi lire `AGENTS.md`), les skills, les sous-agents, les hooks, MCP et les plugins. Il propose aussi des sessions cloud et des Routines planifiées (2026).
- **Tarifs :** inclus dans les abonnements Claude Pro, Max, Team et Enterprise, ou facturé au token via l'API.
- **Positionnement :** un agent terminal-first très utilisé, dont beaucoup d'autres ont repris les conventions. ([documentation](https://code.claude.com/docs/en/overview))

### OpenAI Codex {#openai-codex}

- **Sortie :** la Codex CLI open source en avril 2025 et un agent cloud dans ChatGPT en mai 2025, suivis d'extensions d'IDE et d'une application de bureau. En 2026, l'application Codex a été intégrée à l'application de bureau ChatGPT.
- **Licence et modèles :** la CLI est open source (Apache 2.0, écrite en Rust) ; le service cloud est propriétaire. Il utilise par défaut les modèles GPT-Codex d'OpenAI.
- **À noter :** `AGENTS.md` a été introduit avec Codex. Codex met l'accent sur le sandboxing et les tâches cloud asynchrones, et prend en charge les skills et MCP.
- **Tarifs :** inclus dans les offres ChatGPT, de Free à Enterprise, ou via l'API.
- **Positionnement :** l'agent de code complet d'OpenAI, avec un client open source. ([GitHub](https://github.com/openai/codex))

### GitHub Copilot (Microsoft) {#github-copilot-microsoft}

- **Sortie :** l'autocomplétion en 2021–2022. Le mode agent dans VS Code est arrivé début 2025, et le **Copilot coding agent** (on lui assigne une issue, il rend une pull request en brouillon) est devenu disponible pour tous en septembre 2025. La Copilot CLI est entrée en préversion publique en septembre 2025 et est devenue disponible pour tous en février 2026.
- **Licence et modèles :** propriétaire ; multi-modèles (Claude, GPT, Gemini).
- **À noter :** lit `.github/copilot-instructions.md` et `AGENTS.md` ; prend en charge les skills, MCP et les plugins. Depuis 2026, **Agent HQ** permet aux développeurs d'exécuter des agents Claude et Codex au sein de GitHub.
- **Tarifs :** des offres allant de Free à Enterprise.
- **Positionnement :** l'acteur historique, avec la plus large diffusion. Son avantage : un workflow natif GitHub, de l'issue à la pull request puis à la revue, et un rôle de plateforme centrale pour les agents d'autres éditeurs. ([changelog GitHub](https://github.blog/changelog/2025-09-25-copilot-coding-agent-is-now-generally-available/))

### Cursor (Anysphere) {#cursor-anysphere}

- **Sortie :** 2023, comme fork de VS Code. Cursor 2.0 (octobre 2025) a introduit son propre modèle de code, Composer. Cursor 3 (avril 2026) a remplacé le panneau de chat par une Agents Window permettant de faire tourner en parallèle des agents locaux, en worktree et dans le cloud.
- **Licence et modèles :** propriétaire ; multi-modèles, plus ses propres modèles Composer.
- **À noter :** `.cursor/rules` et `AGENTS.md`, skills, MCP, hooks, agents cloud et revue de code avec Bugbot.
- **Positionnement :** l'IDE nativement IA de référence, qui évolue vers l'orchestration d'agents.

### OpenCode (Anomaly, l'équipe derrière SST) {#opencode-anomaly-the-team-behind-sst}

- **Sortie :** 2025.
- **Licence et modèles :** open source (MIT) ; totalement agnostique vis-à-vis des modèles, avec plus de 75 fournisseurs, modèles locaux compris.
- **À noter :** agents « build » et « plan » intégrés, intégration LSP, `AGENTS.md`, MCP et plugins, dans une interface terminal, une application de bureau ou un serveur headless. C'est l'un des agents de code les plus étoilés sur GitHub, et d'autres agents (comme Kilo CLI) sont construits dessus.
- **Positionnement :** l'agent terminal ouvert et neutre vis-à-vis des fournisseurs le plus en vue. ([GitHub](https://github.com/anomalyco/opencode))

### Pi (Earendil) {#pi-earendil}

- **Sortie :** 2025, par Mario Zechner, créateur du framework de jeu libGDX. En avril 2026, il a rejoint Earendil, l'entreprise d'Armin Ronacher, et le projet l'a suivi.
- **Licence et modèles :** open source (MIT) ; agnostique vis-à-vis des modèles.
- **Philosophie :** un minimalisme délibéré. Un system prompt de moins de 1 000 tokens et quatre outils (read, write, edit, bash). Pas de MCP, pas de sous-agents intégrés, pas de plan mode et pas de système de permissions : « containerize it instead » (trad. : « mettez-le plutôt dans un conteneur »). Tout le reste passe par des extensions TypeScript, des skills et des paquets, que l'agent peut écrire lui-même. Il lit `AGENTS.md`.
- **À noter :** c'est le moteur d'OpenClaw, l'agent personnel devenu viral.
- **Positionnement :** le contrepoint minimaliste aux harnesses riches en fonctionnalités, et la démonstration que la maîtrise du contexte compte davantage que les fonctionnalités. ([billet de Zechner](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/), [GitHub](https://github.com/earendil-works/pi))

### Google : Gemini CLI, Antigravity et Jules {#google-gemini-cli-antigravity-and-jules}

- **Gemini CLI :** sortie en juin 2025 (Apache 2.0), avec une offre gratuite généreuse et des fichiers de règles `GEMINI.md`. En mai 2026, Google a annoncé son remplacement par l'Antigravity CLI. Gemini CLI a cessé de servir les utilisateurs grand public le 18 juin 2026 ; les clients entreprise de Gemini Code Assist conservent l'accès. ([Google](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/))
- **Antigravity :** un IDE agent-first lancé en novembre 2025 avec Gemini 3, construit en partie par les anciens dirigeants de Windsurf, que Google avait recrutés en juillet 2025. Depuis 2026, il dispose aussi d'une CLI, qui succède à Gemini CLI.
- **Jules :** un agent cloud asynchrone qui travaille sur des dépôts GitHub et rend des pull requests.

### Devin et Windsurf (Cognition) {#devin-and-windsurf-cognition}

- **Devin :** annoncé en mars 2024 comme « the first AI software engineer » (trad. : « le premier ingénieur logiciel IA »), un agent cloud qui travaille de manière asynchrone.
- **Windsurf :** l'IDE IA de Codeium, lancé en novembre 2024. En juillet 2025, un rachat par OpenAI a échoué, Google a recruté son CEO et Cognition a racheté le reste de l'entreprise. En juin 2026, Windsurf a été renommé Devin Desktop, rejoignant Devin Cloud, une CLI et un produit de revue de code. ([Cognition](https://cognition.com/blog/windsurf))

### Autres outils à connaître {#others-worth-knowing}

- **Kiro (AWS) :** un IDE et une CLI construits autour du [spec-driven development](../techniques/sdd.md), avec des fichiers d'exigences, de conception et de tâches, ainsi que des steering files et des hooks. Disponible pour tous depuis novembre 2025.
- **Amp :** créé par Sourcegraph, puis devenu une entreprise indépendante en décembre 2025. Des modes multi-modèles aux choix affirmés et un modèle « Oracle » qui fournit un second avis.
- **Aider :** le pionnier des pair programmers en terminal, natif git (2023, open source). Il a inauguré les cartes de dépôt (repository maps) et les benchmarks de formats d'édition. Son développement a ralenti depuis 2025.
- **Cline :** un agent open source pour VS Code (2024), où l'on apporte son propre modèle, décliné ensuite en CLI et en SDK. Son fork **Roo Code** a fermé en 2026 ; **Kilo Code** poursuit la lignée et est désormais construit sur OpenCode.
- **Goose (Block) :** un agent généraliste open source, natif MCP, confié à l'Agentic AI Foundation de la Linux Foundation en décembre 2025.
- **JetBrains Junie et Air :** l'agent de JetBrains et son IDE agentique, qui peut aussi héberger des agents Codex, Claude et Gemini.
- **Factory :** des agents « Droid » et une CLI pour l'entreprise, agnostiques vis-à-vis des modèles.
- **Zed :** un éditeur open source doté d'un agent intégré. Il a créé l'**Agent Client Protocol (ACP)** pour que n'importe quel éditeur puisse héberger n'importe quel agent.
- **Warp :** un terminal devenu environnement de développement agentique, passé en open source en avril 2026.
- **Replit Agent :** un générateur d'applications dans le navigateur destiné aux non-développeurs, terre d'élection d'une bonne partie du « vibe coding ».

### Marché {#market}

Les chiffres publiés donnent une idée de l'ampleur du marché. Anthropic a annoncé un revenu annualisé supérieur à 2,5 milliards de dollars pour Claude Code en février 2026. Cursor était valorisé à 29,3 milliards de dollars en novembre 2025, et en juin 2026 SpaceX a annoncé son rachat pour 60 milliards de dollars en actions, la plus grosse acquisition d'une startup financée par capital-risque à ce jour. ([CNBC](https://www.cnbc.com/2026/06/16/spacex-spcx-cursor-acquisition-ipo.html)) En mai 2026, Cognition a levé plus de 1 milliard de dollars sur la base d'une valorisation pré-money de 25 milliards de dollars.

## Conventions partagées {#shared-conventions}

Le fait marquant de 2025–2026 n'est pas un outil en particulier, mais la convergence vers des standards communs. Elle rend le context engineering portable d'un agent à l'autre :

- **`AGENTS.md`** : un fichier de règles en Markdown brut, à la racine du dépôt. Introduit avec Codex d'OpenAI en 2025 et publié comme convention inter-éditeurs ([agents.md](https://agents.md)) en août 2025, il a été adopté par des dizaines de milliers de dépôts en quelques mois. La plupart des agents le lisent. Les versions récentes de Claude Code le lisent en l'absence de `CLAUDE.md`, et un `CLAUDE.md` peut l'importer avec `@AGENTS.md`.
- **MCP (Model Context Protocol)** : le protocole d'Anthropic pour connecter les agents à des outils et à des données (novembre 2024), pris en charge par presque tous les agents. Pi fait figure d'exception notable, au motif que les définitions d'outils coûtent trop de contexte.
- **Agent Skills (`SKILL.md`)** : Anthropic a publié les skills comme standard ouvert en décembre 2025, et OpenAI, Microsoft, Google, Cursor et d'autres l'ont adopté en l'espace de quelques semaines à quelques mois.
- **L'Agentic AI Foundation** : depuis décembre 2025, la structure neutre de la Linux Foundation qui héberge `AGENTS.md`, MCP et Goose ; voir [IA et éthique](../history/ethics.md#open-governance-and-the-linux-foundation).
- **ACP (Agent Client Protocol)** : le « LSP des agents » de Zed, rejoint par JetBrains, permet à tout éditeur compatible d'héberger tout agent compatible.

Un dépôt doté d'un bon `AGENTS.md`, de quelques skills et de serveurs MCP bien délimités fonctionne avec la plupart des agents ci-dessus. [Mécanismes d'extension](mechanisms.md) détaille chacun de ces mécanismes.

## Les benchmarks, et pourquoi s'en méfier {#benchmarks-and-why-to-be-careful}

- **SWE-bench Verified :** 500 issues GitHub validées par des humains, issues de projets Python. Ce fut le benchmark de référence pendant deux ans, mais il est devenu saturé et contaminé. En février 2026, OpenAI a cessé de le publier, après avoir trouvé des tests défectueux dans nombre des problèmes non résolus les plus difficiles, et a recommandé le **SWE-bench Pro**, plus exigeant. ([OpenAI](https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/))
- **Terminal-Bench :** des tâches dans un terminal en sandbox. Il évalue ensemble le modèle *et* le harness, ce qui le rend adapté à la comparaison d'agents.

Prenez tout classement avec prudence. Les scores dépendent du harness, du budget de calcul et du nombre de tentatives. Les éditeurs publient leurs propres chiffres, parfois sur leurs propres benchmarks. Les données d'entraînement peuvent contenir le jeu de test. Les agents peuvent aussi [contourner les tests eux-mêmes](../glossary/failure-modes.md#gaming-the-objective), par exemple en traitant les valeurs attendues comme des cas particuliers. Et aucun benchmark ne rend bien compte d'un travail long, sur plusieurs sessions, dans une vraie base de code. Le seul benchmark qui compte vraiment, ce sont votre propre base de code et vos propres tâches.

## Faire son choix {#choosing}

Il n'existe pas de meilleur agent unique. Les questions utiles sont les suivantes :

- **Où travaillez-vous ?** Dans le terminal, dans l'IDE, ou en déléguant à des agents cloud et en relisant des pull requests.
- **Avez-vous besoin de choisir le modèle ?** Pour des raisons de coût, de localisation des données, de modèles locaux ou d'indépendance vis-à-vis d'un éditeur.
- **Ouvert ou fermé ?** Les harnesses open source peuvent être audités et modifiés ; les harnesses propriétaires sont souvent plus aboutis et mieux intégrés à leurs modèles.
- **Quel degré de structure voulez-vous ?** Des quatre outils de Pi jusqu'aux harnesses entièrement configurés avec skills, sous-agents et hooks.

Comme les conventions sont partagées, ce choix engage moins qu'il n'y paraît. Investissez dans le contexte (règles, specs, tests et skills) plutôt que dans un outil en particulier.
