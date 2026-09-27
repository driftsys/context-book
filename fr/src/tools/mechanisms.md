# Mécanismes d'extension

Le comportement d'un agent de code dans un dépôt donné est façonné par un empilement de mécanismes : règles, commandes, skills, sous-agents, serveurs MCP, hooks et plugins. Ils diffèrent par *qui les déclenche* et par *le moment où ils consomment du contexte*. Choisir le bon mécanisme pour chaque élément de connaissance est la compétence pratique centrale du context engineering.

Ce chapitre prend Claude Code comme référence, parce qu'il offre l'une des implémentations les plus complètes et qu'il a popularisé plusieurs de ces mécanismes, et donne les équivalents dans les autres agents. Les détails sont à jour en septembre 2026 et évoluent vite ; consultez la documentation actuelle de votre outil. Gemini CLI, cité tout au long du chapitre, est en cours de remplacement par Antigravity CLI, et son accès grand public a pris fin en juin 2026. Les entrées qui le concernent décrivent les conventions propres à Gemini CLI.

## Le modèle mental {#the-mental-model}

Chaque mécanisme répond à la même question : *comment cette connaissance ou cette capacité parvient-elle au modèle, et à quel coût ?*

| Mécanisme | Qui le déclenche | Quand il consomme du contexte | Idéal pour |
|---|---|---|---|
| **Règles / instructions** | Le harness, automatiquement | À chaque requête, dès le début de la session | Les faits toujours vrais : commandes de build, conventions, « ne jamais faire X » |
| **Règles limitées à des chemins** | Le harness, quand un fichier correspondant est lu | Seulement après qu'un fichier correspondant a été touché | Les consignes propres à un langage ou à un répertoire |
| **Commandes** | L'utilisateur, en tapant `/name` | Rien tant qu'elles ne sont pas invoquées | Les workflows répétables, en particulier ceux qui ont des effets de bord |
| **Skills** | Le modèle (d'après la description) ou l'utilisateur | Toujours une courte description ; le corps à l'activation ; les ressources à la demande | Les procédures et connaissances de référence nécessaires *de temps en temps* |
| **Sous-agents** | Le modèle délègue, ou l'utilisateur le demande | Une fenêtre de contexte séparée ; seul un résumé revient | Les recherches ou lectures lourdes, le travail en parallèle, les rôles restreints |
| **Serveurs MCP** | Le modèle appelle des outils ; l'utilisateur joint des ressources | Les noms d'outils (ou les schémas complets) d'emblée ; les résultats à l'appel | L'accès en direct à des systèmes et données externes |
| **Hooks** | Le harness, sur un événement du cycle de vie | Rien, sauf si le hook renvoie une sortie | Les garanties : garde-fous, formatage, politiques |
| **Plugins** | Un utilisateur ou un administrateur les installe | Rien en propre ; chaque composant embarqué coûte ce qu'il coûte normalement | Empaqueter et partager toute une configuration |

Deux principes en découlent :

- **Le contexte permanent coûte cher.** Tout ce qui figure dans un fichier de règles est payé à chaque requête et entre en concurrence pour l'attention du modèle (voir [context rot](../glossary/failure-modes.md#context-failures)). Déplacez tout ce qui n'est pas nécessaire à chaque fois vers un mécanisme chargé à la demande.
- **Les instructions sont des conseils ; les hooks font loi.** Les règles et les skills sont lues par le modèle, qui peut mal les interpréter ou les ignorer. Si quelque chose *doit* se produire, ou ne doit jamais se produire, imposez-le avec un hook ou une règle de permission.

## Règles et instructions {#rules-and-instructions}

**Ce que c'est.** Des fichiers Markdown que le harness place dans le contexte au début de chaque session. Ils portent les conventions et les contraintes d'un dépôt : comment builder et tester, le style de code, l'architecture, ce qu'il ne faut jamais faire.

**Dans Claude Code : `CLAUDE.md`.** Les fichiers sont chargés depuis plusieurs portées et concaténés ; aucun n'en remplace un autre :

| Portée | Emplacement | Partagé ? |
|---|---|---|
| Organisation (gérée) | par ex. `/etc/claude-code/CLAUDE.md` sous Linux | Défini par l'IT, ne peut pas être exclu |
| Utilisateur | `~/.claude/CLAUDE.md` | Tous vos projets |
| Projet | `./CLAUDE.md` ou `./.claude/CLAUDE.md` | Commité, partagé avec l'équipe |
| Local | `./CLAUDE.local.md` | Personnel, ignoré par git |

- Les fichiers du répertoire de travail et de chacun de ses répertoires parents sont chargés au lancement. Les fichiers des *sous-répertoires* ne sont chargés que lorsque l'agent y lit des fichiers.
- `@path/to/file` importe un autre fichier. Les imports peuvent s'imbriquer jusqu'à quatre niveaux de profondeur. Le contenu importé consomme tout de même du contexte.
- **`.claude/rules/*.md`** répartit les règles dans des fichiers modulaires. Une règle dotée d'un frontmatter `paths:` n'est chargée que lorsqu'un fichier correspondant est lu :

```markdown
---
paths:
  - "src/api/**/*.ts"
---
- Every API endpoint must validate its input.
```

- `/init` génère un `CLAUDE.md` de départ à partir de la base de code. `/memory` modifie les fichiers de mémoire, et `/context` montre ce qui a réellement été chargé.
- Claude Code tient aussi une **auto memory** : des notes qu'il écrit pour lui-même d'une session à l'autre, dans un répertoire de mémoire propre à chaque projet.

**`AGENTS.md` : la convention partagée.** Introduit avec Codex d'OpenAI en 2025, publié comme convention inter-éditeurs ([agents.md](https://agents.md)) en août 2025 et désormais placé sous la gouvernance de l'Agentic AI Foundation de la Linux Foundation, `AGENTS.md` est du Markdown brut, sans schéma imposé. Il est lu par Codex, Copilot, Cursor, OpenCode, Pi et la plupart des autres agents, ainsi que par Gemini CLI (désormais Antigravity CLI) lorsqu'il est configuré pour cela. Codex concatène tous les `AGENTS.md` depuis la racine du dépôt jusqu'au répertoire de travail. Les versions récentes de Claude Code lisent nativement `AGENTS.md` en l'absence de `CLAUDE.md`. Un `CLAUDE.md` contenant la seule ligne `@AGENTS.md` permet à un unique fichier de servir à tous les agents.

**Équivalents dans les autres agents.**
- **GitHub Copilot :** `.github/copilot-instructions.md` pour l'ensemble du dépôt, plus des fichiers `.github/instructions/*.instructions.md` propres à certains chemins, avec un glob `applyTo:`.
- **Cursor :** `.cursor/rules/*.mdc` avec un frontmatter `description`, `globs` et `alwaysApply`. Les règles peuvent être toujours appliquées, appliquées quand l'agent les juge pertinentes, appliquées aux fichiers correspondants, ou appliquées uniquement quand elles sont mentionnées.
- **Gemini CLI :** des fichiers `GEMINI.md`, chargés globalement, par espace de travail, et au moment voulu lorsqu'un outil touche un répertoire.
- **Kiro :** des steering files dans `.kiro/steering/`.

**Bonnes pratiques.**
- Gardez chaque fichier court. La documentation d'Anthropic recommande moins de 200 lignes par fichier `CLAUDE.md`.
- N'y mettez que ce qui est vrai pour *chaque* tâche : commandes, conventions, interdictions. Déplacez les procédures dans des skills, et les consignes par type de fichier dans des règles limitées à des chemins.
- Éliminez les contradictions et les instructions périmées. Ce sont autant de [context clash](../glossary/failure-modes.md#context-failures) en puissance.
- Placez les contraintes les plus importantes en premier ([lost in the middle](../glossary/failure-modes.md#context-failures)).

## Commandes {#commands}

**Ce que c'est.** Des prompts réutilisables que l'*utilisateur* invoque explicitement, généralement sous la forme `/name`. Elles conviennent aux workflows que l'on veut exécuter de la même façon à chaque fois : `/review`, `/release`, `/fix-issue 123`.

**Dans Claude Code, les commandes sont désormais une forme de skill.** Un fichier `.claude/commands/deploy.md` et une skill `.claude/skills/deploy/SKILL.md` créent tous deux `/deploy`, et fonctionnent de la même manière. L'ancien format `commands/` fonctionne toujours, mais les nouveaux développements devraient utiliser les skills. Une skill de type commande :

```markdown
---
description: Fix a GitHub issue
argument-hint: [issue-number]
allowed-tools: Bash(gh issue view *)
disable-model-invocation: true
---
Fix issue #$ARGUMENTS following our coding standards.
Current changes: !`git diff HEAD`
```

- `$ARGUMENTS` (ou `$0`, `$1`, …) insère les arguments. Une ligne contenant `` !`command` `` exécute une commande shell et insère sa sortie avant que le modèle ne voie le prompt.
- `disable-model-invocation: true` signifie que seul l'utilisateur peut la lancer, et sa description ne consomme aucun contexte jusque-là. Utilisez-le pour tout ce qui a des effets de bord : déployer, commiter, publier.
- Parmi les commandes intégrées figurent `/clear`, `/compact`, `/context`, `/init`, `/memory`, `/mcp`, `/agents`, `/plugin`, `/hooks` et `/permissions`. Les serveurs MCP peuvent aussi exposer des prompts sous forme de commandes.

**Équivalents.** L'industrie converge vers l'idée qu'« une commande est une skill invoquée par l'utilisateur ». Les custom prompts de Codex et les fichiers `.prompt.md` de VS Code sont en voie de dépréciation au profit des skills. Gemini CLI utilise des fichiers de commande TOML dans `.gemini/commands/`.

## Skills {#skills}

**Ce que c'est.** Un savoir-faire empaqueté, propre à une tâche, que l'agent ne charge que lorsqu'il est pertinent : comment produire un format de fichier particulier, suivre une checklist de revue, mener une release ou utiliser une bibliothèque interne. Anthropic a introduit les Agent Skills en octobre 2025 et les a publiées comme standard ouvert en décembre 2025 ([agentskills.io](https://agentskills.io)). Fin 2026, des dizaines de produits prennent en charge ce format, dont Codex, GitHub Copilot, VS Code, Cursor, Gemini CLI, Junie, Kiro et Goose.

**Format.** Une skill est un dossier contenant un `SKILL.md` et des fichiers d'appui facultatifs :

```
pdf-processing/
├── SKILL.md
├── scripts/fill_form.py
└── references/forms.md
```

```markdown
---
name: pdf-processing
description: Extract text from PDFs, fill forms, merge files. Use when working with PDF files.
---
# PDF processing
1. For forms, read [the forms reference](references/forms.md).
2. Fill fields by running `scripts/fill_form.py`.
```

`name` et `description` sont obligatoires. La description doit dire à la fois *ce que* fait la skill et *quand* l'utiliser, car c'est sur elle que le modèle s'appuie pour décider de charger ou non la skill.

La **divulgation progressive** (progressive disclosure) est ce qui rend les skills peu coûteuses :
1. **Métadonnées :** seuls le nom et la description (environ 100 tokens) sont chargés au démarrage, pour chaque skill.
2. **Instructions :** le corps de `SKILL.md` est chargé lorsque la skill est activée. Gardez-le sous les 5 000 tokens environ.
3. **Ressources :** les fichiers de référence sont lus, et les scripts *exécutés* plutôt que lus, seulement en cas de besoin.

Un dépôt peut ainsi embarquer des dizaines de skills pour quelques milliers de tokens, au lieu d'entasser tout ce savoir dans `CLAUDE.md`.

**Emplacements.**
- **Claude Code :** `~/.claude/skills/` (personnel) et `.claude/skills/` (projet), plus les skills gérées et celles des plugins.
- **Partagé :** `.agents/skills/` s'impose peu à peu comme emplacement commun aux agents, lu par Codex, Copilot et Gemini CLI.

**Bonnes pratiques.**
- La description sert de déclencheur : rendez-la précise, avec les mots qu'un utilisateur emploierait réellement.
- Gardez `SKILL.md` léger et déplacez les détails dans des fichiers de référence.
- Placez les étapes déterministes dans des scripts. Ils sont plus fiables que de la prose, et leur exécution ne coûte presque pas de contexte.
- Auditez les skills tierces avant de les installer. Une skill peut contenir des scripts qui s'exécutent sur votre machine.

## Sous-agents {#sub-agents}

**Ce que c'est.** Des agents qui tournent dans leur *propre* fenêtre de contexte. L'agent principal délègue une tâche, le sous-agent la mène à bien, ce qui peut impliquer de lire des dizaines de fichiers, et seul un résumé revient. Le contexte principal reste propre.

**Dans Claude Code.** Les sous-agents sont des fichiers Markdown dans `.claude/agents/` (projet) ou `~/.claude/agents/` (personnel) :

```markdown
---
name: code-reviewer
description: Reviews code for quality and security. Use after making changes.
tools: Read, Glob, Grep
model: sonnet
---
You are a senior code reviewer. Check the diff for correctness, security,
and consistency with the project's conventions. Report findings; do not edit.
```

- Seuls `name` et `description` sont obligatoires. Des champs facultatifs permettent de restreindre les outils, de choisir un modèle, de précharger des skills, d'attacher des serveurs MCP, de définir des permissions ou d'exécuter l'agent dans un worktree git isolé.
- Les **sous-agents intégrés** comprennent *Explore* (recherche en lecture seule), *Plan* (recherche en lecture seule pour le plan mode) et *general-purpose*.
- Le modèle délègue automatiquement lorsqu'une tâche correspond à une description, ou vous pouvez nommer l'agent. Plusieurs sous-agents peuvent tourner en parallèle et en arrière-plan.
- Un **fork** est l'alternative lorsque la tâche a besoin de tout l'historique de la conversation : il hérite du contexte du parent au lieu de repartir de zéro.

**Quand les utiliser.** Pour les recherches étendues dans une base de code ; les tâches parallèles et indépendantes ; les rôles aux outils restreints, comme un relecteur en lecture seule ; et un second avis indépendant, puisque [c'est un autre agent qui devrait relire le travail](../techniques/quality-control.md), pas celui qui l'a écrit. Ne les utilisez pas pour des tâches qui dépendent des détails de la conversation en cours.

**Équivalents.** Codex prend en charge des agents personnalisés définis en TOML (`.codex/agents/`). VS Code et Copilot utilisent des fichiers `.agent.md` dans `.github/agents/`. Cursor et Gemini CLI ont leurs propres répertoires de sous-agents. Pi n'en a délibérément aucun : on lance plutôt une autre instance de l'agent.

## MCP (Model Context Protocol) {#mcp-model-context-protocol}

**Ce que c'est.** Un protocole ouvert, introduit par Anthropic en novembre 2024 et désormais placé sous la gouvernance de l'Agentic AI Foundation, pour connecter les agents à des outils et à des données externes. Il remplace une intégration spécifique pour chaque couple agent-service par un protocole unique que chaque partie implémente une seule fois. ([modelcontextprotocol.io](https://modelcontextprotocol.io))

**Architecture.** Un *hôte* (l'application agent) fait tourner un *client* par *serveur*. Les serveurs exposent trois primitives :
- **Tools :** des actions que le modèle peut appeler, comme interroger une base de données, créer une issue ou chercher dans une documentation.
- **Resources :** des données que l'utilisateur ou l'application peut joindre, comme un fichier, un enregistrement ou une page.
- **Prompts :** des modèles que l'utilisateur peut invoquer, et qui apparaissent sous forme de commandes.

Les serveurs tournent en local (le transport **stdio**) ou à distance (**Streamable HTTP**, avec OAuth). La révision de juillet 2026 de la spécification a rendu le protocole stateless pour faciliter le passage à l'échelle, déprécié certaines fonctionnalités client plus anciennes et formalisé des extensions comme les **MCP Apps** (interfaces interactives).

**Dans Claude Code.**

```bash
claude mcp add --transport http notion https://mcp.notion.com/mcp
claude mcp add --transport stdio db -- npx -y @bytebase/dbhub --dsn "postgresql://..."
```

Un projet peut commiter un `.mcp.json` pour que toute l'équipe partage les mêmes serveurs. Chaque membre de l'équipe les approuve avant la première utilisation :

```json
{
  "mcpServers": {
    "issues": { "type": "http", "url": "https://mcp.example.com/mcp" }
  }
}
```

**Coût en contexte.** Le nom, la description et le schéma JSON de chaque outil doivent parvenir au modèle d'une manière ou d'une autre. Quelques serveurs MCP totalisant des dizaines d'outils consommaient autrefois des dizaines de milliers de tokens avant même que le travail ne commence, l'une des raisons pour lesquelles Pi refuse MCP en bloc. Claude Code utilise désormais par défaut la **tool search** : seuls les noms des outils sont chargés d'emblée, et les schémas complets sont récupérés au besoin. Les *résultats* volumineux restent un coût : préférez les serveurs qui renvoient une sortie concise.

**Sécurité.** Un serveur MCP est du code que vous exécutez avec vos identifiants, et ses sorties sont des entrées non fiables pour le modèle. Les résultats d'outils peuvent véhiculer une [prompt injection](../glossary/failure-modes.md#security-failures), et la combinaison de données privées, de contenu non fiable et de la capacité à envoyer des données vers l'extérieur crée la [lethal trifecta](../glossary/failure-modes.md#security-failures). N'installez que des serveurs vérifiés, donnez-leur des tokens au moindre privilège et exigez une approbation pour les outils sensibles.

**Équivalents.** Tous les grands agents prennent en charge MCP : Codex (`config.toml`), Copilot et VS Code, Cursor (`mcp.json`), Gemini CLI (`settings.json`) et OpenCode, entre autres.

## Hooks {#hooks}

**Ce que c'est.** Des commandes shell (ou des appels HTTP, ou de petites évaluations par un modèle) que le *harness* exécute à des points fixes du cycle de vie de l'agent, de façon déterministe, quoi que décide le modèle. C'est le seul mécanisme présenté ici qui *garantit* un comportement.

**Événements courants dans Claude Code :** `SessionStart`, `UserPromptSubmit`, `PreToolUse` (peut bloquer une action), `PostToolUse` (peut lancer un formateur ou un linter après coup), `Stop` (peut vérifier le travail avant que l'agent ne termine), `PreCompact`, ainsi que des événements liés aux sous-agents.

```json
{
  "hooks": {
    "PreToolUse": [
      { "matcher": "Bash",
        "hooks": [{ "type": "command", "command": ".claude/hooks/block-dangerous.sh" }] }
    ],
    "PostToolUse": [
      { "matcher": "Edit|Write",
        "hooks": [{ "type": "command", "command": "npm run format --silent" }] }
    ]
  }
}
```

Un hook `PreToolUse` qui se termine avec le code 2 bloque l'action et renvoie son message au modèle. Les hooks ne consomment aucun contexte, sauf s'ils produisent une sortie.

**Usages.** Bloquer les commandes destructrices comme `rm -rf` ou les force-push, protéger des fichiers, lancer formateurs et linters après chaque modification, exécuter les tests avant que l'agent ne déclare avoir terminé, journaliser, et charger du contexte frais au démarrage de la session.

**Équivalents.** Gemini CLI, Copilot, Cursor et Codex ont tous un système de hooks, mais les noms d'événements et les formats diffèrent : les hooks sont donc le mécanisme le moins portable.

## Plugins {#plugins}

**Ce que c'est.** Un moyen d'empaqueter toute une configuration (skills, commandes, sous-agents, hooks, serveurs MCP) et de la distribuer comme une unité versionnée, au lieu de copier la configuration d'un dépôt à l'autre.

**Dans Claude Code** (depuis octobre 2025), un plugin est un répertoire doté d'un manifeste facultatif `.claude-plugin/plugin.json` et de dossiers de composants :

```
deploy-tools/
├── .claude-plugin/plugin.json
├── skills/
├── agents/
├── hooks/hooks.json
└── .mcp.json
```

Les plugins sont distribués via des **marketplaces**, qui sont simplement des dépôts git munis d'un catalogue `marketplace.json` :

```
/plugin marketplace add my-org/claude-plugins
/plugin install deploy-tools@my-org
```

Les skills des plugins sont préfixées par un espace de noms (`/deploy-tools:release`) pour éviter les collisions. Les organisations peuvent pré-approuver, imposer l'installation ou bloquer des marketplaces et des plugins via les paramètres gérés.

**Entre outils.** Codex, Copilot CLI, VS Code, Cursor et Gemini CLI (sous le nom d'« extensions ») ont tous un système de plugins, et plusieurs savent lire les formats de manifeste des autres. **Agent Plugins 1.0**, une spécification neutre publiée en août 2026, standardise le socle portable, les skills et les serveurs MCP, pour des clients comme VS Code, Copilot, Codex, Cursor et Kiro.

## Mécanismes connexes {#related-mechanisms}

- **Paramètres et permissions :** des règles allow, ask et deny pour les outils, comme `Bash(git *)`, évaluées en dehors du modèle. Les règles deny l'emportent toujours. Les paramètres gérés permettent à une organisation d'imposer une politique que les utilisateurs ne peuvent pas contourner.
- **Output styles :** modifient le ton, le format ou le rôle de l'agent pour toute une session, par exemple un mode explicatif ou pédagogique. Ils consomment du contexte à chaque requête.
- **Plan mode :** un mode en lecture seule dans lequel l'agent fait ses recherches et propose un plan avant de modifier quoi que ce soit. C'est la forme légère du [spec-driven development](../techniques/sdd.md).

## Choisir le bon mécanisme {#choosing-the-right-mechanism}

- *« L'agent doit toujours savoir ça. »* → **Fichier de règles**, à garder court.
- *« L'agent doit savoir ça quand il travaille sur ces fichiers. »* → **Règle limitée à des chemins.**
- *« L'agent doit savoir comment faire ça le moment venu. »* → **Skill.**
- *« Je veux lancer ce workflow à la main, de la même façon à chaque fois. »* → **Commande** (une skill invoquée par l'utilisateur).
- *« Cette tâche demande beaucoup de lecture, ou un regard indépendant. »* → **Sous-agent.**
- *« L'agent a besoin d'un accès en direct à un système. »* → **Serveur MCP**, ou une CLI que l'agent sait déjà exécuter.
- *« Ceci doit toujours, ou ne doit jamais, se produire. »* → **Hook** ou **règle de permission.**
- *« Toute l'équipe ou toute l'organisation doit disposer de cette configuration. »* → **Plugin.**
