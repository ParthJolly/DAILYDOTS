import { useMemo } from 'react'
import { JournalEntry, MoodType } from '@/Types/JournalEntry'

interface JournalStatistics {
  totalEntries: number
  entriesThisMonth: number
  entriesThisWeek: number
  hasEntryToday: boolean
  moodCounts: Record<MoodType, number>
  lastEntryDate: string | null
  currentStreak: number
}

/**
 * Custom hook for computing journal statistics
 */
export function UseJournalStats(entries: JournalEntry[]): JournalStatistics {
  return useMemo(() => {
    const now = new Date()
    const today = now.toISOString().split('T')[0]
    const thisMonth = today.substring(0, 7)

    // Count moods
    const moodCounts: Record<MoodType, number> = {
      amazing: 0,
      happy: 0,
      calm: 0,
      neutral: 0,
      sad: 0,
      angry: 0,
    }

    entries.forEach((entry) => {
      if (entry.mood) {
        moodCounts[entry.mood]++
      }
    })

    // Calculate entries this month and week
    const entriesThisMonth = entries.filter((e) =>
      e.date.startsWith(thisMonth)
    ).length

    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const entriesThisWeek = entries.filter((e) => {
      const entryDate = new Date(e.date)
      return entryDate >= weekAgo && entryDate <= now
    }).length

    // Check if entry exists today
    const hasEntryToday = entries.some((e) => e.date === today)

    // Get last entry date
    const sortedByDate = [...entries].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    const lastEntryDate = sortedByDate.length > 0 ? sortedByDate[0].date : null

    // Calculate current streak (consecutive days with entries)
    let currentStreak = 0
    if (hasEntryToday) {
      const datesToday = new Set(entries.map((e) => e.date))
      let currentDate = new Date(today)

      while (datesToday.has(currentDate.toISOString().split('T')[0])) {
        currentStreak++
        currentDate.setDate(currentDate.getDate() - 1)
      }
    }

    return {
      totalEntries: entries.length,
      entriesThisMonth,
      entriesThisWeek,
      hasEntryToday,
      moodCounts,
      lastEntryDate,
      currentStreak,
    }
  }, [entries])
}
