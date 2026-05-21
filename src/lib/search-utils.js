import { MOCK_COMPLAINTS, MOCK_ORDERS } from '@/lib/mock-data'

export function searchAll(query) {
  const q = (query || '').trim().toLowerCase()
  if (!q) return { orders: [], complaints: [] }

  const orders = MOCK_ORDERS.filter(
    (o) =>
      o.billCode.toLowerCase().includes(q) ||
      o.orderCode.toLowerCase().includes(q) ||
      o.receiver.toLowerCase().includes(q) ||
      o.sender.toLowerCase().includes(q) ||
      o.goods.toLowerCase().includes(q)
  )

  const complaints = MOCK_COMPLAINTS.filter(
    (c) =>
      c.code.toLowerCase().includes(q) ||
      c.tracking.includes(q) ||
      c.type.toLowerCase().includes(q) ||
      c.content.toLowerCase().includes(q)
  )

  return { orders, complaints }
}
