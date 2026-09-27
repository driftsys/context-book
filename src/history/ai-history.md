# A Short History of AI

From an abstract machine on paper to agents that write most of the code. This chapter covers the long arc of AI. [From Vibe Coding to Agentic Engineering](timeline.md) then zooms in on the last few years.

## Foundations (1936–1956)

- **1936 — The Turing machine.** Alan Turing's "On Computable Numbers" defines an abstract machine that can carry out any computation that can be written as an algorithm. It is the theoretical basis of every computer since.
- **1943 — The artificial neuron.** Warren McCulloch and Walter Pitts model the neuron as a logical threshold unit, the ancestor of every neural network.
- **1950 — "Can machines think?"** Turing's "Computing Machinery and Intelligence" proposes the imitation game, later known as the Turing test. ([Mind, 1950](https://doi.org/10.1093/mind/LIX.236.433))
- **1950 — Chess as the benchmark.** Claude Shannon's "Programming a Computer for Playing Chess" sets out minimax search and position evaluation. Chess becomes AI's *Drosophila*, the model problem the field measures itself against for fifty years.
- **1956 — AI gets its name.** John McCarthy, Marvin Minsky, Claude Shannon, and Nathaniel Rochester organize the Dartmouth summer workshop, where the term "artificial intelligence" is adopted.

## Symbolic AI and the winters (1957–1990s)

- **1958 — The perceptron.** Frank Rosenblatt builds a learning machine from artificial neurons, and the press predicts it will soon walk, talk, and be conscious.
- **1959 — "Machine learning" at IBM.** Arthur Samuel's checkers program at IBM improves by playing against itself, and Samuel coins the term *machine learning*.
- **1966 — ELIZA.** Joseph Weizenbaum's pattern-matching chatbot convinces some users it understands them. It is the first demonstration of how readily people attribute understanding to fluent text.
- **1969 — *Perceptrons*.** Minsky and Papert show the limits of single-layer networks. Funding moves to symbolic, rule-based AI.
- **1970s–1990s — Expert systems and two AI winters.** Hand-written rule systems see commercial success in the 1980s but prove brittle and expensive to maintain. Inflated promises twice end in collapsed funding: the mid-1970s and the late 1980s.
- **1986 — Backpropagation.** Rumelhart, Hinton, and Williams popularize backpropagation, making multi-layer networks trainable.
- **1989–1998 — Convolutional networks.** Yann LeCun's networks read handwritten zip codes and bank checks in production. Optical character recognition (OCR) was one of the first commercial uses of neural networks.
- **1992 — TD-Gammon.** Gerald Tesauro at IBM trains a neural network to play backgammon at world-class level purely through self-play reinforcement learning. The recipe returns twenty years later in AlphaGo.
- **1996–1997 — Deep Blue vs. Kasparov.** IBM's Deep Blue, which grew out of the Deep Thought project at Carnegie Mellon, loses its first match against world champion Garry Kasparov in 1996. It wins the 1997 rematch 3½–2½. Deep Blue relied on brute-force search (about 200 million positions per second) and a hand-tuned evaluation function, not learning. It is the high point of classical AI, and it showed that "intelligent" behavior can come from sheer computation.
- **1997 — LSTM.** Hochreiter and Schmidhuber publish the long short-term memory network, the recurrent architecture that later dominates speech and translation.

## Google and learning at web scale (1998–2016)

Much of modern machine learning grew out of trying to make search better.

- **1998 — PageRank.** Larry Page and Sergey Brin rank the web by its link graph. The central idea is that relevance can be learned from data at scale instead of hand-coded.
- **2000s — Statistics beat rules.** Google's spelling correction ("Did you mean…") and, from 2006, Google Translate learn from massive text corpora instead of grammars. Peter Norvig and colleagues summarize the lesson in "The Unreasonable Effectiveness of Data" (2009).
- **2004–2009 — Digitizing the world's books.** Google Books scans millions of volumes, and Google open-sources the Tesseract OCR engine (2005). reCAPTCHA, acquired by Google in 2009, has humans transcribe the words that OCR can't read. OCR turns paper into text that search, and later language models, can train on.
- **2011–2012 — Google Brain.** Jeff Dean, Andrew Ng, and Greg Corrado start Google Brain. Its 2012 "cat neuron" network learns to recognize cats from unlabeled YouTube frames. Google hires Hinton's team in 2013 and acquires DeepMind in 2014.
- **2015–2016 — Neural search and translation.** RankBrain brings neural networks into search ranking. Google Neural Machine Translation replaces phrase-based Translate with a single seq2seq network. The pressure to make translation faster and better leads directly to the Transformer.

