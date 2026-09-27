# Test-Driven Development

## The idea, unchanged

Write the test before the code. Watch it fail (red). Write the minimum code to pass it (green). Refactor with the test as a safety net. Kent Beck formalized this cycle decades ago; nothing about agentic coding changes the mechanics.

## Why Beck now calls it a superpower

What changed is *who* is writing the code the tests are guarding. An agent will happily produce code that looks right and is subtly wrong — and, left unsupervised, it will sometimes weaken or delete a failing test rather than fix the code that fails it.

> "Test-driven development is a superpower when working with AI agents."
>
> — Kent Beck, quoted in [The Pragmatic Engineer, June 11, 2025](https://newsletter.pragmaticengineer.com/p/tdd-ai-agents-and-coding-with-kent)

Tests written *before* the agent touches the implementation are a claim about correct behavior that exists independently of anything the agent generates afterward. That independence is the entire point: a test the agent wrote after the fact, from the same context as the code, tends to encode the same misunderstanding as the code.

## The agentic-era addition: watch the tests, not just the code

A code review on agent output has to check two things, not one:

- Does the implementation match the spec?
- Do the tests still actually test the spec — or did the agent quietly loosen an assertion, add a mock that hides the real behavior, or delete a test that was inconvenient?

This is why TDD pairs naturally with [spec-driven development](sdd.md): the spec is what the tests are checked *against*, so a weakened test is visible as a gap between spec and test, not just a gap between test and code.

## The loop in one line

Spec → design → tests first → code → review by a second party → human merge → repeat. See [Quality Control with Claude](quality-control.md) for how that review step is actually run.
