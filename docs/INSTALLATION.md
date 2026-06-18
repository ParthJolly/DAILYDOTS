# Installation & Setup Guide

## Prerequisites

Before installing DailyDots, ensure you have:

- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher (comes with Node.js)
- Git (for cloning the repository)

### Check Your Installation

```bash
# Check Node.js version
node --version

# Check npm version
npm --version
```

---

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd daily-dots
```

### 2. Install Dependencies

```bash
npm install
```

This installs all required packages listed in `package.json`.

### 3. Verify Installation

Run type checking to ensure TypeScript is configured correctly:

```bash
npm run typecheck
```

If no errors appear, installation is successful!

---

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at **http://localhost:5173**

Vite enables hot module replacement (HMR), so changes appear instantly without refreshing.

### Production Build

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

This serves the production build locally for testing.

---

## Environment Variables

### Default Setup (localStorage)

No environment variables required. The app uses browser localStorage by default.

### Supabase Setup (Future)

To use Supabase for data persistence, create a `.env.local` file:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Get these values from your [Supabase project settings](https://supabase.com).

---

## Configuration Files

### Key Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies and scripts |
| `tsconfig.json` | TypeScript configuration (strict mode) |
| `vite.config.ts` | Vite build configuration |
| `tailwind.config.js` | Tailwind CSS theme |
| `postcss.config.js` | PostCSS plugins |
| `.eslintrc.cjs` | ESLint rules |
| `.prettierrc` | Code formatting rules |

### Modifying Tailwind Theme

Edit `tailwind.config.js` to customize:
- Colors
- Typography
- Spacing
- Breakpoints
- Dark mode behavior

---

## IDE Setup

### Visual Studio Code (Recommended)

Recommended extensions:
- **ES7+ React/Redux/React-Native snippets** (dsznajder.es7-react-js-snippets)
- **TypeScript Vue Plugin** (Vue.vscode-vue-language-features)
- **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss)
- **ESLint** (dbaeumer.vscode-eslint)
- **Prettier** (esbenp.prettier-vscode)

Suggested settings in `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

---

## Development Tools

### Code Formatting

Format all files:
```bash
npm run format
```

Check formatting without changes:
```bash
npm run format:check
```

### Linting

Run ESLint:
```bash
npm run lint
```

Automatically fix fixable issues:
```bash
npm run lint -- --fix
```

### Type Checking

Run TypeScript type checker:
```bash
npm run typecheck
```

---

## Testing Setup

### Running Tests

Run all tests once:
```bash
npm run test
```

Watch mode (re-run on file changes):
```bash
npm run test -- --watch
```

UI mode (visual test runner):
```bash
npm run test:ui
```

### Test Files

Test files are colocated with source files:
- `JournalService.test.ts` - Service layer tests
- `*.test.tsx` - Component tests (as needed)

---

## Troubleshooting Installation

### Port Already in Use

If port 5173 is already in use:

```bash
npm run dev -- --port 3000
```

### Module Not Found Errors

Clear node_modules and reinstall:
```bash
rm -rf node_modules
npm install
```

### TypeScript Errors

Ensure TypeScript is up to date:
```bash
npm install typescript@latest
npm run typecheck
```

### Prettier Conflicts with ESLint

If ESLint and Prettier conflict:
```bash
npm run lint -- --fix
npm run format
```

### Build Fails

Try building with verbose output:
```bash
npm run build -- --debug
```

---

## Next Steps

1. Read [DEVELOPMENT.md](/docs/DEVELOPMENT.md) for development workflow
2. Review [ARCHITECTURE.md](/docs/ARCHITECTURE.md) to understand the design
3. Check [COMPONENTS.md](/docs/COMPONENTS.md) for available components
4. Start creating journal entries!

---

## Getting Help

If you encounter issues:

1. Check [TROUBLESHOOTING.md](/docs/TROUBLESHOOTING.md)
2. Review the [FAQ.md](/FAQ.md)
3. Search GitHub issues
4. Create a new issue with details

---

## Additional Resources

- [React 19 Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vitest Guide](https://vitest.dev)
