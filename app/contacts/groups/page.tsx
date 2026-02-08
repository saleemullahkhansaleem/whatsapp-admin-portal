'use client'

import React, { useState } from 'react'
import { AdminLayout } from '@/components/admin-layout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Alert,
  AlertDescription,
} from '@/components/ui/alert'
import { AlertTriangle, Edit2, Trash2, Eye, MoreVertical, Search } from 'lucide-react'

interface Group {
  id: string
  name: string
  color: string
  description: string
  contactCount: number
  activeCount: number
  inactiveCount: number
  createdDate: string
}

const GROUPS: Group[] = [
  {
    id: '1',
    name: 'VIP Customers',
    color: 'bg-yellow-100 text-yellow-900',
    description: 'High-value customers',
    contactCount: 230,
    activeCount: 225,
    inactiveCount: 5,
    createdDate: 'Jan 15, 2024',
  },
  {
    id: '2',
    name: 'Sales Team',
    color: 'bg-blue-100 text-blue-900',
    description: 'Internal sales team contacts',
    contactCount: 1450,
    activeCount: 1420,
    inactiveCount: 30,
    createdDate: 'Jan 10, 2024',
  },
  {
    id: '3',
    name: 'Newsletter Subscribers',
    color: 'bg-green-100 text-green-900',
    description: 'Newsletter subscribers',
    contactCount: 8900,
    activeCount: 8200,
    inactiveCount: 700,
    createdDate: 'Dec 20, 2023',
  },
  {
    id: '4',
    name: 'Support Priority',
    color: 'bg-red-100 text-red-900',
    description: 'Priority support contacts',
    contactCount: 156,
    activeCount: 145,
    inactiveCount: 11,
    createdDate: 'Feb 1, 2024',
  },
]

const COLORS = ['bg-yellow-100', 'bg-blue-100', 'bg-green-100', 'bg-red-100', 'bg-purple-100']

