# Daily Dots - Complete Project Structure

```
DAILYDOTS/
│
├── 📄 Configuration Files
│   ├── package.json                 ← Dependencies & npm scripts
│   ├── vite.config.ts              ← Build configuration
│   ├── tsconfig.json               ← TypeScript base config
│   ├── tsconfig.app.json           ← TypeScript app config
│   ├── tsconfig.node.json          ← TypeScript node config
│   ├── tailwind.config.js          ← Tailwind CSS themes
│   ├── postcss.config.js           ← CSS post-processing
│   ├── vitest.config.ts            ← Testing configuration
│   ├── .eslintrc.cjs               ← Linting rules
│   ├── .prettierrc                 ← Code formatting
│   ├── .gitignore                  ← Git ignore patterns
│   └── index.html                  ← HTML entry point
│
├── 📚 Documentation
│   ├── README.md                   ← Complete guide
│   ├── QUICKSTART.md               ← Get started in 3 steps
│   ├── ARCHITECTURE.md             ← Design patterns explained
│   ├── PROJECT_SUMMARY.md          ← This project overview
│   ├── AGENTS.md                   ← Development guidelines
│   └── .github/
│       ├── copilot-instructions.md ← AI conventions
│       └── instructions/
│           ├── general.instructions.md
│           ├── typescript-react.instructions.md
│           ├── design.instructions.md
│           └── css-tailwind.instructions.md
│
├── .vscode/
│   ├── settings.json               ← VS Code settings
│   └── extensions.json             ← Recommended extensions
│
└── 📁 src/
    │
    ├── main.tsx                    ← React entry point
    ├── App.tsx                     ← Main app component (navigation)
    ├── index.css                   ← Global styles (Tailwind)
    │
    ├── 🎯 Types/
    │   └── JournalEntry.ts         ← Domain models & enums
    │                                  - MoodType enum
    │                                  - JournalEntry interface
    │                                  - Type utilities
    │
    ├── 💾 Services/
    │   ├── JournalService.ts       ← Data layer abstraction
    │   │                              - getAllEntries()
    │   │                              - createEntry()
    │   │                              - updateEntry()
    │   │                              - deleteEntry()
    │   │                              - getStatistics()
    │   │                              - [Can swap to Supabase]
    │   └── JournalService.test.ts  ← Unit tests for service
    │
    ├── 🪝 Hooks/
    │   ├── UseJournal.ts           ← Entry management hook
    │   │                              - entries state
    │   │                              - CRUD operations
    │   │                              - Error handling
    │   └── UseJournalStats.ts      ← Statistics computation
    │                                  - Streak calculation
    │                                  - Mood counting
    │                                  - Period calculations
    │
    ├── 🧩 Components/
    │   │
    │   ├── UI/                     ← Reusable UI components
    │   │   ├── Button.tsx          ← Button with variants
    │   │   ├── Input.tsx           ← Text input field
    │   │   ├── Textarea.tsx        ← Multi-line text input
    │   │   ├── Card.tsx            ← Card container
    │   │   └── Badge.tsx           ← Status badge
    │   │
    │   ├── Journal/                ← Journal-specific components
    │   │   ├── MoodSelector.tsx    ← Mood emoji picker
    │   │   ├── JournalEditor.tsx   ← Entry editor form
    │   │   │                          - Title input
    │   │   │                          - Mood selector
    │   │   │                          - Content editor
    │   │   │                          - Save/Delete buttons
    │   │   ├── JournalCard.tsx     ← Entry preview card
    │   │   │                          - Title & date
    │   │   │                          - Mood emoji
    │   │   │                          - Content preview
    │   │   └── JournalList.tsx     ← Grid of entry cards
    │   │
    │   └── Layout/
    │       └── Layout.tsx          ← Main layout wrapper
    │                                  - Header
    │                                  - Navigation
    │
    ├── 🎨 Features/                ← Feature-based pages
    │   │
    │   ├── Dashboard/
    │   │   └── HomePage.tsx        ← Home/Dashboard page
    │   │                              - Today's entry section
    │   │                              - Quick stats
    │   │                              - Mood distribution
    │   │                              - Recent entries
    │   │
    │   └── Journal/
    │       ├── MyJournalsPage.tsx  ← Browse/filter page
    │       │                          - Search bar
    │       │                          - Mood filter
    │       │                          - Sort options
    │       │                          - Entry list
    │       └── AddJournalPage.tsx  ← Create/edit page
    │                                  - Form handling
    │                                  - Validation
    │                                  - Error messages
    │
    └── 🛠️ Utils/
        ├── dateUtils.ts            ← Date helper functions
        │                              - formatDate()
        │                              - getDateString()
        │                              - daysBetween()
        │                              - isSameDay()
        └── stringUtils.ts           ← String utilities
                                       - debounce()
                                       - truncateText()
                                       - capitalize()
                                       - formatNumber()
```

