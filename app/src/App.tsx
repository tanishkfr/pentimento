import { useRef, useState } from 'react'
import { MotionConfig, motion } from 'framer-motion'
import { chapters as mayaChapters, type Chapter } from './data'
import { ChapterView, StruckReading, type ChapterRecord } from './ChapterView'
import { Evidence } from './Evidence'
import { computeChapters, parseLetterboxdCsv } from './importer'
import { useStaged } from './useStaged'

type Source = 'maya' | 'import'
type Phase = { kind: 'opening' } | { kind: 'chapter'; index: number } | { kind: 'epilogue' }

const fade = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
}

export default function App() {
  const [phase, goPhase, leaving] = useStaged<Phase>({ kind: 'opening' })
  const [source, setSource] = useState<Source>('maya')
  const [chapters, setChapters] = useState<Chapter[]>(mayaChapters)
  const [records, setRecords] = useState<ChapterRecord[]>([])

  function beginMaya() {
    setSource('maya')
    setChapters(mayaChapters)
    setRecords([])
    goPhase({ kind: 'chapter', index: 0 })
  }

  function beginImport(computed: Chapter[]) {
    setSource('import')
    setChapters(computed)
    setRecords([])
    goPhase({ kind: 'chapter', index: 0 })
  }

  function finishChapter(record: ChapterRecord, index: number) {
    setRecords((r) => [...r, record])
    if (index + 1 < chapters.length) {
      goPhase({ kind: 'chapter', index: index + 1 })
    } else {
      goPhase({ kind: 'epilogue' })
    }
  }

  const [showAbout, setShowAbout] = useState(false)

  return (
    <MotionConfig reducedMotion="user">
      <button className="wordmark" onClick={() => setShowAbout(true)} aria-haspopup="dialog">
        Pentimento
      </button>
      {showAbout && <About onClose={() => setShowAbout(false)} />}
      {phase.kind !== 'opening' && (
        <div className="progress-dots" aria-hidden>
          {chapters.map((c, i) => (
            <div
              key={c.id}
              className={
                'progress-dot' +
                (phase.kind === 'chapter' && phase.index === i
                  ? ' active'
                  : i < records.length
                    ? ' done'
                    : '')
              }
            />
          ))}
        </div>
      )}
      <main className={leaving ? 'page staged leaving' : 'page staged'}>
        {phase.kind === 'opening' && (
          <motion.div key="opening" {...fade} transition={{ duration: 0.8 }}>
            <Opening onBegin={beginMaya} onImported={beginImport} />
          </motion.div>
        )}
        {phase.kind === 'chapter' && (
          <ChapterView
            key={source + '-' + phase.index}
            chapter={chapters[phase.index]}
            onDone={(rec) => finishChapter(rec, phase.index)}
          />
        )}
        {phase.kind === 'epilogue' && (
          <motion.div key="epilogue" {...fade} transition={{ duration: 0.9 }}>
            <Epilogue records={records} source={source} onImported={beginImport} />
          </motion.div>
        )}
      </main>
    </MotionConfig>
  )
}

function About({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="about-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Why Pentimento exists"
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose()
      }}
    >
      <button className="about-close reject-link" onClick={onClose} autoFocus>
        close
      </button>
      <div className="about-inner">
        <div className="marker">Why this exists</div>
        <p className="memoir-paragraph" style={{ marginBottom: 28 }}>
          Algorithmic autobiography is already a mass medium. Year-in-reviews, listening
          recaps, memory reels — machines write hundreds of millions of stories about people
          every year. The stories cite no evidence, admit no doubt, and take no corrections.
          There is no way to tell a recap that March was the month someone died, not a
          “horror phase.”
        </p>
        <p className="memoir-paragraph" style={{ marginBottom: 28 }}>
          Pentimento is a working argument that it can be otherwise. It writes a first
          draft of what changed in you, from your archive — then defends every sentence or
          gives it up. Evidence attached to every claim. Uncertainty set by you. Readings
          you strike stay struck, your corrections outrank our readings, and the revision
          carries the scar.
        </p>
        <p className="gloss" style={{ marginBottom: 28 }}>
          The name is a painter's word: a pentimento is an earlier stroke left visible
          through the finished work — the change of mind, kept. That is what this software
          does with its own mistakes.
        </p>
        <p className="pattern-text" style={{ marginBottom: 28 }}>
          It refuses: scores, personality types, streaks, comparisons, and certainty you
          didn’t authorize.
        </p>
        <p className="pattern-text" style={{ marginBottom: 40 }}>
          This is design research in the open, not a product. Maya’s archive is an authored
          probe, labeled as such. Your Letterboxd export is read in this window and kept
          nowhere. A participant study is planned; this page is its instrument, and the
          session download is its record — shared only if you choose to.
        </p>
        <p className="interpretation">
          Software that narrates a person owes that person a right of reply.
        </p>
      </div>
    </div>
  )
}

