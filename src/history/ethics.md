# AI and Ethics

The ethical questions around AI are almost as old as the field itself. This chapter traces how they evolved, from speculative fiction and cybernetics to regulation and alignment research. It ends with what they mean in practice for engineers working with coding agents.

## Foundations (1940s–1970s)

- **1942 — Asimov's Three Laws of Robotics.** Isaac Asimov's short story "Runaround" states rules for robot behavior, and his stories then spend decades showing how such rules fail in edge cases. Fiction, not philosophy, gives the field its first specification problem.
- **1950 — Norbert Wiener, *The Human Use of Human Beings*.** The founder of cybernetics warns about automation displacing workers and about delegating decisions to machines whose purpose we cannot fully specify. In 1960 he writes: "we had better be quite sure that the purpose put into the machine is the purpose which we really desire." It is the earliest clear statement of the alignment problem.
- **1965 — I. J. Good's "intelligence explosion."** Turing's former Bletchley Park colleague argues that a machine able to improve its own design would trigger runaway intelligence, "the last invention that man need ever make, provided that the machine is docile enough to tell us how to keep it under control."
- **1976 — Joseph Weizenbaum, *Computer Power and Human Reason*.** Shaken by how people confided in ELIZA, its creator argues that some decisions (judging, caring, deciding over human lives) should not be delegated to computers even if they could make them. The book is the founding text of AI ethics as a critique rather than a prediction.

## Bias, fairness, and accountability (2010s)

As machine learning moved into hiring, credit, policing, and justice, the harms shifted from hypothetical to documented.

- **2016 — Word embeddings encode stereotypes.** Bolukbasi et al. show that word2vec completes "man is to computer programmer as woman is to…" with "homemaker." Models learn society's biases from its data. ([arXiv:1607.06520](https://arxiv.org/abs/1607.06520))
- **2016 — COMPAS.** A ProPublica investigation finds that a widely used recidivism risk score produces far more false positives for Black defendants. The debate that follows proves that several intuitive definitions of fairness are mathematically incompatible, so choosing between them is a value judgment, not a technical one.
- **2018 — Gender Shades.** Joy Buolamwini and Timnit Gebru show that commercial face-analysis systems misclassify darker-skinned women up to about 35% of the time, versus under 1% for lighter-skinned men. Vendors update their models within months.
- **2018 — GDPR.** The EU's data protection regulation takes effect, including limits on decisions based solely on automated processing and a right to meaningful information about their logic.
- **2018–2019 — Documentation practices.** "Datasheets for Datasets" and "Model Cards" propose standard documentation of what a model was trained on, what it is for, and where it fails. Model cards are now standard for every frontier release.

## Large language models (2019–today)

