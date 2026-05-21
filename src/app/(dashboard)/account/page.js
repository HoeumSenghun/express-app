'use client'

import { useState } from 'react'
import { Lock, MapPin, User } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input, Select } from '@/components/ui/Input'
import { useLanguage } from '@/context/LanguageContext'
import {
  ACCOUNT_SUB_NAV,
  MOCK_ACCOUNT,
  MOCK_BANKS,
  MOCK_COMMUNES,
  MOCK_DISTRICTS,
  MOCK_PROVINCES,
  MOCK_WAREHOUSES,
} from '@/lib/mock-data'

const SUB_ICONS = { user: User, warehouse: MapPin, lock: Lock }

export default function AccountPage() {
  const { t } = useLanguage()
  const [section, setSection] = useState('account')
  const a = MOCK_ACCOUNT

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-gray-900">{t('account.title')}</h1>
      <div className="flex flex-col gap-6 lg:flex-row">
        <nav className="w-full shrink-0 rounded-lg border border-gray-200 bg-white p-2 lg:w-56">
          {ACCOUNT_SUB_NAV.map((item) => {
            const Icon = SUB_ICONS[item.icon]
            const active = section === item.key
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setSection(item.key)}
                className={`mb-1 flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-left text-sm ${
                  active
                    ? 'border-l-4 border-brand bg-amber-50 font-medium text-brand'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                {t(item.labelKey)}
              </button>
            )
          })}
        </nav>

        <div className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          {section === 'password' ? (
            <div className="max-w-md space-y-4">
              <h2 className="text-base font-semibold text-brand">Change password</h2>
              <Input label="Current password" type="password" required />
              <Input label="New password" type="password" required />
              <Input label="Confirm new password" type="password" required />
              <Button>Save</Button>
            </div>
          ) : section === 'warehouse' ? (
            <div className="max-w-lg space-y-4">
              <h2 className="text-base font-semibold text-brand">Warehouse Settings</h2>
              <Select
                label="Default warehouse"
                options={MOCK_WAREHOUSES.filter((w) => w.id !== 'all')}
              />
              <Input label="Warehouse contact phone" defaultValue={a.phone} />
              <Button>Save</Button>
            </div>
          ) : (
            <div className="space-y-8">
              <section>
                <h2 className="mb-4 text-base font-semibold text-brand">Account Information</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <Input label="Full Name" required defaultValue={a.fullName} />
                  <Input label="Date of Birth" defaultValue={a.dob} />
                  <Input label="Phone Number" required defaultValue={a.phone} readOnly />
                  <div>
                    <Input label="Email" required defaultValue={a.email} />
                    <Button variant="outline" className="mt-2">
                      Change
                    </Button>
                  </div>
                  <Input label="ID Card" defaultValue={a.idCard} />
                  <Input label="Detailed Address" required defaultValue={a.address} className="md:col-span-2" />
                  <Select label="Province" required options={MOCK_PROVINCES} />
                  <Select label="District" required options={MOCK_DISTRICTS} />
                  <Select label="Commune" required options={MOCK_COMMUNES} />
                </div>
              </section>

              <section>
                <h2 className="mb-4 text-base font-semibold text-brand">Billing Information</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <Select label="Bank" required options={MOCK_BANKS} />
                  <Input label="Account Number" required defaultValue={a.accountNumber} />
                  <Input label="Account Owner" required defaultValue={a.accountOwner} className="md:col-span-2" />
                </div>
              </section>

              <section>
                <h2 className="mb-4 text-base font-semibold text-brand">Fee Payment Information</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <Input label="Payment Method" required defaultValue={a.paymentMethod} />
                  <Input label="Payment Type" required defaultValue={a.paymentType} />
                </div>
              </section>

              <section>
                <h2 className="mb-4 text-base font-semibold text-brand">Tax Information</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <Input label="Tax ID / Tax Number" placeholder="Tax ID / Tax Number" />
                  <Input label="Classification" placeholder="Classification" />
                </div>
              </section>

              <section>
                <h2 className="mb-4 text-base font-semibold text-brand">COD Payment Information</h2>
                <div className="space-y-2 text-sm">
                  {[
                    { id: 'everyday', label: 'Everyday' },
                    { id: 'mwf', label: 'Every Monday, Wednesday, Friday' },
                    { id: 'tt', label: 'Every Tuesday, Thursday' },
                  ].map((opt) => (
                    <label key={opt.id} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="cod"
                        defaultChecked={a.codSchedule === opt.id}
                        className="text-brand"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="mb-4 text-base font-semibold text-brand">Support</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <Input label="Referrer" placeholder="Referrer" />
                  <Input label="Agent" placeholder="Agent" />
                </div>
              </section>

              <div className="flex justify-end">
                <Button>Save</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
