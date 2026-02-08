'use client'

import React, { useState } from 'react'
import { AdminLayout } from '@/components/admin-layout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Grid3x3,
  List,
  MoreVertical,
  Eye,
  Copy,
  Trash2,
  Send,
  Download,
  Search,
  Plus,
  TrendingUp,
  Users,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import Link from 'next/link'

interface Campaign {
  id: string
  name: string
  status: 'Completed' | 'Scheduled' | 'Draft' | 'Failed' | 'In Progress'
  recipients: number
  sent: number
  delivered: number
  read: number
  failed: number
  messagePreview: string
  createdDate: string
  scheduledDate: string
}

const CAMPAIGNS: Campaign[] = [
  {
    id: '1',
    name: 'Summer Sale Campaign',
    status: 'Completed',
    recipients: 2840,
    sent: 2680,
    delivered: 2543,
    read: 1890,
    failed: 137,
    messagePreview: "Don't miss our exclusive summer sale! Get 50% off on selected items...",
    createdDate: 'Feb 1, 2024',
    scheduledDate: 'Feb 5, 2024',
  },
  {
    id: '2',
    name: 'Product Launch Announcement',
    status: 'In Progress',
    recipients: 1540,
    sent: 1450,
    delivered: 1380,
    read: 920,
    failed: 70,
    messagePreview: 'Introducing our new premium collection! Limited time exclusive...',
    createdDate: 'Feb 3, 2024',
    scheduledDate: 'Feb 6, 2024',
  },
  {
    id: '3',
    name: 'Weekly Newsletter',
    status: 'Scheduled',
    recipients: 8900,
    sent: 0,
    delivered: 0,
    read: 0,
    failed: 0,
    messagePreview: 'This week: Top 5 trending products, customer stories, and more...',
    createdDate: 'Feb 2, 2024',
    scheduledDate: 'Feb 8, 2024',
  },
  {
    id: '4',
    name: 'Event Promotion',
    status: 'Completed',
    recipients: 3200,
    sent: 3120,
    delivered: 2952,
    read: 2250,
    failed: 168,
    messagePreview: 'Join us for our mega annual event! Register now and get exclusive perks...',
    createdDate: 'Jan 28, 2024',
    scheduledDate: 'Feb 3, 2024',
  },
  {
    id: '5',
    name: 'Customer Feedback Survey',
    status: 'Draft',
    recipients: 5670,
    sent: 0,
    delivered: 0,
    read: 0,
    failed: 0,
    messagePreview: 'We value your feedback! Please take 2 minutes to fill our survey...',
    createdDate: 'Feb 4, 2024',
    scheduledDate: 'Feb 10, 2024',
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'In Progress':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'Scheduled':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'Draft':
      return 'bg-gray-100 text-gray-800 border-gray-200'
    case 'Failed':
      return 'bg-red-100 text-red-800 border-red-200'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusBorderColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'border-l-4 border-l-green-500'
    case 'In Progress':
      return 'border-l-4 border-l-yellow-500'
    case 'Scheduled':
      return 'border-l-4 border-l-blue-500'
    case 'Draft':
      return 'border-l-4 border-l-gray-500'
    case 'Failed':
      return 'border-l-4 border-l-red-500'
    default:
      return ''
  }
}

