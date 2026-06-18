# FAQ & Troubleshooting

## 🚀 Getting Started

### Q: How do I run the app?
**A:** 
```bash
npm install
npm run dev
```
Open http://localhost:5173

### Q: What if I get "port 5173 already in use"?
**A:**
```bash
npm run dev -- --port 5174
```
Or kill the process using that port.

### Q: How do I test the app?
**A:** Try these steps:
1. Create a new entry on the home page
2. Add a title like "Day 1"
3. Select a mood (😊 Happy)
4. Write some text
5. Click "Save Entry"
6. See it appear on home & journals page

---

## 💾 Data & Storage

### Q: Where is my data stored?
**A:** In your browser's localStorage.
- **Chrome/Edge**: DevTools → Application → LocalStorage → (your domain) → `daily_dots_journal_entries`
- **Firefox**: DevTools → Storage → Local Storage
- **Safari**: DevTools → Storage → Local Storage

### Q: Will my data be lost?
**A:** 
- ✅ Safe if you use the same browser
- ❌ Lost if you clear browser cache/cookies
- ❌ Not synced across devices (use Supabase for that)

### Q: Can I export my data?
**A:** Currently no, but you can:
1. Open DevTools
2. Application → LocalStorage
3. Copy the `daily_dots_journal_entries` value
4. Save to a text file

