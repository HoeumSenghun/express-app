'use client'

import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Input'
import { PageCard } from '@/components/ui/PageCard'
import { Badge } from '@/components/ui/Badge'
import {
  IMPORT_COLUMNS,
  MOCK_IMPORT_ROWS,
  MOCK_PROMO_TEXT,
  MOCK_STORES,
} from '@/lib/mock-data'

export default function ImportOrdersPage() {
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-gray-900">Import orders from file</h1>
        <div className="flex flex-wrap gap-2">
          <Button>Create order</Button>
          <Button variant="blue">Open file</Button>
          <Button variant="orange">Clear data</Button>
          <Button variant="green">Download template file</Button>
          <Button variant="yellow">Download file history</Button>
        </div>
      </div>

      <PageCard>
        <div className="mb-4 flex flex-wrap gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input type="radio" name="drop" defaultChecked className="text-brand" />
            Store drop off
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="drop" className="text-brand" />
            Home pickup
          </label>
        </div>
        <Select label="Store / location" options={MOCK_STORES} className="mb-4 max-w-xl" />
        <div className="mb-4 flex flex-wrap gap-4 text-sm">
          <span className="text-green-600">Valid orders: 2/5</span>
          <span className="text-red-600">Error orders: 1/5</span>
        </div>
        <p className="mb-2 text-xs text-brand">
          Notice: Home pickup/delivery may require extra service codes.
        </p>
        <p className="mb-4 text-right text-sm text-orange-500">
          {MOCK_PROMO_TEXT}
        </p>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1400px] text-xs">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-center text-gray-600">
                <th className="px-2 py-2">#</th>
                {IMPORT_COLUMNS.map((col) => (
                  <th key={col} className="whitespace-nowrap px-2 py-2">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_IMPORT_ROWS.map((row) => (
                <tr key={row.index} className="border-b border-gray-50 text-center">
                  <td className="px-2 py-2">{row.index}</td>
                  <td className="px-2 py-2">
                    {row.status ? <Badge>{row.status}</Badge> : '—'}
                  </td>
                  <td className="px-2 py-2 text-red-600">{row.errors || '—'}</td>
                  <td className="px-2 py-2">{row.orderCode || '—'}</td>
                  <td className="px-2 py-2">{row.recipient || '—'}</td>
                  <td className="px-2 py-2">{row.phone || '—'}</td>
                  {IMPORT_COLUMNS.slice(5).map((col) => (
                    <td key={col} className="px-2 py-2">
                      —
                    </td>
                  ))}
                </tr>
              ))}
              {Array.from({ length: 5 }, (_, i) => (
                <tr key={`empty-${i}`} className="border-b border-gray-50 text-center text-gray-300">
                  <td className="px-2 py-2">{MOCK_IMPORT_ROWS.length + i + 1}</td>
                  {IMPORT_COLUMNS.map((col) => (
                    <td key={col} className="px-2 py-2">
                      —
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageCard>
    </div>
  )
}