// One control, two doors: the opening and the end of Maya's memoir both
// lead to the reader's own archive.
function ImportControl({
  prompt,
  onImported,
}: {
  prompt: string
  onImported: (chapters: Chapter[]) => void
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [note, setNote] = useState<string | null>(null)

  function handleFile(file: File) {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const rows = parseLetterboxdCsv(String(reader.result))
        onImported(computeChapters(rows))
      } catch (err) {
        setNote(err instanceof Error ? err.message : 'We couldn’t read that file.')
      }
    }
    reader.onerror = () => setNote('We couldn’t read that file.')
    reader.readAsText(file)
  }

  return (
    <>
      <button className="reject-link" onClick={() => fileRef.current?.click()}>
        {prompt}
      </button>
      <div className="import-note">
        diary.csv or watched.csv · read entirely in this window · nothing leaves your browser
      </div>
      {note && <div className="import-message">{note}</div>}
      <input
        ref={fileRef}
        type="file"
        accept=".csv,text/csv"
        style={{ display: 'none' }}
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) handleFile(f)
          e.target.value = ''
        }}
      />
    </>
  )
}

function Opening({
  onBegin,
  onImported,
}: {
  onBegin: () => void
  onImported: (chapters: Chapter[]) => void
}) {

  return (
    <div style={{ paddingTop: '10vh' }}>
      <motion.h1
        className="observation"
        style={{ marginBottom: 18, color: 'var(--muted)' }}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.9, ease: [0.2, 0.6, 0.2, 1] }}
      >
        Every December, machines tell you who you were.
      </motion.h1>
      <motion.h1
        className="observation"
        style={{ marginBottom: 40 }}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.9, ease: [0.2, 0.6, 0.2, 1] }}
      >
        This one can be told it’s wrong.
      </motion.h1>

      <motion.p
        className="pattern-text"
        style={{ marginTop: 8, marginBottom: 40, maxWidth: 500 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 1 }}
      >
        Pentimento reads a film diary — what you watched, when, what you returned to — and
        writes a short memoir of how your taste changed. Then it defends every sentence,
        or gives it up.
      </motion.p>

      <motion.div
        className="specimen"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.9, duration: 0.9, ease: [0.2, 0.6, 0.2, 1] }}
      >
        <div className="specimen-label">from a finished draft</div>
        <p className="memoir-paragraph struck" style={{ fontSize: 18 }}>
          A horror phase began that October.
        </p>
        <div className="margin-note">
          <div className="margin-note-label">the correction</div>
          <div className="margin-note-text">
            “Not a phase. I couldn’t sleep that month, and the films kept me company.”
          </div>
        </div>
      </motion.div>

      <motion.div
        className="steps"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.7, duration: 0.9 }}
      >
        <div className="step">
          <span className="step-num">01</span>
          <span>It writes a claim about you, with the evidence attached.</span>
        </div>
        <div className="step">
          <span className="step-num">02</span>
          <span>You accept it, reframe it, or strike it out in your own words.</span>
        </div>
        <div className="step">
          <span className="step-num">03</span>
          <span>The finished memoir keeps the whole argument visible.</span>
        </div>
      </motion.div>

      <motion.p
        className="gloss"
        style={{ marginTop: 40 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.4, duration: 1 }}
      >
        pentimento — in painting, an earlier stroke left visible through the finished
        work. The change of mind, kept.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5.0, duration: 0.8 }}
        style={{ marginTop: 40 }}
      >
        <button className="quiet-button" onClick={onBegin}>
          Read Maya's archive — our research probe →
        </button>
      </motion.div>
      <motion.div
        className="import-row"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5.5, duration: 0.8 }}
      >
        <ImportControl
          prompt="or read your own — import a Letterboxd export"
          onImported={onImported}
        />
      </motion.div>
    </div>
  )
}

// Draft two: where a reading was struck, the reader's account leads and the
// first draft's claim stays visible as a scar inside the revision.
function RevisedReading({ record }: { record: ChapterRecord }) {
  const claim = record.chapter.claim
  return (
    <p className="memoir-paragraph">
      The first draft claimed: <span className="struck">“{claim}”</span> — and it was
      struck.{' '}
      {record.userWords ? (
        <>
          What stands is the account of the person who was there: <em>“{record.userWords}”</em>{' '}
          The dates and titles remain exactly where they were; evidence rarely moves. The
          reading now defers to its subject.
        </>
      ) : (
        <>
          Nothing was offered in its place, and that is its own kind of answer: something
          happened in this stretch of the archive that it can see and cannot name. This
          draft records the blank honestly.
        </>
      )}
    </p>
  )
}

