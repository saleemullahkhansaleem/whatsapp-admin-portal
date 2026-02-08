'use client'

import React, { useState } from 'react'
import { AdminLayout } from '@/components/admin-layout'
import {
  Upload,
  Check,
  ChevronRight,
  ChevronLeft,
  Info,
  Cloud,
  Download
} from 'lucide-react'

const steps = [
  { number: 1, label: 'Recipients' },
  { number: 2, label: 'Message' },
  { number: 3, label: 'Schedule' },
  { number: 4, label: 'Review' },
]

export default function CreateBroadcastPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedOption, setSelectedOption] = useState('all')
  const [selectedGroups, setSelectedGroups] = useState<string[]>([])

  const groups = [
    { name: 'VIP', count: 230 },
    { name: 'Sales Team', count: 1450 },
    { name: 'Newsletter', count: 8900 },
  ]

  const toggleGroup = (groupName: string) => {
    setSelectedGroups(prev =>
      prev.includes(groupName)
        ? prev.filter(g => g !== groupName)
        : [...prev, groupName]
    )
  }

  const getTotalRecipients = () => {
    if (selectedOption === 'all') return 10542
    if (selectedOption === 'groups') {
      return groups
        .filter(g => selectedGroups.includes(g.name))
        .reduce((sum, g) => sum + g.count, 0)
    }
    return 0
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1F2937] mb-2">Create Broadcast Campaign</h1>
          <p className="text-[#6B7280]">Set up a new broadcast campaign in 4 steps</p>
        </div>

        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, idx) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${currentStep >= step.number
                        ? 'bg-[#25D366] text-white'
                        : 'bg-[#E5E7EB] text-[#6B7280]'
                      }`}
                  >
                    {currentStep > step.number ? (
                      <Check size={20} />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${currentStep >= step.number ? 'text-[#25D366]' : 'text-[#6B7280]'
                    }`}>
                    {step.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 mb-6 ${currentStep > step.number
                        ? 'bg-[#25D366]'
                        : 'bg-[#E5E7EB]'
                      }`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-8 border border-[#E5E7EB]">
            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-[#1F2937] mb-6">Select Recipients</h2>

                <div className="space-y-4">
                  {/* Option 1: All Contacts */}
                  <label className="flex items-start gap-4 p-4 border-2 border-[#E5E7EB] rounded-lg cursor-pointer hover:bg-[#F8F9FA] transition-colors" style={{ borderColor: selectedOption === 'all' ? '#25D366' : '#E5E7EB' }}>
                    <input
                      type="radio"
                      name="recipient-option"
                      value="all"
                      checked={selectedOption === 'all'}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="w-5 h-5 mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-[#1F2937] mb-1">All Contacts</div>
                      <div className="text-sm text-[#6B7280]">Send to all 10,542 contacts in your database</div>
                      <div className="flex items-center gap-1 mt-2 text-xs text-[#3B82F6]">
                        <Info size={14} />
                        <span>View all segments</span>
                      </div>
                    </div>
                  </label>

                  {/* Option 2: Select Groups */}
                  <label className="flex items-start gap-4 p-4 border-2 border-[#E5E7EB] rounded-lg cursor-pointer hover:bg-[#F8F9FA] transition-colors" style={{ borderColor: selectedOption === 'groups' ? '#25D366' : '#E5E7EB' }}>
                    <input
                      type="radio"
                      name="recipient-option"
                      value="groups"
                      checked={selectedOption === 'groups'}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="w-5 h-5 mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-[#1F2937] mb-3">Select Groups</div>
                      <div className="space-y-2">
                        {groups.map((group) => (
                          <label
                            key={group.name}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={selectedGroups.includes(group.name)}
                              onChange={() => toggleGroup(group.name)}
                              disabled={selectedOption !== 'groups'}
                              className="w-4 h-4"
                            />
                            <span className="text-sm text-[#6B7280]">
                              {group.name} ({group.count.toLocaleString()})
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </label>

                  {/* Option 3: Upload New List */}
                  <label className="flex items-start gap-4 p-4 border-2 border-[#E5E7EB] rounded-lg cursor-pointer hover:bg-[#F8F9FA] transition-colors" style={{ borderColor: selectedOption === 'upload' ? '#25D366' : '#E5E7EB' }}>
                    <input
                      type="radio"
                      name="recipient-option"
                      value="upload"
                      checked={selectedOption === 'upload'}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="w-5 h-5 mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-[#1F2937] mb-3">Upload New List</div>
                      <div className="border-2 border-dashed border-[#3B82F6] rounded-lg p-6 text-center bg-blue-50">
                        <Cloud size={32} className="mx-auto text-[#3B82F6] mb-2" />
                        <p className="text-sm font-medium text-[#3B82F6]">Drag CSV/Excel here or click to browse</p>
                        <p className="text-xs text-[#6B7280] mt-1">Max 50MB file size</p>
                      </div>
                      <button className="text-xs text-[#3B82F6] hover:underline mt-2">
                        Download Sample Template
                      </button>
                    </div>
                  </label>

                  {/* Option 4: Custom Filter */}
                  <label className="flex items-start gap-4 p-4 border-2 border-[#E5E7EB] rounded-lg cursor-pointer hover:bg-[#F8F9FA] transition-colors" style={{ borderColor: selectedOption === 'filter' ? '#25D366' : '#E5E7EB' }}>
                    <input
                      type="radio"
                      name="recipient-option"
                      value="filter"
                      checked={selectedOption === 'filter'}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="w-5 h-5 mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-[#1F2937] mb-3">Custom Filter</div>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <select disabled={selectedOption !== 'filter'} className="flex-1 px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm">
                            <option>Tag equals</option>
                          </select>
                          <select disabled={selectedOption !== 'filter'} className="flex-1 px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm">
                            <option>Select tag</option>
                          </select>
                        </div>
                        <div className="flex gap-2">
                          <select disabled={selectedOption !== 'filter'} className="flex-1 px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm">
                            <option>Last message date</option>
                          </select>
                          <input disabled={selectedOption !== 'filter'} type="date" className="flex-1 px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm" />
                        </div>
                        <button disabled={selectedOption !== 'filter'} className="text-xs text-[#3B82F6] hover:underline">
                          + Add condition
                        </button>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="text-center text-[#6B7280] py-12">
                <p className="mb-4">Step 2: Compose your message</p>
                <p className="text-sm">This screen will contain message composition tools, media upload, and template options.</p>
              </div>
            )}

            {currentStep === 3 && (
              <div className="text-center text-[#6B7280] py-12">
                <p className="mb-4">Step 3: Schedule your campaign</p>
                <p className="text-sm">Choose when to send your broadcast campaign.</p>
              </div>
            )}

            {currentStep === 4 && (
              <div className="text-center text-[#6B7280] py-12">
                <p className="mb-4">Step 4: Review and confirm</p>
                <p className="text-sm">Review all campaign details before sending.</p>
              </div>
            )}
          </div>

          {/* Right Sidebar: Recipients Summary */}
          {currentStep === 1 && (
            <div className="lg:col-span-2">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 sticky top-8">
                <h3 className="text-lg font-bold text-[#1F2937] mb-4">Recipients Summary</h3>

                <div className="bg-white rounded-lg p-4 mb-6 border border-[#E5E7EB]">
                  <div className="text-3xl font-bold text-[#25D366] mb-1">
                    {getTotalRecipients().toLocaleString()}
                  </div>
                  <p className="text-sm text-[#6B7280]">recipients selected</p>
                </div>

                {selectedOption === 'groups' && selectedGroups.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-[#1F2937] mb-3">Breakdown by Group</h4>
                    <div className="space-y-2">
                      {groups
                        .filter(g => selectedGroups.includes(g.name))
                        .map((group) => (
                          <div key={group.name} className="flex justify-between text-sm">
                            <span className="text-[#6B7280]">{group.name}</span>
                            <span className="font-medium text-[#1F2937]">{group.count.toLocaleString()}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB] mb-6">
                  <div className="flex items-start gap-2 mb-3">
                    <Info size={16} className="text-[#3B82F6] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-[#1F2937] mb-1">Estimated Cost</p>
                      <p className="text-2xl font-bold text-[#1F2937]">
                        ${(getTotalRecipients() * 0.002).toFixed(2)}
                      </p>
                      <p className="text-xs text-[#6B7280]">$0.002 per message</p>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-[#6B7280] bg-white rounded-lg p-3 border border-[#E5E7EB]">
                  <p className="mb-2 font-semibold text-[#1F2937]">Campaign Estimate</p>
                  <p>Based on your selection, this campaign will reach {getTotalRecipients().toLocaleString()} contacts.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-6 py-2 border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F8F9FA] transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <ChevronLeft size={18} />
            Cancel
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
            className="px-6 py-2 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white rounded-lg hover:shadow-lg transition-shadow flex items-center gap-2"
          >
            {currentStep === 4 ? 'Send Campaign' : 'Next: ' + steps[currentStep].label}
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </AdminLayout>
  )
}
