// Reads a real Letterboxd export (diary.csv or watched.csv) entirely in the
// browser and computes chapters from observable evidence only: dates, titles,
// release years, rewatch flags. It can see when — never why. Every sentence
// it writes must trace to rows the reader can inspect.

import type { Chapter, EvidenceBlock, Film } from './data'

export type ParsedRow = {
  title: string
  year: number | null
  date: Date
  rewatch: boolean
  rating: number | null
}

const DAY = 24 * 60 * 60 * 1000

// ---------- CSV parsing ----------

function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        field += c
      }
    } else if (c === '"') {
      inQuotes = true
    } else if (c === ',') {
      row.push(field)
      field = ''
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++
      row.push(field)
      field = ''
      if (row.length > 1 || row[0] !== '') rows.push(row)
      row = []
    } else {
      field += c
    }
  }
  if (field !== '' || row.length > 0) {
    row.push(field)
    if (row.length > 1 || row[0] !== '') rows.push(row)
  }
  return rows
}

export function parseLetterboxdCsv(text: string): ParsedRow[] {
  const rows = parseCsv(text)
  if (rows.length < 2) throw new Error('We couldn’t find any rows in that file.')

  const header = rows[0].map((h) => h.trim().toLowerCase())
  const col = (name: string) => header.indexOf(name)
  const iName = col('name')
  const iYear = col('year')
  const iWatched = col('watched date')
  const iDate = col('date')
  const iRewatch = col('rewatch')
  const iRating = col('rating')

  if (iName === -1 || (iWatched === -1 && iDate === -1)) {
    throw new Error(
      'That doesn’t look like a Letterboxd export. Try diary.csv or watched.csv from your export folder.',
    )
  }

  const iWhen = iWatched !== -1 ? iWatched : iDate
  const parsed: ParsedRow[] = []
  for (const r of rows.slice(1)) {
    const title = (r[iName] || '').trim()
    const when = (r[iWhen] || '').trim()
    if (!title || !when) continue
    const date = new Date(when + 'T12:00:00')
    if (isNaN(date.getTime())) continue
    const year = iYear !== -1 ? parseInt(r[iYear], 10) || null : null
    const rating = iRating !== -1 ? parseFloat(r[iRating]) || null : null
    const rewatch = iRewatch !== -1 && (r[iRewatch] || '').trim().toLowerCase() === 'yes'
    parsed.push({ title, year, date, rewatch, rating })
  }
  parsed.sort((a, b) => a.date.getTime() - b.date.getTime())
  return parsed
}

// ---------- helpers ----------

const fmt = (d: Date) =>
  d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const fmtMonth = (d: Date) => d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

function toFilms(rows: ParsedRow[], limit: number, note?: (r: ParsedRow) => string | undefined): Film[] {
  return rows.slice(0, limit).map((r) => ({
    date: fmt(r.date),
    title: r.title,
    year: r.year ?? 0,
    note: note ? note(r) : undefined,
  }))
}

// ---------- chapter builders ----------

