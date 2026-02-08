'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BarChart3,
  Users,
  Megaphone,
  Bot,
  MessageCircle,
  FileText,
  TrendingUp,
  Settings,
  HelpCircle,
  ChevronDown
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarItem {
  label: string
  href: string
  icon: React.ReactNode
  badge?: number | string
  subItems?: SidebarItem[]
}

const menuItems: SidebarItem[] = [
  {
    label: 'Dashboard',
    href: '/',
    icon: <BarChart3 size={20} />
  },
  {
    label: 'Contacts',
    href: '/contacts',
    icon: <Users size={20} />,
    subItems: [
      { label: 'All Contacts', href: '/contacts', icon: <span /> },
      { label: 'Groups', href: '/contacts/groups', icon: <span /> },
      { label: 'Import', href: '/contacts/import', icon: <span /> },
      { label: 'Tags', href: '/contacts/tags', icon: <span /> }
    ]
  },
  {
    label: 'Broadcasting',
    href: '/broadcasting',
    icon: <Megaphone size={20} />,
    subItems: [
      { label: 'Campaigns', href: '/broadcasting/campaigns', icon: <span /> },
      { label: 'Create Campaign', href: '/broadcasting/create', icon: <span /> },
      { label: 'Templates', href: '/broadcasting/templates', icon: <span /> },
      { label: 'Message', href: '/broadcasting/message', icon: <span /> },
    ]
  },
  {
    label: 'Chatbot',
    href: '/chatbot',
    icon: <Bot size={20} />,
    subItems: [
      { label: 'Bot Builder', href: '/chatbot/builder', icon: <span /> },
      { label: 'Auto Replies', href: '/chatbot/auto-replies', icon: <span /> }
    ]
  },
  {
    label: 'Inbox',
    href: '/inbox',
    icon: <MessageCircle size={20} />,
    badge: 5
  },
  {
    label: 'Templates',
    href: '/templates',
    icon: <FileText size={20} />
  },
  {
    label: 'Reports & Analytics',
    href: '/reports',
    icon: <TrendingUp size={20} />
  },
  {
    label: 'Users',
    href: '/users',
    icon: <Users size={20} />
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: <Settings size={20} />
  }
]

export function Sidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = React.useState<string[]>(['Dashboard'])

  const toggleExpand = (label: string) => {
    setExpandedItems(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    )
  }

  return (
    <aside className="fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] w-64 border-r bg-card border-border overflow-y-auto flex flex-col">

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {menuItems.map((item) => (
          <div key={item.label}>
            {item.subItems ? (
              <div>
                <button
                  onClick={() => toggleExpand(item.label)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    expandedItems.includes(item.label)
                      ? 'bg-muted text-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {item.icon}
                  <span className="flex-1 text-left">{item.label}</span>
                  <ChevronDown
                    size={16}
                    className={cn(
                      'transition-transform',
                      expandedItems.includes(item.label) && 'rotate-180'
                    )}
                  />
                </button>
                {expandedItems.includes(item.label) && (
                  <div className="pl-4 mt-1 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className={cn(
                          'flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors',
                          pathname === subItem.href
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        )}
                      >
                        <span>{subItem.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors relative',
                  pathname === item.href
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                {item.icon}
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-border p-4 space-y-3">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
          <HelpCircle size={20} />
          <span>Help & Support</span>
        </button>
        <div className="px-4 py-3 bg-muted rounded-lg text-xs text-muted-foreground">
          <div className="font-semibold text-foreground mb-1">Pro Plan</div>
          <div>Your current plan</div>
        </div>
      </div>
    </aside>
  )
}
