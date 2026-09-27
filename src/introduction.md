# Introduction

This book is a working reference for **context engineering**: the discipline of deciding what a coding agent (Claude, Codex, Cursor, and similar tools) actually sees — its instructions, its tools, its spec, its tests — so that its output can be trusted instead of merely hoped for.

It is organized in three parts:

- **History** traces how the field moved from "vibe coding" — improvising with an AI assistant and barely reading the output — through Andrej Karpathy's "context engineering," the delicate art of filling an agent's context window with just the right information, to "agentic engineering," the disciplined practice of orchestrating agents under spec, tests, and review. It also profiles the people whose posts, talks, and tools shaped this vocabulary.
- **Glossary** defines the terms that come up constantly in this work: how LLMs behave, the tooling that shapes an agent's context (rules, skills, sub-agents, MCP), and the methodology vocabulary (greenfield, brownfield, drift).
- **Techniques** is a practical section on the two disciplines that make agentic work reliable — spec-driven development and test-driven development — plus the quality-control techniques used day to day to check an agent's output rather than trust it.

Every claim in the History section is sourced; where a term or date is uncertain, the text says so rather than guessing.