// The study's instrument (STUDY.md): every reading, strike, and correction as
// structured data. Downloaded locally; shared only if the participant chooses.
function downloadSessionRecord(records: ChapterRecord[], source: Source, draft: 1 | 2) {
  const record = {
    app: 'Pentimento',
    version: '0.3',
    source,
    draftViewed: draft,
    exportedAt: new Date().toISOString(),
    chapters: records.map((r) => ({
      id: r.chapter.id,
      marker: r.chapter.marker,
      observation: r.chapter.observation,
      claim: r.chapter.claim,
      status: r.status,
      choice: r.choiceId,
      name: r.name,
      correction: r.userWords ?? null,
      paragraph: r.status === 'accepted' ? r.paragraph : null,
    })),
  }
  const blob = new Blob([JSON.stringify(record, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'pentimento-session.json'
  a.click()
  URL.revokeObjectURL(url)
}

function Epilogue({
  records,
  source,
  onImported,
}: {
  records: ChapterRecord[]
  source: Source
  onImported: (chapters: Chapter[]) => void
}) {
  const [openId, setOpenId] = useState<string | null>(null)
  const [draft, setDraft] = useState<1 | 2>(1)

  const struck = records.filter((r) => r.status === 'rejected')
  const title = source === 'maya' ? 'Maya, 2022–2024' : 'You, in your own archive'
  const subtitle =
    draft === 1
      ? source === 'maya'
        ? 'First draft, written together'
        : 'First draft, written together — computed in your browser, kept nowhere'
      : 'Second draft — revised where you disagreed'

  return (
    <div className="memoir">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>
        <h1 className="memoir-title">{title}</h1>
        <div className="memoir-subtitle">{subtitle}</div>
      </motion.div>
      {records.map((rec, i) => {
        const open = openId === rec.chapter.id
        const revised = draft === 2 && rec.status === 'rejected'
        return (
          <motion.section
            key={rec.chapter.id + '-' + draft}
            className="memoir-chapter"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.3, duration: 0.9, ease: [0.2, 0.6, 0.2, 1] }}
          >
            <div
              className={
                rec.status === 'rejected' ? 'memoir-chapter-name withdrawn' : 'memoir-chapter-name'
              }
            >
              {revised ? (rec.userWords ? 'In your words' : 'What the archive can’t name') : rec.name}
            </div>
            <div
              className="memoir-clickable"
              onClick={() => setOpenId(open ? null : rec.chapter.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setOpenId(open ? null : rec.chapter.id)
                }
              }}
            >
              {rec.status === 'accepted' ? (
                <p className="memoir-paragraph">{rec.paragraph}</p>
              ) : revised ? (
                <RevisedReading record={rec} />
              ) : (
                <StruckReading record={rec} />
              )}
            </div>
            <div className="why-hint">
              {open ? 'the evidence —' : 'why? — click to reopen the evidence'}
            </div>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.6, ease: [0.2, 0.6, 0.2, 1] }}
                style={{ overflow: 'hidden', marginTop: 12 }}
              >
                <Evidence blocks={rec.chapter.evidence} animate={false} />
              </motion.div>
            )}
          </motion.section>
        )
      })}
      <motion.p
        className="closing-note"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 + records.length * 0.3 + 0.5, duration: 1.2 }}
      >
        {draft === 2 ? (
          <>
            Draft two stands. The strikes stayed visible because the argument is the
            document. Nothing here was ever certain — it is simply honest, now, about whose
            account leads.
          </>
        ) : source === 'maya' ? (
          <>
            This is one reading of one archive — and Maya is a study subject we wrote; her
            archive is a research probe. Every sentence above can answer “why?”, every
            reading stays open to revision
            {struck.length > 0 ? ', and the ones you struck stay struck' : ''}. Your own
            export gets the same treatment, computed live in this window.
          </>
        ) : (
          <>
            This was one reading of your archive — computed from dates and titles alone, in
            this window, kept nowhere. It can see <em>when</em>; it can never see <em>why</em>.
            {struck.length > 0
              ? ' Where it was wrong, your corrections now outrank its readings — that is how it should work.'
              : ' You supplied the why. That part was never ours to write.'}
          </>
        )}
      </motion.p>
      <motion.div
        className="epilogue-actions"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 + records.length * 0.3 + 1.1, duration: 0.9 }}
      >
        {struck.length > 0 && draft === 1 && (
          <div style={{ marginBottom: 18 }}>
            <div className="fork-prompt">Where you struck a reading, your words will lead.</div>
            <button className="quiet-button" onClick={() => setDraft(2)}>
              Ask for a second draft →
            </button>
          </div>
        )}
        {draft === 2 && (
          <div style={{ marginBottom: 18 }}>
            <button className="reject-link" onClick={() => setDraft(1)}>
              see the first draft again
            </button>
          </div>
        )}
        <button className="reject-link" onClick={() => window.print()}>
          print this draft — scars included
        </button>
        <button
          className="reject-link"
          onClick={() => downloadSessionRecord(records, source, draft)}
        >
          download this session — every reading, strike, and correction, yours to keep
        </button>
        {source === 'maya' && (
          <div style={{ marginTop: 32, borderTop: '1px solid var(--line)', paddingTop: 22 }}>
            <div className="fork-prompt">Maya’s archive was the rehearsal.</div>
            <ImportControl
              prompt="now read your own — import a Letterboxd export →"
              onImported={onImported}
            />
          </div>
        )}
      </motion.div>
    </div>
  )
}
