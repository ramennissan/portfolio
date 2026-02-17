import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ThemeProvider } from '@/hooks/useTheme'
import './styles/global.css'
import preventOverscroll from '@/lib/preventOverscroll'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)

// Enable overscroll prevention to strictly clamp scrolling to document bounds.
// We prefer attaching to the app's scroll container (`.app-scroll`) when available.
// The container may not exist immediately, so poll briefly and attach when ready.
let _cleanupPreventOverscroll: (() => void) | null = null
const _attachPrevent = () => {
  // if already attached, no-op
  if (_cleanupPreventOverscroll) return;
  const el = document.querySelector('.app-scroll') as HTMLElement | null;
  if (el) {
    _cleanupPreventOverscroll = preventOverscroll(el);
    return;
  }
  // fallback: attach to window
  _cleanupPreventOverscroll = preventOverscroll(window);
};

// Try to attach immediately; if .app-scroll isn't present yet, poll for a short time
_attachPrevent();
if (!_cleanupPreventOverscroll) {
  const poll = setInterval(() => {
    const el = document.querySelector('.app-scroll') as HTMLElement | null;
    if (el) {
      if (_cleanupPreventOverscroll) _cleanupPreventOverscroll();
      _cleanupPreventOverscroll = preventOverscroll(el);
      clearInterval(poll);
    }
  }, 120);
  // stop polling after 5s
  setTimeout(() => clearInterval(poll), 5000);
}

// If Vite HMR disposes, call cleanup
if ((import.meta as any).hot) {
  ;(import.meta as any).hot.dispose(() => {
    if (typeof _cleanupPreventOverscroll === 'function') _cleanupPreventOverscroll()
  })
}
