'use client'

import { AuthProvider } from './AuthContext'
import { LanguageProvider } from './LanguageContext'

export function AppProviders({ children }) {
  return (
    <LanguageProvider>
      <AuthProvider>{children}</AuthProvider>
    </LanguageProvider>
  )
}
