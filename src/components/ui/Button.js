const variants = {
  primary: 'bg-brand text-white hover:bg-red-700',
  secondary: 'bg-sky-500 text-white hover:bg-sky-600',
  outline: 'border border-brand text-brand bg-white hover:bg-red-50',
  ghost: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
  blue: 'bg-blue-500 text-white hover:bg-blue-600',
  orange: 'bg-orange-400 text-white hover:bg-orange-500',
  green: 'bg-green-600 text-white hover:bg-green-700',
  yellow: 'bg-yellow-400 text-gray-900 hover:bg-yellow-500',
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`rounded-md px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
