'use client'

import React from 'react'
import { AdminLayout } from '@/components/admin-layout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import {
  ArrowLeft,
  Copy,
  Download,
  Trash2,
  MoreVertical,
  Send,
  CheckCircle2,
  Eye,
  AlertCircle,
  Clock,
  MessageCircle,
} from 'lucide-react'
import Link from 'next/link'

const deliveryData = [
  { time: '10:00 AM', sent: 500, delivered: 480, read: 420, failed: 20 },
  { time: '11:00 AM', sent: 800, delivered: 760, read: 650, failed: 40 },
  { time: '12:00 PM', sent: 450, delivered: 410, read: 320, failed: 40 },
  { time: '1:00 PM', sent: 300, delivered: 280, read: 200, failed: 20 },
  { time: '2:00 PM', sent: 130, delivered: 113, read: 70, failed: 17 },
]

const statusData = [
  { name: 'Delivered', value: 2543, fill: '#10B981' },
  { name: 'Read', value: 1890, fill: '#3B82F6' },
  { name: 'Pending', value: 0, fill: '#F59E0B' },
  { name: 'Failed', value: 137, fill: '#EF4444' },
]

const recipients = [
  {
    id: '1',
    name: 'John Doe',
    phone: '+1 9876543210',
    status: 'Delivered',
    deliveredAt: 'Feb 5, 10:15 AM',
    readAt: 'Feb 5, 10:22 AM',
    error: null,
  },
  {
    id: '2',
    name: 'Jane Smith',
    phone: '+1 8765432109',
    status: 'Read',
    deliveredAt: 'Feb 5, 10:16 AM',
    readAt: 'Feb 5, 10:25 AM',
    error: null,
  },
  {
    id: '3',
    name: 'Bob Wilson',
    phone: '+1 7654321098',
    status: 'Failed',
    deliveredAt: '-',
    readAt: '-',
    error: 'Invalid phone number format',
  },
  {
    id: '4',
    name: 'Alice Johnson',
    phone: '+1 6543210987',
    status: 'Delivered',
    deliveredAt: 'Feb 5, 10:14 AM',
    readAt: '-',
    error: null,
  },
]

const activityLog = [
  {
    id: '1',
    action: 'Campaign created',
    user: 'You',
    date: 'Feb 1, 2024, 2:30 PM',
    icon: MessageCircle,
  },
  {
    id: '2',
    action: 'Recipients selected',
    details: '2,680 contacts added',
    date: 'Feb 2, 2024, 10:15 AM',
    icon: Send,
  },
  {
    id: '3',
    action: 'Message composed',
    details: 'Summer Sale Campaign message',
    date: 'Feb 3, 2024, 3:45 PM',
    icon: MessageCircle,
  },
  {
    id: '4',
    action: 'Campaign scheduled',
    details: 'Scheduled for Feb 5, 10:00 AM',
    date: 'Feb 4, 2024, 9:00 AM',
    icon: Clock,
  },
  {
    id: '5',
    action: 'Sending started',
    details: 'Campaign started',
    date: 'Feb 5, 2024, 10:00 AM',
    icon: Send,
  },
  {
    id: '6',
    action: 'Sending completed',
    details: '2,680 messages sent',
    date: 'Feb 5, 2024, 10:45 AM',
    icon: CheckCircle2,
  },
]

