'use client'

import React, { useState } from 'react'
import { AdminLayout } from '@/components/admin-layout'
import { Save, Lock, Bell, Palette, Database, Shield, Zap, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'

export default function SettingsPage() {
  const [notificationEmail, setNotificationEmail] = useState(true)
  const [notificationSMS, setNotificationSMS] = useState(false)
  const [notificationPush, setNotificationPush] = useState(true)

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your workspace settings and preferences</p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="integration">Integration</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          {/* General Settings Tab */}
          <TabsContent value="general" className="space-y-6">
            {/* Workspace Settings */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Workspace Settings
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Manage your workspace name and branding
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-foreground">Workspace Name *</Label>
                  <Input
                    placeholder="My Workspace"
                    defaultValue="WhatsApp Broadcasting"
                    className="bg-background border-input text-foreground mt-2"
                  />
                </div>
                <div>
                  <Label className="text-foreground">Workspace Timezone *</Label>
                  <Select>
                    <SelectTrigger className="bg-background border-input mt-2">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">EST (UTC-5)</SelectItem>
                      <SelectItem value="cst">CST (UTC-6)</SelectItem>
                      <SelectItem value="pst">PST (UTC-8)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-foreground">Language *</Label>
                  <Select>
                    <SelectTrigger className="bg-background border-input mt-2">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="bg-primary text-primary-foreground">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            {/* WhatsApp Settings */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">WhatsApp Configuration</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Configure your WhatsApp Business Account credentials
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-foreground">Phone Number ID *</Label>
                  <Input
                    placeholder="Enter your phone number ID"
                    className="bg-background border-input text-foreground mt-2"
                  />
                </div>
                <div>
                  <Label className="text-foreground">Business Account ID *</Label>
                  <Input
                    placeholder="Enter your business account ID"
                    className="bg-background border-input text-foreground mt-2"
                  />
                </div>
                <div>
                  <Label className="text-foreground">Access Token *</Label>
                  <Input
                    type="password"
                    placeholder="Enter your access token"
                    className="bg-background border-input text-foreground mt-2"
                  />
                </div>
                <Button className="bg-primary text-primary-foreground">
                  <Zap className="h-4 w-4 mr-2" />
                  Test Connection
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Choose how you want to be notified about important events
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email Notifications */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-foreground">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch checked={notificationEmail} onCheckedChange={setNotificationEmail} />
                  </div>
                  {notificationEmail && (
                    <div className="ml-0 space-y-2 pt-3 border-t border-border">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm text-foreground">Campaign notifications</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm text-foreground">Message alerts</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm text-foreground">Weekly reports</span>
                      </label>
                    </div>
                  )}
                </div>

                <Separator className="bg-border" />

                {/* SMS Notifications */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-foreground">SMS Notifications</h4>
                      <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                    </div>
                    <Switch checked={notificationSMS} onCheckedChange={setNotificationSMS} />
                  </div>
                </div>

                <Separator className="bg-border" />

                {/* Push Notifications */}
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">Push Notifications</h4>
                      <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                    </div>
                    <Switch checked={notificationPush} onCheckedChange={setNotificationPush} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integration Tab */}
          <TabsContent value="integration" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">API Integrations</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Connect external services and tools
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: 'Slack', description: 'Get notifications in your Slack workspace', connected: true },
                  { name: 'Zapier', description: 'Automate workflows with Zapier', connected: false },
                  { name: 'Google Sheets', description: 'Sync data to Google Sheets', connected: false },
                  { name: 'Webhooks', description: 'Custom webhook integrations', connected: true },
                ].map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{integration.name}</p>
                      <p className="text-sm text-muted-foreground">{integration.description}</p>
                    </div>
                    <Button variant={integration.connected ? 'outline' : 'default'} className={!integration.connected ? 'bg-primary text-primary-foreground' : 'border-border'}>
                      {integration.connected ? 'Disconnect' : 'Connect'}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-3">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground mb-4">Add an extra layer of security to your account</p>
                  <Button variant="outline" className="border-border bg-transparent">Enable 2FA</Button>
                </div>

                <Separator className="bg-border" />

                <div>
                  <h4 className="font-medium text-foreground mb-3">Active Sessions</h4>
                  <div className="space-y-3">
                    {[
                      { device: 'Chrome on Windows', location: 'New York, USA', lastActive: '2 minutes ago' },
                      { device: 'Safari on iPhone', location: 'New York, USA', lastActive: '1 hour ago' },
                    ].map((session, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border border-border rounded">
                        <div>
                          <p className="text-sm font-medium text-foreground">{session.device}</p>
                          <p className="text-xs text-muted-foreground">{session.location} • Last active {session.lastActive}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-destructive">Remove</Button>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="bg-border" />

                <div>
                  <h4 className="font-medium text-foreground mb-3">Change Password</h4>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-foreground">Current Password</Label>
                      <Input type="password" className="bg-background border-input text-foreground mt-1" />
                    </div>
                    <div>
                      <Label className="text-foreground">New Password</Label>
                      <Input type="password" className="bg-background border-input text-foreground mt-1" />
                    </div>
                    <div>
                      <Label className="text-foreground">Confirm Password</Label>
                      <Input type="password" className="bg-background border-input text-foreground mt-1" />
                    </div>
                    <Button className="bg-primary text-primary-foreground">Update Password</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Billing Information</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Manage your subscription and billing details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Current Plan</span>
                    <span className="font-semibold text-foreground">Pro Plan</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Billing Cycle</span>
                    <span className="font-semibold text-foreground">Monthly ($99/month)</span>
                  </div>
                </div>

                <Separator className="bg-border" />

                <div>
                  <h4 className="font-medium text-foreground mb-3">Payment Method</h4>
                  <div className="p-4 border border-border rounded-lg">
                    <p className="text-sm font-medium text-foreground">Visa ending in 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 12/2026</p>
                    <Button variant="outline" className="border-border mt-3 bg-transparent" size="sm">Update Payment Method</Button>
                  </div>
                </div>

                <Separator className="bg-border" />

                <div>
                  <h4 className="font-medium text-foreground mb-3">Plan Features</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      Unlimited contacts
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      Advanced analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      Priority support
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      Custom integrations
                    </li>
                  </ul>
                </div>

                <Separator className="bg-border" />

                <div className="flex gap-2">
                  <Button variant="outline" className="border-border bg-transparent">Upgrade Plan</Button>
                  <Button variant="outline" className="border-border text-destructive bg-transparent">Cancel Subscription</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
