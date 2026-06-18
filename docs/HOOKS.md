# Custom Hooks Reference

## Overview

Custom hooks provide reusable stateful logic for managing journal data and statistics.

All custom hooks are located in `src/Hooks/` and follow the `Use*` naming convention.

---

## UseJournal

Main hook for managing journal entries (CRUD operations).

**Location**: `src/Hooks/UseJournal.ts`

### Return Type

```typescript
interface UseJournalReturn {
  entries: JournalEntry[]
  loading: boolean
  error: string | null
  
  // CRUD operations
  createEntry: (entry: CreateJournalEntryInput) => void
  updateEntry: (id: string, entry: UpdateJournalEntryInput) => void
  deleteEntry: (id: string) => void
  getEntry: (id: string) => JournalEntry | null
  
  // Search & Filter
  searchEntries: (query: string) => JournalEntry[]
  filterByMood: (mood: MoodType) => JournalEntry[]
}
```

### Basic Usage

```tsx
import { UseJournal } from '@/Hooks/UseJournal'

export function MyJournalsPage() {
  const {
    entries,
    loading,
    error,
    deleteEntry,
    updateEntry
  } = UseJournal()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      {entries.map((entry) => (
        <div key={entry.id}>
          <h3>{entry.title}</h3>
          <button onClick={() => deleteEntry(entry.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}
```

### Create Entry

```tsx
import { UseJournal } from '@/Hooks/UseJournal'
import type { CreateJournalEntryInput } from '@/Types/JournalEntry'

export function AddJournalPage() {
  const { createEntry, loading, error } = UseJournal()

  const handleSubmit = (data: CreateJournalEntryInput) => {
    createEntry(data)
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      handleSubmit({
        date: new Date().toISOString().split('T')[0],
        title: 'My Entry',
        content: 'Content here',
        mood: 'happy'
      })
    }}>
      {/* Form fields */}
    </form>
  )
}
```

### Search & Filter

```tsx
import { UseJournal } from '@/Hooks/UseJournal'

export function SearchJournals() {
  const { searchEntries, filterByMood } = UseJournal()
  const [query, setQuery] = useState('')

  const results = query.length > 0 ? searchEntries(query) : []
  const happyEntries = filterByMood('happy')

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <h3>Results: {results.length}</h3>
      <h3>Happy Entries: {happyEntries.length}</h3>
    </div>
  )
}
```

### State Management

```tsx
import { UseJournal } from '@/Hooks/UseJournal'
import { useEffect } from 'react'

export function AutoSaveExample() {
  const { entries, loading, error } = UseJournal()

  useEffect(() => {
    // Runs when entries change
    console.log('Entries updated:', entries.length)
  }, [entries])

  useEffect(() => {
    // Runs when loading state changes
    if (!loading) {
      console.log('Entries loaded')
    }
  }, [loading])

  useEffect(() => {
    // Runs when error occurs
    if (error) {
      console.error('Error:', error)
    }
  }, [error])

  return <div>Entries: {entries.length}</div>
}
```

---

## UseJournalStats

Hook for computing statistics from journal entries.

**Location**: `src/Hooks/UseJournalStats.ts`

### Return Type

```typescript
interface JournalStatistics {
  totalEntries: number
  entriesThisMonth: number
  entriesThisWeek: number
  hasEntryToday: boolean
  moodCounts: Record<MoodType, number>
  lastEntryDate: string | null
  currentStreak: number
}
```

### Basic Usage

```tsx
import { UseJournalStats } from '@/Hooks/UseJournalStats'
import { UseJournal } from '@/Hooks/UseJournal'

export function DashboardStats() {
  const { entries } = UseJournal()
  const stats = UseJournalStats(entries)

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
      <StatCard
        label="Total Entries"
        value={stats.totalEntries}
      />
      <StatCard
        label="This Month"
        value={stats.entriesThisMonth}
      />
      <StatCard
        label="This Week"
        value={stats.entriesThisWeek}
      />
      <StatCard
        label="Current Streak"
        value={`${stats.currentStreak} days`}
      />
    </div>
  )
}
```

### Mood Statistics