function burstChapter(rows: ParsedRow[]): Chapter | null {
  const spanDays = (rows[rows.length - 1].date.getTime() - rows[0].date.getTime()) / DAY
  const windowDays = 56
  const expected = rows.length * (windowDays / spanDays)

  let best = { count: 0, start: 0, end: 0 }
  let j = 0
  for (let i = 0; i < rows.length; i++) {
    if (j < i) j = i
    while (
      j + 1 < rows.length &&
      rows[j + 1].date.getTime() - rows[i].date.getTime() <= windowDays * DAY
    )
      j++
    const count = j - i + 1
    if (count > best.count) best = { count, start: i, end: j }
  }

  if (best.count < 6 || best.count < 2.5 * expected) return null

  const windowRows = rows.slice(best.start, best.end + 1)
  const start = windowRows[0].date
  const end = windowRows[windowRows.length - 1].date
  const weeks = Math.max(1, Math.round((end.getTime() - start.getTime()) / (7 * DAY)))
  const perMonth = ((rows.length / spanDays) * 30).toFixed(1)

  const evidence: EvidenceBlock[] = [
    {
      kind: 'pattern',
      label: 'Your usual pace',
      text: `Across the whole archive: about ${perMonth} films a month.`,
    },
    {
      kind: 'films',
      label: `Then, starting ${fmt(start)} — ${best.count} films in ${weeks} week${weeks === 1 ? '' : 's'}`,
      films: toFilms(windowRows, 12),
    },
    {
      kind: 'pattern',
      label: 'The pattern',
      text: `At your usual pace, these weeks would hold about ${Math.max(1, Math.round(expected))} films. They hold ${best.count}.`,
    },
  ]

  return {
    id: 'i-burst',
    marker: fmtMonth(start),
    observation: `Around ${fmtMonth(start)}, your pace broke.`,
    evidence,
    interpretation: 'It looks like a period of focused curiosity — a thread followed while it was warm.',
    claim: `Those ${weeks} weeks were an exploration.`,
    fork: {
      prompt: 'Does the evidence read that way to you?',
      choices: [
        {
          id: 'hunger',
          label: 'Something caught',
          detail: 'A thread of curiosity, followed while it was warm.',
        },
        {
          id: 'room',
          label: 'Life made room',
          detail: 'Not hunger — time. Something else stepped aside those weeks.',
        },
      ],
    },
    naming: {
      prompt: 'You were there. What should this chapter be called?',
      suggestions: [`The ${start.toLocaleDateString('en-US', { month: 'long' })} Burst`, 'The Deep End', 'That Stretch'],
    },
    titleFor: () => 'The Burst',
    paragraphFor: (choice, name) =>
      choice === 'hunger'
        ? `Around ${fmtMonth(start)}, the pace broke: ${best.count} films in ${weeks} weeks, where the usual rhythm would predict ${Math.max(1, Math.round(expected))}. A chapter you called “${name}.” It reads like an exploration — something caught, and you followed it while it was warm. The archive can’t name what caught. You probably can.`
        : `Around ${fmtMonth(start)}, the pace broke: ${best.count} films in ${weeks} weeks, where the usual rhythm would predict ${Math.max(1, Math.round(expected))}. A chapter you called “${name}.” You read it not as hunger but as room — something else stepped aside those weeks, and the films moved in. The archive records the films. Whatever stepped aside, it never saw.`,
  }
}

function rewatchChapter(rows: ParsedRow[]): Chapter | null {
  const byFilm = new Map<string, ParsedRow[]>()
  for (const r of rows) {
    const key = `${r.title}::${r.year ?? ''}`
    const list = byFilm.get(key) ?? []
    list.push(r)
    byFilm.set(key, list)
  }

  let pick: ParsedRow[] | null = null
  let bestGap = 0
  for (const watches of byFilm.values()) {
    if (watches.length < 2) continue
    const gap = watches[watches.length - 1].date.getTime() - watches[0].date.getTime()
    if (gap > bestGap) {
      bestGap = gap
      pick = watches
    }
  }

  if (!pick || bestGap < 300 * DAY) return null

  const title = pick[0].title
  const years = Math.round(bestGap / (365 * DAY))
  const first = pick[0]
  const last = pick[pick.length - 1]

  const evidence: EvidenceBlock[] = [
    {
      kind: 'films',
      label: `${title} — every watch in the archive`,
      films: pick.map((r, i) => ({
        date: fmt(r.date),
        title,
        year: r.year ?? 0,
        note:
          (i === 0 ? 'first watch' : `watch ${i + 1}`) +
          (r.rating ? ` · rated ${r.rating}` : ''),
      })),
    },
    {
      kind: 'pattern',
      label: 'The pattern',
      text: `The film didn’t change between ${first.date.getFullYear()} and ${last.date.getFullYear()}. Something brought you back to it anyway.`,
    },
  ]

  return {
    id: 'i-rewatch',
    marker: fmtMonth(last.date),
    observation: `You returned to ${title} — ${years} year${years === 1 ? '' : 's'} after the first watch.`,
    evidence,
    interpretation:
      'Rewatches may be the clearest evidence an archive holds. The film holds still; the viewer doesn’t.',
    claim: 'The film held still; you didn’t.',
    fork: {
      prompt: 'What does this rewatch mean?',
      choices: [
        {
          id: 'understood',
          label: 'You understood it more',
          detail: 'The years between taught you to read it differently.',
        },
        {
          id: 'needed',
          label: 'You needed it differently',
          detail: 'Something in your life changed what the film was for.',
        },
      ],
    },
    titleFor: () => `The Return to ${title}`,
    paragraphFor: (choice) =>
      choice === 'understood'
        ? `${years} years after the first watch, you returned to ${title}. The film held still the whole time. Somewhere in the archive between those watches is whatever taught you to read it differently — the second reading is the evidence that the years did something.`
        : `${years} years after the first watch, you returned to ${title}. The film hadn’t changed. Something in your life needed it differently — the archive can’t say what. It can only say when: ${fmt(last.date)}.`,
  }
}

