import { createContext, useContext, useState, useEffect } from 'react'
import { en } from './translations/en'
import { ar } from './translations/ar'

const LanguageContext = createContext()

const translations = { en, ar }

export function LanguageProvider({ children }) {
  // Get saved language or default to Arabic
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('yavalmoda_language')
    return saved || 'ar'
  })

  // Update document attributes when language changes
  useEffect(() => {
    const dir = language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.setAttribute('dir', dir)
    document.documentElement.setAttribute('lang', language)
  }, [language])

  const changeLanguage = (newLang) => {
    setLanguage(newLang)
    localStorage.setItem('yavalmoda_language', newLang)
  }

  // Translation function with nested key support
  const t = (key) => {
    const keys = key.split('.')
    let value = translations[language]

    for (const k of keys) {
      value = value?.[k]
    }

    return value || key
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
