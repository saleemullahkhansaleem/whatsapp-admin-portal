'use client'

import React, { useState } from 'react'
import { AdminLayout } from '@/components/admin-layout'
import {
  Bold,
  Italic,
  Smile,
  ImageIcon,
  Video,
  FileText,
  Plus,
  ChevronLeft,
  ChevronRight,
  Send,
  Clock,
  Download
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function MessageComposerPage() {
  const [messageText, setMessageText] = useState('Hi {name}, check out our latest offer!')
  const [selectedTab, setSelectedTab] = useState('text')
  const [buttons, setButtons] = useState([
    { text: 'Shop Now', type: 'url', value: 'https://example.com' },
    { text: 'Learn More', type: 'url', value: 'https://example.com/learn' }
  ])

  const characterCount = messageText.length
  const maxCharacters = 1000

  const addButton = () => {
    setButtons([...buttons, { text: '', type: 'url', value: '' }])
  }

  const removeButton = (index: number) => {
    setButtons(buttons.filter((_, i) => i !== index))
  }

  const updateButton = (index: number, field: string, value: string) => {
    const newButtons = [...buttons]
    newButtons[index] = { ...newButtons[index], [field]: value }
    setButtons(newButtons)
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Compose Message</h1>
              <p className="text-muted-foreground">Step 2 of 4: Message Composer</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">To: 2,680 recipients</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Panel: Composer */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
              <TabsList className="grid grid-cols-3 bg-muted p-1 rounded-lg">
                <TabsTrigger value="text" className="text-sm">Text</TabsTrigger>
                <TabsTrigger value="media" className="text-sm flex items-center gap-2">
                  <ImageIcon size={16} />
                  Media
                </TabsTrigger>
                <TabsTrigger value="buttons" className="text-sm">Interactive</TabsTrigger>
              </TabsList>

              {/* Text Tab */}
              <TabsContent value="text" className="mt-6">
                <div className="bg-card rounded-lg border border-border overflow-hidden">
                  {/* Formatting Toolbar */}
                  <div className="bg-muted border-b border-border px-4 py-3 flex gap-2">
                    <button className="p-2 hover:bg-card rounded transition-colors text-muted-foreground" title="Bold">
                      <Bold size={18} />
                    </button>
                    <button className="p-2 hover:bg-card rounded transition-colors text-muted-foreground" title="Italic">
                      <Italic size={18} />
                    </button>
                    <div className="w-px bg-border"></div>
                    <button className="p-2 hover:bg-card rounded transition-colors text-muted-foreground" title="Emoji">
                      <Smile size={18} />
                    </button>
                    <div className="flex-1"></div>
                    <select className="px-3 py-1 bg-card border border-border rounded text-sm text-muted-foreground">
                      <option>Insert Variable</option>
                      <option>{'{name}'}</option>
                      <option>{'{phone}'}</option>
                      <option>{'{company}'}</option>
                    </select>
                  </div>

                  {/* Text Area */}
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value.slice(0, maxCharacters))}
                    className="w-full p-4 focus:outline-none resize-none text-foreground bg-card"
                    rows={8}
                    placeholder="Type your message..."
                  />

                  {/* Character Counter */}
                  <div className="px-4 py-3 bg-muted border-t border-border text-right">
                    <span className={`text-sm ${characterCount > maxCharacters * 0.8 ? 'text-amber-600' : 'text-muted-foreground'
                      }`}>
                      {characterCount}/{maxCharacters}
                    </span>
                  </div>
                </div>
              </TabsContent>

              {/* Media Tab */}
              <TabsContent value="media" className="mt-6">
                <div className="bg-card rounded-lg border border-border p-6">
                  <h3 className="font-semibold text-foreground mb-4">Add Media</h3>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <button className="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-border rounded-lg hover:border-primary transition-colors">
                      <ImageIcon size={24} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Image</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-border rounded-lg hover:border-primary transition-colors">
                      <Video size={24} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Video</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-border rounded-lg hover:border-primary transition-colors">
                      <FileText size={24} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Document</span>
                    </button>
                  </div>

                  <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                    <p className="text-sm text-primary">
                      Media will be displayed above your message text in the conversation.
                    </p>
                  </div>
                </div>
              </TabsContent>

              {/* Interactive Tab */}
              <TabsContent value="buttons" className="mt-6">
                <div className="bg-card rounded-lg border border-border p-6">
                  <h3 className="font-semibold text-foreground mb-4">Interactive Buttons (Max 3)</h3>

                  <div className="space-y-4 mb-6">
                    {buttons.map((button, idx) => (
                      <div key={idx} className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-muted-foreground">Button {idx + 1}</span>
                          {buttons.length > 1 && (
                            <button
                              onClick={() => removeButton(idx)}
                              className="text-destructive text-sm hover:underline"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={button.text}
                            onChange={(e) => updateButton(idx, 'text', e.target.value)}
                            placeholder="Button text"
                            className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary bg-background text-foreground"
                          />
                          <select
                            value={button.type}
                            onChange={(e) => updateButton(idx, 'type', e.target.value)}
                            className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary bg-background text-foreground"
                          >
                            <option value="url">URL</option>
                            <option value="phone">Phone</option>
                            <option value="reply">Quick Reply</option>
                          </select>
                        </div>
                        <input
                          type="text"
                          value={button.value}
                          onChange={(e) => updateButton(idx, 'value', e.target.value)}
                          placeholder="URL or value"
                          className="w-full px-3 py-2 mt-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary bg-background text-foreground"
                        />
                      </div>
                    ))}
                  </div>

                  {buttons.length < 3 && (
                    <button
                      onClick={addButton}
                      className="w-full px-4 py-2 border-2 border-dashed border-border rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus size={16} />
                      Add Another Button
                    </button>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Panel: Preview */}
          <div className="lg:col-span-2">
            {/* Preview Header */}
            <div className="bg-card rounded-lg border border-border overflow-hidden sticky top-8">
              <div className="px-6 py-4 border-b border-border bg-muted">
                <h3 className="font-semibold text-foreground">Message Preview</h3>
              </div>

              {/* Phone Mockup */}
              <div className="px-6 py-4">
                <div className="bg-gradient-to-b from-muted to-card rounded-2xl overflow-hidden border border-border shadow-lg">
                  {/* Phone Header */}
                  <div className="bg-teal-600 dark:bg-teal-700 text-white px-4 py-3 flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-lg">👤</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">John Doe</p>
                      <p className="text-xs text-white/70">Online</p>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="px-4 py-4 space-y-4 min-h-[400px] bg-card">
                    {/* Sent message bubble */}
                    <div className="flex justify-end">
                      <div className="bg-emerald-500 dark:bg-emerald-600 text-white rounded-2xl rounded-tr-none px-4 py-3 max-w-xs text-sm">
                        {messageText.replace(/{name}/g, 'John')}
                      </div>
                    </div>

                    {/* Buttons Preview */}
                    {buttons.length > 0 && (
                      <div className="flex flex-col gap-2">
                        {buttons.map((button, idx) => (
                          <button
                            key={idx}
                            className="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
                          >
                            {button.text || `Button ${idx + 1}`}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Timestamp */}
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">2:34 PM</p>
                    </div>
                  </div>

                  {/* Input Area */}
                  <div className="bg-muted px-4 py-3 border-t border-border">
                    <div className="flex items-center gap-2">
                      <button className="text-muted-foreground">➕</button>
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 px-3 py-2 bg-card border border-border rounded-lg text-sm text-foreground"
                      />
                      <button className="text-emerald-500 dark:text-emerald-400">📎</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Test Send */}
              <div className="px-6 py-4 border-t border-border bg-muted">
                <p className="text-sm font-medium text-foreground mb-3">Send Test Message</p>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary bg-card text-foreground"
                  />
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
                    <Send size={16} />
                    Test
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button className="px-6 py-2 border border-border text-muted-foreground rounded-lg hover:bg-muted transition-colors flex items-center gap-2">
            <ChevronLeft size={18} />
            Back
          </button>
          <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-lg transition-shadow flex items-center gap-2">
            Next: Schedule
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </AdminLayout>
  )
}
