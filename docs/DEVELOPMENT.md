# Development Guide

## Development Workflow

### Starting Development

```bash
npm run dev
```

This starts the Vite development server with hot module replacement (HMR).

### Code Quality Checks

Before committing, run:

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Formatting
npm run format

# Tests
npm run test
```

### Creating a Feature

1. Create a new branch for your feature
2. Follow the architecture guidelines
3. Write tests for new functionality
4. Ensure all checks pass before committing

---

## Code Organization

### Naming Conventions

- **Components**: PascalCase (e.g., `JournalCard.tsx`)
- **Hooks**: PascalCase with `Use` prefix (e.g., `UseJournal.ts`)
- **Services**: PascalCase with `Service` suffix (e.g., `JournalService.ts`)
- **Types**: PascalCase (e.g., `JournalEntry.ts`)
- **Utilities**: camelCase (e.g., `dateUtils.ts`)

### Folder Organization

```
Feature/
├── Components/    # UI components specific to this feature
├── Hooks/        # Custom hooks for this feature
├── Pages/        # Page components
├── Services/     # Data services
├── Types/        # Type definitions
└── Utils/        # Utility functions
```

---

## Component Development

### Component Structure

```tsx
import { useState } from 'react'
import type { ComponentProps } from 'react'
import { Button } from '@/Components/UI/Button'

interface Props {
  title: string
  onSubmit: (value: string) => void
}

/**
 * Brief description of the component
 * @param title - Display title
 * @param onSubmit - Callback when submitted
 */
export function MyComponent({ title, onSubmit }: Props) {
  const [value, setValue] = useState('')

  const handleSubmit = () => {
    onSubmit(value)
    setValue('')
  }

  return (
    <div>
      <h2>{title}</h2>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  )
}
```

### Best Practices

- Keep components small (< 200 lines)
- Use functional components only
- Extract reusable UI into separate components
- Use TypeScript interfaces for props
- Add JSDoc comments for complex logic
- Handle loading and error states
- Use semantic HTML

---

## Hook Development

### Custom Hook Structure

```tsx
import { useState, useEffect } from 'react'
import type { JournalEntry } from '@/Types/JournalEntry'
import { JournalService } from '@/Services/JournalService'

interface UseJournalReturn {
  entries: JournalEntry[]
  loading: boolean
  error: string | null
  addEntry: (entry: JournalEntry) => void
  deleteEntry: (id: string) => void
}

/**
 * Hook for managing journal entries
 */
export function UseJournal(): UseJournalReturn {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const data = JournalService.getAllEntries()
      setEntries(data)
    } catch (err) {
      setError('Failed to load entries')
    } finally {
      setLoading(false)
    }
  }, [])

  const addEntry = (entry: JournalEntry) => {
    setEntries((prev) => [entry, ...prev])
  }

  const deleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id))
  }

  return {
    entries,
    loading,
    error,
    addEntry,
    deleteEntry,
  }
}
```

### Best Practices

- Return an object with clear properties
- Include loading and error states
- Only call hooks at the top level
- Avoid creating functions inside hooks
- Memoize callbacks if dependencies change frequently

---

## Service Layer Development

### Service Structure

```tsx
import type { JournalEntry, CreateJournalEntryInput } from '@/Types/JournalEntry'

class JournalService {
  private static readonly STORAGE_KEY = 'daily_dots_entries'

  /**
   * Get all entries
   */
  static getAllEntries(): JournalEntry[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY)
      return data ? JSON.parse(data) : []
    } catch {
      console.error('Failed to load entries')
      return []
    }
  }

  /**
   * Create a new entry
   */
  static createEntry(input: CreateJournalEntryInput): JournalEntry {
    // Implementation
  }

  /**
   * Update an existing entry
   */
  static updateEntry(id: string, input: Partial<JournalEntry>): JournalEntry {
    // Implementation
  }

  /**
   * Delete an entry
   */
  static deleteEntry(id: string): void {
    // Implementation
  }
}

export { JournalService }
```

### Best Practices

- Keep services database-agnostic
- Use static methods for simple services
- Handle errors gracefully
- Add JSDoc comments for all methods
- Return typed responses
- Keep business logic here, not in components

---

## Testing

### Test Structure

```tsx
import { describe, it, expect, beforeEach } from 'vitest'
import { JournalService } from '@/Services/JournalService'
import type { JournalEntry } from '@/Types/JournalEntry'

