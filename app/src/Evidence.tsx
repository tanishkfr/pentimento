import { motion } from 'framer-motion'
import type { EvidenceBlock } from './data'

// Evidence unfolds block by block — each layer answers a deeper question.
export function Evidence({ blocks, animate = true }: { blocks: EvidenceBlock[]; animate?: boolean }) {
  return (
    <div>
      {blocks.map((block, i) => (
        <motion.div
          key={i}
          className="evidence-block"
          initial={animate ? { opacity: 0, y: 14 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: animate ? 0.35 + i * 0.55 : 0, ease: [0.2, 0.6, 0.2, 1] }}
        >
          <div className="evidence-label">{block.label}</div>
          {block.kind === 'films' && (
            <div>
              {block.films.map((f) => (
                <div className="film-row" key={f.title + f.date}>
                  <span className="film-date">{f.date}</span>
                  <span>
                    <span className="film-title">{f.title}</span>
                    <span className="film-year">{f.year}</span>
                    {f.note && <span className="film-note">{f.note}</span>}
                  </span>
                </div>
              ))}
            </div>
          )}
          {block.kind === 'quote' && (
            <div>
              <div className="quote-text">“{block.text}”</div>
              <div className="quote-source">{block.source}</div>
            </div>
          )}
          {block.kind === 'pattern' && <div className="pattern-text">{block.text}</div>}
          {block.kind === 'computation' && (
            <div className="computation">
              <div className="computation-formula">{block.formula}</div>
              <div className="computation-result">{block.result}</div>
            </div>
          )}
          {block.kind === 'ratio' && (
            <div className="ratio-chart">
              {block.bars.map((bar) => (
                <div className="ratio-row" key={bar.label}>
                  <div className="ratio-row-label">{bar.label}</div>
                  <div className="ratio-track">
                    <motion.div
                      className="ratio-fill"
                      initial={animate ? { width: 0 } : { width: `${bar.pct}%` }}
                      animate={{ width: `${bar.pct}%` }}
                      transition={{ duration: 1, ease: [0.2, 0.6, 0.2, 1] }}
                    />
                  </div>
                  <div className="ratio-pct">{bar.pct}%</div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}
