// Maya's archive and the four proposed chapters.
// Interpretations are authored, not generated — the theory holds without AI.
// Every interpretation must trace back to evidence a reader can inspect.

export type Film = {
  date: string
  title: string
  year: number
  note?: string
}

export type EvidenceBlock =
  | { kind: 'films'; label: string; films: Film[] }
  | { kind: 'quote'; label: string; source: string; text: string }
  | { kind: 'pattern'; label: string; text: string }

export type ForkChoice = {
  id: string
  label: string
  detail: string
}

export type Naming = {
  prompt: string
  suggestions: string[]
}

export type Chapter = {
  id: string
  marker: string // small-caps context line, e.g. "Winter 2022"
  observation: string
  evidence: EvidenceBlock[]
  interpretation: string
  // The single sentence that gets struck through if the reader rejects the reading.
  claim: string
  fork: { prompt: string; choices: ForkChoice[] }
  naming?: Naming
  // Auto-titles when the user does not name the chapter themselves.
  titleFor: (choiceId: string) => string
  paragraphFor: (choiceId: string, name: string) => string
}

const allChapters: Chapter[] = [
  {
    id: 'catalyst',
    marker: 'Winter 2022',
    observation: 'In late 2022, something changed.',
    evidence: [
      {
        kind: 'films',
        label: 'The six months before — a film every few weeks, by release calendar',
        films: [
          { date: 'Jun 18, 2022', title: 'The Gray Man', year: 2022, note: '“fine”' },
          { date: 'Jul 9, 2022', title: 'Thor: Love and Thunder', year: 2022, note: '“eh”' },
          { date: 'Aug 6, 2022', title: 'Bullet Train', year: 2022, note: '“fun, forgettable”' },
          { date: 'Sep 24, 2022', title: "Don't Worry Darling", year: 2022 },
          { date: 'Oct 15, 2022', title: 'Halloween Ends', year: 2022, note: '“why did I watch this”' },
        ],
      },
      {
        kind: 'quote',
        label: 'Then, one review unlike any before it',
        source: 'Maya on Aftersun · Nov 12, 2022',
        text: "I don't know what to write. I sat in the dark for a while after it ended.",
      },
      {
        kind: 'films',
        label: 'The six weeks after — eight films, none of them in theaters',
        films: [
          { date: 'Nov 19, 2022', title: 'Petite Maman', year: 2021 },
          { date: 'Nov 26, 2022', title: 'Columbus', year: 2017, note: '“architecture as feeling”' },
          { date: 'Dec 3, 2022', title: 'Paterson', year: 2016 },
          { date: 'Dec 10, 2022', title: 'After Yang', year: 2021 },
          { date: 'Dec 17, 2022', title: 'Drive My Car', year: 2021, note: '“three hours. didn’t notice.”' },
          { date: 'Dec 23, 2022', title: 'First Cow', year: 2019 },
          { date: 'Dec 28, 2022', title: 'A Ghost Story', year: 2017, note: '“the pie scene”' },
          { date: 'Dec 31, 2022', title: 'Aftersun', year: 2022, note: 'rewatch' },
        ],
      },
      {
        kind: 'pattern',
        label: 'The pattern',
        text: 'Before: films arrived by release calendar. After: films arrived by search. She started finding them instead of being fed them.',
      },
    ],
    interpretation:
      'It looks like Aftersun didn’t just end. It may have started something.',
    claim: 'Aftersun started something that winter.',
    fork: {
      prompt: 'Does the evidence read that way to you?',
      choices: [
        {
          id: 'catalyst',
          label: 'Yes — it started there',
          detail: 'The film was a catalyst. The searching began with it.',
        },
        {
          id: 'marker',
          label: 'Maybe it was already underway',
          detail: 'The film was a marker. It made a quieter change visible.',
        },
      ],
    },
    naming: {
      prompt: 'Every chapter needs a name. What should this one be called?',
      suggestions: ['The Quiet Films', 'After Aftersun', 'Winter, Slowed Down'],
    },
    titleFor: () => 'The Quiet Films',
    paragraphFor: (choice, name) =>
      choice === 'catalyst'
        ? `In the winter of 2022, a chapter Maya would later call “${name}” began with a single film. For six months her watching had followed the release calendar — a blockbuster every few weeks, noted and forgotten. Then came Aftersun, and the searching started: eight quiet films in six weeks, each one found rather than fed. The film didn’t just end. It started something.`
        : `In the winter of 2022, a chapter Maya would later call “${name}” became visible. For six months her watching had followed the release calendar — a blockbuster every few weeks, noted and forgotten. Then came Aftersun. It may not have started anything; the searching may already have begun quietly beneath the habit. But it made the change impossible to miss: eight quiet films in six weeks, each one found rather than fed.`,
  },
  {
    id: 'direction',
    marker: 'Spring 2023',
    observation: 'Spring 2023. Fourteen films in ten weeks — nine of them Korean.',
    evidence: [
      {
        kind: 'films',
        label: 'The sequence — one director first, then outward',
        films: [
          { date: 'Mar 4, 2023', title: 'Burning', year: 2018, note: '“watched a Lee Chang-dong interview after”' },
          { date: 'Mar 11, 2023', title: 'Poetry', year: 2010 },
          { date: 'Mar 19, 2023', title: 'Secret Sunshine', year: 2007 },
          { date: 'Apr 2, 2023', title: 'Oasis', year: 2002 },
          { date: 'Apr 15, 2023', title: 'Memories of Murder', year: 2003 },
          { date: 'Apr 22, 2023', title: 'The Handmaiden', year: 2016 },
          { date: 'May 5, 2023', title: 'Right Now, Wrong Then', year: 2015 },
          { date: 'May 13, 2023', title: 'The Day He Arrives', year: 2011 },
          { date: 'May 27, 2023', title: 'In Front of Your Face', year: 2021 },
        ],
      },
      {
        kind: 'quote',
        label: 'From her review of Poetry',
        source: 'Maya on Poetry · Mar 11, 2023',
        text: 'Nothing happens and everything happens. I keep thinking about the ending.',
      },
      {
        kind: 'films',
        label: 'The other five films from the same ten weeks',
        films: [
          { date: 'Mar 25, 2023', title: 'Paris, Texas', year: 1984 },
          { date: 'Apr 8, 2023', title: 'Tokyo Story', year: 1953 },
          { date: 'Apr 30, 2023', title: 'Certified Copy', year: 2010 },
          { date: 'May 20, 2023', title: 'Wings of Desire', year: 1987 },
          { date: 'Jun 3, 2023', title: 'Taste of Cherry', year: 1997 },
        ],
      },
      {
        kind: 'pattern',
        label: 'The pattern',
        text: 'Every film here — Korean or not — trusts the viewer to wait. Long takes, unhurried scenes, endings that stay open.',
      },
    ],
    interpretation: 'There are two honest ways to read this evidence.',
    claim: 'By spring 2023, the searching had a direction.',
    fork: {
      prompt: 'Which reading feels truer?',
      choices: [
        {
          id: 'korean',
          label: 'A Korean cinema chapter',
          detail: 'The country’s cinema was the exploration. The rest was incidental.',
        },
        {
          id: 'patience',
          label: 'A patience chapter',
          detail: 'The exploration was a kind of film. Korean cinema just spoke it fluently.',
        },
      ],
    },
    titleFor: (choice) => (choice === 'korean' ? 'The Korean Spring' : 'Learning Patience'),
    paragraphFor: (choice) =>
      choice === 'korean'
        ? 'By spring 2023 the searching had a direction. Nine Korean films in ten weeks — Lee Chang-dong first, then outward to Bong, Park, and Hong. She didn’t just watch the films; she followed the interviews, the filmographies, the threads between them. For ten weeks, a country’s cinema became a place she lived.'
        : 'By spring 2023 the searching had a direction, though not the obvious one. Nine of fourteen films were Korean — but the other five, from Wenders to Ozu to Kiarostami, give the game away. The chapter wasn’t about Korea. It was about patience: films that trust a viewer to wait. Korean cinema just happened to speak it fluently.',
  },
  {
    id: 'rewatch',
    marker: 'February 2024',
    observation: 'In February 2024, Maya watched Arrival for the third time.',
    evidence: [
      {
        kind: 'quote',
        label: 'First watch',
        source: 'Maya on Arrival · Nov 2016',
        text: 'That twist!! Sci-fi of the year.',
      },
      {
        kind: 'quote',
        label: 'Second watch, five years later',
        source: 'Maya on Arrival · Jan 2021',
        text: 'Cried at the ending this time. Didn’t expect that.',
      },
      {
        kind: 'quote',
        label: 'Third watch',
        source: 'Maya on Arrival · Feb 2024',
        text: 'It’s not about the aliens. It’s about choosing to love something you know you’ll lose.',
      },
      {
        kind: 'pattern',
        label: 'The pattern',
        text: 'The film didn’t change between 2016 and 2024. The person watching it did.',
      },
    ],
    interpretation:
      'Rewatches may be the clearest evidence in the whole archive. The film holds still; the viewer doesn’t.',
    claim: 'The film held still; the viewer didn’t.',
    fork: {
      prompt: 'What does this rewatch mean?',
      choices: [
        {
          id: 'understood',
          label: 'She understood it more',
          detail: 'Eight years of watching taught her to read the film differently.',
        },
        {
          id: 'needed',
          label: 'She needed it differently',
          detail: 'Something in her life changed what the film was for.',
        },
      ],
    },
    titleFor: () => 'The Third Watch',
    paragraphFor: (choice) =>
      choice === 'understood'
        ? 'In February 2024 she watched Arrival for the third time. In 2016 it was a twist; in 2021 it made her cry; in 2024 she wrote that it was “about choosing to love something you know you’ll lose.” The film held still for eight years while the reading deepened around it. Somewhere in the archive between those watches is the education that made the third reading possible.'
        : 'In February 2024 she watched Arrival for the third time. In 2016 it was a twist; in 2021 it made her cry; in 2024 it was “about choosing to love something you know you’ll lose.” The film hadn’t changed. Something in her life needed it differently — the archive can’t say what, only that it did.',
  },
  {
    id: 'taste',
    marker: '2022 – 2024',
    observation: 'Underneath everything, one pattern keeps returning.',
    evidence: [
      {
        kind: 'films',
        label: 'The films she kept — rewatched, saved, quoted',
        films: [
          { date: 'kept', title: 'Burning', year: 2018, note: 'rewatched twice' },
          { date: 'kept', title: 'A Ghost Story', year: 2017, note: 'saved' },
          { date: 'kept', title: 'Certified Copy', year: 2010, note: 'quoted in three reviews' },
          { date: 'kept', title: 'Past Lives', year: 2023, note: 'rewatched' },
          { date: 'kept', title: 'Aftersun', year: 2022, note: 'rewatched' },
        ],
      },
      {
        kind: 'pattern',
        label: 'What they share',
        text: 'None of them resolve. Every ending stays open. Meanwhile, the tidy films from the same two years were finished once, rated quickly, and never mentioned again.',
      },
      {
        kind: 'quote',
        label: 'And one sentence from her own review of Burning',
        source: 'Maya on Burning · Mar 2023',
        text: 'I used to hate endings like this.',
      },
    ],
    interpretation:
      'This may no longer be an exploration. It may be taste — the kind that persists after the curiosity fades.',
    claim: 'The unresolved endings are taste now, not curiosity.',
    fork: {
      prompt: 'How sure should the memoir be?',
      choices: [
        {
          id: 'plain',
          label: 'Say it plainly',
          detail: 'Two years of evidence is enough. This is who she is now.',
        },
        {
          id: 'hedged',
          label: 'Keep it uncertain',
          detail: 'Taste takes longer than two years. Let the memoir wait for more evidence.',
        },
      ],
    },
    titleFor: (choice) => (choice === 'plain' ? 'Unanswered Questions' : 'A Pattern, Maybe'),
    paragraphFor: (choice) =>
      choice === 'plain'
        ? 'And underneath the chapters, a pattern that no longer fades when the explorations do: the endings she keeps are the ones that refuse to resolve. Burning, A Ghost Story, Past Lives, Aftersun — kept, rewatched, quoted — while the tidy endings were finished once and forgotten. She once wrote “I used to hate endings like this.” Not anymore. This is taste now: Maya loves an unanswered question.'
        : 'And underneath the chapters, a pattern worth watching: the endings she keeps are the ones that refuse to resolve. Burning, A Ghost Story, Past Lives, Aftersun — kept, rewatched, quoted — while the tidy endings were finished once and forgotten. She once wrote “I used to hate endings like this.” It may be taste now. Or it may be a long exploration still underway. Another year of evidence will tell.',
  },
  {
    id: 'confound',
    marker: 'The last question',
    observation: 'One question this archive cannot answer alone: how much of the drift was hers?',
    evidence: [
      {
        kind: 'pattern',
        label: 'Before the winter',
        text: 'In the year before that winter, nineteen of her twenty-one films were watched within weeks of release. The calendar chose. The feeds served. She watched.',
      },
      {
        kind: 'films',
        label: 'What arrived on its own',
        films: [
          { date: 'Jun 18, 2022', title: 'The Gray Man', year: 2022, note: 'released Jun 17' },
          { date: 'Jul 9, 2022', title: 'Thor: Love and Thunder', year: 2022, note: 'released Jul 8' },
          { date: 'Aug 6, 2022', title: 'Bullet Train', year: 2022, note: 'released Aug 5' },
        ],
      },
      {
        kind: 'pattern',
        label: 'After the winter',
        text: 'The films she watched afterward were years old — 2016, 2010, 1984, 1953. No feed was promoting Tokyo Story in the spring of 2023. Those films were found in lists, essays, interviews, other people’s memories.',
      },
      {
        kind: 'pattern',
        label: 'What the archive cannot show',
        text: 'Every “found” film was still surfaced by something — a list someone made, an essay someone wrote, a friend who insisted. The archive records the what and the when. It cannot record the who-chose.',
      },
    ],
    interpretation:
      'The feeds lost their grip that winter. Whether she took hold — or something else did — the evidence cannot say.',
    claim: 'The drift, at least in part, was hers.',
    fork: {
      prompt: 'How should the memoir answer?',
      choices: [
        {
          id: 'hers',
          label: 'The searching was hers',
          detail: 'The feeds served the before. They never got the chance to serve the after.',
        },
        {
          id: 'entangled',
          label: 'No one drifts alone',
          detail: 'Lists, essays, friends — something always chooses first. Honesty over comfort.',
        },
      ],
    },
    titleFor: (choice) => (choice === 'hers' ? 'Her Own Weather' : 'No One Drifts Alone'),
    paragraphFor: (choice) =>
      choice === 'hers'
        ? 'The last question is the uncomfortable one. In the year before that winter, nineteen of twenty-one films arrived in their opening weeks, served by the same feeds that serve everyone. Afterward the films were old — found in lists, essays, other people’s memories. If the feeds had still been choosing, they would have kept serving the calendar. They never got the chance. The drift, at least in part, was hers.'
        : 'The last question is the uncomfortable one. In the year before that winter, the calendar chose: nineteen of twenty-one films arrived in their opening weeks. Afterward the films were old — but every one of them was still surfaced by something. A list someone made. An essay someone wrote. A friend who insisted. The archive can show that the feeds lost their grip. It cannot show who took hold instead. Maybe no one drifts alone.',
  },
]

// Editorial cut (zero-attachment review): three chapters teach the grammar —
// a contested beginning, a pattern hardening into taste, and the confound.
// 'direction' and 'rewatch' stay defined above as documented material, per the
// research principle that rejected ideas remain in the record; the import
// engine covers rewatches and bursts with the reader's own data.
export const chapters: Chapter[] = allChapters.filter((c) =>
  ['catalyst', 'taste', 'confound'].includes(c.id),
)
