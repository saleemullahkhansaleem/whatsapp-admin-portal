'use client'

import React, { useState } from 'react'
import { AdminLayout } from '@/components/admin-layout'
import { Calendar, Download, Send, CheckCircle2, TrendingUp, MessageCircle, BarChart3, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const lineChartData = [
  { date: 'Jan 1', sent: 4000, delivered: 3800, read: 2400, failed: 240 },
  { date: 'Jan 2', sent: 3000, delivered: 2810, read: 2290, failed: 221 },
  { date: 'Jan 3', sent: 2000, delivered: 1800, read: 1500, failed: 229 },
  { date: 'Jan 4', sent: 2780, delivered: 1908, read: 1800, failed: 200 },
  { date: 'Jan 5', sent: 1890, delivered: 1800, read: 1181, failed: 229 },
  { date: 'Jan 6', sent: 2390, delivered: 2200, read: 2008, failed: 200 },
  { date: 'Jan 7', sent: 3490, delivered: 2908, read: 2800, failed: 221 },
]

const campaignData = [
  { name: 'Summer Sale', sent: 5000, delivered: 4800, rate: 96 },
  { name: 'Newsletter', sent: 12000, delivered: 11400, rate: 95 },
  { name: 'Event Promo', sent: 3200, delivered: 2880, rate: 90 },
  { name: 'Flash Deal', sent: 8500, delivered: 7700, rate: 91 },
]

const topicsData = [
  { name: 'Marketing', value: 45 },
  { name: 'Support', value: 30 },
  { name: 'Operations', value: 15 },
  { name: 'Other', value: 10 },
]

const COLORS = ['hsl(142, 76%, 36%)', 'hsl(210, 100%, 50%)', 'hsl(10, 100%, 56%)', 'hsl(215.4, 16.3%, 46.9%)']

const StatCard = ({ title, value, change, icon: Icon, positive }: any) => (
  <Card className="bg-card border-border">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
        <TrendingUp className={`h-3 w-3 ${positive ? 'text-green-500' : 'text-red-500'}`} />
        <span className={positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
          {positive ? '+' : '-'}{change}
        </span>
        vs last period
      </p>
    </CardContent>
  </Card>
)

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('7days')

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
            <p className="text-muted-foreground">Track performance and insights</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-border bg-transparent">
              <Calendar className="h-4 w-4 mr-2" />
              {dateRange === '7days' && 'Last 7 Days'}
              {dateRange === '30days' && 'Last 30 Days'}
              {dateRange === '90days' && 'Last 90 Days'}
            </Button>
            <Button variant="outline" className="border-border bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="agents">Agents</TabsTrigger>
            <TabsTrigger value="chatbot">Chatbot</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Metrics Row */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              <StatCard title="Messages Sent" value="15,430" change="12%" icon={Send} positive={true} />
              <StatCard title="Delivery Rate" value="96.5%" change="2%" icon={CheckCircle2} positive={true} />
              <StatCard title="Read Rate" value="72.3%" change="5%" icon={BarChart3} positive={true} />
              <StatCard title="Response Rate" value="45.2%" change="3%" icon={MessageCircle} positive={true} />
              <StatCard title="Failed Messages" value="540" change="15%" icon={Send} positive={false} />
              <StatCard title="Active Users" value="2,847" change="8%" icon={Users} positive={true} />
            </div>

            {/* Charts */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Line Chart */}
              <Card className="lg:col-span-2 bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Message Volume Trends</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Messages sent, delivered, read, and failed over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={lineChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--background))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="sent" stroke="hsl(142, 76%, 36%)" strokeWidth={2} />
                      <Line type="monotone" dataKey="delivered" stroke="hsl(210, 100%, 50%)" strokeWidth={2} />
                      <Line type="monotone" dataKey="read" stroke="hsl(142, 76%, 36%)" strokeWidth={2} strokeDasharray="5 5" />
                      <Line type="monotone" dataKey="failed" stroke="hsl(0, 84.2%, 60.2%)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Pie Chart */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Topics Distribution</CardTitle>
                  <CardDescription className="text-muted-foreground">Messages by topic</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={topicsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name} ${value}%`}
                        outerRadius={80}
                        dataKey="value"
                      >
                        {topicsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Campaign Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={campaignData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="sent" fill="hsl(210, 100%, 50%)" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="delivered" fill="hsl(142, 76%, 36%)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Agents Tab */}
          <TabsContent value="agents" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Agent Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Agent performance metrics will be displayed here</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Chatbot Tab */}
          <TabsContent value="chatbot" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Chatbot Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Chatbot performance metrics will be displayed here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
