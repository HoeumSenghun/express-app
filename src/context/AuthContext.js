'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AUTH_COOKIE, clearAuthCookie, mockLogin, setAuthCookie } from '@/lib/auth'
import { MOCK_USER } from '@/lib/mock-data'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const hasCookie = document.cookie.includes(`${AUTH_COOKIE}=`)
    if (hasCookie) {
      const saved = localStorage.getItem('express_app_user')
      setUser(saved ? JSON.parse(saved) : { ...MOCK_USER })
    }
    setReady(true)
  }, [])

  const login = useCallback(
    (username, password, redirectTo) => {
      if (!mockLogin(username, password)) return false
      const profile = { ...MOCK_USER, name: MOCK_USER.name }
      setAuthCookie()
      localStorage.setItem('express_app_user', JSON.stringify(profile))
      setUser(profile)
      const dest =
        redirectTo && redirectTo.startsWith('/') && !redirectTo.startsWith('/login')
          ? redirectTo
          : '/'
      router.push(dest)
      router.refresh()
      return true
    },
    [router]
  )

  const logout = useCallback(() => {
    clearAuthCookie()
    localStorage.removeItem('express_app_user')
    setUser(null)
    router.push('/login')
    router.refresh()
  }, [router])

  const value = useMemo(
    () => ({ user, ready, isAuthenticated: !!user, login, logout }),
    [user, ready, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
