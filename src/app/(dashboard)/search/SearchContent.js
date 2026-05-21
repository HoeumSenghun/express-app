'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { PageCard } from '@/components/ui/PageCard'
import { useLanguage } from '@/context/LanguageContext'
import { searchAll } from '@/lib/search-utils'

export function SearchContent() {
  const searchParams = useSearchParams()
  const q = searchParams.get('q') || ''
  const { t } = useLanguage()

  const { orders, complaints } = useMemo(() => searchAll(q), [q])

  if (!q.trim()) {
    return (
      <PageCard title={t('search.title')}>
        <p className="text-gray-500">{t('search.noQuery')}</p>
      </PageCard>
    )
  }

  const empty = orders.length === 0 && complaints.length === 0

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-gray-900">{t('search.title')}</h1>
      <p className="text-sm text-gray-500">
        &quot;{q}&quot; — {orders.length + complaints.length} result(s)
      </p>

      {empty ? (
        <PageCard>
          <p className="text-gray-500">{t('search.noResults')}</p>
        </PageCard>
      ) : (
        <>
          {orders.length > 0 && (
            <PageCard title={t('search.orders')}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-brand">
                      <th className="py-2 pr-4">{t('orders.billCode')}</th>
                      <th className="py-2 pr-4">{t('orders.orderCode')}</th>
                      <th className="py-2 pr-4">{t('orders.receiver')}</th>
                      <th className="py-2">{t('common.status')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id} className="border-b border-gray-50">
                        <td className="py-2 pr-4">{o.billCode}</td>
                        <td className="py-2 pr-4">{o.orderCode}</td>
                        <td className="py-2 pr-4">{o.receiver}</td>
                        <td className="py-2">{o.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Link
                href="/management/orders"
                className="mt-4 inline-block text-sm text-brand hover:underline"
              >
                {t('search.goToOrders')} →
              </Link>
            </PageCard>
          )}
          {complaints.length > 0 && (
            <PageCard title={t('search.complaints')}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-brand">
                      <th className="py-2 pr-4">{t('complaints.code')}</th>
                      <th className="py-2 pr-4">{t('complaints.tracking')}</th>
                      <th className="py-2">{t('common.status')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complaints.map((c) => (
                      <tr key={c.no} className="border-b border-gray-50">
                        <td className="py-2 pr-4">{c.code}</td>
                        <td className="py-2 pr-4">{c.tracking}</td>
                        <td className="py-2">{c.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Link href="/complaints" className="mt-4 inline-block text-sm text-brand hover:underline">
                {t('complaints.title')} →
              </Link>
            </PageCard>
          )}
        </>
      )}
    </div>
  )
}
