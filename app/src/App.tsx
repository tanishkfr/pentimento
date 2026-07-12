import { useRef, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { chapters as mayaChapters, type Chapter } from './data'
import { computeChapters, DeclinedToInterpret, parseLetterboxdCsv } from './importer'
import { SovereignDraft } from './SovereignDraft'

type Source = 'maya' | 'import'

export default function App() {
  const [source, setSource] = useState<Source>('maya')
  const [chapters, setChapters] = useState<Chapter[]>(mayaChapters)
  const [edition, setEdition] = useState(0)
  const [showAbout, setShowAbout] = useState(false)
  const [importMessage, setImportMessage] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  function openMaya() {
    setSource('maya')
    setChapters(mayaChapters)
    setEdition((value) => value + 1)
    setImportMessage(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function importArchive(file: File) {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const rows = parseLetterboxdCsv(String(reader.result))
        setChapters(computeChapters(rows))
        setSource('import')
        setEdition((value) => value + 1)
        setImportMessage(null)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } catch (error) {
        setImportMessage(
          error instanceof DeclinedToInterpret || error instanceof Error
            ? error.message
            : 'We could not read that archive.',
        )
      }
    }
    reader.onerror = () => setImportMessage('We could not read that archive.')
    reader.readAsText(file)
  }

  return (
    <MotionConfig reducedMotion="user">
      <nav className="edition-nav" aria-label="Edition controls">
        <button className="edition-wordmark" onClick={() => setShowAbout(true)}>
          Pentimento
        </button>
        <div className="edition-nav-actions">
          <button onClick={openMaya}>Maya’s edition</button>
          <button onClick={() => fileRef.current?.click()}>Read your archive</button>
        </div>
      </nav>

      <input
        ref={fileRef}
        type="file"
        accept=".csv,text/csv"
        hidden
        onChange={(event) => {
          const file = event.target.files?.[0]
          if (file) importArchive(file)
          event.target.value = ''
        }}
      />

      {importMessage && (
        <div className="edition-message" role="status">
          <span>the archive declined to become a memoir</span>
          {importMessage}
        </div>
      )}

      <main className="edition-shell">
        <SovereignDraft
          key={`${source}-${edition}`}
          chapters={chapters}
          source={source}
          onRestart={openMaya}
        />
      </main>

      {showAbout && <About onClose={() => setShowAbout(false)} />}
    </MotionConfig>
  )
}

function About({ onClose }: { onClose: () => void }) {
  return (
    <div className="about-overlay" role="dialog" aria-modal="true" aria-label="About Pentimento">
      <button className="about-close sovereign-link" onClick={onClose} autoFocus>
        close
      </button>
      <div className="about-inner sovereign-about">
        <p className="draft-edition">Why this document exists</p>
        <h2>A machine may write the first draft. It does not own the final one.</h2>
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
        <p className="sovereign-about-note">
          Your Letterboxd export is read in this browser and kept nowhere. Maya’s edition is an
          authored research probe. No participant corrections are invented.
        </p>
      </div>
    </div>
  )
}
