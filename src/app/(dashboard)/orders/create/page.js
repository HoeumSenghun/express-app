'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input, Select, Textarea } from '@/components/ui/Input'
import { MOCK_DISTRICTS, MOCK_PROVINCES, MOCK_STORES } from '@/lib/mock-data'

function SectionTitle({ children }) {
  return <h2 className="mb-3 text-base font-semibold text-brand">{children}</h2>
}

export default function CreateOrderPage() {
  const [pickup, setPickup] = useState('store')
  const [parcelType, setParcelType] = useState('package')
  const [payer, setPayer] = useState('sender')
  const [notes, setNotes] = useState('')
  const [weight, setWeight] = useState(0)
  const [value, setValue] = useState(0)

  return (
    <div className="pb-28 sm:pb-24">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <SectionTitle>Sender</SectionTitle>
            <div className="mb-4 flex flex-wrap gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="pickup"
                  checked={pickup === 'store'}
                  onChange={() => setPickup('store')}
                  className="text-brand"
                />
                Store drop-off
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="pickup"
                  checked={pickup === 'home'}
                  onChange={() => setPickup('home')}
                  className="text-brand"
                />
                Home pickup
              </label>
            </div>
            <Select label="Store address" options={MOCK_STORES} />
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <SectionTitle>Receiver</SectionTitle>
            <label className="mb-3 flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded text-brand" />
              Home delivery
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Phone number" required placeholder="012345678" />
              <Input label="Full name" required placeholder="Receiver name" />
            </div>
            <button type="button" className="mt-2 text-sm text-brand hover:underline">
              + Add alternative phone numbers
            </button>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Select label="Province" required options={MOCK_PROVINCES} />
              <Select label="District" required options={MOCK_DISTRICTS} />
            </div>
            <Input label="Address" required className="mt-4" placeholder="Street address" />
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <SectionTitle>Service</SectionTitle>
            <p className="text-sm text-gray-500">Standard Express — 2–3 business days (mock)</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <SectionTitle>Parcel Information</SectionTitle>
            <div className="mb-4 flex gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={parcelType === 'package'}
                  onChange={() => setParcelType('package')}
                  className="text-brand"
                />
                Package
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={parcelType === 'document'}
                  onChange={() => setParcelType('document')}
                  className="text-brand"
                />
                Document
              </label>
            </div>
            <p className="mb-2 text-sm font-medium text-gray-700">Goods 1</p>
            <div className="flex gap-2">
              <Input
                label="Parcel name"
                required
                className="flex-1"
                placeholder="Item name"
              />
              <button
                type="button"
                className="mt-6 flex h-10 w-10 items-center justify-center rounded-md bg-brand text-white"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Input
                label="Weight (g)"
                required
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value) || 0)}
              />
              <Input
                label="Value (USD)"
                type="number"
                value={value}
                onChange={(e) => setValue(Number(e.target.value) || 0)}
              />
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Total weight: <span className="text-brand">{weight} g</span>
            </p>
            <p className="text-sm text-gray-600">
              Total value: <span className="text-brand">{value.toFixed(2)} USD</span>
            </p>
            <div className="mt-4">
              <span className="mb-1 block text-sm text-gray-600">Size (LxWxH) (cm)</span>
              <div className="flex gap-2">
                <input className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm" placeholder="L" />
                <input className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm" placeholder="W" />
                <input className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm" placeholder="H" />
              </div>
            </div>
            <Input label="Convert (g)" readOnly defaultValue="0" className="mt-3" />
            <Input label="Self-managed order code" className="mt-3" placeholder="Optional" />
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <SectionTitle>COD Information</SectionTitle>
            <label className="mb-3 flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded text-brand" />
              Cash on delivery for goods
            </label>
            <Input label="Cash on delivery" defaultValue="0.00" />
            <p className="mt-3 text-sm text-gray-600">Payment method</p>
            <div className="mt-2 flex gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={payer === 'sender'}
                  onChange={() => setPayer('sender')}
                  className="text-brand"
                />
                Sender
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={payer === 'consignee'}
                  onChange={() => setPayer('consignee')}
                  className="text-brand"
                />
                Consignee
              </label>
            </div>
            <Textarea
              label="Notes"
              className="mt-4"
              maxLength={150}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
            <button type="button" className="text-xs text-brand hover:underline">
              Sample notes →
            </button>
            <label className="mt-4 flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded text-brand" />
              Request invoice
            </label>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-20 flex flex-col gap-3 border-t border-gray-200 bg-white px-4 py-3 shadow-md sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:left-56">
        <div className="flex gap-6 text-sm text-gray-600">
          <span>
            Total fee: <strong className="text-gray-900">5.80 USD</strong>
          </span>
          <span>
            Cash on delivery: <strong className="text-gray-900">0.00 USD</strong>
          </span>
          <span>
            Time estimated: <strong className="text-gray-900">2–3 days</strong>
          </span>
        </div>
        <div className="flex gap-2">
          <Button>Create order</Button>
          <Button variant="ghost">Refresh</Button>
          <Button variant="outline">Save draft</Button>
        </div>
      </div>
    </div>
  )
}
