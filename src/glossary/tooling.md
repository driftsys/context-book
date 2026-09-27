# Agent Tooling

Short definitions. [Extension Mechanisms](../tools/mechanisms.md) explains each one in depth, with examples and equivalents across agents.

**Rules / instructions** (`AGENTS.md`, `CLAUDE.md`, `.github/copilot-instructions.md`)
Always loaded into context. Carry the conventions and constraints of a specific repository — what an agent working in it must never do, and how it should behave by default.

**Skills**
Bundled, task-specific procedures loaded on demand rather than kept in context at all times. A skill packages the know-how for doing one kind of thing well — building a specific file format, following a specific review checklist — so it only costs context when it is actually needed.

**Commands**
Reusable prompts invoked explicitly, typically as a slash command, rather than triggered automatically by task type.

**Sub-agents**
Agents given their own separate context so a large or noisy exploration (searching a codebase, running a long investigation) does not pollute the main agent's working context. Work is delegated out and only the result comes back.

**MCP (Model Context Protocol)**
An open standard, released by Anthropic in November 2024, for connecting an AI application to external tools and data sources through a single client-server protocol rather than a bespoke integration per pair. Often described as "USB-C for AI."

- [Anthropic, "Introducing the Model Context Protocol"](https://www.anthropic.com/news/model-context-protocol)

**Plugin**
The full assembly — instructions, skills, sub-agents, and MCP connections — packaged, versioned, and shared as a unit, rather than configured by hand in every project.

**Workflow vs. agent**
A distinction Anthropic drew in December 2024:

> "Workflows are systems where LLMs and tools are orchestrated through predefined code paths. Agents [...] dynamically direct their own processes and tool usage, maintaining control over how they accomplish tasks."
>
> — [Anthropic, "Building Effective Agents"](https://www.anthropic.com/engineering/building-effective-agents)
