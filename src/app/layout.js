import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { AppProviders } from '@/context/AppProviders'

export const metadata = {
  title: 'Express App',
  description: 'Express App — shipping & COD merchant portal',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <AppProviders>{children}</AppProviders>
        <Analytics />
      </body>
    </html>
  )
}