function returnChapter(rows: ParsedRow[]): Chapter | null {
  let best: { gapDays: number; before: ParsedRow; after: number } | null = null
  for (let i = 1; i < rows.length; i++) {
    const gapDays = (rows[i].date.getTime() - rows[i - 1].date.getTime()) / DAY
    if (gapDays < 90) continue
    let j = i
    while (j + 1 < rows.length && rows[j + 1].date.getTime() - rows[i].date.getTime() <= 28 * DAY) j++
    const afterCount = j - i + 1
    if (afterCount >= 4 && (!best || gapDays > best.gapDays)) {
      best = { gapDays, before: rows[i - 1], after: i }
    }
  }
  if (!best) return null

  const gapMonths = Math.round(best.gapDays / 30)
  const returnRows = rows.slice(best.after, best.after + 8)

  return {
    id: 'i-return',
    marker: fmtMonth(returnRows[0].date),
    observation: `The archive goes quiet for ${gapMonths} months. Then you came back.`,
    evidence: [
      {
        kind: 'pattern',
        label: 'The silence',
        text: `After ${fmt(best.before.date)} — nothing. ${gapMonths} months without a single logged film. The archive can’t see what filled that time. It can only see the absence.`,
      },
      {
        kind: 'films',
        label: 'The return',
        films: toFilms(returnRows, 8),
      },
    ],
    interpretation: 'Long silences in an archive are evidence too. Something ended; something resumed.',
    claim: 'The silence meant something.',
    fork: {
      prompt: 'Which is the chapter — the silence, or the return?',
      choices: [
        {
          id: 'silence',
          label: 'The silence was the chapter',
          detail: 'Life was elsewhere. The films simply waited.',
        },
        {
          id: 'return',
          label: 'The return was the chapter',
          detail: 'Coming back was the event — the appetite arriving again.',
        },
      ],
    },
    titleFor: (choice) => (choice === 'silence' ? 'The Quiet Months' : 'The Way Back'),
    paragraphFor: (choice) =>
      choice === 'silence'
        ? `For ${gapMonths} months the archive holds nothing at all. You read that silence as the chapter itself — life was elsewhere, and the films simply waited. What the archive calls absence, you remember as something. It doesn’t get to know what.`
        : `For ${gapMonths} months the archive holds nothing at all — and then, within weeks, it fills again. You read the return as the chapter: the appetite arriving back, whatever had displaced it having let go. The films that came first are listed above. First films back usually aren’t random.`,
  }
}

function foundFedChapter(rows: ParsedRow[]): Chapter | null {
  const withYear = rows.filter((r) => r.year && r.year > 1900)
  if (withYear.length < 16) return null

  const half = Math.floor(withYear.length / 2)
  const early = withYear.slice(0, half)
  const late = withYear.slice(half)
  const nearShare = (rs: ParsedRow[]) =>
    rs.filter((r) => r.date.getFullYear() - (r.year as number) <= 1).length / rs.length

  const a = nearShare(early)
  const b = nearShare(late)
  if (a - b < 0.2) return null

  const pct = (x: number) => `${Math.round(x * 100)}%`
  const earlyNew = early.filter((r) => r.date.getFullYear() - (r.year as number) <= 1)
  const lateOld = [...late]
    .filter((r) => r.date.getFullYear() - (r.year as number) > 3)
    .sort((x, y) => x.year! - y.year!)

  return {
    id: 'i-confound',
    marker: 'The last question',
    observation: 'One question this archive cannot answer alone: how much of the drift was yours?',
    evidence: [
      {
        kind: 'pattern',
        label: 'The first half of your archive',
        text: `${pct(a)} of films were watched within a year of release. The calendar chose. The feeds served.`,
      },
      {
        kind: 'films',
        label: 'What arrived on its own',
        films: toFilms(earlyNew, 5, (r) => `released ${r.year}`),
      },
      {
        kind: 'pattern',
        label: 'The second half',
        text: `Only ${pct(b)} arrived near release. The rest were older — found, not served.`,
      },
      {
        kind: 'films',
        label: 'What you went looking for',
        films: toFilms(lateOld, 5, (r) => `${r.date.getFullYear() - (r.year as number)} years old when you watched it`),
      },
      {
        kind: 'pattern',
        label: 'What the archive cannot show',
        text: 'Every “found” film was still surfaced by something — a list, an essay, a friend who insisted. The archive records the what and the when. It cannot record the who-chose.',
      },
    ],
    interpretation:
      'The feeds lost their grip somewhere in this archive. Whether you took hold — or something else did — the evidence cannot say.',
    claim: 'The drift, at least in part, was yours.',
    fork: {
      prompt: 'How should the memoir answer?',
      choices: [
        {
          id: 'yours',
          label: 'The searching was mine',
          detail: 'The feeds served the before. They never got the chance to serve the after.',
        },
        {
          id: 'entangled',
          label: 'No one drifts alone',
          detail: 'Lists, essays, friends — something always chooses first.',
        },
      ],
    },
    titleFor: (choice) => (choice === 'yours' ? 'Your Own Weather' : 'No One Drifts Alone'),
    paragraphFor: (choice) =>
      choice === 'yours'
        ? `The last question is the uncomfortable one. In the first half of this archive, ${pct(a)} of films arrived in their release window, served by the same feeds that serve everyone. In the second half, only ${pct(b)} did — the rest were old, found somewhere the feeds don’t reach. If the feeds had still been choosing, they would have kept serving the calendar. They never got the chance. The drift, at least in part, was yours.`
        : `The last question is the uncomfortable one. In the first half of this archive the calendar chose: ${pct(a)} of films arrived in their release window. In the second half only ${pct(b)} did — but every older film was still surfaced by something. A list. An essay. A friend who insisted. The archive can show that the feeds lost their grip. It cannot show who took hold instead. Maybe no one drifts alone.`,
  }
}

