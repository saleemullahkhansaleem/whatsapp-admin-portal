import React from 'react'
import { Sidebar } from './sidebar'
import { TopHeader } from './top-header'

interface AdminLayoutProps {
  children: React.ReactNode
  isPadding?: boolean
}

export function AdminLayout({ children, isPadding = true }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* HEADER: Full width, sticky, OUTSIDE everything */}
      <TopHeader />

      {/* MAIN CONTAINER: Flex layout BELOW header */}
      <div className="flex">
        {/* SIDEBAR: Fixed position, starts below header */}
        <Sidebar />

        {/* MAIN CONTENT: Offset by sidebar width */}
        <main className={`flex-1 ml-64 ${isPadding ? 'p-6' : ''} min-h-[calc(100vh-4rem)]`}>
          {children}
        </main>
      </div>
    </div>
  )
}
