# RESEARCH.md

## Taste Trails Research Notebook

**Status:** Living Document

This document is intentionally unfinished.

It is a record of observations, hypotheses, interview findings, competing explanations, and unanswered questions.

Nothing in this document should be treated as truth until supported by evidence.

The purpose of this document is to discover patterns—not invent them.

---

# Research Goal

Understand how people discover, explore, revisit, and make meaning from cultural experiences.

Movies are the initial research medium because they produce rich longitudinal records of human behavior.

---

# Research Questions

The project currently investigates the following questions.

## RQ1

How do people describe changes in their cultural preferences?

---

## RQ2

What causes periods of exploration?

---

## RQ3

How do people recognize that their taste has changed?

---

## RQ4

Can software help people notice meaningful changes they would not have otherwise recognized?

---

## RQ5

How should software communicate uncertainty when interpreting human behavior?

---

# Current Observations

These are observations.

Not conclusions.

Each should eventually be supported, modified, or rejected.

---

## Observation 01

People rarely remember exactly when their taste changed.

They remember that it changed.

---

## Observation 02

People usually describe discovery through stories rather than timelines.

Example:

"I went through a Korean cinema phase."

Instead of:

"I watched these twelve movies."

---

## Observation 03

People naturally organize media consumption into periods of exploration.

These periods often have names.

Examples:

* Nolan phase
* Horror phase
* Korean cinema phase
* A24 phase

Current movie platforms treat these as isolated viewing events.

---

## Observation 04

People often seek continuity of feeling rather than similarity of content.

Example:

"I want another movie that feels like this."

Not:

"I want another movie from this genre."

---

## Observation 05

People trust recommendations more when they understand why they were made.

---

## Observation 06

People revisit media because they changed, not because the media changed.

---

## Observation 07

People frequently distinguish between admiration and enjoyment.

Examples:

"I think it's a masterpiece."

"I don't actually enjoy watching it."

Most platforms collapse these into a single rating.

---

## Observation 08

Transformation often happens across multiple cultural artifacts.

Examples:

Movie

↓

Interview

↓

YouTube essay

↓

Director filmography

↓

Community discussion

The transformation may occur across the ecosystem rather than inside a single work.

---

## Observation 09

Behavior appears to change in bursts rather than gradually.

Periods of stability are interrupted by periods of rapid exploration.

This is currently a hypothesis.

---

## Observation 10

People often describe curiosity before they describe taste.

Example:

"I became interested in..."

rather than

"My taste changed."

---

# Current Hypotheses

These are hypotheses.

Each should eventually be tested.

---

## H1

People naturally organize cultural experiences into explorations rather than isolated events.

---

## H2

Explorations influence long-term taste.

---

## H3

Repeated taste patterns gradually become part of identity.

---

## H4

People recognize interpretations more easily than they generate them.

The system should therefore propose hypotheses rather than ask users to explain themselves.

---

## H5

Meaningful behavioral shifts can be inferred from longitudinal cultural behavior.

---

# Competing Hypotheses

The project should actively challenge itself.

Examples.

---

## CH1

Taste does not change.

Only confidence changes.

---

## CH2

Taste remains stable.

Exposure changes.

---

## CH3

Life events influence taste more strongly than media.

---

## CH4

People do not actually care about understanding their own taste.

They simply want recommendations.

---

## CH5

Movies are poor indicators of identity.

---

# Open Questions

Questions that currently have no satisfactory answer.

---

How do explorations begin?

How do explorations end?

Can one movie belong to multiple explorations?

What causes a behavioral shift?

Can behavioral shifts be distinguished from temporary mood?

How should uncertainty be communicated?

What evidence makes users trust an interpretation?

When does an interpretation become intrusive?

---

# Things We Rejected

Rejected ideas remain documented.

The goal is to preserve reasoning.

---

## Rejected

Long manually created trails.

Reason:

Too much effort.

Does not scale.

Does not reflect natural behavior.

---

## Rejected

AI-generated personality scores.

Reason:

Feels arbitrary.

Low trust.

Weak explainability.

---

## Rejected

Movie similarity graphs as the primary interaction.

Reason:

Interesting visualization.

Weak human insight.

---

