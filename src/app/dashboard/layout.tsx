"use client"

import React,{useState} from 'react'
import { LeftNavigation } from '@/components/shared/sideNavigation'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCollapse,setIsCollapse] = useState<boolean>(false);
  const handleToggle = () => {
    setIsCollapse((prev) => (!prev));
  }
  return (
    <SidebarProvider>
      <div className="flex bg-black w-screen h-screen transition-all overflow-hidden overflow-y-scroll">
        <div className={`transition-all duration-200  ${isCollapse?"w-20":"w-64"}`}>
        <LeftNavigation isCollapse={isCollapse} toggleCollapse={handleToggle}/>
        </div>
        <main
          className="flex-grow transition-all duration-300"
        >
          {children}
        </main>
        <Toaster position='top-center' className='bg-gray-950 text-white'/>
      </div>
    </SidebarProvider>
  )
}
