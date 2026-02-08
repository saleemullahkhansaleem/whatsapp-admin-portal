'use client'

import React from 'react'
import { AdminLayout } from '@/components/admin-layout'
import {
  Users,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Megaphone,
  TrendingUp,
  Download,
  Eye,
  Pencil,
  Copy,
  MoreVertical
} from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'

const chartData = [
  { day: 'Mon', sent: 2400, delivered: 2210, read: 1890, failed: 221 },
  { day: 'Tue', sent: 2210, delivered: 2290, read: 2000, failed: 229 },
  { day: 'Wed', sent: 2290, delivered: 2000, read: 1800, failed: 250 },
  { day: 'Thu', sent: 2000, delivered: 2181, read: 1950, failed: 221 },
  { day: 'Fri', sent: 2181, delivered: 2500, read: 2200, failed: 229 },
  { day: 'Sat', sent: 2500, delivered: 2100, read: 2100, failed: 200 },
  { day: 'Sun', sent: 1847, delivered: 1756, read: 1650, failed: 91 },
]

const campaignData = [
  { name: 'Summer Sale', rate: 92 },
  { name: 'Product Launch', rate: 88 },
  { name: 'Newsletter', rate: 76 },
  { name: 'Event Promo', rate: 84 },
  { name: 'Feedback Survey', rate: 68 },
]

const recentCampaigns = [
  {
    id: 1,
    name: 'Summer Sale Campaign',
    recipients: 2840,
    status: 'Completed',
    sentDate: 'Feb 5, 2024',
    deliveryRate: '92%',
    statusColor: 'bg-green-100 text-green-800'
  },
  {
    id: 2,
    name: 'Product Launch Announcement',
    recipients: 1540,
    status: 'In Progress',
    sentDate: 'Feb 6, 2024',
    deliveryRate: '88%',
    statusColor: 'bg-yellow-100 text-yellow-800'
  },
  {
    id: 3,
    name: 'Weekly Newsletter',
    recipients: 8900,
    status: 'Scheduled',
    sentDate: 'Feb 8, 2024',
    deliveryRate: '-',
    statusColor: 'bg-blue-100 text-blue-800'
  },
  {
    id: 4,
    name: 'Event Promotion',
    recipients: 3200,
    status: 'Completed',
    sentDate: 'Feb 3, 2024',
    deliveryRate: '84%',
    statusColor: 'bg-green-100 text-green-800'
  },
  {
    id: 5,
    name: 'Customer Feedback Survey',
    recipients: 5670,
    status: 'Draft',
    sentDate: 'Feb 7, 2024',
    deliveryRate: '-',
    statusColor: 'bg-gray-100 text-gray-800'
  },
]

import { ReactNode, ReactElement, ComponentType } from "react";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
};

const StatCard = ({
  title,
  value,
  icon,
}: StatCardProps) => (
  <div className="relative flex items-center rounded-lg border border-border bg-card p-4 transition-shadow shadow-none">
    <div>
      <p className="text-2xl font-medium text-foreground">{value}</p>
      <p className="text-xs font-semibold text-muted-foreground tracking-wider">{title}</p>
    </div>
    <div className="absolute right-5 top-1/2 -translate-y-1/2">
      {(icon && typeof icon === "object" && "type" in icon) ? icon : null}
    </div>
  </div>
);

export default function Page() {
  return (
    <AdminLayout>
      <div className="space-y-4">

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <StatCard
            title="Total Contacts"
            value="10,542"
            icon={<Users size={24} className="text-blue-500" />}
          />
          <StatCard
            title="Messages Sent Today"
            value="1,847"
            icon={<Send size={24} className="text-primary" />}
          />
          <StatCard
            title="Messages Delivered"
            value="1,756"
            icon={<CheckCircle2 size={24} className="text-emerald-500" />}
          />
          <StatCard
            title="Messages Failed"
            value="91"
            icon={<AlertCircle size={24} className="text-destructive" />}
          />
          <StatCard
            title="Active Chats"
            value="23"
            icon={<MessageCircle size={24} className="text-amber-500" />}
          />
          <StatCard
            title="Total Campaigns"
            value="45"
            icon={<Megaphone size={24} className="text-violet-500" />}
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-primary text-primary-foreground font-semibold py-4 rounded-lg hover:bg-primary/90 transition-all hover:shadow-md flex items-center justify-center gap-2">
            <Send size={20} />
            Send New Broadcast
          </button>
          <button className="bg-blue-600 dark:bg-blue-700 text-white font-semibold py-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-all hover:shadow-md flex items-center justify-center gap-2">
            <TrendingUp size={20} />
            Upload Contacts
          </button>
          <button className="bg-violet-600 dark:bg-violet-700 text-white font-semibold py-4 rounded-lg hover:bg-violet-700 dark:hover:bg-violet-800 transition-all hover:shadow-md flex items-center justify-center gap-2">
            <Megaphone size={20} />
            Create Template
          </button>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Line Chart */}
          <div className="lg:col-span-2 bg-card rounded-lg shadow-sm p-6 border border-border">
            <h2 className="text-lg font-bold text-foreground mb-4">Message Delivery Trends (Last 7 Days)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Legend />
                <Line type="monotone" dataKey="sent" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} />
                <Line type="monotone" dataKey="delivered" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ fill: 'hsl(var(--chart-2))' }} />
                <Line type="monotone" dataKey="read" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={{ fill: 'hsl(var(--chart-3))' }} />
                <Line type="monotone" dataKey="failed" stroke="hsl(var(--destructive))" strokeWidth={2} dot={{ fill: 'hsl(var(--destructive))' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-card rounded-lg shadow-sm p-6 border border-border">
            <h2 className="text-lg font-bold text-foreground mb-4">Campaign Performance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={campaignData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" angle={-45} textAnchor="end" height={100} />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Bar dataKey="rate" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Campaigns Table */}
        <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-bold text-foreground">Recent Campaigns</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Campaign Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Recipients</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Sent Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Delivery Rate</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentCampaigns.map((campaign, idx) => (
                  <tr key={campaign.id} className={idx % 2 === 0 ? 'bg-card' : 'bg-muted/30'}>
                    <td className="px-6 py-4 text-sm text-foreground font-medium">{campaign.name}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{campaign.recipients.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm">
                      <Badge variant="secondary">
                        {campaign.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{campaign.sentDate}</td>
                    <td className="px-6 py-4 text-sm text-foreground font-medium">{campaign.deliveryRate}</td>
                    <td className="px-6 py-4 text-sm">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-1 hover:bg-muted rounded transition-colors">
                            <MoreVertical size={18} className="text-muted-foreground" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Eye size={16} />
                            <span>View</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Pencil size={16} />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Copy size={16} />
                            <span>Duplicate</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