# Interview Plan

The purpose of interviews is observation.

Not feature validation.

Example prompts.

* Tell me about a period when your movie taste changed.
* Have you ever gone down a movie rabbit hole?
* Is there a movie you understand differently today?
* What makes a recommendation memorable?
* How do you usually describe your movie taste to friends?

Interview findings should be added beneath each question.

---

# Related Work

Pentimento does not emerge from nothing. Naming its neighbors — with citations checked online, not recalled — is part of the research discipline. Full references at the end of this document.

## Contestable and accountable AI

The nearest literature, located during the July 2026 literature check (E5). Alfrink et al. [1] synthesize a design framework for AI that is contestable by design — "responsive to human intervention throughout the system lifecycle." Vaccaro and colleagues ground contestation design in existing appeal systems — courts, credit scoring, insurance claims [2] — study contestability for content moderation [3], and examine how appeal processes shape perceptions of algorithmic decisions [4]. Hirsch et al. introduced "designing contestability" in a machine-learning-for-psychotherapy context [5].

**The gap Pentimento occupies:** this literature addresses consequential *decisions* — moderation, credit, hiring, diagnosis. It has not been extended to machine *narratives of the self*, where the harm is interpretive rather than allocative: not "the system denied me" but "the system says who I am, and I have no reply." Pentimento is a working interaction grammar for that case.

## Algorithmic identity and the Wrapped literature

Cheney-Lippold's "algorithmic identity" [6] describes how systems construct who we are from behavioral data. Recent empirical work studies Spotify Wrapped directly: Annabell & Rasmussen [7] document users' mix of "pleasure, anticipation and powerlessness" at being assigned identities through opaque mechanisms, and name "the limits of the Wrapped self"; adjacent studies examine Wrapped as datafication of the self [8] and as algorithmic self-making and taste performance [9]. The felt need for a right of reply is documented in this literature; the design response is not. Notably, Spotify expanded Wrapped-style recapping to entire listening histories in May 2026 [10] — the medium is growing, and its one-way authority with it.

## Personal informatics

Li, Dey & Forlizzi's stage-based model [11] describes collection → reflection pipelines. Pentimento inherits the ambition and rejects the dashboard: reflection here is prose co-authorship, not chart review.

## Reflective informatics

Baumer [12] warns that "reflection" features often amount to data display with aspirational labeling. Pentimento's response: reflection is operationalized as a *decision* — accept, reframe, or strike — not as viewing.

## Slow technology

Hallnäs & Redström's slow technology [13], and especially Odom et al.'s *Olly* [14] — a domestic device that resurfaces songs from the owner's **Last.fm** listening history, deployed in three homes for fifteen months — are close relatives. (E5 corrected an earlier error in this document, which misattributed Olly's data source to Spotify.) Olly resurfaces and provokes reflection; it does not interpret, and it cannot be told it is wrong. The contestable interpretation is Pentimento's departure point.

## Lifelogging critique

Sellen & Whittaker [15] argue archives are only as valuable as the meaning-making around them. Pentimento is an answer to that critique for cultural archives.

## Sociology of taste

Bourdieu [16] and the omnivore thesis [17] establish that taste changes and that its changes are structured. "Cultural Drift" is not a claim of new sociology — it is internal shorthand (see LANGUAGE.md) for the phenomenon made inspectable by its owner, at the scale of one archive.

## Commercial retrospectives

Spotify Wrapped and Apple/Google Photos Memories assert retrospective narratives. None shows evidence, admits uncertainty, or accepts correction. The gap Pentimento occupies, stated once: **contestable, evidence-linked, uncertainty-calibrated narration of a personal archive — with the contest preserved in the artifact.**

---

# Evidence

Entries here record what has actually been observed or decided. Planned work is marked planned. Nothing below is a user-study finding until a study is run.

---

## E1 — The recognition contradiction (design finding, Jul 2026)

THEORY.md's success criterion — recognition ("that's exactly what happened") — requires the user's own data. A demo built on a fictional persona cannot produce it.

Design response: the probe runs on two archives. Maya's (authored, framed honestly as a research probe inside the product itself) demonstrates the interaction model; a client-side Letterboxd import computes chapters from the user's real diary so recognition becomes testable.

