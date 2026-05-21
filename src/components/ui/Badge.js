const statusStyles = {
  Completed: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
  Paid: 'bg-green-100 text-green-700',
  Pending: 'bg-yellow-100 text-yellow-800',
  Valid: 'bg-green-100 text-green-700',
}

export function Badge({ children, variant }) {
  const style = statusStyles[variant] || statusStyles[children] || 'bg-gray-100 text-gray-700'
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${style}`}>
      {children}
    </span>
  )
}
