import { useState, useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

/**
 * Custom hook for theme management (dark/light mode)
 * @returns {[string, function]} - [theme, toggleTheme]
 */
export function useTheme() {
  const [storedTheme, setStoredTheme] = useLocalStorage('theme', 'light')
  const [theme, setTheme] = useState(storedTheme)

  useEffect(() => {
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    setStoredTheme(theme)
  }, [theme, setStoredTheme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  return [theme, toggleTheme]
}



