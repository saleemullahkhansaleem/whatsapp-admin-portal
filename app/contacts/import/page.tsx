'use client'

import React, { useState } from 'react'
import { AdminLayout } from '@/components/admin-layout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  AlertCircle,
  CloudUpload,
  Download,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  const steps = ['Upload File', 'Map Columns', 'Preview & Import']
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, idx) => (
        <div key={step} className="flex items-center flex-1">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
              idx < currentStep
                ? 'bg-primary border-primary text-primary-foreground'
                : idx === currentStep
                  ? 'bg-primary border-primary text-primary-foreground'
                  : 'bg-background border-border text-muted-foreground'
            }`}
          >
            {idx < currentStep ? (
              <CheckCircle2 size={20} />
            ) : (
              <span className="font-semibold">{idx + 1}</span>
            )}
          </div>
          <div
            className={`flex-1 h-0.5 mx-2 transition-all ${
              idx < currentStep ? 'bg-primary' : 'bg-border'
            }`}
          />
          <span
            className={`text-sm font-medium ${
              idx <= currentStep ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            {step}
          </span>
          {idx < steps.length - 1 && (
            <div className={`flex-1 h-0.5 mx-2 transition-all ${
              idx < currentStep ? 'bg-primary' : 'bg-border'
            }`} />
          )}
        </div>
      ))}
    </div>
  )
}

const recentImports = [
  { fileName: 'customers_jan.csv', date: 'Jan 15, 2024', count: 1240, status: 'Success' },
  { fileName: 'newsletter_sub.xlsx', date: 'Jan 10, 2024', count: 890, status: 'Success' },
  { fileName: 'leads_batch.csv', date: 'Jan 5, 2024', count: 450, status: 'Failed' },
]

