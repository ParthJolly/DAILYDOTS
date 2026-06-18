# Database & Data Persistence

## Current Implementation: localStorage

DailyDots currently uses **browser localStorage** for data persistence.

### Advantages
- ✅ No backend required
- ✅ Works offline
- ✅ Fast data access
- ✅ Perfect for personal apps
- ✅ Easy to implement

### Limitations
- ⚠️ Data limited to single device
- ⚠️ No cloud synchronization
- ⚠️ Limited to ~10MB per domain
- ⚠️ No real-time sync across tabs
- ⚠️ Data lost if browser storage is cleared

---

## Data Schema

### JournalEntry Type

```typescript
interface JournalEntry {
  readonly id: string              // Unique identifier (entry_timestamp_random)
  readonly date: string            // YYYY-MM-DD format
  readonly title: string           // Entry title
  readonly content: string         // Full journal text
  readonly mood?: MoodType         // Optional mood (Amazing, Happy, Calm, Neutral, Sad, Angry)
  readonly createdAt: string       // ISO 8601 timestamp
  readonly updatedAt: string       // ISO 8601 timestamp
}

type MoodType = 'amazing' | 'happy' | 'calm' | 'neutral' | 'sad' | 'angry'
```

### Storage Key

```typescript
const JOURNAL_STORAGE_KEY = 'daily_dots_journal_entries'
```

### Sample Entry

```json
{
  "id": "entry_1704067200000_abc123def",
  "date": "2024-01-01",
  "title": "New Year Reflections",
  "content": "Today was a great day to reflect on...",
  "mood": "happy",
  "createdAt": "2024-01-01T10:00:00.000Z",
  "updatedAt": "2024-01-01T10:00:00.000Z"
}
```

---

## Service Layer: JournalService

The `src/Services/JournalService.ts` provides the abstraction layer for all data operations.

### Available Methods

#### `getAllEntries(): JournalEntry[]`
Retrieves all journal entries from storage.

```typescript
const entries = JournalService.getAllEntries()
```

#### `getEntryById(id: string): JournalEntry | null`
Get a specific entry by its ID.

```typescript
const entry = JournalService.getEntryById('entry_1704067200000_abc123def')
```

#### `getEntryByDate(date: string): JournalEntry | null`
Get the entry for a specific date (YYYY-MM-DD).

```typescript
const entry = JournalService.getEntryByDate('2024-01-01')
```

#### `createEntry(input: CreateJournalEntryInput): JournalEntry`
Create a new journal entry.

```typescript
const newEntry = JournalService.createEntry({
  date: '2024-01-01',
  title: 'My First Entry',
  content: 'Today was amazing...',
  mood: 'happy'
})
```

#### `updateEntry(id: string, input: UpdateJournalEntryInput): JournalEntry | null`
Update an existing entry.

```typescript
const updated = JournalService.updateEntry('entry_1704067200000_abc123def', {
  title: 'Updated Title',
  mood: 'amazing'
})
```

#### `deleteEntry(id: string): void`
Delete an entry.

```typescript
JournalService.deleteEntry('entry_1704067200000_abc123def')
```

#### `searchEntries(query: string): JournalEntry[]`
Search entries by title or content (case-insensitive).

```typescript
const results = JournalService.searchEntries('happy')
```

#### `getEntriesByMood(mood: MoodType): JournalEntry[]`
Get all entries with a specific mood.

```typescript
const happyEntries = JournalService.getEntriesByMood('happy')
```

#### `getEntriesByDateRange(startDate: string, endDate: string): JournalEntry[]`
Get entries within a date range (YYYY-MM-DD).

```typescript
const weekEntries = JournalService.getEntriesByDateRange(
  '2024-01-01',
  '2024-01-07'
)
```

---

## Accessing Data in Components

### Using Custom Hooks (Recommended)

```tsx
import { UseJournal } from '@/Hooks/UseJournal'

export function MyComponent() {
  const { entries, loading, error, addEntry, deleteEntry } = UseJournal()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      {entries.map((entry) => (
        <div key={entry.id}>
          <h3>{entry.title}</h3>
          <button onClick={() => deleteEntry(entry.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}
```

### Using Service Directly (Not Recommended)

Services are usually called through hooks, but you can use them directly:

```tsx
import { JournalService } from '@/Services/JournalService'

function MyComponent() {
  const entries = JournalService.getAllEntries()
  // ...
}
```

**Better**: Use a hook instead to manage loading/error states.

---

## Data Flow

### Creating an Entry

```
User fills form
        ↓
AddJournalPage calls onSave
        ↓
UseJournal.addEntry() hook
        ↓
JournalService.createEntry()
        ↓
localStorage updated
        ↓
Hook triggers re-render
        ↓
UI shows new entry
```

