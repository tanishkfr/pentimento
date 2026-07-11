# DESIGN.md

## Pentimento Experience & Visual System

**Version:** 0.3

**Status:** Living Document

This document defines how Pentimento should feel and how it looks — as built.

Every decision here serves the thesis: two authors arguing on one page, fairly, with the argument preserved.

---

# Design Goal

The interface stages an honest argument between a system that reads evidence and a person who lived it.

Every screen should move the reader from observation toward judgment — theirs, not ours.

---

# Experience Pillars

## 1. Discovery

The system shows what was always there. The reader should think "I never noticed that" — or "that's not what that was," which is discovery of another kind.

## 2. Reflection

No urgency, no productivity, no optimization. Pauses are intentional. The dark is quiet on purpose.

## 3. Collaboration

The system proposes; the reader disposes. The interface constantly communicates "your call," never "here's the answer."

## 4. Explainability

Every insight is inspectable, always, including after it has been struck. Evidence is part of the experience, not a footnote.

---

# The Underpainting

The visual identity. Named for what the project is named for: the earlier layer left visible.

## Canvas

Deep umber dark (`#16110c`, lifted by a faint radial glow at the top). Not tech-dark, not terminal-dark — a painter's ground. Reflection happens in low light.

## The Three Voices

The thesis, enforced in type. Every piece of text belongs to exactly one voice:

**The machine speaks in a grotesque** — Space Grotesk. Claims, observations, memoir prose. Precise, systematic, never italic.

**The human corrects in an italic serif** — Fraunces italic. Review fragments, chapter names, corrections, and every input field: as the reader types, their words are already in the human voice.

**The record keeps evidence in mono** — IBM Plex Mono. Dates, labels, apparatus, retractions. The clerk of the court.

If a piece of text cannot be assigned to a voice, its author is unclear — rewrite it.

## The Red-Ink Rule

Red (`#e8502e`) belongs exclusively to acts of disagreement and human control: strikes, marginalia, corrections, chapter names, buttons.

The machine never wears red. Nothing decorative is red. When red appears, a person acted.

## No Posters

Ever. Identity is carried by dates, titles, and the person's own six-word reviews. Artwork would make the films the protagonists; the reader is the protagonist.

---

# Information Hierarchy

Meaning over metadata, always:

Claim → Evidence → Pattern → Films → Metadata

The interface must never feel like a movie database. Films appear only as rows of evidence, in the record's voice.

---

# Visual Density

One claim per screen. Evidence unfolds in layers, never all at once.

The dark canvas holds silence the way the old paper held whitespace. Avoid dashboard density; a single honest sentence outranks twenty statistics.

---

# Motion

Motion is entrance and yield. Nothing decorates.

**Unfolding** — evidence blocks stagger in one at a time: "here is why, layer by layer."

**Yielding** — each stage fades up and out before the next enters. The conversation takes turns; nothing interrupts.

**Settling** — written prose fades in slowly. The memoir absorbs the decision.

**The scar stays** — struck text never animates away. Permanence is the message.

Red moves only when the human acts. Reduced-motion preferences are honored (`prefers-reduced-motion`, MotionConfig).

---

# States

## Empty / insufficient

Hopeful, never broken: "Your archive is still short... Every archive starts this way. Come back when it has grown." Declining to interpret is a designed behavior.

## Loading

Barely exists (everything is local). Never "Analyzing..." — the system reads; it does not compute at people.

## Success

Success is recognition or an honored refusal — never "Task complete."

## Error

Explain what happened, offer the way back, never blame. "We couldn't read that file. Try diary.csv from your export folder."

---

# Language Surface

The system sounds curious, never certain: "It looks like..." "This may indicate..." "The archive can't say."

The reader's words are never edited, paraphrased, or improved. See LANGUAGE.md for the full vocabulary.

---

# Accessibility

Commitments, not aspirations:

* All text — including the smallest mono labels — holds ≥4.5:1 contrast on the canvas (`--muted` and `--faint` are tuned for this; do not darken them for taste).
* Nothing meaningful is conveyed by color alone: strikes are line-through plus color; corrections are bordered plus labeled.
* Full keyboard path: every clickable has focus-visible (red outline), memoir paragraphs are keyboard-actionable.
* Reduced motion honored end to end.
* Every insight remains understandable with animation off.

---

# The Printed Draft

The memoir is designed to leave the screen. Print flips to paper — light ground, dark ink, red-pencil scars — hides all apparatus, and keeps every strike and marginal note. The scar survives the medium.

---

# What Pentimento Should Feel Like

Like finding marginalia in your own biography — some of it yours.

Like being read closely, and having the standing to say "no."

Like a document two authors fought over, kindly, and both signed.

---

# What It Should Never Feel Like

A streaming service. A dashboard. A statistics tool. A personality test. An AI assistant performing insight.

A courtroom. The argument is honest, never adversarial.

If readers describe it as any of these, redesign.

---

# Final Principle

Every design decision answers one question:

> Does this make the argument between the system and the reader fairer, clearer, or more honest?

If not, it does not belong in Pentimento.