## Statistical learning and big data (1984–2016)

While neural networks were out of fashion, machine learning became mainstream through simpler statistical models, and through the infrastructure to train them on ever larger datasets.

- **1984–1993 — Decision trees.** Breiman et al.'s CART (1984) and Ross Quinlan's ID3 (1986) and C4.5 (1993) learn readable if/then rules from data. They are the learned counterpart of the hand-written expert systems of the same era.
- **1995 — Support vector machines and boosting.** Cortes and Vapnik's SVMs, which rest on solid statistical learning theory, become the method of choice for classification. Freund and Schapire's AdaBoost shows that many weak learners can be combined into a strong one.
- **2001 — Random forests and gradient boosting.** Leo Breiman's random forests (bagged decision trees) and Jerome Friedman's gradient boosting machines make tree ensembles accurate, robust, and easy to use. In the same year, Breiman's essay "Statistical Modeling: The Two Cultures" argues for judging models by prediction rather than interpretation, the stance deep learning later takes to its extreme.
- **2004–2006 — MapReduce and Hadoop.** Google's MapReduce paper (Dean and Ghemawat, 2004) and its open-source clone Hadoop (2006) make it routine to process datasets spread across thousands of commodity machines. "Big data" becomes an industry.
- **2006–2009 — The Netflix Prize.** A $1M competition to improve movie recommendations by 10% is won by an ensemble of hundreds of models. It popularizes matrix factorization and establishes public leaderboards as a way to drive progress.
- **2007 — CUDA.** NVIDIA makes GPUs programmable for general computation. Five years later, AlexNet is trained on two gaming GPUs.
- **2010s — Data science.** Kaggle (2010), scikit-learn (2010), and "data scientist" as a job title bring statistical ML to every company. XGBoost (2014, published 2016) dominates tabular competitions, and on tabular data gradient-boosted trees still often beat neural networks today.

## The deep-learning revolution (2006–2017)

