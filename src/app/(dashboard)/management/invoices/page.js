'use client'

import { useMemo, useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input, Select } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Tabs } from '@/components/ui/Tabs'
import { Pagination } from '@/components/ui/Pagination'
import { useLanguage } from '@/context/LanguageContext'
import { usePagination } from '@/hooks/usePagination'
import { MOCK_DATE_RANGE, MOCK_INVOICES, MOCK_LAST_UPDATED } from '@/lib/mock-data'

export default function InvoicesPage() {
  const { t } = useLanguage()
  const [tab, setTab] = useState('statement')
  const [query, setQuery] = useState('')
  const [applied, setApplied] = useState('')

  const filtered = useMemo(() => {
    const q = applied.trim().toLowerCase()
    if (!q) return MOCK_INVOICES
    return MOCK_INVOICES.filter((inv) => inv.statementId.toLowerCase().includes(q))
  }, [applied])

  const { items, page, setPage, pageSize, setPageSize, total, totalPages, from, to, resetPage } =
    usePagination(filtered, 10)

  function handleSearch() {
    setApplied(query)
    resetPage()
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{t('nav.invoices')}</h1>
          <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
            Last updated: {MOCK_LAST_UPDATED}
            <RefreshCw className="h-3.5 w-3.5 text-brand" />
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
        <Tabs
          tabs={[
            { key: 'statement', label: 'Statement Table' },
            { key: 'invoice', label: 'Invoice List' },
          ]}
          active={tab}
          onChange={setTab}
        />
        <div className="p-4 sm:p-5">
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
            <Input
              label={t('common.search')}
              placeholder="Search by statement ID or service code"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="min-w-0 flex-1"
            />
            <Input label={t('common.time')} defaultValue={MOCK_DATE_RANGE} className="w-full sm:w-auto" />
            <Select
              label={t('common.status')}
              options={[
                { id: 'all', label: t('common.all') },
                { id: 'paid', label: 'Paid' },
                { id: 'pending', label: 'Pending' },
              ]}
            />
            <Button onClick={handleSearch}>{t('common.search')}</Button>
          </div>

          {tab === 'invoice' ? (
            <p className="py-12 text-center text-gray-500">Invoice List — mock data coming soon.</p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px] text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-sky-50/80 text-left text-brand">
                      <th className="px-2 py-3">No.</th>
                      <th className="px-2 py-3">{t('common.action')}</th>
                      <th className="px-2 py-3">Statement ID</th>
                      <th className="px-2 py-3">{t('common.status')}</th>
                      <th className="px-2 py-3">Created Date</th>
                      <th className="px-2 py-3">Invoice Date</th>
                      <th className="px-2 py-3">Order Quantity</th>
                      <th className="px-2 py-3">Before tax (USD)</th>
                      <th className="px-2 py-3">VAT (USD)</th>
                      <th className="px-2 py-3">After tax (USD)</th>
                      <th className="px-2 py-3">Discount (USD)</th>
                      <th className="px-2 py-3">Net Payment (USD)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((inv, idx) => (
                      <tr key={inv.statementId} className="border-b border-gray-50 hover:bg-gray-50/50">
                        <td className="px-2 py-3">{from + idx}</td>
                        <td className="px-2 py-3 text-brand">View</td>
                        <td className="px-2 py-3">{inv.statementId}</td>
                        <td className="px-2 py-3">
                          <Badge>{inv.status}</Badge>
                        </td>
                        <td className="px-2 py-3">{inv.created}</td>
                        <td className="px-2 py-3">{inv.invoiceDate}</td>
                        <td className="px-2 py-3">{inv.qty}</td>
                        <td className="px-2 py-3">{inv.beforeTax.toFixed(2)}</td>
                        <td className="px-2 py-3">{inv.vat.toFixed(2)}</td>
                        <td className="px-2 py-3">{inv.afterTax.toFixed(2)}</td>
                        <td className="px-2 py-3">{inv.discount.toFixed(2)}</td>
                        <td className="px-2 py-3 font-medium">{inv.net.toFixed(2)}</td>
                      </tr>
                    ))}
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
            </>
          )}
        </div>
      </div>
    </div>
  )
}
