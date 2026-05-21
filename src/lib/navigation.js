export const NAV_ITEMS = [
  { labelKey: 'nav.home', href: '/', icon: 'home' },
  {
    labelKey: 'nav.createOrder',
    icon: 'plus',
    children: [
      { labelKey: 'nav.createSingle', href: '/orders/create' },
      { labelKey: 'nav.createExcel', href: '/orders/import' },
    ],
  },
  {
    labelKey: 'nav.management',
    icon: 'folder',
    children: [
      { labelKey: 'nav.orderManagement', href: '/management/orders' },
      { labelKey: 'nav.cashFlow', href: '/management/cash-flow' },
      { labelKey: 'nav.invoices', href: '/management/invoices' },
    ],
  },
  {
    labelKey: 'nav.lookup',
    icon: 'search',
    children: [{ labelKey: 'nav.feeLookup', href: '/lookup/fees' }],
  },
  { labelKey: 'nav.accountSettings', href: '/account', icon: 'settings' },
  { labelKey: 'nav.complaints', href: '/complaints', icon: 'message' },
]

export function isActivePath(pathname, href) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function findActiveParent(pathname) {
  for (const item of NAV_ITEMS) {
    if (item.href && isActivePath(pathname, item.href)) return item.labelKey
    if (item.children?.some((c) => isActivePath(pathname, c.href))) return item.labelKey
  }
  return null
}
