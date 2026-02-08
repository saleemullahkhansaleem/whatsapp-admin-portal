'use client'

import React, { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'

interface ContactModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  contact?: {
    id: string
    name: string
    phone: string
    email: string
    company: string
    address: string
    notes: string
    groups: string[]
    tags: string[]
    status: 'active' | 'inactive' | 'blocked'
  }
}

const GROUPS = ['VIP', 'Sales Team', 'Newsletter']
const EXISTING_TAGS = ['VIP', 'New Lead', 'Customer', 'Inactive']

export function ContactModal({ open, onOpenChange, contact }: ContactModalProps) {
  const [formData, setFormData] = useState(
    contact || {
      id: '',
      name: '',
      phone: '',
      email: '',
      company: '',
      address: '',
      notes: '',
      groups: [],
      tags: [],
      status: 'active' as const,
    }
  )

  const [newTag, setNewTag] = useState('')
  const [countryCode, setCountryCode] = useState('+1')

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleGroupToggle = (group: string) => {
    setFormData(prev => ({
      ...prev,
      groups: prev.groups.includes(group)
        ? prev.groups.filter(g => g !== group)
        : [...prev.groups, group],
    }))
  }

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag],
      }))
      setNewTag('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag),
    }))
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-[500px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {contact ? 'Edit Contact' : 'Add New Contact'}
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Basic Information</h3>

            <div>
              <Label htmlFor="name">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone">
                Phone Number <span className="text-destructive">*</span>
              </Label>
              <div className="flex gap-2 mt-1">
                <Select value={countryCode} onValueChange={setCountryCode}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+1">+1</SelectItem>
                    <SelectItem value="+44">+44</SelectItem>
                    <SelectItem value="+91">+91</SelectItem>
                    <SelectItem value="+55">+55</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          {/* Section 2: Additional Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Additional Details</h3>

            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                placeholder="Company name"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                placeholder="Street address"
                rows={3}
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add notes..."
                rows={4}
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          {/* Section 3: Organization */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Organization</h3>

            <div>
              <Label>Assign to Groups</Label>
              <div className="mt-2 space-y-2">
                {GROUPS.map(group => (
                  <div key={group} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`group-${group}`}
                      checked={formData.groups.includes(group)}
                      onChange={() => handleGroupToggle(group)}
                      className="rounded border border-input"
                    />
                    <Label htmlFor={`group-${group}`} className="cursor-pointer">
                      {group}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Add Tags</Label>
              <div className="mt-2 flex gap-2">
                <Select defaultValue="">
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select or type tag..." />
                  </SelectTrigger>
                  <SelectContent>
                    {EXISTING_TAGS.map(tag => (
                      <SelectItem key={tag} value={tag}>
                        {tag}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setNewTag('')}
                  className="px-3"
                >
                  Add
                </Button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {formData.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X size={14} />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: Status */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact Status</h3>
            <RadioGroup
              value={formData.status}
              onValueChange={(value) =>
                handleInputChange('status', value)
              }
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="active" id="status-active" />
                <Label htmlFor="status-active" className="cursor-pointer">
                  Active
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="inactive" id="status-inactive" />
                <Label htmlFor="status-inactive" className="cursor-pointer">
                  Inactive
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="blocked" id="status-blocked" />
                <Label htmlFor="status-blocked" className="cursor-pointer">
                  Blocked
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
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="flex-1"
            onClick={() => {
              // Handle save
              onOpenChange(false)
            }}
          >
            Save Contact
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
