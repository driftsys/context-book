# AI, Society, and the Developer's Work

Is the software developer job disappearing? This chapter separates what the evidence shows from what the headlines claim. It sets out the competing visions of what AI does to work, the historical precedents, what the data says as of late 2026, and what it means for people who build software.

## Two visions: augmentation or replacement

The debate is older than computers, and it has always had two camps.

**Augmentation: the human, amplified.**

- **1960 — Licklider, "Man-Computer Symbiosis."** J. C. R. Licklider, who later funded much of the research that became the internet, hoped that "human brains and computing machines will be coupled together very tightly," forming a partnership that "will think as no human brain has ever thought."
- **1962 — Engelbart, "Augmenting Human Intellect."** Douglas Engelbart defined the goal as "increasing the capability of a man to approach a complex problem situation." His lab went on to invent the mouse, hypertext, and collaborative editing. ([archive.org](https://archive.org/details/1962-engelbart-AHI-framework))
- **1990 — "A bicycle for the mind."** Steve Jobs, citing a study of locomotion efficiency in which a human on a bicycle beats every animal, described the computer as the equivalent of a bicycle for our minds.
- **1998 — Centaur chess.** A year after losing to Deep Blue, Garry Kasparov plays the first "advanced chess" match, in which each player is assisted by a computer. In the 2005 freestyle tournaments that followed, a team of two amateurs with ordinary PCs beat grandmasters and supercomputers. Kasparov drew the lesson that a good *process* for combining human and machine mattered more than the strength of either.
- **2022 — Brynjolfsson, "The Turing Trap."** Erik Brynjolfsson argues that aiming AI at imitating and replacing humans, rather than augmenting them, concentrates wealth and erodes workers' bargaining power. ([arXiv:2201.04200](https://arxiv.org/abs/2201.04200))
- **2023 — Acemoglu and Johnson, *Power and Progress*.** Productivity gains become wage gains only when institutions and choices push technology toward complementing workers. They call this "machine usefulness."
- **2025 — Karpathy's "Iron Man suits."** In his talk "Software Is Changing (Again)," Karpathy argues for building "less Iron Man robots and more Iron Man suits": partially autonomous tools with an "autonomy slider" and fast human verification. He calls this "the decade of agents," not the year.

**Replacement: the end of work, or of this work.**

- **1930 — Keynes, "Economic Possibilities for our Grandchildren."** John Maynard Keynes names "technological unemployment": labor-saving discovery outrunning the pace at which we find new uses for labor. He calls it "only a temporary phase of maladjustment" and predicts a fifteen-hour work week by about 2030. ([text](https://www.marxists.org/reference/subject/economics/keynes/1930/our-grandchildren.htm))
- **2013 — Frey and Osborne.** An Oxford study estimates that 47% of US jobs are at high risk of computerization "over the next decade or two." A 2016 OECD study that analyzes tasks rather than whole occupations puts it at about 9%, and the predicted wave did not arrive. ([ITIF retrospective](https://itif.org/publications/2022/09/30/oops-the-predicted-47-percent-of-job-loss-from-ai-didnt-happen/))
- **2023–2024 — "Everyone is a programmer."** Nvidia's Jensen Huang says that with generative AI "everyone is a programmer now," and later that the job of the industry is to make it so "nobody has to program." The press reports this as "don't learn to code," which is a paraphrase, not his words.
- **2025 — "A mid-level engineer."** Mark Zuckerberg predicts that in 2025 Meta and others will have "an AI that can effectively be a sort of midlevel engineer."
- **2025 — Amodei's warning.** Anthropic's CEO warns that AI could eliminate half of entry-level white-collar jobs and push unemployment to 10–20% within one to five years, and urges industry and government to stop "sugarcoating" it. ([Axios](https://www.axios.com/2025/05/28/ai-jobs-white-collar-unemployment-anthropic)) He restates the warning in his January 2026 essay ["The Adolescence of Technology"](https://darioamodei.com/essay/the-adolescence-of-technology).

**The economists in between.**

- **Exposure is not replacement.** Studies measure how many tasks AI *could* touch, not how many jobs it will eliminate. About 80% of US workers have at least 10% of their tasks exposed to LLMs ([Eloundou et al., *Science* 2024](https://www.science.org/doi/10.1126/science.adj0998)). The IMF estimates that 40% of global employment is exposed and warns of rising inequality. The ILO finds transformation more likely than replacement, with clerical work most exposed and women over-represented in the highest-risk jobs. Goldman Sachs's widely quoted "300 million jobs" is the number *exposed*, and its authors expect most of them to be complemented rather than replaced.
- **Modest macro effects.** Daron Acemoglu estimates AI will raise total factor productivity by only about 0.7% over ten years. ([NBER w32487](https://www.nber.org/papers/w32487))
- **New work.** David Autor and colleagues find that about 60% of US employment in 2018 was in job titles that did not exist in 1940. Automation destroys tasks, and new work appears in places nobody predicted. Autor also argues AI could *rebuild* middle-skill jobs by letting less-credentialed workers do expert work.

## "This will eliminate programmers": a history

Every generation of programming tools has been sold, at least partly, as the end of programmers.

- **1954–1957 — FORTRAN.** IBM's preliminary report promised FORTRAN "should virtually eliminate coding and debugging." Compilers were marketed as "automatic programming." John Backus later admitted they had been "hopelessly optimistic" about debugging. The number of programmers exploded.
- **1959–1960 — COBOL.** English-like syntax was meant to let managers read, and eventually write, business programs themselves. COBOL instead created a vast new profession, and it still runs much of the world's banking.
- **1980s — 4GLs and CASE.** James Martin's *Application Development Without Programmers* (1981) argued that most computers would soon have to be programmed "without programmers." Fourth-generation languages, CASE tools, and later low-code and no-code platforms followed the same arc: they took over some work and expanded the total amount of software. ([Simon Willison on Martin's book](https://simonwillison.net/2025/Jul/14/application-development-without-programmers/))
- **2002–2004 — Offshoring.** Forecasts that millions of US service jobs, led by IT, would move offshore caused a panic. US software employment kept growing for the next two decades.

Other professions show the same pattern, and its limits:

- **The Luddites (1811–1816)** were skilled textile workers protesting wage cuts and cheap, low-quality goods, not machines as such. Historian Eric Hobsbawm called it "collective bargaining by riot." The state answered by making machine-breaking a capital offense.
- **ATMs and bank tellers.** James Bessen showed that ATMs cut tellers per branch from 20 to 13, but cheaper branches meant more branches, and teller employment held steady for decades. The role shifted toward customer relationships. It was mobile banking, much later, that finally cut teller numbers. ([IMF F&D, 2015](https://www.imf.org/external/pubs/ft/fandd/2015/03/bessen.htm))
- **Spreadsheets.** After VisiCalc (1979), about 400,000 bookkeeping clerk jobs disappeared in the US while about 600,000 accountant jobs appeared. Cheaper analysis created demand for more analysis. ([NPR Planet Money](https://www.npr.org/2015/02/27/389585340/how-the-electronic-spreadsheet-revolutionized-business))
- **The Jevons paradox.** In 1865, William Stanley Jevons observed that more efficient steam engines *increased* coal consumption. Applied to software, cheaper code could mean more software and more demand for people who build it. The counter-argument is about *who* benefits: AI automates exactly the entry-level tasks through which juniors used to learn.

The historical lesson is not "it will be fine." Past waves took decades and changed who did the work and what it paid. The question for AI is how fast it moves, and whether the new work appears for the same people.

## What the data shows (late 2026)

### The profession is not disappearing

- **Projections still show growth.** The US Bureau of Labor Statistics still projects software developer employment to grow faster than average, although its latest projection is lower than before: about 10% over ten years, down from 15%. The narrow, legacy occupation of "computer programmer" is projected to shrink, and the BLS names AI automating routine programming as a factor. ([BLS](https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm))
- **"Programmer jobs at their lowest since 1980"** (*Washington Post*, March 2025) refers to that narrow category, which has been shrinking for decades as the work moved into the "software developer" title.

### But hiring has not recovered, and juniors bear the cost

- **Job postings.** Indeed's index of US software development postings peaked at about 2.3 times its February 2020 level in early 2022, then fell to roughly 25–30% *below* pre-pandemic levels, where it remained through 2026. Postings recovered somewhat in 2025–2026, but most of the increase came from senior roles and jobs with "AI" in the title. ([Indeed Hiring Lab](https://hiringlab.indeed.com/2026/07/08/ai-and-job-postings-from-destruction-to-creation/))
- **Young developers.** Stanford's "Canaries in the Coal Mine" study, based on ADP payroll data for millions of workers, finds that employment of 22–25-year-olds in the most AI-exposed occupations fell 13% relative to other workers. Software developers in that age group fell nearly 20% from their late-2022 peak, while older developers held steady or grew. An August 2026 update finds the gap widening, driven by less hiring rather than layoffs, and still no economy-wide displacement. ([Stanford Digital Economy Lab](https://digitaleconomy.stanford.edu/publication/canaries-in-the-coal-mine-six-facts-about-the-recent-employment-effects-of-artificial-intelligence/))
- **Seniority-biased change.** A Harvard study of 62 million workers finds that junior employment at firms adopting generative AI fell about 8% relative to non-adopters within six quarters, while senior employment did not. ([SSRN](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5425555))
- **Big Tech new-grad hiring.** The VC firm SignalFire reports new-grad hiring at large tech companies down more than half from 2019. The figure is from proprietary data and is not peer-reviewed.
- **Graduates.** The New York Fed reports unemployment for recent computer engineering and computer science graduates at around 7–8%, among the highest of all majors. But those who find work are far less likely than average to be underemployed. These estimates come from small samples with wide error bars. ([NY Fed](https://www.newyorkfed.org/research/college-labor-market))
- **Enrollment.** Undergraduate computer science enrollment in the US fell in 2025 for the first time in about two decades.

### AI is not the only cause

The slump started before ChatGPT. The end of zero interest rates in 2022 cut startup funding. Companies had over-hired in 2020–2022. A US tax change (Section 174) made software salaries more expensive to deduct from 2022 until it was reversed in 2025. One 2026 study finds that AI-exposed occupations were already deteriorating in early 2022, before ChatGPT's release ([arXiv:2601.02554](https://arxiv.org/abs/2601.02554)). Companies that cite AI in layoff announcements may be describing ordinary cost cuts in a way investors like. The fairest summary is that the evidence is *consistent with* AI reducing entry-level hiring, on top of economic factors. It does not yet prove it.

### Productivity: faster, slower, or both

| Study | Setting | Result |
|---|---|---|
| GitHub Copilot RCT (2023) | 95 devs, one small greenfield task | 55.8% faster ([arXiv](https://arxiv.org/abs/2302.06590)) |
| Microsoft, Accenture, Fortune 100 field RCTs | 4,867 devs, 2023-era autocomplete | +26% completed tasks, more for juniors ([SSRN](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4945566)) |
| Google internal RCT (2024) | 96 engineers, one C++ task | ~21% faster ([arXiv](https://arxiv.org/abs/2410.12944)) |
| METR RCT (July 2025) | 16 experienced maintainers, their own large repos | **19% slower**, while believing they were 20% faster ([METR](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)) |
| Uplevel (2024) | ~800 devs, observational | No throughput gain, 41% more bugs |

The pattern is that gains are large on small, self-contained tasks and for less experienced developers, and smaller or negative for experts working in large, familiar codebases. The METR result is the most important caution. Developers' *perception* of their speedup was wrong in both size and direction. In 2026, METR said that finding was likely outdated with newer agents, but that it could not reliably measure how much, partly because developers now refuse to work without AI ([METR, 2026](https://metr.org/blog/2026-02-24-uplift-update/)).

At the organizational level:

- **DORA.** Google's DORA research found in 2024 that more AI adoption was associated with *lower* delivery throughput and stability. In 2025 throughput improved, but instability remained, and DORA concluded that "AI is an amplifier": it magnifies an organization's existing strengths and weaknesses. ([DORA 2025](https://dora.dev/dora-report-2025/))
- **Trust.** In the 2025 Stack Overflow survey, 84% of developers use or plan to use AI, but more distrust its accuracy than trust it. Their top frustration is answers that are "almost right, but not quite." ([Stack Overflow](https://survey.stackoverflow.co/2025/ai))
- **Code quality.** GitClear's analysis of hundreds of millions of changed lines shows duplicated code rising sharply and refactoring falling since AI assistants became common. GitClear sells code-quality tools and the trend is correlation, not proof, but it matches what reviewers report. ([GitClear](https://www.gitclear.com/ai_assistant_code_quality_2025_research))

### What companies say, and what they do

- **"X% of our code is written by AI."** Google went from "more than 25%" (2024) to 75% of new code (2026, according to its CEO). Microsoft said 20–30% (2025). Anthropic's CEO predicted in March 2025 that AI would write 90% of code within months; he later said this was true inside Anthropic but not across the industry. None of these numbers has a standard definition (autocomplete keystrokes accepted? merged lines? reviewed changes?), and none is audited.
- **Hiring freezes.** Salesforce said it would hire no new engineers in 2025. Shopify told teams to show AI can't do a job before asking for headcount. Duolingo announced it was "AI-first," then clarified after a backlash that it had not laid off full-time staff and was still hiring.
- **Reversals.** Klarna claimed in 2024 that its AI assistant did the work of 700 customer service agents. In 2025 its CEO admitted that the focus on cost had led to "lower quality," and it began hiring humans again. By 2026, CEOs are increasingly avoiding "AI replaced our workers" in public messaging.

### How developers actually use it

Anthropic's Economic Index analyzes how people use Claude. In April 2025, 79% of Claude Code conversations were automation (the agent doing the task) versus 49% on the Claude.ai chat interface ([Anthropic](https://www.anthropic.com/research/impact-software-development)). Later reports find that the interface itself shapes how much people delegate: the same model is given more autonomy in an agentic tool than in a chat window ([June 2026 report](https://www.anthropic.com/research/economic-index-june-2026-report)). Automation versus augmentation is not a property of the technology alone. It is a product and workflow choice.

## True or false?

| Claim | Verdict |
|---|---|
| "Software developers are disappearing." | **False so far.** The occupation is still projected to grow, though more slowly than forecast before. The narrow "programmer" title is shrinking. |
| "Companies are hiring fewer juniors." | **True.** Several independent datasets agree. The share caused by AI rather than the economy is uncertain. |
| "AI caused the tech layoffs." | **Mostly false for 2022–2024** (interest rates, over-hiring, taxes). **Partly true and rising in 2025–2026**, though AI is also a convenient explanation. |
| "AI makes developers 55% faster." | **Misleading.** True for a small toy task. Results range from large gains to a 19% slowdown depending on task, experience, and codebase. |
| "Developers know how much AI speeds them up." | **False.** Self-reported speedups have been shown to be unreliable. |
| "AI writes most of the code at big companies." | **Unverifiable.** The percentages are self-reported, undefined, and unaudited. |
| "AI will do to programmers what compilers did." | **Plausible.** Compilers removed most hand-written assembly and multiplied the number of programmers. Whether that happens again depends on how fast demand for software grows relative to productivity. |

## Beyond jobs: skills and society

- **Deskilling.** A Microsoft Research and Carnegie Mellon survey of 319 knowledge workers found that higher confidence in AI was associated with less critical thinking, and that work shifts from *doing* to *verifying* ([CHI 2025](https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking-self-reported-reductions-in-cognitive-effort-and-confidence-effects-from-a-survey-of-knowledge-workers/)). In a randomized study by Anthropic, junior developers who learned a new library with AI assistance scored 17% lower on an immediate comprehension test, without a significant speed gain. Those who used AI to ask for explanations rather than code retained more ([Anthropic, 2026](https://www.anthropic.com/research/AI-assistance-coding-skills)). Outside software, a Polish study found that endoscopists' adenoma detection rate *without* AI fell from 28.4% to 22.4% after they got used to AI assistance ([Lancet Gastroenterology & Hepatology, 2025](https://pubmed.ncbi.nlm.nih.gov/40816301/)).
- **Education.** UK universities report proven AI-misconduct cases tripling in a year, and AI-written work largely goes undetected.
- **Inequality.** The IMF, the ILO, and Acemoglu and Johnson all warn that without deliberate choices, the gains flow to capital and to a few countries and firms. Usage is concentrated in rich countries and tech-heavy regions.
- **The apprenticeship problem.** The most specific risk to software is not mass unemployment but a broken pipeline. If the entry-level tasks juniors learned on are automated and juniors are not hired, where do the next seniors come from?

## What this means for developers

- **The job is shifting from writing code to specifying, reviewing, and owning it.** That shift is the subject of this book. [Spec-driven development](../techniques/sdd.md), [test-driven development](../techniques/tdd.md), and [quality control](../techniques/quality-control.md) are the skills that stay scarce when code is cheap.
- **Judgment is the moat.** The METR and GitClear findings point the same way: AI output needs someone able to tell "almost right" from right. That ability comes from having done the work.
- **Use AI to learn, not only to deliver.** The skill-formation evidence suggests asking for explanations and reasoning, not just finished code, especially early in a career.
- **Organizations must keep training juniors.** Hiring only seniors is a short-term optimization that eventually runs out of seniors.
- **Augmentation is a choice.** Whether AI becomes Engelbart's augmentation or Keynes's technological unemployment depends on how tools are designed, how teams use them, and what companies and institutions decide, not only on what the models can do.
