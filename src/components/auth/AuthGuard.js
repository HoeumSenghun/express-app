'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export function AuthGuard({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const { ready, isAuthenticated } = useAuth()

  useEffect(() => {
    if (ready && !isAuthenticated) {
      const login = `/login?from=${encodeURIComponent(pathname)}`
      router.replace(login)
    }
  }, [ready, isAuthenticated, pathname, router])

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-page">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-page">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
      </div>
    )
  }

  return children
}
