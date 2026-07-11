# Pentimento

**A memoir of your archive, with a right of reply.**

---

## Why this exists

Algorithmic autobiography is already a mass medium. Every year, machines write hundreds of millions of stories about people — year-in-reviews, listening recaps, auto-curated memory reels, "your top genre was..." These stories share three defects: they cite no evidence, they admit no doubt, and they accept no correction. There is no way to tell Spotify Wrapped that March was the month your father died, not your "horror phase."

As personal archives deepen and generative models improve, machines will narrate more of our lives, more fluently, with the same one-way authority. That asymmetry — they write, you receive — is a design failure, not an inevitability. Nobody has designed the grammar of talking back.

Pentimento is that grammar, built and working:

**Propose → show evidence → accept, reframe, or strike → correction outranks reading → the revision carries the scar.**

It reads an archive of watching and writes a first draft of what changed in you. Every sentence can answer "why?" — click it and the evidence reopens. Every reading can be struck; struck readings stay in the draft, crossed out, with your correction in the margin. Ask for a second draft and the system revises itself around your words, keeping its own struck claims visible inside the revision. The argument is the document.

**The position, in one line: software that narrates a person owes that person a right of reply.**

## What it refuses

No scores. No personality types. No streaks, comparisons, or achievements. No claims without evidence. No certainty the reader didn't authorize. No quiet restoration of a withdrawn reading.

## What's inside

- **Maya's archive** — an authored research probe (labeled as such in the product): three chapters that teach the grammar, ending with the question the archive can't answer — *how much of the drift was hers?*
- **Your archive** — import a Letterboxd export (diary.csv or watched.csv). Parsed and read entirely in your browser, kept nowhere. Chapters are computed from observable evidence only: pace breaks, silences and returns, long-gap rewatches, and the found/fed ratio. Below evidence thresholds, it declines to interpret — silence is a designed behavior.
- **Printable drafts** — scars included. The memoir is designed to leave the screen.

## Status

Design research, in the open. This is a working probe, not a product. The framework, vocabulary, and research record live in [VISION.md](VISION.md), [THEORY.md](THEORY.md), [LANGUAGE.md](LANGUAGE.md), and [RESEARCH.md](RESEARCH.md); the narrative is in [CASESTUDY.md](CASESTUDY.md). A participant study (RESEARCH.md, E3) is designed and unrun; its second purpose is a **corrections corpus** — struck machine sentences paired with what people said instead, a first taxonomy of how algorithmic autobiographies fail.

*(Formerly "Taste Trails," then briefly "Second Draft." The renames and reframe are documented in RESEARCH.md, entries E4 and E6 — the strike mechanic turned out to be the thesis, not a feature, and the name followed it. A pentimento is a painter's earlier stroke left visible through the finished work: the change of mind, kept.)*

## Run it

```
cd app
npm install
npm run dev
```

Vite + React + TypeScript. No backend, no telemetry, no network calls with your data — the import is `FileReader` in, memory only.