```tsx
import { UseJournalStats } from '@/Hooks/UseJournalStats'
import { UseJournal } from '@/Hooks/UseJournal'
import { moodEmojis, moodLabels } from '@/Types/JournalEntry'
import type { MoodType } from '@/Types/JournalEntry'

export function MoodBreakdown() {
  const { entries } = UseJournal()
  const stats = UseJournalStats(entries)

  return (
    <div>
      <h3>Mood Distribution</h3>
      {Object.entries(stats.moodCounts).map(([mood, count]: [MoodType, number]) => (
        <div key={mood} className="flex items-center justify-between">
          <span>
            {moodEmojis[mood as MoodType]} {moodLabels[mood as MoodType]}
          </span>
          <span>{count}</span>
        </div>
      ))}
    </div>
  )
}
```

### Streak Tracking

```tsx
import { UseJournalStats } from '@/Hooks/UseJournalStats'
import { UseJournal } from '@/Hooks/UseJournal'

export function StreakWidget() {
  const { entries } = UseJournal()
  const stats = UseJournalStats(entries)

  return (
    <div className="rounded-lg bg-primary p-4 text-primary-foreground">
      <h3 className="text-sm opacity-90">Current Streak</h3>
      <p className="text-4xl font-bold">{stats.currentStreak}</p>
      <p className="text-xs opacity-75">Keep it going!</p>
    </div>
  )
}
```

### Time-based Statistics

```tsx
import { UseJournalStats } from '@/Hooks/UseJournalStats'
import { UseJournal } from '@/Hooks/UseJournal'

export function ActivitySummary() {
  const { entries } = UseJournal()
  const stats = UseJournalStats(entries)

  return (
    <div>
      <h3>Writing Activity</h3>
      <ul>
        <li>This Week: {stats.entriesThisWeek}</li>
        <li>This Month: {stats.entriesThisMonth}</li>
        <li>Has Entry Today: {stats.hasEntryToday ? 'Yes' : 'No'}</li>
      </ul>
    </div>
  )
}

---

## Hook Best Practices

### 1. Call at Top Level

Always call hooks at the top of your component:

```tsx
// ✅ Correct
export function MyComponent() {
  const { entries } = UseJournal()
  const { totalEntries } = UseJournalStats()

  return <div>{entries.length}</div>
}

// ❌ Wrong - inside condition
export function MyComponent() {
  if (condition) {
    const { entries } = UseJournal() // Don't do this!
  }
}

// ❌ Wrong - inside loop
export function MyComponent() {
  const items = []
  for (let i = 0; i < 10; i++) {
    const { entries } = UseJournal() // Don't do this!
  }
}
```

### 2. Extract Complex Logic

```tsx
// ❌ Too much logic in component
export function MyComponent() {
  const { entries } = UseJournal()
  
  const filtered = entries.filter(e => 
    e.mood === 'happy' && 
    e.date > '2024-01-01' &&
    e.content.length > 100
  )
  
  return <div>{filtered.length}</div>
}

// ✅ Extract into custom hook
function UseHappyLongEntries() {
  const { entries } = UseJournal()
  
  return entries.filter(e => 
    e.mood === 'happy' && 
    e.date > '2024-01-01' &&
    e.content.length > 100
  )
}

export function MyComponent() {
  const filtered = UseHappyLongEntries()
  return <div>{filtered.length}</div>
}
```

### 3. Combine Multiple Hooks

```tsx
// ✅ Using multiple hooks together
export function Dashboard() {
  const { entries, loading: entriesLoading } = UseJournal()
  const { totalEntries, currentStreak } = UseJournalStats()

  const loading = entriesLoading

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <p>Total: {totalEntries}</p>
      <p>Streak: {currentStreak}</p>
      <p>Recent: {entries.slice(0, 3).length}</p>
    </div>
  )
}
```

### 4. Handle Loading States

```tsx
// ✅ Proper loading state handling
export function EntryList() {
  const { entries, loading, error } = UseJournal()

  if (loading) {
    return <div className="animate-pulse">Loading entries...</div>
  }

  if (error) {
    return <div className="text-destructive">Error: {error}</div>
  }

  if (entries.length === 0) {
    return <div className="text-muted-foreground">No entries yet</div>
  }

  return (
    <div>
      {entries.map(entry => (
        <div key={entry.id}>{entry.title}</div>
      ))}
    </div>
  )
}
```

---

## Common Hook Patterns

### Filtering Data

```tsx
import { UseJournal } from '@/Hooks/UseJournal'
import { useState } from 'react'
import type { MoodType } from '@/Types/JournalEntry'

