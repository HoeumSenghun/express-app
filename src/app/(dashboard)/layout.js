import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AUTH_COOKIE } from '@/lib/auth'
import { DashboardClientLayout } from './DashboardClientLayout'

export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies()
  const token = cookieStore.get(AUTH_COOKIE)?.value

  if (!token) {
    redirect('/login')
  }

  return <DashboardClientLayout>{children}</DashboardClientLayout>
}
