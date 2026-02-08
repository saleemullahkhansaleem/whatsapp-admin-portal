'use client'

import React, { useState } from 'react'
import { AdminLayout } from '@/components/admin-layout'
import { Plus, MoreVertical, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const templates = [
  {
    id: 1,
    name: 'Welcome Message',
    category: 'Utility',
    status: 'Approved',
    statusColor: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
    language: 'EN',
    variables: 1,
    lastUsed: '2h ago',
    preview: 'Hello {{1}}, welcome to our service! We\'re excited to have you with us.',
  },
  {
    id: 2,
    name: 'Summer Sale 2024',
    category: 'Marketing',
    status: 'Pending',
    statusColor: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20',
    language: 'EN',
    variables: 2,
    lastUsed: 'Never',
    preview: 'Don\'t miss our exclusive summer sale! Get {{1}}% off on all items until {{2}}.',
  },
  {
    id: 3,
    name: 'Order Confirmation',
    category: 'Utility',
    status: 'Approved',
    statusColor: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
    language: 'EN',
    variables: 2,
    lastUsed: '1h ago',
    preview: 'Your order #{{1}} has been confirmed! Expected delivery: {{2}}',
  },
  {
    id: 4,
    name: 'Password Reset',
    category: 'Authentication',
    status: 'Approved',
    statusColor: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
    language: 'EN',
    variables: 1,
    lastUsed: '5m ago',
    preview: 'Your password reset code is: {{1}}. Valid for 10 minutes.',
  },
  {
    id: 5,
    name: 'Feedback Survey',
    category: 'Marketing',
    status: 'Rejected',
    statusColor: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
    language: 'EN',
    variables: 0,
    lastUsed: 'Never',
    preview: 'We\'d love to hear your feedback! Please take 2 minutes to complete our survey.',
  },
  {
    id: 6,
    name: 'Payment Reminder',
    category: 'Utility',
    status: 'Approved',
    statusColor: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
    language: 'EN',
    variables: 1,
    lastUsed: '30m ago',
    preview: 'Reminder: Your payment of {{1}} is due today. Please pay now.',
  },
]

export default function TemplatesPage() {
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)

  const filteredTemplates = templates.filter((template) => {
    const categoryMatch = filterCategory === 'all' || template.category.toLowerCase() === filterCategory.toLowerCase()
    const statusMatch = filterStatus === 'all' || template.status.toLowerCase() === filterStatus.toLowerCase()
    const searchMatch = template.name.toLowerCase().includes(searchTerm.toLowerCase())
    return categoryMatch && statusMatch && searchMatch
  })

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Message Templates</h1>
            <p className="text-muted-foreground">Create and manage WhatsApp Business API templates</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <Button onClick={() => setDialogOpen(true)} className="bg-primary text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Create Template
            </Button>
            <DialogContent className="sm:max-w-2xl bg-card border-border">
              <DialogHeader>
                <DialogTitle className="text-foreground">Create New Template</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Create a WhatsApp message template for approval
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="info">
                <TabsList className="grid w-full grid-cols-3 bg-muted">
                  <TabsTrigger value="info">Template Info</TabsTrigger>
                  <TabsTrigger value="message">Message</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-4 mt-4">
                  <div>
                    <Label className="text-foreground">Template Name *</Label>
                    <Input placeholder="e.g., Welcome Message" className="bg-background border-input mt-2" />
                  </div>
                  <div>
                    <Label className="text-foreground">Category *</Label>
                    <Select>
                      <SelectTrigger className="bg-background border-input mt-2">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="utility">Utility</SelectItem>
                        <SelectItem value="authentication">Authentication</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-foreground">Language *</Label>
                    <Select>
                      <SelectTrigger className="bg-background border-input mt-2">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="message" className="space-y-4 mt-4">
                  <div>
                    <Label className="text-foreground">Message Body *</Label>
                    <Textarea
                      placeholder="Use {{1}}, {{2}} for variables"
                      rows={6}
                      className="bg-background border-input text-foreground mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">256 / 1024 characters</p>
                  </div>
                </TabsContent>

                <TabsContent value="preview" className="mt-4">
                  <div className="bg-muted/30 p-6 rounded-lg">
                    <div className="max-w-sm mx-auto bg-background rounded-lg p-4 shadow border border-border">
                      <p className="text-sm text-foreground">
                        Hello John, welcome to our service! We're excited to have you.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter>
                <Button variant="outline" className="border-border bg-transparent" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-primary text-primary-foreground">Submit for Approval</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Alert Banner */}
        <Alert className="border-blue-200 dark:border-blue-800">
          <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertTitle className="text-blue-900 dark:text-blue-100">Template Approval Required</AlertTitle>
          <AlertDescription className="text-blue-700 dark:text-blue-300">
            Templates must be approved by WhatsApp before use. Approval typically takes 24-48 hours.
          </AlertDescription>
        </Alert>

        {/* Filter Bar */}
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm bg-background border-input text-foreground"
          />
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-40 bg-background border-input">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="utility">Utility</SelectItem>
              <SelectItem value="authentication">Authentication</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32 bg-background border-input">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="bg-card border-border">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg text-card-foreground">{template.name}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-popover">
                      {template.status === 'Approved' && (
                        <DropdownMenuItem>Use Template</DropdownMenuItem>
                      )}
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="border-border">
                    {template.category}
                  </Badge>
                  <Badge className={template.statusColor}>
                    {template.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {template.preview}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <span>Language: {template.language}</span>
                  <span>{template.variables} variable{template.variables !== 1 ? 's' : ''}</span>
                </div>
                <Separator className="bg-border mb-3" />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Last used: {template.lastUsed}</span>
                  {template.status === 'Approved' && (
                    <Button size="sm" variant="outline" className="border-border bg-transparent">
                      Use
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
