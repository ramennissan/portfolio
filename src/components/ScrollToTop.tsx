import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// ScrollToTop hooks into route changes and resets the `.app-scroll` container
// to the top whenever the location changes.
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    const el = document.querySelector('.app-scroll') as HTMLElement | null
    if (el) {
      // reset scroll position immediately
      try { el.scrollTop = 0 } catch (e) { /* ignore */ }
      // also reset scrollLeft in case of horizontal offsets
      try { el.scrollLeft = 0 } catch (e) { /* ignore */ }
    } else {
      // fallback to window
      try { window.scrollTo(0, 0) } catch (e) { /* ignore */ }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return null
}
