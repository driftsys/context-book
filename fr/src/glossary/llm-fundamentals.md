# Fondamentaux des LLM

**LLM (Large Language Model)** (grand modèle de langage)
Un modèle qui prédit le texte suivant le plus probable à partir de tout ce qui se trouve dans son contexte. Il n'a ni mémoire persistante ni notion intégrée de la vérité — seulement des motifs appris à partir de ses données d'entraînement.

**Context** (contexte)
Tout ce que le modèle peut voir à un instant donné : instructions système, fichiers joints, historique de la conversation, message en cours. Rien de ce qui se trouve hors du contexte n'existe pour le modèle, aussi évident que cela puisse paraître à l'humain dans la boucle.

**Context window** (fenêtre de contexte)
La limite de taille stricte de ce contexte. Une fois dépassée, le contenu le plus ancien est tronqué — silencieusement, du point de vue du modèle.

**Context engineering**
Le terme d'Andrej Karpathy pour désigner la gestion délibérée de ce qui entre dans la fenêtre de contexte, par opposition au « prompt engineering » :

> "Context engineering is the delicate art and science of filling the context window with just the right information for the next step."
>
> (trad. : « Le context engineering est l'art délicat et la science de remplir la fenêtre de contexte avec exactement les bonnes informations pour l'étape suivante. »)
>
> — [Andrej Karpathy, sur X, juin 2025](https://x.com/karpathy/status/1937902205765607626)

**Stateless** (sans état)
Le modèle ne conserve rien d'un tour à l'autre par lui-même ; chaque tour précédent qui compte doit être renvoyé dans le contexte suivant.

**Hallucination**
Le modèle invente une API, une fonction ou un fait d'apparence plausible qui n'existe pas. C'est une conséquence directe du fait qu'il prédit un texte probable plutôt qu'un texte vérifié.

**Drift (ou « slope »)** (dérive)
La divergence progressive d'une longue session d'agent par rapport à l'intention initiale, en l'absence d'une spec stable à laquelle se référer. Plus la session est longue, plus le contexte de travail a été modifié, résumé ou partiellement oublié.
