'use client'

import { useState } from 'react'
import {
  CircleDollarSign,
  FileText,
  Info,
  Package,
  RotateCcw,
  Truck,
} from 'lucide-react'
import { Tabs } from '@/components/ui/Tabs'
import { SummaryCard } from '@/components/ui/SummaryCard'
import { useLanguage } from '@/context/LanguageContext'
import {
  MOCK_DATE_RANGE,
  MONEY_BY_STATUS,
  OTHER_STATUS,
  SUMMARY_STATS,
} from '@/lib/mock-data'

function StatusTable({ title, rows, showInfo, t }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      {title && (
        <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3">
          <h3 className="font-semibold text-gray-800">{title}</h3>
          {showInfo && <Info className="h-4 w-4 text-brand" />}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-sky-50/80 text-left text-brand">
              <th className="px-4 py-3 font-medium">{t('common.status')}</th>
              <th className="px-4 py-3 font-medium">{t('statistics.numberOfOrders')}</th>
              <th className="px-4 py-3 font-medium">{t('statistics.codAmount')}</th>
              <th className="px-4 py-3 font-medium">{t('statistics.shippingFee')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.status} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="px-4 py-2.5">
                  <span className="inline-flex items-center gap-2">
                    <span className={`inline-block h-3 w-3 rounded-sm ${row.color}`} />
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-gray-700">{row.orders}</td>
                <td className="px-4 py-2.5 text-gray-700">{row.cod.toFixed(2)}</td>
                <td className="px-4 py-2.5 text-gray-700">{row.fee.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function StatisticsView() {
  const [tab, setTab] = useState('statistics')
  const { t } = useLanguage()
  const s = SUMMARY_STATS

  return (
    <div>
      <Tabs
        tabs={[
          { key: 'statistics', label: t('statistics.statistics') },
          { key: 'cashflow', label: t('statistics.cashFlow') },
        ]}
        active={tab}
        onChange={setTab}
      />

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{t('statistics.moneyByStatus')}</h1>
          <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
            {t('statistics.calculatedBy')}
            <Info className="h-3.5 w-3.5 text-brand" />
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <select className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 sm:w-auto">
            <option>COD includes recipient&apos;s shipping fee</option>
          </select>
          <input
            type="text"
            readOnly
            value={MOCK_DATE_RANGE}
            className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 sm:w-auto"
          />
        </div>
      </div>

      {tab === 'cashflow' ? (
        <div className="mt-8 rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500 sm:p-12">
          {t('statistics.cashFlowPlaceholder')}
        </div>
      ) : (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
              icon={FileText}
              iconBg="bg-green-500"
              label={t('statistics.totalOrders')}
              value={String(s.totalOrders)}
            />
            <SummaryCard
              icon={Truck}
              iconBg="bg-blue-500"
              label={t('statistics.successfulDeliveries')}
              value={`${s.successfulDeliveries.count} Order (${s.successfulDeliveries.percent} %)`}
            />
            <SummaryCard
              icon={RotateCcw}
              iconBg="bg-purple-500"
              label={t('statistics.successfulReturns')}
              value={`${s.successfulReturns.count} Order (${s.successfulReturns.percent} %)`}
            />
            <SummaryCard
              icon={CircleDollarSign}
              iconBg="bg-brand"
              label={t('statistics.totalCod')}
              value={`${s.totalCod.toFixed(2)} USD`}
            />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
              icon={Package}
              iconBg="bg-orange-400"
              label={t('statistics.totalShipping')}
              value={`${s.totalShippingFee.toFixed(2)} USD`}
            />
          </div>

          <div className="mt-6 space-y-6">
            <StatusTable rows={MONEY_BY_STATUS} t={t} />
            <StatusTable title={t('statistics.otherStatus')} rows={OTHER_STATUS} showInfo t={t} />
          </div>
        </>
      )}
    </div>
  )
}
