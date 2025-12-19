import { useTheme, Theme } from '@/hooks/useTheme'
import {FaMoon, FaDesktop } from 'react-icons/fa'
import { MdSunny } from 'react-icons/md'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const order: Theme[] = ['light', 'dark', 'system']

const icons: Record<Theme, React.ComponentType> = {
  light: MdSunny,
  dark: FaMoon,
  system: FaDesktop,
}

type EffectiveTheme = 'light' | 'dark'

function getEffectiveTheme(theme: Theme): EffectiveTheme {
  if (theme === 'light') return 'light'
  if (theme === 'dark') return 'dark'
  // system
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'light'
}

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const prevEffectiveThemeRef = useRef<EffectiveTheme>(getEffectiveTheme(theme))
  const [systemPref, setSystemPref] = useState(() => 
    typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false
  )
  
  // Calculate current effective theme and whether to animate
  const currentEffectiveTheme = getEffectiveTheme(theme)
  const prevEffectiveTheme = prevEffectiveThemeRef.current
  const shouldAnimate = currentEffectiveTheme !== prevEffectiveTheme
  
  // Update ref after render
  useEffect(() => {
    prevEffectiveThemeRef.current = currentEffectiveTheme
  }, [currentEffectiveTheme])

  // Listen for system preference changes when theme is 'system'
  useEffect(() => {
    if (theme !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemChange = (e: MediaQueryListEvent) => {
      setSystemPref(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleSystemChange)
    return () => mediaQuery.removeEventListener('change', handleSystemChange)
  }, [theme])

  function cycleTheme() {
    const next = order[(order.indexOf(theme) + 1) % order.length]
    setTheme(next)
  }

  const IconComponent = icons[theme]

  return (
    <motion.button
      onClick={cycleTheme}
      className="text-lg text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer"
      aria-label="Toggle theme"
      title={`Theme: ${theme}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 1000,
        damping: 25
      }}
    >
      <motion.div
        key={theme}
        initial={shouldAnimate ? { opacity: 0, rotate: -90, scale: 0.8 } : false}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={shouldAnimate ? {
          type: "spring",
          stiffness: 1200,
          damping: 35
        } : undefined}
      >
        <IconComponent />
      </motion.div>
    </motion.button>
  )
}