describe('JournalService', () => {
  beforeEach(() => {
    // Setup before each test
    localStorage.clear()
  })

  it('should create a new entry', () => {
    const input = {
      title: 'Test Entry',
      content: 'Test content',
      date: '2024-01-01',
    }

    const result = JournalService.createEntry(input)

    expect(result).toBeDefined()
    expect(result.id).toBeDefined()
    expect(result.title).toBe('Test Entry')
  })

  it('should retrieve all entries', () => {
    const entries = JournalService.getAllEntries()

    expect(Array.isArray(entries)).toBe(true)
  })
})
```

### Testing Guidelines

- Write tests for services and utilities
- Test user behavior, not implementation
- Use descriptive test names
- Keep tests isolated
- Use beforeEach/afterEach for setup/cleanup
- Mock external dependencies

### Run Tests

```bash
# All tests
npm run test

# Watch mode
npm run test -- --watch

# Specific file
npm run test -- JournalService.test.ts

# With UI
npm run test:ui

# With coverage
npm run test -- --coverage
```

---

## Styling with Tailwind CSS

### Class Organization

```tsx
<div
  className="
    flex items-center justify-between
    w-full rounded-lg
    border border-border
    bg-card p-4
    text-foreground
    shadow-sm
    hover:shadow-md
    transition-shadow
  "
>
  Content
</div>
```

### Color System

Use semantic colors from theme:
- `bg-background` / `text-foreground` - Primary
- `bg-card` - Card backgrounds
- `border-border` - Borders
- `text-muted-foreground` - Secondary text
- `bg-primary` / `text-primary-foreground` - Primary actions
- `bg-destructive` / `text-destructive-foreground` - Dangerous actions

### Responsive Design

Build mobile-first:
```tsx
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {/* Content */}
</div>
```

### Dark Mode

Always support dark mode. Use semantic colors that handle it automatically.

---

## Git Workflow

### Commit Message Format

```
type(scope): subject

body

footer
```

Examples:
```
feat(journal): add mood selector component

Added new MoodSelector component with emoji icons.
Integrated with JournalEditor.

Closes #123
```

```
fix(service): correct date filtering logic

Previously filtered by incomplete date format.
Now properly uses YYYY-MM-DD format.
```

Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`

### Branching Strategy

```
main               # Production-ready code
├── feature/*      # New features
├── fix/*          # Bug fixes
└── docs/*         # Documentation
```

---

## Debugging

### Browser DevTools

1. Open DevTools (F12)
2. Check Console for errors
3. Use React DevTools extension to inspect components
4. Check Network tab for failed requests

### Debugging localStorage

```javascript
// In browser console
localStorage.getItem('daily_dots_journal_entries')
JSON.parse(localStorage.getItem('daily_dots_journal_entries'))
```

### Debug Logs

Add temporary console logs:
```tsx
console.log('Debug info:', variable)
```

Remember to remove before committing!

---

## Performance Optimization

### Code Splitting

Vite automatically handles code splitting for optimized builds.

### Memoization

Use sparingly when necessary:
```tsx
import { memo } from 'react'

const JournalCard = memo(({ entry }: Props) => {
  return <div>{entry.title}</div>
})
```

### useCallback & useMemo

```tsx
const handleClick = useCallback(() => {
  // Action
}, [dependencies])

const computedValue = useMemo(() => {
  // Computation
}, [dependencies])
```

---

## Common Tasks

### Adding a New Component

1. Create file in appropriate Components folder
2. Define TypeScript interface for props
3. Implement component with JSDoc
4. Export from component file
5. Use in feature pages

### Adding a New Hook

1. Create file in Hooks folder
2. Define return type interface
3. Implement hook logic
4. Export from hook file
5. Use in components

### Adding a New Service Method

1. Add method to appropriate service class
2. Add JSDoc comment
3. Handle errors properly
4. Add types for parameters and return
5. Write tests
6. Update this documentation

### Updating Database Schema

If switching to Supabase:
1. Update `JournalEntry` type in `src/Types/JournalEntry.ts`
2. Update `JournalService` methods
3. Run migrations
4. Test all CRUD operations

---

## Resources

- [React 19 Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vitest Documentation](https://vitest.dev/)

---

## Getting Help

- Check existing documentation in `/docs`
- Review project architecture in [ARCHITECTURE.md](/docs/ARCHITECTURE.md)
- Look at similar implementations in the codebase
- Ask in project discussions or issues
