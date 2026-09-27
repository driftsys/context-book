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
