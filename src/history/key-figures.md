# Key Figures

Short, source-backed profiles of the people whose work and words shaped the vocabulary in this book. The first section traces the deep-learning lineage that the LLM era grew out of; the second covers the people who named and shaped agentic engineering itself.

## The deep-learning lineage

Most of the people who built today's LLMs trace back to a small group of researchers — largely in Canada — who kept working on neural networks through the decades when the field considered them a dead end.

### Geoffrey Hinton

Professor emeritus at the University of Toronto, often called a "godfather of deep learning." Co-author of the 1986 paper that popularized backpropagation, and PhD supervisor of Ilya Sutskever and Alex Krizhevsky. With them he published AlexNet (2012), the ImageNet result that convinced the field deep learning worked at scale. Google acquired their startup, DNNresearch, in 2013; Hinton left Google in 2023 so he could speak freely about AI risk. Karpathy took Hinton's classes as a Toronto undergraduate.

- [Krizhevsky, Sutskever, Hinton, "ImageNet Classification with Deep Convolutional Neural Networks", NeurIPS 2012](https://papers.nips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html)
- [Nobel Prize in Physics 2024 (with John Hopfield)](https://www.nobelprize.org/prizes/physics/2024/summary/)

### Yoshua Bengio

Professor at the Université de Montréal and founder of Mila, the Quebec AI institute. His 2003 neural probabilistic language model introduced learned word embeddings for language modeling, and his lab's 2014 paper with Dzmitry Bahdanau and Kyunghyun Cho introduced the attention mechanism that the Transformer later built on.

- [Bahdanau, Cho, Bengio, "Neural Machine Translation by Jointly Learning to Align and Translate", 2014](https://arxiv.org/abs/1409.0473)

### Yann LeCun

Postdoc in Hinton's group in Toronto before moving to Bell Labs, where he developed convolutional neural networks (LeNet) for handwriting recognition. Professor at NYU and long-time Chief AI Scientist at Meta, and one of the most prominent skeptics that scaling LLMs alone leads to human-level intelligence.

Hinton, Bengio, and LeCun shared the 2018 ACM Turing Award "for conceptual and engineering breakthroughs that have made deep neural networks a critical component of computing."

- [ACM, "Fathers of the Deep Learning Revolution Receive ACM A.M. Turing Award", March 2019](https://www.acm.org/media-center/2019/march/turing-award-2018)

### Ilya Sutskever

Hinton's PhD student at Toronto and co-author of AlexNet. At Google he co-authored sequence-to-sequence learning (2014), the encoder–decoder recipe behind neural machine translation. He co-founded OpenAI in 2015 as chief scientist, driving its bet on scaling, and left in 2024 to co-found Safe Superintelligence.

- [Sutskever, Vinyals, Le, "Sequence to Sequence Learning with Neural Networks", 2014](https://arxiv.org/abs/1409.3215)

### Fei-Fei Li

Stanford professor who created ImageNet, the dataset whose annual challenge AlexNet won in 2012. She was Andrej Karpathy's PhD advisor, and together they taught CS231n, Stanford's convolutional networks course, whose public lecture notes became a standard entry point into deep learning.

- [CS231n: Deep Learning for Computer Vision](https://cs231n.stanford.edu/)

## Agentic engineering

### Andrej Karpathy

The bridge between the two halves of this chapter. Undergraduate at the University of Toronto, where he attended Hinton's classes, then PhD at Stanford under Fei-Fei Li. Founding member of OpenAI, later Senior Director of AI at Tesla, and known for teaching materials — CS231n, then "Neural Networks: Zero to Hero" — that a generation of engineers learned from directly. Karpathy coined **vibe coding** in a February 2025 tweet and, a year later, proposed **agentic engineering** as the more disciplined successor — orchestrating agents with oversight rather than prompting blind. He also popularized **context engineering** as a name for curating what an LLM sees in its context window.

- [Vibe coding tweet, Feb 2, 2025](https://x.com/karpathy/status/1886192184808149383)
- [Context engineering tweet, June 2025](https://x.com/karpathy/status/1937902205765607626)

### Simon Willison

Creator of the Django web framework's early ecosystem tooling and, more recently, one of the most closely followed independent writers on LLMs and AI-assisted coding. His March 2025 post narrowed "vibe coding" to mean specifically *unreviewed* AI-generated code — a distinction the rest of the field adopted to separate prototyping from engineering.

- [simonwillison.net, "Not all AI-assisted programming is vibe coding", March 19, 2025](https://simonwillison.net/2025/Mar/19/vibe-coding/)

### Kent Beck

Creator of Test-Driven Development and co-author of the Agile Manifesto and Extreme Programming. Decades into his career, Beck became an outspoken advocate for using TDD as a guardrail specifically *because* AI agents introduce regressions and will, left unchecked, delete or weaken tests to make them pass.

> "Test-driven development is a superpower when working with AI agents."
>
> — Kent Beck, quoted in [The Pragmatic Engineer, "TDD, AI agents and coding with Kent Beck", June 11, 2025](https://newsletter.pragmaticengineer.com/p/tdd-ai-agents-and-coding-with-kent)

### Sean Grove

Works on alignment research at OpenAI. His talk "The New Code" argued that in an agentic world, the specification — not the generated code — is the artifact worth writing, reviewing, and versioning, since code is "a lossy projection from the specification." The talk is widely credited with popularizing spec-driven development as an AI-era discipline rather than a niche formal-methods practice.

> "Code is sort of 10% to 20% of the value that you bring. The other 80% to 90% is in structured communication."
>
> — Sean Grove, "The New Code" ([transcript](https://lawwu.github.io/transcripts/8rABwKRsec4.html))

### David Soria Parra and Justin Spahr-Summers

Engineers at Anthropic credited with creating the Model Context Protocol, released in November 2024. MCP gave agentic tooling a standard way to reach external data and services, without which "rules, skills, sub-agents, and MCP" — the toolkit described in this book's glossary — would each need a bespoke integration per agent and per tool.

- [Anthropic, "Introducing the Model Context Protocol", Nov 25, 2024](https://www.anthropic.com/news/model-context-protocol)
