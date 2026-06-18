# Services Reference

## Overview

Services handle all business logic and data access. They are the abstraction layer between components/hooks and the data source (localStorage or Supabase).

All services are located in `src/Services/` and follow the `*Service` naming convention.

---

## JournalService

Main service for all journal entry operations.

**Location**: `src/Services/JournalService.ts`

### Service Structure

```typescript
class JournalService {
  // CRUD Operations
  static getAllEntries(): JournalEntry[]
  static getEntryById(id: string): JournalEntry | null
  static getEntryByDate(date: string): JournalEntry | null
  static createEntry(input: CreateJournalEntryInput): JournalEntry
  static updateEntry(id: string, input: UpdateJournalEntryInput): JournalEntry | null
  static deleteEntry(id: string): void

  // Search & Filter
  static searchEntries(query: string): JournalEntry[]
  static getEntriesByMood(mood: MoodType): JournalEntry[]
  static getEntriesByDateRange(startDate: string, endDate: string): JournalEntry[]
}
```

---

## CRUD Operations

### Get All Entries

Retrieve all journal entries.

```typescript
const entries: JournalEntry[] = JournalService.getAllEntries()
```

**Returns**: Array of all entries, sorted by creation date descending

**Example**:
```typescript
const allEntries = JournalService.getAllEntries()
console.log(`You have ${allEntries.length} entries`)
```

---

### Get Entry By ID

Retrieve a specific entry by its ID.

```typescript
const entry: JournalEntry | null = JournalService.getEntryById(id)
```

**Parameters**:
- `id` (string): Entry ID

**Returns**: Entry object or null if not found

**Example**:
```typescript
const entry = JournalService.getEntryById('entry_1704067200000_abc123def')
if (entry) {
  console.log(`Entry: ${entry.title}`)
} else {
  console.log('Entry not found')
}
```

---

### Get Entry By Date

Retrieve the entry for a specific date (one entry per day).

```typescript
const entry: JournalEntry | null = JournalService.getEntryByDate(date)
```

**Parameters**:
- `date` (string): Date in YYYY-MM-DD format

**Returns**: Entry object or null if no entry for that date

**Example**:
```typescript
const todayEntry = JournalService.getEntryByDate('2024-01-15')
if (todayEntry) {
  console.log(`Today's mood: ${todayEntry.mood}`)
}
```

---

### Create Entry

Create a new journal entry.

```typescript
const newEntry: JournalEntry = JournalService.createEntry(input)
```

**Parameters**:
- `input` (CreateJournalEntryInput):
  - `date`: YYYY-MM-DD format (required)
  - `title`: Entry title (required, must be non-empty)
  - `content`: Entry content (required, min 10 chars recommended)
  - `mood`: Optional mood type

**Returns**: Created entry with generated ID and timestamps

**Example**:
```typescript
const entry = JournalService.createEntry({
  date: '2024-01-15',
  title: 'Day 1 of My Journey',
  content: 'Today was amazing! I started my new journal...',
  mood: 'amazing'
})

console.log(`Created entry: ${entry.id}`)
```

**Validation**:
```typescript
// Title is required and trimmed
// Content is required
// Date must be in YYYY-MM-DD format
// Mood must be a valid MoodType
```

---

### Update Entry

Update an existing entry.

```typescript
const updated: JournalEntry | null = JournalService.updateEntry(id, input)
```

**Parameters**:
- `id` (string): Entry ID to update
- `input` (UpdateJournalEntryInput): Partial entry data
  - `title?`: New title
  - `content?`: New content
  - `mood?`: New mood
  - `date?`: New date

**Returns**: Updated entry or null if not found

**Example**:
```typescript
const updated = JournalService.updateEntry(
  'entry_1704067200000_abc123def',
  {
    title: 'Updated Title',
    mood: 'happy'
  }
)

