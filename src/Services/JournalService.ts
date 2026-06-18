import {
  JournalEntry,
  CreateJournalEntryInput,
  UpdateJournalEntryInput,
} from '@/Types/JournalEntry'

const JOURNAL_STORAGE_KEY = 'daily_dots_journal_entries'

/**
 * Service layer for journal data persistence using localStorage
 * This layer abstracts data access and can be swapped to Supabase later
 */
class JournalService {
  /**
   * Get all journal entries
   */
  getAllEntries(): JournalEntry[] {
    try {
      const data = localStorage.getItem(JOURNAL_STORAGE_KEY)
      return data ? JSON.parse(data) : []
    } catch {
      console.error('Failed to load journal entries from storage')
      return []
    }
  }

  /**
   * Get a single journal entry by id
   */
  getEntryById(id: string): JournalEntry | null {
    const entries = this.getAllEntries()
    return entries.find((entry) => entry.id === id) || null
  }

  /**
   * Get journal entry by date (YYYY-MM-DD)
   */
  getEntryByDate(date: string): JournalEntry | null {
    const entries = this.getAllEntries()
    return entries.find((entry) => entry.date === date) || null
  }

  /**
   * Create a new journal entry
   */
  createEntry(input: CreateJournalEntryInput): JournalEntry {
    const entries = this.getAllEntries()
    const now = new Date().toISOString()

    const newEntry: JournalEntry = {
      id: `entry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      date: input.date,
      title: input.title,
      content: input.content,
      mood: input.mood,
      createdAt: now,
      updatedAt: now,
    }

    entries.push(newEntry)
    this.saveEntries(entries)
    return newEntry
  }

  /**
   * Update an existing journal entry
   */
  updateEntry(id: string, input: UpdateJournalEntryInput): JournalEntry | null {
    const entries = this.getAllEntries()
    const index = entries.findIndex((entry) => entry.id === id)

    if (index === -1) {
      return null
    }

    const now = new Date().toISOString()
    const updatedEntry: JournalEntry = {
      ...entries[index],
      ...input,
      id: entries[index].id,
      createdAt: entries[index].createdAt,
      updatedAt: now,
    }

    entries[index] = updatedEntry
    this.saveEntries(entries)
    return updatedEntry
  }

  /**
   * Delete a journal entry
   */
  deleteEntry(id: string): boolean {
    const entries = this.getAllEntries()
    const filtered = entries.filter((entry) => entry.id !== id)

    if (filtered.length === entries.length) {
      return false // Entry not found
    }

    this.saveEntries(filtered)
    return true
  }

  /**
   * Get entries for a specific date range
   */
  getEntriesByDateRange(startDate: string, endDate: string): JournalEntry[] {
    const entries = this.getAllEntries()
    return entries.filter(
      (entry) => entry.date >= startDate && entry.date <= endDate
    )
  }

  /**
   * Get entries sorted by date (descending by default)
   */
  getEntriesSorted(ascending = false): JournalEntry[] {
    const entries = this.getAllEntries()
    return entries.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return ascending ? dateA - dateB : dateB - dateA
    })
  }

  /**
   * Get entries for a specific month (YYYY-MM)
   */
  getEntriesForMonth(yearMonth: string): JournalEntry[] {
    const entries = this.getAllEntries()
    return entries.filter((entry) => entry.date.startsWith(yearMonth))
  }

  /**
   * Check if an entry exists for a given date
   */
  hasEntryForDate(date: string): boolean {
    return this.getEntryByDate(date) !== null
  }

  /**
   * Get statistics
   */
  getStatistics() {
    const entries = this.getAllEntries()
    const now = new Date()
    const today = now.toISOString().split('T')[0]
    const thisMonth = today.substring(0, 7)

    return {
      totalEntries: entries.length,
      entriesThisMonth: entries.filter((e) => e.date.startsWith(thisMonth))
        .length,
      entriesThisWeek: entries.filter((e) => {
        const entryDate = new Date(e.date)
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        return entryDate >= weekAgo && entryDate <= now
      }).length,
      hasEntryToday: this.hasEntryForDate(today),
      lastEntryDate: entries.length > 0 ? entries[0].date : null,
    }
  }

  /**
   * Private method to save entries to localStorage
   */
  private saveEntries(entries: JournalEntry[]): void {
    try {
      localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(entries))
    } catch {
      console.error('Failed to save journal entries to storage')
    }
  }
}

export default new JournalService()
