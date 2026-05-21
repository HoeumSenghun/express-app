'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useLanguage } from '@/context/LanguageContext'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'
import { MOCK_CREDENTIALS } from '@/lib/auth'

export function LoginForm() {
  const { login } = useAuth()
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const from = searchParams.get('from')
    const ok = login(username, password, from)
    if (!ok) setError(t('login.error'))
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen flex-col bg-page">
      <div className="flex justify-end p-4">
        <LanguageSwitcher />
      </div>
      <div className="flex flex-1 items-center justify-center px-4 pb-12">
        <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold">
              <span className="text-brand">{t('brand.primary')}</span>{' '}
              <span className="text-gray-800">{t('brand.secondary')}</span>
            </h1>
            <p className="mt-2 text-lg font-semibold text-gray-800">{t('login.title')}</p>
            <p className="mt-1 text-sm text-gray-500">{t('login.subtitle')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-1 block text-sm text-gray-600">{t('login.username')}</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                required
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm text-gray-600">{t('login.password')}</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                required
              />
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" className="rounded text-brand" />
              {t('login.remember')}
            </label>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-brand py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
            >
              {loading ? '…' : t('login.submit')}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-gray-400">{t('login.hint')}</p>
          <p className="mt-2 text-center text-xs text-gray-400">
            Demo: {MOCK_CREDENTIALS.username} / {MOCK_CREDENTIALS.password}
          </p>
        </div>
      </div>
    </div>
  )
}
