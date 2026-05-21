import { Suspense } from 'react'
import { SearchContent } from './SearchContent'

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="h-32 animate-pulse rounded-lg bg-gray-100" />}>
      <SearchContent />
    </Suspense>
  )
}
