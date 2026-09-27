# Methodology Terms

**Greenfield**
A new project with no existing code. The context is simply the spec being written — there is nothing for the agent to misunderstand yet.

**Brownfield**
An existing codebase. The context is whatever can be mapped out of it — the model does not know it in advance and must be given (or must discover) its structure, conventions, and constraints.

**Golden master (characterization test)**
A test that captures a system's current observable behavior *before* refactoring it, so that a refactor which changes behavior gets caught even when no one wrote a spec for that behavior in the first place.

**Strangler pattern**
Replacing a legacy component gradually, piece by piece, routing traffic to the new implementation as each piece is ready rather than rewriting the whole system at once.

**Vibe coding**
Prompting an LLM and accepting its output largely on trust, without close review. Coined by Andrej Karpathy in February 2025; later narrowed by Simon Willison to specifically mean generating code *without reviewing it* — see the [History](../history/timeline.md) chapter for both quotes.

**Agentic engineering**
Orchestrating autonomous agents with a support structure — spec, tests, review, tooling — around them, as the default professional practice rather than an occasional shortcut. Karpathy's term for what vibe coding grew into once the underlying models became reliable enough to trust with real production work, provided a human stays in the loop as reviewer.

**Cost per accepted change**
The full cost of one merged change from an agent: the model call, the corrections it took to get there, the time spent reviewing it, debugging, CI, and any residual bugs that shipped anyway — not just the price of the tokens spent generating it.
