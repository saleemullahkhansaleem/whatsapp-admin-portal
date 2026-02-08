'use client'

import React, { useState } from 'react'
import { AdminLayout } from '@/components/admin-layout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Plus,
  Edit2,
  Copy,
  Trash2,
  MoreVertical,
  AlertCircle,
  Zap,
  MessageCircle,
} from 'lucide-react'

interface AutoReply {
  id: string
  name: string
  enabled: boolean
  triggerType: 'exact' | 'contains' | 'starts' | 'ends'
  triggers: string[]
  response: string
  priority: number
  triggered: number
  lastTriggered: string
  successRate: number
  schedule: 'always' | 'business' | 'custom'
  scheduleTime?: { start: string; end: string; days: string[] }
}

const AUTO_REPLIES: AutoReply[] = [
  {
    id: '1',
    name: 'Welcome Message',
    enabled: true,
    triggerType: 'exact',
    triggers: ['hi', 'hello', 'hey'],
    response: 'Welcome! How can I help you today?',
    priority: 1,
    triggered: 2540,
    lastTriggered: '2 minutes ago',
    successRate: 98,
    schedule: 'always',
  },
  {
    id: '2',
    name: 'Pricing Inquiry',
    enabled: true,
    triggerType: 'contains',
    triggers: ['price', 'pricing', 'cost', 'quote'],
    response: 'Our pricing starts at $99/month. Would you like more details about our plans?',
    priority: 2,
    triggered: 890,
    lastTriggered: '1 hour ago',
    successRate: 95,
    schedule: 'business',
  },
  {
    id: '3',
    name: 'Support Hours',
    enabled: true,
    triggerType: 'contains',
    triggers: ['support', 'help', 'issue', 'problem'],
    response: 'Our support team is available Mon-Fri 9AM-6PM EST. How can we assist you?',
    priority: 3,
    triggered: 1240,
    lastTriggered: 'Just now',
    successRate: 92,
    schedule: 'business',
  },
]

