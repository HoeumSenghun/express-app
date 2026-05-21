'use client'

import { useLanguage } from '@/context/LanguageContext'

export function Pagination({
  page,
  totalPages,
  pageSize,
  total,
  from,
  to,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50],
}) {
  const { t } = useLanguage()

  const pages = []
  const maxVisible = 5
  let start = Math.max(1, page - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages, start + maxVisible - 1)
  start = Math.max(1, end - maxVisible + 1)
  for (let i = start; i <= end; i++) pages.push(i)

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
      <span className="text-sm text-gray-500">
        {t('pagination.showing', { from: String(from), to: String(to), total: String(total) })}
      </span>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="rounded border border-gray-200 px-2 py-1 text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-40"
        >
          &lt;
        </button>
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={`min-w-8 rounded border px-2 py-1 text-sm ${
              p === page
                ? 'border-brand text-brand'
                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {p}
          </button>
        ))}
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="rounded border border-gray-200 px-2 py-1 text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-40"
        >
          &gt;
        </button>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="rounded border border-gray-200 px-2 py-1 text-sm text-gray-600"
        >
          {pageSizeOptions.map((n) => (
            <option key={n} value={n}>
              {n}
              {t('pagination.perPage')}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
