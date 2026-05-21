

export const MOCK_YEAR = 2026
export const MOCK_DATE_RANGE = '01/01/2026 - 21/05/2026'
export const MOCK_LAST_UPDATED = '21/05/2026 10:56'
export const MOCK_PROMO_TEXT = 'Limited-time shipping discount'

export const MOCK_USER = {
  name: 'Senghun',
  language: 'English',
}

export const MOCK_STORES = [
  { id: '1', label: 'Siem Reap Drop-off Center' },
  { id: '2', label: 'Phnom Penh Pickup Hub' },
]

export const MOCK_PROVINCES = [
  { id: 'p1', label: 'Siem Reap' },
  { id: 'p2', label: 'Phnom Penh' },
  { id: 'p3', label: 'Battambang' },
]

export const MOCK_DISTRICTS = [
  { id: 'd1', label: 'Siem Reap City' },
  { id: 'd2', label: 'Angkor Chum' },
]

export const MOCK_COMMUNES = [
  { id: 'c1', label: 'Svay Dangkum' },
  { id: 'c2', label: 'Chreav' },
]

export const MOCK_WAREHOUSES = [
  { id: 'all', label: 'All warehouses' },
  { id: 'w1', label: 'Siem Reap Warehouse' },
  { id: 'w2', label: 'Phnom Penh Warehouse' },
]

export const ORDER_STATUS_SUMMARY = [
  { key: 'total', label: 'Total orders', count: 24, active: true },
  { key: 'picked', label: 'Successfully picked up', count: 12 },
  { key: 'waiting', label: 'Waiting for pickup', count: 5 },
  { key: 'cancelled', label: 'Pickup cancelled', count: 2 },
  { key: 'draft', label: 'Draft orders', count: 5 },
]

export const ORDER_STATUS_FILTERS = [
  { key: 'all', label: 'All', count: 24, color: 'bg-blue-500' },
  { key: 'receiving', label: 'Receiving', count: 3, color: 'bg-teal-500' },
  { key: 'received', label: 'Received', count: 4, color: 'bg-lime-500' },
  { key: 'transiting', label: 'Transiting', count: 5, color: 'bg-orange-400' },
  { key: 'shipping', label: 'Shipping', count: 6, color: 'bg-orange-600' },
  { key: 'shipped', label: 'Shipped', count: 4, color: 'bg-green-600' },
  { key: 'return', label: 'Return request', count: 2, color: 'bg-purple-500' },
]

export const MONEY_BY_STATUS = [
  { status: 'Received', color: 'bg-yellow-500', orders: 4, cod: 180.5, fee: 12.4 },
  { status: 'Transiting', color: 'bg-orange-400', orders: 5, cod: 220.0, fee: 18.2 },
  { status: 'Forwarding request', color: 'bg-purple-300', orders: 1, cod: 35.0, fee: 2.1 },
  { status: 'Shipping', color: 'bg-orange-600', orders: 6, cod: 410.25, fee: 32.5 },
  { status: 'Shipped', color: 'bg-green-600', orders: 4, cod: 290.0, fee: 24.0 },
  { status: 'Ship again', color: 'bg-red-500', orders: 0, cod: 0, fee: 0 },
  { status: 'Ship failed', color: 'bg-red-800', orders: 1, cod: 25.0, fee: 3.0 },
  { status: 'Partial ship request', color: 'bg-sky-300', orders: 0, cod: 0, fee: 0 },
  { status: 'Partially shipped', color: 'bg-blue-700', orders: 1, cod: 50.0, fee: 4.5 },
  { status: 'Change address', color: 'bg-lime-400', orders: 0, cod: 0, fee: 0 },
  { status: 'Return request', color: 'bg-indigo-500', orders: 2, cod: 80.0, fee: 6.0 },
  { status: 'Return confirmed', color: 'bg-violet-600', orders: 1, cod: 40.0, fee: 2.0 },
  { status: 'Returning', color: 'bg-purple-600', orders: 0, cod: 0, fee: 0 },
  { status: 'Return successful', color: 'bg-emerald-700', orders: 2, cod: 95.0, fee: 8.5 },
]

export const OTHER_STATUS = [
  { status: 'Receiving', color: 'bg-teal-500', orders: 3, cod: 60.0, fee: 4.2 },
  { status: 'New', color: 'bg-gray-400', orders: 2, cod: 0, fee: 0 },
]

export const SUMMARY_STATS = {
  totalOrders: 24,
  successfulDeliveries: { count: 12, percent: 50 },
  successfulReturns: { count: 2, percent: 8 },
  totalCod: 1160.75,
  totalShippingFee: 115.4,
}

const COMPLAINT_SEED = [
  {
    status: 'Completed',
    type: 'Late delivery',
    content: 'Parcel arrived about two days after the estimated date.',
  },
  {
    status: 'Cancelled',
    type: 'Wrong recipient details',
    content: 'Phone number on the label did not match the recipient.',
  },
  {
    status: 'Completed',
    type: 'Damaged parcel',
    content: 'Outer box was crushed; contents need inspection.',
  },
  {
    status: 'Cancelled',
    type: 'COD amount mismatch',
    content: 'Collected amount differed from the order total.',
  },
  {
    status: 'Completed',
    type: 'No delivery call',
    content: 'Driver did not call before attempted delivery.',
  },
]

