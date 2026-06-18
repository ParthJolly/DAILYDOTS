# Component Reference

## UI Components

Reusable UI components located in `src/Components/UI/`.

### Button

Reusable button component with multiple variants.

**Location**: `src/Components/UI/Button.tsx`

**Props**:
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  children: React.ReactNode
}
```

**Usage**:
```tsx
import { Button } from '@/Components/UI/Button'

export function MyComponent() {
  return (
    <div>
      <Button onClick={() => console.log('clicked')}>
        Click Me
      </Button>
      <Button variant="outline">Outline Button</Button>
      <Button variant="destructive">Delete</Button>
      <Button disabled>Disabled</Button>
    </div>
  )
}
```

**Variants**:
- `default` - Primary button
- `outline` - Outlined button
- `ghost` - Text-only button
- `destructive` - Danger button (red)

---

### Input

Text input component with labels and error states.

**Location**: `src/Components/UI/Input.tsx`

**Props**:
```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'date'
}
```

**Usage**:
```tsx
import { Input } from '@/Components/UI/Input'
import { useState } from 'react'

export function MyComponent() {
  const [value, setValue] = useState('')

  return (
    <Input
      label="Your Name"
      placeholder="Enter your name"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      error={value.length < 3 ? 'Name too short' : ''}
    />
  )
}
```

---

### Textarea

Multi-line text input component.

**Location**: `src/Components/UI/Textarea.tsx`

**Props**:
```typescript
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  placeholder?: string
  rows?: number
}
```

**Usage**:
```tsx
import { Textarea } from '@/Components/UI/Textarea'
import { useState } from 'react'

export function JournalEditor() {
  const [content, setContent] = useState('')

  return (
    <Textarea
      label="Journal Entry"
      placeholder="Write your thoughts here..."
      value={content}
      onChange={(e) => setContent(e.target.value)}
      rows={10}
    />
  )
}
```

---

### Card

Container component for grouping content.

**Location**: `src/Components/UI/Card.tsx`

**Props**:
```typescript
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}
```

**Usage**:
```tsx
import { Card } from '@/Components/UI/Card'

export function EntryCard() {
  return (
    <Card className="p-6">
      <h3>Entry Title</h3>
      <p>Entry content goes here</p>
    </Card>
  )
}
```

---

### Badge

Small label component for tags/moods.

**Location**: `src/Components/UI/Badge.tsx`

**Props**:
```typescript
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  children: React.ReactNode
}
```

**Usage**:
```tsx
import { Badge } from '@/Components/UI/Badge'

export function MoodBadge({ mood }: { mood: string }) {
  return <Badge variant="secondary">{mood}</Badge>
}
```

---

## Feature Components

Components specific to journal features.

### MoodSelector

Select mood with emoji picker.

**Location**: `src/Components/Journal/MoodSelector.tsx`

**Props**:
```typescript
interface MoodSelectorProps {
  value?: MoodType
  onChange: (mood: MoodType) => void
  label?: string
}
```

**Usage**:
```tsx
import { MoodSelector } from '@/Components/Journal/MoodSelector'
import { useState } from 'react'
import type { MoodType } from '@/Types/JournalEntry'

export function MyComponent() {
  const [mood, setMood] = useState<MoodType>('happy')

  return (
    <MoodSelector
      value={mood}
      onChange={setMood}
      label="How are you feeling?"
    />
  )
}
```

**Features**:
- 6 mood options with emojis
- Keyboard navigation support
- Visual selection indicator

---

### JournalEditor

Complete form for creating/editing journal entries.

**Location**: `src/Components/Journal/JournalEditor.tsx`

**Props**:
```typescript
interface JournalEditorProps {
  initialEntry?: JournalEntry
  onSave: (entry: CreateJournalEntryInput) => void
  onCancel: () => void
  loading?: boolean
}
```

**Usage**:
```tsx
import { JournalEditor } from '@/Components/Journal/JournalEditor'

export function AddJournalPage() {
  const handleSave = (entry) => {
    JournalService.createEntry(entry)
  }

  return (
    <JournalEditor
      onSave={handleSave}
      onCancel={() => goBack()}
      loading={false}
    />
  )
}
```

**Features**:
- Title input
- Mood selector
- Content editor with character count
- Save/Cancel buttons
- Form validation

---

### JournalCard

Display a single journal entry.

**Location**: `src/Components/Journal/JournalCard.tsx`

**Props**:
```typescript
interface JournalCardProps {
  entry: JournalEntry
  onEdit?: (entry: JournalEntry) => void
  onDelete?: (id: string) => void
  onClick?: () => void
}
```

**Usage**:
```tsx
import { JournalCard } from '@/Components/Journal/JournalCard'
import type { JournalEntry } from '@/Types/JournalEntry'

export function MyComponent({ entry }: { entry: JournalEntry }) {
  return (
    <JournalCard
      entry={entry}
      onEdit={(e) => console.log('Edit', e.id)}
      onDelete={(id) => console.log('Delete', id)}
    />
  )
}
```

**Features**:
- Entry preview
- Mood emoji display
- Date formatting
- Edit/Delete buttons
- Truncated content preview

---

### JournalList

Display multiple journal entries with sorting/filtering.

**Location**: `src/Components/Journal/JournalList.tsx`

**Props**:
```typescript
interface JournalListProps {
  entries: JournalEntry[]
  onEdit?: (entry: JournalEntry) => void
  onDelete?: (id: string) => void
  loading?: boolean
  emptyMessage?: string
}
```

**Usage**:
```tsx
import { JournalList } from '@/Components/Journal/JournalList'
import { UseJournal } from '@/Hooks/UseJournal'

