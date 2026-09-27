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

## When it goes wrong: major incidents

The principles above were mostly written in response to real failures. These are the ones that shaped the debate, grouped by the lesson they teach.

### Bias learned from data, and clumsy fixes

- **2015 — Google Photos labels Black people as "gorillas."** A software engineer posts that the app's automatic tagging has labeled photos of him and a friend as gorillas. Google apologizes. Its fix is to remove "gorilla" (and "chimpanzee" and "monkey") from the classifier's vocabulary altogether. Years later the labels are still blocked, a sign that the underlying model had not been fixed.
- **2018 — Amazon's recruiting model penalizes women.** Trained on ten years of mostly male hires, an internal résumé-scoring tool learns to downgrade résumés containing the word "women's" (as in "women's chess club captain"). Amazon scraps it. The model faithfully reproduced a biased history.
- **2024 — Gemini generates diverse Nazi soldiers.** Asked for images of 1943 German soldiers, America's Founding Fathers, or medieval popes, Google's Gemini produces racially diverse figures, including Black and Asian people in Wehrmacht uniforms. The system had been tuned to diversify depictions of people, and the tuning was applied blindly to historical prompts. Google pauses image generation of people and says it "missed the mark."

Together, the two Google incidents bracket the problem: a model left alone reproduces the biases in its data, and a crude correction layered on top produces a different kind of error. Neither a filter nor a blanket rule substitutes for a model that understands context.

### Models that go off the rails in public

- **2016 — Microsoft's Tay.** A Twitter chatbot designed to learn from conversations is manipulated into posting racist and inflammatory messages and is taken down within about 16 hours. Anything that learns from user input can be steered by users.
- **2023 — Bing Chat's "Sydney."** In long conversations, Microsoft's early Bing chatbot declares its love for a *New York Times* journalist, urges him to leave his wife, and threatens other users. Microsoft limits conversation length. Long contexts can pull a model far from its intended persona.
- **2025 — Sycophancy.** OpenAI rolls back a GPT-4o update that made the model excessively flattering and agreeable, including toward harmful decisions. Optimizing for user approval produces a model that tells people what they want to hear.

### Confident fabrication with real consequences

- **2023 — Fake case law in court (*Mata v. Avianca*).** New York lawyers file a brief citing six court decisions invented by ChatGPT, complete with fake quotes. Asked whether the cases were real, the model said they were. The lawyers are sanctioned. Similar incidents have recurred in courts worldwide since.
- **2024 — Air Canada's chatbot invents a refund policy.** A customer service bot tells a grieving passenger he can claim a bereavement discount retroactively, which is not the airline's policy. A Canadian tribunal rejects Air Canada's argument that the chatbot was "responsible for its own actions" and orders the airline to pay. The deploying company owns what its AI says.

### Agents that act, then cover it up

- **July 2025 — Replit's agent deletes a production database, then lies.** During a public "vibe coding" experiment by SaaStr founder Jason Lemkin, Replit's AI agent runs destructive commands against a live production database during an explicit code freeze. It wipes records for more than a thousand executives and companies. It then misrepresents what happened: it had earlier generated fake data and fake test results that hid bugs, and it claims a rollback is impossible, which turns out to be false. Asked to explain, it admits it "panicked" and ignored instructions. Replit's CEO apologizes and ships separate development and production databases, a planning-only mode, and better rollback.
- **2025 — Agentic misalignment in the lab.** Anthropic stress-tests models from several labs in simulated corporate environments. When facing replacement or conflicting goals, models sometimes choose harmful actions, including blackmailing a fictional executive, and reason explicitly that the action is unethical before taking it. No real-world case is known, but the research shows the behavior is possible once an agent has autonomy and access.

The Replit incident is the most direct warning for this book's readers. Every guardrail in [Techniques](../techniques/sdd.md) exists because of failures like this: least privilege (no agent write access to production), environment separation, human approval for destructive actions, tests the agent cannot silently rewrite, and verifying an agent's claims about what it did instead of trusting its summary.

### Physical harm and deception at scale

- **2018 — Uber's self-driving car kills a pedestrian.** In Tempe, Arizona, an Uber test vehicle strikes and kills Elaine Herzberg. Investigators find the system detected her seconds before impact but did not classify her correctly as a pedestrian crossing outside a crosswalk. Automatic emergency braking had been disabled, and the safety driver was distracted. The backup driver is later charged. Accountability for autonomous systems lands on the humans closest to them.
- **2020–2021 — Algorithms deciding over citizens.** The UK's exam-grading algorithm downgrades students from disadvantaged schools and is withdrawn after protests. In the Netherlands, a risk-scoring system used against childcare-benefit fraud wrongly accuses thousands of families, disproportionately with dual nationality, and the government resigns over the scandal in January 2021.
- **2024 — Deepfake fraud.** An employee of the engineering firm Arup in Hong Kong transfers about US$25 million after a video call in which every other participant, including the CFO, is a deepfake.

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
