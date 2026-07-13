import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import type { Chapter } from './data'
import { Evidence } from './Evidence'

export type SovereignRecord = {
  chapter: Chapter
  status: 'standing' | 'reframed' | 'struck'
  choiceId: string | null
  title: string
  paragraph: string
  correctionVersions: string[]
}

type DraftProps = {
  chapters: Chapter[]
  source: 'maya' | 'import'
  onRestart: () => void
  onReadArchive: () => void
}

const settle = { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const }

function firstChoice(chapter: Chapter) {
  return chapter.fork.choices[0]?.id ?? ''
}

function standingRecord(chapter: Chapter): SovereignRecord {
  const choiceId = firstChoice(chapter)
  const title = chapter.titleFor(choiceId)
  return {
    chapter,
    status: 'standing',
    choiceId,
    title,
    paragraph: chapter.paragraphFor(choiceId, title),
    correctionVersions: [],
  }
}

export function SovereignDraft({
  chapters,
  source,
  onRestart,
  onReadArchive,
}: DraftProps) {
  const [records, setRecords] = useState<Record<string, SovereignRecord>>({})
  const [settled, setSettled] = useState(false)
  const [showLineage, setShowLineage] = useState(false)

  const resolved = Object.keys(records).length
  const struck = Object.values(records).filter((record) => record.status === 'struck').length
  const title =
    source === 'maya' ? (
      <>
        Maya, <span className="title-range">2022–2024</span>
      </>
    ) : (
      'You, in your own archive'
    )
  const claimWord = chapters.length === 1 ? 'sentence remains a claim' : 'sentences remain claims'

  const orderedRecords = useMemo(
    () => chapters.map((chapter) => records[chapter.id]).filter(Boolean),
    [chapters, records],
  )

  useEffect(() => {
    if (!settled) return
    const timer = window.setTimeout(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
    }, 80)
    return () => window.clearTimeout(timer)
  }, [settled])

  function resolve(record: SovereignRecord) {
    setRecords((current) => ({ ...current, [record.chapter.id]: record }))
  }

  function clearRecord(chapterId: string) {
    setRecords((current) => {
      const next = { ...current }
      delete next[chapterId]
      return next
    })
  }

  function settleDraft() {
    setShowLineage(false)
    setSettled(true)
  }

  function returnToFirstDraft() {
    setSettled(false)
    setShowLineage(false)
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 40)
  }

  function downloadSessionRecord() {
    const payload = {
      format: 'pentimento-session-record',
      version: 1,
      generatedAt: new Date().toISOString(),
      source,
      rawArchiveIncluded: false,
      records: orderedRecords.map((record) => ({
        chapter: {
          id: record.chapter.id,
          marker: record.chapter.marker,
          observation: record.chapter.observation,
          claim: record.chapter.claim,
        },
        status: record.status,
        choiceId: record.choiceId,
        title: record.title,
        paragraph: record.paragraph,
        correctionVersions: record.correctionVersions,
      })),
    }
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }),
    )
    const link = document.createElement('a')
    link.href = url
    link.download = 'pentimento-session-record.json'
    link.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 0)
  }

  return (
    <LayoutGroup>
      <article className={`sovereign-document${settled ? ' is-settled' : ''}`}>
        <header className="draft-masthead">
          <div>
            <p className="draft-edition">{settled ? 'Second draft' : 'First draft'}</p>
            <h1 className="draft-title">{title}</h1>
            <p className="draft-deck">
              {settled
                ? struck > 0
                  ? 'The machine moved. The human words did not.'
                  : 'The first reading stands. No certainty was added.'
                : `Written from dates, titles, returns, and absences. ${chapters.length} ${claimWord}.`}
            </p>
            <p className="draft-provenance">
              {source === 'maya'
                ? 'Authored fictional research probe · no participant data'
                : 'Computed locally · your raw archive stays in this browser'}
            </p>
          </div>
          <div className="draft-folio" aria-label={`${resolved} of ${chapters.length} claims answered`}>
            <span>{String(resolved).padStart(2, '0')}</span>
            <span className="draft-folio-rule" />
            <span>{String(chapters.length).padStart(2, '0')}</span>
          </div>
        </header>

        {!settled && (
          <p className="draft-instruction">
            Open an underlined sentence. Let it stand, read it differently, or strike it in your own
            words. Pentimento keeps every changed mind visible.
          </p>
        )}

        <div className="draft-body">
          {chapters.map((chapter, index) => (
            <ClaimLeaf
              key={chapter.id}
              chapter={chapter}
              index={index}
              record={records[chapter.id]}
              settled={settled}
              showLineage={showLineage}
              onResolve={resolve}
              onClear={clearRecord}
            />
          ))}
        </div>

        <footer className="draft-colophon">
          {!settled ? (
            <>
              <p className="draft-colophon-copy">
                {resolved < chapters.length
                  ? `${chapters.length - resolved} ${chapters.length - resolved === 1 ? 'sentence still asks' : 'sentences still ask'} for your reply.`
                  : struck > 0
                    ? 'Your words are now constraints. The next draft must write around them.'
                    : 'You let every reading stand. That is a reply too.'}
              </p>
              <button
                className="sovereign-action"
                disabled={resolved < chapters.length}
                onClick={settleDraft}
              >
                Settle the second draft →
              </button>
            </>
          ) : (
            <>
              <p className="draft-colophon-copy">
                Source: the archive. First interpretation: the system. Final authority: the person
                who lived it.
              </p>
              <div className="draft-footer-actions">
                <button className="sovereign-action" onClick={() => window.print()}>
                  Print this edition
                </button>
                <button className="sovereign-link" onClick={downloadSessionRecord}>
                  download session record
                </button>
                {struck > 0 && (
                  <button className="sovereign-link" onClick={() => setShowLineage((value) => !value)}>
                    {showLineage ? 'hide the underpainting' : 'lift the underpainting'}
                  </button>
                )}
                <button className="sovereign-link" onClick={returnToFirstDraft}>
                  return to the first draft
                </button>
                <button className="sovereign-link" onClick={onReadArchive}>
                  read another archive
                </button>
                {source !== 'maya' && (
                  <button className="sovereign-link" onClick={onRestart}>
                    return to Maya’s edition
                  </button>
                )}
              </div>
            </>
          )}
        </footer>

        {settled && orderedRecords.length > 0 && (
          <p className="draft-signature">
            Pentimento · an edition that cannot hide what it revised
          </p>
        )}
      </article>
    </LayoutGroup>
  )
}

