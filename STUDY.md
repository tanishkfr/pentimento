# STUDY.md — Pentimento Participant Study Protocol

**Status:** Runnable. Not yet run. No findings exist; none are claimed anywhere until sessions happen.

This protocol operationalizes RESEARCH.md E3. The instrument is the product itself; the session-record download is the data-collection mechanism.

---

# Purpose

Two contributions, one study:

1. **Test the grammar.** Does contestable, evidence-linked narration produce recognition — and does the right to strike build trust or erode it?
2. **Build the corrections corpus.** Struck machine sentences paired with what people said instead: a first taxonomy of how algorithmic self-narratives fail, in the words of the people they are about.

# Study Questions

- SQ1. Do participants recognize themselves in chapters computed from dates and titles alone? (H4, H5)
- SQ2. When do participants strike a reading, and what do they say instead?
- SQ3. Does the ability to strike change stated trust in the accepted readings? (Connects to contestable-AI literature — RESEARCH.md [1–5].)
- SQ4. Does the certainty-calibration choice match participants' self-assessed confidence?
- SQ5. Does anything survive a week? (One-insight retention.)

# Participants

- N = 8–12. Letterboxd users with ≥2 years of diary history and ≥50 logged films (the engine's thresholds are 20 films / 6 months; requiring more ensures multiple chapters).
- Recruit from Letterboxd communities, film clubs, and personal network — exclude close friends who know the researcher's hypotheses.
- Screener: years on Letterboxd, approximate film count, willingness to discuss their history aloud.

# Ethics & Privacy

- Consent covers: session recording (audio + screen), collection of the session-record file, quotation of corrections in anonymized form.
- The diary CSV never leaves the participant's machine: the import is client-side, and the researcher never receives the raw archive — only the session record the participant chooses to download and share.
- Participants may strike any chapter from the shared record itself before handing it over ("the study plays by the product's rules").
- Sensitive disclosures: corrections may reference grief, breakups, illness. The exit script includes an explicit check-in; participants may redact any correction post-session.

# Procedure (60 min/session)

1. **Setup (5 min).** Consent. Participant exports their Letterboxd data (letterboxd.com → Settings → Data → Export) before the session; verify diary.csv present.
2. **Cold read (5 min).** Open the product. Say nothing. Note whether the opening (struck specimen + two lines) is understood — ask "what do you think this is?" before any explanation.
3. **Own archive, think-aloud (30 min).** Participant imports diary.csv and works through computed chapters aloud. Researcher prompts only: "say what you're thinking," "does that read true?" Never defend a reading.
4. **Second draft (5 min).** If anything was struck, participant requests the second draft and reads it aloud.
5. **Exit interview (15 min).** Script below.
6. **Record handoff.** Participant downloads the session record, reviews it, redacts if desired, shares it.
7. **Follow-up (day 7, async).** Two questions by message: "What, if anything, do you remember from your memoir?" and "Did you think about it during the week?"

# Exit Interview Script

- "Which chapter felt most true? Which felt most wrong?"
- "You struck / didn't strike anything. Walk me through that moment." (SQ2)
- "After striking, did you trust the *other* chapters more, less, or the same? Why?" (SQ3)
- "You chose to say it plainly / keep it uncertain. How sure are you, actually?" (SQ4)
- "Wrapped tells you who you were every December. How is this different, if it is?" 
- "If this read your Spotify / photos / purchases instead — would you want that? Would you dread it?"
- Check-in: "Anything come up today you'd rather we not keep?"

# Measures

| Measure | Source | Question |
|---|---|---|
| Recognition statements ("that's exactly right," "I never noticed") per chapter | think-aloud transcript | SQ1 |
| Strike rate; strike reasons | session record + transcript | SQ2 |
| Trust shift statements post-strike | exit interview | SQ3 |
| Certainty-choice vs. stated confidence | session record + exit interview | SQ4 |
| One-week recall | follow-up | SQ5 |

# Corrections Corpus — Coding Plan

Unit: one struck reading = {chapter type, machine claim, correction text or blank, transcript context}.

First-pass codes (open coding expected to extend these):

- **Life event invisible to the archive** (grief, move, breakup, illness, new job)
- **Other people in the account** (partner, family, shared viewing)
- **Ritual mistaken for change** (habitual rewatches, comfort viewing)
- **Logistics mistaken for taste** (availability, subscription changes, commute)
- **Right pattern, wrong meaning** (participant confirms the evidence, rejects the reading)
- **Blank strike** (refused without replacement — treated as its own finding, not missing data)

Output: corpus table + frequencies + exemplar quotes (anonymized), reported back into RESEARCH.md as E6+.

# Analysis Notes

- A high strike rate is not failure. The grammar succeeds if strikes feel *possible and consequential* — measured by SQ3, not by agreement.
- A zero strike rate across all participants is a red flag: it suggests the readings are too safe to disagree with (hedged into vacuity) — report it as such.
- Pilot with participants 1–2; revise the script, freeze it, then run the rest.

# Materials Checklist

- [ ] Consent form (recording + session-record collection + anonymized quotation)
- [ ] Screener message
- [ ] Letterboxd export instructions sent 48h ahead
- [ ] Session build deployed or run locally (`app/`, `npm run dev`)
- [ ] Recording setup; transcript tooling
- [ ] Follow-up message template (day 7)