export const MOCK_COMPLAINTS = Array.from({ length: 18 }, (_, i) => {
  const seed = COMPLAINT_SEED[i % COMPLAINT_SEED.length]
  return {
    no: i + 1,
    status: seed.status,
    code: `EA-CMP-${MOCK_YEAR}-${String(1000 + i)}`,
    tracking: `EA${String(7000000 + i)}`,
    type: seed.type,
    content: seed.content,
    createdAt: `${String(15 + (i % 6)).padStart(2, '0')}/05/${MOCK_YEAR} ${String(10 + (i % 8)).padStart(2, '0')}:42:06`,
    updatedAt: `${String(16 + (i % 5)).padStart(2, '0')}/05/${MOCK_YEAR} ${String(9 + (i % 8)).padStart(2, '0')}:10:00`,
  }
})

const ORDER_SEED = [
  { receiver: 'Sok Pisey', goods: 'Wireless earbuds x1', status: 'Shipping', statusColor: 'bg-orange-600' },
  { receiver: 'Chan Dara', goods: 'Office documents x2', status: 'Shipped', statusColor: 'bg-green-600' },
  { receiver: 'Kim Sreyna', goods: 'Cotton shirts x3', status: 'Received', statusColor: 'bg-lime-500' },
  { receiver: 'Vann Kimhout', goods: 'Notebook set x1', status: 'Transiting', statusColor: 'bg-orange-400' },
  { receiver: 'Sophea Keo', goods: 'Snack bundle x2', status: 'Receiving', statusColor: 'bg-teal-500' },
]

export const MOCK_ORDERS_EXTENDED = Array.from({ length: 18 }, (_, i) => {
  const seed = ORDER_SEED[i % ORDER_SEED.length]
  return {
    id: String(i + 1),
    billCode: `EA-BL-${MOCK_YEAR}-${String(1000 + i)}`,
    orderCode: `EA-ORD-${MOCK_YEAR}-${String(1000 + i)}`,
    sender: i % 2 === 0 ? 'Siem Reap Drop-off Center' : 'Phnom Penh Pickup Hub',
    receiver: seed.receiver,
    goods: seed.goods,
    status: seed.status,
    statusColor: seed.statusColor,
    createdAt: `${String(10 + (i % 11)).padStart(2, '0')}/05/${MOCK_YEAR} ${String(8 + (i % 10)).padStart(2, '0')}:15`,
    collection: (i * 12.5).toFixed(2),
    totalFee: (2 + i * 0.3).toFixed(2),
    printed: i % 3 === 0 ? 'Printed' : 'Not printed',
  }
})

export const MOCK_ORDERS = MOCK_ORDERS_EXTENDED

export const MOCK_INVOICES = Array.from({ length: 12 }, (_, i) => ({
  no: i + 1,
  statementId: `EA-ST-${MOCK_YEAR}-${String(100 + i)}`,
  status: i % 3 === 0 ? 'Paid' : 'Pending',
  created: `01/01/${MOCK_YEAR}`,
  invoiceDate: i % 3 === 0 ? `05/01/${MOCK_YEAR}` : '-',
  qty: 10 + i * 3,
  beforeTax: 80 + i * 25.5,
  vat: (80 + i * 25.5) * 0.1,
  afterTax: (80 + i * 25.5) * 1.1,
  discount: i % 2 === 0 ? 5 : 0,
  net: (80 + i * 25.5) * 1.1 - (i % 2 === 0 ? 5 : 0),
}))

export const IMPORT_COLUMNS = [
  'Status',
  'Error list',
  'Order code',
  "Recipient's name",
  'Phone number',
  'Destination Province',
  'Destination District',
  'Destination Village',
  'Delivery point',
  'Address details',
  'Product name',
  'Weight (kg)',
  'Value',
  'COD amount',
  'Product type',
  'Service type',
  'Additional service',
]

export const MOCK_IMPORT_ROWS = Array.from({ length: 5 }, (_, i) => ({
  index: i + 1,
  status: i < 2 ? 'Valid' : '',
  errors: i === 2 ? 'Invalid phone format' : '',
  orderCode: i < 2 ? `EA-IMP-${MOCK_YEAR}-${String(200 + i)}` : '',
  recipient: i < 2 ? ['Sok Pisey', 'Chan Dara'][i] : '',
  phone: i < 2 ? `012${884210 + i}` : '',
}))

export const MOCK_BANKS = [
  { id: 'b1', label: 'Demo Development Bank' },
  { id: 'b2', label: 'Demo National Bank' },
]

export const ACCOUNT_SUB_NAV = [
  { key: 'account', labelKey: 'account.accountInfo', icon: 'user' },
  { key: 'warehouse', labelKey: 'account.warehouse', icon: 'warehouse' },
  { key: 'password', labelKey: 'account.password', icon: 'lock' },
]

export const MOCK_ACCOUNT = {
  fullName: 'sun heng',
  dob: '15/03/1990',
  phone: '0128842100',
  email: 'sunheng@gmail.com',
  idCard: '010884210',
  address: 'Street 60, Siem Reap',
  province: 'Siem Reap',
  district: 'Battambang City',
  commune: 'Svay Dangkum',
  bank: 'Demo Development Bank',
  accountNumber: '0018842100',
  accountOwner: 'sun heng',
  paymentMethod: 'Deduct service fee from COD amount',
  paymentType: 'Bank transfer',
  taxId: 'K00884210',
  classification: 'Retail merchant',
  codSchedule: 'everyday',
  referrer: 'Partner Agency 12',
  agent: 'Field Agent 07',
}
