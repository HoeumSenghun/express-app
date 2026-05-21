'use client'

import { useMemo, useState } from 'react'
import { Eye, Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { PageCard } from '@/components/ui/PageCard'
import { Pagination } from '@/components/ui/Pagination'
import { useLanguage } from '@/context/LanguageContext'
import { usePagination } from '@/hooks/usePagination'
import { MOCK_COMPLAINTS, MOCK_DATE_RANGE } from '@/lib/mock-data'

export default function ComplaintsPage() {
  const { t } = useLanguage()
  const [query, setQuery] = useState('')
  const [applied, setApplied] = useState('')

  const filtered = useMemo(() => {
    const q = applied.trim().toLowerCase()
    if (!q) return MOCK_COMPLAINTS
    return MOCK_COMPLAINTS.filter(
      (c) =>
        c.code.toLowerCase().includes(q) ||
        c.tracking.includes(q) ||
        c.type.toLowerCase().includes(q) ||
        c.content.toLowerCase().includes(q)
    )
  }, [applied])

  const { items, page, setPage, pageSize, setPageSize, total, totalPages, from, to, resetPage } =
    usePagination(filtered, 10)

  function handleSearch() {
    setApplied(query)
    resetPage()
  }

  return (
    <div>
      <PageCard title={t('complaints.title')}>
        <div className="mb-6 flex flex-wrap items-end gap-4">
          <Input
            label={t('common.search')}
            placeholder={t('complaints.searchPlaceholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="min-w-0 flex-1 sm:min-w-[280px]"
          />
          <Input label={t('common.time')} defaultValue={MOCK_DATE_RANGE} className="w-full sm:w-auto sm:min-w-[200px]" />
          <Button onClick={handleSearch}>{t('common.search')}</Button>
          <Button variant="outline" className="inline-flex w-full items-center justify-center gap-1 sm:w-auto">
            <Plus className="h-4 w-4" />
            {t('complaints.create')}
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left text-brand">
                <th className="px-3 py-3">No.</th>
                <th className="px-3 py-3">{t('common.action')}</th>
                <th className="px-3 py-3">{t('common.status')}</th>
                <th className="px-3 py-3">{t('complaints.code')}</th>
                <th className="px-3 py-3">{t('complaints.tracking')}</th>
                <th className="px-3 py-3">{t('complaints.type')}</th>
                <th className="px-3 py-3">{t('complaints.content')}</th>
                <th className="px-3 py-3">{t('complaints.createdAt')}</th>
                <th className="px-3 py-3">{t('complaints.updatedAt')}</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-gray-400">
                    {t('common.noData')}
                  </td>
                </tr>
              ) : (
                items.map((row, idx) => (
                  <tr key={row.code} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-3 py-3 text-center">{from + idx}</td>
                    <td className="px-3 py-3 text-center">
                      <button type="button" className="text-gray-500 hover:text-brand">
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                    <td className="px-3 py-3">
                      <Badge>{row.status}</Badge>
                    </td>
                    <td className="px-3 py-3">{row.code}</td>
                    <td className="px-3 py-3">{row.tracking}</td>
                    <td className="max-w-[180px] truncate px-3 py-3">{row.type}</td>
                    <td className="max-w-[160px] truncate px-3 py-3">{row.content}</td>
                    <td className="whitespace-nowrap px-3 py-3">{row.createdAt}</td>
                    <td className="whitespace-nowrap px-3 py-3">{row.updatedAt}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          page={page}
          totalPages={totalPages}
          pageSize={pageSize}
          total={total}
          from={from}
          to={to}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </PageCard>
    </div>
  )
}
