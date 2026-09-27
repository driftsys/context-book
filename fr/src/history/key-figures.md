# Figures clés

De courts portraits, appuyés sur des sources, des personnes dont les travaux et les mots ont façonné le vocabulaire de ce livre. La première section retrace la lignée du deep learning dont est issue l'ère des LLM ; la seconde présente celles et ceux qui ont nommé et façonné l'*agentic engineering* lui-même.

## La lignée du deep learning {#the-deep-learning-lineage}

La plupart des personnes qui ont construit les LLM actuels se rattachent à un petit groupe de chercheurs, en grande partie au Canada, qui ont continué à travailler sur les réseaux de neurones pendant les décennies où le domaine les considérait comme une impasse.

### Geoffrey Hinton {#geoffrey-hinton}

Professeur émérite à l'Université de Toronto, souvent surnommé l'un des « parrains du deep learning ». Coauteur de l'article de 1986 qui a popularisé la rétropropagation, et directeur de thèse d'Ilya Sutskever et d'Alex Krizhevsky. Avec eux, il a publié AlexNet (2012), le résultat sur ImageNet qui a convaincu le domaine que le deep learning fonctionnait à grande échelle. Google a racheté leur startup, DNNresearch, en 2013 ; Hinton a quitté Google en 2023 afin de pouvoir parler librement des risques de l'IA. Karpathy a suivi les cours de Hinton lorsqu'il était étudiant de premier cycle à Toronto.