export default function ImportContactsPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [fileName, setFileName] = useState('')
  const [isImporting, setIsImporting] = useState(false)
  const [importProgress, setImportProgress] = useState(0)
  const [duplicateHandling, setDuplicateHandling] = useState('skip')

  const handleFileUpload = (e: React.DragEvent | React.ChangeEvent) => {
    let file: File | null = null
    if ('dataTransfer' in e) {
      file = e.dataTransfer.files[0]
      e.preventDefault()
    } else {
      file = (e.target as HTMLInputElement).files?.[0] || null
    }
    if (file) {
      setFileName(file.name)
    }
  }

  const handleImport = async () => {
    setIsImporting(true)
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200))
      setImportProgress(i)
    }
    setIsImporting(false)
  }

  return (
    <AdminLayout>
      <div className="p-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Import Contacts</h1>
          <p className="text-muted-foreground">Upload and manage your contact list</p>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} />

        {/* Step 1: Upload File */}
        {currentStep === 0 && (
          <div className="space-y-6">
            {/* Upload Section */}
            <Card className="border-2 border-dashed p-12">
              <div className="text-center">
                <CloudUpload className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <p className="text-lg font-semibold text-foreground mb-2">
                  Drag & drop your file here
                </p>
                <p className="text-muted-foreground mb-6">or</p>
                <Button asChild>
                  <label className="cursor-pointer">
                    Browse Files
                    <input
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      hidden
                      onChange={handleFileUpload}
                      onDrop={handleFileUpload}
                    />
                  </label>
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  Supported formats: CSV, Excel (.xlsx, .xls) • Maximum 10MB
                </p>
                {fileName && (
                  <p className="text-sm text-primary font-medium mt-2">
                    Selected file: {fileName}
                  </p>
                )}
              </div>
            </Card>

            {/* Download Template */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Download className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="font-semibold text-foreground">Don&apos;t have a file ready?</p>
                  <p className="text-sm text-muted-foreground">
                    Download our sample CSV template to get started
                  </p>
                  <Button variant="link" className="mt-2 h-auto p-0">
                    Download sample CSV template
                  </Button>
                </div>
              </div>
            </Card>

            {/* Recent Imports */}
            <Card>
              <div className="p-6 border-b border-border">
                <h3 className="font-semibold text-foreground">Recent Imports</h3>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>File Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Contacts</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentImports.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{item.fileName}</TableCell>
                        <TableCell className="text-muted-foreground">{item.date}</TableCell>
                        <TableCell>{item.count}</TableCell>
                        <TableCell>
                          <Badge
                            variant={item.status === 'Success' ? 'default' : 'destructive'}
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </div>
        )}

        {/* Step 2: Map Columns */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Match your CSV columns to system fields. Required fields must be mapped.
              </AlertDescription>
            </Alert>

            <Card>
              <div className="p-6 border-b border-border">
                <h3 className="font-semibold text-foreground">Column Mapping</h3>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { csv: 'Customer Name', system: 'Name' },
                  { csv: 'Phone', system: 'Phone Number' },
                  { csv: 'Email Address', system: 'Email' },
                  { csv: 'Company', system: 'Company' },
                  { csv: 'Tags', system: 'Tags' },
                ].map((mapping, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{mapping.csv}</p>
                      <p className="text-sm text-muted-foreground">Your CSV column</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <Select defaultValue={mapping.system.toLowerCase()}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="name">Name</SelectItem>
                          <SelectItem value="phone">Phone Number</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="company">Company</SelectItem>
                          <SelectItem value="tags">Tags</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Preview */}
            <Card>
              <div className="p-6 border-b border-border">
                <h3 className="font-semibold text-foreground">Preview First 5 Rows</h3>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Company</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: 'John Doe', phone: '+1 9876543210', email: 'john@example.com', company: 'Tech Corp' },
                      { name: 'Jane Smith', phone: '+1 8765432109', email: 'jane@example.com', company: 'Design Inc' },
                      { name: 'Bob Johnson', phone: '+1 7654321098', email: 'bob@example.com', company: 'Sales Ltd' },
                    ].map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{row.name}</TableCell>
                        <TableCell>{row.phone}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.company}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </div>
        )}

        {/* Step 3: Preview & Confirm */}
        {currentStep === 2 && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Total Rows', value: '1,234' },
                { label: 'Valid Contacts', value: '1,180' },
                { label: 'Duplicates Found', value: '45' },
                { label: 'Errors', value: '9' },
              ].map((stat, idx) => (
                <Card key={idx} className="p-4">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
                </Card>
              ))}
            </div>

            {/* Duplicate Handling */}
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Handle Duplicates</h3>
              <RadioGroup value={duplicateHandling} onValueChange={setDuplicateHandling}>
                <div className="flex items-center gap-2 mb-3">
                  <RadioGroupItem value="skip" id="skip" />
                  <Label htmlFor="skip" className="cursor-pointer">Skip duplicates</Label>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <RadioGroupItem value="update" id="update" />
                  <Label htmlFor="update" className="cursor-pointer">Update existing contacts</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="new" id="new" />
                  <Label htmlFor="new" className="cursor-pointer">Import as new contacts</Label>
                </div>
              </RadioGroup>
            </Card>

            {/* Errors */}
            <Card>
              <div className="p-6 border-b border-border">
                <h3 className="font-semibold text-foreground">Errors (9)</h3>
              </div>
              <Accordion type="single" collapsible>
                {[
                  { row: 12, field: 'Phone', issue: 'Invalid format', fix: 'Check phone number format' },
                  { row: 45, field: 'Email', issue: 'Invalid email', fix: 'Verify email address' },
                  { row: 78, field: 'Name', issue: 'Empty field', fix: 'Name is required' },
                ].map((error, idx) => (
                  <AccordionItem key={idx} value={`error-${idx}`}>
                    <AccordionTrigger className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      <span>Row {error.row} - {error.field}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm"><span className="font-medium">Issue:</span> {error.issue}</p>
                      <p className="text-sm mt-2"><span className="font-medium">Fix:</span> {error.fix}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>

            {/* Import Progress */}
            {isImporting && (
              <Card className="p-6">
                <p className="text-sm text-muted-foreground mb-3">Importing contacts...</p>
                <Progress value={importProgress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">{importProgress}% complete</p>
              </Card>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-8 pt-6 border-t border-border">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="flex-1"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          {currentStep === 2 ? (
            <Button
              onClick={handleImport}
              disabled={isImporting}
              className="flex-1"
            >
              {isImporting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Importing...
                </>
              ) : (
                <>Import 1,180 Contacts</>
              )}
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={currentStep === 0 && !fileName}
              className="flex-1"
            >
              {currentStep === 0 ? 'Next: Map Columns' : 'Next: Preview Import'}
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