export default function AutoRepliesPage() {
  const [rules, setRules] = useState<AutoReply[]>(AUTO_REPLIES)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editingRule, setEditingRule] = useState<AutoReply | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    triggerType: 'exact' as 'exact' | 'contains' | 'starts' | 'ends',
    triggers: [] as string[],
    response: '',
    priority: 1,
    schedule: 'always' as 'always' | 'business' | 'custom',
  })
  const [newTrigger, setNewTrigger] = useState('')
  const [phone, setPhone] = useState('')
  const [time, setTime] = useState('')

  const openCreateDialog = () => {
    setEditingRule(null)
    setFormData({
      name: '',
      triggerType: 'exact',
      triggers: [],
      response: '',
      priority: 1,
      schedule: 'always',
    })
    setNewTrigger('')
    setPhone('')
    setTime('')
    setSheetOpen(true)
  }

  const openEditDialog = (rule: AutoReply) => {
    setEditingRule(rule)
    setFormData({
      name: rule.name,
      triggerType: rule.triggerType,
      triggers: [...rule.triggers],
      response: rule.response,
      priority: rule.priority,
      schedule: rule.schedule,
    })
    setNewTrigger('')
    setPhone('')
    setTime('')
    setSheetOpen(true)
  }

  const handleAddTrigger = () => {
    if (newTrigger.trim() && !formData.triggers.includes(newTrigger)) {
      setFormData(prev => ({
        ...prev,
        triggers: [...prev.triggers, newTrigger],
      }))
      setNewTrigger('')
    }
  }

  const handleRemoveTrigger = (trigger: string) => {
    setFormData(prev => ({
      ...prev,
      triggers: prev.triggers.filter(t => t !== trigger),
    }))
  }

  const handleSaveRule = () => {
    if (!formData.name.trim() || !formData.response.trim() || formData.triggers.length === 0) {
      return
    }

    if (editingRule) {
      setRules(
        rules.map(r =>
          r.id === editingRule.id
            ? {
              ...r,
              name: formData.name,
              triggerType: formData.triggerType,
              triggers: formData.triggers,
              response: formData.response,
              priority: formData.priority,
              schedule: formData.schedule,
            }
            : r
        )
      )
    } else {
      const newRule: AutoReply = {
        id: Math.random().toString(),
        name: formData.name,
        enabled: true,
        triggerType: formData.triggerType,
        triggers: formData.triggers,
        response: formData.response,
        priority: formData.priority,
        triggered: 0,
        lastTriggered: 'Never',
        successRate: 100,
        schedule: formData.schedule,
      }
      setRules([...rules, newRule])
    }
    setSheetOpen(false)
  }

  const handleToggleRule = (id: string) => {
    setRules(
      rules.map(r => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    )
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Auto Replies</h1>
            <p className="text-muted-foreground">
              Set up automatic responses to common messages
            </p>
          </div>
          <Button
            className="bg-primary text-primary-foreground"
            onClick={openCreateDialog}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Rule
          </Button>
        </div>

        {/* Info Alert */}
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Auto replies run independently from the flow builder and trigger instantly when conditions match
          </AlertDescription>
        </Alert>

        {/* Rules List */}
        <div className="space-y-4">
          {rules.map(rule => (
            <Card key={rule.id} className="overflow-hidden">
              <div className="p-6">
                {/* Header Row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4 flex-1">
                    <Switch
                      checked={rule.enabled}
                      onCheckedChange={() => handleToggleRule(rule.id)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-foreground">{rule.name}</h3>
                        {rule.enabled && (
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        )}
                      </div>

                      {/* Trigger Section */}
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="text-xs">
                          {rule.triggerType === 'exact' && 'Exact Match'}
                          {rule.triggerType === 'contains' && 'Contains'}
                          {rule.triggerType === 'starts' && 'Starts With'}
                          {rule.triggerType === 'ends' && 'Ends With'}
                        </Badge>
                        <div className="flex gap-1 flex-wrap">
                          {rule.triggers.map(trigger => (
                            <Badge
                              key={trigger}
                              variant="secondary"
                              className="font-mono text-xs"
                            >
                              "{trigger}"
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Response Preview */}
                      <p className="text-sm text-muted-foreground line-clamp-1 mb-3">
                        {rule.response}
                      </p>

                      {/* Stats Row */}
                      <div className="flex gap-6 text-xs">
                        <div>
                          <span className="text-muted-foreground">Triggered: </span>
                          <span className="font-semibold text-foreground">
                            {rule.triggered.toLocaleString()} times
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Last triggered: </span>
                          <span className="font-semibold text-foreground">
                            {rule.lastTriggered}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Success rate: </span>
                          <span className="font-semibold text-foreground">
                            {rule.successRate}%
                          </span>
                        </div>
                      </div>

                      {/* Schedule */}
                      <div className="flex items-center gap-2 mt-3 text-xs">
                        <Zap className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {rule.schedule === 'always' && '24/7'}
                          {rule.schedule === 'business' && 'Business hours'}
                          {rule.schedule === 'custom' && 'Custom schedule'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEditDialog(rule)}>
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openEditDialog(rule)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setRules(rules.filter(r => r.id !== rule.id))}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Create/Edit Rule Sheet */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent side="right" className="w-full sm:max-w-[600px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>
                {editingRule ? 'Edit Auto Reply Rule' : 'Create Auto Reply Rule'}
              </SheetTitle>
            </SheetHeader>

            <div className="space-y-6 py-6">
              {/* Section 1: Rule Details */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Rule Details</h3>

                <div>
                  <Label htmlFor="rule-name">Rule Name</Label>
                  <Input
                    id="rule-name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData(prev => ({ ...prev, name: e.target.value }))
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={formData.priority.toString()}
                    onValueChange={(value) =>
                      setFormData(prev => ({ ...prev, priority: parseInt(value) }))
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map(p => (
                        <SelectItem key={p} value={p.toString()}>
                          Priority {p} {p === 1 ? '(Highest)' : p === 5 ? '(Lowest)' : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Higher priority rules trigger first
                  </p>
                </div>
              </div>

              {/* Section 2: Trigger Conditions */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Trigger Conditions</h3>

                <div>
                  <Label>Trigger Type</Label>
                  <Select
                    value={formData.triggerType}
                    onValueChange={(value) =>
                      setFormData(prev => ({
                        ...prev,
                        triggerType: value as 'exact' | 'contains' | 'starts' | 'ends',
                      }))
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="exact">Exact match</SelectItem>
                      <SelectItem value="contains">Contains phrase</SelectItem>
                      <SelectItem value="starts">Starts with</SelectItem>
                      <SelectItem value="ends">Ends with</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Trigger Keywords</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      placeholder="Type keyword..."
                      value={newTrigger}
                      onChange={(e) => setNewTrigger(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleAddTrigger()
                        }
                      }}
                    />
                    <Button type="button" variant="outline" onClick={handleAddTrigger}>
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.triggers.map(trigger => (
                      <Badge key={trigger} variant="secondary" className="flex items-center gap-1">
                        {trigger}
                        <button
                          onClick={() => handleRemoveTrigger(trigger)}
                          className="ml-1 hover:text-destructive"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 3: Response */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Response</h3>

                <div>
                  <Label htmlFor="response">Message Text</Label>
                  <Textarea
                    id="response"
                    value={formData.response}
                    onChange={(e) =>
                      setFormData(prev => ({ ...prev, response: e.target.value }))
                    }
                    placeholder="Enter response message..."
                    rows={4}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    You can use variables like {'{{name}}'}, {'{{phone}}'}, {'{{time}}'}
                  </p>
                </div>
              </div>

              {/* Section 4: Schedule */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Schedule</h3>

                <RadioGroup value={formData.schedule} onValueChange={(value) =>
                  setFormData(prev => ({
                    ...prev,
                    schedule: value as 'always' | 'business' | 'custom',
                  }))
                }>
                  <div className="flex items-center gap-2 mb-2">
                    <RadioGroupItem value="always" id="always" />
                    <Label htmlFor="always" className="cursor-pointer">
                      Always active (24/7)
                    </Label>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <RadioGroupItem value="business" id="business" />
                    <Label htmlFor="business" className="cursor-pointer">
                      Business hours only (9AM-6PM, Mon-Fri)
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="custom" id="custom" />
                    <Label htmlFor="custom" className="cursor-pointer">
                      Custom schedule
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 border-t border-border bg-muted/50 -mx-6 px-6 py-4 sticky bottom-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSheetOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSaveRule}
                disabled={
                  !formData.name.trim() ||
                  !formData.response.trim() ||
                  formData.triggers.length === 0
                }
                className="flex-1"
              >
                {editingRule ? 'Update Rule' : 'Create Rule'}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </AdminLayout>
  )
}