function steadyChapter(rows: ParsedRow[]): Chapter {
  const spanYears = Math.max(
    1,
    Math.round(
      (rows[rows.length - 1].date.getTime() - rows[0].date.getTime()) / (365 * DAY),
    ),
  )
  return {
    id: 'i-steady',
    marker: 'The whole archive',
    observation: 'We looked for shifts. We found steadiness.',
    evidence: [
      {
        kind: 'pattern',
        label: 'What we looked for',
        text: 'Bursts of pace. Long silences followed by returns. Films revisited years apart. A drift from new releases toward older films.',
      },
      {
        kind: 'pattern',
        label: 'What we found',
        text: `${rows.length} films across ${spanYears} year${spanYears === 1 ? '' : 's'}, at a remarkably even pace. No break sharp enough to call a shift — not from dates and titles alone.`,
      },
    ],
    interpretation: 'Steadiness is a finding too. Or the archive simply can’t see where the change lives.',
    claim: 'Nothing changed.',
    fork: {
      prompt: 'Which is it?',
      choices: [
        {
          id: 'steady',
          label: 'That’s me — steady',
          detail: 'The evenness is real. The taste arrived early and held.',
        },
        {
          id: 'unseen',
          label: 'The change is just invisible here',
          detail: 'Dates and titles can’t see it. It lives somewhere else.',
        },
      ],
    },
    titleFor: (choice) => (choice === 'steady' ? 'The Even Keel' : 'What Dates Can’t See'),
    paragraphFor: (choice) =>
      choice === 'steady'
        ? `${rows.length} films across ${spanYears} years, and the pace barely wavers. You read the evenness as real: a taste that arrived early and held. Most archives protest more than this one. Steadiness this clean is its own kind of signature.`
        : `${rows.length} films across ${spanYears} years, and the pace barely wavers. But you don’t buy the steadiness — the change, you say, lives somewhere dates and titles can’t see. That is the honest limit of this whole exercise, written into your own chapter: an archive records watching. It does not record you.`,
  }
}

// ---------- entry point ----------

export function computeChapters(rows: ParsedRow[]): Chapter[] {
  if (rows.length < 20) {
    throw new Error(
      'Your archive is still short — fewer than twenty films. Every archive starts this way. Come back when it has grown.',
    )
  }
  const spanDays = (rows[rows.length - 1].date.getTime() - rows[0].date.getTime()) / DAY
  if (spanDays < 180) {
    throw new Error(
      'Your archive covers less than six months — too little time for drift to be visible yet. It will be.',
    )
  }

  const candidates = [
    burstChapter(rows),
    returnChapter(rows),
    rewatchChapter(rows),
    foundFedChapter(rows),
  ].filter((c): c is Chapter => c !== null)

  if (candidates.length === 0) return [steadyChapter(rows)]
  return candidates.slice(0, 4)
}
