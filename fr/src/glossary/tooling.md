# Outillage des agents

Définitions courtes. [Mécanismes d'extension](../tools/mechanisms.md) détaille chacun d'eux, avec des exemples et leurs équivalents d'un agent à l'autre.

**Rules / instructions** (règles / instructions) (`AGENTS.md`, `CLAUDE.md`, `.github/copilot-instructions.md`)
Toujours chargées dans le contexte. Elles portent les conventions et les contraintes d'un dépôt donné — ce qu'un agent qui y travaille ne doit jamais faire, et comment il doit se comporter par défaut.

**Path-scoped rules** (règles limitées à des chemins) (`.claude/rules/` avec `paths:`, `applyTo:` chez Copilot, `globs` chez Cursor)
Des règles qui ne se chargent que lorsque l'agent touche des fichiers correspondant à un motif, de sorte que les consignes propres à un langage ou à un répertoire ne consomment du contexte que là où elles s'appliquent. Voir [Règles et instructions](../tools/mechanisms.md#rules-and-instructions).

**Skills**
Des procédures empaquetées, propres à une tâche, chargées à la demande plutôt que présentes en permanence dans le contexte. Une skill regroupe le savoir-faire nécessaire pour bien faire un type de chose — produire un format de fichier précis, suivre une checklist de revue précise — si bien qu'elle ne coûte du contexte que lorsqu'on en a réellement besoin.

**Commands** (commandes)
Des prompts réutilisables invoqués explicitement, généralement sous forme de slash command, plutôt que déclenchés automatiquement selon le type de tâche.

**Sub-agents** (« sous-agents »)
Des agents dotés de leur propre contexte séparé, afin qu'une exploration volumineuse ou bruyante (fouiller une base de code, mener une longue investigation) ne pollue pas le contexte de travail de l'agent principal. Le travail est délégué et seul le résultat revient.

**MCP (Model Context Protocol)**
Un standard ouvert, publié par Anthropic en novembre 2024, pour connecter une application d'IA à des outils et à des sources de données externes via un unique protocole client-serveur plutôt qu'une intégration sur mesure pour chaque couple. Souvent présenté comme « l'USB-C de l'IA ».

- [Anthropic, "Introducing the Model Context Protocol"](https://www.anthropic.com/news/model-context-protocol)

**Hooks**
Des commandes que le harness exécute à des moments fixes du cycle de vie de l'agent (avant un appel d'outil, après une modification, avant que l'agent ne s'arrête), quoi que décide le modèle. C'est le seul mécanisme qui *garantit* un comportement, comme bloquer une commande destructrice ou lancer un formateur. Voir [Hooks](../tools/mechanisms.md#hooks).

**Plugin**
L'assemblage complet — instructions, skills, sous-agents et connexions MCP — empaqueté, versionné et partagé comme un tout, plutôt que configuré à la main dans chaque projet.

**Workflow vs. agent**
Une distinction posée par Anthropic en décembre 2024 :

> "Workflows are systems where LLMs and tools are orchestrated through predefined code paths. Agents [...] dynamically direct their own processes and tool usage, maintaining control over how they accomplish tasks."
>
> (trad. : « Les workflows sont des systèmes où les LLM et les outils sont orchestrés selon des chemins de code prédéfinis. Les agents [...] dirigent dynamiquement leurs propres processus et leur usage des outils, gardant la maîtrise de la manière dont ils accomplissent les tâches. »)
>
> — [Anthropic, "Building Effective Agents"](https://www.anthropic.com/engineering/building-effective-agents)
