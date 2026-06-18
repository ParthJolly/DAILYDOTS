# Troubleshooting Guide

## Common Issues & Solutions

### Development Server Issues

#### Port Already in Use

**Problem**: `Error: Port 5173 is already in use`

**Solutions**:

Option 1: Use a different port
```bash
npm run dev -- --port 3000
```

Option 2: Kill the process using the port
```bash
# On Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# On macOS/Linux
lsof -i :5173
kill -9 <PID>
```

---

#### Module Not Found

**Problem**: `Cannot find module '@/Components/...'`

**Solutions**:

1. Verify the file exists:
   ```bash
   # Check if file is in the right location
   ls src/Components/UI/Button.tsx
   ```

2. Clear cache:
   ```bash
   rm -rf node_modules
   npm install
   ```

3. Restart dev server:
   ```bash
   npm run dev
   ```

---

#### Hot Module Replacement (HMR) Not Working

**Problem**: Changes don't appear without refreshing

**Solutions**:

1. Restart dev server:
   ```bash
   npm run dev
   ```

2. Clear browser cache (DevTools → Application → Clear cache)

3. Hard refresh: `Ctrl+Shift+R` or `Cmd+Shift+R`

---

### TypeScript Issues

#### Type Errors

**Problem**: `Type error: Property 'xyz' does not exist`

**Solution**:

1. Check types are defined correctly:
   ```typescript
   // Make sure types are exported from Types folder
   export interface MyType {
     id: string
     title: string
   }
   ```

2. Import types correctly:
   ```typescript
   import type { MyType } from '@/Types/MyType'
   ```

3. Run type checker:
   ```bash
   npm run typecheck
   ```

---

#### Type 'any' Errors

**Problem**: `Parameter 'x' implicitly has an 'any' type`

**Solution**:

```typescript
// ❌ Don't use any
const data: any = {}

// ✅ Define proper type
interface Entry {
  id: string
  title: string
}

const data: Entry = {
  id: '123',
  title: 'Entry'
}
```

---

### Data Persistence Issues

#### Entries Not Saving

**Problem**: Data is lost after refresh

**Diagnosis**:

```typescript
// Check localStorage in browser console
localStorage.getItem('daily_dots_journal_entries')

// Check if localStorage is accessible
typeof localStorage === 'undefined'
```

**Solutions**:

1. Check if localStorage is available:
   ```typescript
   function isStorageAvailable() {
     try {
       localStorage.setItem('test', 'test')
       localStorage.removeItem('test')
       return true
     } catch {
       return false // Private browsing mode
     }
   }
   ```

2. Use private/incognito mode check:
   - localStorage is disabled in private browsing
   - Test in normal browsing mode

3. Clear old data:
   ```bash
   # In browser console
   localStorage.clear()
   ```

---

#### Storage Quota Exceeded

**Problem**: `QuotaExceededError: DOM Exception 22`

**Diagnosis**:

```javascript
// Check storage usage
JSON.stringify(localStorage).length // bytes used
localStorage.getItem('daily_dots_journal_entries').length
```

**Solutions**:

1. Clear old entries:
   ```typescript
   const entries = JournalService.getAllEntries()
   const recent = entries.filter(e => {
     const date = new Date(e.date)
     const oneYearAgo = new Date()
     oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
     return date > oneYearAgo
   })
   localStorage.setItem('daily_dots_journal_entries', JSON.stringify(recent))
   ```

2. Export and backup:
   - Use export feature to backup entries
   - Clear storage
   - Can re-import later

3. Migrate to Supabase (handles unlimited storage)

---

### UI/Styling Issues

#### Tailwind Styles Not Applied

**Problem**: Classes like `text-primary` don't work

**Solutions**:

1. Ensure Tailwind CSS is imported in `src/index.css`:
   ```css
   @import "tailwindcss";
   ```

2. Check if dev server is running:
   ```bash
   npm run dev
   ```

3. Restart dev server if styles still don't appear:
   ```bash
   # Stop (Ctrl+C) and restart
   npm run dev
   ```

4. Verify class names are correct:
   ```tsx
   // ✅ Correct
   className="text-foreground bg-card"

   // ❌ Invalid (Tailwind doesn't have these)
   className="text-primary-color bg-my-card"
   ```

---

#### Dark Mode Not Working

**Problem**: Dark mode toggle doesn't change colors

**Solutions**:

1. Use semantic color variables:
   ```tsx
   // ✅ Works with dark mode
   className="bg-background text-foreground"

   // ❌ Hardcoded colors (don't support dark mode)
   className="bg-white text-black"
   ```

2. Check browser dark mode setting:
   - DevTools → Rendering → Emulate CSS media feature prefers-color-scheme

3. Add dark mode manually in Tailwind:
   ```tsx
   className="bg-white dark:bg-black"
   ```

---

#### Responsive Design Issues

**Problem**: Layout looks wrong on mobile

**Solutions**:

1. Use mobile-first approach:
   ```tsx
   // ✅ Mobile-first
   className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"

   // ❌ Desktop-first (harder to maintain)
   className="grid grid-cols-3 lg:grid-cols-1"
   ```

2. Test responsive design:
   - Open DevTools (`F12`)
   - Toggle device toolbar (`Ctrl+Shift+M`)
   - Test on different screen sizes

3. Check media queries:
   ```bash
   npm run build
   npm run preview
   ```

---

### Performance Issues

#### Slow Development Server

**Problem**: Dev server is slow or unresponsive

**Solutions**:

1. Restart dev server:
   ```bash
   npm run dev
   ```

2. Clear Vite cache:
   ```bash
   rm -rf node_modules/.vite
   npm run dev
   ```

