# Pentimento Experience and Visual System

**Version:** 0.4  
**Status:** Built design contract

Pentimento stages two authors on one page: a system that proposes meaning and a person with final authority over the account.

## Experience goals

The experience should feel reflective, inspectable, and fair. It should never feel like a movie database, an analytics dashboard, a personality test, or an AI performance.

Every screen should strengthen at least one of four qualities:

- discovery: “I had not noticed that”;
- recognition: “that reads true”;
- standing: “that is wrong, and the page listened”;
- explainability: “I can see why this was proposed.”

## The underpainting

The visual identity comes from the project’s name. In painting, a pentimento is an earlier mark left visible through the finished work. The interface makes revision physical: a withdrawn machine claim remains beneath the correction without retaining authority.

## Canvas

The canvas is deep umber (`#15100c`) with a faint warm lift. It should read as a painter’s ground rather than generic technology-dark.

## Three voices

Every text element belongs to an authorial role.

**System — Space Grotesk**  
Observations, proposed interpretations, claims, and generated memoir prose.

**Human — Fraunces italic**  
Corrections, human-selected chapter titles, review fragments, and text inputs.

**Record — IBM Plex Mono**  
Dates, provenance, evidence labels, folios, state labels, and revision lineage.

If authorship is unclear, the text or typography must be revised.

## Red-ink rule

Red (`#ed5331`) appears when human agency acts on the document:

- strike controls and withdrawal marks;
- sovereign-ink labels and correction borders;
- keyboard focus and active claim affordances.

Unopened machine claims use a neutral underline. Red is not used for generic status, decoration, or machine-authored emphasis.

## Hierarchy

Meaning precedes metadata:

**Claim → evidence → pattern → films → metadata**

Film artwork is excluded. Posters would make media the protagonist; the person and the dispute are the protagonists.

## Typography and legibility

- Body text should remain at or above 14px; reflective prose at or above 17px.
- Essential mono labels should remain at or above 10px.
- `--faint` and all other text colors must meet WCAG AA against the canvas.
- Date ranges should wrap as deliberate units, especially at 320px.
- Uppercase and tracking communicate the record voice but should not replace readable hierarchy.

## Spacing and density

One claim leads each section. Evidence may be dense, but the page should preserve enough vertical separation to distinguish observation, interpretation, proposition, evidence, and reply.

Resolving a claim closes its evidence drawer. A reviewer should not be forced through repeated clerical material after making a decision.

## Motion

Motion communicates a change in authority.

**Unfolding** — evidence blocks arrive in sequence.  
**Withdrawal** — the strike draws across the machine claim.  
**Yielding** — the machine layer recedes.  
**Settlement** — the human correction rises into primary hierarchy.  
**Revision** — the document moves to the new draft only after its layout has settled.

Motion must honor both `prefers-reduced-motion` and Framer Motion’s user setting. Every state remains understandable without animation.

## Interaction states

### Hover

Hover clarifies affordance but never carries unique meaning.

### Focus

All interactive elements receive a visible red outline with sufficient offset. Focus order follows reading order.

### Pressed

Buttons should visibly respond through color or opacity without introducing bounce or decorative scale.

### Disabled

The second-draft control remains disabled until every claim is answered. Nearby copy explains what remains.

## Import feedback

File errors and evidence refusals use different language.

- Invalid format: direct, actionable, dismissible.
- Insufficient evidence: reflective, explicit, and nonjudgmental.
- Success: immediate transition into the locally computed edition.

## About dialog

The About surface is a true modal: focus is trapped, Escape closes it, background scrolling stops, and focus returns to the invoking control. It explains the thesis, the name, Maya’s fictional provenance, privacy, and the current corrections-corpus size.

## Accessibility

- WCAG AA text contrast, including the record layer.
- No meaningful color-only distinctions.
- Semantic headings for claims and resolved chapter titles.
- `aria-expanded` and `aria-controls` for evidence drawers.
- Named evidence regions.
- Keyboard access to every decision and modal control.
- Reduced motion end to end.
- Touch targets at least 24px, with primary controls larger.

## Print

Print changes the canvas to paper, hides navigation and evidence apparatus, and always includes human corrections plus withdrawn machine readings. The scar survives even when the underpainting was concealed on screen.

## Final test

Every design decision must answer:

> Does this make the argument between the system and the reader fairer, clearer, or more honest?

If not, it does not belong in Pentimento.
