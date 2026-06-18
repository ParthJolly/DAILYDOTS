# AGENTS.md

## Purpose

This repository uses AI agents to assist with development while preserving code quality, architecture, and maintainability.

Agents should make focused, minimal, production-ready changes that follow the project's established patterns.

---

# Instruction Priority

When multiple instruction files apply, use the following precedence (highest first):

1. `general.instructions.md`
2. `typescript-react.instructions.md`
3. `design.instructions.md`
4. `copilot-instructions.md`

Do not duplicate or reinterpret rules defined in these files. Treat them as the single source of truth.

---

# Project Overview

**Stack**

- Vite
- React
- TypeScript (Strict Mode)
- Supabase
- Tailwind CSS

**Architecture**

- Clean architecture
- Separation of concerns
- Components
- Hooks
- Services
- Utilities
- Feature-based organization where appropriate

---

# Workflow Expectations

Agents should:

- Make the smallest change that satisfies the request.
- Preserve existing architecture and project structure.
- Follow existing naming conventions and patterns.
- Prefer extending existing code over introducing new abstractions.
- Keep components, hooks, and services focused on a single responsibility.
- Avoid speculative improvements unrelated to the task.
- Leave unrelated code untouched.

Avoid:

- Large refactors
- Project-wide formatting changes
- Unrequested dependency changes
- Architectural rewrites
- Renaming files without necessity

---

# Security Boundaries

Agents must never:

- Commit or expose secrets, API keys, tokens, or credentials.
- Disable or weaken TypeScript strict mode.
- Bypass authentication or authorization flows.
- Circumvent validation or security checks.
- Introduce insecure client-side storage for sensitive data.
- Modify environment variable handling outside the requested task.

---

# Files That Must Not Be Modified

Unless explicitly requested, do **not** modify:

- `dist/`
- Build output
- Generated files
- Lockfiles (`package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`, `bun.lockb`)
- Environment files (`.env*`)
- IDE/editor settings
- Third-party generated artifacts

---

# Common Commands

```bash
# Install dependencies
npm install

# Development
npm run dev

# Production build
npm run build

# Lint
npm run lint

# Format
npm run format

# Type check
npm run typecheck

# Run tests
npm test
```

Use the package manager already configured in the repository.

---

# Change Reporting

After completing work, report:

1. Files changed
2. Summary of changes
3. Any assumptions made
4. Follow-up recommendations (only if relevant)
5. Any commands that should be run for verification

If unable to complete a task, explain why rather than making speculative changes.

---

# Final Notes

- Prioritize correctness over speed.
- Keep changes consistent with the existing codebase.
- Follow the repository instruction files rather than introducing new conventions.
- Produce maintainable, production-ready code with minimal necessary modifications.