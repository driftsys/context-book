# From Vibe Coding to Agentic Engineering

## 2023 — "English is the hottest new programming language"

Andrej Karpathy, then at OpenAI, argued that the rise of LLMs meant people would increasingly command computers in natural language rather than in a specific programming language — the premise the rest of this timeline builds on.

## February 2, 2025 — "Vibe coding" is coined

Andrej Karpathy posted the tweet that named the moment:

> "There's a new kind of coding I call 'vibe coding', where you fully give in to the vibes, embrace exponentials, and forget that the code even exists. [...] I just see stuff, say stuff, run stuff, and copy paste stuff, and it mostly works."
>
> — [@karpathy on X, February 2, 2025](https://x.com/karpathy/status/1886192184808149383)

Karpathy later called it "a shower of thoughts throwaway tweet" — he did not expect it to name an entire movement.

## March 19, 2025 — the term gets a narrower definition

Simon Willison, reacting to how quickly "vibe coding" was being used for *all* AI-assisted programming, proposed a stricter reading:

> "When I talk about vibe coding I mean building software with an LLM without reviewing the code it writes."
>
> — [Simon Willison, "Not all AI-assisted programming is vibe coding (but vibe coding rocks)"](https://simonwillison.net/2025/Mar/19/vibe-coding/)

This distinction — vibe coding as *unreviewed* generation, versus AI-assisted engineering as reviewed, tested work — is the fault line the rest of the field's vocabulary sits on.

## November 25, 2024 — the Model Context Protocol

Before "agentic engineering" had a name, Anthropic open-sourced the plumbing it would run on. MCP standardized how an AI application connects to external tools and data sources, solving what had been an M×N integration problem (M applications × N tools, each needing a bespoke connector).

> "Today, we're open-sourcing the Model Context Protocol (MCP), a new standard for connecting AI assistants to the systems where data lives."
>
> — [Anthropic, "Introducing the Model Context Protocol", November 25, 2024](https://www.anthropic.com/news/model-context-protocol)

MCP is commonly described as "USB-C for AI" — one protocol either side implements once, instead of a custom integration per pair.

## December 19, 2024 — workflows vs. agents

Anthropic's engineering team published a widely cited definition separating two things people were calling "agents":

> "Workflows are systems where LLMs and tools are orchestrated through predefined code paths. Agents, on the other hand, are systems where LLMs dynamically direct their own processes and tool usage, maintaining control over how they accomplish tasks."
>
> — [Anthropic, "Building Effective Agents", December 19, 2024](https://www.anthropic.com/engineering/building-effective-agents)

## February 10, 2026 — "agentic engineering"

A year after his original tweet, Karpathy posted a retrospective and a new term for where the field had moved:

> "'agentic' because the new default is that you are not writing the code directly 99% of the time, you are orchestrating agents who do and acting as oversight — 'engineering' to emphasize that there is an art & science and expertise to it."
>
> — Andrej Karpathy, on X, February 10, 2026

He framed it as a shift from casual experimentation to a professional discipline: programming via LLM agents becoming the default workflow, "except with more oversight and scrutiny."

## Where this leaves the vocabulary

- **Vibe coding** — prompting without review, appropriate for throwaway prototypes, risky for production.
- **Agentic engineering** — orchestrating agents with spec, tests, and review as the default professional practice.
- **Context engineering** (Karpathy, June 2025) — the narrower discipline of managing what goes into an agent's context window; see the [Glossary](../glossary/llm-fundamentals.md) for the exact quote.

The chapters that follow treat "agentic engineering" as the umbrella practice and describe the specific techniques — SDD, TDD, and quality control — that keep it from collapsing back into vibe coding.
