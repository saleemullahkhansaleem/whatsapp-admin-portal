'use client'

import React, { useState } from 'react'
import { AdminLayout } from '@/components/admin-layout'
import {
  Search,
  Plus,
  Download,
  Filter,
  ChevronDown,
  Trash2,
  UserPlus,
  Tag,
  FileDown,
  MoreVertical
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const contacts = [
  {
    id: 1,
    name: 'John Doe',
    phone: '+1 (555) 123-4567',
    email: 'john.doe@example.com',
    tags: ['VIP', 'Sales'],
    group: 'Sales Team',
    status: 'Active',
    lastContact: 'Jan 15, 2024',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    phone: '+1 (555) 234-5678',
    email: 'sarah.j@example.com',
    tags: ['Support'],
    group: 'Support Team',
    status: 'Active',
    lastContact: 'Jan 20, 2024',
  },
  {
    id: 3,
    name: 'Michael Chen',
    phone: '+1 (555) 345-6789',
    email: 'm.chen@example.com',
    tags: ['VIP', 'Newsletter'],
    group: 'Newsletter',
    status: 'Active',
    lastContact: 'Feb 1, 2024',
  },
  {
    id: 4,
    name: 'Emma Williams',
    phone: '+1 (555) 456-7890',
    email: 'emma.w@example.com',
    tags: ['Sales'],
    group: 'Sales Team',
    status: 'Inactive',
    lastContact: 'Dec 10, 2023',
  },
  {
    id: 5,
    name: 'David Martinez',
    phone: '+1 (555) 567-8901',
    email: 'david.m@example.com',
    tags: ['VIP', 'Sales', 'Support'],
    group: 'VIP Group',
    status: 'Active',
    lastContact: 'Feb 5, 2024',
  },
  {
    id: 6,
    name: 'Lisa Anderson',
    phone: '+1 (555) 678-9012',
    email: 'lisa.a@example.com',
    tags: ['Newsletter'],
    group: 'Newsletter',
    status: 'Active',
    lastContact: 'Jan 28, 2024',
  },
  {
    id: 7,
    name: 'James Taylor',
    phone: '+1 (555) 789-0123',
    email: 'james.t@example.com',
    tags: ['Support'],
    group: 'Support Team',
    status: 'Active',
    lastContact: 'Feb 2, 2024',
  },
  {
    id: 8,
    name: 'Rachel Green',
    phone: '+1 (555) 890-1234',
    email: 'rachel.g@example.com',
    tags: ['Sales'],
    group: 'Sales Team',
    status: 'Blocked',
    lastContact: 'Nov 5, 2023',
  },
  {
    id: 9,
    name: 'Carlos Lopez',
    phone: '+1 (555) 901-2345',
    email: 'carlos.l@example.com',
    tags: ['VIP'],
    group: 'VIP Group',
    status: 'Active',
    lastContact: 'Feb 4, 2024',
  },
  {
    id: 10,
    name: 'Patricia Brown',
    phone: '+1 (555) 012-3456',
    email: 'patricia.b@example.com',
    tags: ['Newsletter', 'Support'],
    group: 'Newsletter',
    status: 'Active',
    lastContact: 'Jan 30, 2024',
  },
]

const tagColors: { [key: string]: string } = {
  'VIP': 'bg-yellow-500/20 dark:bg-yellow-500/30 text-yellow-700 dark:text-yellow-400',
  'Sales': 'bg-blue-500/20 dark:bg-blue-500/30 text-blue-700 dark:text-blue-400',
  'Support': 'bg-emerald-500/20 dark:bg-emerald-500/30 text-emerald-700 dark:text-emerald-400',
  'Newsletter': 'bg-violet-500/20 dark:bg-violet-500/30 text-violet-700 dark:text-violet-400',
}

export default function ContactsPage() {
  const [selectedContacts, setSelectedContacts] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  const toggleSelect = (id: number) => {
    setSelectedContacts(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (selectedContacts.length === contacts.length) {
      setSelectedContacts([])
    } else {
      setSelectedContacts(contacts.map(c => c.id))
    }
  }

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-500'
      case 'Inactive':
        return 'bg-muted-foreground'
      case 'Blocked':
        return 'bg-destructive'
      default:
        return 'bg-border'
    }
  }

  return (
    <AdminLayout>
      <div>
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-foreground">Contacts Management</h1>
            <div className="flex gap-3">
              <button className="px-4 py-2 border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2 font-medium">
                <Download size={18} />
                Import Contacts
              </button>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-lg transition-shadow flex items-center gap-2 font-medium">
                <Plus size={18} />
                Add Contact
              </button>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-card rounded-lg shadow-sm p-4 mb-6 border border-border">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 bg-muted border border-border rounded-lg focus:outline-none focus:border-blue-600 dark:border-blue-400"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <select className="px-3 py-2 bg-muted border border-border rounded-lg text-sm text-muted-foreground focus:outline-none focus:border-blue-600 dark:border-blue-400">
                <option>All Groups</option>
                <option>Sales Team</option>
                <option>Support Team</option>
                <option>Newsletter</option>
                <option>VIP Group</option>
              </select>

              <select className="px-3 py-2 bg-muted border border-border rounded-lg text-sm text-muted-foreground focus:outline-none focus:border-blue-600 dark:border-blue-400">
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
                <option>Blocked</option>
              </select>

              <select className="px-3 py-2 bg-muted border border-border rounded-lg text-sm text-muted-foreground focus:outline-none focus:border-blue-600 dark:border-blue-400">
                <option>Date Range</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>

            {/* Export */}
            <button className="px-3 py-2 bg-muted border border-border rounded-lg hover:bg-card transition-colors flex items-center gap-2 text-muted-foreground">
              <Download size={18} />
              <span className="text-sm">Export</span>
            </button>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {selectedContacts.length > 0 && (
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-6 flex items-center justify-between">
            <span className="text-sm font-medium text-primary">
              {selectedContacts.length} contacts selected
            </span>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm hover:bg-primary/20 rounded transition-colors flex items-center gap-1 text-primary">
                <UserPlus size={16} />
                Move to Group
              </button>
              <button className="px-3 py-1 text-sm hover:bg-primary/20 rounded transition-colors flex items-center gap-1 text-primary">
                <Tag size={16} />
                Add Tags
              </button>
              <button className="px-3 py-1 text-sm hover:bg-primary/20 rounded transition-colors flex items-center gap-1 text-primary">
                <FileDown size={16} />
                Export Selected
              </button>
              <button className="px-3 py-1 text-sm hover:bg-destructive/20 rounded transition-colors flex items-center gap-1 text-destructive">
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        )}

        {/* Contacts Table */}
        <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted border-b border-border">
                  <th className="px-6 py-3 text-left">
                    <Checkbox
                      checked={selectedContacts.length === contacts.length}
                      onCheckedChange={toggleSelectAll}
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Phone</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Tags</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Group</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Last Contact</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact, idx) => (
                  <tr
                    key={contact.id}
                    className={`border-b border-border hover:bg-muted transition-colors ${selectedContacts.includes(contact.id) ? 'bg-primary/10' : idx % 2 === 0 ? 'bg-card' : 'bg-muted'
                      }`}
                  >
                    <td className="px-6 py-4">
                      <Checkbox
                        checked={selectedContacts.includes(contact.id)}
                        onCheckedChange={() => toggleSelect(contact.id)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.name}`} />
                          <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-foreground">{contact.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{contact.phone}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{contact.email}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1 flex-wrap max-w-xs">
                        {contact.tags.map((tag) => (
                          <Badge
                            key={tag}
                            className={`${tagColors[tag] || 'bg-gray-100 text-gray-800'} text-xs`}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{contact.group}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusDot(contact.status)}`}></div>
                        <span className="text-muted-foreground">{contact.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{contact.lastContact}</td>
                    <td className="px-6 py-4 text-sm">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-1 hover:bg-muted rounded transition-colors">
                            <MoreVertical size={18} className="text-muted-foreground" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Send Message</DropdownMenuItem>
                          <DropdownMenuItem>Add to Group</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-muted">
            <span className="text-sm text-muted-foreground">Showing 1-10 of 10,542 contacts</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-border rounded text-sm hover:bg-card transition-colors">← Previous</button>
              <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm">1</button>
              <button className="px-3 py-1 border border-border rounded text-sm hover:bg-card transition-colors">2</button>
              <button className="px-3 py-1 border border-border rounded text-sm hover:bg-card transition-colors">3</button>
              <button className="px-3 py-1 border border-border rounded text-sm hover:bg-card transition-colors">Next →</button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