export function FilteredJournals() {
  const { entries } = UseJournal()
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null)

  const filtered = selectedMood
    ? entries.filter(e => e.mood === selectedMood)
    : entries

  return (
    <div>
      <select onChange={e => setSelectedMood(e.target.value as MoodType)}>
        <option value="">All Moods</option>
        <option value="happy">Happy</option>
        <option value="sad">Sad</option>
      </select>
      <p>Found: {filtered.length}</p>
    </div>
  )
}
```

### Sorting Data

```tsx
import { UseJournal } from '@/Hooks/UseJournal'
import { useState } from 'react'

export function SortedJournals() {
  const { entries } = UseJournal()
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date')

  const sorted = [...entries].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    }
    return a.title.localeCompare(b.title)
  })

  return (
    <div>
      <button onClick={() => setSortBy('date')}>Sort by Date</button>
      <button onClick={() => setSortBy('title')}>Sort by Title</button>
      {sorted.map(e => <div key={e.id}>{e.title}</div>)}
    </div>
  )
}
```

### Pagination

```tsx
import { UseJournal } from '@/Hooks/UseJournal'
import { useState } from 'react'

const ITEMS_PER_PAGE = 10

export function PaginatedJournals() {
  const { entries } = UseJournal()
  const [currentPage, setCurrentPage] = useState(1)

  const total = entries.length
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE)
  const start = (currentPage - 1) * ITEMS_PER_PAGE
  const displayed = entries.slice(start, start + ITEMS_PER_PAGE)

  return (
    <div>
      {displayed.map(e => <div key={e.id}>{e.title}</div>)}
      
      <div className="mt-4 flex gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(p => p - 1)}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(p => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}
```

---

## Testing Hooks

### Hook Testing Template

```tsx
import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { UseJournal } from '@/Hooks/UseJournal'

describe('UseJournal', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns empty entries initially', () => {
    const { result } = renderHook(() => UseJournal())
    expect(result.current.entries).toEqual([])
  })

  it('creates a new entry', () => {
    const { result } = renderHook(() => UseJournal())

    act(() => {
      result.current.createEntry({
        date: '2024-01-01',
        title: 'Test',
        content: 'Test content',
      })
    })

    expect(result.current.entries).toHaveLength(1)
    expect(result.current.entries[0].title).toBe('Test')
  })

  it('updates an entry', () => {
    const { result } = renderHook(() => UseJournal())

    act(() => {
      result.current.createEntry({
        date: '2024-01-01',
        title: 'Original',
        content: 'Content',
      })
    })

    const entryId = result.current.entries[0].id

    act(() => {
      result.current.updateEntry(entryId, {
        title: 'Updated',
      })
    })

    expect(result.current.entries[0].title).toBe('Updated')
  })

  it('deletes an entry', () => {
    const { result } = renderHook(() => UseJournal())

    act(() => {
      result.current.createEntry({
        date: '2024-01-01',
        title: 'To Delete',
        content: 'Content',
      })
    })

    const entryId = result.current.entries[0].id

    act(() => {
      result.current.deleteEntry(entryId)
    })

    expect(result.current.entries).toHaveLength(0)
  })
})
```

---

## Creating Custom Hooks

### Hook Template

```tsx
import { useState, useEffect } from 'react'
import { JournalService } from '@/Services/JournalService'
import type { JournalEntry } from '@/Types/JournalEntry'

interface UseMyHookReturn {
  data: JournalEntry[]
  loading: boolean
  error: string | null
}

/**
 * Custom hook for [purpose]
 * @returns Object with data, loading, and error states
 */
export function UseMyHook(): UseMyHookReturn {
  const [data, setData] = useState<JournalEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const entries = JournalService.getAllEntries()
        setData(entries)
        setError(null)
      } catch (err) {
        setError('Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return { data, loading, error }
}
```

---

## Resources

- [React Hooks Documentation](https://react.dev/reference/react/hooks)
- [Custom Hooks Guide](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [Hooks Rules](https://react.dev/reference/rules/rules-of-hooks)
