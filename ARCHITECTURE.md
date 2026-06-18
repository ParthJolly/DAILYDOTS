# Architecture Guide - Daily Dots

## 🏗️ Clean Architecture Pattern

The app uses a **layered architecture** designed for easy migrations and testing:

```
UI Layer (Components)
        ↓
   State Hooks
        ↓
  Service Layer
        ↓
  Data Source
```

### Layers Explained

#### 1. **Data Source Layer** (Currently: localStorage, Future: Supabase)
- Location: Browser storage
- Abstraction: `JournalService.ts`
- Can be swapped without touching other layers

#### 2. **Service Layer** 
`src/Services/JournalService.ts`
- Single source of truth for data operations
- All CRUD operations centralized here
- Database-agnostic interface
- Handles data validation and transformation

#### 3. **State Management Layer**
`src/Hooks/UseJournal.ts` and `UseJournalStats.ts`
- Uses React Hooks + useState
- No Redux/Context bloat
- Direct calls to services
- Manages UI state (loading, errors)

#### 4. **UI Component Layer**
`src/Components/` and `src/Features/`
- Pure, functional components
- No service calls directly
- Uses custom hooks for data
- Focused on rendering

---

## 🔄 Data Flow Diagram

### Creating an Entry

```
User Types Title/Content/Mood
           ↓
    JournalEditor Component
           ↓
    AddJournalPage (handles form logic)
           ↓
    UseJournal.createEntry()
           ↓
    JournalService.createEntry()
           ↓
    localStorage.setItem()
           ↓
    Entry saved ✅
```

### Reading Entries

```
HomePage / MyJournalsPage Component
           ↓
    UseJournal() hook
           ↓
    JournalService.getAllEntries()
           ↓
    localStorage.getItem()
           ↓
    Entries returned ✅
```

---

## 📦 Dependency Injection Pattern

```typescript
// Components NEVER do this ❌
const entries = JSON.parse(localStorage.getItem('entries'))

// Components do this ✅
const { entries } = UseJournal()
```

This allows easy swaps:

```typescript
// Original: localStorage
const entries = localStorage.getItem(...)

// Swap 1: Supabase
const entries = supabase.from('entries').select()

// Components stay the same!
```

---

## 🔌 Migrating to Supabase

### Step 1: Update JournalService

**Before (localStorage):**
```typescript
getAllEntries(): JournalEntry[] {
  const data = localStorage.getItem(JOURNAL_STORAGE_KEY)
  return data ? JSON.parse(data) : []
}
```

**After (Supabase):**
```typescript
async getAllEntries(): Promise<JournalEntry[]> {
  const { data, error } = await supabase
    .from('entries')
    .select('*')
    .order('date', { ascending: false })
  
  if (error) throw error
  return data || []
}
```

### Step 2: Update Hooks (Minor changes)

Handle `async/await`:
```typescript
const [entries, setEntries] = useState<JournalEntry[]>([])

useEffect(() => {
  JournalService.getAllEntries().then(setEntries)
}, [])
```

### Step 3: That's it! 🎉

- **Components**: Zero changes
- **Features**: Zero changes
- **UI**: Zero changes
- **Types**: Zero changes

---

## 🧪 Testing Strategy

### Unit Tests (JournalService)
Test in isolation - mock localStorage
```typescript
beforeEach(() => localStorage.clear())
```

### Integration Tests (Hooks)
Test hooks with service layer

### Component Tests
Mock hooks, test UI rendering

---

## 🎯 Design Principles

1. **Single Responsibility**
   - Each function does one thing
   - Each component has one purpose

2. **Dependency Inversion**
   - Components depend on abstractions (hooks)
   - Not on implementations (localStorage)

3. **DRY (Don't Repeat Yourself)**
   - Shared hooks prevent duplication
   - Service centralization prevents data bugs

4. **Open/Closed**
   - Easy to add new features
   - Closed to modification of existing code

---

## 🚀 Adding New Features

### Example: Add "Favorite" Flag

**Step 1: Update Type**
```typescript
interface JournalEntry {
  // ... existing fields
  isFavorite: boolean
}
```

**Step 2: Add Service Methods**
```typescript
toggleFavorite(id: string): boolean {
  // Update entry
}

getFavoriteEntries(): JournalEntry[] {
  // Return only favorites
}
```

**Step 3: Update Hook**
```typescript
const { entries, toggleFavorite } = UseJournal()
```

**Step 4: Use in Component**
```typescript
<Button onClick={() => toggleFavorite(entry.id)}>
  ⭐ Favorite
</Button>
```

Done! No layers crossed.

---

## 📊 State Management Philosophy

**No Redux needed because:**
- Simple domain (journal entries)
- Local-first data
- No complex state trees
- React Hooks are sufficient

**When to consider Redux:**
- Multiple independent domains
- Complex state derivations
- Time-travel debugging needed
- Shared state across many components

---

## 🔐 Data Security

### Current (localStorage)
- Data visible in DevTools
- No encryption
- OK for development/demo

### After Supabase Migration
- Row-level security
- User authentication
- Encrypted transit
- Server-side validation

---

## 📈 Performance Considerations

### Caching
```typescript
// Service layer can add caching
private cache: JournalEntry[] | null = null

getAllEntries(): JournalEntry[] {
  if (this.cache) return this.cache
  this.cache = this.fetchFromDatabase()
  return this.cache
}
```

### Pagination
```typescript
getEntriesPaginated(page: number, limit: number): JournalEntry[] {
  return this.getAllEntries()
    .slice(page * limit, (page + 1) * limit)
}
```

### Infinite Scroll
Use pagination with React infinite scroll library

---

## 🗂️ File Organization Rules

✅ **Do this:**
- Put feature code in `/Features/FeatureName/`
- Put shared UI components in `/Components/UI/`
- Put domain types in `/Types/`
- Put data layer in `/Services/`

❌ **Don't do this:**
- Mix features in random folders
- Put business logic in components
- Import from same service multiple ways
- Create unnecessary utility files

---

## 🔄 Refactoring Guidelines

### Safe to Refactor:
- Extract components (no logic change)
- Rename variables
- Move utility functions
- Add tests without changing code

### Risky to Refactor:
- Change service signatures
- Modify hook returns
- Change type definitions
- Database queries

Always have tests before refactoring!

---

## 🧠 Mental Model

Think of the app as **layers**:

```
[UI - What users see]
      ↓
[Hooks - What data is needed]
      ↓
[Services - How to get data]
      ↓
[Storage - Where data lives]
```

Each layer should only know about the layer below.
Components don't know about localStorage.
Hooks don't know about localStorage.
Services know about storage.

This is the key to maintainability!

---

## 📚 Further Reading

- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [React Hooks Best Practices](https://react.dev/reference/react/hooks)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## ❓ Common Questions

**Q: Why no Context API?**
A: Context is overkill for simple apps. Hooks + Service pattern is cleaner.

**Q: Why localStorage instead of Supabase from start?**
A: Faster development, no backend setup, easy to test.

**Q: How to add authentication?**
A: Service layer already supports it. Just add auth checks before data access.

**Q: Can I use Redux?**
A: Yes, but replace `JournalService` with Redux store. Components stay same!

---

Generated for Daily Dots Project
