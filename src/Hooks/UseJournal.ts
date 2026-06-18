import { useState, useCallback, useEffect } from 'react'
import {
  JournalEntry,
  CreateJournalEntryInput,
  UpdateJournalEntryInput,
} from '@/Types/JournalEntry'
import JournalService from '@/Services/JournalService'

interface UseJournalReturn {
  readonly entries: ReadonlyArray<JournalEntry>
  readonly loading: boolean
  readonly error: string | null
  readonly createEntry: (input: CreateJournalEntryInput) => JournalEntry | null
  readonly updateEntry: (id: string, input: UpdateJournalEntryInput) => JournalEntry | null
  readonly deleteEntry: (id: string) => boolean
  readonly getEntryById: (id: string) => JournalEntry | null
  readonly getEntryByDate: (date: string) => JournalEntry | null
  readonly refresh: () => void
}

/**
 * Custom hook for managing journal entries
 */
export function UseJournal(): UseJournalReturn {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(() => {
    try {
      setLoading(true)
      setError(null)
      const freshEntries = JournalService.getAllEntries()
      setEntries(freshEntries)
    } catch (err) {
      setError('Failed to load journal entries')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const createEntry = useCallback(
    (input: CreateJournalEntryInput): JournalEntry | null => {
      try {
        const newEntry = JournalService.createEntry(input)
        setEntries((prev) => [newEntry, ...prev])
        return newEntry
      } catch (err) {
        setError('Failed to create journal entry')
        console.error(err)
        return null
      }
    },
    []
  )

  const updateEntry = useCallback(
    (id: string, input: UpdateJournalEntryInput): JournalEntry | null => {
      try {
        const updated = JournalService.updateEntry(id, input)
        if (updated) {
          setEntries((prev) =>
            prev.map((entry) => (entry.id === id ? updated : entry))
          )
        }
        return updated
      } catch (err) {
        setError('Failed to update journal entry')
        console.error(err)
        return null
      }
    },
    []
  )

  const deleteEntry = useCallback((id: string): boolean => {
    try {
      const success = JournalService.deleteEntry(id)
      if (success) {
        setEntries((prev) => prev.filter((entry) => entry.id !== id))
      }
      return success
    } catch (err) {
      setError('Failed to delete journal entry')
      console.error(err)
      return false
    }
  }, [])

  const getEntryById = useCallback(
    (id: string): JournalEntry | null => {
      return entries.find((entry) => entry.id === id) || null
    },
    [entries]
  )

  const getEntryByDate = useCallback(
    (date: string): JournalEntry | null => {
      return entries.find((entry) => entry.date === date) || null
    },
    [entries]
  )

  return {
    entries,
    loading,
    error,
    createEntry,
    updateEntry,
    deleteEntry,
    getEntryById,
    getEntryByDate,
    refresh,
  }
}
