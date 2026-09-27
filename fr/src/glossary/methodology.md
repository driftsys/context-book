# Termes de méthodologie

**Greenfield**
Un nouveau projet, sans code existant. Le contexte, c'est simplement la spec en cours de rédaction — il n'y a encore rien que l'agent puisse mal comprendre.

**Brownfield**
Une base de code existante. Le contexte, c'est tout ce qu'on parvient à en cartographier — le modèle ne la connaît pas à l'avance et doit se voir fournir (ou découvrir) sa structure, ses conventions et ses contraintes.

**Golden master (characterization test)** (test de caractérisation)
Un test qui capture le comportement observable actuel d'un système *avant* de le refactorer, afin qu'un refactoring qui modifie ce comportement soit détecté même si personne n'avait jamais écrit de spec pour ce comportement.

**Strangler pattern** (pattern de l'étrangleur)
Remplacer un composant legacy progressivement, morceau par morceau, en redirigeant le trafic vers la nouvelle implémentation à mesure que chaque morceau est prêt, plutôt que de réécrire tout le système d'un coup.

**Vibe coding**
Soumettre un prompt à un LLM et accepter sa sortie essentiellement sur la foi, sans relecture attentive. Terme forgé par Andrej Karpathy en février 2025 ; son sens a ensuite été resserré par Simon Willison pour désigner spécifiquement le fait de générer du code *sans le relire* — voir le chapitre [Du vibe coding à l'agentic engineering](../history/timeline.md) pour les deux citations.

**Agentic engineering**
Orchestrer des agents autonomes en les entourant d'une structure de soutien — spec, tests, revue, outillage — comme pratique professionnelle par défaut plutôt que comme raccourci occasionnel. C'est le terme de Karpathy pour ce qu'est devenu le vibe coding une fois que les modèles sous-jacents sont devenus assez fiables pour qu'on leur confie un vrai travail de production, à condition qu'un humain reste dans la boucle en tant que relecteur.

**Cost per accepted change** (coût par changement accepté)
Le coût complet d'un changement mergé produit par un agent : l'appel au modèle, les corrections nécessaires pour y parvenir, le temps passé à le relire, le débogage, la CI et les bugs résiduels partis en production malgré tout — et pas seulement le prix des tokens dépensés pour le générer.