3. Check Node.js version:
   ```bash
   node --version # Should be 18+
   ```

4. Reduce number of files (split components):
   - Components > 200 lines should be split

---

#### Slow Page Load

**Problem**: Page takes long to load

**Solutions**:

1. Check production build performance:
   ```bash
   npm run build
   npm run preview
   ```

2. Analyze bundle size:
   ```bash
   npm install -g vite-plugin-visualizer
   ```

3. Optimize imports:
   ```typescript
   // ❌ Bad (imports whole component)
   import * as Components from '@/Components'

   // ✅ Good (imports only needed)
   import { Button } from '@/Components/UI/Button'
   ```

---

### Testing Issues

#### Tests Failing

**Problem**: `npm run test` shows failures

**Solutions**:

1. Run tests in watch mode:
   ```bash
   npm run test -- --watch
   ```

2. Run specific test file:
   ```bash
   npm run test -- JournalService.test.ts
   ```

3. Check test output:
   ```bash
   npm run test -- --reporter=verbose
   ```

4. Debug test:
   ```bash
   npm run test -- --inspect-brk JournalService.test.ts
   ```

---

#### localStorage Not Available in Tests

**Problem**: localStorage is undefined in tests

**Solution**:

```typescript
// Tests use jsdom which provides localStorage
// If still failing, mock it:

import { beforeEach } from 'vitest'

beforeEach(() => {
  // localStorage is available by default
  localStorage.clear()
})
```

---

### Build Issues

#### Build Fails

**Problem**: `npm run build` fails with error

**Diagnosis**:

1. Run type check first:
   ```bash
   npm run typecheck
   ```

2. Run linter:
   ```bash
   npm run lint
   ```

3. Check for console.log statements:
   ```bash
   grep -r "console.log" src/
   ```

**Solutions**:

1. Fix TypeScript errors:
   ```bash
   npm run typecheck
   # Fix errors shown
   ```

2. Fix ESLint issues:
   ```bash
   npm run lint -- --fix
   ```

3. Remove debug code (console.log, debugger statements)

4. Clear build cache:
   ```bash
   rm -rf dist
   npm run build
   ```

---

#### Large Build Size

**Problem**: Build file is larger than expected

**Solutions**:

1. Analyze bundle:
   ```bash
   npm install -g vite-plugin-visualizer
   npm run build
   ```

2. Remove unused dependencies:
   ```bash
   npm list # See all dependencies
   npm uninstall unused-package
   ```

3. Use tree-shaking:
   ```typescript
   // ✅ Named imports (tree-shakeable)
   import { Button } from '@/Components/UI/Button'

   // ❌ Default import (may not be tree-shaken)
   import * as UI from '@/Components/UI'
   ```

---

### Git & Version Control Issues

#### Git Conflicts

**Problem**: Merge conflicts when pulling

**Solutions**:

1. See conflicted files:
   ```bash
   git status
   ```

2. Resolve manually or use tool:
   ```bash
   git mergetool
   ```

3. After resolving:
   ```bash
   git add .
   git commit -m "Resolve conflicts"
   ```

---

#### Accidentally Committed Secrets

**Problem**: Committed `.env` file with secrets

**Solutions**:

1. **DO NOT push** to public repository

2. Remove from Git history:
   ```bash
   git rm --cached .env
   git commit -m "Remove .env"
   git push
   ```

3. Rotate any exposed secrets

4. Add to .gitignore:
   ```
   .env
   .env.local
   .env.*.local
   ```

---

### Browser Compatibility

#### Syntax Error in Old Browser

**Problem**: `Object.is not defined` or similar

**Reason**: Using modern JavaScript features

**Solutions**:

1. Check target browsers in `tsconfig.json`:
   ```json
   {
     "compilerOptions": {
       "target": "ES2020"
     }
   }
   ```

2. Use supported syntax:
   ```typescript
   // ✅ Supported in most browsers
   const entries = [...allEntries]

   // ⚠️ Requires modern browser
   const entries = allEntries.toSorted()
   ```

---

### Getting More Help

#### Enable Debug Logging

```typescript
// In src/main.tsx
if (import.meta.env.DEV) {
  console.log('Development mode enabled')
  console.log('Debug logging active')
}
```

#### Check Browser Console

1. Open DevTools: `F12`
2. Go to Console tab
3. Look for error messages
4. Copy full error and search online

#### Check Network Tab

1. Open DevTools: `F12`
2. Go to Network tab
3. Reload page
4. Look for failed requests (red)

#### VS Code Debugging

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

---

## Resources

- [Vite Troubleshooting](https://vitejs.dev/guide/troubleshooting.html)
- [React Debugging](https://react.dev/learn/debugging)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Browser DevTools Docs](https://developer.chrome.com/docs/devtools/)

---

## Still Having Issues?

1. **Search existing issues**: Check GitHub issues for similar problems
2. **Create new issue**: Include:
   - Error message
   - Steps to reproduce
   - Environment (Node version, OS, browser)
   - What you tried
3. **Ask on forums**:
   - Stack Overflow
   - React Discord
   - GitHub Discussions

---

## Reporting Bugs

When reporting an issue, provide:

1. **Exact error message** (copy full error)
2. **Steps to reproduce**:
   ```
   1. Start dev server with `npm run dev`
   2. Navigate to add journal page
   3. Enter title "Test"
   4. Error appears
   ```
3. **Environment**:
   ```
   Node: v18.0.0
   npm: 9.0.0
   OS: Windows 11
   Browser: Chrome 120
   ```
4. **What you expected**: What should happen
5. **What actually happened**: What actually happens
6. **Screenshots or videos**: Helps visualize the issue

This information helps maintainers reproduce and fix the issue quickly!
