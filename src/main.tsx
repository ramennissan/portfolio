import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom' // <-- CHANGE THIS
import App from './App'
import { ThemeProvider } from '@/hooks/useTheme'
import './styles/global.css'
import preventOverscroll from '@/lib/preventOverscroll'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>
)


let _cleanupPreventOverscroll: (() => void) | null = null
const _attachPrevent = () => {
  if (_cleanupPreventOverscroll) return;
  const el = document.querySelector('.app-scroll') as HTMLElement | null;
  if (el) {
    _cleanupPreventOverscroll = preventOverscroll(el);
    return;
  }
  _cleanupPreventOverscroll = preventOverscroll(window);
};

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
  setTimeout(() => clearInterval(poll), 5000);
}

if ((import.meta as any).hot) {
  ;(import.meta as any).hot.dispose(() => {
    if (typeof _cleanupPreventOverscroll === 'function') _cleanupPreventOverscroll()
  })
}