### Q: How do I migrate to Supabase?
**A:** Read [ARCHITECTURE.md](ARCHITECTURE.md#migrating-to-supabase)
- Update `src/Services/JournalService.ts`
- Components stay the same!

---

## 🐛 Common Issues

### Issue: App shows blank page
**Solution:**
1. Check browser console for errors (F12)
2. Hard refresh (Ctrl+Shift+R)
3. Clear cache: `npm run build && npm run preview`

### Issue: Entries not saving
**Solution:**
1. Check if localStorage is enabled
   - Some browsers/modes disable it
2. Verify no console errors (F12)
3. Check storage quota
4. Try incognito/private mode

### Issue: TypeScript errors
**Solution:**
```bash
npm run typecheck
```
Fix any reported errors.

### Issue: Port 3000/5173 conflict
**Solution:**
```bash
# Find what's using the port
netstat -ano | findstr :5173    # Windows
lsof -i :5173                  # Mac/Linux

# Kill the process or use different port
npm run dev -- --port 5174
```

### Issue: Styles not loading
**Solution:**
1. Make sure Tailwind is built
2. Clear node_modules:
   ```bash
   rm -rf node_modules
   npm install
   ```
3. Restart dev server

---

## 🔧 Development

### Q: How do I add a new page?
**A:**
1. Create component in `src/Features/FeatureName/PageName.tsx`
2. Add case in `src/App.tsx` navigation
3. Add button/link to navigate there

### Q: How do I add a new field to journal entry?
**A:**
1. Update `JournalEntry` interface in `src/Types/JournalEntry.ts`
2. Update `JournalService` methods in `src/Services/JournalService.ts`
3. Use in components via `UseJournal` hook
4. Update forms/displays

### Q: How do I add validation?
**A:** In `JournalEditor.tsx`:
```typescript
if (!title.trim()) {
  alert('Title is required')
  return
}
```

### Q: Can I use Redux/Context instead?
**A:** Yes! Just replace `JournalService` with Redux store in `UseJournal.ts`. Components stay the same!

### Q: How do I add i18n (multiple languages)?
**A:** 
1. Create `src/i18n/translations.ts`
2. Replace hardcoded strings with `t('key')`
3. Components unchanged, just use hook

---

## 🧪 Testing

### Q: How do I run tests?
**A:**
```bash
npm run test              # Run all
npm run test:ui          # Interactive
npm run test -- --watch  # Watch mode
```

### Q: How do I test a component?
**A:** Create `ComponentName.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import { Button } from '@/Components/UI/Button'

it('renders button text', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByText('Click me')).toBeInTheDocument()
})
```

### Q: How do I mock JournalService?
**A:**
```typescript
import { vi } from 'vitest'
import JournalService from '@/Services/JournalService'

vi.mock('@/Services/JournalService', () => ({
  default: {
    getAllEntries: vi.fn(() => []),
    createEntry: vi.fn(),
  }
}))
```

---

## 📦 Dependencies

### Q: What does each dependency do?
- **react/react-dom** - UI framework
- **typescript** - Type safety
- **tailwindcss** - Styling
- **vite** - Build tool
- **date-fns** - Date utilities
- **lucide-react** - Icons
- **clsx** - Class name utility
- **vitest** - Testing

### Q: Do I need to install all dependencies?
**A:** No, only if you use them:
- Remove `vitest` if not testing
- Remove `lucide-react` if not using icons
- etc.

### Q: Can I use different UI library instead of Tailwind?
**A:** Yes! Update styles in components:
- Replace Tailwind classes with your library
- No logic changes needed

---

## 🚀 Deployment

### Q: How do I deploy to Vercel?
**A:**
1. Push code to GitHub
2. Connect repo to Vercel
3. Deploy with 1 click

### Q: How do I deploy to Netlify?
**A:**
1. Push code to GitHub
2. Connect repo to Netlify
3. Set build command: `npm run build`
4. Deploy!

### Q: What's the production build size?
**A:** Usually ~50-100KB (gzipped)
```bash
npm run build
# Check dist/ folder
```

### Q: Should I add a backend?
**A:** Start with localStorage, add backend when needed:
- Need user accounts? → Add auth
- Need data sync? → Add Supabase
- Need API calls? → Add backend

---

## 🔐 Security

### Q: Is localStorage secure?
**A:** No, it's visible in DevTools. Use Supabase for real app.

### Q: Should I store sensitive data?
**A:** No. Never store:
- Passwords
- API keys
- Personal info
- Payment data

### Q: How do I add authentication?
**A:** 
1. Add Supabase auth
2. Store session token
3. Verify on backend
4. See ARCHITECTURE.md for pattern

---

## 🎨 Customization

### Q: How do I change colors?
**A:** Update `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color'
    }
  }
}
```

### Q: How do I change fonts?
**A:** Update `tailwind.config.js`:
```javascript
theme: {
  fontFamily: {
    sans: ['Your Font']
  }
}
```

### Q: How do I add more moods?
**A:**
1. Add to `MoodType` enum
2. Add emoji to `moodEmojis`
3. Add label to `moodLabels`
4. Button grid updates automatically!

---

## 📈 Performance

### Q: Is the app fast?
**A:** Yes! Vite makes it very fast.
- Dev server: ~50ms reloads
- Production build: ~100KB gzipped
- First load: ~1-2 seconds

### Q: How do I optimize further?
**A:**
- Code splitting by route
- Lazy load components
- Memoize expensive computations
- Use `React.memo()` on components
- Profile with DevTools

### Q: Should I add a CDN?
**A:** Later, when deployed to production.

---

## 🤝 Contributing

### Q: How do I add new features?
**A:** Follow the architecture:
1. Add types/interfaces
2. Add service methods
3. Update hooks
4. Use in components

### Q: How do I fix a bug?
**A:**
1. Create a test that fails
2. Fix the code
3. Test passes ✅
4. Commit with clear message

### Q: Code style?
**A:** Automatic with:
```bash
npm run format  # Prettier
npm run lint    # ESLint
```

---

## 📞 Still Need Help?

1. **Check the docs:**
   - [README.md](README.md) - Complete guide
   - [QUICKSTART.md](QUICKSTART.md) - Quick start
   - [ARCHITECTURE.md](ARCHITECTURE.md) - Design patterns

2. **Look at similar projects:**
   - React examples
   - Vite demos
   - Tailwind samples

3. **Check the code:**
   - Components are well-commented
   - Service patterns are clear
   - Tests show usage examples

---

**Happy building! 🚀**
