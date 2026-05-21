'use client'

import { useMemo, useState } from 'react'
import { Package } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input, Select } from '@/components/ui/Input'
import { PageCard } from '@/components/ui/PageCard'
import { Pagination } from '@/components/ui/Pagination'
import { useLanguage } from '@/context/LanguageContext'
import { usePagination } from '@/hooks/usePagination'
import {
  MOCK_DATE_RANGE,
  MOCK_LAST_UPDATED,
  MOCK_ORDERS,
  MOCK_WAREHOUSES,
  ORDER_STATUS_FILTERS,
  ORDER_STATUS_SUMMARY,
} from '@/lib/mock-data'

export default function OrderManagementPage() {
  const { t } = useLanguage()
  const [summaryKey, setSummaryKey] = useState('total')
  const [filterKey, setFilterKey] = useState('all')
  const [query, setQuery] = useState('')
  const [applied, setApplied] = useState('')

  const filtered = useMemo(() => {
    let list = [...MOCK_ORDERS]
    const q = applied.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (o) =>
          o.billCode.toLowerCase().includes(q) ||
          o.orderCode.toLowerCase().includes(q) ||
          o.receiver.toLowerCase().includes(q) ||
          o.sender.toLowerCase().includes(q)
      )
    }
    if (filterKey !== 'all') {
      const statusMap = {
        receiving: 'Receiving',
        received: 'Received',
        transiting: 'Transiting',
        shipping: 'Shipping',
        shipped: 'Shipped',
        return: 'Return',
      }
      const match = statusMap[filterKey]
      if (match) list = list.filter((o) => o.status.toLowerCase().includes(match.toLowerCase()))
    }
    return list
  }, [applied, filterKey])

  const { items, page, setPage, pageSize, setPageSize, total, totalPages, from, to, resetPage } =
    usePagination(filtered, 10)

  function handleSearch() {
    setApplied(query)
    resetPage()
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900">{t('orders.title')}</h1>
      <p className="mt-1 text-sm text-gray-500">{t('orders.lastUpdate', { time: MOCK_LAST_UPDATED })}</p>

      <PageCard className="mt-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Input
            label={t('common.search')}
            placeholder={t('orders.searchPlaceholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Input label={t('orders.date')} defaultValue={MOCK_DATE_RANGE} />
          <Select label={t('orders.warehouse')} options={MOCK_WAREHOUSES} />
          <Select
            label={t('orders.paymentMethod')}
            options={[
              { id: 'all', label: t('common.all') },
              { id: 'cod', label: 'COD' },
              { id: 'prepaid', label: 'Prepaid' },
            ]}
          />
        </div>
        <Button className="mt-4" onClick={handleSearch}>
          {t('common.search')}
        </Button>
      </PageCard>

      <PageCard
        title={t('orders.orderList')}
        className="mt-4"
        actions={
          <div className="flex w-full flex-wrap gap-2 lg:w-auto">
            <Button className="flex-1 sm:flex-none">{t('orders.print')}</Button>
            <Button variant="blue" className="flex-1 sm:flex-none">
              {t('orders.export')}
            </Button>
            <Button variant="outline" className="flex-1 sm:flex-none">
              {t('orders.import')}
            </Button>
            <Button variant="ghost" disabled className="flex-1 sm:flex-none">
              {t('orders.cancel')}
            </Button>
          </div>
        }
      >
        <div className="-mx-2 flex gap-1 overflow-x-auto border-b border-gray-100 pb-4">
          {ORDER_STATUS_SUMMARY.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setSummaryKey(tab.key)}
              className={`shrink-0 rounded-t px-3 py-2 text-xs sm:px-4 sm:text-sm ${
                summaryKey === tab.key
                  ? 'border-b-2 border-brand bg-amber-50 font-medium text-gray-800'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm sm:gap-3">
          {ORDER_STATUS_FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => {
                setFilterKey(f.key)
                resetPage()
              }}
              className={`inline-flex items-center gap-1.5 ${
                filterKey === f.key ? 'font-semibold text-gray-900' : 'text-gray-500'
              }`}
            >
              <span className={`h-2.5 w-2.5 rounded-sm ${f.color}`} />
              {f.label} ({f.count})
            </button>
          ))}
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-sky-50/80 text-left text-brand">
                <th className="px-2 py-3">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="px-2 py-3">{t('common.action')}</th>
                <th className="px-2 py-3">{t('orders.billCode')}</th>
                <th className="px-2 py-3">{t('orders.orderCode')}</th>
                <th className="px-2 py-3">{t('orders.sender')}</th>
                <th className="px-2 py-3">{t('orders.receiver')}</th>
                <th className="px-2 py-3">{t('orders.goods')}</th>
                <th className="px-2 py-3">{t('common.status')}</th>
                <th className="px-2 py-3">{t('orders.creationDate')}</th>
                <th className="px-2 py-3">{t('orders.collection')}</th>
                <th className="px-2 py-3">{t('orders.totalFee')}</th>
                <th className="px-2 py-3">{t('orders.printed')}</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={12} className="py-16 text-center text-gray-400">
                    <Package className="mx-auto mb-2 h-12 w-12 opacity-40" />
                    {t('common.noData')}
                  </td>
                </tr>
              ) : (
                items.map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-2 py-3">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="px-2 py-3 text-brand">⋯</td>
                    <td className="px-2 py-3">{order.billCode}</td>
                    <td className="px-2 py-3">{order.orderCode}</td>
                    <td className="px-2 py-3">{order.sender}</td>
                    <td className="px-2 py-3">{order.receiver}</td>
                    <td className="px-2 py-3">{order.goods}</td>
                    <td className="px-2 py-3">
                      <span className="inline-flex items-center gap-1.5">
                        <span className={`h-2 w-2 rounded-sm ${order.statusColor}`} />
                        {order.status}
                      </span>
                    </td>
                    <td className="px-2 py-3">{order.createdAt}</td>
                    <td className="px-2 py-3">{order.collection}</td>
                    <td className="px-2 py-3">{order.totalFee}</td>
                    <td className="px-2 py-3">
                      {order.printed === 'Printed' ? t('orders.printedYes') : t('orders.printedNo')}
                    </td>
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
