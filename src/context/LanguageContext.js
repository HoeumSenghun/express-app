'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { LOCALES, translations, t as translate } from '@/lib/i18n/translations'

const STORAGE_KEY = 'express_app_locale'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState('en')

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && translations[saved]) setLocaleState(saved)
  }, [])

  const setLocale = useCallback((code) => {
    if (!translations[code]) return
    setLocaleState(code)
    localStorage.setItem(STORAGE_KEY, code)
    document.documentElement.lang = code === 'km' ? 'km' : 'en'
  }, [])

  const dict = translations[locale] || translations.en

  const value = useMemo(
    () => ({
      locale,
      locales: LOCALES,
      setLocale,
      t: (key, vars) => translate(dict, key, vars),
    }),
    [locale, dict, setLocale]
  )

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
