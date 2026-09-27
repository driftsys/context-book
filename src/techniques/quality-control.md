# Quality Control with Claude

Passing tests are necessary but not sufficient — an agent can satisfy a weak test suite while the underlying behavior is still wrong. These are the techniques used, day to day, to check an agent's output rather than simply trust that green means correct.

## Mutation testing

Deliberately break the code — flip a comparison, off-by-one an index, drop a negation — and check that the existing test suite actually notices. A test suite that stays green through injected bugs is not verifying the behavior it claims to cover; it is passing by coincidence. This matters more with agent-written tests specifically, because an agent optimizing to make a test pass has no independent incentive to make that test *strict*.

## Second-opinion code review

Never let the agent that wrote the code be the only reviewer of it. A second model, a different provider, or a human reviews the diff independently before it merges. The point is not redundancy for its own sake — it is that a single agent reviewing its own output shares the same blind spots that produced the output in the first place. Agreement between two independently-arrived-at reviews is a much stronger signal than one agent's self-assessment.

## Property testing

Instead of checking a handful of example inputs, state a general property that should hold for *any* valid input — `decode(encode(x)) == x`, a sort that never reorders duplicates, a balance that never goes negative — and let a property-testing framework generate adversarial inputs to try to break it. Example-based tests only check what someone thought to write down; property tests check what the agent (or a human) didn't think to check.

## Fault injection

Deliberately trigger failures — a dropped network call, a timeout, a malformed response from a dependency — to verify the system degrades the way it is supposed to, rather than assuming error-handling code written by an agent actually handles the errors it claims to handle. Agent-written error handling is a common place for confident-looking code that has never actually been exercised against a real failure.

## Why all four together

Each technique catches a different failure mode of agent-generated code:

| Technique | Catches |
| --- | --- |
| Mutation testing | Tests that don't actually verify anything |
| Second-opinion review | Blind spots shared between the agent and its own review of itself |
| Property testing | Edge cases no one thought to write an example for |
| Fault injection | Error-handling code that has never been exercised |

None of them replace [spec-driven](sdd.md) and [test-driven](tdd.md) development — they are what runs *inside* that loop's review step, to make "the tests pass" mean something closer to "the behavior is actually correct."