### Retrieving Entries

```
Component mounts
        ↓
useEffect in hook
        ↓
JournalService.getAllEntries()
        ↓
localStorage read
        ↓
Hook state updated
        ↓
Component re-renders
```

---

## Migration to Supabase

### Step 1: Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### Step 2: Update JournalService

Replace localStorage calls with Supabase:

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

    if (error) throw error
    return data || []
  }

  static async createEntry(input: CreateJournalEntryInput): Promise<JournalEntry> {
    const { data, error } = await supabase
      .from('journal_entries')
      .insert([{
        date: input.date,
        title: input.title,
        content: input.content,
        mood: input.mood,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }])
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Implement other methods similarly...
}
```

### Step 3: Create Supabase Table

```sql
CREATE TABLE journal_entries (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  mood TEXT,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id)
);

CREATE INDEX idx_journal_entries_date ON journal_entries(date);
CREATE INDEX idx_journal_entries_user_id ON journal_entries(user_id);
```

### Step 4: Update Environment Variables

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Step 5: Update Hooks (Minimal Changes)

The hooks don't need to change much since they call the service layer!

```typescript
// Before
const entries = JournalService.getAllEntries()

// After (async)
const entries = await JournalService.getAllEntries()
```

### Step 6: Add Error Handling

Update hooks to handle async operations and errors:

```typescript
useEffect(() => {
  const loadEntries = async () => {
    setLoading(true)
    try {
      const data = await JournalService.getAllEntries()
      setEntries(data)
    } catch (error) {
      setError('Failed to load entries')
    } finally {
      setLoading(false)
    }
  }

  loadEntries()
}, [])
```

---

## Backup & Export

### Export All Entries

```typescript
function exportEntries() {
  const entries = JournalService.getAllEntries()
  const json = JSON.stringify(entries, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  
  const a = document.createElement('a')
  a.href = url
  a.download = `journal-backup-${new Date().toISOString()}.json`
  a.click()
  URL.revokeObjectURL(url)
}
```

### Import Entries

```typescript
function importEntries(file: File) {
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const entries = JSON.parse(e.target?.result as string)
      localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(entries))
      window.location.reload()
    } catch (error) {
      console.error('Failed to import entries', error)
    }
  }
  reader.readAsText(file)
}
```

---

## Data Validation

### Validate Entry on Creation

```typescript
function validateEntry(entry: CreateJournalEntryInput): string[] {
  const errors: string[] = []

  if (!entry.title?.trim()) {
    errors.push('Title is required')
  }
  if (!entry.content?.trim()) {
    errors.push('Content is required')
  }
  if (!entry.date || !/^\d{4}-\d{2}-\d{2}$/.test(entry.date)) {
    errors.push('Invalid date format (use YYYY-MM-DD)')
  }
  if (entry.mood && !Object.values(MoodType).includes(entry.mood)) {
    errors.push('Invalid mood')
  }

  return errors
}
```

---

## Performance Considerations

### Current (localStorage)

- Very fast for < 500 entries
- No network latency
- Synchronous operations
- Limited by browser storage quota

### After Supabase Migration

- Slightly slower (network calls)
- Real-time sync capabilities
- Can handle unlimited entries
- Enables multi-device sync

### Optimization Tips

```typescript
// Use getEntryByDate for today's entry (faster than filtering)
const today = JournalService.getEntryByDate(new Date().toISOString().split('T')[0])

// Cache frequently accessed data
const [cachedEntries, setCachedEntries] = useState<JournalEntry[]>([])

// Pagination for large datasets
const paginate = (entries: JournalEntry[], page: number, perPage: number) => {
  return entries.slice((page - 1) * perPage, page * perPage)
}
```

---

## Troubleshooting

### Data Not Persisting

```typescript
// Check if localStorage is available
const isStorageAvailable = () => {
  try {
    localStorage.setItem('test', 'test')
    localStorage.removeItem('test')
    return true
  } catch {
    return false
  }
}
```

### Storage Quota Exceeded

```typescript
// Check storage usage
try {
  const usage = JSON.stringify(localStorage).length
  console.log(`Storage usage: ${usage} bytes`)
} catch (error) {
  console.error('Storage quota exceeded')
}
```

### Clearing Old Data

```typescript
// Clear all entries
localStorage.removeItem('daily_dots_journal_entries')

// Clear specific entries
const entries = JournalService.getAllEntries()
const filtered = entries.filter(e => !e.date.startsWith('2023'))
localStorage.setItem('daily_dots_journal_entries', JSON.stringify(filtered))
```

---

## Additional Resources

- [localStorage Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Date Format Guide](https://en.wikipedia.org/wiki/ISO_8601)