export default function CampaignsPage() {
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredCampaigns = CAMPAIGNS.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || campaign.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Broadcast Campaigns</h1>
            <p className="text-muted-foreground">Manage your WhatsApp broadcast campaigns</p>
          </div>
          <Button className="bg-primary text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" />
            Create Campaign
          </Button>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="in progress">In Progress</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>

          {/* View Toggle */}
          <div className="flex gap-1 bg-muted p-1 rounded-lg">
            <Button
              size="sm"
              variant={viewType === 'grid' ? 'default' : 'ghost'}
              onClick={() => setViewType('grid')}
              className="px-3"
            >
              <Grid3x3 />
            </Button>
            <Button
              size="sm"
              variant={viewType === 'list' ? 'default' : 'ghost'}
              onClick={() => setViewType('list')}
              className="px-3"
            >
              <List />
            </Button>
          </div>
        </div>

        {/* Grid View */}
        {viewType === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map(campaign => (
              <Card
                key={campaign.id}
                className={`overflow-hidden hover:shadow-lg transition-shadow ${getStatusBorderColor(campaign.status)}`}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                        {campaign.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {campaign.scheduledDate}
                      </p>
                    </div>
                    <Badge className={`ml-2 ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </Badge>
                  </div>

                  {/* Message Preview */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {campaign.messagePreview}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-4 gap-2 mb-4 text-xs">
                    <div className="bg-blue-50 dark:bg-blue-950 p-2 rounded">
                      <p className="text-muted-foreground mb-1">Recipients</p>
                      <p className="font-bold text-foreground">{campaign.recipients}</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-950 p-2 rounded">
                      <p className="text-muted-foreground mb-1">Sent</p>
                      <p className="font-bold text-primary">{campaign.sent}</p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950 p-2 rounded">
                      <p className="text-muted-foreground mb-1">Delivered</p>
                      <p className="font-bold text-blue-600">{campaign.delivered}</p>
                    </div>
                    <div className="bg-red-50 dark:bg-red-950 p-2 rounded">
                      <p className="text-muted-foreground mb-1">Failed</p>
                      <p className="font-bold text-red-600">{campaign.failed}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {campaign.status === 'Completed' && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-muted-foreground">Delivery Rate</span>
                        <span className="font-semibold text-foreground">
                          {Math.round((campaign.delivered / campaign.sent) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{
                            width: `${(campaign.delivered / campaign.sent) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Footer Actions */}
                  <div className="flex gap-2">
                    {campaign.status === 'Completed' && (
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
                        <Link href={`/broadcasting/campaigns/details`}>
                          <Eye />
                          View Report
                        </Link>
                      </Button>
                    )}
                    {campaign.status === 'Draft' && (
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        Edit
                      </Button>
                    )}
                    {campaign.status === 'Scheduled' && (
                      <Button size="sm" className="bg-primary text-primary-foreground flex-1">
                        <Send />
                        Send Now
                      </Button>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="outline" className="px-2 bg-transparent">
                          <MoreVertical />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/broadcasting/campaigns/details`}>
                            <Eye />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* List View */}
        {viewType === 'list' && (
          <Card>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Sent / Delivered / Read</TableHead>
                    <TableHead>Failure Rate</TableHead>
                    <TableHead>Scheduled Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCampaigns.map(campaign => (
                    <TableRow
                      key={campaign.id}
                      className={getStatusBorderColor(campaign.status)}
                    >
                      <TableCell className="font-medium">{campaign.name}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{campaign.recipients.toLocaleString()}</TableCell>
                      <TableCell className="text-sm">
                        <div className="flex gap-4">
                          <span>{campaign.sent} / {campaign.delivered} / {campaign.read}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {campaign.sent > 0
                          ? `${Math.round((campaign.failed / campaign.sent) * 100)}%`
                          : '-'}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {campaign.scheduledDate}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {campaign.status === 'Completed' && (
                            <Button size="sm" variant="ghost" asChild>
                              <Link href={`/broadcasting/campaigns/details`}>
                                <Eye />
                              </Link>
                            </Button>
                          )}
                          {campaign.status === 'Draft' && (
                            <Button size="sm" variant="ghost" asChild>
                              <Link href={`/broadcasting/campaigns/details`}>
                                <Eye />
                              </Link>
                            </Button>
                          )}
                          <Button size="sm" variant="ghost">
                            <Copy />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-destructive">
                            <Trash2 />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        )}

        {/* Empty State */}
        {filteredCampaigns.length === 0 && (
          <Card className="p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <TrendingUp className="h-12 w-12 text-muted-foreground" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">No campaigns found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create your first broadcast campaign to get started
                </p>
                <Button className="bg-primary text-primary-foreground">
                  Create Campaign
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
