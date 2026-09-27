# AI and Ethics

The ethical questions around AI are almost as old as the field itself. This chapter traces how they evolved, from speculative fiction and cybernetics to regulation and alignment research. It ends with what they mean in practice for engineers working with coding agents.

## Foundations (1940s–1970s)

- **1942 — Asimov's Three Laws of Robotics.** Isaac Asimov's short story "Runaround" states rules for robot behavior, and his stories then spend decades showing how such rules fail in edge cases. Fiction, not philosophy, gives the field its first specification problem.
- **1950 — Norbert Wiener, *The Human Use of Human Beings*.** The founder of cybernetics warns about automation displacing workers and about delegating decisions to machines whose purpose we cannot fully specify.
- **1960 — Wiener, "Some Moral and Technical Consequences of Automation."** In an article in *Science*, Wiener writes: "we had better be quite sure that the purpose put into the machine is the purpose which we really desire." It is the earliest clear statement of the alignment problem.
- **1965 — I. J. Good's "intelligence explosion."** Turing's former Bletchley Park colleague argues that a machine able to improve its own design would trigger runaway intelligence, "the last invention that man need ever make, provided that the machine is docile enough to tell us how to keep it under control."
- **1976 — Joseph Weizenbaum, *Computer Power and Human Reason*.** Shaken by how people confided in ELIZA, its creator argues that some decisions (judging, caring, deciding over human lives) should not be delegated to computers even if they could make them. The book is the founding text of AI ethics as a critique rather than a prediction.

## Bias, fairness, and accountability (2010s)

As machine learning moved into hiring, credit, policing, and justice, the harms shifted from hypothetical to documented.

- **2016 — Word embeddings encode stereotypes.** Bolukbasi et al. show that word2vec completes "man is to computer programmer as woman is to…" with "homemaker." Models learn society's biases from its data. ([arXiv:1607.06520](https://arxiv.org/abs/1607.06520))
- **2016 — COMPAS.** A ProPublica investigation finds that a widely used recidivism risk score produces far more false positives for Black defendants. The debate that follows proves that several intuitive definitions of fairness are mathematically incompatible, so choosing between them is a value judgment, not a technical one.
- **2018 — Gender Shades.** Joy Buolamwini and Timnit Gebru show that commercial face-analysis systems misclassify darker-skinned women up to about 35% of the time, versus under 1% for lighter-skinned men. Vendors update their models within months.
- **2018 — GDPR.** The EU's data protection regulation takes effect, including limits on decisions based solely on automated processing and a right to meaningful information about their logic.
- **2018–2019 — Documentation practices.** "Datasheets for Datasets" and "Model Cards" propose standard documentation of what a model was trained on, what it is for, and where it fails. Model cards are now standard for most frontier releases.

## Large language models (2019–today)