- **2006 — "Deep learning."** Hinton's deep belief networks revive interest in training deep networks layer by layer.
- **2009 — ImageNet.** Fei-Fei Li's labeled image dataset provides the benchmark that will prove deep learning works.
- **2011 — Watson wins *Jeopardy!*.** IBM's Watson beats champions Ken Jennings and Brad Rutter by combining information retrieval with many statistical models. It is a triumph of open-domain question answering, but its later commercial use in healthcare largely disappoints, a cautionary tale about the gap between a demo and a product.
- **2012 — AlexNet.** Krizhevsky, Sutskever, and Hinton win ImageNet by a wide margin with a GPU-trained convolutional network. It is the start of the modern era; see [Key Figures](key-figures.md).
- **2013 — word2vec.** Mikolov et al. show that words can be represented as vectors whose geometry captures meaning. ([arXiv:1301.3781](https://arxiv.org/abs/1301.3781))
- **2014 — Seq2seq, attention, GANs.** Sutskever et al. translate with encoder–decoder networks. Bahdanau, Cho, and Bengio add attention. Goodfellow et al. introduce generative adversarial networks.
- **2014–2016 — Tesla Autopilot.** Tesla ships driver assistance to consumer cars, and every car on the road becomes a source of training data.
- **2016 — AlphaGo.** DeepMind's AlphaGo beats Lee Sedol at Go, a decade earlier than most experts predicted. Unlike Deep Blue, it learned its evaluation from human games and self-play.
- **2017 — AlphaZero.** DeepMind's AlphaZero learns chess, shogi, and Go from the rules alone, through self-play, and beats the strongest chess engine, Stockfish. Chess, the benchmark of symbolic AI, falls to pure learning.

## Transformers and scale (2017–2022)

- **2017 — "Attention Is All You Need."** Vaswani et al. at Google introduce the Transformer, which drops recurrence entirely. Every model in the rest of this book is a Transformer. ([arXiv:1706.03762](https://arxiv.org/abs/1706.03762))
- **2017 — Software 2.0 at Tesla.** Andrej Karpathy becomes Tesla's Director of AI and writes ["Software 2.0"](https://karpathy.medium.com/software-2-0-a64152b37c35): code written by optimizing neural network weights against data rather than by hand. His "data engine" (collect the failure cases from the fleet, label them, retrain, redeploy) is a direct ancestor of today's evaluate-and-iterate loop with coding agents. By 2024, Tesla's FSD v12 has replaced most of its hand-written driving logic with an end-to-end neural network.
- **2018 — GPT and BERT.** OpenAI's GPT and Google's BERT show that pre-training on raw text, then adapting the model to a task, beats task-specific architectures.
- **2019 — GPT-2.** OpenAI initially withholds the full model over misuse concerns, the first staged release of a language model.
- **2019 — BERT in Search.** Google applies BERT to search queries and calls it one of the biggest leaps in the history of Search.
- **2020 — GPT-3 and scaling laws.** A 175-billion-parameter model performs tasks from a few examples in the prompt ("in-context learning"). Kaplan et al. show loss falls predictably with scale. ([arXiv:2005.14165](https://arxiv.org/abs/2005.14165), [arXiv:2001.08361](https://arxiv.org/abs/2001.08361))
- **2021 — Code models.** OpenAI's Codex powers the GitHub Copilot preview, the first mainstream AI coding assistant. Anthropic is founded the same year.
- **2022 — RLHF and ChatGPT.** InstructGPT shows that reinforcement learning from human feedback makes models follow instructions. ([arXiv:2203.02155](https://arxiv.org/abs/2203.02155)) ChatGPT launches on November 30, 2022 and reaches 100 million users within about two months.

## The assistant and agent era (2023–today)

- **2023 — Frontier assistants.** OpenAI releases GPT-4 and Anthropic releases Claude, both in March. Open-weight models (Meta's Llama) spread quickly. Context windows grow from a few thousand tokens to hundreds of thousands.
- **2024 — Multimodality, reasoning, tools.** Claude 3, GPT-4o, and Claude 3.5 Sonnet raise the ceiling on coding. OpenAI's o1 introduces models trained to reason at length before answering. Anthropic ships computer use and open-sources the [Model Context Protocol](timeline.md#november-25-2024--the-model-context-protocol).
- **2024–2025 — OCR gets absorbed by LLMs.** Vision-language models (GPT-4o, Claude, Gemini) read scanned pages, tables, and handwriting directly, collapsing the old OCR → parsing → understanding pipeline into a single model call. Dedicated models such as Mistral OCR (2025) and DeepSeek-OCR (October 2025) follow. DeepSeek-OCR goes further: it renders long text as images to compress it into fewer vision tokens, which makes OCR a context-engineering technique.
- **2025 — Agents write code.** DeepSeek-R1 shows that open models can reason too. Anthropic launches Claude Code, an agent that works directly in the terminal and the repository. "Vibe coding" and then "context engineering" enter the vocabulary.
- **2026 — Agentic engineering and Mythos.** Karpathy names the discipline "agentic engineering." In April, Anthropic announces Claude Mythos Preview under Project Glasswing. It withholds general release and gives access only to selected partners for defensive security work, because the model finds and exploits software vulnerabilities well enough to raise new security risks. It is the first time a frontier lab has held back a model primarily over its cyber capabilities.

## The through-line

Each era moved more of the work from the human writing explicit instructions to the machine learning them. Rules gave way to learned features, learned features to pre-trained models, and pre-trained models to agents. What remained for the human changed from *writing the program* to *specifying the goal and curating the context*. That shift is the subject of the rest of this book.
