// The corrections corpus (STUDY.md): real struck machine sentences, paired
// with what real people said instead, grouped by how the reading failed.
//
// This file is populated ONLY from real study sessions. It is never seeded
// with authored, synthetic, or illustrative entries — fabricating this data
// would betray the exact thing Pentimento argues for. It ships empty, and
// the corpus view (App.tsx) is built to turn on the moment entries land here.
//
// To add a finding: append an entry after a session, sourced from the
// participant's own struck reading + correction (see STUDY.md's coding plan
// for the failureMode categories).

export type CorpusEntry = {
  machineClaim: string
  correction: string
  failureMode: string
  sessionDate: string // ISO date
}

export const corpus: CorpusEntry[] = []
