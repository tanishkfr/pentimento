# Pentimento

> **Context:** Self-directed research-through-design  
> **Year:** 2026  
> **Role:** Independent designer, researcher, writer, and engineer  
> **Status:** Working research artifact; participant study not yet run  
> **Tools:** React, TypeScript, Vite, CSS, browser-local state  
> **AI disclosure:** AI-assisted ideation, critique, and code iteration; final concept selection, design decisions, editing, and authorship by Tanishk Salagame.  
> **Live:** https://pentimento-lovat.vercel.app/  
> **Source:** https://github.com/tanishkfr/pentimento

## The question

Year-in-review products and generated memory systems turn personal archives into stories. They usually cite little evidence, communicate little uncertainty, and offer no meaningful way for the person described to correct the account.

Pentimento asks:

> **When software narrates a person’s life from their archive, what does that person need in order to contest, correct, and co-own the story?**

The project’s position is simple: software that narrates a person owes that person evidence, uncertainty, and a right of reply.

## The artifact

Pentimento opens inside a first draft built from dates, titles, returns, and absences. Each consequential sentence can be opened to inspect its evidence. The reader may:

1. **Let it stand** — accept the proposed interpretation.
2. **Read it differently** — choose another defensible account of the same evidence.
3. **Strike it** — withdraw the machine’s sentence and optionally replace it in their own words.

Every choice remains revisable until the second draft is settled.

## The signature interaction

The strike is the load-bearing interaction.

When a reader strikes a claim, a red line draws across the machine’s language. The claim recedes into an underpainting while the reader’s correction rises in the human typographic voice. The evidence remains. The interpretation loses authority.

The final composition preserves three layers:

- the archive as evidence;
- the system’s withdrawn interpretation;
- the subject’s correction as sovereign ink.

The point is not deletion. Deletion would hide that the machine made the claim. The point is visible withdrawal: the system yields without rewriting history.

## Why a palimpsest, not track changes

A conventional comment places the subject beside the document. Track changes makes the subject one collaborator among peers. Pentimento instead changes the hierarchy of the page: the subject’s words become the leading text, and the machine’s earlier certainty becomes residue.

The name comes from painting. A pentimento is an earlier mark that remains visible through the finished work—a change of mind kept in the artifact.

## Two archives

The probe runs in two modes.

**Maya’s edition** is explicitly labeled as authored fictional research material. It demonstrates the interaction grammar without pretending to be participant evidence.

**Your archive** accepts a Letterboxd CSV and computes possible chapters locally in the browser. The raw archive is never uploaded. Below minimum evidence thresholds, the system declines to interpret rather than manufacture a story.

The finished session can be downloaded as a structured record containing choices, strikes, and correction history, but not the raw archive.

## Design system as authorship system

Three typographic voices clarify who is speaking:

- Space Grotesk: system observations and interpretations;
- Fraunces italic: human titles and corrections;
- IBM Plex Mono: evidence, provenance, and the revision record.

Red is reserved for moments where human agency acts on the document: strike controls, withdrawal marks, focus, and sovereign ink. Before interaction, claims use a neutral underline.

Motion has one job: show a transfer of authority. Evidence unfolds; machine language yields; human language settles. Reduced-motion preferences preserve the same hierarchy without the choreography.

## Research position

Contestable-AI research largely addresses consequential automated decisions. Work on algorithmic autobiography and algorithmic identity examines how platforms construct datafied selves and how people reflect on those constructions. Pentimento sits between those areas: it proposes a concrete interaction grammar for contesting a machine-authored narrative of the self while preserving the dispute in the resulting artifact.

This is a narrower claim than inventing algorithmic autobiography or contestability. The contribution is the visible authorship relation made operable on one page.

## What is evidence—and what is not

Implemented evidence:

- a working first-draft → reply → second-draft loop;
- inspectable evidence for every claim;
- accept, reframe, strike, revise, and undo paths;
- client-side archive import with explicit refusal thresholds;
- preserved correction lineage, printable scars, and session-record export;
- an honestly empty corrections corpus ready for consented study data.

Not yet evidenced:

- whether people recognize themselves in computed chapters;
- whether striking increases or decreases trust in accepted readings;
- whether the grammar works across cultures, relationships, or high-stakes memories;
- whether a correction remains meaningful after the novelty of the interaction fades.

No participant finding is claimed.

## Next study

The written protocol calls for 8–12 Letterboxd users working with their own archives. Sessions will examine recognition, strike behavior, trust after contestation, certainty calibration, and one-week recall. Participants can review and redact the session record before sharing it.

The most important output is not an agreement rate. It is a corrections corpus: machine claims paired with what the people described said instead, coded by how the archive’s interpretation failed.

## Contribution

Pentimento contributes a grammar for **sovereign correction**:

> A person can overrule a machine’s interpretation without erasing the fact that the interpretation occurred.

The image to remember is one sentence whose old certainty remains visible underneath the person who reclaimed it.
