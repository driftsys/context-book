# Introduction

This book is a working reference for **context engineering**: the discipline of deciding what a coding agent (Claude Code, Codex, Copilot, Cursor, and similar tools) actually sees, from its instructions and tools to its spec and tests, so that its output can be trusted instead of merely hoped for.

It is organized in four parts:

- **History** traces how the field moved from "vibe coding" (improvising with an AI assistant and barely reading the output) through "context engineering" to "agentic engineering," the disciplined practice of orchestrating agents under spec, tests, and review. It places this in the longer history of AI, profiles the people who shaped it, and covers the ethical questions and the effects on society and on developers' work.
- **Glossary** defines the terms that come up constantly in this work: how LLMs behave, the tooling that shapes an agent's context, the methodology vocabulary, and the failure modes of LLMs and agents.
- **Tools** surveys the major coding agents and explains the mechanisms that extend them: rules, commands, skills, sub-agents, MCP, hooks, and plugins.
- **Techniques** is a practical section on the disciplines that make agentic work reliable (spec-driven development and test-driven development), plus the quality-control techniques used day to day to check an agent's output rather than trust it.

A **bibliography** at the end lists every source cited. Claims are sourced throughout; where a term or date is uncertain, the text says so rather than guessing. The field moves fast: this edition reflects the state of things in September 2026.

*This book is also available [in French](https://driftsys.github.io/context-book/fr/).*
