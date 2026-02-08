'use client'

import React, { useState } from 'react'
import { AdminLayout } from '@/components/admin-layout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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
import { Badge } from '@/components/ui/badge'
import { Edit2, Trash2, MoreVertical, Search } from 'lucide-react'

interface Tag {
  id: string
  name: string
  color: string
  contactCount: number
  createdDate: string
  description: string
}

const TAGS: Tag[] = [
  {
    id: '1',
    name: 'VIP',
    color: '#F59E0B',
    contactCount: 245,
    createdDate: 'Jan 15, 2024',
    description: 'High-value customers',
  },
  {
    id: '2',
    name: 'New Lead',
    color: '#3B82F6',
    contactCount: 890,
    createdDate: 'Jan 20, 2024',
    description: 'Recently acquired leads',
  },
  {
    id: '3',
    name: 'Customer',
    color: '#10B981',
    contactCount: 3200,
    createdDate: 'Dec 10, 2023',
    description: 'Active customers',
  },
  {
    id: '4',
    name: 'Inactive',
    color: '#6B7280',
    contactCount: 156,
    createdDate: 'Feb 1, 2024',
    description: 'Inactive contacts',
  },
]

const COLOR_OPTIONS = [
  '#F59E0B', // Amber
  '#3B82F6', // Blue
  '#10B981', // Green
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#14B8A6', // Teal
  '#6B7280', // Gray
]

export default function TagsManagementPage() {
  const [tags, setTags] = useState<Tag[]>(TAGS)
  const [searchTerm, setSearchTerm] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTag, setEditingTag] = useState<Tag | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    color: '#3B82F6',
    description: '',
  })

  const filteredTags = tags.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const openCreateDialog = () => {
    setEditingTag(null)
    setFormData({ name: '', color: '#3B82F6', description: '' })
    setDialogOpen(true)
  }

  const openEditDialog = (tag: Tag) => {
    setEditingTag(tag)
    setFormData({
      name: tag.name,
      color: tag.color,
      description: tag.description,
    })
    setDialogOpen(true)
  }

  const handleSaveTag = () => {
    if (!formData.name.trim()) return

    if (editingTag) {
      setTags(tags.map(t =>
        t.id === editingTag.id
          ? { ...t, name: formData.name, color: formData.color, description: formData.description }
          : t
      ))
    } else {
      const newTag: Tag = {
        id: Math.random().toString(),
        name: formData.name,
        color: formData.color,
        contactCount: 0,
        createdDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        description: formData.description,
      }
      setTags([...tags, newTag])
    }
    setDialogOpen(false)
  }

  const handleDeleteTag = (id: string) => {
    setTags(tags.filter(t => t.id !== id))
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Tags Management</h1>
            <p className="text-muted-foreground">Create and manage contact tags</p>
          </div>
          <Button
            className="bg-primary text-primary-foreground"
            onClick={openCreateDialog}
          >
            + Create Tag
          </Button>
        </div>

        {/* Search & Filter */}
        <div className="mb-6 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tags Table */}
        <Card>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tag</TableHead>
                  <TableHead>Tag Name</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead>Contacts</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTags.length > 0 ? (
                  filteredTags.map((tag, idx) => (
                    <TableRow
                      key={tag.id}
                      className={idx % 2 === 0 ? 'bg-background' : 'bg-muted/50'}
                    >
                      <TableCell>
                        <Badge style={{ backgroundColor: tag.color }} className="text-white">
                          {tag.name}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{tag.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-6 h-6 rounded border border-border"
                            style={{ backgroundColor: tag.color }}
                          />
                          <span className="text-sm text-muted-foreground">{tag.color}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {tag.contactCount.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{tag.createdDate}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditDialog(tag)}>
                              <Edit2 className="h-4 w-4 mr-2" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteTag(tag.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <p className="text-muted-foreground">No tags found</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Create/Edit Tag Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingTag ? 'Edit Tag' : 'Create New Tag'}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="tag-name">Tag Name</Label>
                <Input
                  id="tag-name"
                  placeholder="e.g., VIP"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, name: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Color</Label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {COLOR_OPTIONS.map(color => (
                    <button
                      key={color}
                      className={`w-10 h-10 rounded border-2 transition-all ${formData.color === color
                          ? 'ring-2 ring-offset-2 ring-primary border-primary'
                          : 'border-border'
                        }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setFormData(prev => ({ ...prev, color }))}
                    />
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="tag-description">Description</Label>
                <Textarea
                  id="tag-description"
                  placeholder="Add optional description..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, description: e.target.value }))
                  }
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Preview</Label>
                <div className="mt-2">
                  <Badge style={{ backgroundColor: formData.color }} className="text-white">
                    {formData.name || 'New Tag'}
                  </Badge>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSaveTag}
                disabled={!formData.name.trim()}
              >
                {editingTag ? 'Update Tag' : 'Create Tag'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
