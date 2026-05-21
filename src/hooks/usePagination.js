'use client'

import { useMemo, useState } from 'react'

export function usePagination(items, initialPageSize = 10) {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize)

  const total = items.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  const safePage = Math.min(page, totalPages)

  const slice = useMemo(() => {
    const start = (safePage - 1) * pageSize
    return items.slice(start, start + pageSize)
  }, [items, safePage, pageSize])

  const from = total === 0 ? 0 : (safePage - 1) * pageSize + 1
  const to = Math.min(safePage * pageSize, total)

  return {
    page: safePage,
    setPage,
    pageSize,
    setPageSize: (size) => {
      setPageSize(size)
      setPage(1)
    },
    total,
    totalPages,
    items: slice,
    from,
    to,
    resetPage: () => setPage(1),
  }
}
