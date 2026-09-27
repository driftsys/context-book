# Du vibe coding à l'agentic engineering

## 2023 — « L'anglais est le nouveau langage de programmation à la mode » {#2023--english-is-the-hottest-new-programming-language}

Andrej Karpathy, alors chez OpenAI, a soutenu que l'essor des LLM signifiait que l'on commanderait de plus en plus les ordinateurs en langage naturel plutôt que dans un langage de programmation particulier (*"English is the hottest new programming language"*). C'est la prémisse sur laquelle repose tout le reste de cette chronologie.

## 25 novembre 2024 — le Model Context Protocol {#november-25-2024--the-model-context-protocol}

Avant même que l'*agentic engineering* ait un nom, Anthropic a publié en open source la tuyauterie sur laquelle elle allait reposer. MCP a standardisé la manière dont une application d'IA se connecte à des outils et à des sources de données externes, résolvant ce qui était jusque-là un problème d'intégration M×N (M applications × N outils, chaque paire nécessitant un connecteur sur mesure).

> "Today, we're open-sourcing the Model Context Protocol (MCP), a new standard for connecting AI assistants to the systems where data lives."
>
> (trad. : « Aujourd'hui, nous publions en open source le Model Context Protocol (MCP), un nouveau standard pour connecter les assistants d'IA aux systèmes où se trouvent les données. »)
>
> — [Anthropic, « Introducing the Model Context Protocol », 25 novembre 2024](https://www.anthropic.com/news/model-context-protocol)

On décrit couramment MCP comme « l'USB-C de l'IA » : un protocole unique que chaque partie implémente une seule fois, au lieu d'une intégration sur mesure pour chaque paire.

## 19 décembre 2024 — workflows contre agents {#december-19-2024--workflows-vs-agents}

L'équipe d'ingénierie d'Anthropic a publié une définition largement citée qui distingue deux choses que l'on appelait indistinctement « agents » :

> "Workflows are systems where LLMs and tools are orchestrated through predefined code paths. Agents, on the other hand, are systems where LLMs dynamically direct their own processes and tool usage, maintaining control over how they accomplish tasks."
>
> (trad. : « Les workflows sont des systèmes dans lesquels les LLM et les outils sont orchestrés selon des chemins de code prédéfinis. Les agents, en revanche, sont des systèmes dans lesquels les LLM dirigent dynamiquement leurs propres processus et leur usage des outils, en gardant la maîtrise de la manière dont ils accomplissent leurs tâches. »)
>
> — [Anthropic, « Building Effective Agents », 19 décembre 2024](https://www.anthropic.com/engineering/building-effective-agents)

## 2 février 2025 — naissance du terme « vibe coding » {#february-2-2025--vibe-coding-is-coined}

Andrej Karpathy a publié le tweet qui a donné son nom à l'époque :

> "There's a new kind of coding I call 'vibe coding', where you fully give in to the vibes, embrace exponentials, and forget that the code even exists. [...] I just see stuff, say stuff, run stuff, and copy paste stuff, and it mostly works."
>
> (trad. : « Il y a une nouvelle façon de coder que j'appelle le "vibe coding", où l'on s'abandonne complètement aux vibes, où l'on embrasse les exponentielles et où l'on oublie jusqu'à l'existence du code. [...] Je vois des trucs, je dis des trucs, j'exécute des trucs, je copie-colle des trucs, et ça marche la plupart du temps. »)
>
> — [@karpathy sur X, 2 février 2025](https://x.com/karpathy/status/1886192184808149383)

Karpathy l'a qualifié plus tard de « tweet jetable, pensée de sous la douche » (*"a shower of thoughts throwaway tweet"*) : il ne s'attendait pas à ce qu'il donne son nom à tout un mouvement.

## 19 mars 2025 — le terme reçoit une définition plus étroite {#march-19-2025--the-term-gets-a-narrower-definition}

Simon Willison, réagissant à la vitesse à laquelle « vibe coding » en venait à désigner *toute* programmation assistée par l'IA, a proposé une lecture plus stricte :

> "When I talk about vibe coding I mean building software with an LLM without reviewing the code it writes."
>
> (trad. : « Quand je parle de vibe coding, j'entends le fait de construire un logiciel avec un LLM sans relire le code qu'il écrit. »)
>
> — [Simon Willison, « Not all AI-assisted programming is vibe coding (but vibe coding rocks) »](https://simonwillison.net/2025/Mar/19/vibe-coding/)

Cette distinction, entre le vibe coding comme génération *non relue* et l'ingénierie assistée par l'IA comme travail relu et testé, est la ligne de fracture sur laquelle repose tout le reste du vocabulaire du domaine.

## 4 février 2026 — l'« agentic engineering » {#february-4-2026--agentic-engineering}

Un an après son tweet d'origine, Karpathy a publié un bilan rétrospectif et proposé un nouveau terme pour désigner l'état du domaine :

> "'agentic' because the new default is that you are not writing the code directly 99% of the time, you are orchestrating agents who do and acting as oversight — 'engineering' to emphasize that there is an art & science and expertise to it."
>
> (trad. : « "agentic" parce que la nouvelle norme est que, 99 % du temps, vous n'écrivez pas le code directement : vous orchestrez des agents qui l'écrivent et vous assurez la supervision ; "engineering" pour souligner qu'il y a là un art, une science et une expertise. »)
>
> — [Andrej Karpathy, sur X, 4 février 2026](https://x.com/karpathy/status/2019137879310836075)

Il l'a présenté comme le passage d'une expérimentation informelle à une discipline professionnelle : programmer au moyen d'agents LLM devient le mode de travail par défaut, « mais avec davantage de supervision et d'examen critique » (*"except with more oversight and scrutiny"*).

## Où en est le vocabulaire {#where-this-leaves-the-vocabulary}

- **Vibe coding** : *prompter* sans relire, approprié pour des prototypes jetables, risqué en production.
- **Agentic engineering** : orchestrer des agents avec une *spec*, des tests et de la relecture, comme pratique professionnelle par défaut.
- **Context engineering** (Karpathy, juin 2025) : la discipline plus étroite qui consiste à gérer ce qui entre dans la fenêtre de contexte d'un agent ; voir le [Glossaire](../glossary/llm-fundamentals.md) pour la citation exacte.

Les chapitres suivants traitent l'agentic engineering comme la pratique englobante et décrivent les techniques précises (SDD, TDD et contrôle qualité) qui l'empêchent de retomber dans le vibe coding.
