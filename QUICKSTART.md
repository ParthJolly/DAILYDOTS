# Quick Start Guide - Daily Dots

## 🚀 Get Running in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app opens at **http://localhost:5173**

### 3. Start Journaling! ✍️

---

## 📱 App Navigation

The app uses simple state-based navigation (no routing library needed):

- **Home Page** - Dashboard with stats, today's entry, and recent entries
- **My Journals** - Search, filter, and browse all entries
- **Add/Edit** - Create new or edit existing entries

---

## 💾 Data Storage

All entries are saved to **localStorage** (persists in your browser).

### To Migrate to Supabase Later:

Simply update `src/Services/JournalService.ts` with Supabase client calls. The service layer abstracts all database operations, so components stay the same!

---

## ✨ Key Features to Try

1. **Create an Entry**
   - Click "+ New Entry" on home page
   - Select a mood (emoji picker)
   - Write your thoughts
   - Character count shows in real-time

2. **Search & Filter**
   - Go to "My Journals"
   - Search by title or content
   - Filter by mood
   - Sort by date or title

3. **Edit Entries**
   - Click "View/Edit" on any entry card
   - Update title, content, or mood
   - Delete with confirmation

4. **Dashboard Stats**
   - Total entries count
   - Entries this month/week
   - Current writing streak
   - Mood distribution

---

## 🧪 Run Tests

```bash
npm run test          # Run all tests
npm run test:ui       # Interactive test UI
```

---

## 🔧 Code Quality

```bash
npm run typecheck     # TypeScript check
npm run lint          # ESLint check
npm run format        # Auto-format code
```

---

## 📚 Project Structure

```
src/
├── App.tsx                    # Main app (navigation logic)
├── main.tsx                   # Entry point
├── Components/                # UI components
├── Features/                  # Feature pages
├── Services/                  # Data layer
├── Hooks/                     # Custom hooks
├── Types/                     # TypeScript interfaces
└── Utils/                     # Utility functions
```

---

## 🌓 Dark Mode

Dark mode is automatically enabled based on your system preferences. All components support both light and dark themes via CSS variables.

---

## 📝 Create First Entry

**Quick workflow:**
1. Go to Home page → Click "Create Entry"
2. Select today's date (auto-filled)
3. Add title: "Day One" 
4. Select mood: 😊 Happy
5. Write your thoughts
6. Click "Save Entry"

Done! Your entry is persisted to localStorage.

---

## 🐛 Troubleshooting

**App not starting?**
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Data cleared?**
- Check browser's Application → LocalStorage
- If cleared, data is gone (not synced to server yet)

**TypeScript errors?**
```bash
npm run typecheck
```

---

## 🚀 Next Steps

1. Try creating 5-7 entries with different moods
2. Test search and filter features
3. Check the dashboard statistics
4. Review the code architecture
5. When ready, migrate to Supabase (follow the comments in `JournalService.ts`)

---

Enjoy journaling! 🎉
