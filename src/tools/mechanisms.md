# Extension Mechanisms

A coding agent's behavior in a given repository is shaped by a stack of mechanisms: rules, commands, skills, sub-agents, MCP servers, hooks, and plugins. They differ in *who triggers them* and *when they cost context*. Choosing the right one for each piece of knowledge is the core practical skill of context engineering.

This chapter uses Claude Code as the reference, because it introduced most of these mechanisms, and gives the equivalents in other agents. Details are as of September 2026 and change quickly; check the current docs of your tool.

## The mental model

Every mechanism answers the same question: *how does this knowledge or capability reach the model, and at what cost?*

| Mechanism | Who triggers it | When it costs context | Best for |
|---|---|---|---|
| **Rules / instructions** | The harness, automatically | Every request, from the start of the session | Always-true facts: build commands, conventions, "never do X" |
| **Path-scoped rules** | The harness, when a matching file is read | Only after a matching file is touched | Language- or directory-specific guidance |
| **Commands** | The user, by typing `/name` | Nothing until invoked | Repeatable workflows, especially ones with side effects |
| **Skills** | The model (from the description) or the user | A short description always; the body when activated; resources on demand | Procedures and reference knowledge needed *sometimes* |
| **Sub-agents** | The model delegates, or the user asks | A separate context window; only a summary comes back | Heavy searching or reading, parallel work, restricted roles |
| **MCP servers** | The model calls tools; the user attaches resources | Tool names (or full schemas) up front; results when called | Live access to external systems and data |
| **Hooks** | The harness, on a lifecycle event | Nothing, unless the hook returns output | Guarantees: guardrails, formatting, policy |
| **Plugins** | A user or admin installs them | Nothing of their own; each bundled component costs what it normally does | Packaging and sharing a whole setup |

Two principles follow:

- **Always-on context is expensive.** Everything in a rules file is paid for on every request and competes for the model's attention (see [context rot](../glossary/failure-modes.md#context-failures)). Move anything not needed every time into something loaded on demand.
- **Instructions are advice; hooks are law.** Rules and skills are read by the model, which can misread or ignore them. If something *must* happen, or must never happen, enforce it with a hook or a permission rule.

## Rules and instructions

**What they are.** Markdown files the harness puts into the context at the start of every session. They carry the conventions and constraints of a repository: how to build and test, code style, architecture, what never to do.

**In Claude Code: `CLAUDE.md`.** Files are loaded from several scopes and concatenated; none replaces another:

| Scope | Location | Shared? |
|---|---|---|
| Organization (managed) | e.g. `/etc/claude-code/CLAUDE.md` on Linux | Set by IT, cannot be excluded |
| User | `~/.claude/CLAUDE.md` | All your projects |
| Project | `./CLAUDE.md` or `./.claude/CLAUDE.md` | Committed, shared with the team |
| Local | `./CLAUDE.local.md` | Personal, gitignored |

- Files in the working directory and every parent directory load at launch. Files in *subdirectories* load only when the agent reads files there.
- `@path/to/file` imports another file, up to four levels deep. Imported content still costs context.
- **`.claude/rules/*.md`** splits rules into modular files. A rule with `paths:` frontmatter loads only when a matching file is read:

```markdown
---
paths:
  - "src/api/**/*.ts"
---
- Every API endpoint must validate its input.
```

- `/init` generates a starter `CLAUDE.md` from the codebase. `/memory` edits memory files, and `/context` shows what was actually loaded.
- Claude Code also keeps **auto memory**: notes it writes for itself across sessions in a per-project memory directory.

**`AGENTS.md`: the shared convention.** Released by OpenAI in August 2025 and now governed by the Linux Foundation's Agentic AI Foundation, `AGENTS.md` is plain Markdown with no required schema. It is read by Codex, Copilot, Cursor, OpenCode, Pi, and most other agents, and by Gemini CLI when configured. Codex concatenates every `AGENTS.md` from the repository root down to the working directory. Recent versions of Claude Code read `AGENTS.md` natively when there is no `CLAUDE.md`. A `CLAUDE.md` containing the single line `@AGENTS.md` makes one file serve every agent.

