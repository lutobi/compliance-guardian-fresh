'use client'

import { useState } from 'react'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

interface EvidenceDialogProps {
  isOpen: boolean
  onClose: () => void
  evidence: string[]
  onEvidenceChange: (evidence: string[]) => void
}

export default function EvidenceDialog({ isOpen, onClose, evidence = [], onEvidenceChange }: EvidenceDialogProps) {
  const [newEvidence, setNewEvidence] = useState('')
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editingText, setEditingText] = useState('')

  if (!isOpen) return null

  const handleSave = () => {
    const trimmedEvidence = newEvidence.trim()
    if (trimmedEvidence) {
      onEvidenceChange([...evidence, trimmedEvidence])
      setNewEvidence('')
    }
  }

  const handleRemove = (indexToRemove: number) => {
    onEvidenceChange(evidence.filter((_, index) => index !== indexToRemove))
  }

  const startEditing = (index: number) => {
    setEditingIndex(index)
    setEditingText(evidence[index])
  }

  const handleEdit = () => {
    if (editingIndex !== null && editingText.trim()) {
      const updatedEvidence = [...evidence]
      updatedEvidence[editingIndex] = editingText.trim()
      onEvidenceChange(updatedEvidence)
      setEditingIndex(null)
      setEditingText('')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-lg w-full mx-4">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Manage Evidence</h2>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <textarea
              value={newEvidence}
              onChange={(e) => setNewEvidence(e.target.value)}
              className="w-full h-32 p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-y text-gray-900 dark:text-white"
              placeholder="Add new evidence here..."
            />
          </div>

          {evidence.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Current Evidence</h3>
              <div className="space-y-2">
                {evidence.map((item, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    {editingIndex === index ? (
                      <div className="flex-1 flex items-center gap-2">
                        <textarea
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          className="flex-1 p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white"
                        />
                        <button
                          onClick={handleEdit}
                          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingIndex(null)}
                          className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <p className="flex-1 text-sm text-gray-900 dark:text-white">{item}</p>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => startEditing(index)}
                            className="p-1 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-500 rounded transition-colors"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleRemove(index)}
                            className="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-500 rounded transition-colors"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!newEvidence.trim()}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Evidence
          </button>
        </div>
      </div>
    </div>
  )
}