function ClaimLeaf({
  chapter,
  index,
  record,
  settled,
  showLineage,
  onResolve,
  onClear,
}: {
  chapter: Chapter
  index: number
  record?: SovereignRecord
  settled: boolean
  showLineage: boolean
  onResolve: (record: SovereignRecord) => void
  onClear: (chapterId: string) => void
}) {
  const [open, setOpen] = useState(index === 0)
  const [mode, setMode] = useState<'closed' | 'reframe' | 'strike'>('closed')
  const [correction, setCorrection] = useState('')
  const [editingHuman, setEditingHuman] = useState(false)
  const [revision, setRevision] = useState('')
  const apparatusId = `evidence-${chapter.id}`

  function finish(nextRecord: SovereignRecord) {
    onResolve(nextRecord)
    setMode('closed')
    setOpen(false)
  }

  function reframe(choiceId: string) {
    const title = chapter.titleFor(choiceId)
    finish({
      chapter,
      status: 'reframed',
      choiceId,
      title,
      paragraph: chapter.paragraphFor(choiceId, title),
      correctionVersions: [],
    })
  }

  function strike() {
    finish({
      chapter,
      status: 'struck',
      choiceId: null,
      title: 'A reading, withdrawn',
      paragraph: '',
      correctionVersions: [correction.trim()],
    })
  }

  function reviseHumanWords() {
    if (!record || record.status !== 'struck' || !revision.trim()) return
    onResolve({
      ...record,
      correctionVersions: [...record.correctionVersions, revision.trim()],
    })
    setRevision('')
    setEditingHuman(false)
  }

  function changeReply() {
    onClear(chapter.id)
    setCorrection('')
    setRevision('')
    setEditingHuman(false)
    setMode('closed')
    setOpen(true)
  }

  const latestCorrection = record && record.correctionVersions[record.correctionVersions.length - 1]

  return (
    <motion.section
      layout
      className={`claim-leaf status-${record?.status ?? 'unanswered'}`}
      transition={settle}
    >
      <div className="claim-running-head">
        <span>{chapter.marker}</span>
        <span>{String(index + 1).padStart(2, '0')}</span>
      </div>

      <motion.div layout className="machine-context" transition={settle}>
        <p>{chapter.observation}</p>
        {!settled && <p className="machine-reading">{chapter.interpretation}</p>}
      </motion.div>

      <AnimatePresence mode="popLayout" initial={false}>
        {record?.status === 'struck' ? (
          <motion.div
            key="sovereign"
            layout
            className="sovereign-composition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={settle}
          >
            <motion.div
              layout
              className="sovereign-anchor"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.65, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="sovereign-label">your words · sovereign ink</p>
              {latestCorrection ? (
                <h2 className="sovereign-words">“{latestCorrection}”</h2>
              ) : (
                <h2 className="sovereign-blank">
                  No replacement. The archive can see that something happened here. It cannot name it.
                </h2>
              )}
            </motion.div>

            <motion.div
              layout
              className="machine-after"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.65 }}
            >
              <p>
                Dates, titles, and returns remain in the record. Their meaning now defers to the
                person who was there.
              </p>
            </motion.div>

            <motion.div
              layout
              className={`underpainting${settled && !showLineage ? ' is-concealed' : ''}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.25, duration: 0.65 }}
            >
              <p className="underpainting-label">first layer · withdrawn</p>
              <p className="underpainting-claim">
                <span>{chapter.claim}</span>
                <motion.span
                  aria-hidden="true"
                  className="withdrawal-stroke"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.12, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
                />
              </p>
              {record.correctionVersions.length > 1 && (
                <div className="human-lineage">
                  {record.correctionVersions.slice(0, -1).map((version, versionIndex) => (
                    <p key={`${chapter.id}-${versionIndex}`}>
                      <span>human layer {versionIndex + 1}</span>
                      {version || '— refusal without replacement —'}
                    </p>
                  ))}
                </div>
              )}
            </motion.div>

            {!settled && (
              <div className="sovereign-controls">
                {!editingHuman ? (
                  <div className="sovereign-control-row">
                    <button className="sovereign-link" onClick={() => setEditingHuman(true)}>
                      revise your words
                    </button>
                    <button className="sovereign-link" onClick={changeReply}>
                      change this reply
                    </button>
                  </div>
                ) : (
                  <div className="human-revision-form">
                    <textarea
                      value={revision}
                      onChange={(event) => setRevision(event.target.value)}
                      rows={2}
                      placeholder="Only you can revise this sentence."
                      aria-label="Revise your correction"
                    />
                    <div className="sovereign-control-row">
                      <button
                        className="sovereign-action"
                        disabled={!revision.trim()}
                        onClick={reviseHumanWords}
                      >
                        Keep this human layer
                      </button>
                      <button
                        className="sovereign-link"
                        onClick={() => {
                          setEditingHuman(false)
                          setRevision('')
                        }}
                      >
                        cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        ) : record ? (
          <motion.div
            key="resolved"
            layout
            className="resolved-reading"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={settle}
          >
            <p className="resolved-label">
              {record.status === 'reframed' ? 'read differently' : 'allowed to stand'}
            </p>
            <h2 className="resolved-title">{record.title}</h2>
            <p>{record.paragraph}</p>
            {!settled && (
              <button className="sovereign-link change-reply" onClick={changeReply}>
                change this reply
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div key="claim" layout className="claim-proposition" transition={settle}>
            <h2 className="claim-heading">
              <button
                className="claim-sentence"
                aria-expanded={open}
                aria-controls={apparatusId}
                onClick={() => setOpen((value) => !value)}
              >
                {chapter.claim}
              </button>
            </h2>
            <p className="claim-invitation">This is interpretation, not evidence.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {settled && record && (
        <button
          className="sovereign-link evidence-toggle"
          aria-expanded={open}
          aria-controls={apparatusId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'close the evidence' : 'inspect the evidence'}
        </button>
      )}

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={apparatusId}
            role="region"
            aria-label={`Evidence for: ${chapter.claim}`}
            key="apparatus"
            className="claim-apparatus"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={settle}
          >
            <div className="evidence-drawer">
              <p className="apparatus-label">the archive’s evidence</p>
              <Evidence blocks={chapter.evidence} animate={!settled} />
            </div>

            {!settled && !record && mode === 'closed' && (
              <div className="claim-actions">
                <button className="sovereign-action" onClick={() => finish(standingRecord(chapter))}>
                  Let this reading stand
                </button>
                <button className="sovereign-link" onClick={() => setMode('reframe')}>
                  read the evidence differently
                </button>
                <button className="strike-action" onClick={() => setMode('strike')}>
                  strike the machine’s sentence
                </button>
              </div>
            )}

            {!settled && !record && mode === 'reframe' && (
              <div className="reframe-panel">
                <p className="apparatus-label">two readings · neither is evidence</p>
                {chapter.fork.choices.map((choice) => (
                  <button key={choice.id} onClick={() => reframe(choice.id)}>
                    <strong>{choice.label}</strong>
                    <span>{choice.detail}</span>
                  </button>
                ))}
                <button className="sovereign-link" onClick={() => setMode('closed')}>
                  return to the claim
                </button>
              </div>
            )}

            {!settled && !record && mode === 'strike' && (
              <div className="strike-panel">
                <p className="strike-panel-claim">{chapter.claim}</p>
                <label htmlFor={`correction-${chapter.id}`}>What stands instead?</label>
                <textarea
                  id={`correction-${chapter.id}`}
                  value={correction}
                  onChange={(event) => setCorrection(event.target.value)}
                  rows={3}
                  placeholder="Your words may be left blank. Refusal is still a reply."
                  autoFocus
                />
                <div>
                  <button className="strike-action" onClick={strike}>
                    Enter sovereign ink
                  </button>
                  <button className="sovereign-link" onClick={() => setMode('closed')}>
                    keep reading
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}