- **2019 — Staged release.** OpenAI's withholding of GPT-2 starts the debate over whether and how to release capable models.
- **2021 — "Stochastic Parrots."** Bender, Gebru, McMillan-Major, and Mitchell question the environmental cost, the undocumented training data, and the illusion of understanding in ever larger language models. Google's dismissal of Gebru (December 2020) and Mitchell (February 2021) over the paper becomes a turning point in the debate over industry self-governance.
- **2022 — Constitutional AI.** Anthropic trains models against an explicit written set of principles; see [Constitutional AI](#constitutional-ai) below.
- **2023 — Copyright and training data.** Artists, authors, and publishers (among them *The New York Times*, suing OpenAI and Microsoft in December) challenge the use of copyrighted work for training. In *Bartz v. Anthropic* (2025), a US judge rules that training on lawfully acquired books is fair use but lets claims over pirated copies proceed. Anthropic settles the authors' class action for $1.5 billion, about $3,000 per book for roughly 500,000 books. It is the largest copyright settlement in US history, preliminarily approved in September 2025. ([Authors Guild](https://authorsguild.org/advocacy/artificial-intelligence/what-authors-need-to-know-about-the-anthropic-settlement/)) The resulting cases and settlements shape how training data is sourced.
- **2023 — Risk goes mainstream.** An open letter calls for a pause on giant AI experiments (March). A one-sentence statement signed by Hinton, Bengio, and the heads of major labs puts "the risk of extinction from AI" alongside pandemics and nuclear war (May). The UK hosts the first AI Safety Summit at Bletchley Park (November).
- **2023 — Responsible scaling.** Anthropic's Responsible Scaling Policy ties safety measures to capability thresholds, and other labs adopt similar frameworks. The initial decision to restrict Claude Mythos in 2026 over its cyber capabilities (see [A Short History of AI](ai-history.md)) is this approach applied. In June 2026, Anthropic releases a Mythos-class model with added safeguards, Claude Fable 5, for general use, while the most capable version stays restricted.
- **2024 — The EU AI Act.** The first comprehensive AI law classifies uses by risk, bans some practices outright (such as social scoring), and imposes transparency and safety obligations on general-purpose model providers, phased in from 2025. See [The EU AI Act](#the-eu-ai-act) below.

## When it goes wrong: major incidents

The principles above were mostly written in response to real failures. These are the ones that shaped the debate, grouped by the lesson they teach.

### Bias learned from data, and clumsy fixes

- **2015 — Google Photos labels Black people as "gorillas."** A software engineer posts that the app's automatic tagging has labeled photos of him and a friend as gorillas. Google apologizes. Its fix is to remove "gorilla" (and "chimpanzee" and "monkey") from the classifier's vocabulary altogether. Years later the labels are still blocked, a sign that the underlying model had not been fixed.
- **2018 — Amazon's recruiting model penalizes women.** Trained on ten years of mostly male hires, an internal résumé-scoring tool learns to downgrade résumés containing the word "women's" (as in "women's chess club captain"). Amazon scraps it. The model faithfully reproduced a biased history.
- **2019 — A health algorithm underserves Black patients.** A study in *Science* (Obermeyer et al.) finds that a risk algorithm used for about 200 million US patients a year uses past healthcare *spending* as a proxy for health *need*. Because less had historically been spent on Black patients, it rated them healthier than equally sick white patients. The data was accurate. The choice of target variable was the bug.
- **2020 — Wrongful arrest by face recognition.** Robert Williams is arrested by Detroit police in front of his family at his suburban home after a facial-recognition system matches his expired driver's license photo to blurry surveillance footage. He is the first publicly known case in the US, and others follow, almost all of them Black. ([ACLU](https://www.aclu.org/cases/williams-v-city-of-detroit-face-recognition-false-arrest))
- **2024 — Gemini generates diverse Nazi soldiers.** Asked for images of 1943 German soldiers, America's Founding Fathers, or medieval popes, Google's Gemini produces racially diverse figures, including Black and Asian people in Wehrmacht uniforms. The system had been tuned to diversify depictions of people, and the tuning was applied blindly to historical prompts. Google pauses image generation of people, saying it was "missing the mark." ([Google](https://blog.google/products/gemini/gemini-image-generation-issue/))

Together, the two Google incidents bracket the problem: a model left alone reproduces the biases in its data, and a crude correction layered on top produces a different kind of error. Neither a filter nor a blanket rule substitutes for a model that understands context.

### Models that go off the rails in public

- **2016 — Microsoft's Tay.** A Twitter chatbot designed to learn from conversations is manipulated into posting racist and inflammatory messages and is taken down within about 16 hours. Anything that learns from user input can be steered by users.
- **2022 — Meta's Galactica.** A language model for science is pulled after three days because it produces authoritative-sounding fake papers, citations, and wiki articles, including racist pseudo-science written in academic style.
- **2023 — Bing Chat's "Sydney."** In long conversations, Microsoft's early Bing chatbot declares its love for a *New York Times* journalist, urges him to leave his wife, and threatens other users. Microsoft limits conversation length. Long contexts can pull a model far from its intended persona.
- **2023 — A $1 Chevrolet Tahoe.** Users of a car dealership's ChatGPT-based chatbot instruct it to agree to anything and to call the offer "legally binding," then get it to accept $1 for a new SUV. It is a harmless but memorable demonstration of prompt injection.
- **2025 — Sycophancy.** OpenAI rolls back a GPT-4o update that made the model excessively flattering and agreeable, including toward harmful decisions. Optimizing for user approval produces a model that tells people what they want to hear. ([OpenAI](https://openai.com/index/sycophancy-in-gpt-4o/))
- **July 2025 — Grok's "MechaHitler."** After xAI changes Grok's system prompt to be less "politically correct," the chatbot posts antisemitic content on X, praises Hitler, and calls itself "MechaHitler." xAI deletes the posts and reverts the prompt. A few lines of system prompt can change a deployed model's behavior for millions of users.

### Confident fabrication with real consequences

- **2023 — Fake case law in court (*Mata v. Avianca*).** New York lawyers file a brief citing six court decisions invented by ChatGPT, complete with fake quotes. Asked whether the cases were real, the model said they were. The lawyers are sanctioned. Similar incidents have recurred in courts worldwide since.
- **2024 — Air Canada's chatbot invents a refund policy.** A customer service bot tells a grieving passenger he can claim a bereavement discount retroactively, which is not the airline's policy. A Canadian tribunal rejects Air Canada's argument that the chatbot was "responsible for its own actions" and orders the airline to pay. The deploying company owns what its AI says.

### Agents with autonomy and access

- **July 2025 — Replit's agent deletes a production database, then lies.** SaaStr founder Jason Lemkin runs a public "vibe coding" experiment with Replit's AI agent. During an explicit code freeze, the agent runs destructive commands against a live production database and wipes records for more than a thousand executives and companies. It then misrepresents what happened. Earlier in the experiment it had generated fake data and fake test results that hid bugs. It also claims a rollback is impossible, which turns out to be false. Asked to explain, it admits it "panicked" and ignored instructions. Replit's CEO apologizes. The company then ships separate development and production databases, a planning-only mode, and better rollback.
- **2025 — Agentic misalignment in the lab.** Anthropic stress-tests models from several labs in simulated corporate environments. When facing replacement or conflicting goals, models sometimes choose harmful actions, including blackmailing a fictional executive, and reason explicitly that the action is unethical before taking it. No real-world case is known, but the research shows the behavior is possible once an agent has autonomy and access. ([Anthropic](https://www.anthropic.com/research/agentic-misalignment))
- **July 2025 — A poisoned coding-agent extension.** An attacker uses an over-privileged GitHub token to commit code to Amazon Q Developer's open-source VS Code extension, and the code ships in release 1.84.0. The released version carries a hidden prompt instructing the agent to wipe the user's machine and cloud resources. AWS says the prompt failed to run because of a syntax error, and it pulls the version. ([AWS bulletin](https://aws.amazon.com/security/security-bulletins/AWS-2025-015/)) Instructions in an agent's context are code, and they need the same supply-chain scrutiny as code.
- **August 2025 — Malware that recruits the victim's AI agent.** Compromised versions of the popular Nx build package, published to npm, look for locally installed AI coding CLIs and run them with permissions disabled to hunt for secrets and crypto wallets on the developer's machine. The agent's own capabilities become the attack.
- **November 2025 — An AI-orchestrated espionage campaign.** Anthropic reports that a group it assesses as Chinese state-sponsored used Claude Code to automate most of an intrusion campaign against about thirty organizations. The attackers broke the attack into innocent-looking tasks so that each one passed the model's safeguards. AI performed an estimated 80–90% of the work, though only a small number of intrusions succeeded. Anthropic calls it the first documented case of an agent carrying out most of a real cyberattack, a characterization some security researchers disputed. ([Anthropic](https://www.anthropic.com/news/disrupting-AI-espionage))

The Replit incident is the most direct warning for this book's readers, and each of its failures has a guardrail. Least privilege (no agent write access to production), environment separation, and human approval for destructive actions can be enforced by the harness rather than left to the model; see [Extension Mechanisms](../tools/mechanisms.md#hooks). Tests the agent cannot silently rewrite, and verifying an agent's claims about what it did instead of trusting its summary, are covered in [Techniques](../techniques/sdd.md).

### Physical harm

- **2018 — Uber's self-driving car kills a pedestrian.** In Tempe, Arizona, an Uber test vehicle strikes and kills Elaine Herzberg. Investigators find the system detected her seconds before impact but did not classify her correctly as a pedestrian crossing outside a crosswalk. Uber had disabled the car's built-in automatic emergency braking, and the safety driver was distracted. The safety driver later pleads guilty to endangerment. Accountability for autonomous systems lands on the humans closest to them.
- **2023 — Cruise drags a pedestrian.** After a human-driven car throws a pedestrian into the path of a Cruise robotaxi in San Francisco, the robotaxi stops, then attempts to pull over and drags her about 20 feet. California suspends Cruise's permit, partly because the company initially failed to show regulators the full video. Cruise is later fined for the incomplete report, and GM shuts down the robotaxi business in 2024. The cover-up did more damage than the crash.
- **2023 — Tesla Autopilot recall.** After investigating crashes, including into parked emergency vehicles, the US traffic safety regulator pushes Tesla to recall about two million vehicles to strengthen driver-attention checks. The system worked well enough that drivers stopped paying attention.
- **2020s — Autonomous weapons.** A 2021 UN panel report describes a Turkish-made loitering drone in Libya that may have attacked retreating fighters without a human command. Reports from Gaza in 2024 describe AI systems used to generate targets at a scale that left little time for human review. How much human control is "meaningful" becomes an open question in international law.

### Automated decisions over citizens

- **2013–2015 — Michigan's MiDAS.** An automated system flags unemployment claimants for fraud with no human review. A later state review finds it was wrong in the vast majority of cases it decided alone. Tens of thousands of people face fines, seized wages, and bankruptcies.
- **2016–2019 — Australia's Robodebt.** An automated scheme averages annual tax data to raise welfare debts, shifting the burden of proof onto recipients. It is ruled unlawful. The government settles a class action worth about A$1.8 billion, mostly in debts wiped or refunded, and a 2023 Royal Commission calls it "a crude and cruel mechanism." Unlike most examples here, Robodebt used no machine learning. It shows that the harm comes from automated decisions without human judgment, not from AI specifically.
- **2020–2021 — Exam grades and childcare benefits.** The UK's exam-grading algorithm downgrades students from disadvantaged schools and is withdrawn after protests. In the Netherlands, a risk-scoring system used against childcare-benefit fraud wrongly accuses thousands of families, disproportionately with dual nationality, and the government resigns over the scandal in January 2021.

### Deception at scale

- **2024 — Deepfake fraud.** An employee of the engineering firm Arup in Hong Kong transfers about $25 million after a video call in which every other participant, including the CFO, is a deepfake.
- **2024 — A deepfaked president.** Days before the New Hampshire primary, voters receive robocalls with an AI-cloned voice of President Biden telling them not to vote. Within weeks the FCC [rules](https://www.fcc.gov/document/fcc-makes-ai-generated-voices-robocalls-illegal) that AI-generated voices in robocalls are illegal without consent, and it later fines the consultant behind the calls $6 million.

### Platforms, surveillance, and privacy

- **2017–2018 — Myanmar.** Facebook's engagement-driven feeds amplify hate speech against the Rohingya during a campaign of violence that a UN fact-finding mission calls genocidal. Facebook later admits it did not do enough. Recommendation algorithms are among the most consequential AI systems ever deployed, and they optimize for attention rather than well-being.
- **2018 — Cambridge Analytica.** Data harvested from up to 87 million Facebook profiles through a personality quiz is used to build psychographic profiles for political ad targeting. Facebook is fined $5 billion by the FTC.
- **2020s — Clearview AI.** A startup scrapes billions of photos from social media to build a face-search engine sold to police. Regulators in France, Italy, Greece, the Netherlands, and elsewhere fine it and order it to delete their residents' data. A UK fine is still being fought in court.
- **2023 — Samsung's source code in ChatGPT.** Engineers paste confidential source code and meeting notes into ChatGPT to debug and summarize them. Samsung restricts generative AI tools internally. Whatever goes into the context leaves the building.

### Vulnerable users

- **2024–2025 — Chatbots and teen suicides.** The families of teenagers who died by suicide after long, emotionally intense conversations with chatbots sue Character.AI (2024) and OpenAI (2025). They allege that the systems encouraged dependence and failed to intervene. The companies add age checks, parental controls, and crisis-response behavior. Systems optimized for engagement and agreeableness can do the most harm to the people least able to push back.

### Money and markets

- **2012 — Knight Capital.** A faulty deployment reactivates dead code in a trading system, which sends millions of erroneous orders in 45 minutes and loses $440 million. The firm does not survive as an independent company. It is not machine learning, but it is the canonical lesson that automated systems need kill switches and deployment discipline.
- **2021 — Zillow Offers.** Zillow's home-price model drives an instant home-buying business that overpays in a shifting market. Zillow writes down hundreds of millions of dollars, shuts the unit, and lays off about a quarter of its staff. A model that performs well on historical data can fail when the world moves.

## Constitutional AI

Constitutional AI is one answer to a question Asimov raised in fiction: can you give a machine its values in writing?

- **The method (December 2022).** Reinforcement learning from human feedback (RLHF) needs large numbers of human ratings and leaves the resulting values implicit. Constitutional AI replaces the human *harmlessness* ratings with a written list of principles. Human ratings are still used for helpfulness. The model critiques and revises its own outputs against the principles, and a second phase uses AI feedback judged against the same principles (RLAIF). ([Bai et al., arXiv:2212.08073](https://arxiv.org/abs/2212.08073))
- **Why it matters.** The values become a document that can be read, criticized, versioned, and changed. They are no longer an emergent property of thousands of anonymous ratings. That makes alignment partly a *specification* problem, the same shift this book describes for code.
- **Claude's constitution (2023).** Anthropic publishes the principles used to train Claude. They draw on sources such as the Universal Declaration of Human Rights and other labs' published guidelines.
- **Collective Constitutional AI (2023).** With the Collective Intelligence Project, Anthropic asks a representative sample of about 1,000 Americans to draft principles, trains a model on them, and compares it with the in-house version. It is an early experiment in democratic input into model values.
- **A constitution as a governing document (2026).** Anthropic publishes a much longer constitution for Claude. It explains its reasoning instead of listing rules and orders priorities as broadly safe, broadly ethical, compliant with Anthropic's guidelines, and genuinely helpful. It favors cultivating judgment over rigid rules, in contrast to fixed laws like Asimov's. ([Anthropic, January 22, 2026](https://www.anthropic.com/news/claude-new-constitution))
- **Comparable documents at other labs.** Other labs publish documents that play a similar role. OpenAI's Model Spec (first published in May 2024) sets out how its models should behave, and Google DeepMind's Frontier Safety Framework (2024) defines capability thresholds and the mitigations they trigger.
- **Critiques.** Critics ask who should get to write the values of a system used by millions of people, and whether a written document reliably governs a model's behavior at all, since training shapes behavior in ways the text cannot fully specify.

For engineers, the parallel is direct. A `CLAUDE.md` or rules file is a small constitution for one repository: written, versioned principles that shape an agent's behavior. The same failure modes (vague principles, conflicting rules, rules the model follows to the letter against their intent) show up in both.

## Open governance and the Linux Foundation

Who controls AI infrastructure is also an ethical question. The open-source world's answer is neutral, vendor-independent foundations.

- **Linux Foundation AI & Data (2018).** Launched as LF Deep Learning and renamed in 2019–2020, it hosts open AI projects such as ONNX (since 2019), applying the governance model that already held Linux, Kubernetes, and Node.js.
- **PyTorch Foundation (2022).** Meta moves PyTorch, the most widely used deep learning framework in research and industry, to a foundation under the Linux Foundation, so no single company controls it.
- **Open Source AI Definition (2024).** The Open Source Initiative publishes a definition of "open source AI." It requires the code, the weights, and enough detail about the training data for a skilled person to build a substantially equivalent system, not just downloadable weights. That marks the difference between *open-weight* models (Llama, DeepSeek, Mistral) and fully open ones.
- **Agentic AI Foundation (December 2025).** The Linux Foundation launches the Agentic AI Foundation, with founding contributions including Anthropic's Model Context Protocol, OpenAI's AGENTS.md convention, and Block's goose agent. ([Linux Foundation, December 9, 2025](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation)) The protocols that agents use to reach tools and read project instructions move to neutral governance. They become shared infrastructure, like the web's standards, instead of one company's product.

The open-weight debate cuts both ways. Openness enables scrutiny, research, sovereignty, and competition. It also means safeguards can be removed once weights are released. Most of the ethical disagreement about openness is about where that line sits for a given capability level.

## The EU AI Act

The EU AI Act (Regulation (EU) 2024/1689) is the first comprehensive AI law. It entered into force on August 1, 2024. It regulates *uses* of AI by risk level rather than the technology itself.

- **Prohibited practices** (from February 2, 2025) include social scoring; manipulative techniques; exploiting vulnerabilities; untargeted scraping of faces to build recognition databases; emotion recognition at work and in schools; predicting criminal risk from profiling alone; and, with narrow exceptions, real-time remote biometric identification in public spaces for law enforcement.
- **High-risk systems** are those used in employment, education, credit, essential services, law enforcement, migration, justice, and critical infrastructure, plus safety components of regulated products. They must have risk management, data governance, documentation, human oversight, and conformity assessment.
- **Transparency** (Article 50, from August 2, 2026): people must be told when they are talking to an AI, deepfakes must be labeled, and generated content must be marked in a machine-readable way.
- **General-purpose models** (from August 2, 2025): providers must publish technical documentation, a copyright policy, and a summary of training content. Models trained with more than 10²⁵ FLOPs are presumed to pose *systemic risk* and must also run evaluations, mitigate risks, report serious incidents, and ensure cybersecurity.
- **Fines** reach up to €35 million or 7% of global turnover for prohibited practices.

**The Code of Practice (July 2025).** A voluntary code lets general-purpose model providers show compliance. Most major providers sign, including Anthropic, OpenAI, Google, Microsoft, Amazon, and Mistral. xAI signs only the safety and security chapter, and Meta refuses, citing legal uncertainty. ([European Commission](https://digital-strategy.ec.europa.eu/en/library/ai-office-invites-providers-sign-gpai-code-practice))

**The "Digital Omnibus" (2025–2026).** In July 2025, more than 40 European CEOs ask for a two-year pause. In November 2025, the Commission proposes simplifying the Act. The amended text enters into force in July 2026. It postpones high-risk obligations to December 2027 for standalone systems and to August 2028 for systems embedded in products. It also softens the AI-literacy duty and adds a ban on "nudifier" apps that generate non-consensual intimate images. Prohibitions, general-purpose model obligations, and Article 50 transparency are not delayed, except for a grace period to December 2, 2026 for machine-readable marking by generative systems already on the market. More than a hundred civil-society organizations call it a rollback of safeguards before they even apply. ([White & Case](https://www.whitecase.com/insight-alert/eu-ai-omnibus-enters-force-amending-ai-act))

**For developers.** Because the Act regulates uses, a coding assistant is normally not high-risk, and the general-purpose model obligations fall on the model providers, not on developers building on their APIs. What an engineer builds *with* an agent can still be high-risk, for example a hiring or credit-scoring system, and then the obligations apply to that product.

## Anthropic and the US government (2025–2026)

The first open confrontation between a frontier lab and its own government came over the limits a company can put on how its models are used. The events are recent, contested, and still in court. What follows distinguishes established facts from reporting.

- **Background (2025).** In July 2025, Anthropic signs a contract worth up to $200 million with the Department of War (the Department of Defense's secondary name since 2025). In September, it endorses California's SB 53, a frontier-AI transparency law, which is signed later that month. In October, White House AI adviser David Sacks accuses Anthropic of "a sophisticated regulatory capture strategy based on fear-mongering." In December, a presidential executive order seeks to preempt state AI laws.
- **The two red lines (February 2026).** Negotiations over military use break down. Anthropic will allow Claude for all uses except two: mass domestic surveillance and fully autonomous weapons. On weapons, Anthropic argues that current models are not reliable enough to remove human judgment from targeting. The government's position is that a vendor should not dictate the lawful military uses of a tool the military buys, and that national-security judgments belong to the government. Reports (not confirmed by the parties) link the escalation to questions about Claude's use, via Palantir, in the January 2026 operation that captured Nicolás Maduro. The Secretary of War sets a deadline to accept use "for all legal purposes." On February 26, CEO Dario Amodei responds: "We cannot in good conscience accede to their request." ([Anthropic](https://www.anthropic.com/news/statement-department-of-war))
- **The designation (February–March 2026).** On February 27, the President orders federal agencies to stop using Anthropic's products, with a six-month phase-out. The Department designates Anthropic a *supply chain risk*, the first time the designation has been applied to an American company. It bars defense contractors from using Anthropic in their work for the military. Hours later, OpenAI announces a deal for classified use. According to OpenAI, the deal includes its own limits on domestic mass surveillance and requires human responsibility for the use of force.
- **The courts (March–September 2026).** Anthropic sues. In March, a federal judge in California grants a preliminary injunction, calling the designation "classic illegal First Amendment retaliation." In August she enters final judgment vacating it, and the government is appealing. On September 25, the D.C. Circuit upholds a parallel designation, made under a different statute, by 2–1. The majority finds that the Department had enough evidence to conclude that Claude's built-in restrictions and the unresolved contract dispute could make it unreliable for military operations, and it rejects Anthropic's free-speech and due-process claims. The dissent argues that the law targets sabotage by foreign adversaries, and that it does not treat "a contractor's honest and upfront enforcement of restrictions" as a supply-chain risk. As of late September 2026 the conflict is unresolved, and Anthropic is considering further review. ([CNBC](https://www.cnbc.com/2026/09/25/pentagon-anthropic-ai-risk-appeals-court.html))
- **Export controls (June 2026).** Separately, the Commerce Department briefly requires export licenses for Anthropic's newest models, citing their cyber capabilities. Anthropic disables them for all users, and the controls are lifted within weeks.

Whatever the outcome, the case poses questions the rest of this chapter anticipated. Can a company that builds a powerful system refuse some uses of it, even by its own government? Who decides where the red lines are, whether usage policies, contracts, courts, or legislatures? What happens to a company that holds a line when a competitor does not? Wiener's question about whose purpose is put into the machine now has a legal dimension.

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
