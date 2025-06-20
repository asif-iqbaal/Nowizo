"use client"

import { LeftNavigation } from '@/components/shared/sideNavigation'
import { SidebarProvider } from '@/components/ui/sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex bg-black">
        <LeftNavigation/>
        <main className="flex-1 flex bg-black">{children}</main>
      </div>
    </SidebarProvider>
  )
}
