# interview experience at atlan

I got referred to Atlan, and the loop that followed barely resembled a "normal" SDE interview. Nobody asked me to reverse a linked list. Almost every round was pointed at one thing — **how do you actually build with agents** — and then, separately, whether I lead like someone who owns the outcome.

So this is less "interview experience" and more a breakdown of what they were really probing.

## The 15-min EM call

First call. 15 minutes with an engineering manager, and it set the tone for everything after.

We went straight into my agentic workflow : not tools-as-buzzwords, but the actual mechanics:

- how I bootstrap a greenfield project from zero with an agent in the loop, what context I seed, how I scope the first pass so the agent isn't hallucinating an architecture
- the daily stack — Claude Code, Cursor, and the MCPs I keep wired in
- how I close the loop on what the agent writes — review and testing. Back then that was Cursor's bug bot plus a couple of MCPs hooked up purely for test generation and verification

The point they were checking: do I treat the agent as autocomplete, or as something I orchestrate with real guardrails. 15 minutes, no fluff.

## The technical round

This was with an SDE-2 and a Principal Engineer, both working on MCP architectures and conversational search at Atlan — the exact lane I've been building in. So it got deep fast, and it stayed technical the whole way.

I opened with a project that maps almost 1:1 to Atlan's surface area, and we went **first principles** on it — not "what did you build" but "why does each layer exist and what breaks if you remove it".

### Search — the first 30 minutes

The core of it:

- I'd plugged my **own MCP** into the search layer and exposed it as a **production MCP** — a real server, consumable by external orgs (government agencies in this case), not a toy
- the retrieval stack: **BM25** as the lexical baseline, then **HNSW** indexes layered on top for the dense/ANN side
- the optimisation conversation was where it got good — tuning BM25, where lexical actually wins), then HNSW (the recall/latency tradeoff), discussing mcp orchestration and document lineage/precedence matching within platform and how the search fuses into a **hybrid** ranker instead of fighting each other

I walked them through my Excalidraw diagrams of the layered search architecture, because the *why* of each layer matters more than the code. That's the part they kept pulling on.

### The curveball — LLM observability

Around the 30-minute mark they handed me a fresh feature to design live: **bring observability into the whole pipeline.**

Underneath it, the real question was **traceability**:

- when a source gets cited, was it the *right* source ? how do you even know ?
- how do you read the traces to attribute a bad answer back to the retrieval step vs the generation step
- and then the interesting part — can you build an **autonomous agentic system** that *consumes* those traces and improves the product on its own ? prompt management, prompt versioning, auditing of prompts and skills, the whole feedback loop

The thesis I argued: a search/RAG system should be **self-iterating**. Traces in → evals → prompt/index adjustments out, with the human stepping in only at the decision points that actually need judgement.

Which is exactly where **HITL** came up — what do humans still own once the system can largely correct itself ? My answer: the irreversible calls and the eval criteria, not the per-query babysitting.

We touched **Langfuse** for the trace/eval layer, **LangGraph** for orchestrating the agentic loop, and why that orchestration genuinely pays off in search instead of being overhead.

If I compress the whole round into two words: **traceability and observability.** But the meta-signal was clear — they weren't testing whether I can write the code. They were testing whether I can **reason about a system end to end and drive an agent to build it**. Agentic development was the actual subject of the interview.

## The cultural round — leadership

Two-three days later, a round with a Director of Engineering. Zero code. This one was about **how I lead and how I own.**

It started as a normal conversation and turned into a real read on decision-making:

- the systems I've built, the problems I hit, and *how* I tackled them — not the polished version
- how I take feedback, and my first instinct the moment something breaks
- the role I actually play on a team — how I sync my work with everyone else's instead of running off solo, how I bring people up to the same context
- leadership from college and the places I've worked — where I've actually had to carry an outcome

The whole round was pointed at **ownership**. Atlan runs on bias for action — high ownership, high agency — and a fast-iterating org only works if people drive without being pushed. So the question underneath everything was: does this person take the outcome as theirs, and can they pull a team along with them, or do they optimise for themselves and leave the rest behind.

It closed on the big picture — Atlan's vision, what my core function would be, what would genuinely be hard for me there. None of that is the JD. It's "do you fit, and do you iterate on your own problems like an owner".

Five days later — offer letter.

## My thoughts ?

The thing I'd tell anyone walking into this:

- **stop over-indexing on syntax.** Be able to defend why every layer of your system exists, from the index up. Know your own diagrams cold.
- **agentic development is the actual skill now.** Not a shortcut around engineering — the engineering. How you scope context, prompt, set guardrails, and verify an agent's output *is* the thing being evaluated.
- **observability and traceability aren't a nice-to-have** in any serious LLM system. Know how to attribute a failure and how to close the loop on it.
- and in the leadership round — **own the outcome out loud.** They can tell the difference between someone narrating ownership and someone who actually carries it.

Easily the most aligned loop I've sat through.

thank you!