if (updated) {
  console.log('Entry updated successfully')
}
```

**Note**: UpdatedAt timestamp is automatically updated.

---

### Delete Entry

Delete an entry.

```typescript
JournalService.deleteEntry(id)
```

**Parameters**:
- `id` (string): Entry ID to delete

**Example**:
```typescript
JournalService.deleteEntry('entry_1704067200000_abc123def')
console.log('Entry deleted')
```

---

## Search & Filter Operations

### Search Entries

Search entries by title or content (case-insensitive).

```typescript
const results: JournalEntry[] = JournalService.searchEntries(query)
```

**Parameters**:
- `query` (string): Search term

**Returns**: Array of matching entries

**Example**:
```typescript
const results = JournalService.searchEntries('vacation')
console.log(`Found ${results.length} entries mentioning vacation`)

// Search is case-insensitive
const moreResults = JournalService.searchEntries('HAPPY')
// Matches entries containing "happy", "Happy", "HAPPY", etc.
```

**Search Behavior**:
- Searches both title and content
- Case-insensitive matching
- Matches partial words
- Returns entries sorted by date descending

---

### Filter By Mood

Get all entries with a specific mood.

```typescript
const entries: JournalEntry[] = JournalService.getEntriesByMood(mood)
```

**Parameters**:
- `mood` (MoodType): One of: 'amazing', 'happy', 'calm', 'neutral', 'sad', 'angry'

**Returns**: Array of entries with matching mood

**Example**:
```typescript
const happyDays = JournalService.getEntriesByMood('happy')
console.log(`You've had ${happyDays.length} happy days`)

const sadDays = JournalService.getEntriesByMood('sad')
if (sadDays.length > 0) {
  console.log('Consider reaching out for support')
}
```

---

### Filter By Date Range

Get entries within a date range.

```typescript
const entries: JournalEntry[] = JournalService.getEntriesByDateRange(
  startDate,
  endDate
)
```

**Parameters**:
- `startDate` (string): Start date in YYYY-MM-DD format
- `endDate` (string): End date in YYYY-MM-DD format (inclusive)

**Returns**: Array of entries within range, sorted by date descending

**Example**:
```typescript
// Get entries from this week
const weekStart = '2024-01-08'
const weekEnd = '2024-01-14'
const weekEntries = JournalService.getEntriesByDateRange(weekStart, weekEnd)

// Get entries from January
const januaryEntries = JournalService.getEntriesByDateRange('2024-01-01', '2024-01-31')

console.log(`Entries this month: ${januaryEntries.length}`)
```

---

## Service in Components

### Direct Service Usage (Not Recommended)

```typescript
import { JournalService } from '@/Services/JournalService'

export function MyComponent() {
  // ❌ Avoid using service directly in components
  const entries = JournalService.getAllEntries()
  
  return <div>{entries.length}</div>
}
```

### Using Custom Hook (Recommended)

```typescript
import { UseJournal } from '@/Hooks/UseJournal'

export function MyComponent() {
  // ✅ Use hooks instead
  const { entries } = UseJournal()
  
  return <div>{entries.length}</div>
}
```

**Why use hooks?**
- Handles loading/error states
- Manages component lifecycle
- Prevents stale data
- Easier to test

---

## Error Handling

### Try-Catch Pattern

```typescript
try {
  const entry = JournalService.createEntry({
    date: '2024-01-01',
    title: '',  // Invalid: empty title
    content: 'Content'
  })
} catch (error) {
  console.error('Failed to create entry:', error)
}
```

### Null Checking

```typescript
const entry = JournalService.getEntryById('invalid-id')

if (entry === null) {
  console.log('Entry not found')
} else {
  console.log('Entry found:', entry.title)
}
```

### Storage Errors

```typescript
try {
  const entries = JournalService.getAllEntries()
} catch (error) {
  console.error('Failed to load entries from storage')
  // Gracefully handle storage errors
  return []
}
```

---

## Service Best Practices

### 1. Use Typed Inputs

```typescript
// ✅ Correct
import type { CreateJournalEntryInput } from '@/Types/JournalEntry'

const input: CreateJournalEntryInput = {
  date: '2024-01-01',
  title: 'Entry',
  content: 'Content'
}

