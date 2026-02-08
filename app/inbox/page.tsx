'use client'

import React, { useState } from 'react'
import { AdminLayout } from '@/components/admin-layout'
import {
  Search,
  MoreVertical,
  Send,
  Smile,
  Phone,
  Archive,
  CheckCheck,
  Plus
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

const chats = [
  {
    id: 1,
    name: 'John Doe',
    lastMessage: 'Thanks for the info...',
    timestamp: '2m',
    unread: 3,
    online: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    lastMessage: 'When will it arrive?',
    timestamp: '15m',
    unread: 1,
    online: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah'
  },
  {
    id: 3,
    name: 'Mike Wilson',
    lastMessage: 'Hello',
    timestamp: '1h',
    unread: 0,
    online: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike'
  },
  {
    id: 4,
    name: 'Emma Davis',
    lastMessage: 'Thanks!',
    timestamp: '2h',
    unread: 0,
    online: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma'
  },
  {
    id: 5,
    name: 'David Martinez',
    lastMessage: 'Can you help?',
    timestamp: '3h',
    unread: 0,
    online: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david'
  },
]

const messages = [
  { id: 1, sender: 'other', text: 'Hi, I need help with my order', time: '10:30 AM' },
  { id: 2, sender: 'self', text: 'Of course! What\'s your order number?', time: '10:31 AM', read: true },
  { id: 3, sender: 'other', text: '#12345', time: '10:32 AM' },
  { id: 4, sender: 'self', text: 'Thank you! Let me check that for you.', time: '10:33 AM', read: true },
  { id: 5, sender: 'self', text: 'Your order is currently being prepared and will ship tomorrow.', time: '10:34 AM', read: true },
  { id: 6, sender: 'other', text: 'Great! Thanks for the quick response', time: '10:35 AM' },
]

export default function InboxPage() {
  const [selectedChat, setSelectedChat] = useState(chats[0])
  const [messageInput, setMessageInput] = useState('')
  const [filterTab, setFilterTab] = useState('all')

  const filteredChats = chats.filter(chat => {
    if (filterTab === 'unread') return chat.unread > 0
    return true
  })

  return (
    <AdminLayout isPadding={false}>
      <div className="flex h-[calc(100vh-4rem)] bg-background gap-0">
        {/* Left Panel: Chat List */}
        <div className="w-96 bg-card border-r border-border flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-foreground">Inbox</h1>
              <span className="bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded-full">
                {chats.filter(c => c.unread > 0).reduce((sum, c) => sum + c.unread, 0)}
              </span>
            </div>

            {/* Search */}
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full px-4 py-2 pl-10 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={filterTab} onValueChange={setFilterTab} className="border-b border-border">
            <TabsList className="w-full rounded-none bg-background border-b border-border">
              <TabsTrigger value="all" className="flex-1">All ({chats.length})</TabsTrigger>
              <TabsTrigger value="unread" className="flex-1">
                Unread ({chats.filter(c => c.unread > 0).length})
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {filteredChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`w-full px-6 py-3 border-b border-border flex items-center gap-3 hover:bg-muted transition-colors text-left ${selectedChat.id === chat.id ? 'bg-muted' : ''
                  }`}
              >
                <div className="relative flex-shrink-0">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={chat.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{chat.name.split(' ')[0][0]}</AvatarFallback>
                  </Avatar>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-background"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-foreground text-sm">{chat.name}</p>
                    <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                </div>

                {chat.unread > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full flex-shrink-0">
                    {chat.unread}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Bottom Actions */}
          <div className="border-t border-border p-4 space-y-2">
            <button className="w-full px-4 py-2 text-muted-foreground hover:bg-muted rounded-lg text-sm flex items-center gap-2 transition-colors">
              <Archive size={16} />
              Archive
            </button>
          </div>
        </div>

        {/* Middle Panel: Chat Conversation */}
        <div className="flex-1 flex flex-col bg-card">
          {/* Chat Header */}
          <div className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={selectedChat.avatar || "/placeholder.svg"} />
                <AvatarFallback>{selectedChat.name.split(' ')[0][0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-foreground">{selectedChat.name}</p>
                <p className="text-xs text-muted-foreground">
                  {selectedChat.online ? 'Online' : 'Last seen 2 hours ago'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground">
                <Search size={20} />
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground">
                    <MoreVertical size={20} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Contact</DropdownMenuItem>
                  <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Delete Chat</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'self' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-sm px-4 py-2 rounded-2xl ${msg.sender === 'self'
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-muted text-foreground rounded-bl-none'
                    }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <div className={`text-xs mt-1 flex items-center gap-1 ${msg.sender === 'self' ? 'text-primary-foreground/80' : 'text-muted-foreground'
                    }`}>
                    <span>{msg.time}</span>
                    {msg.sender === 'self' && msg.read && <CheckCheck size={14} />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="bg-card p-4">
            <div className="flex items-end gap-3">

              <div className="flex-1 flex items-center bg-muted rounded-full p-2">
                <Button variant="ghost" size="icon" className='rounded-full hover:bg-foreground/20'>
                  <Plus />
                </Button>
                <Button variant="ghost" size="icon" className='rounded-full hover:bg-foreground/20'>
                  <Smile />
                </Button>
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent focus:outline-none text-foreground placeholder:text-muted-foreground"
                />
                <Button size="icon" className='rounded-full'>
                  <Send />
                </Button>
              </div>

            </div>
          </div>
        </div>

        {/* Right Panel: Contact Info */}
        <div className="w-80 bg-card border-l border-border overflow-y-auto">
          {/* Contact Profile */}
          <div className="p-6 border-b border-border text-center">
            <Avatar className="w-20 h-20 mx-auto mb-4">
              <AvatarImage src={selectedChat.avatar || "/placeholder.svg"} />
              <AvatarFallback>{selectedChat.name.split(' ')[0][0]}</AvatarFallback>
            </Avatar>
            <h3 className="font-bold text-foreground mb-1">{selectedChat.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">+1 (555) 234-5678</p>
            <p className="text-xs text-muted-foreground mb-4">sarah.j@example.com</p>

            {/* Tags */}
            <div className="flex gap-2 justify-center mb-4 flex-wrap">
              <span className="bg-yellow-500/20 text-yellow-700 dark:text-yellow-500 text-xs px-2 py-1 rounded-full">VIP</span>
              <span className="bg-blue-500/20 text-blue-700 dark:text-blue-500 text-xs px-2 py-1 rounded-full">Sales</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-b border-border space-y-2">
            <button className="w-full px-4 py-2 text-primary border border-border rounded-lg hover:bg-muted transition-colors text-sm flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              Call Contact
            </button>
            <button className="w-full px-4 py-2 text-primary border border-border rounded-lg hover:bg-muted transition-colors text-sm flex items-center justify-center gap-2">
              <UserPlus className="w-4 h-4" />
              Assign to Agent
            </button>
          </div>

          {/* Chat Details */}
          <div className="p-4 border-b border-border space-y-4">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Chat Started</p>
              <p className="text-sm text-foreground">Jan 15, 2024 10:30 AM</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Total Messages</p>
              <p className="text-sm text-foreground">45</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Assigned to</p>
              <p className="text-sm text-foreground">Sarah Johnson (Support)</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Priority</p>
              <select className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          {/* Notes Section */}
          <div className="p-4 border-b border-border">
            <h4 className="text-sm font-semibold text-foreground mb-3">Notes</h4>
            <div className="space-y-2 mb-3">
              <div className="bg-muted rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Customer interested in premium plan upgrade - follow up needed</p>
                <p className="text-xs text-muted-foreground/70 mt-1">Sarah Johnson - 2 hours ago</p>
              </div>
            </div>
            <button className="w-full px-3 py-2 border border-border rounded-lg text-sm text-muted-foreground hover:bg-muted transition-colors">
              + Add Note
            </button>
          </div>

          {/* Templates */}
          <div className="p-4">
            <h4 className="text-sm font-semibold text-foreground mb-3">Quick Templates</h4>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors text-xs text-muted-foreground">
                ✓ Order confirmation message
              </button>
              <button className="w-full text-left px-3 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors text-xs text-muted-foreground">
                ✓ Shipping notification
              </button>
              <button className="w-full text-left px-3 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors text-xs text-muted-foreground">
                ✓ Follow-up message
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

function UserPlus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <line x1="20" y1="8" x2="20" y2="14" />
      <line x1="23" y1="11" x2="17" y2="11" />
    </svg>
  )
}
