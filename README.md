# Daily Dots - Daily Journal with Mood Tracker

A modern, responsive web application for journaling and mood tracking built with **Vite**, **React 19**, **TypeScript**, and **Tailwind CSS**.

## Features

✨ **Core Features**
- 📝 One journal entry per calendar day
- 😊 Mood tracking with emoji indicators
- 📅 Beautiful date management
- 🔍 Search and filter entries by title, content, or mood
- 📊 Dashboard with statistics (total entries, streaks, mood distribution)
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🌓 Light/dark mode support

✅ **Functionality**
- Create new journal entries with date, title, mood, and content
- Edit existing entries (update if date matches)
- Delete entries with confirmation
- View all past entries
- Real-time statistics and mood tracking
- Character count while writing
- Local persistence using localStorage

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Utilities**: clsx
- **Testing**: Vitest, React Testing Library
- **Storage**: localStorage (service layer ready for Supabase migration)

## Project Structure

```
src/
├── App.tsx                          # Main app component with navigation
├── main.tsx                         # Entry point
├── index.css                        # Global styles
├── Types/
│   └── JournalEntry.ts             # Mood and Journal Entry types
├── Services/
│   └── JournalService.ts           # Data layer abstraction
├── Hooks/
│   ├── UseJournal.ts               # Journal management hook
│   └── UseJournalStats.ts          # Statistics computation hook
├── Components/
│   ├── Layout/
│   │   └── Layout.tsx              # Main layout wrapper
│   ├── UI/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Card.tsx
│   │   └── Badge.tsx
│   └── Journal/
│       ├── MoodSelector.tsx        # Mood picker component
│       ├── JournalEditor.tsx       # Editor form
│       ├── JournalCard.tsx         # Entry preview card
│       └── JournalList.tsx         # Entry list grid
└── Features/
    ├── Dashboard/
    │   └── HomePage.tsx            # Home/dashboard page
    └── Journal/
        ├── MyJournalsPage.tsx      # Journal list with filters
        └── AddJournalPage.tsx      # Create/edit page
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd DAILYDOTS
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

The app will open at `http://localhost:5173`

## Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Build
npm run build        # Production build
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run typecheck    # Check TypeScript types

# Testing
npm run test         # Run tests
npm run test:ui      # Run tests with UI
```

## Usage

### Home Page
- View today's entry and recent entries
- See mood statistics and current streak
- Quick access to create a new entry
- Navigate to view all journals

### My Journals Page
- Browse all journal entries
- Search by title or content
- Filter by mood
- Sort by date or title
- Quick edit/delete buttons
- Shows entry count and preview

### Add/Edit Journal
- Create new entries with automatic date selection
- Edit existing entries (date cannot be changed to prevent duplicates)
- Select mood using emoji picker
- Character count display
- Auto-save capability

## Data Persistence

All journal entries are stored in **localStorage** through a service layer.

### Swapping to Supabase

To migrate to Supabase:

1. Update `src/Services/JournalService.ts`:
   - Replace localStorage calls with Supabase queries
   - Update `createEntry`, `updateEntry`, `deleteEntry`, etc.
   - No changes needed to components or hooks!

The service layer ensures easy database swaps without affecting the rest of the app.

## Keyboard Shortcuts

- `Enter` (Ctrl/Cmd+Enter) to submit forms
- `Tab` to navigate between form fields

## Accessibility

- ♿ Semantic HTML structure
- ⌨️ Keyboard navigation support
- 👁️ Focus indicators on interactive elements
- 📢 ARIA labels where appropriate
- 🎨 Color contrast compliant

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

## Future Enhancements

- 🔐 User authentication (Supabase)
- 🌐 Cloud sync across devices
- 📈 Advanced mood charts and analytics
- 🏷️ Entry tags and categories
- 📧 Email digests and reminders
- 🎨 Customizable themes
- 📤 Export entries (PDF, CSV)
- 🔔 Notifications and streak reminders

## License

MIT

## Contributing

Contributions are welcome! Please follow the project's architecture and style guidelines.
