export function Input({ label, required, className = '', ...props }) {
  return (
    <label className={`block ${className}`}>
      {label && (
        <span className="mb-1 block text-sm text-gray-600">
          {label}
          {required && <span className="text-brand"> *</span>}
        </span>
      )}
      <input
        className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
        {...props}
      />
    </label>
  )
}

export function Select({ label, required, options = [], className = '', ...props }) {
  return (
    <label className={`block ${className}`}>
      {label && (
        <span className="mb-1 block text-sm text-gray-600">
          {label}
          {required && <span className="text-brand"> *</span>}
        </span>
      )}
      <select
        className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.id || opt.value || opt.label} value={opt.id || opt.value || opt.label}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export function Textarea({ label, className = '', maxLength, value, ...props }) {
  const len = (value || '').length
  return (
    <label className={`block ${className}`}>
      {label && <span className="mb-1 block text-sm text-gray-600">{label}</span>}
      <textarea
        className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
        value={value}
        {...props}
      />
      {maxLength && (
        <span className="mt-1 block text-right text-xs text-gray-400">
          {len} / {maxLength}
        </span>
      )}
    </label>
  )
}
