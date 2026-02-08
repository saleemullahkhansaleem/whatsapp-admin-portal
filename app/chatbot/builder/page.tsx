'use client'

import { useState } from 'react'
import { AdminLayout } from '@/components/admin-layout'
import {
  Save,
  Play,
  Send,
  Plus,
  Minus,
  Maximize2,
  Trash2,
  Zap,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'

const NODE_TYPES = {
  trigger: { icon: Zap, color: 'bg-violet-500/20 dark:bg-violet-500/30 border-violet-400 dark:border-violet-600', textColor: 'text-violet-700 dark:text-violet-400' },
  action: { icon: Send, color: 'bg-blue-500/20 dark:bg-blue-500/30 border-blue-400 dark:border-blue-600', textColor: 'text-blue-700 dark:text-blue-400' },
  logic: { icon: AlertCircle, color: 'bg-amber-500/20 dark:bg-amber-500/30 border-amber-400 dark:border-amber-600', textColor: 'text-amber-700 dark:text-amber-400' },
  end: { icon: CheckCircle2, color: 'bg-emerald-500/20 dark:bg-emerald-500/30 border-emerald-400 dark:border-emerald-600', textColor: 'text-emerald-700 dark:text-emerald-400' }
}

const toolboxNodes = [
  { type: 'trigger', label: 'Welcome Message', description: 'Triggered when chat starts' },
  { type: 'trigger', label: 'Keyword Trigger', description: 'Trigger on specific word' },
  { type: 'action', label: 'Send Message', description: 'Send a text message' },
  { type: 'action', label: 'Send Media', description: 'Send image/video' },
  { type: 'action', label: 'Ask Question', description: 'Prompt for user input' },
  { type: 'logic', label: 'Condition', description: 'If/else branching' },
  { type: 'logic', label: 'Delay', description: 'Wait before action' },
  { type: 'end', label: 'Human Handoff', description: 'Transfer to agent' },
  { type: 'end', label: 'End Chat', description: 'End conversation' }
]

const FlowNode = ({
  type,
  title,
  content,
  selected = false,
  onSelect,
  onDelete
}: {
  type: string
  title: string
  content: string
  selected?: boolean
  onSelect?: () => void
  onDelete?: () => void
}) => {
  const nodeStyle = NODE_TYPES[type as keyof typeof NODE_TYPES]

  return (
    <div
      onClick={onSelect}
      className={`rounded-lg border-2 shadow-sm hover:shadow-md transition-all cursor-pointer min-w-[240px] ${selected ? 'border-primary shadow-lg' : nodeStyle.color
        } bg-card`}
    >
      {/* Node Header */}
      <div className={`px-4 py-3 ${selected ? 'bg-primary/10' : ''}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {nodeStyle.icon && <nodeStyle.icon size={16} className={selected ? 'text-primary' : nodeStyle.textColor} />}
            <span className={`font-semibold text-sm ${selected ? 'text-primary' : nodeStyle.textColor}`}>
              {title}
            </span>
          </div>
          {selected && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete?.()
              }}
              className="text-destructive hover:bg-destructive/10 p-1 rounded"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Node Content */}
      <div className="px-4 py-3 border-t border-border text-xs text-muted-foreground">
        {content}
      </div>

      {/* Connection Points */}
      <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-border rounded-full border border-background"></div>
      <div className="absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-border rounded-full border border-background"></div>
    </div>
  )
}

export default function ChatbotBuilderPage() {
  const [botName, setBotName] = useState('Customer Support Bot')
  const [botActive, setBotActive] = useState(true)
  const [zoom, setZoom] = useState(100)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [nodeSettings, setNodeSettings] = useState({
    message: 'Hi! Welcome to our service. How can I help you today?',
    delay: 'Instant'
  })

  return (
    <AdminLayout isPadding={false}>
      <div className="flex h-full bg-background">
        {/* Left Sidebar: Toolbox */}
        <div className="w-56 bg-card border-r border-border overflow-y-auto">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-foreground text-sm mb-3">Node Types</h3>
          </div>

          <div className="p-4 space-y-2">
            {Object.entries(NODE_TYPES).map(([key, style]) => (
              <div key={key}>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2 mt-3">{key}s</h4>
                {toolboxNodes
                  .filter(node => node.type === key)
                  .map((node, idx) => (
                    <div
                      key={idx}
                      draggable
                      className={`p-3 rounded-lg border-2 border-dashed ${style.color} cursor-move hover:shadow-md transition-all mb-2`}
                    >
                      <p className={`text-xs font-semibold ${style.textColor}`}>{node.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">{node.description}</p>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col bg-muted">
          {/* Top Toolbar */}
          <div className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div>
                <input
                  type="text"
                  value={botName}
                  onChange={(e) => setBotName(e.target.value)}
                  className="font-bold text-foreground focus:outline-none border-b border-transparent hover:border-border pb-1 bg-transparent"
                />
                <p className="text-xs text-muted-foreground">Last modified: Feb 8, 2024 3:45 PM</p>
              </div>

              <div className="flex items-center gap-2 ml-6">
                <span className="text-sm text-muted-foreground">Status:</span>
                <button
                  onClick={() => setBotActive(!botActive)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${botActive ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-background rounded-full transition-transform ${botActive ? 'translate-x-6' : 'translate-x-0'
                      }`}
                  ></div>
                </button>
                <span className={`text-sm font-medium ${botActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  {botActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-2 text-sm">
                <Save size={16} />
                Save Draft
              </button>
              <button className="px-3 py-2 border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-500/10 transition-colors flex items-center gap-2 text-sm font-medium">
                <Play size={16} />
                Test Bot
              </button>
              <button className="px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-lg transition-shadow flex items-center gap-2 text-sm font-medium">
                <CheckCircle2 size={16} />
                Publish
              </button>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 overflow-auto relative bg-muted">
            <div className="absolute inset-0 p-8">
              {/* Canvas Content */}
              <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }} className="transition-transform duration-200">
                <div className="space-y-8 max-w-2xl">
                  {/* Welcome Trigger Node */}
                  <div className="relative flex justify-center">
                    <FlowNode
                      type="trigger"
                      title="Welcome Message"
                      content="Triggers when user starts chat"
                      selected={selectedNode === 'welcome'}
                      onSelect={() => setSelectedNode('welcome')}
                    />
                  </div>

                  {/* Connection Line */}
                  <div className="flex justify-center">
                    <div className="w-0.5 h-12 bg-gradient-to-b from-muted-foreground/30 to-primary"></div>
                  </div>

                  {/* Send Message Node */}
                  <div className="relative flex justify-center">
                    <FlowNode
                      type="action"
                      title="Send Message"
                      content="Hi! Welcome to our service"
                      selected={selectedNode === 'sendMsg'}
                      onSelect={() => setSelectedNode('sendMsg')}
                    />
                  </div>

                  {/* Connection Line */}
                  <div className="flex justify-center">
                    <div className="w-0.5 h-12 bg-gradient-to-b from-muted-foreground/30 to-primary"></div>
                  </div>

                  {/* Menu Node */}
                  <div className="relative flex justify-center">
                    <FlowNode
                      type="action"
                      title="Menu Options"
                      content="Ask: How can I help you?"
                      selected={selectedNode === 'menu'}
                      onSelect={() => setSelectedNode('menu')}
                    />
                  </div>

                  {/* Branching */}
                  <div className="relative h-12">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-4 bg-primary"></div>
                    <div className="absolute top-4 left-0 right-0 h-1 bg-primary"></div>

                    {/* Left branch */}
                    <div className="absolute top-4 left-1/4 -translate-x-1/2 h-1 w-1 bg-primary"></div>
                    <div className="absolute top-5 left-1/4 -translate-x-1/2 w-0.5 h-6 bg-primary"></div>

                    {/* Center branch */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 h-1 w-1 bg-primary"></div>
                    <div className="absolute top-5 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-primary"></div>

                    {/* Right branch */}
                    <div className="absolute top-4 right-1/4 -translate-x-1/2 h-1 w-1 bg-primary"></div>
                    <div className="absolute top-5 right-1/4 -translate-x-1/2 w-0.5 h-6 bg-primary"></div>
                  </div>

                  {/* End Nodes - Three branches */}
                  <div className="grid grid-cols-3 gap-8">
                    <div className="relative flex justify-center">
                      <FlowNode
                        type="action"
                        title="Pricing"
                        content="Send price list"
                        selected={selectedNode === 'pricing'}
                        onSelect={() => setSelectedNode('pricing')}
                      />
                    </div>
                    <div className="relative flex justify-center">
                      <FlowNode
                        type="action"
                        title="Support"
                        content="Connect to agent"
                        selected={selectedNode === 'support'}
                        onSelect={() => setSelectedNode('support')}
                      />
                    </div>
                    <div className="relative flex justify-center">
                      <FlowNode
                        type="action"
                        title="Products"
                        content="Show catalog"
                        selected={selectedNode === 'products'}
                        onSelect={() => setSelectedNode('products')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Toolbar */}
          <div className="bg-card border-t border-border px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Zoom:</span>
              <button
                onClick={() => setZoom(Math.max(50, zoom - 10))}
                className="p-1 hover:bg-muted rounded"
              >
                <Minus size={16} />
              </button>
              <span className="text-sm font-medium w-12 text-center">{zoom}%</span>
              <button
                onClick={() => setZoom(Math.min(200, zoom + 10))}
                className="p-1 hover:bg-muted rounded"
              >
                <Plus size={16} />
              </button>
              <div className="w-px h-6 bg-border"></div>
              <button className="p-1 hover:bg-muted rounded" title="Fit to screen">
                <Maximize2 size={16} />
              </button>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Undo / Redo</span>
            </div>
          </div>
        </div>

        {/* Right Properties Panel */}
        {selectedNode && (
          <div className="w-80 bg-card border-l border-border overflow-y-auto">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">Node Settings</h3>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Message Text</label>
                <textarea
                  value={nodeSettings.message}
                  onChange={(e) => setNodeSettings({ ...nodeSettings, message: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground placeholder-muted-foreground"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Add Media</label>
                <button className="w-full px-3 py-2 border border-border rounded-lg text-sm text-muted-foreground hover:bg-muted">
                  Upload Media
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Add Buttons</label>
                <button className="w-full px-3 py-2 border border-border rounded-lg text-sm text-muted-foreground hover:bg-muted">
                  + Add Button
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Delay Before Sending</label>
                <select
                  value={nodeSettings.delay}
                  onChange={(e) => setNodeSettings({ ...nodeSettings, delay: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                >
                  <option>Instant</option>
                  <option>1 second</option>
                  <option>2 seconds</option>
                  <option>5 seconds</option>
                </select>
              </div>

              <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
