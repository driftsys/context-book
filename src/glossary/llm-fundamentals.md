# LLM Fundamentals

**LLM (Large Language Model)**
A model that predicts the most probable next text given everything in its context. It has no persistent memory and no built-in notion of truth — only patterns learned from training data.

**Context**
Everything the model can see at a given moment: system instructions, attached files, conversation history, the current message. Nothing outside the context exists for the model, however obvious it may seem to the human in the loop.

**Context window**
The hard size limit on that context. Once it is exceeded, the earliest content is truncated — silently, from the model's point of view.

**Context engineering**
Andrej Karpathy's term for deliberately managing what goes into the context window, as distinct from "prompt engineering":

> "Context engineering is the delicate art and science of filling the context window with just the right information for the next step."
>
> — [Andrej Karpathy, on X, June 2025](https://x.com/karpathy/status/1937902205765607626)

**Stateless**
The model retains nothing between turns on its own; every prior turn that matters must be re-sent as part of the next context.

**Hallucination**
The model invents a plausible-looking API, function, or fact that does not exist. A direct consequence of predicting likely text rather than verified text.

**Drift (or "slope")**
The gradual divergence of a long agent session from the original intent, in the absence of a stable spec to check against. The longer the session, the more the working context has been edited, summarized, or partially forgotten.