export function MyJournalsPage() {
  const { entries, loading, deleteEntry } = UseJournal()

  return (
    <JournalList
      entries={entries}
      loading={loading}
      onDelete={deleteEntry}
      emptyMessage="No entries yet. Create your first one!"
    />
  )
}
```

**Features**:
- Entry list display
- Loading state
- Empty state message
- Edit/Delete actions
- Responsive layout

---

## Layout Components

### Layout

Main application layout wrapper.

**Location**: `src/Components/Layout/Layout.tsx`

**Props**:
```typescript
interface LayoutProps {
  children: React.ReactNode
}
```

**Usage**:
```tsx
import { Layout } from '@/Components/Layout/Layout'

export default function App() {
  return (
    <Layout>
      <div>Your page content</div>
    </Layout>
  )
}
```

**Features**:
- Header with navigation
- Sidebar (if needed)
- Dark mode support
- Responsive design

---

## Feature Pages

### HomePage

Dashboard with overview and recent entries.

**Location**: `src/Features/Dashboard/HomePage.tsx`

**Props**:
```typescript
interface HomePageProps {
  onNavigateToCreate: () => void
  onNavigateToJournals: () => void
}
```

**Features**:
- Today's entry preview
- Recent entries
- Mood statistics
- Quick action buttons

---

### AddJournalPage

Create/edit journal entry page.

**Location**: `src/Features/Journal/AddJournalPage.tsx`

**Props**:
```typescript
interface AddJournalPageProps {
  editEntry?: JournalEntry
  onSaved: () => void
  onCancel: () => void
}
```

**Features**:
- Full journal editor
- Form validation
- Loading state
- Error handling
- Cancel option

---

### MyJournalsPage

Browse all journal entries.

**Location**: `src/Features/Journal/MyJournalsPage.tsx`

**Props**:
```typescript
interface MyJournalsPageProps {
  onEdit: (entry: JournalEntry) => void
  onBack: () => void
}
```

**Features**:
- Entry list display
- Search functionality
- Mood filtering
- Sorting options
- Edit/Delete actions

---

## Creating New Components

### Component Template

```tsx
import type { ReactNode } from 'react'

interface MyComponentProps {
  title: string
  children?: ReactNode
  onClick?: () => void
}

/**
 * Brief description of what this component does
 * @param title - The title to display
 * @param children - Child elements
 * @param onClick - Callback when clicked
 */
export function MyComponent({ title, children, onClick }: MyComponentProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4" onClick={onClick}>
      <h3 className="font-semibold">{title}</h3>
      {children}
    </div>
  )
}
```

### Best Practices

1. **Props Interface**: Always define TypeScript interface for props
2. **JSDoc**: Add comments for complex components
3. **Semantic HTML**: Use proper HTML elements
4. **Accessibility**: Support keyboard navigation, labels
5. **Responsive**: Work on mobile and desktop
6. **Dark Mode**: Use semantic color variables
7. **Size**: Keep components < 200 lines
8. **Export**: Default export for single components

---

## Component Testing

### Test Template

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MyComponent } from './MyComponent'

describe('MyComponent', () => {
  it('renders with title', () => {
    render(<MyComponent title="Test Title" />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    render(<MyComponent title="Test" onClick={handleClick} />)
    
    await userEvent.click(screen.getByText('Test'))
    expect(handleClick).toHaveBeenCalled()
  })
})
```

---

## Component Composition Examples

### Example 1: Edit Entry Page

```tsx
import { JournalEditor } from '@/Components/Journal/JournalEditor'
import { UseJournal } from '@/Hooks/UseJournal'
import { useState } from 'react'
import type { JournalEntry } from '@/Types/JournalEntry'

interface EditPageProps {
  entry: JournalEntry
  onSaved: () => void
}

export function EditJournalPage({ entry, onSaved }: EditPageProps) {
  const { updateEntry } = UseJournal()
  const [loading, setLoading] = useState(false)

  const handleSave = async (data) => {
    setLoading(true)
    try {
      await updateEntry(entry.id, data)
      onSaved()
    } finally {
      setLoading(false)
    }
  }

  return (
    <JournalEditor
      initialEntry={entry}
      onSave={handleSave}
      loading={loading}
    />
  )
}
```

### Example 2: Stats Dashboard

```tsx
import { Card } from '@/Components/UI/Card'
import { Badge } from '@/Components/UI/Badge'
import { UseJournalStats } from '@/Hooks/UseJournalStats'

export function StatsDashboard() {
  const { totalEntries, mostFrequentMood, streak } = UseJournalStats()

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Card className="p-4">
        <h3 className="text-sm text-muted-foreground">Total Entries</h3>
        <p className="text-2xl font-bold">{totalEntries}</p>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm text-muted-foreground">Most Frequent Mood</h3>
        <Badge className="mt-2">{mostFrequentMood}</Badge>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm text-muted-foreground">Current Streak</h3>
        <p className="text-2xl font-bold">{streak} days</p>
      </Card>
    </div>
  )
}
```

---

## Resources

- [React Component Documentation](https://react.dev/learn/components)
- [Component Patterns](https://react.dev/learn#components)
- [TypeScript for Components](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)