export default function ContactGroupsPage() {
  const [selectedGroup, setSelectedGroup] = useState<Group>(GROUPS[0])
  const [searchTerm, setSearchTerm] = useState('')
  const [isEditingName, setIsEditingName] = useState(false)
  const [editName, setEditName] = useState(selectedGroup?.name || '')

  const filteredGroups = GROUPS.filter(g =>
    g.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Contact Groups</h1>
            <p className="text-muted-foreground">
              Organize contacts into groups for targeted campaigns
            </p>
          </div>
          <Button className="bg-primary text-primary-foreground">
            + Create Group
          </Button>
        </div>

        <div className="grid grid-cols-5 gap-6 flex-1">
          {/* Left Panel: Groups List */}
          <div className="col-span-2 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search groups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Groups List */}
            <div className="space-y-2">
              {filteredGroups.map((group) => (
                <Card
                  key={group.id}
                  className={`p-4 cursor-pointer transition-all ${
                    selectedGroup?.id === group.id
                      ? 'ring-2 ring-primary bg-accent'
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => setSelectedGroup(group)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold ${group.color}`}
                    >
                      {group.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate">{group.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {group.contactCount} contacts
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Created {group.createdDate}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit2 className="h-4 w-4 mr-2" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          <span>View Contacts</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </Card>
              ))}
            </div>

            {filteredGroups.length === 0 && (
              <Card className="p-8 text-center">
                <div className="text-muted-foreground">
                  <p className="font-semibold mb-2">No groups found</p>
                  <p className="text-sm">Create your first group to organize contacts</p>
                </div>
              </Card>
            )}
          </div>

          {/* Right Panel: Group Details */}
          <div className="col-span-3 space-y-6">
            {selectedGroup && (
              <>
                {/* Group Header */}
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-2xl ${selectedGroup.color}`}
                    >
                      {selectedGroup.name[0]}
                    </div>
                    <div className="flex-1">
                      {isEditingName ? (
                        <Input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="mb-2"
                          autoFocus
                        />
                      ) : (
                        <h2 className="text-2xl font-bold text-foreground">{selectedGroup.name}</h2>
                      )}
                      <p className="text-muted-foreground">{selectedGroup.description}</p>
                      <div className="flex gap-2 mt-4">
                        {isEditingName ? (
                          <>
                            <Button
                              size="sm"
                              onClick={() => {
                                setIsEditingName(false)
                                setEditName(selectedGroup.name)
                              }}
                              variant="outline"
                            >
                              Cancel
                            </Button>
                            <Button size="sm" onClick={() => setIsEditingName(false)}>
                              Save
                            </Button>
                          </>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setIsEditingName(true)
                              setEditName(selectedGroup.name)
                            }}
                          >
                            <Edit2 className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <Card className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">Total Contacts</p>
                    <p className="text-2xl font-bold text-foreground">
                      {selectedGroup.contactCount.toLocaleString()}
                    </p>
                  </Card>
                  <Card className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">Active</p>
                    <p className="text-2xl font-bold text-primary">
                      {selectedGroup.activeCount.toLocaleString()}
                    </p>
                  </Card>
                  <Card className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">Inactive</p>
                    <p className="text-2xl font-bold text-destructive">
                      {selectedGroup.inactiveCount.toLocaleString()}
                    </p>
                  </Card>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="contacts">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="contacts">Contacts</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>

                  <TabsContent value="contacts" className="space-y-4">
                    <Card>
                      <div className="p-4 border-b border-border flex gap-2">
                        <Input placeholder="Search contacts..." className="flex-1" />
                        <Button variant="outline">Add Contacts</Button>
                        <Button variant="outline" className="text-destructive bg-transparent">
                          Remove Selected
                        </Button>
                      </div>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-12">
                                <input type="checkbox" className="rounded border border-input" />
                              </TableHead>
                              <TableHead>Name</TableHead>
                              <TableHead>Phone</TableHead>
                              <TableHead>Email</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Date Added</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {[
                              {
                                id: '1',
                                name: 'John Doe',
                                phone: '+1 987654321',
                                email: 'john@example.com',
                                status: 'Active',
                                date: 'Jan 15, 2024',
                              },
                              {
                                id: '2',
                                name: 'Jane Smith',
                                phone: '+1 876543210',
                                email: 'jane@example.com',
                                status: 'Active',
                                date: 'Jan 14, 2024',
                              },
                            ].map((contact) => (
                              <TableRow key={contact.id}>
                                <TableCell>
                                  <input
                                    type="checkbox"
                                    className="rounded border border-input"
                                  />
                                </TableCell>
                                <TableCell className="font-medium">{contact.name}</TableCell>
                                <TableCell>{contact.phone}</TableCell>
                                <TableCell>{contact.email}</TableCell>
                                <TableCell>
                                  <Badge variant="outline">{contact.status}</Badge>
                                </TableCell>
                                <TableCell className="text-muted-foreground">{contact.date}</TableCell>
                                <TableCell>
                                  <Button variant="ghost" size="sm">
                                    View
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </Card>
                  </TabsContent>

                  <TabsContent value="settings" className="space-y-4">
                    <Card className="p-6">
                      <div className="space-y-4">
                        <div>
                          <Label>Group Name</Label>
                          <Input value={selectedGroup.name} className="mt-2" />
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={selectedGroup.description}
                            rows={3}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label>Group Color</Label>
                          <div className="flex gap-2 mt-2">
                            {COLORS.map((color) => (
                              <button
                                key={color}
                                className={`w-10 h-10 rounded-lg border-2 transition-all ${color} ${
                                  selectedGroup.color === color
                                    ? 'border-primary ring-2 ring-offset-2 ring-primary'
                                    : 'border-border'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label>Privacy</Label>
                          <RadioGroup defaultValue="public" className="mt-2">
                            <div className="flex items-center gap-2 mb-2">
                              <RadioGroupItem value="public" id="public" />
                              <Label htmlFor="public" className="cursor-pointer">
                                Public
                              </Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <RadioGroupItem value="private" id="private" />
                              <Label htmlFor="private" className="cursor-pointer">
                                Private
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </Card>

                    {/* Danger Zone */}
                    <Card className="p-6 border-destructive">
                      <Alert className="mb-4 border-destructive bg-destructive/10">
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                        <AlertDescription className="text-destructive">
                          This action cannot be undone
                        </AlertDescription>
                      </Alert>
                      <Button variant="destructive" className="w-full">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Group
                      </Button>
                    </Card>

                    <div className="flex gap-2 pt-4 border-t border-border">
                      <Button variant="outline" className="flex-1 bg-transparent">
                        Cancel
                      </Button>
                      <Button className="flex-1">Save Changes</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