---

## 📊 Data Flow

### Creating an Entry
```
HomePage / AddJournalPage
      ↓
  JournalEditor (form)
      ↓
  AddJournalPage.handleSave()
      ↓
  UseJournal.createEntry()
      ↓
  JournalService.createEntry()
      ↓
  localStorage.setItem()
      ↓
  UI updates ✅
```

### Viewing Entries
```
HomePage / MyJournalsPage
      ↓
  UseJournal hook (renders)
      ↓
  JournalService.getAllEntries()
      ↓
  localStorage.getItem()
      ↓
  Components render entries ✅
```

---

## 📦 Component Hierarchy

```
App
├── HomePage
│   ├── StatCard (×4)
│   ├── Card (Today's Entry)
│   ├── Card (Mood Distribution)
│   └── JournalCard (×3 recent)
│
├── MyJournalsPage
│   ├── Card (Search & Filter)
│   │   ├── Input (search)
│   │   ├── Badge (mood filters)
│   │   └── Button (sort options)
│   └── JournalList
│       └── JournalCard (×N)
│
└── AddJournalPage
    └── JournalEditor
        ├── Input (date)
        ├── Input (title)
        ├── MoodSelector
        │   └── Button (×6 moods)
        ├── Textarea (content)
        └── Button (Save/Delete/Cancel)
```

---

## 🔄 State Management

**Global State:** None! (React Context would be overkill)

**Local State:**
- **App**: `currentPage`, `editEntry`
- **UseJournal**: `entries`, `loading`, `error`
- **JournalEditor**: `date`, `title`, `content`, `mood`
- **MyJournalsPage**: `searchQuery`, `selectedMood`, `sortBy`

**Derived State:**
- `UseJournalStats`: Computed from entries (streak, counts, etc.)

---

## 📁 File Count Summary

```
Configuration Files:     13
TypeScript/React:        15
Test Files:              1
Utility Files:           2
Documentation:           8
─────────────────────────
Total:                   39 files
```

---

## 🔌 Integration Points

**Where Components Talk to Services:**
```typescript
// Always through hooks!
const { entries, createEntry } = UseJournal()

// Never directly:
// ❌ import JournalService from '@/Services/JournalService'
// ✅ const { entries } = UseJournal()
```

---

## 🔐 Dependency Graph

```
UI Components
      ↑
Features (Pages)
      ↑
Hooks (UseJournal, UseJournalStats)
      ↑
Services (JournalService)
      ↑
Types (JournalEntry)
      ↑
Data Storage (localStorage)
```

No circular dependencies!
No cross-layer imports!
Clean separation of concerns!

---

## 🚀 Key Architectural Decisions

| Decision | Reason |
|----------|--------|
| Service Layer | Abstracts data source, easy Supabase migration |
| Custom Hooks | Replaces Redux, simpler state management |
| Feature-based | Easy to add/remove features |
| TypeScript Strict | Catches bugs at compile time |
| Tailwind CSS | No CSS file bloat, faster development |
| localStorage | Development speed, no backend needed |
| No Router Library | Simple state-based navigation |
| Functional Components | Modern React best practices |

---

## 🎯 Where to Make Changes

| Goal | File to Change |
|------|----------------|
| Add new field to entry | `Types/JournalEntry.ts` |
| Add database operation | `Services/JournalService.ts` |
| Add UI component | `Components/UI/*.tsx` |
| Add feature page | `Features/FeatureName/*.tsx` |
| Add utility function | `Utils/*.ts` |
| Change theme colors | `tailwind.config.js` |
| Add linting rule | `.eslintrc.cjs` |
| Migrate to Supabase | `Services/JournalService.ts` |

---

Happy exploring! 🚀
