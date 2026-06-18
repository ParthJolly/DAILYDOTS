# 📔 DailyDots - Daily Journal & Mood Tracker

> A modern, production-ready daily journal application with mood tracking, built with React, TypeScript, and Tailwind CSS.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5-blue?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-blue?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

### 📖 Journal Management
- ✍️ Create, read, update, and delete journal entries
- 📅 Date-based entry organization (one entry per day)
- 🔍 Full-text search across entries
- 🏷️ Filter entries by mood
- 📊 Sort entries by date or mood
- ⭐ Mark favorite entries

### 🎭 Mood Tracking
- 6 mood types: Amazing, Happy, Calm, Neutral, Sad, Angry
- Emoji-based mood selector
- Mood statistics and distribution
- Mood history visualization
- Weekly/monthly mood trends

### 📊 Dashboard
- Today's entry preview
- Recent entries feed
- Mood statistics
- Writing streak tracking
- Quick action buttons

### 🎨 User Experience
- 📱 Fully responsive (mobile, tablet, desktop)
- 🌙 Dark mode support
- ⌨️ Keyboard navigation
- ♿ WCAG accessibility compliance
- ⚡ Fast and smooth interactions

### 🛠️ Developer Experience
- TypeScript strict mode enabled
- Clean, layered architecture
- Comprehensive service layer
- Custom React hooks
- Extensive test coverage
- ESLint + Prettier configured

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd daily-dots

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit **http://localhost:5173** in your browser.

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run typecheck    # TypeScript type checking
npm run test         # Run unit tests
npm run test:ui      # Run tests with UI
```

---

## 📁 Project Structure

```
src/
├── App.tsx                    # Main app component with routing
├── main.tsx                   # React entry point
├── index.css                  # Global styles
│
├── Components/
│   ├── Journal/              # Journal-specific components
│   │   ├── JournalCard.tsx
│   │   ├── JournalEditor.tsx
│   │   ├── JournalList.tsx
│   │   └── MoodSelector.tsx
│   ├── Layout/               # App layout
│   │   └── Layout.tsx
│   └── UI/                   # Reusable UI components
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       └── Textarea.tsx
│
├── Features/
│   ├── Dashboard/            # Home page
│   │   └── HomePage.tsx
│   └── Journal/              # Journal pages
│       ├── AddJournalPage.tsx
│       └── MyJournalsPage.tsx
│
├── Hooks/                    # Custom React hooks
│   ├── UseJournal.ts        # Journal data management
│   └── UseJournalStats.ts   # Statistics computation
│
├── Services/                 # Business logic & data access
│   ├── JournalService.ts    # CRUD operations
│   └── JournalService.test.ts
│
├── Types/                    # TypeScript types
│   └── JournalEntry.ts
│
└── Utils/                    # Utility functions
    ├── dateUtils.ts
    └── stringUtils.ts
```

---

## 🏗️ Architecture

DailyDots follows a **layered architecture** for maintainability and scalability:

```
UI Components (React)
      ↓
Custom Hooks (Data Management)
      ↓
Service Layer (Business Logic)
      ↓
Data Source (localStorage / Supabase)
```

### Design Principles

- **Separation of Concerns**: UI, state management, and data access are separate
- **Single Responsibility**: Each component/hook/service has one job
- **Dependency Inversion**: Components depend on abstractions (hooks), not implementations
- **Database Agnostic**: Service layer abstraction allows easy migration from localStorage to Supabase

See [docs/ARCHITECTURE.md](/docs/ARCHITECTURE.md) for detailed architecture documentation.

---

## 💾 Data Storage

Currently, DailyDots uses **localStorage** for persistence:
- Entries persist in browser local storage
- No backend required
- Perfect for local-first applications

### Future: Supabase Migration

To migrate to Supabase:
1. Install Supabase client: `npm install @supabase/supabase-js`
2. Update `src/Services/JournalService.ts` with Supabase client calls
3. Components remain unchanged (service layer abstraction)

See [docs/DATABASE.md](/docs/DATABASE.md) for details.

---

## 🧬 Key Technologies

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | React 19 | UI library |
| **Language** | TypeScript | Type safety |
| **Build Tool** | Vite | Fast development & build |
| **Styling** | Tailwind CSS v4 | Utility-first CSS |
| **UI Components** | shadcn/ui | Pre-built components |
| **Icons** | Lucide React | Icon library |
| **Date Handling** | date-fns | Date utilities |
| **Testing** | Vitest + React Testing Library | Unit & component testing |
| **Code Quality** | ESLint + Prettier | Linting & formatting |

---

## 🔧 Configuration

### Environment Variables

No environment variables required for basic usage (localStorage mode).

For Supabase mode, add to `.env.local`:
```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Tailwind CSS Configuration

See [tailwind.config.js](/tailwind.config.js) for theme customization.

### TypeScript Configuration

TypeScript strict mode is enabled. See [tsconfig.json](/tsconfig.json).

---

## 📖 Documentation

- **[Installation & Setup](/docs/INSTALLATION.md)** - Detailed setup instructions
- **[Development Guide](/docs/DEVELOPMENT.md)** - Development workflow and best practices
- **[Architecture](/docs/ARCHITECTURE.md)** - System design and data flow
- **[Database](/docs/DATABASE.md)** - Data schema and persistence
- **[Components](/docs/COMPONENTS.md)** - Component reference
- **[Custom Hooks](/docs/HOOKS.md)** - Hook documentation
- **[Services](/docs/SERVICES.md)** - Service layer reference
- **[Troubleshooting](/docs/TROUBLESHOOTING.md)** - Common issues and solutions

---

## 🧪 Testing

Run tests with Vitest:

```bash
# Run all tests
npm run test

# Watch mode
npm run test -- --watch

# UI mode
npm run test:ui

# Coverage
npm run test -- --coverage
```

Tests are located alongside source files with `.test.ts(x)` extension.

---

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

### Deployment Options

- **Vercel**: Connected Git repo deploys automatically
- **Netlify**: Similar automatic deployments
- **Static Hosting**: Upload `dist/` to any static host (GitHub Pages, etc.)

### Environment Setup for Supabase

If using Supabase, set environment variables in your hosting platform:
```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

---

## 🤝 Contributing

### Code Standards

- Follow TypeScript strict mode
- Keep components small and focused (< 200 lines)
- Use custom hooks for reusable logic
- Write tests for new features
- Format code with Prettier
- Ensure ESLint passes

### Development Workflow

1. Create a feature branch
2. Make changes following project conventions
3. Run tests: `npm run test`
4. Run linter: `npm run lint`
5. Format code: `npm run format`
6. Commit with descriptive messages
7. Push and create a pull request

See [AGENTS.md](/AGENTS.md) for detailed contribution guidelines.

---

## 📝 License

MIT - feel free to use this project for personal or commercial purposes.

---

## 🎯 Roadmap

Planned features:
- [ ] User authentication (Supabase Auth)
- [ ] Cloud synchronization (Supabase)
- [ ] Tagging system
- [ ] Advanced filtering and search
- [ ] Export entries (PDF, JSON)
- [ ] Mobile app (React Native)
- [ ] Sharing capabilities
- [ ] Writing insights & analytics

---

## 💡 Support

For issues or questions:
1. Check [docs/TROUBLESHOOTING.md](/docs/TROUBLESHOOTING.md)
2. Review existing GitHub issues
3. Open a new issue with details

---

## 🙏 Acknowledgments

- Built with [React](https://react.dev)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide React](https://lucide.dev)

---

**Happy journaling! ✍️**