Status: implemented. Recognition with real users remains untested.

---

## E2 — Rejection is the load-bearing interaction (design finding, Jul 2026)

First prototype offered two interpretive framings per chapter — both of which *accepted* the system's observation. Internal review identified this as a contradiction of the Golden Rule: the user could reframe but never refuse.

Design response: every chapter now carries a strike path. A struck reading stays in the memoir — claim struck through, retraction recorded, user's correction kept in the margin. Disagreement is part of the record, not an exit.

Status: implemented. Whether users actually strike readings — and whether struck readings increase or decrease trust — is a primary study question.

---

## E5 — Literature check: the project has a home field (finding, Jul 2026)

An online literature check (not recalled citations — searched and verified) produced three results.

First, a corrected error: this document previously claimed Odom et al.'s Olly resurfaces "past Spotify listening." It uses Last.fm history [14], and was deployed in three homes for fifteen months. The error is preserved here because the correction is the method: claims get checked, and strikes stay visible. This document plays by the product's rules.

Second, a discovered home field: the contestable-AI literature [1–5] is where this project lives, and it was absent from earlier positioning. The gap is now precise — contestability research addresses allocative decisions; Pentimento extends it to machine narratives of the self.

Third, discovered validation: empirical Wrapped studies [7–9] independently document the felt problem — users assigned identities through opaque mechanisms report "pleasure, anticipation and powerlessness." The powerlessness is the design gap. Spotify's May 2026 expansion of Wrapped-style recaps to full listening histories [10] confirms the medium is growing.

Consequence for the study (E3): the exit interview should probe contestability language directly — did striking a reading change trust? — connecting the corrections corpus to measures the contestable-AI literature already cares about.

---

## E6 — Second rename, aesthetic split, comprehension pass (decision, Jul 2026)

Three problems raised in review: (a) the interim name "Second Draft" echoed Final Draft, the screenwriting software — a bad rhyme for a film-adjacent project — and wasn't unique; (b) the visual identity (warm paper, EB Garamond, quiet editorial) was nearly interchangeable with another project in the same portfolio; (c) first-time visitors could not reliably say what the product *does*.

Decisions:

- **Name: Pentimento** — in painting, an earlier stroke left visible through the finished work; the change of mind, kept. Precisely the artifact this system produces. No product-name collision; the one famous "Pentimento" is Lillian Hellman's memoir, which is resonance, not conflict. "Second draft" survives as the name of the revision mechanic (LANGUAGE.md).
- **Aesthetic: the underpainting.** Dark umber canvas; three typographic voices enforcing the thesis — the machine speaks in a grotesque (Space Grotesk), the human corrects in an italic serif (Fraunces), the record keeps evidence in mono (IBM Plex Mono); red ink belongs exclusively to acts of disagreement and human control. This splits the project formally from the portfolio's light-editorial register.
- **Comprehension:** the opening now states plainly what the system does in one sentence, shows the struck specimen, then teaches the loop in three numbered steps, then glosses the name in one line.

Status: implemented.

---

## E4 — The reframe: from Taste Trails to Second Draft (decision, Jul 2026)

A zero-attachment review found that the project's most original interaction — the strike, with its preserved scar and marginal correction — was not about taste at all. It was about the right of a person to contest a machine's narrative of their life. The taste framing was the costume; the right of reply was the thesis.

Decision: rename the project **Second Draft** (later renamed again — see E6). Primary research question reframed to: *when software narrates a person's life from their archive, what does the person need in order to contest, correct, and co-own that story?* The original question survives as the first domain instance.

Consequences implemented: Maya's probe cut from five chapters to the three that teach the grammar (the cut chapters remain documented in data.ts); the opening now shows a struck sentence with its human correction before anything else; the system now writes a literal second draft — revisions led by the reader's corrections, first-draft claims kept visible as scars; drafts are printable, scars included. "Cultural Drift" demoted to internal shorthand (see LANGUAGE.md).

Status: implemented. The study (E3) should now also harvest a corrections corpus — the struck sentences and what people said instead — as a primary research artifact.

---

## E3 — Planned study (protocol written and runnable, not yet run)

