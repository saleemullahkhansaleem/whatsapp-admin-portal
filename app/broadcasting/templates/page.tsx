'use client'

import React, { useState } from 'react'
import { AdminLayout } from '@/components/admin-layout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle as AlertInfo, Plus, Edit2, Trash2, Copy, Clock, CheckCircle2, X, MoreVertical, Info } from 'lucide-react'

interface Template {
  id: string
  name: string
  category: 'Marketing' | 'Utility' | 'Authentication'
  status: 'Approved' | 'Pending' | 'Rejected'
  language: string
  preview: string
  variables: number
  lastUsed: string
  description?: string
}

const TEMPLATES: Template[] = [
  {
    id: '1',
    name: 'Order Confirmation',
    category: 'Utility',
    status: 'Approved',
    language: 'EN',
    preview: 'Your order {{1}} has been confirmed. Total: {{2}}',
    variables: 2,
    lastUsed: '2 days ago',
    description: 'Send order confirmation to customers',
  },
  {
    id: '2',
    name: 'Welcome Message',
    category: 'Marketing',
    status: 'Approved',
    language: 'EN',
    preview: 'Welcome to {{1}}! We&apos;re excited to have you.',
    variables: 1,
    lastUsed: '5 days ago',
    description: 'Welcome new customers',
  },
  {
    id: '3',
    name: 'Shipping Notification',
    category: 'Utility',
    status: 'Pending',
    language: 'EN',
    preview: 'Your package is on the way! Track it here: {{1}}',
    variables: 1,
    lastUsed: 'Never',
    description: 'Notify customers about shipment',
  },
  {
    id: '4',
    name: 'Password Reset',
    category: 'Authentication',
    status: 'Approved',
    language: 'EN',
    preview: 'Click here to reset your password: {{1}}',
    variables: 1,
    lastUsed: '1 week ago',
    description: 'Send password reset link',
  },
  {
    id: '5',
    name: 'Promotion Campaign',
    category: 'Marketing',
    status: 'Rejected',
    language: 'EN',
    preview: 'Limited offer: {{1}}% off on {{2}}. Use code {{3}}',
    variables: 3,
    lastUsed: 'Never',
    description: 'Promotional message template',
  },
  {
    id: '6',
    name: 'Appointment Reminder',
    category: 'Utility',
    status: 'Approved',
    language: 'EN',
    preview: 'Reminder: You have an appointment on {{1}} at {{2}}',
    variables: 2,
    lastUsed: 'Yesterday',
    description: 'Appointment reminder notification',
  },
]

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Marketing':
      return 'bg-purple-100 text-purple-800'
    case 'Utility':
      return 'bg-blue-100 text-blue-800'
    case 'Authentication':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Approved':
      return <CheckCircle2 className="h-5 w-5 text-green-600" />
    case 'Pending':
      return <Clock className="h-5 w-5 text-yellow-600" />
    case 'Rejected':
      return <X className="h-5 w-5 text-red-600" />
    default:
      return null
  }
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>(TEMPLATES)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [templateStep, setTemplateStep] = useState(0)

  const [formData, setFormData] = useState({
    name: '',
    category: 'Marketing' as 'Marketing'|'Utility'|'Authentication',
    language: 'EN',
    description: '',
    headerType: 'none',
    headerText: '',
    bodyText: '',
    footerText: '',
    buttons: [] as { text: string; action: string }[],
  })

  const filteredTemplates = templates.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const openCreateDialog = () => {
    setEditingTemplate(null)
    setTemplateStep(0)
    setFormData({
      name: '',
      category: 'Marketing' ,
      language: 'EN',
      description: '',
      headerType: 'none',
      headerText: '',
      bodyText: '',
      footerText: '',
      buttons: [],
    })
    setDialogOpen(true)
  }

  const openEditDialog = (template: Template) => {
    setEditingTemplate(template)
    setTemplateStep(0)
    setFormData({
      name: template.name,
      category: template.category,
      language: template.language,
      description: template.description || '',
      headerType: 'none',
      headerText: '',
      bodyText: template.preview,
      footerText: '',
      buttons: [],
    })
    setDialogOpen(true)
  }

  const handleSaveTemplate = () => {
    if (!formData.name.trim() || !formData.bodyText.trim()) return

    if (editingTemplate) {
      setTemplates(
        templates.map(t =>
          t.id === editingTemplate.id
            ? {
              ...t,
              name: formData.name,
              category: formData.category,
              language: formData.language,
              description: formData.description,
            }
            : t
        )
      )
    } else {
      const newTemplate: Template = {
        id: Math.random().toString(),
        name: formData.name,
        category: formData.category,
        status: 'Pending',
        language: formData.language,
        preview: formData.bodyText.substring(0, 60) + '...',
        variables: (formData.bodyText.match(/\{\{(\d+)\}\}/g) || []).length,
        lastUsed: 'Never',
        description: formData.description,
      }
      setTemplates([...templates, newTemplate])
    }
    setDialogOpen(false)
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Message Templates</h1>
            <p className="text-muted-foreground">
              Create and manage WhatsApp Business API templates
            </p>
          </div>
          <Button
            className="bg-primary text-primary-foreground"
            onClick={openCreateDialog}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Template
          </Button>
        </div>

        {/* Info Alert */}
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Templates require WhatsApp approval before use. Approval typically takes 24-48 hours.
          </AlertDescription>
        </Alert>

        {/* Search & Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Utility">Utility</SelectItem>
              <SelectItem value="Authentication">Authentication</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="EN">
            <SelectTrigger>
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EN">English</SelectItem>
              <SelectItem value="ES">Spanish</SelectItem>
              <SelectItem value="FR">French</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map(template => (
            <Card
              key={template.id}
              className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="p-6 flex-1">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">{template.name}</h3>
                    <div className="flex items-center gap-2">
                      <Badge className={getCategoryColor(template.category)}>
                        {template.category}
                      </Badge>
                      <Badge variant="outline">{template.language}</Badge>
                    </div>
                  </div>
                  <div className="ml-2">
                    {getStatusIcon(template.status)}
                  </div>
                </div>

                {/* Status */}
                <div className="mb-4">
                  <Badge
                    variant={
                      template.status === 'Approved'
                        ? 'default'
                        : template.status === 'Pending'
                          ? 'secondary'
                          : 'destructive'
                    }
                  >
                    {template.status}
                  </Badge>
                </div>

                {/* Preview */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {template.preview}
                </p>

                {/* Meta Info */}
                <div className="text-xs text-muted-foreground space-y-1 mb-4">
                  <p>Variables: {template.variables}</p>
                  <p>Last used: {template.lastUsed}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-border p-4 flex gap-2">
                {template.status === 'Approved' && (
                  <Button variant="outline" className="flex-1 bg-transparent" size="sm">
                    Use Template
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="px-2">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => openEditDialog(template)}>
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setTemplates(templates.filter(t => t.id !== template.id))}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No templates found</p>
            <Button
              className="bg-primary text-primary-foreground"
              onClick={openCreateDialog}
            >
              Create First Template
            </Button>
          </Card>
        )}

        {/* Create/Edit Template Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTemplate ? 'Edit Template' : 'Create Template'}
              </DialogTitle>
            </DialogHeader>

            <Tabs value={`step-${templateStep}`} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="step-0">Info</TabsTrigger>
                <TabsTrigger value="step-1">Message</TabsTrigger>
                <TabsTrigger value="step-2">Preview</TabsTrigger>
              </TabsList>

              {/* Step 1: Template Info */}
              <TabsContent value="step-0" className="space-y-4 py-4">
                <div>
                  <Label htmlFor="template-name">Template Name</Label>
                  <Input
                    id="template-name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData(prev => ({ ...prev, name: e.target.value }))
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="template-category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData(prev => ({
                        ...prev,
                        category: value as 'Marketing' | 'Utility' | 'Authentication',
                      }))
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Utility">Utility</SelectItem>
                      <SelectItem value="Authentication">Authentication</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="template-language">Language</Label>
                  <Select value={formData.language} onValueChange={(value) =>
                    setFormData(prev => ({ ...prev, language: value }))
                  }>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EN">English</SelectItem>
                      <SelectItem value="ES">Spanish</SelectItem>
                      <SelectItem value="FR">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="template-description">Description</Label>
                  <Textarea
                    id="template-description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData(prev => ({ ...prev, description: e.target.value }))
                    }
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </TabsContent>

              {/* Step 2: Message */}
              <TabsContent value="step-1" className="space-y-4 py-4">
                <div>
                  <Label htmlFor="body-text">Message Body</Label>
                  <Textarea
                    id="body-text"
                    value={formData.bodyText}
                    onChange={(e) =>
                      setFormData(prev => ({ ...prev, bodyText: e.target.value }))
                    }
                    placeholder="Use {{1}}, {{2}}, etc. for variables"
                    rows={6}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Use {'{{1}}'}, {'{{2}}'}, {'{{3}}'}, etc. for dynamic content
                  </p>
                </div>
              </TabsContent>

              {/* Step 3: Preview */}
              <TabsContent value="step-2" className="space-y-4 py-4">
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm font-medium text-foreground mb-3">Message Preview</p>
                  <div className="bg-green-100 dark:bg-green-900 rounded-lg p-4 max-w-sm">
                    <p className="text-sm text-foreground whitespace-pre-wrap">
                      {formData.bodyText || 'Your message preview will appear here...'}
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              {templateStep > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setTemplateStep(templateStep - 1)}
                >
                  Back
                </Button>
              )}
              {templateStep < 2 && (
                <Button
                  type="button"
                  onClick={() => setTemplateStep(templateStep + 1)}
                >
                  Next
                </Button>
              )}
              {templateStep === 2 && (
                <Button
                  type="button"
                  onClick={handleSaveTemplate}
                  disabled={!formData.name.trim() || !formData.bodyText.trim()}
                >
                  {editingTemplate ? 'Update' : 'Submit for'} Approval
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
