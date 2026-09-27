# The Coding Agent Landscape

This chapter gives an overview of the major coding agents as of late September 2026. The field changes monthly, so treat product details as a snapshot. The categories and conventions last longer than any single product.

## Categories

Coding agents differ along three axes.

**Form factor**
- **Terminal agents (CLI/TUI):** Claude Code, Codex CLI, OpenCode, Pi, Copilot CLI, Aider, Amp, Factory's Droid.
- **AI-native IDEs,** usually forks of VS Code: Cursor, Kiro, Antigravity, Devin Desktop (formerly Windsurf), Zed.
- **IDE extensions:** GitHub Copilot, Cline, Kilo Code, and the IDE versions of Claude Code and Codex.
- **Cloud / background agents** that work asynchronously and return a pull request: Codex cloud, Copilot coding agent, Claude Code on the web, Cursor cloud agents, Jules, Devin.
- **Desktop "agent managers"** for running several agents in parallel: the Claude desktop app, the Codex app, Cursor 3's Agents Window, Antigravity, JetBrains Air.

**License**
- **Open source:** Codex CLI, OpenCode, Pi, Cline, Kilo Code, Goose, Aider, Zed, Warp.
- **Proprietary:** Claude Code, Cursor, Copilot, Devin, Kiro, Antigravity, Junie, Amp, Factory.

**Model binding**
- **Tied to the maker's models:** Claude Code (Claude), Codex (GPT), Antigravity (Gemini-first).
- **Multi-model, curated by the vendor:** Copilot, Cursor, Kiro, Amp, Devin.
- **Bring your own model:** OpenCode, Pi, Cline, Kilo Code, Aider, Goose, Zed.

The categories are blurring. By 2026, most major vendors offer a CLI, an IDE integration, a desktop app, *and* cloud agents. As frontier models have converged in capability, the *harness* has become a key differentiator: the tools, prompts, context management, and workflow around the model.

## The major agents

### Claude Code (Anthropic)