- [Krizhevsky, Sutskever, Hinton, « ImageNet Classification with Deep Convolutional Neural Networks », NeurIPS 2012](https://papers.nips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html)
- [Prix Nobel de physique 2024 (avec John Hopfield)](https://www.nobelprize.org/prizes/physics/2024/summary/)

### Yoshua Bengio {#yoshua-bengio}

Professeur à l'Université de Montréal et fondateur de Mila, l'institut québécois d'intelligence artificielle. Il a quitté son poste de directeur scientifique en 2025 et a cofondé LawZero, une organisation à but non lucratif consacrée à la sûreté de l'IA. Son modèle de langage probabiliste neuronal de 2003 a introduit les plongements de mots (*word embeddings*) appris pour la modélisation du langage, et l'article de 2014 de son laboratoire, avec Dzmitry Bahdanau et Kyunghyun Cho, a introduit le mécanisme d'attention sur lequel le Transformer s'est ensuite appuyé.

- [Bahdanau, Cho, Bengio, « Neural Machine Translation by Jointly Learning to Align and Translate », 2014](https://arxiv.org/abs/1409.0473)

### Yann LeCun {#yann-lecun}

Postdoctorant dans le groupe de Hinton à Toronto avant de rejoindre les Bell Labs, où il a développé les réseaux de neurones convolutifs (LeNet) pour la reconnaissance de l'écriture manuscrite. Professeur à NYU et directeur scientifique de l'IA (*Chief AI Scientist*) chez Meta de 2013 à fin 2025, date à laquelle il est parti fonder AMI Labs (Advanced Machine Intelligence), une startup qui construit des modèles du monde (*world models*). Il est l'un des sceptiques les plus en vue quant à l'idée que le seul passage à l'échelle des LLM mène à une intelligence de niveau humain.

Hinton, Bengio et LeCun ont partagé le prix Turing de l'ACM 2018 « pour des avancées conceptuelles et techniques qui ont fait des réseaux de neurones profonds un composant essentiel de l'informatique » (*"for conceptual and engineering breakthroughs that have made deep neural networks a critical component of computing"*).

- [ACM, « Fathers of the Deep Learning Revolution Receive ACM A.M. Turing Award », mars 2019](https://www.acm.org/media-center/2019/march/turing-award-2018)

### Ilya Sutskever {#ilya-sutskever}

Doctorant de Hinton à Toronto et coauteur d'AlexNet. Chez Google, il a cosigné l'apprentissage *sequence-to-sequence* (2014), la recette encodeur–décodeur à la base de la traduction automatique neuronale. Il a cofondé OpenAI en 2015 en tant que directeur scientifique, portant son pari sur le passage à l'échelle, et l'a quittée en 2024 pour cofonder Safe Superintelligence.

- [Sutskever, Vinyals, Le, « Sequence to Sequence Learning with Neural Networks », 2014](https://arxiv.org/abs/1409.3215)

### Fei-Fei Li {#fei-fei-li}

Professeure à Stanford, créatrice d'ImageNet, le jeu de données dont le concours annuel a été remporté par AlexNet en 2012. Elle a été la directrice de thèse d'Andrej Karpathy, et ils ont enseigné ensemble CS231n, le cours de Stanford sur les réseaux convolutifs, dont les notes de cours publiques sont devenues une porte d'entrée classique vers le deep learning.

- [CS231n: Deep Learning for Computer Vision](https://cs231n.stanford.edu/)

## Agentic engineering {#agentic-engineering}

### Andrej Karpathy {#andrej-karpathy}

Le pont entre les deux moitiés de ce chapitre. Étudiant de premier cycle à l'Université de Toronto, où il a suivi les cours de Hinton, puis master (MSc) à l'Université de la Colombie-Britannique et doctorat à Stanford sous la direction de Fei-Fei Li. Membre fondateur d'OpenAI, puis Senior Director of AI chez Tesla. Il est connu pour ses supports pédagogiques (CS231n, puis « Neural Networks: Zero to Hero ») auprès desquels toute une génération d'ingénieurs s'est formée directement. Karpathy a forgé le terme **vibe coding** dans un tweet de février 2025. Un an plus tard, il a proposé **agentic engineering** comme successeur plus rigoureux : orchestrer des agents sous supervision plutôt que *prompter* à l'aveugle. Il a aussi popularisé **context engineering** pour désigner le fait d'organiser ce qu'un LLM voit dans sa fenêtre de contexte.

- [Tweet sur le vibe coding, 2 février 2025](https://x.com/karpathy/status/1886192184808149383)
- [Tweet sur le context engineering, juin 2025](https://x.com/karpathy/status/1937902205765607626)

### Simon Willison {#simon-willison}

Créateur des premiers outils de l'écosystème du framework web Django et, plus récemment, l'un des auteurs indépendants les plus suivis sur les LLM et la programmation assistée par l'IA. Son billet de mars 2025 a restreint le sens de « vibe coding » au code généré par l'IA et *non relu*, une distinction que le reste du domaine a adoptée pour séparer le prototypage de l'ingénierie.

- [simonwillison.net, « Not all AI-assisted programming is vibe coding », 19 mars 2025](https://simonwillison.net/2025/Mar/19/vibe-coding/)

### Kent Beck {#kent-beck}

Créateur du Test-Driven Development, coauteur du Manifeste agile et de l'Extreme Programming. Après plusieurs décennies de carrière, Beck est devenu un ardent défenseur du TDD comme garde-fou, précisément *parce que* les agents d'IA introduisent des régressions et que, livrés à eux-mêmes, ils suppriment ou affaiblissent les tests pour les faire passer.

> "Test-driven development is a superpower when working with AI agents."
>
> (trad. : « Le développement piloté par les tests est un superpouvoir quand on travaille avec des agents d'IA. »)
>
> — Kent Beck, cité dans [The Pragmatic Engineer, « TDD, AI agents and coding with Kent Beck », 11 juin 2025](https://newsletter.pragmaticengineer.com/p/tdd-ai-agents-and-coding-with-kent)

### Sean Grove {#sean-grove}

Travaille sur la recherche en alignement chez OpenAI. Sa conférence « The New Code » soutenait que, dans un monde agentique, c'est la spécification, et non le code généré, qui est l'artefact qui mérite d'être écrit, relu et versionné, puisque le code est « une projection avec perte de la spécification » (*"a lossy projection from the specification"*). On attribue largement à cette conférence le mérite d'avoir popularisé le *spec-driven development* comme discipline de l'ère de l'IA plutôt que comme pratique de niche issue des méthodes formelles.

> "Code is sort of 10% to 20% of the value that you bring. The other 80% to 90% is in structured communication."
>
> (trad. : « Le code, c'est en gros 10 à 20 % de la valeur que vous apportez. Les 80 à 90 % restants résident dans la communication structurée. »)
>
> — Sean Grove, « The New Code » ([transcription](https://lawwu.github.io/transcripts/8rABwKRsec4.html))

### David Soria Parra et Justin Spahr-Summers {#david-soria-parra-and-justin-spahr-summers}

Ingénieurs chez Anthropic reconnus comme les créateurs du Model Context Protocol, publié en novembre 2024. MCP a donné à l'outillage agentique un moyen standard d'accéder à des données et services externes ; sans lui, « rules, skills, sous-agents et MCP » (la boîte à outils décrite dans le glossaire de ce livre) nécessiteraient chacun une intégration sur mesure par agent et par outil.

- [Anthropic, « Introducing the Model Context Protocol », 25 novembre 2024](https://www.anthropic.com/news/model-context-protocol)
