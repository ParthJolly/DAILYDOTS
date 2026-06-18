import { useState, useEffect } from 'react'
import { UseJournal } from '@/Hooks/UseJournal'
import { JournalEditor } from '@/Components/Journal/JournalEditor'
import { JournalEntry, MoodType } from '@/Types/JournalEntry'

interface AddJournalPageProps {
  readonly entry?: JournalEntry | null
  readonly onSave: () => void
  readonly onCancel: () => void
}

export function AddJournalPage({ entry, onSave, onCancel }: AddJournalPageProps) {
  const { createEntry, updateEntry, deleteEntry } = UseJournal()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSave = async (data: {
    date: string
    title: string
    content: string
    mood?: MoodType
  }) => {
    setIsLoading(true)
    setError(null)

    try {
      if (entry) {
        // Update existing entry
        const result = updateEntry(entry.id, {
          title: data.title,
          content: data.content,
          mood: data.mood,
        })

        if (!result) {
          setError('Failed to update entry')
          setIsLoading(false)
          return
        }
      } else {
        // Create new entry
        const result = createEntry({
          date: data.date,
          title: data.title,
          content: data.content,
          mood: data.mood,
        })

        if (!result) {
          setError('Failed to create entry')
          setIsLoading(false)
          return
        }
      }

      // Success - navigate back
      onSave()
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!entry) return

    if (!window.confirm('Are you sure you want to delete this entry?')) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const success = deleteEntry(entry.id)

      if (!success) {
        setError('Failed to delete entry')
        setIsLoading(false)
        return
      }

      // Success - navigate back
      onSave()
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      {error && (
        <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-md border border-destructive/20">
          {error}
        </div>
      )}
      <JournalEditor
        entry={entry || undefined}
        onSave={handleSave}
        onDelete={entry ? handleDelete : undefined}
        onCancel={onCancel}
        isLoading={isLoading}
      />
    </div>
  )
}