- **Released:** research preview February 2025 with Claude 3.7 Sonnet; generally available May 2025.
- **Where it runs:** the terminal (its flagship), VS Code and JetBrains, a desktop app, the web (claude.ai/code), mobile, Slack, and CI (GitHub Actions, GitLab). The Claude Agent SDK exposes the same harness for building custom agents.
- **License and models:** proprietary; Claude models only, also available through AWS Bedrock, Google Vertex AI, and Microsoft Foundry.
- **Notable:** it established many of the conventions other agents adopted: `CLAUDE.md` rules files (it can also read `AGENTS.md`), skills, sub-agents, hooks, MCP, and plugins. It also has cloud sessions and scheduled Routines (2026).
- **Pricing:** included in Claude Pro, Max, Team, and Enterprise subscriptions, or pay-per-token through the API.
- **Market:** Anthropic reported a run-rate above $2.5 billion for Claude Code in February 2026.
- **Positioning:** the reference terminal-first agent. ([docs](https://code.claude.com/docs/en/overview))

### OpenAI Codex

- **Released:** the open-source Codex CLI in April 2025, and a cloud agent in ChatGPT in May 2025, followed by IDE extensions and a desktop app. In 2026, the Codex app was folded into the ChatGPT desktop app.
- **License and models:** the CLI is open source (Apache 2.0, written in Rust); the cloud service is proprietary. It uses OpenAI's GPT-Codex models by default.
- **Notable:** OpenAI originated `AGENTS.md`. Codex emphasizes sandboxing and asynchronous cloud tasks, and it supports skills and MCP.
- **Pricing:** included in ChatGPT plans, from Free to Enterprise, or via the API.
- **Positioning:** the closest rival to Claude Code, with an open-source client. ([GitHub](https://github.com/openai/codex))

### GitHub Copilot (Microsoft)

- **Released:** autocomplete in 2021–2022. Agent mode in VS Code came in early 2025, and the **Copilot coding agent** (assign an issue, get a draft PR) became generally available in September 2025. The Copilot CLI followed in February 2026.
- **License and models:** proprietary; multi-model (Claude, GPT, Gemini).
- **Notable:** reads `.github/copilot-instructions.md` and `AGENTS.md`; supports skills, MCP, and plugins. Since 2026, **Agent HQ** lets developers run Claude and Codex agents inside GitHub.
- **Pricing:** tiers from Free to Enterprise.
- **Positioning:** the incumbent with the widest distribution. Its advantage is the GitHub-native workflow from issue to pull request to review, and acting as a hub for other vendors' agents. ([GitHub changelog](https://github.blog/changelog/2025-09-25-copilot-coding-agent-is-now-generally-available/))

### Cursor (Anysphere)

- **Released:** 2023 as a fork of VS Code. Cursor 2.0 (October 2025) introduced its own coding model, Composer. Cursor 3 (April 2026) replaced the chat pane with an Agents Window for running parallel local, worktree, and cloud agents.
- **License and models:** proprietary; multi-model plus its own Composer models.
- **Notable:** `.cursor/rules` and `AGENTS.md`, skills, MCP, hooks, cloud agents, and Bugbot code review.
- **Market:** valued at $29.3 billion in November 2025. In June 2026, SpaceX announced it would acquire Cursor for $60 billion in stock, the largest acquisition of a startup to date. ([CNBC](https://www.cnbc.com/2026/06/16/spacex-spcx-cursor-acquisition-ipo.html))
- **Positioning:** the leading AI-native IDE, moving toward agent orchestration.

### OpenCode (Anomaly, the team behind SST)

- **Released:** 2025.
- **License and models:** open source (MIT); fully model-agnostic, with more than 75 providers including local models.
- **Notable:** built-in "build" and "plan" agents, LSP integration, `AGENTS.md`, MCP, and plugins, in a terminal UI, a desktop app, or a headless server. It is one of the most-starred coding agents on GitHub, and other agents (such as Kilo CLI) are built on it.
- **Positioning:** the open, provider-neutral alternative to Claude Code. ([GitHub](https://github.com/anomalyco/opencode))

### Pi (Mario Zechner, Earendil)

- **Released:** 2025 by Mario Zechner, creator of the libGDX game framework. In April 2026 he joined Armin Ronacher's company Earendil, and the project moved with him.
- **License and models:** open source (MIT); model-agnostic.
- **Philosophy:** deliberate minimalism. A system prompt under 1,000 tokens and four tools (read, write, edit, bash). No MCP, no built-in sub-agents, no plan mode, and no permission system: "containerize it instead." Everything else comes from TypeScript extensions, skills, and packages, which the agent can write for itself. It reads `AGENTS.md`.
- **Notable:** it is the engine inside OpenClaw, the viral personal agent.
- **Positioning:** the minimalist counterpoint to feature-heavy harnesses, and a demonstration that context control matters more than features. ([Zechner's write-up](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/), [GitHub](https://github.com/earendil-works/pi))

### Google: Gemini CLI, Antigravity, and Jules

- **Gemini CLI:** released June 2025 (Apache 2.0) with a generous free tier and `GEMINI.md` rules files.
- **Antigravity:** an agent-first IDE launched in November 2025 with Gemini 3, built partly by Windsurf's former leaders, whom Google had hired in July 2025. In 2026 Google announced that Gemini CLI would move into the Antigravity CLI.
- **Jules:** an asynchronous cloud agent that works on GitHub repositories and returns pull requests.

### Devin and Windsurf (Cognition)

- **Devin:** announced in March 2024 as "the first AI software engineer," a cloud agent that works asynchronously.
- **Windsurf:** Codeium's AI IDE, launched in November 2024. In July 2025 an acquisition by OpenAI fell through, Google hired its CEO, and Cognition acquired the rest of the company. In June 2026 Windsurf was rebranded Devin Desktop, joining Devin Cloud, a CLI, and a review product. ([Cognition](https://cognition.com/blog/windsurf))

### Others worth knowing

- **Kiro (AWS):** an IDE and CLI built around [spec-driven development](../techniques/sdd.md), with requirements, design, and task files, plus steering files and hooks. Generally available since November 2025.
- **Amp:** created by Sourcegraph and spun out as its own company in December 2025. Opinionated multi-model modes and an "Oracle" second-opinion model.
- **Aider:** the original git-native terminal pair programmer (2023, open source). It pioneered repository maps and edit-format benchmarks. Development has slowed since 2025.
- **Cline:** an open-source VS Code agent (2024) with bring-your-own-model, later a CLI and SDK. Its fork **Roo Code** shut down in 2026; **Kilo Code** continues the lineage and is now built on OpenCode.
- **Goose (Block):** an open-source, MCP-native general agent, donated to the Linux Foundation's Agentic AI Foundation in December 2025.
- **JetBrains Junie and Air:** JetBrains' agent and its agentic IDE, which can also host Codex, Claude, and Gemini agents.
- **Factory:** enterprise "Droid" agents and CLI, model-agnostic.
- **Zed:** an open-source editor with a built-in agent. It created the **Agent Client Protocol (ACP)** so any editor can host any agent.
- **Warp:** a terminal turned agentic development environment, open-sourced in April 2026.
- **Replit Agent:** a browser-based app builder aimed at non-developers, the home of much "vibe coding."

## Shared conventions

The biggest story of 2025–2026 is not any single tool but convergence on shared standards. It makes context engineering portable across agents:

- **`AGENTS.md`**: a plain Markdown rules file at the repository root. Released by OpenAI in August 2025 and adopted by tens of thousands of repositories within months. Most agents read it. Recent versions of Claude Code read it when there is no `CLAUDE.md`, and a `CLAUDE.md` can import it with `@AGENTS.md`.
- **MCP (Model Context Protocol)**: Anthropic's protocol for connecting agents to tools and data (November 2024), supported by almost every agent. Pi is the notable holdout, on the grounds that tool definitions cost too much context.
- **Agent Skills (`SKILL.md`)**: Anthropic published skills as an open standard in December 2025, and OpenAI, Microsoft, Google, Cursor, and others adopted it within weeks to months.
- **The Agentic AI Foundation**: in December 2025, `AGENTS.md`, MCP, and Goose moved to vendor-neutral governance under the Linux Foundation. See [AI and Ethics](../history/ethics.md#open-governance-and-the-linux-foundation).
- **ACP (Agent Client Protocol)**: Zed's "LSP for agents," joined by JetBrains, lets any compatible editor host any compatible agent.

A repository with a good `AGENTS.md`, a few skills, and well-scoped MCP servers works with most of the agents above. [Extension Mechanisms](mechanisms.md) explains each mechanism in detail.

## Benchmarks, and why to be careful

- **SWE-bench Verified:** 500 human-validated GitHub issues from Python projects. It was the headline benchmark for two years, but it became saturated and contaminated. In February 2026 OpenAI stopped reporting it, after finding flawed tests in many of the hardest unsolved problems, and recommended the harder **SWE-bench Pro**. ([OpenAI](https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/))
- **Terminal-Bench:** tasks in a sandboxed terminal. It evaluates the model *and* the harness together, which suits comparing agents.

Treat any leaderboard with caution. Scores depend on the harness, the compute budget, and the number of attempts. Vendors report their own numbers, sometimes on their own benchmarks. Training data may include the test set. And no benchmark captures long, multi-session work on a real codebase well. The only benchmark that fully counts is your own codebase and your own tasks.

## Choosing

There is no single best agent. The useful questions are:

- **Where do you work?** Terminal, IDE, or delegating to cloud agents and reviewing pull requests.
- **Do you need model choice?** For cost, data residency, local models, or independence from one vendor.
- **Open or closed?** Open-source harnesses can be audited and modified; proprietary ones are often more polished and more tightly integrated with their models.
- **How much structure do you want?** From Pi's four tools to fully configured harnesses with skills, sub-agents, and hooks.

Because the conventions are shared, the choice is less binding than it looks. Invest in the context (rules, specs, tests, and skills) rather than in any one tool.
