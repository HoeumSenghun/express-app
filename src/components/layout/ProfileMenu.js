'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { LogOut, Settings, User } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useLanguage } from '@/context/LanguageContext'

export function ProfileMenu() {
  const { user, logout } = useAuth()
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const name = user?.name || 'User'

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg px-1 py-1 text-sm text-gray-700 hover:bg-gray-50"
      >
        <span className="hidden sm:inline">
          {t('topbar.hello')}, <strong>{name}</strong>
        </span>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-200">
          <User className="h-5 w-5 text-gray-500" />
        </div>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 min-w-[200px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
          <div className="border-b border-gray-100 px-4 py-2 sm:hidden">
            <p className="text-xs text-gray-500">{t('topbar.hello')}</p>
            <p className="font-medium text-gray-800">{name}</p>
          </div>
          <Link
            href="/account"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
          >
            <Settings className="h-4 w-4 text-brand" />
            {t('topbar.accountSettings')}
          </Link>
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              logout()
            }}
            className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
          >
            <LogOut className="h-4 w-4" />
            {t('topbar.logout')}
          </button>
        </div>
      )}
    </div>
  )
}