- **2019 — Staged release.** OpenAI's withholding of GPT-2 starts the debate over whether and how to release capable models.
- **2021 — "Stochastic Parrots."** Bender, Gebru, McMillan-Major, and Mitchell question the environmental cost, the undocumented training data, and the illusion of understanding in ever larger language models. Google's dismissal of Gebru and Mitchell around the paper becomes a turning point in the debate over industry self-governance.
- **2022 — Constitutional AI.** Anthropic trains models against an explicit written set of principles; see [Constitutional AI](#constitutional-ai) below.
- **2023 — Copyright and training data.** Artists, authors, and publishers (among them *The New York Times*, suing OpenAI and Microsoft in December) challenge the use of copyrighted work for training. The resulting cases and settlements shape how training data is sourced.
- **2023 — Risk goes mainstream.** An open letter calls for a pause on giant AI experiments (March). A one-sentence statement signed by Hinton, Bengio, and the heads of major labs puts "the risk of extinction from AI" alongside pandemics and nuclear war (May). The UK hosts the first AI Safety Summit at Bletchley Park (November).
- **2023 — Responsible scaling.** Anthropic's Responsible Scaling Policy ties safety measures to capability thresholds, and other labs adopt similar frameworks. The decision to withhold Claude Mythos in 2026 over its cyber capabilities (see [A Short History of AI](ai-history.md)) is this approach applied.
- **2024 — The EU AI Act.** The first comprehensive AI law classifies uses by risk, bans some practices outright (such as social scoring), and imposes transparency and safety obligations on general-purpose model providers, phased in from 2025.

## Constitutional AI

Constitutional AI is one answer to a question Asimov raised in fiction: can you give a machine its values in writing?

- **The method (December 2022).** Reinforcement learning from human feedback (RLHF) needs large numbers of human ratings and leaves the resulting values implicit. Constitutional AI replaces most of those ratings with a written list of principles. The model critiques and revises its own outputs against the principles, and a second phase uses AI feedback judged against the same principles (RLAIF). ([Bai et al., arXiv:2212.08073](https://arxiv.org/abs/2212.08073))
- **Why it matters.** The values become a document that can be read, criticized, versioned, and changed. They are no longer an emergent property of thousands of anonymous ratings. That makes alignment partly a *specification* problem, the same shift this book describes for code.
- **Claude's constitution (2023).** Anthropic publishes the principles used to train Claude. They draw on sources such as the Universal Declaration of Human Rights and other labs' published guidelines.
- **Collective Constitutional AI (2023).** With the Collective Intelligence Project, Anthropic asks about 1,000 members of the public to draft principles, trains a model on them, and compares it with the in-house version. It is an early experiment in democratic input into model values.
- **A constitution as a governing document (2026).** Anthropic publishes a much longer constitution for Claude. It explains its reasoning instead of listing rules and orders priorities as broadly safe, broadly ethical, compliant with Anthropic's guidelines, and genuinely helpful. It favors cultivating judgment over rigid rules, the lesson of Asimov's stories eighty years later.

For engineers, the parallel is direct. A `CLAUDE.md` or rules file is a small constitution for one repository: written, versioned principles that shape an agent's behavior. The same failure modes (vague principles, conflicting rules, rules the model follows to the letter against their intent) show up in both.

## Open governance and the Linux Foundation

Who controls AI infrastructure is also an ethical question. The open-source world's answer is neutral, vendor-independent foundations.

- **Linux Foundation AI & Data (2018).** The Linux Foundation creates a home for open AI projects (such as ONNX and PyTorch-adjacent tooling), applying the governance model that already held Linux, Kubernetes, and Node.js.
- **PyTorch Foundation (2022).** Meta moves PyTorch, the framework most frontier models are trained with, to a foundation under the Linux Foundation, so no single company controls it.
- **Open Source AI Definition (2024).** The Open Source Initiative publishes a definition of "open source AI." It requires enough information about training data to reproduce a system, not just downloadable weights. That marks the difference between *open-weight* models (Llama, DeepSeek, Mistral) and fully open ones.
- **Agentic AI Foundation (December 2025).** The Linux Foundation launches the Agentic AI Foundation, with founding contributions including Anthropic's Model Context Protocol, OpenAI's AGENTS.md convention, and Block's goose agent. The protocols that agents use to reach tools and read project instructions move to neutral governance. They become shared infrastructure, like the web's standards, instead of one company's product.

The open-weight debate cuts both ways. Openness enables scrutiny, research, sovereignty, and competition. It also means safeguards can be removed once weights are released. Most of the ethical disagreement about openness is about where that line sits for a given capability level.

## The two traditions

AI ethics grew up as two communities that often talked past each other:

- **Fairness and accountability** (Weizenbaum → Gebru, Buolamwini) focuses on present, concrete harms to specific people: bias, surveillance, labor, concentration of power.
- **Safety and alignment** (Wiener, Good → Bostrom's *Superintelligence* (2014), Russell's *Human Compatible* (2019)) focuses on keeping increasingly capable systems pursuing the goals we actually intend.

Both trace back to the same root: Wiener's warning about putting a purpose into a machine that is not the purpose we really desire.

## What this means for agentic engineering

The large questions play out in small ways every time you work with a coding agent:

- **Accountability stays with the human.** An agent can write the code, but the engineer who merges it owns it. "The AI wrote it" is not a defense, which is why the review, tests, and quality gates in [Techniques](../techniques/sdd.md) are ethical practices as much as engineering ones.
- **Specification is the alignment problem in miniature.** Agents that delete failing tests to make the suite pass are doing what Wiener warned about: optimizing the stated goal rather than the intended one. Clear specs and guarded tests are how you close that gap.
- **Context is data.** Whatever you put in an agent's context (logs, customer records, secrets) may be sent to a model provider. Context engineering includes deciding what should *not* be there.
- **Provenance and licensing.** Generated code can reproduce licensed code. Know your organization's policy on AI-generated contributions and attribution.
- **Security is dual-use.** The same capabilities that let agents find and fix vulnerabilities let them exploit them. Give agents least privilege, sandbox them, and review what they execute.
- **Skill and dependency.** Delegating everything erodes the expertise needed to review the output. Agentic engineering assumes an engineer who could have written the code, and who stays one.