**Equivalents in other agents.**
- **GitHub Copilot:** `.github/copilot-instructions.md` for the whole repository, plus path-specific `.github/instructions/*.instructions.md` files with an `applyTo:` glob.
- **Cursor:** `.cursor/rules/*.mdc` with `description`, `globs`, and `alwaysApply` frontmatter. Rules can be always applied, applied when the agent judges them relevant, applied to matching files, or applied only when mentioned.
- **Gemini CLI:** `GEMINI.md` files, loaded globally, per workspace, and just in time when a tool touches a directory.
- **Kiro:** steering files in `.kiro/steering/`.

**Best practices.**
- Keep each file short. Anthropic recommends under about 200 lines.
- Include only what is true for *every* task: commands, conventions, prohibitions. Move procedures into skills and file-type guidance into path-scoped rules.
- Remove contradictions and stale instructions. They are [context clash](../glossary/failure-modes.md#context-failures) waiting to happen.
- Put the most important constraints first ([lost in the middle](../glossary/failure-modes.md#context-failures)).

## Commands

**What they are.** Reusable prompts the *user* invokes explicitly, typically as `/name`. They suit workflows you want to run the same way every time: `/review`, `/release`, `/fix-issue 123`.

**In Claude Code, commands are now a kind of skill.** A file at `.claude/commands/deploy.md` and a skill at `.claude/skills/deploy/SKILL.md` both create `/deploy`, and work the same way. The older `commands/` format still works, but new work should use skills. A command-style skill:

```markdown
---
description: Fix a GitHub issue
argument-hint: [issue-number]
allowed-tools: Bash(gh issue view *)
disable-model-invocation: true
---
Fix issue #$ARGUMENTS following our coding standards.
Current changes: !`git diff HEAD`
```

- `$ARGUMENTS` (or `$0`, `$1`, …) inserts arguments. A line with `` !`command` `` runs a shell command and inlines its output before the model sees the prompt.
- `disable-model-invocation: true` means only the user can run it, and its description costs no context until then. Use it for anything with side effects, such as deploying, committing, or publishing.
- Built-in commands include `/clear`, `/compact`, `/context`, `/init`, `/memory`, `/mcp`, `/agents`, `/plugin`, `/hooks`, and `/permissions`. MCP servers can also expose prompts as commands.

**Equivalents.** The industry is converging on "a command is a skill the user invokes." Codex's custom prompts and VS Code's `.prompt.md` files are being deprecated in favor of skills. Gemini CLI uses TOML command files in `.gemini/commands/`.

## Skills

**What they are.** Packaged, task-specific know-how that the agent loads only when it is relevant: how to build a particular file format, follow a review checklist, run a release, or use an internal library. Anthropic introduced Agent Skills in October 2025 and published them as an open standard in December 2025 ([agentskills.io](https://agentskills.io)). By late 2026 dozens of products support the format, including Codex, GitHub Copilot, VS Code, Cursor, Gemini CLI, Junie, Kiro, and Goose.

**Format.** A skill is a folder with a `SKILL.md` and optional supporting files:

```
pdf-processing/
├── SKILL.md
├── scripts/fill_form.py
└── references/forms.md
```

```markdown
---
name: pdf-processing
description: Extract text from PDFs, fill forms, merge files. Use when working with PDF files.
---
# PDF processing
1. For forms, read [the forms reference](references/forms.md).
2. Fill fields by running `scripts/fill_form.py`.
```

`name` and `description` are required. The description should say both *what* the skill does and *when* to use it, because it is what the model uses to decide whether to load the skill.

**Progressive disclosure** is what makes skills cheap:
1. **Metadata:** only the name and description (about 100 tokens) are loaded at startup, for every skill.
2. **Instructions:** the body of `SKILL.md` loads when the skill is activated. Keep it under about 5,000 tokens.
3. **Resources:** reference files are read, and scripts are *executed* rather than read, only when needed.

A repository can therefore carry dozens of skills at the cost of a few thousand tokens, instead of stuffing all that knowledge into `CLAUDE.md`.

**Locations.**
- **Claude Code:** `~/.claude/skills/` (personal) and `.claude/skills/` (project), plus managed and plugin skills.
- **Shared:** `.agents/skills/` is emerging as a cross-agent location read by Codex, Copilot, and Gemini CLI.

**Best practices.**
- The description is the trigger: make it specific, with the words a user would actually use.
- Keep `SKILL.md` lean and move detail into reference files.
- Put deterministic steps in scripts. They are more reliable than prose, and running them costs almost no context.
- Audit third-party skills before installing them. A skill can include scripts that execute on your machine.

## Sub-agents

**What they are.** Agents that run in their *own* context window. The main agent delegates a task, the sub-agent works through it, which may mean reading dozens of files, and only a summary comes back. The main context stays clean.

**In Claude Code.** Sub-agents are Markdown files in `.claude/agents/` (project) or `~/.claude/agents/` (personal):

```markdown
---
name: code-reviewer
description: Reviews code for quality and security. Use after making changes.
tools: Read, Glob, Grep
model: sonnet
---
You are a senior code reviewer. Check the diff for correctness, security,
and consistency with the project's conventions. Report findings; do not edit.
```

- Only `name` and `description` are required. Optional fields restrict tools, choose a model, preload skills, attach MCP servers, set permissions, or run the agent in an isolated git worktree.
- **Built-in sub-agents** include *Explore* (read-only search), *Plan* (read-only research for plan mode), and *general-purpose*.
- The model delegates automatically when a task matches a description, or you can name the agent. Several sub-agents can run in parallel and in the background.
- A **fork** is the alternative when the task needs the full conversation history: it inherits the parent's context instead of starting fresh.

**When to use them.** Broad searches through a codebase; parallel, independent tasks; roles with restricted tools, such as a read-only reviewer; and an independent second opinion, since [a different agent should review the work](../techniques/quality-control.md), not the one that wrote it. Don't use them for tasks that depend on the details of the current conversation.

**Equivalents.** Codex supports custom agents defined in TOML (`.codex/agents/`). VS Code and Copilot use `.agent.md` files in `.github/agents/`. Cursor and Gemini CLI have their own sub-agent directories. Pi deliberately has none: you run another instance of the agent instead.

## MCP (Model Context Protocol)

**What it is.** An open protocol, introduced by Anthropic in November 2024 and now governed by the Agentic AI Foundation, for connecting agents to external tools and data. It replaces a custom integration for every pair of agent and service with one protocol that each side implements once. ([modelcontextprotocol.io](https://modelcontextprotocol.io))

**Architecture.** A *host* (the agent application) runs one *client* per *server*. Servers expose three primitives:
- **Tools:** actions the model can call, such as querying a database, creating an issue, or searching docs.
- **Resources:** data the user or application can attach, such as a file, a record, or a page.
- **Prompts:** templates the user can invoke, which appear as commands.

Servers run locally (the **stdio** transport) or remotely (**Streamable HTTP**, with OAuth). The July 2026 revision of the specification made the protocol stateless for easier scaling, deprecated some older client features, and formalized extensions such as **MCP Apps** (interactive UIs).

**In Claude Code.**

```bash
claude mcp add --transport http notion https://mcp.notion.com/mcp
claude mcp add --transport stdio db -- npx -y @bytebase/dbhub --dsn "postgresql://..."
```

A project can commit a `.mcp.json` so the whole team shares the same servers. Each teammate approves them before first use:

```json
{
  "mcpServers": {
    "issues": { "type": "http", "url": "https://mcp.example.com/mcp" }
  }
}
```

**Context cost.** Every tool's name, description, and JSON schema must reach the model somehow. A few MCP servers with dozens of tools used to consume tens of thousands of tokens before any work began, one reason Pi refuses MCP altogether. Claude Code now uses **tool search** by default: only tool names load up front, and full schemas are fetched when needed. Large tool *results* are still a cost, so prefer servers that return concise output.

**Security.** An MCP server is code you run with your credentials, and its outputs are untrusted input to the model. Tool results can carry [prompt injection](../glossary/failure-modes.md#security-failures), and combining private data, untrusted content, and the ability to send data out creates the [lethal trifecta](../glossary/failure-modes.md#security-failures). Install only vetted servers, give them least-privilege tokens, and require approval for sensitive tools.

**Equivalents.** Every major agent supports MCP: Codex (`config.toml`), Copilot and VS Code, Cursor (`mcp.json`), Gemini CLI (`settings.json`), and OpenCode, among others.

## Hooks

**What they are.** Shell commands (or HTTP calls, or small model evaluations) that the *harness* runs at fixed points in the agent's lifecycle, deterministically, whatever the model decides. They are the only mechanism here that *guarantees* behavior.

**Common events in Claude Code:** `SessionStart`, `UserPromptSubmit`, `PreToolUse` (can block an action), `PostToolUse` (can run a formatter or linter afterward), `Stop` (can check the work before the agent finishes), `PreCompact`, and sub-agent events.

```json
{
  "hooks": {
    "PreToolUse": [
      { "matcher": "Bash",
        "hooks": [{ "type": "command", "command": ".claude/hooks/block-dangerous.sh" }] }
    ],
    "PostToolUse": [
      { "matcher": "Edit|Write",
        "hooks": [{ "type": "command", "command": "npm run format --silent" }] }
    ]
  }
}
```

A `PreToolUse` hook that exits with code 2 blocks the action and returns its message to the model. Hooks cost no context unless they produce output.

**Uses.** Blocking destructive commands such as `rm -rf` or force-pushes, protecting files, running formatters and linters after every edit, running tests before the agent says it is done, logging, and loading fresh context at session start.

**Equivalents.** Gemini CLI, Copilot, Cursor, and Codex all have hook systems, but event names and formats differ, so hooks are the least portable mechanism.

## Plugins

**What they are.** A way to package a whole setup (skills, commands, sub-agents, hooks, MCP servers) and distribute it as a versioned unit, instead of copying configuration between repositories.

**In Claude Code** (since October 2025), a plugin is a directory with an optional `.claude-plugin/plugin.json` manifest and component folders:

```
deploy-tools/
├── .claude-plugin/plugin.json
├── skills/
├── agents/
├── hooks/hooks.json
└── .mcp.json
```

Plugins are distributed through **marketplaces**, which are simply git repositories with a `marketplace.json` catalog:

```
/plugin marketplace add my-org/claude-plugins
/plugin install deploy-tools@my-org
```

Plugin skills are namespaced (`/deploy-tools:release`) to avoid collisions. Organizations can pre-approve, force-install, or block marketplaces and plugins through managed settings.

**Cross-tool.** Codex, Copilot CLI, VS Code, Cursor, and Gemini CLI (as "extensions") all have plugin systems, and several can read each other's manifest formats. **Agent Plugins 1.0**, a vendor-neutral specification released in August 2026, standardizes the portable core, skills and MCP servers, across clients such as VS Code, Copilot, Codex, Cursor, and Kiro.

## Related mechanisms

- **Settings and permissions:** allow, ask, and deny rules for tools, such as `Bash(git *)`, evaluated outside the model. Deny rules always win. Managed settings let an organization enforce policy that users cannot override.
- **Output styles:** change the agent's tone, format, or role for a whole session, for example an explanatory or teaching mode. They cost context on every request.
- **Plan mode:** a read-only mode in which the agent researches and proposes a plan before editing. It is the lightweight form of [spec-driven development](../techniques/sdd.md).

## Choosing the right mechanism

- *"The agent should always know this."* → **Rules file**, kept short.
- *"The agent should know this when working on these files."* → **Path-scoped rule.**
- *"The agent should know how to do this when it comes up."* → **Skill.**
- *"I want to run this workflow by hand, the same way every time."* → **Command** (a user-invoked skill).
- *"This task needs lots of reading, or an independent view."* → **Sub-agent.**
- *"The agent needs live access to a system."* → **MCP server**, or a CLI the agent can already run.
- *"This must always, or never, happen."* → **Hook** or **permission rule.**
- *"The whole team or organization should have this setup."* → **Plugin.**