Full protocol in STUDY.md: 8–12 participants with ≥2-year Letterboxd histories, think-aloud sessions on their own imported diaries, exit interviews probing contestability and trust, one-week retention follow-up, and a coding plan for the corrections corpus. The instrument is the product itself: the session-record download (implemented) captures every reading, strike, and correction as structured data the participant hands over by choice.

Hypotheses at risk: H4 (recognition over generation), H5 (shifts inferable from longitudinal behavior), and the assumption that reflection has value users can articulate.

---

# References

1. Alfrink, K., Keller, I., Kortuem, G., & Doorn, N. (2022). Contestable AI by Design: Towards a Framework. *Minds and Machines*, 33(4), 613–639. https://doi.org/10.1007/s11023-022-09611-z
2. Vaccaro, K., & Karahalios, K. (2017–2019). Contestability in Algorithmic Systems / algorithmic appeals workshop line of work, incl. CSCW 2019 workshop "Contestability in Algorithmic Systems." http://contestability.org/
3. Vaccaro, K., Xiao, Z., Hamilton, K., & Karahalios, K. (2021). Contestability For Content Moderation. *Proc. ACM Hum.-Comput. Interact.*, 5(CSCW2), 1–28.
4. Vaccaro, K., et al. (2022). What's the Appeal? Perceptions of Review Processes for Algorithmic Decisions. *CHI 2022*.
5. Hirsch, T., Merced, K., Narayanan, S., Imel, Z. E., & Atkins, D. C. (2017). Designing Contestability: Interaction Design, Machine Learning, and Mental Health. *DIS 2017*.
6. Cheney-Lippold, J. (2017). *We Are Data: Algorithms and the Making of Our Digital Selves*. NYU Press. (See also his 2011 "A New Algorithmic Identity," *Theory, Culture & Society*.)
7. Annabell, T., & Rasmussen, N. V. (2025). An algorithmic event: The celebration and critique of Spotify Wrapped. *New Media & Society*. https://doi.org/10.1177/14614448251391301
8. (2024). Spotify (Un)wrapped: how ordinary users critically reflect on Spotify's datafication of the self within creative workshops. *Journal of Gender Studies*. https://doi.org/10.1080/09589236.2024.2433674
9. (2025). Wrap your head around it: algorithmic self-making and performances of taste on Spotify Wrapped. (Journal article; see ResearchGate record.)
10. TechCrunch (May 12, 2026). Spotify launches a Wrapped-style recap of your entire listening history.
11. Li, I., Dey, A., & Forlizzi, J. (2010). A Stage-Based Model of Personal Informatics Systems. *CHI 2010*.
12. Baumer, E. P. S. (2015). Reflective Informatics: Conceptual Dimensions for Designing Technologies of Reflection. *CHI 2015*.
13. Hallnäs, L., & Redström, J. (2001). Slow Technology — Designing for Reflection. *Personal and Ubiquitous Computing*, 5(3), 201–212.
14. Odom, W., et al. (2019). Investigating Slowness as a Frame to Design Longer-Term Experiences with Personal Data: A Field Study of Olly. *CHI 2019*. https://doi.org/10.1145/3290605.3300264
15. Sellen, A. J., & Whittaker, S. (2010). Beyond Total Capture: A Constructive Critique of Lifelogging. *Communications of the ACM*, 53(5), 70–77.
16. Bourdieu, P. (1984). *Distinction: A Social Critique of the Judgement of Taste*. Harvard University Press.
17. Peterson, R. A., & Kern, R. M. (1996). Changing Highbrow Taste: From Snob to Omnivore. *American Sociological Review*, 61(5), 900–907.

Citation hygiene: [1], [7], [8], [14] verified online in July 2026 (E5); [2–5] located via the same search with venue details from result records; [6], [11–13], [15–17] are canonical works cited from field knowledge — verify page numbers before any formal submission. Entries [8] and [9] have incomplete author records here; complete them from the DOIs before citing formally.

---

# Research Principles

Observe before explaining.

Document before concluding.

Challenge assumptions regularly.

Prefer evidence over intuition.

A rejected hypothesis is valuable.

Changing the theory is progress, not failure.

This document should become more uncertain before it becomes more certain.
