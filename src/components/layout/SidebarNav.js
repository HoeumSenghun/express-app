'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ChevronDown,
  FolderOpen,
  Home,
  MessageSquare,
  Plus,
  Search,
  Settings,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { NAV_ITEMS, findActiveParent, isActivePath } from '@/lib/navigation'

const ICONS = {
  home: Home,
  plus: Plus,
  folder: FolderOpen,
  search: Search,
  settings: Settings,
  message: MessageSquare,
}

export function SidebarNav({ onNavigate }) {
  const pathname = usePathname()
  const { t } = useLanguage()
  const activeParent = findActiveParent(pathname)
  const [openGroups, setOpenGroups] = useState(() =>
    NAV_ITEMS.filter((i) => i.children).map((i) => i.labelKey)
  )

  const toggle = (labelKey) => {
    setOpenGroups((prev) =>
      prev.includes(labelKey) ? prev.filter((l) => l !== labelKey) : [...prev, labelKey]
    )
  }

  const linkClass = (active) =>
    `mx-2 mb-0.5 flex items-center gap-2 rounded-md px-3 py-2.5 text-sm ${
      active ? 'bg-red-50 font-medium text-brand' : 'text-gray-600 hover:bg-gray-50'
    }`

  return (
    <nav className="flex-1 overflow-y-auto py-2">
      {NAV_ITEMS.map((item) => {
        const Icon = ICONS[item.icon]
        const hasChildren = !!item.children
        const isOpen = openGroups.includes(item.labelKey)
        const parentActive = activeParent === item.labelKey
        const label = t(item.labelKey)

        if (!hasChildren) {
          const active = isActivePath(pathname, item.href)
          return (
            <Link
              key={item.labelKey}
              href={item.href}
              onClick={onNavigate}
              className={linkClass(active)}
            >
              {Icon && <Icon className="h-4 w-4 shrink-0" />}
              {label}
            </Link>
          )
        }

        return (
          <div key={item.labelKey} className="mb-1">
            <button
              type="button"
              onClick={() => toggle(item.labelKey)}
              className={`mx-2 flex w-[calc(100%-1rem)] items-center gap-2 rounded-md px-3 py-2.5 text-sm ${
                parentActive ? 'text-brand' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {Icon && <Icon className="h-4 w-4 shrink-0" />}
              <span className="flex-1 text-left">{label}</span>
              <ChevronDown className={`h-4 w-4 transition ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
              <div className="ml-4 border-l border-gray-100 pl-2">
                {item.children.map((child) => {
                  const active = isActivePath(pathname, child.href)
                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={onNavigate}
                      className={`mb-0.5 block rounded-md px-3 py-2 text-sm ${
                        active
                          ? 'bg-red-50 font-medium text-brand'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {t(child.labelKey)}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}

export function SidebarBrand({ onClose }) {
  const { t } = useLanguage()
  return (
    <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
      <Link href="/" className="text-lg font-bold leading-tight" onClick={onClose}>
        <span className="text-brand">{t('brand.primary')}</span>
        <span className="ml-1 text-gray-800">{t('brand.secondary')}</span>
      </Link>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1 text-gray-500 hover:bg-gray-100 lg:hidden"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