export default function CampaignDetailsPage() {
  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Button variant="ghost" size="icon" className="p-0 " asChild>
                <Link href="/broadcasting/campaigns">
                  <ArrowLeft />
                </Link>
              </Button>
              <h1 className="text-3xl font-bold text-foreground">Summer Sale Campaign</h1>
              <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300">Completed</Badge>
            </div>
            <p className="text-muted-foreground">
              Campaign sent to 2,680 contacts with 95% delivery rate
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate Campaign
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Campaign
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Recipients', value: '2,680', icon: Send },
            { label: 'Delivered', value: '2,543', subtext: '95%', color: 'text-emerald-600 dark:text-emerald-400' },
            { label: 'Read', value: '1,890', subtext: '70.5%', color: 'text-blue-600 dark:text-blue-400' },
            { label: 'Failed', value: '137', subtext: '5%', color: 'text-destructive dark:text-destructive/80' },
          ].map((stat, idx) => (
            <Card key={idx} className="p-6">
              <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
              <div className="flex items-end justify-between">
                <div>
                  <p className={`text-3xl font-bold ${stat.color || 'text-foreground'}`}>
                    {stat.value}
                  </p>
                  {stat.subtext && (
                    <p className="text-sm text-muted-foreground mt-1">{stat.subtext}</p>
                  )}
                </div>
                {stat.icon && <stat.icon className="h-8 w-8 text-muted-foreground" />}
              </div>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="recipients">Recipients</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Campaign Details Card */}
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Campaign Details</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Created</p>
                  <p className="text-foreground font-medium mt-1">Feb 1, 2024 at 2:30 PM</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created by</p>
                  <p className="text-foreground font-medium mt-1">Admin User</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Message Type</p>
                  <p className="text-foreground font-medium mt-1">Text + Image</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Scheduled</p>
                  <p className="text-foreground font-medium mt-1">Feb 5, 2024 at 10:00 AM</p>
                </div>
              </div>
            </Card>

            {/* Message Preview Card */}
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Message Preview</h3>
              <div className="flex gap-6">
                <div className="flex-1">
                  <div className="bg-muted rounded-lg p-4 max-w-sm">
                    <div className="bg-primary/10 rounded-lg p-4 space-y-2">
                      <p className="text-sm font-semibold text-foreground">
                        Don&apos;t miss our exclusive summer sale!
                      </p>
                      <p className="text-sm text-foreground">
                        Get 50% off on selected items. Limited time offer!
                      </p>
                      <p className="text-xs text-muted-foreground mt-4">10:00 AM</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt="Campaign preview"
                    className="rounded-lg w-full max-w-sm"
                  />
                </div>
              </div>
            </Card>

            {/* Delivery Timeline */}
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Delivery Timeline (Last 5 Hours)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={deliveryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="sent" stroke="hsl(var(--primary))" strokeWidth={2} />
                  <Line type="monotone" dataKey="delivered" stroke="hsl(211, 100%, 50%)" strokeWidth={2} />
                  <Line type="monotone" dataKey="read" stroke="hsl(270, 100%, 50%)" strokeWidth={2} />
                  <Line type="monotone" dataKey="failed" stroke="hsl(var(--destructive))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Status Breakdown */}
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Status Breakdown</h3>
              <div className="flex gap-12 items-center">
                <ResponsiveContainer width={250} height={250}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3">
                  {statusData.map(item => (
                    <div key={item.name} className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.fill }}
                      />
                      <span className="text-sm text-foreground">
                        {item.name}: {item.value.toLocaleString()}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({Math.round((item.value / 2680) * 100)}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Recipients Tab */}
          <TabsContent value="recipients" className="space-y-4">
            <Card className="p-4">
              <div className="flex gap-4 mb-4">
                <Input placeholder="Search recipients..." className="flex-1" />
                <div className="flex gap-2">
                  {['All', 'Delivered', 'Read', 'Failed', 'Pending'].map(status => (
                    <Badge key={status} variant="outline" className="cursor-pointer">
                      {status}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>

            <Card>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contact Name</TableHead>
                      <TableHead>Phone Number</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Delivered At</TableHead>
                      <TableHead>Read At</TableHead>
                      <TableHead>Error</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recipients.map(recipient => (
                      <TableRow key={recipient.id}>
                        <TableCell className="font-medium">{recipient.name}</TableCell>
                        <TableCell className="text-muted-foreground">{recipient.phone}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              recipient.status === 'Failed'
                                ? 'destructive'
                                : recipient.status === 'Read'
                                  ? 'default'
                                  : 'secondary'
                            }
                          >
                            {recipient.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{recipient.deliveredAt}</TableCell>
                        <TableCell className="text-sm">{recipient.readAt}</TableCell>
                        <TableCell className="text-sm text-destructive">
                          {recipient.error || '-'}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          {/* Engagement Tab */}
          <TabsContent value="engagement" className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Button Click Analytics</h3>
              <div className="space-y-4">
                {[
                  { button: 'Shop Now', clicks: 456, rate: '17.9%' },
                  { button: 'Learn More', clicks: 234, rate: '9.2%' },
                  { button: 'Contact Us', clicks: 123, rate: '4.8%' },
                ].map((item, idx) => (
                  <div key={idx} className="border-b border-border pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-foreground">{item.button}</p>
                      <div className="text-right">
                        <p className="font-bold text-foreground">{item.clicks}</p>
                        <p className="text-sm text-muted-foreground">{item.rate}</p>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: item.rate }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Activity Log Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Campaign Timeline</h3>
              <div className="relative">
                {activityLog.map((log, idx) => {
                  const Icon = log.icon
                  return (
                    <div key={log.id} className="flex gap-4 pb-6 relative">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                          <Icon size={18} />
                        </div>
                        {idx < activityLog.length - 1 && (
                          <div className="w-0.5 h-12 bg-border mt-2" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{log.action}</p>
                        {log.details && (
                          <p className="text-sm text-muted-foreground mt-1">{log.details}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-2">{log.date}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
