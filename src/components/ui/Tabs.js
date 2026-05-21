'use client'

export function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onChange?.(tab.key)}
          className={`px-5 py-2.5 text-sm font-medium transition ${
            active === tab.key
              ? 'border-b-2 border-brand bg-amber-50 text-brand'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