// ❌ Avoid
const input = { date: '2024-01-01', title: 'Entry', content: 'Content' }
```

### 2. Validate Before Operations

```typescript
// ✅ Validate input
function validateAndCreate(input: Partial<CreateJournalEntryInput>) {
  if (!input.title?.trim()) {
    throw new Error('Title is required')
  }
  if (!input.content?.trim()) {
    throw new Error('Content is required')
  }
  return JournalService.createEntry(input as CreateJournalEntryInput)
}
```

### 3. Handle Errors Gracefully

```typescript
// ✅ Good error handling
const entries = JournalService.getAllEntries()
if (entries.length === 0) {
  console.log('No entries found. Start creating!')
}

// ❌ Crash on error
const entries = JournalService.getAllEntries()
entries.forEach(e => console.log(e.title)) // Could crash if undefined
```

### 4. Use Constants for Keys

```typescript
// ✅ Centralized storage key
const JOURNAL_STORAGE_KEY = 'daily_dots_journal_entries'

// ❌ Hardcoded strings
localStorage.getItem('daily_dots_journal_entries')
localStorage.getItem('journalData') // Different key!
```

---

## Testing Services

### Service Test Template

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { JournalService } from '@/Services/JournalService'

describe('JournalService', () => {
  beforeEach(() => {
    // Clear storage before each test
    localStorage.clear()
  })

  it('should create an entry with all fields', () => {
    const entry = JournalService.createEntry({
      date: '2024-01-01',
      title: 'Test Entry',
      content: 'Test content here',
      mood: 'happy'
    })

    expect(entry).toBeDefined()
    expect(entry.id).toBeDefined()
    expect(entry.title).toBe('Test Entry')
    expect(entry.mood).toBe('happy')
    expect(entry.createdAt).toBeDefined()
  })

  it('should retrieve all entries', () => {
    JournalService.createEntry({
      date: '2024-01-01',
      title: 'Entry 1',
      content: 'Content 1'
    })

    JournalService.createEntry({
      date: '2024-01-02',
      title: 'Entry 2',
      content: 'Content 2'
    })

    const entries = JournalService.getAllEntries()
    expect(entries).toHaveLength(2)
  })

  it('should search entries by title', () => {
    JournalService.createEntry({
      date: '2024-01-01',
      title: 'Vacation in Spain',
      content: 'Great trip'
    })

    JournalService.createEntry({
      date: '2024-01-02',
      title: 'Regular Monday',
      content: 'Usual day'
    })

    const results = JournalService.searchEntries('vacation')
    expect(results).toHaveLength(1)
    expect(results[0].title).toContain('Vacation')
  })

  it('should filter entries by mood', () => {
    JournalService.createEntry({
      date: '2024-01-01',
      title: 'Happy Day',
      content: 'Great day',
      mood: 'happy'
    })

    JournalService.createEntry({
      date: '2024-01-02',
      title: 'Sad Day',
      content: 'Tough day',
      mood: 'sad'
    })

    const happyEntries = JournalService.getEntriesByMood('happy')
    expect(happyEntries).toHaveLength(1)
    expect(happyEntries[0].mood).toBe('happy')
  })
})
```

---

## Migration: localStorage to Supabase

### Current Implementation (localStorage)

```typescript
class JournalService {
  static getAllEntries(): JournalEntry[] {
    try {
      const data = localStorage.getItem(JOURNAL_STORAGE_KEY)
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  }
}
```

### Future Implementation (Supabase)

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

class JournalService {
  static async getAllEntries(): Promise<JournalEntry[]> {
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .order('date', { ascending: false })

    if (error) {
      console.error('Failed to fetch entries:', error)
      return []
    }
    
    return data || []
  }
}
```

**Key Changes**:
- Methods become async
- Use Supabase client instead of localStorage
- Handle network errors
- Components/hooks handle awaiting results

See [docs/DATABASE.md](/docs/DATABASE.md) for detailed migration guide.

---

## Resources

- [Service Pattern](https://en.wikipedia.org/wiki/Service_locator_pattern)
- [Business Logic](https://en.wikipedia.org/wiki/Business_logic)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
