'use client'

import { Globe } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export function LanguageSwitcher() {
  const { locale, locales, setLocale } = useLanguage()

  return (
    <div className="relative flex items-center gap-1 rounded-md border border-gray-200 bg-white">
      <Globe className="pointer-events-none absolute left-2 h-4 w-4 text-gray-400" />
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value)}
        className="cursor-pointer appearance-none bg-transparent py-1.5 pl-8 pr-6 text-sm text-gray-600 outline-none"
        aria-label="Language"
      >
        {Object.entries(locales).map(([code, { label }]) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-2 text-gray-400">▾</span>
    </div>
  )
}
