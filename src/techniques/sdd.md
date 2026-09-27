# Spec-Driven Development

## The idea

Write the specification first, in a versioned file the agent and every reviewer can read — never negotiated live in a chat window that disappears with the session. The spec, not the chat transcript, is the artifact of record.

Sean Grove's talk "The New Code" made the case for treating the spec as more valuable than the code it produces:

> "Code itself is actually a lossy projection from the specification."
>
> — Sean Grove, OpenAI, "The New Code" ([transcript](https://lawwu.github.io/transcripts/8rABwKRsec4.html))

His argument: a well-written spec captures the *intent* behind a system in a form humans can align on and models can execute against — and, unlike code, it survives being regenerated in a different language or a different architecture.

## Why it matters more with agents than without them

Without a spec, a long agentic session drifts: the agent's working context gets summarized, edited, and partially forgotten, and by the fiftieth exchange the code has quietly diverged from what was actually wanted. A spec is the fixed point everyone — human and agent — can check the current state against.

## In practice

1. **Specify** — write down the behavior wanted, in enough detail that "done" is checkable, not a matter of taste.
2. **Design** — sketch the approach against the spec before generating code from it.
3. **Test first** — turn the spec's checkable claims into failing tests (see [Test-Driven Development](tdd.md)).
4. **Generate** — let the agent write code against the spec and the tests, not against a vague description.
5. **Review** — a second reviewer (ideally a different model or a human, never the same agent grading its own work) checks the diff against the spec.
6. **Merge** — a human merges. The loop repeats for the next increment.

## Greenfield vs. brownfield

On a greenfield project, the spec *is* effectively the whole context — there is nothing else for the agent to misread. On brownfield work, the spec has to coexist with an existing codebase's own conventions, and a [golden master test](../glossary/methodology.md) is often what stands in for a spec that was never written down for the legacy behavior.

## Three levels of spec-driven development

Birgitta Böckeler's analysis on martinfowler.com (October 2025) distinguishes three levels of commitment to the spec:

- **Spec-first:** a spec is written before the work and used for that task, then may be discarded.
- **Spec-anchored:** the spec is kept and maintained as a living document as the feature evolves.
- **Spec-as-source:** the spec is the primary artifact; code is generated from it and humans do not edit code directly.

Most tools today are spec-first or spec-anchored. Spec-as-source is an aspiration, and it recalls the earlier failure of model-driven development.

## Frameworks

Only the pioneers, the widely adopted, and the most promising are listed here, as of late 2026. Adoption changes quickly. The star counts are rough orders of magnitude.

**GitHub Spec Kit** — *pioneer, widely adopted*
Open-sourced by GitHub in September 2025 (MIT). A CLI plus slash commands for over 30 agents, including Copilot, Claude Code, Cursor, Gemini CLI, and Codex. A project-wide `constitution.md` holds non-negotiable principles. Each feature then goes through *specify* (`spec.md`: what and why) → *plan* (`plan.md`: stack, data model, architecture) → *tasks* (`tasks.md`: ordered, dependency-aware) → *implement*. It has the most GitHub stars of any tool dedicated to SDD, and Thoughtworks' Technology Radar lists it under "Assess." ([GitHub](https://github.com/github/spec-kit), [announcement](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/))

**Kiro** — *pioneer; popularized the term*
AWS's agentic IDE, previewed in July 2025 and generally available in November 2025 (proprietary, with a CLI). Its spec mode writes `.kiro/specs/<feature>/requirements.md`, `design.md`, and `tasks.md`. Requirements use EARS notation (Easy Approach to Requirements Syntax, from Rolls-Royce): *"WHEN [condition] THE SYSTEM SHALL [behavior]."* Steering files in `.kiro/steering/` (`product.md`, `tech.md`, `structure.md`) hold project context, and Kiro can generate property-based tests from the spec. It works only with Kiro's own agent. ([Kiro docs](https://kiro.dev/docs/specs/))

**Tessl** — *pioneer of spec-as-source*
Founded by Guy Podjarny (founder of Snyk). Launched in 2025 with a Spec Registry of usage specs for open-source libraries and a framework in which code is generated from specs and marked "do not edit." In 2026 it repositioned as a platform for distributing agent skills, with spec-driven development as one installable workflow. It is the reference example of spec-as-source, though its adoption is harder to gauge. ([Tessl](https://docs.tessl.io/use/spec-driven-development-with-tessl))

**BMAD Method** — *widely adopted*
An open-source method by Brian Madison (MIT) that recreates an agile team as agent personas: Analyst, Product Manager, Architect, Scrum Master, Developer, and QA. Work moves from brief → PRD → architecture → "sharded" story files that carry the full context each developer agent needs. It is the heaviest of these methods and scales its planning to the project's size. It has tens of thousands of GitHub stars. ([GitHub](https://github.com/bmad-code-org/BMAD-METHOD))

**OpenSpec** — *widely adopted, built for existing codebases*
By Fission AI (MIT), for 30+ agents. `openspec/specs/` holds the current truth about the system, and each change lives in `openspec/changes/<change>/` as a proposal, design, tasks, and *delta specs*. Archiving a completed change merges its deltas into the main specs, so the specification grows incrementally instead of being written up front: "fluid not rigid, iterative not waterfall." It is also listed under "Assess" on the Thoughtworks Radar. ([GitHub](https://github.com/Fission-AI/OpenSpec))

**Taskmaster AI** — *early pioneer, widely adopted*
Launched in March 2025, before "spec-driven development" was a common term. It turns a PRD into a `tasks.json` with dependencies, complexity scores, and subtasks, and feeds the agent one task at a time through an MCP server or CLI. The *task list* is the working context. Its license is MIT with the Commons Clause, so it is not strictly open source. ([GitHub](https://github.com/eyaltoledano/claude-task-master))

**GSD ("Get Shit Done")** — *widely adopted*
Launched in December 2025 (MIT), first for Claude Code and then for more than a dozen agents. It keeps project state in files (project, roadmap, plans), splits work into small plans, and runs each in a fresh sub-agent context before checking it against explicit goals. It explicitly presents itself as a defense against [context rot](../glossary/failure-modes.md), which makes it a direct application of context engineering. ([GitHub](https://github.com/open-gsd/gsd-core))

**Superpowers** — *widely adopted; spec-adjacent*
A skills library by Jesse Vincent (MIT) for Claude Code and a dozen other agents. Its workflow runs brainstorming (validate a design) → a git worktree → a written plan of 2–5-minute tasks with exact specifications → sub-agent execution → [TDD](tdd.md) → code review against the plan. It is more a planning and TDD methodology than a spec-artifact tool. ([GitHub](https://github.com/obra/superpowers))

**Conductor** — *promising*
Google's Gemini CLI extension, previewed in December 2025 (Apache 2.0), which Google calls "context-driven development." `conductor/product.md`, `tech-stack.md`, and `workflow.md` hold project context. Each unit of work is a *track* with its own `spec.md` and `plan.md`, which the agent checks off as it goes. ([Google](https://developers.googleblog.com/conductor-introducing-context-driven-development-for-gemini-cli/))

**Intent** — *promising*
Augment Code's multi-agent workspace, in public beta since February 2026 (proprietary). A coordinator agent turns a task into a "living spec." Implementer agents work in parallel git worktrees, and a verifier agent checks the result against the spec before a human reviews it. It works with Augment's agent and with Claude Code, Codex, and OpenCode. ([Augment](https://www.augmentcode.com/blog/intent-a-workspace-for-agent-orchestration))

**Plan modes (the lightweight baseline)**
Claude Code, Codex, and Cursor each have a read-only *plan mode*: the agent explores and proposes a plan, and nothing is edited until you approve. By default the plan is not saved or versioned, so it is spec-first in its weakest form. Asking the agent to write the plan to a file in the repository is often enough to turn it into a real spec.

| Framework | Level | Artifacts | Agents |
|---|---|---|---|
| Spec Kit | spec-first → anchored | constitution, spec, plan, tasks | 30+ |
| Kiro | spec-first → anchored | requirements (EARS), design, tasks, steering | Kiro only |
| Tessl | spec-as-source | specs, generated code | MCP agents |
| BMAD | spec-first | brief, PRD, architecture, stories | many |
| OpenSpec | spec-anchored | specs + delta changes | 30+ |
| Taskmaster | task-first | PRD, tasks.json | many (MCP) |
| GSD | spec-first | project, roadmap, plans | 14+ |
| Superpowers | plan-first | design, plan | 15+ |
| Conductor | spec-anchored | product/tech context, tracks (spec, plan) | Gemini CLI, Claude Code |
| Intent | spec-anchored | living spec | several |

## Criticisms

Spec-driven development has drawn serious criticism, and the frameworks above are partly responses to it.

- **Waterfall redux.** Heavy up-front specification and big-bang delivery are the antipatterns agile was invented to escape. Thoughtworks, which placed SDD in "Assess" in November 2025, warns about exactly this, as do practitioners who tested Spec Kit ([marmelab](https://marmelab.com/blog/2025/11/12/spec-driven-development-waterfall-strikes-back.html), [Scott Logic](https://blog.scottlogic.com/2025/11/26/putting-spec-kit-through-its-paces-radical-idea-or-reinvented-waterfall.html)).
- **One size doesn't fit all.** Böckeler saw a small bug fix turned into four user stories with sixteen acceptance criteria.
- **Markdown overload.** Generated specs are long, repetitive, and hard to review. As Böckeler put it, she would "rather review code than all these markdown files."
- **False sense of control.** A spec does not guarantee the agent follows it. In a brownfield test, the agent read the spec's description of existing classes and then recreated them as duplicates.
- **Drift.** Unless someone maintains it, a spec diverges from the code. Delta specs (OpenSpec), living specs (Intent), and writing back to the spec (Tessl) are all answers to this.

The pragmatic lesson is to match the ceremony to the size of the change. A one-paragraph spec and a failing test are often enough. Reserve the full pipeline for features where a misunderstanding would be expensive.
