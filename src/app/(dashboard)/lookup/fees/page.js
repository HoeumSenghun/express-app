'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input, Select } from '@/components/ui/Input'
import { PageCard } from '@/components/ui/PageCard'
import { MOCK_DISTRICTS, MOCK_PROVINCES } from '@/lib/mock-data'

function LocationColumn({ title }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-gray-700">{title}</h3>
      <div className="space-y-3">
        <Select label="Province" required options={MOCK_PROVINCES} />
        <Select label="District" required options={MOCK_DISTRICTS} />
        <Select
          label="Commune"
          required
          options={[
            { id: 'c1', label: 'Commune 1' },
            { id: 'c2', label: 'Commune 2' },
          ]}
        />
      </div>
    </div>
  )
}

export default function FeeLookupPage() {
  const [parcelType, setParcelType] = useState('package')
  const [feeResult, setFeeResult] = useState(null)

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-gray-900">Fee Lookup</h1>

      <PageCard title="Shipping Route" className="mb-4">
        <label className="mb-4 flex items-center gap-2 text-sm">
          <input type="radio" name="route" defaultChecked className="text-brand" />
          Domestic
        </label>
        <div className="grid gap-8 md:grid-cols-2">
          <LocationColumn title="Sent from" />
          <LocationColumn title="Come from" />
        </div>
      </PageCard>

      <PageCard title="Goods Information">
        <div className="mb-4 flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="type"
              checked={parcelType === 'package'}
              onChange={() => setParcelType('package')}
              className="text-brand"
            />
            Package
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="type"
              checked={parcelType === 'document'}
              onChange={() => setParcelType('document')}
              className="text-brand"
            />
            Document
          </label>
        </div>
        <label className="mb-4 flex items-center gap-2 text-sm text-gray-600">
          <input type="checkbox" className="rounded text-brand" />
          Order with COD
          <input
            type="text"
            placeholder="Cash on delivery"
            className="ml-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm"
          />
        </label>
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Weight (g)" required placeholder="0" />
          <div>
            <span className="mb-1 block text-sm text-gray-600">Size (LxWxH) (cm)</span>
            <div className="flex gap-2">
              <input className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm" placeholder="L" />
              <input className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm" placeholder="W" />
              <input className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm" placeholder="H" />
            </div>
          </div>
        </div>
        {feeResult && (
          <div className="mt-6 rounded-lg bg-red-50 p-4 text-brand">
            Estimated fee: <strong>{feeResult} USD</strong> (mock)
          </div>
        )}
        <div className="mt-6 flex justify-end">
          <Button onClick={() => setFeeResult('5.80')}>Check fees</Button>
        </div>
      </PageCard>
    </div>
  )
}
