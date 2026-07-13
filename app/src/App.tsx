import { useEffect, useRef, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { chapters as mayaChapters, type Chapter } from './data'
import { corpus } from './corpus'
import { computeChapters, DeclinedToInterpret, parseLetterboxdCsv } from './importer'
import { SovereignDraft } from './SovereignDraft'

type Source = 'maya' | 'import'
type ImportNotice = { kind: 'declined' | 'error'; message: string }

export default function App() {
  const [source, setSource] = useState<Source>('maya')
  const [chapters, setChapters] = useState<Chapter[]>(mayaChapters)
  const [edition, setEdition] = useState(0)
  const [showAbout, setShowAbout] = useState(false)
  const [importNotice, setImportNotice] = useState<ImportNotice | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  function openMaya() {
    setSource('maya')
    setChapters(mayaChapters)
    setEdition((value) => value + 1)
    setImportNotice(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function openArchivePicker() {
    fileRef.current?.click()
  }

  function importArchive(file: File) {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const rows = parseLetterboxdCsv(String(reader.result))
        setChapters(computeChapters(rows))
        setSource('import')
        setEdition((value) => value + 1)
        setImportNotice(null)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } catch (error) {
        setImportNotice({
          kind: error instanceof DeclinedToInterpret ? 'declined' : 'error',
          message:
            error instanceof Error ? error.message : 'We could not read that archive.',
        })
      }
    }
    reader.onerror = () =>
      setImportNotice({ kind: 'error', message: 'We could not read that archive.' })
    reader.readAsText(file)
  }

  return (
    <MotionConfig reducedMotion="user">
      <nav className="edition-nav" aria-label="Edition controls" aria-hidden={showAbout || undefined}>
        <button className="edition-wordmark" onClick={() => setShowAbout(true)}>
          Pentimento
        </button>
        <div className="edition-nav-actions">
          <button onClick={openMaya}>Maya’s edition</button>
          <button onClick={openArchivePicker}>Read your archive</button>
        </div>
      </nav>

      <input
        ref={fileRef}
        type="file"
        accept=".csv,text/csv"
        hidden
        aria-hidden={showAbout || undefined}
        onChange={(event) => {
          const file = event.target.files?.[0]
          if (file) importArchive(file)
          event.target.value = ''
        }}
      />

      {importNotice && (
        <div
          className={`edition-message is-${importNotice.kind}`}
          role={importNotice.kind === 'error' ? 'alert' : 'status'}
          aria-live={importNotice.kind === 'error' ? 'assertive' : 'polite'}
        >
          <span>
            {importNotice.kind === 'declined'
              ? 'the archive declined to become a memoir'
              : 'this file could not be read'}
          </span>
          <p>{importNotice.message}</p>
          <div className="edition-message-actions">
            <button onClick={openArchivePicker}>choose another file</button>
            <button onClick={() => setImportNotice(null)}>dismiss</button>
          </div>
        </div>
      )}

      <main className="edition-shell" aria-hidden={showAbout || undefined}>
        <SovereignDraft
          key={`${source}-${edition}`}
          chapters={chapters}
          source={source}
          onRestart={openMaya}
          onReadArchive={openArchivePicker}
        />
      </main>

      {showAbout && <About onClose={() => setShowAbout(false)} />}
    </MotionConfig>
  )
}

function About({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusTimer = window.setTimeout(() => {
      dialogRef.current?.querySelector<HTMLElement>('button, a[href]')?.focus()
    }, 0)

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeRef.current()
        return
      }
      if (event.key !== 'Tab') return

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [])

  return (
    <div
      ref={dialogRef}
      className="about-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-title"
    >
      <button className="about-close sovereign-link" onClick={onClose}>
        close
      </button>
      <div className="about-inner sovereign-about">
        <p className="draft-edition">Why this document exists</p>
        <h2 id="about-title">A machine may write the first draft. It does not own the final one.</h2>
        <p>
          Pentimento reads dates, titles, returns, and absences as evidence. It proposes a memoir,
          sentence by sentence. Evidence can remain true while interpretation fails.
        </p>
        <p>
          When the subject strikes a sentence, their correction becomes sovereign ink. The system
          may revise around those words. It may not edit them, relocate them, or quietly restore the
          reading they replaced.
        </p>
        <p className="sovereign-about-position">
          Software that narrates a person owes that person a right of reply—and the next draft must
          show that the reply mattered.
        </p>
        <p>
          In painting, a pentimento is an earlier mark that remains visible through the finished
          work. Here, the withdrawn machine reading becomes that underpainting: no longer in charge,
          never hidden from the record.
        </p>
        <p className="sovereign-about-note">
          Your Letterboxd export is read in this browser and kept nowhere. Maya’s edition is an
          authored fictional research probe—not participant data. No participant corrections are
          invented.
        </p>
        <a className="sovereign-link about-corpus-link" href="#corrections-corpus">
          corrections corpus (n={corpus.length})
        </a>

        <section id="corrections-corpus" className="about-corpus" aria-labelledby="corpus-title">
          <p className="draft-edition">Research record</p>
          <h3 id="corpus-title">Corrections corpus</h3>
          {corpus.length === 0 ? (
            <p className="corpus-empty">
              No study sessions have been run. This gallery will contain only real, consented
              corrections—never authored examples.
            </p>
          ) : (
            <div className="corpus-grid">
              {corpus.map((entry, index) => (
                <article className="corpus-entry" key={`${entry.sessionDate}-${index}`}>
                  <p className="underpainting-label">{entry.failureMode}</p>
                  <p className="underpainting-claim">{entry.machineClaim}</p>
                  <p className="sovereign-words">“{entry.correction}”</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
