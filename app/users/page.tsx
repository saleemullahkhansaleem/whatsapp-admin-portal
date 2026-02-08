'use client'

import React, { useState } from 'react'
import { AdminLayout } from '@/components/admin-layout'
import { Plus, MoreVertical, Search, Shield, User, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const users = [
  {
    id: 1,
    name: 'John Admin',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    joinDate: 'Jan 15, 2024',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
  },
  {
    id: 2,
    name: 'Sarah Manager',
    email: 'sarah@example.com',
    role: 'Manager',
    status: 'Active',
    joinDate: 'Feb 1, 2024',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
  },
  {
    id: 3,
    name: 'Mike Agent',
    email: 'mike@example.com',
    role: 'Agent',
    status: 'Active',
    joinDate: 'Feb 10, 2024',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
  },
  {
    id: 4,
    name: 'Emma Analyst',
    email: 'emma@example.com',
    role: 'Analyst',
    status: 'Inactive',
    joinDate: 'Jan 30, 2024',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
  },
  {
    id: 5,
    name: 'David Support',
    email: 'david@example.com',
    role: 'Support',
    status: 'Active',
    joinDate: 'Feb 5, 2024',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
  },
]

const roleColors: Record<string, string> = {
  Admin: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  Manager: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  Agent: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
  Analyst: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
  Support: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
}

const statusColors: Record<string, string> = {
  Active: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
  Inactive: 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20',
}

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState('team')

  const filteredUsers = users.filter((user) => {
    const searchMatch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const roleMatch = filterRole === 'all' || user.role === filterRole
    return searchMatch && roleMatch
  })

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Users Management</h1>
            <p className="text-muted-foreground">Manage team members and their permissions</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <Button onClick={() => setDialogOpen(true)} className="bg-primary text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
            <DialogContent className="sm:max-w-md bg-card border-border">
              <DialogHeader>
                <DialogTitle className="text-foreground">Add New User</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Invite a new team member to your workspace
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <Label className="text-foreground">Full Name *</Label>
                  <Input placeholder="John Doe" className="bg-background border-input text-foreground mt-2" />
                </div>
                <div>
                  <Label className="text-foreground">Email Address *</Label>
                  <Input type="email" placeholder="john@example.com" className="bg-background border-input text-foreground mt-2" />
                </div>
                <div>
                  <Label className="text-foreground">Role *</Label>
                  <Select>
                    <SelectTrigger className="bg-background border-input text-foreground mt-2">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="agent">Agent</SelectItem>
                      <SelectItem value="analyst">Analyst</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" className="border-border bg-transparent" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-primary text-primary-foreground">Send Invite</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="team">Team Members</TabsTrigger>
            <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
            <TabsTrigger value="invitations">Pending Invitations</TabsTrigger>
          </TabsList>

          {/* Team Members Tab */}
          <TabsContent value="team" className="space-y-6">
            {/* Search & Filter */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 bg-background border-input text-foreground"
                />
              </div>
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-40 bg-background border-input">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Agent">Agent</SelectItem>
                  <SelectItem value="Analyst">Analyst</SelectItem>
                  <SelectItem value="Support">Support</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Users Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <Card key={user.id} className="bg-card border-border">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <CardTitle className="text-base text-card-foreground">{user.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-popover">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Change Password</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Remove User</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge className={roleColors[user.role]}>
                        {user.role}
                      </Badge>
                      <Badge className={statusColors[user.status]}>
                        {user.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Joined {user.joinDate}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Roles & Permissions Tab */}
          <TabsContent value="roles" className="space-y-6">
            <div className="grid gap-6">
              {['Admin', 'Manager', 'Agent', 'Analyst', 'Support'].map((role) => (
                <Card key={role} className="bg-card border-border">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-primary" />
                        <CardTitle className="text-card-foreground">{role}</CardTitle>
                      </div>
                      <Button variant="outline" className="border-border bg-transparent">Edit Permissions</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {role === 'Admin' && 'Full access to all features and settings'}
                      {role === 'Manager' && 'Access to manage campaigns, templates, and team members'}
                      {role === 'Agent' && 'Access to handle customer chats and support tickets'}
                      {role === 'Analyst' && 'Read-only access to reports and analytics'}
                      {role === 'Support' && 'Access to customer support and ticketing system'}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="border-border">View Dashboard</Badge>
                      <Badge variant="outline" className="border-border">Manage Campaigns</Badge>
                      <Badge variant="outline" className="border-border">View Reports</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Pending Invitations Tab */}
          <TabsContent value="invitations" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Pending Invitations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { email: 'alex@example.com', role: 'Agent', sentDate: '2 days ago' },
                    { email: 'jessica@example.com', role: 'Manager', sentDate: '5 days ago' },
                  ].map((invitation, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{invitation.email}</p>
                        <p className="text-sm text-muted-foreground">{invitation.role} • Invited {invitation.sentDate}</p>
                      </div>
                      <Button variant="outline" className="border-border bg-transparent">Resend</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
