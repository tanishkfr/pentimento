import { useRef, useState } from 'react'

// Two-beat phase change: the old stage yields (fades up and out via CSS),
// then the new stage enters. Owning the exit ourselves keeps the
// choreography out of AnimatePresence, whose exit tracking proved unreliable.
export function useStaged<T>(initial: T, ms = 420): [T, (next: T) => void, boolean] {
  const [value, setValue] = useState(initial)
  const [leaving, setLeaving] = useState(false)
  const busy = useRef(false)

  function go(next: T) {
    if (busy.current) return
    busy.current = true
    setLeaving(true)
    window.setTimeout(() => {
      setValue(next)
      setLeaving(false)
      busy.current = false
      window.scrollTo(0, 0)
    }, ms)
  }

  return [value, go, leaving]
}
