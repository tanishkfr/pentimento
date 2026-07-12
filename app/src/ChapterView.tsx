import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Chapter } from './data'
import { Evidence } from './Evidence'
import { useStaged } from './useStaged'

export type ChapterRecord = {
  chapter: Chapter
  status: 'accepted' | 'rejected'
  choiceId: string | null
  name: string
  paragraph: string
  userWords?: string
}

type Stage = 'observation' | 'evidence' | 'reject' | 'naming' | 'written'

const fade = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
}

// One pass through the atomic loop:
// Observe → Inspect Evidence → Agree / Reject / Reframe → Name → the memoir writes.
export function ChapterView({
  chapter,
  onDone,
}: {
  chapter: Chapter
  onDone: (record: ChapterRecord) => void
}) {
  const [stage, goStage, leaving] = useStaged<Stage>('observation')
  const [choiceId, setChoiceId] = useState<string | null>(null)
  const [customName, setCustomName] = useState('')
  const [userWords, setUserWords] = useState('')
  const [record, setRecord] = useState<ChapterRecord | null>(null)

  const evidenceDelay = 0.35 + chapter.evidence.length * 0.55

  function choose(id: string) {
    setChoiceId(id)
    if (chapter.naming) {
      goStage('naming')
    } else {
      write(id, chapter.titleFor(id))
    }
  }

  function write(id: string, name: string) {
    const rec: ChapterRecord = {
      chapter,
      status: 'accepted',
      choiceId: id,
      name,
      paragraph: chapter.paragraphFor(id, name),
    }
    setRecord(rec)
    goStage('written')
  }

  function strike() {
    const rec: ChapterRecord = {
      chapter,
      status: 'rejected',
      choiceId: null,
      name: 'A reading, withdrawn',
      paragraph: '',
      userWords: userWords.trim() || undefined,
    }
    setRecord(rec)
    goStage('written')
  }

  return (
    <div className={leaving ? 'staged leaving' : 'staged'}>
      {stage === 'observation' && (
        <motion.div key="obs" {...fade} transition={{ duration: 0.8 }}>
          <div className="marker">{chapter.marker}</div>
          <h2 className="observation">{chapter.observation}</h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            style={{ marginTop: 40 }}
          >
            <button className="quiet-button" onClick={() => goStage('evidence')}>
              See why we think this →
            </button>
          </motion.div>
        </motion.div>
      )}

      {stage === 'evidence' && (
        <motion.div key="ev" {...fade} transition={{ duration: 0.7 }}>
          <div className="marker">{chapter.marker}</div>
          <h2 className="observation" style={{ fontSize: 26 }}>
            {chapter.observation}
          </h2>
          <Evidence blocks={chapter.evidence} />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: evidenceDelay + 0.4, duration: 0.8 }}
            style={{ marginTop: 48 }}
          >
            <p className="interpretation">{chapter.interpretation}</p>
            <div style={{ marginTop: 36 }}>
              <div className="fork-prompt">{chapter.fork.prompt}</div>
              {chapter.fork.choices.map((c) => (
                <button key={c.id} className="fork-choice" onClick={() => choose(c.id)}>
                  <span className="choice-label">{c.label}</span>
                  <span className="choice-detail">{c.detail}</span>
                </button>
              ))}
              <button className="reject-link" onClick={() => goStage('reject')}>
                Neither — this reading is wrong
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {stage === 'reject' && (
        <motion.div key="reject" {...fade} transition={{ duration: 0.7 }}>
          <div className="marker">{chapter.marker}</div>
          <p className="interpretation" style={{ marginBottom: 16 }}>
            Then we’ll strike it.
          </p>
          <p className="pattern-text" style={{ marginBottom: 40 }}>
            The evidence stays in the record — evidence usually does. Only the reading goes.
            If you want, say what it was instead. The memoir will keep your words, not ours.
          </p>
          <textarea
            className="words-input"
            aria-label="Your correction, in your own words"
            placeholder="What was it, then? (you can leave this blank)"
            rows={3}
            value={userWords}
            onChange={(e) => setUserWords(e.target.value)}
          />
          <div style={{ marginTop: 26, display: 'flex', gap: 28, alignItems: 'baseline' }}>
            <button className="quiet-button" onClick={strike}>
              Strike the reading →
            </button>
            <button className="reject-link" onClick={() => goStage('evidence')}>
              go back
            </button>
          </div>
        </motion.div>
      )}

      {stage === 'naming' && chapter.naming && (
        <motion.div key="name" {...fade} transition={{ duration: 0.7 }}>
          <div className="marker">{chapter.marker}</div>
          <p className="interpretation" style={{ marginBottom: 40 }}>
            {chapter.naming.prompt}
          </p>
          <div style={{ marginBottom: 28 }}>
            {chapter.naming.suggestions.map((s) => (
              <button key={s} className="name-suggestion" onClick={() => write(choiceId!, s)}>
                {s}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (customName.trim()) write(choiceId!, customName.trim())
            }}
          >
            <input
              className="name-input"
              placeholder="or write your own…"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
            />
            {customName.trim() && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: 18 }}>
                <button type="submit" className="quiet-button">
                  Call it “{customName.trim()}” →
                </button>
              </motion.div>
            )}
          </form>
        </motion.div>
      )}

      {stage === 'written' && record && (
        <motion.div key="written" {...fade} transition={{ duration: 0.9 }}>
          <div className="memoir-chapter-name">{record.name}</div>
          {record.status === 'accepted' ? (
            <motion.p
              className="memoir-paragraph"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.6, ease: 'easeOut' }}
            >
              {record.paragraph}
            </motion.p>
          ) : (
            <StruckReading record={record} />
          )}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            style={{ marginTop: 44 }}
          >
            <div className="fork-prompt">
              {record.status === 'accepted'
                ? 'Written into the memoir.'
                : 'Struck — and the strike stays in the draft. Disagreement is part of the record.'}
            </div>
            <button className="quiet-button" onClick={() => onDone(record)}>
              Keep reading →
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

// The signature moment: the machine's claim visibly drains into a ghost —
// scale settles, a red line draws itself across it — while the reader's own
// words rise into the position the claim used to hold, in the human voice,
// at the size meaning gets. The hierarchy inversion IS the right of reply,
// made physical. The ghost never leaves; it just stops being in charge.
export function StruckReading({ record }: { record: ChapterRecord }) {
  const hasCorrection = !!record.userWords

  return (
    <div className="strike-moment">
      <motion.div
        className="strike-claim-wrap"
        initial={{ opacity: 0, scale: 1.22 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.65, ease: [0.2, 0.6, 0.2, 1] }}
        style={{ transformOrigin: 'left top' }}
      >
        <span className="strike-claim">{record.chapter.claim}</span>
        <motion.span
          className="strike-line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.55, duration: 0.5, ease: 'easeOut' }}
        />
      </motion.div>

      <motion.div
        className="retraction"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.05, duration: 0.6 }}
      >
        Reading withdrawn. The evidence remains.
      </motion.div>

      <motion.div
        className="strike-primary"
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.4, duration: 0.9, ease: [0.2, 0.6, 0.2, 1] }}
      >
        <div className="strike-primary-label">what stands instead</div>
        {hasCorrection ? (
          <p className="strike-correction-text">“{record.userWords}”</p>
        ) : (
          <p className="strike-blank-text">
            Nothing — and that is its own kind of answer. Something happened here that the
            archive can see and cannot name.
          </p>
        )}
      </motion.div>
    </div>
  )
}
