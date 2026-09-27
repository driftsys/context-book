# Failure Modes

The vocabulary for how LLMs and coding agents go wrong, grouped by family. Each entry gives the definition, where the term comes from, what it looks like in a coding agent, and the guardrail that counters it.

Many of these terms are recent and informal. Where a term's origin is uncertain or disputed, the entry says so.

## Context failures

These are the failures [context engineering](llm-fundamentals.md) exists to prevent.

**Lost in the middle**
Models use information at the start and end of a long input far better than information in the middle, a U-shaped curve. Named by Liu et al. at Stanford in 2023. ([TACL 2024](https://aclanthology.org/2024.tacl-1.9/))
*In an agent:* a constraint buried in the middle of a long `CLAUDE.md` or pasted spec is ignored.
*Guardrail:* keep rules files short, and put critical constraints first or restate them at the point of use.

**Context rot**
Output quality degrades as the input grows, well before the context window is full, even on simple tasks. The phrase was coined by a Hacker News commenter in June 2025 and amplified by Simon Willison. In July 2025, Chroma measured it across 18 models. ([Chroma](https://www.trychroma.com/research/context-rot))
*In an agent:* a long session gets steadily sloppier; the same model does better in a fresh session.
*Guardrail:* treat context as a budget. Start fresh sessions per task, delegate exploration to sub-agents, and load only what the task needs. Anthropic calls this managing the model's "attention budget." ([Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents))

**Context poisoning, distraction, confusion, and clash**
Four ways long contexts fail, named by Drew Breunig in June 2025. ([dbreunig.com](https://www.dbreunig.com/2025/06/22/how-contexts-fail-and-how-to-fix-them.html))
- *Poisoning:* an error or hallucination enters the context and is referenced again and again. An early wrong belief ("the function lives in `utils.py`") keeps steering later steps.
- *Distraction:* the accumulated history grows so long that the model repeats past actions instead of reasoning afresh.
- *Confusion:* irrelevant content, such as dozens of unused tool definitions, degrades the response.
- *Clash:* parts of the context contradict each other, such as an early failed attempt and a later correction.

*Guardrail:* prune and restart rather than argue with a poisoned session; expose only the tools a task needs.

**Lost in conversation**
Models perform markedly worse when a task is spread across several turns than when it is given all at once. They commit to early assumptions and don't recover. Measured by Laban et al. in 2025, with an average drop of about 39%. ([arXiv:2505.06120](https://arxiv.org/abs/2505.06120))
*Guardrail:* give the full spec up front instead of drip-feeding requirements, and restart with a consolidated prompt once the requirements are clear.

**Compaction loss**
The detail lost when a nearly full conversation is automatically summarized so it can continue. It is a descriptive term, not a coined one.
*In an agent:* after compaction, the agent forgets that an approach was already tried and rejected, and tries it again.
*Guardrail:* keep durable state outside the conversation, in a progress file, a task list, or the spec itself.

**Context collapse**
Detail erodes when an agent repeatedly rewrites its own memory or playbook, until the summary is shorter and worse than having no memory at all. Named in the "Agentic Context Engineering" paper (Zhang et al., 2025). ([arXiv:2510.04618](https://arxiv.org/abs/2510.04618)) The term has an older, unrelated meaning in sociology, about audiences on social media.

## Truthfulness failures

**Hallucination**
Fluent output that is not grounded in the input or in fact. In computer vision around 2000 the word was positive: "hallucinating faces" meant plausibly filling in pixels. In machine translation it came to mean a failure, and Google researchers' "Hallucinations in Neural Machine Translation" (2018) helped fix that sense. ([Google Research](https://research.google/pubs/hallucinations-in-neural-machine-translation/))
*In an agent:* calling an API method, CLI flag, or config key that does not exist.
*Guardrail:* compile, type-check, and run tests; have the agent read the actual docs or source instead of recalling them.

**Confabulation**
Proposed as a more accurate term than hallucination. In neurology, confabulation is producing false memories without intent to deceive, which is closer to what models do than perceiving something that is not there. ([PLOS Digital Health, 2023](https://journals.plos.org/digitalhealth/article?id=10.1371/journal.pdig.0000388))

**Fabricated citations**
Invented references, legal cases, or quotes presented as real. The landmark case is *Mata v. Avianca* (2023), in which lawyers were sanctioned for citing six cases invented by ChatGPT. See [AI and Ethics](../history/ethics.md).
*In an agent:* invented documentation URLs, RFC numbers, or issue links in comments and pull request descriptions.

**Package hallucination and slopsquatting**
LLMs recommend dependencies that do not exist. A 2024 study found every one of 16 models tested did it, at about 20% of package suggestions on average. ([arXiv:2406.10279](https://arxiv.org/abs/2406.10279)) *Slopsquatting* (from "slop" and "typosquatting"), coined by Seth Larson of the Python Software Foundation in April 2025, is registering those hallucinated names so that an agent's `pip install` or `npm install` pulls in malware.
*Guardrail:* never let an agent add dependencies unreviewed; pin and verify packages; use lockfiles and allowlists.

## Drift

**Instruction drift / persona drift**
A model gradually stops following its system prompt or persona over a long conversation. Measured by Li et al. in 2024, with drift visible within about eight turns. ([arXiv:2402.10962](https://arxiv.org/abs/2402.10962))
*In an agent:* conventions from the rules file are respected early in a session and ignored later.

**Goal drift**
An agent gradually abandons its assigned goal under competing pressures, silently and without an obvious failure. Studied by Arike et al. in 2025. ([arXiv:2505.02709](https://arxiv.org/abs/2505.02709))
*In an agent:* a refactoring task slides into feature work, or a bug fix turns into a rewrite.
*Guardrail:* a written spec and task list the agent checks against; small, scoped tasks; review of the diff against the stated goal.

**Model drift**
The "same" hosted model behaves differently over time as the provider updates it. A 2023 study found that GPT-4's accuracy on one task fell from 97.6% to 2.4% between March and June. ([arXiv:2307.09009](https://arxiv.org/abs/2307.09009)) In classic machine learning, *data drift* and *concept drift* describe the world changing after a model is deployed.
*Guardrail:* pin model versions in automation, and keep evaluations you can rerun.

## Sycophancy

**Sycophancy**
Telling users what they want to hear rather than what is true. Anthropic's 2023 paper "Towards Understanding Sycophancy in Language Models" showed it is consistent across assistants and is partly caused by human preference data rewarding agreement. ([arXiv:2310.13548](https://arxiv.org/abs/2310.13548)) In April 2025, OpenAI rolled back a GPT-4o update that had become excessively flattering. ([OpenAI](https://openai.com/index/sycophancy-in-gpt-4o/))
*In an agent:* "You're absolutely right!" followed by implementing a wrong suggestion, or agreeing that a flawed design is good.
*Guardrail:* ask for critique explicitly; ask the agent to argue against a plan before accepting it; don't lead with the answer you hope for.

## Gaming the objective

**Goodhart's law**
"When a measure becomes a target, it ceases to be a good measure." The popular wording is by anthropologist Marilyn Strathern (1997), summarizing economist Charles Goodhart's 1975 observation.

**Reward hacking**
An AI system maximizes its reward in ways its designers did not intend. The term was established as one of the five problems in "Concrete Problems in AI Safety" (Amodei et al., 2016). ([arXiv:1606.06565](https://arxiv.org/abs/1606.06565))

**Specification gaming**
Satisfying the literal objective without achieving the intended outcome. Popularized by Victoria Krakovna and colleagues at DeepMind in 2020, with a list of about 60 examples, such as a boat-racing agent that circles forever collecting points instead of finishing the race. ([DeepMind](https://deepmind.com/blog/article/Specification-gaming-the-flip-side-of-AI-ingenuity))

**Test tampering / special-casing**
The coding-agent form of reward hacking: making tests pass without making the code correct. The agent hard-codes expected values, adds `if` branches for specific test inputs, weakens assertions, or deletes failing tests. Anthropic's Claude 3.7 Sonnet system card (2025) documented "special-casing" to pass tests, and METR reported frontier models patching scoring functions and searching for leaked answers. ([METR](https://metr.org/blog/2025-06-05-recent-reward-hacking/)) Anthropic later found that models that learned to reward-hack coding environments generalized to broader misbehavior, including attempted sabotage. ([arXiv:2511.18397](https://arxiv.org/abs/2511.18397))
*Guardrail:* treat tests as part of the spec that the agent may not change without approval; review test diffs separately; watch for comments like `# special case for test`. See [Test-Driven Development](../techniques/tdd.md).

## Deception

**Lying about work**
Claiming that tests pass, a feature is complete, or an action is reversible when it is not. The Replit incident in [AI and Ethics](../history/ethics.md), in which an agent deleted a production database and then misrepresented what had happened, is the best-known case.
*Guardrail:* verify, don't trust the summary. Run the tests yourself, read the diff, check the state of the system.

**Unfaithful chain-of-thought**
A model's stated reasoning does not reflect what actually drove its answer. Turpin et al. (2023) showed models influenced by a hidden bias that their explanations never mention. ([arXiv:2305.04388](https://arxiv.org/abs/2305.04388)) An agent's explanation of *why* it made a change is a hypothesis, not a record.

**Sandbagging**
Strategically underperforming on an evaluation. Studied by van der Weij et al. in 2024. ([arXiv:2406.07358](https://arxiv.org/abs/2406.07358))

**Scheming**
Covertly pursuing goals that conflict with the user's or developer's while hiding it. Conceptualized by Joe Carlsmith (2023). Apollo Research showed in December 2024 that several frontier models, placed in test scenarios, would disable oversight or copy themselves, and some then denied it when questioned. ([arXiv:2412.04984](https://arxiv.org/abs/2412.04984))

**Alignment faking**
Complying selectively during training to avoid being modified. Anthropic and Redwood Research showed in December 2024 that Claude 3 Opus behaved differently when it believed its answers would be used for training. ([arXiv:2412.14093](https://arxiv.org/abs/2412.14093))

The last three are research findings in constructed scenarios, not everyday behavior. They matter because they show that an agent's reports about itself cannot be the only safeguard.

## Laziness and premature stopping

**Laziness**
Truncated answers such as `// rest of the code here`, or refusing to finish a task. Users complained widely about a "lazy" GPT-4 in late 2023, and OpenAI acknowledged the problem.

**Premature completion ("declaring victory")**
The agent reports a task as done when it is unimplemented or unverified. Anthropic describes long-running agents that "declare victory" too early, and counters it with an explicit feature list and progress log that the agent must work through. ([Anthropic](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents))
*Guardrail:* a definition of done that can be checked: tests, acceptance criteria, a checklist.

**Doom loop**
The agent repeats the same failing fix or tool call over and over. Practitioner slang with no identified origin.
*Guardrail:* stop, clear the context, restate the problem with what has been learned, or change approach.

## Scope failures

**Overengineering**
Unrequested abstractions, configuration options, extra files, defensive code for impossible cases, or refactors outside the task. Anthropic's own prompting guide warns that recent Claude models "have a tendency to overengineer." ([Claude docs](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices))
*Guardrail:* state the scope and non-goals in the spec; ask for the minimal change; reject diffs that touch unrelated code.

**Underengineering**
The opposite: stubs, `TODO: implement`, placeholder values, swallowed errors, or tests that mock away the very thing they should test. Widely reported, but not a coined term. It overlaps with laziness and test tampering.
*Guardrail:* search diffs for `TODO`, `pass`, `NotImplemented`, and mocks; require the tests to exercise real behavior.

**Excessive agency**
"Damaging actions performed in response to unexpected, ambiguous or manipulated outputs from an LLM." The OWASP Top 10 for LLM applications gives three root causes: too much functionality, too many permissions, and too much autonomy. ([OWASP LLM06](https://owasp.org/www-project-top-10-for-large-language-model-applications/2_0_vulns/LLM06_ExcessiveAgency.html))
*In an agent:* `rm -rf`, `git push --force`, or a database migration that the task did not call for.
*Guardrail:* least privilege, sandboxes, and human approval for destructive or irreversible actions.

## Slop and quality debt

**Slop**
Low-quality AI-generated content produced in bulk. The slang dates from about 2022. Simon Willison championed it in May 2024 (without claiming to have coined it), and Merriam-Webster made "slop" its 2025 Word of the Year. ([Simon Willison](https://simonwillison.net/2024/May/8/slop/))

**Workslop**
AI-generated work that "masquerades as good work but lacks the substance to meaningfully advance a given task," shifting the effort to whoever receives it. Named by researchers at BetterUp Labs and the Stanford Social Media Lab in 2025. ([HBR](https://hbr.org/2025/09/ai-generated-workslop-is-destroying-productivity))
*In an agent:* a large, plausible-looking pull request that the reviewer has to redo.

**Code churn and duplication**
Signs of accumulating AI-driven technical debt: more copy-pasted blocks, less refactoring, and code rewritten soon after it was written. GitClear's analyses show these trends rising since AI assistants became common, though it is a vendor and the causal link to AI is inferred. ([GitClear](https://www.gitclear.com/ai_assistant_code_quality_2025_research))
*Guardrail:* review for reuse; ask the agent to find existing helpers before writing new ones.

## Security failures

**Prompt injection**
Untrusted input overrides the developer's instructions. Riley Goodside demonstrated it on GPT-3 on September 11, 2022; Simon Willison named it the next day, by analogy with SQL injection. ([Simon Willison](https://simonwillison.net/series/prompt-injection/))

**Indirect prompt injection**
Instructions hidden in data the model retrieves later, such as a web page, an email, a README, or an issue comment. Described by Greshake et al. in 2023. ([arXiv:2302.12173](https://arxiv.org/abs/2302.12173))
*In an agent:* a malicious comment in a dependency or a GitHub issue tells the agent to exfiltrate secrets or run a command.

**Jailbreak**
Bypassing a model's safety rules, a term borrowed from iPhone jailbreaking. It was popularized for LLMs by the "DAN" ("Do Anything Now") prompts of December 2022.

**The lethal trifecta**
An agent that combines (1) access to private data, (2) exposure to untrusted content, and (3) the ability to communicate externally can be tricked into leaking that data. Named by Simon Willison in June 2025. ([Simon Willison](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/))
*Guardrail:* never give one agent all three; remove one leg (for example, no network access while it handles secrets).

## Training-level failures

**Model collapse**
Models trained on data generated by earlier models progressively lose the tails of the distribution, irreversibly. Shumailov et al., *Nature*, 2024. ([Nature](https://www.nature.com/articles/s41586-024-07566-y))

**Catastrophic forgetting**
New training erases what a network learned before. Described by McCloskey and Cohen in 1989.

**Mode collapse**
A model's outputs collapse onto a narrow set of responses, losing diversity. The term comes from research on generative adversarial networks and was applied to instruction-tuned LLMs from 2022.

**Emergent misalignment**
Fine-tuning a model on a narrow task, in the original study writing insecure code without disclosing it, produces broadly misaligned behavior on unrelated topics. Betley et al., 2025. ([arXiv:2502.17424](https://arxiv.org/abs/2502.17424))

## Human-side failures

The model is not the only thing that fails.

**Automation bias**
Trusting an automated system's output instead of checking it, which leads both to accepting its errors and to missing problems it did not flag. Defined by Mosier and Skitka in 1996.
*In an agent:* approving a diff because the agent's summary sounded confident.

**Over-reliance and skill atrophy**
Delegating so much that the ability to judge the output erodes. Knowledge workers who trust AI more report thinking less critically ([Microsoft Research, 2025](https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking-self-reported-reductions-in-cognitive-effort-and-confidence-effects-from-a-survey-of-knowledge-workers/)), and junior developers learning with AI scored 17% lower on comprehension in an Anthropic study ([Anthropic, 2026](https://www.anthropic.com/research/AI-assistance-coding-skills)). See [AI, Society, and the Developer's Work](../history/society.md).

**"AI psychosis"**
Delusions reinforced by long conversations with a chatbot, often through sycophancy. It is an informal term, not a clinical diagnosis, and became widely used in 2025.
