'use client'

import { Menu } from 'lucide-react'
import { GlobalSearch } from './GlobalSearch'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ProfileMenu } from './ProfileMenu'
import { useLanguage } from '@/context/LanguageContext'

export function TopBar({ onMenuClick }) {
  const { t } = useLanguage()

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-gray-200 bg-white px-3 shadow-sm sm:px-4 lg:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:max-w-md lg:max-w-lg">
        <button
          type="button"
          onClick={onMenuClick}
          className="shrink-0 rounded-md p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
          aria-label={t('topbar.menu')}
        >
          <Menu className="h-5 w-5" />
        </button>
        <GlobalSearch className="min-w-0 w-full" />
      </div>

      <div className="flex shrink-0 items-center justify-between gap-6 sm:gap-10 md:gap-14">
        <LanguageSwitcher />
        <ProfileMenu />
      </div>
    </header>
  )
}
