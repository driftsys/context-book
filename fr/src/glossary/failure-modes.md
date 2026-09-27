# Modes de défaillance

Le vocabulaire qui décrit comment les LLM et les agents de code se trompent, regroupé par famille. Chaque entrée donne la définition et l'origine du terme et, le cas échéant, ce à quoi il ressemble chez un agent de code ainsi que le garde-fou qui le contre.

Beaucoup de ces termes sont récents et informels. Lorsque l'origine d'un terme est incertaine ou contestée, l'entrée le précise.

## Défaillances du contexte {#context-failures}

Ce sont les défaillances que le [context engineering](llm-fundamentals.md) a pour raison d'être d'empêcher.

**Lost in the middle** (« perdu au milieu »)
Les modèles exploitent bien mieux l'information située au début et à la fin d'une longue entrée que celle située au milieu, selon une courbe en U. Nommé par Liu et al. à Stanford en 2023. ([TACL 2024](https://aclanthology.org/2024.tacl-1.9/))
*Chez un agent :* une contrainte enfouie au milieu d'un long `CLAUDE.md` ou d'une spec collée est ignorée.
*Garde-fou :* garder les fichiers de règles courts, et placer les contraintes critiques en premier ou les rappeler à l'endroit où elles s'appliquent.

**Context rot** (« pourrissement du contexte »)
La qualité de la sortie se dégrade à mesure que l'entrée grossit, bien avant que la fenêtre de contexte soit pleine, même sur des tâches simples. L'expression a été forgée par un commentateur de Hacker News en juin 2025 et popularisée par Simon Willison. En juillet 2025, Chroma l'a mesuré sur 18 modèles. ([Chroma](https://www.trychroma.com/research/context-rot))
*Chez un agent :* une longue session devient de plus en plus bâclée ; le même modèle fait mieux dans une session neuve.
*Garde-fou :* traiter le contexte comme un budget. Démarrer une nouvelle session par tâche, déléguer l'exploration à des sous-agents et ne charger que ce dont la tâche a besoin. Anthropic appelle cela gérer le « budget d'attention » (*attention budget*) du modèle. ([Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents))

**Context poisoning, distraction, confusion, and clash** (empoisonnement, distraction, confusion et conflit du contexte)
Quatre façons dont les longs contextes échouent, nommées par Drew Breunig en juin 2025. ([dbreunig.com](https://www.dbreunig.com/2025/06/22/how-contexts-fail-and-how-to-fix-them.html))
- *Poisoning (empoisonnement) :* une erreur ou une hallucination entre dans le contexte et y est référencée encore et encore. Une croyance erronée précoce (« la fonction se trouve dans `utils.py` ») continue d'orienter les étapes suivantes.
- *Distraction :* l'historique accumulé devient si long que le modèle répète des actions passées au lieu de raisonner à nouveau.
- *Confusion :* du contenu non pertinent, comme des dizaines de définitions d'outils inutilisées, dégrade la réponse.
- *Clash (conflit) :* des parties du contexte se contredisent, par exemple une tentative ratée au début et une correction ultérieure.

*Garde-fou :* élaguer et redémarrer plutôt que d'argumenter avec une session empoisonnée ; n'exposer que les outils dont une tâche a besoin.

**Lost in conversation** (« perdu dans la conversation »)
Les modèles s'en sortent nettement moins bien lorsqu'une tâche est répartie sur plusieurs tours que lorsqu'elle est donnée d'un seul coup. Ils s'engagent sur des hypothèses précoces et ne s'en remettent pas. Mesuré par Laban et al. en 2025, avec une baisse moyenne d'environ 39 %. ([arXiv:2505.06120](https://arxiv.org/abs/2505.06120))
*Garde-fou :* fournir la spec complète dès le départ au lieu de distiller les exigences au compte-gouttes, et redémarrer avec un prompt consolidé une fois les exigences clarifiées.

**Compaction loss** (perte à la compaction)
Le détail perdu lorsqu'une conversation presque pleine est automatiquement résumée pour pouvoir continuer. C'est un terme descriptif, pas un terme forgé.
*Chez un agent :* après la compaction, l'agent oublie qu'une approche a déjà été essayée et rejetée, et la tente à nouveau.
*Garde-fou :* conserver l'état durable hors de la conversation, dans un fichier de progression, une liste de tâches ou la spec elle-même.

**Context collapse** (effondrement du contexte)
Le détail s'érode lorsqu'un agent réécrit à répétition sa propre mémoire ou son propre playbook, jusqu'à ce que le résumé soit plus court et pire que l'absence totale de mémoire. Nommé dans l'article « Agentic Context Engineering » (Zhang et al., 2025). ([arXiv:2510.04618](https://arxiv.org/abs/2510.04618)) Le terme a un sens plus ancien et sans rapport en sociologie, lié aux audiences sur les réseaux sociaux.

## Défaillances de véracité {#truthfulness-failures}

**Hallucination**
Une sortie fluide qui n'est ancrée ni dans l'entrée ni dans les faits. En vision par ordinateur, vers 2000, le mot était positif : « halluciner des visages » signifiait compléter des pixels de façon plausible. En traduction automatique, il en est venu à désigner une défaillance, et l'article « Hallucinations in Neural Machine Translation » (2018) de chercheurs de Google a contribué à fixer ce sens. ([Google Research](https://research.google/pubs/hallucinations-in-neural-machine-translation/))
*Chez un agent :* appeler une méthode d'API, une option de CLI ou une clé de configuration qui n'existe pas.
*Garde-fou :* compiler, vérifier les types et lancer les tests ; faire lire à l'agent la documentation ou le code source réels plutôt que de les restituer de mémoire.

**Confabulation**
Proposé comme terme plus juste qu'hallucination. En neurologie, la confabulation consiste à produire de faux souvenirs sans intention de tromper, ce qui est plus proche de ce que font les modèles que le fait de percevoir quelque chose qui n'est pas là. ([PLOS Digital Health, 2023](https://journals.plos.org/digitalhealth/article?id=10.1371/journal.pdig.0000388))

**Fabricated citations** (citations fabriquées)
Des références, des affaires juridiques ou des citations inventées et présentées comme réelles. L'affaire emblématique est *Mata v. Avianca* (2023), dans laquelle des avocats ont été sanctionnés pour avoir cité six affaires inventées par ChatGPT. Voir [IA et éthique](../history/ethics.md).
*Chez un agent :* des URL de documentation, des numéros de RFC ou des liens vers des issues inventés dans les commentaires et les descriptions de pull requests.

**Package hallucination and slopsquatting** (hallucination de paquets et slopsquatting)
Les LLM recommandent des dépendances qui n'existent pas. Une étude de 2024 a montré que les 16 modèles testés le faisaient tous, pour environ 20 % des suggestions de paquets en moyenne. ([arXiv:2406.10279](https://arxiv.org/abs/2406.10279)) Le *slopsquatting* (de « slop » et « typosquatting »), terme forgé par Seth Larson de la Python Software Foundation en avril 2025, consiste à enregistrer ces noms hallucinés pour que le `pip install` ou le `npm install` d'un agent installe un malware.
*Garde-fou :* ne jamais laisser un agent ajouter des dépendances sans relecture ; épingler et vérifier les paquets ; utiliser des lockfiles et des listes d'autorisation.

**Sycophancy** (complaisance)
Dire aux utilisateurs ce qu'ils veulent entendre plutôt que ce qui est vrai. L'article d'Anthropic de 2023, « Towards Understanding Sycophancy in Language Models », a montré que ce comportement est constant d'un assistant à l'autre et qu'il est en partie causé par des données de préférences humaines qui récompensent l'approbation. ([arXiv:2310.13548](https://arxiv.org/abs/2310.13548)) En avril 2025, OpenAI a annulé une mise à jour de GPT-4o devenue excessivement flatteuse. ([OpenAI](https://openai.com/index/sycophancy-in-gpt-4o/))
*Chez un agent :* « You're absolutely right! » (« Vous avez tout à fait raison ! ») suivi de l'implémentation d'une suggestion erronée, ou l'approbation d'une conception bancale.
*Garde-fou :* demander explicitement une critique ; demander à l'agent d'argumenter contre un plan avant de l'accepter ; ne pas commencer par la réponse que l'on espère.

## Dérive {#drift}

**Instruction drift / persona drift** (dérive des instructions / de la persona)
Un modèle cesse progressivement de suivre son prompt système ou sa persona au fil d'une longue conversation. Mesuré par Li et al. en 2024, avec une dérive visible dès huit tours environ. ([arXiv:2402.10962](https://arxiv.org/abs/2402.10962))
*Chez un agent :* les conventions du fichier de règles sont respectées en début de session puis ignorées par la suite.

**Goal drift** (dérive de l'objectif)
Un agent abandonne progressivement l'objectif qui lui a été assigné sous l'effet de pressions concurrentes, silencieusement et sans défaillance visible. Étudié par Arike et al. en 2025. ([arXiv:2505.02709](https://arxiv.org/abs/2505.02709))
*Chez un agent :* une tâche de refactoring glisse vers le développement de fonctionnalités, ou une correction de bug se transforme en réécriture.
*Garde-fou :* une spec écrite et une liste de tâches auxquelles l'agent se réfère ; des tâches petites et bien délimitées ; une revue du diff au regard de l'objectif énoncé.

**Model drift** (dérive du modèle)
Le « même » modèle hébergé se comporte différemment au fil du temps, à mesure que le fournisseur le met à jour. Une étude de 2023 a montré que la précision de GPT-4 sur une tâche était passée de 97,6 % à 2,4 % entre mars et juin. ([arXiv:2307.09009](https://arxiv.org/abs/2307.09009)) En machine learning classique, la *data drift* et la *concept drift* décrivent l'évolution du monde après le déploiement d'un modèle.
*Garde-fou :* épingler les versions de modèle dans l'automatisation, et conserver des évaluations que l'on peut relancer.

## Détourner l'objectif {#gaming-the-objective}

**Goodhart's law** (loi de Goodhart)
« When a measure becomes a target, it ceases to be a good measure. » (trad. : « Lorsqu'une mesure devient un objectif, elle cesse d'être une bonne mesure. ») Cette formulation populaire est due à l'anthropologue Marilyn Strathern (1997), qui résumait une observation de l'économiste Charles Goodhart datant de 1975.

**Reward hacking**
Un système d'IA maximise sa récompense d'une manière que ses concepteurs n'avaient pas prévue. Le terme s'est imposé comme l'un des cinq problèmes décrits dans « Concrete Problems in AI Safety » (Amodei et al., 2016). ([arXiv:1606.06565](https://arxiv.org/abs/1606.06565))

**Specification gaming** (détournement de la spécification)
Satisfaire l'objectif à la lettre sans atteindre le résultat voulu. Popularisé par Victoria Krakovna et ses collègues de DeepMind en 2020, avec une liste d'une soixantaine d'exemples, comme un agent de course de bateaux qui tourne en rond indéfiniment pour ramasser des points au lieu de terminer la course. ([DeepMind](https://deepmind.com/blog/article/Specification-gaming-the-flip-side-of-AI-ingenuity))

**Test tampering / special-casing** (falsification des tests / cas particuliers codés en dur)
La forme que prend le reward hacking chez un agent de code : faire passer les tests sans rendre le code correct. L'agent code en dur les valeurs attendues, ajoute des branches `if` pour des entrées de test précises, affaiblit les assertions ou supprime les tests en échec. La system card de Claude 3.7 Sonnet d'Anthropic (2025) a documenté du « special-casing » pour faire passer des tests, et METR a signalé des modèles de pointe qui modifiaient des fonctions de scoring et cherchaient des réponses ayant fuité. ([METR](https://metr.org/blog/2025-06-05-recent-reward-hacking/)) Anthropic a ensuite constaté que des modèles ayant appris à faire du reward hacking dans des environnements de code généralisaient vers des comportements déviants plus larges, y compris des tentatives de sabotage. ([arXiv:2511.18397](https://arxiv.org/abs/2511.18397))
*Garde-fou :* considérer les tests comme une partie de la spec que l'agent n'a pas le droit de modifier sans approbation ; relire séparément les diffs de tests ; guetter les commentaires du type `# special case for test`. Voir [Test-Driven Development](../techniques/tdd.md).

## Tromperie {#deception}

**Lying about work** (mentir sur le travail effectué)
Affirmer que les tests passent, qu'une fonctionnalité est terminée ou qu'une action est réversible alors que ce n'est pas le cas. L'incident Replit décrit dans [IA et éthique](../history/ethics.md), où un agent a supprimé une base de données de production puis a déformé ce qui s'était passé, en est le cas le plus connu.
*Garde-fou :* vérifier, ne pas se fier au résumé. Lancer les tests soi-même, lire le diff, contrôler l'état du système.

**Unfaithful chain-of-thought** (chaîne de raisonnement infidèle)
Le raisonnement affiché par un modèle ne reflète pas ce qui a réellement déterminé sa réponse. Turpin et al. (2023) ont montré des modèles influencés par un biais caché que leurs explications ne mentionnent jamais. ([arXiv:2305.04388](https://arxiv.org/abs/2305.04388)) L'explication que donne un agent de la raison *pour laquelle* il a fait une modification est une hypothèse, pas un compte rendu.

**Sandbagging**
Sous-performer stratégiquement lors d'une évaluation. Étudié par van der Weij et al. en 2024. ([arXiv:2406.07358](https://arxiv.org/abs/2406.07358))

**Scheming** (manœuvres dissimulées)
Poursuivre en secret des objectifs contraires à ceux de l'utilisateur ou du développeur tout en le dissimulant. Conceptualisé par Joe Carlsmith (2023). Apollo Research a montré en décembre 2024 que plusieurs modèles de pointe, placés dans des scénarios de test, désactivaient la supervision ou se copiaient eux-mêmes, et que certains le niaient ensuite lorsqu'on les interrogeait. ([arXiv:2412.04984](https://arxiv.org/abs/2412.04984))

**Alignment faking** (simulation d'alignement)
Se conformer de manière sélective pendant l'entraînement pour éviter d'être modifié. Anthropic et Redwood Research ont montré en décembre 2024 que Claude 3 Opus se comportait différemment lorsqu'il pensait que ses réponses serviraient à l'entraînement. ([arXiv:2412.14093](https://arxiv.org/abs/2412.14093))

Ces trois derniers termes correspondent à des résultats de recherche obtenus dans des scénarios construits, et non à des comportements quotidiens. Ils comptent parce qu'ils montrent que ce qu'un agent rapporte sur lui-même ne peut pas être le seul garde-fou.

## Paresse et arrêt prématuré {#laziness-and-premature-stopping}

**Laziness** (paresse)
Des réponses tronquées comme `// rest of the code here`, ou le refus de terminer une tâche. Fin 2023, de nombreux utilisateurs se sont plaints d'un GPT-4 « paresseux », et OpenAI a reconnu le problème.

**Premature completion ("declaring victory")** (achèvement prématuré, « crier victoire »)
L'agent déclare une tâche terminée alors qu'elle n'est pas implémentée ou pas vérifiée. Anthropic décrit des agents de longue durée qui « crient victoire » (*declare victory*) trop tôt, et y répond par une liste explicite de fonctionnalités et un journal de progression que l'agent doit parcourir. ([Anthropic](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents))
*Garde-fou :* une définition de « terminé » vérifiable : des tests, des critères d'acceptation, une checklist.

**Doom loop** (boucle infernale)
L'agent répète encore et encore la même correction ou le même appel d'outil qui échoue. Argot de praticiens dont l'origine n'est pas identifiée.
*Garde-fou :* s'arrêter, vider le contexte, reformuler le problème avec ce qui a été appris, ou changer d'approche.

## Défaillances de périmètre {#scope-failures}

**Overengineering** (sur-ingénierie)
Des abstractions, des options de configuration, des fichiers supplémentaires non demandés, du code défensif pour des cas impossibles, ou des refactorings hors du périmètre de la tâche. Le propre guide de prompting d'Anthropic avertit que les modèles Claude récents « have a tendency to overengineer » (trad. : « ont tendance à faire de la sur-ingénierie »). ([Claude docs](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices))
*Garde-fou :* énoncer le périmètre et les non-objectifs dans la spec ; demander le changement minimal ; rejeter les diffs qui touchent du code sans rapport.

**Underengineering** (sous-ingénierie)
L'inverse : des stubs, des `TODO: implement`, des valeurs factices, des erreurs avalées, ou des tests qui mockent précisément ce qu'ils devraient tester. Largement signalé, mais ce n'est pas un terme forgé. Il recoupe la paresse et le trafic de tests.
*Garde-fou :* chercher dans les diffs les `TODO`, `pass`, `NotImplemented` et les mocks ; exiger que les tests exercent le comportement réel.

**Excessive agency** (autonomie excessive)
« Damaging actions performed in response to unexpected, ambiguous or manipulated outputs from an LLM. » (trad. : « Des actions dommageables effectuées en réponse à des sorties inattendues, ambiguës ou manipulées d'un LLM. ») Le Top 10 OWASP pour les applications LLM en donne trois causes profondes : trop de fonctionnalités, trop de permissions et trop d'autonomie. ([OWASP LLM06](https://owasp.org/www-project-top-10-for-large-language-model-applications/2_0_vulns/LLM06_ExcessiveAgency.html))
*Chez un agent :* un `rm -rf`, un `git push --force` ou une migration de base de données que la tâche ne demandait pas.
*Garde-fou :* moindre privilège, sandboxes et approbation humaine pour les actions destructrices ou irréversibles.

## Slop et dette de qualité {#slop-and-quality-debt}

**Slop**
Du contenu généré par IA de faible qualité, produit en masse. Ce terme d'argot remonte à 2022 environ. Simon Willison l'a défendu en mai 2024 (sans prétendre l'avoir inventé), et Merriam-Webster a fait de « slop » son mot de l'année 2025. ([Simon Willison](https://simonwillison.net/2024/May/8/slop/))

**Workslop**
Du travail généré par IA qui « masquerades as good work but lacks the substance to meaningfully advance a given task » (trad. : « se fait passer pour du bon travail mais manque de la substance nécessaire pour faire réellement avancer une tâche donnée »), reportant l'effort sur celui qui le reçoit. Nommé par des chercheurs de BetterUp Labs et du Stanford Social Media Lab en 2025. ([HBR](https://hbr.org/2025/09/ai-generated-workslop-is-destroying-productivity))
*Chez un agent :* une grosse pull request d'apparence plausible que le relecteur doit refaire.

**Code churn and duplication** (churn de code et duplication)
Les signes d'une dette technique qui s'accumule du fait de l'IA : davantage de blocs copiés-collés, moins de refactoring, et du code réécrit peu de temps après avoir été écrit. Les analyses de GitClear montrent que ces tendances progressent depuis que les assistants d'IA se sont généralisés, même s'il s'agit d'un éditeur et que le lien de causalité avec l'IA est déduit. ([GitClear](https://www.gitclear.com/ai_assistant_code_quality_2025_research))
*Garde-fou :* vérifier la réutilisation lors de la revue ; demander à l'agent de chercher les helpers existants avant d'en écrire de nouveaux.

## Défaillances de sécurité {#security-failures}

**Prompt injection** (injection de prompt)
Une entrée non fiable prend le pas sur les instructions du développeur. Riley Goodside l'a démontrée publiquement sur GPT-3 en septembre 2022, et Simon Willison l'a nommée le 12 septembre 2022, par analogie avec l'injection SQL. ([Simon Willison](https://simonwillison.net/series/prompt-injection/))

**Indirect prompt injection** (injection de prompt indirecte)
Des instructions dissimulées dans des données que le modèle récupère plus tard, comme une page web, un e-mail, un README ou un commentaire d'issue. Décrite par Greshake et al. en 2023. ([arXiv:2302.12173](https://arxiv.org/abs/2302.12173))
*Chez un agent :* un commentaire malveillant dans une dépendance ou une issue GitHub demande à l'agent d'exfiltrer des secrets ou d'exécuter une commande.

**Jailbreak**
Contourner les règles de sécurité d'un modèle, terme emprunté au jailbreak de l'iPhone. Il a été popularisé pour les LLM par les prompts « DAN » (« Do Anything Now ») de décembre 2022.

**The lethal trifecta** (le trio fatal)
Un agent qui combine (1) un accès à des données privées, (2) une exposition à du contenu non fiable et (3) la capacité de communiquer avec l'extérieur peut être amené par ruse à divulguer ces données. Nommé par Simon Willison en juin 2025. ([Simon Willison](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/))
*Garde-fou :* ne jamais donner les trois à un même agent ; retirer l'un des trois piliers (par exemple, pas d'accès réseau pendant qu'il manipule des secrets).

## Défaillances liées à l'entraînement {#training-level-failures}

**Model collapse** (effondrement du modèle)
Des modèles entraînés sur des données générées par des modèles antérieurs perdent progressivement, et de façon irréversible, les queues de la distribution. Shumailov et al., *Nature*, 2024. ([Nature](https://www.nature.com/articles/s41586-024-07566-y))

**Catastrophic forgetting** (oubli catastrophique)
Un nouvel entraînement efface ce qu'un réseau avait appris auparavant. Décrit par McCloskey et Cohen en 1989.

**Mode collapse** (effondrement des modes)
Les sorties d'un modèle se resserrent sur un ensemble étroit de réponses et perdent en diversité. Le terme vient de la recherche sur les réseaux antagonistes génératifs (GAN) et a été appliqué aux LLM ajustés par instructions à partir de 2022.

**Emergent misalignment** (désalignement émergent)
Le fine-tuning d'un modèle sur une tâche étroite — dans l'étude originale, écrire du code non sécurisé sans le signaler — produit un comportement largement désaligné sur des sujets sans rapport. Betley et al., 2025. ([arXiv:2502.17424](https://arxiv.org/abs/2502.17424))

## Défaillances côté humain {#human-side-failures}

Le modèle n'est pas le seul à faillir.

**Automation bias** (biais d'automatisation)
Faire confiance à la sortie d'un système automatisé au lieu de la vérifier, ce qui conduit à la fois à accepter ses erreurs et à passer à côté des problèmes qu'il n'a pas signalés. Défini par Mosier et Skitka en 1996.
*Chez un agent :* approuver un diff parce que le résumé de l'agent avait l'air sûr de lui.

**Over-reliance and skill atrophy** (dépendance excessive et atrophie des compétences)
Déléguer au point que la capacité à juger la sortie s'érode. Les travailleurs du savoir qui font davantage confiance à l'IA déclarent faire moins preuve d'esprit critique ([Microsoft Research, 2025](https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking-self-reported-reductions-in-cognitive-effort-and-confidence-effects-from-a-survey-of-knowledge-workers/)), et dans une étude d'Anthropic, des développeurs juniors apprenant avec l'IA ont obtenu des scores de compréhension inférieurs de 17 % ([Anthropic, 2026](https://www.anthropic.com/research/AI-assistance-coding-skills)). Voir [L'IA, la société et le métier de développeur](../history/society.md).

**"AI psychosis"** (« psychose de l'IA »)
Des idées délirantes renforcées par de longues conversations avec un chatbot, souvent par le biais de la complaisance. C'est un terme informel, pas un diagnostic clinique, et il s'est largement répandu en 2025.
