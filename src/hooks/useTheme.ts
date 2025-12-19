import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'theme-preference'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Always start with 'system' mode
    return 'system'
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const root = window.document.documentElement
    
    const applyTheme = (themeToApply: Theme) => {
      if (themeToApply === 'dark') {
        root.classList.add('dark')
      } else if (themeToApply === 'light') {
        root.classList.remove('dark')
      } else {
        // system
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        if (systemDark) {
          root.classList.add('dark')
        } else {
          root.classList.remove('dark')
        }
      }
    }

    applyTheme(theme)
    localStorage.setItem(STORAGE_KEY, theme)

    // Listen for system preference changes when theme is 'system'
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleSystemChange = () => {
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        if (systemDark) {
          root.classList.add('dark')
        } else {
          root.classList.remove('dark')
        }
      }
      mediaQuery.addEventListener('change', handleSystemChange)
      return () => mediaQuery.removeEventListener('change', handleSystemChange)
    }
  }, [theme])

  return {
    theme,
    setTheme,
  }
}
