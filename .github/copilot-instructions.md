```markdown
# GitHub Copilot Instructions

## Project Overview

This project is a modern **Daily Journal with Mood Tracker** web application built using:

- Vite
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Supabase
- React Hook Form
- Zod
- React Context API
- Vitest
- React Testing Library

The application should be production-ready, scalable, accessible, responsive, and maintainable.

---

# Primary Objective

Whenever generating code:

- Prefer maintainability over shortcuts.
- Produce production-quality code.
- Keep code clean and self-documenting.
- Avoid unnecessary abstractions.
- Reuse existing components whenever possible.
- Follow existing project architecture.
- Never generate placeholder implementations unless explicitly requested.

---

# Tech Stack

Frontend

- React 19
- TypeScript
- Vite

Styling

- Tailwind CSS v4
- shadcn/ui
- Lucide React Icons

Backend

- Supabase
- Supabase Authentication
- PostgreSQL (Supabase)

Forms

- React Hook Form
- Zod Validation

State Management

- React Context API
- Custom React Hooks

Testing

- Vitest
- React Testing Library

Formatting

- ESLint
- Prettier

---

# Architecture

Always follow Feature-Based Architecture.

Example

src/

```

src/
│
├── App/
│
├── Components/
│   ├── Common/
│   ├── Layout/
│   ├── Navigation/
│   └── UI/
│
├── Features/
│   ├── Authentication/
│   ├── Dashboard/
│   ├── Journal/
│   ├── Mood/
│   ├── Profile/
│   └── Settings/
│
├── Context/
│
├── Hooks/
│
├── Services/
│
├── Types/
│
├── Utils/
│
├── Lib/
│
├── Constants/
│
├── Routes/
│
└── Assets/

```

Do not create random folders.

Always keep feature-specific files inside their respective feature folders.

---

# React Guidelines

Always:

- Use functional components.
- Use React Hooks.
- Use TypeScript.
- Keep components small.
- Split components when they exceed roughly 200 lines.
- Keep rendering logic simple.

Never:

- Use class components.
- Mutate props.
- Store derived state.
- Duplicate component logic.

---

# Component Design

Components should have a single responsibility.

Preferred

```

JournalCard
JournalEditor
JournalList
MoodSelector
MoodHistory
DashboardStats
ProfileCard

````

Avoid huge components doing multiple jobs.

---

# TypeScript Guidelines

Always:

- Enable strict typing.
- Avoid any.
- Prefer interfaces for object shapes.
- Prefer type aliases for unions.
- Export reusable types.

Example

```ts
interface JournalEntry {
  Id: string;
  Title: string;
  Content: string;
  Mood: MoodType;
  CreatedAt: string;
}
````

Never use

```ts
const Data: any = {};
```

Always infer types whenever possible.

---

# Naming Convention

Use PascalCase wherever practical.

Examples

Components

```
JournalCard.tsx
MoodSelector.tsx
DashboardPage.tsx
```

Hooks

```
UseJournal.ts
UseMood.ts
UseAuthentication.ts
```

Context

```
JournalContext.tsx
AuthenticationContext.tsx
```

Interfaces

```
JournalEntry
MoodStatistics
UserProfile
```

Enums

```
MoodType
JournalSortOrder
```

---

# Import Rules

Always use absolute imports.

Good

```ts
import JournalCard from "@/Components/Common/JournalCard";
```

Avoid

```ts
import JournalCard from "../../../Components/Common/JournalCard";
```

---

# Folder Rules

Each feature should contain:

```
Journal/

Components/
Hooks/
Services/
Types/
Utils/
Pages/
```

Keep business logic inside Services.

Keep UI inside Components.

Keep reusable logic inside Hooks.

---

# State Management

Use React Context API.

Use Context only for shared application state.

Examples

* Authentication
* Theme
* User Preferences

Use local state for:

* Modal visibility
* Form state
* Dropdowns
* UI interactions

Avoid putting everything into Context.

---

# Custom Hooks

Always extract reusable logic.

Examples

```
UseJournal()

UseMood()

UseAuthentication()

UseDashboard()

UseProfile()
```

Hooks should not contain UI.

Hooks should return:

* Data
* Loading
* Error
* Actions

Example

```ts
const {
  Journals,
  Loading,
  Error,
  CreateJournal,
  DeleteJournal
} = UseJournal();
```

---

# Service Layer

Never access Supabase directly inside React components.

Correct

```
React Component

↓

Custom Hook

↓

Service

↓

Supabase
```

Bad

```
Component

↓

Supabase
```

Each feature should have its own service.

Examples

```
JournalService.ts

MoodService.ts

AuthenticationService.ts

ProfileService.ts
```

Services should contain:

* CRUD operations
* Database access
* Authentication
* File uploads
* Queries
* Business logic

Services should never render UI.

```
```
````markdown
---

# Tailwind CSS Guidelines

## General Rules

Use **Tailwind CSS v4** for all styling.

Never generate:

- CSS files
- SCSS files
- SASS files
- CSS Modules
- Styled Components
- Emotion

unless explicitly requested.

Prefer utility classes over custom CSS.

---

# Class Organization

Keep Tailwind classes organized.

Recommended order:

```tsx
className="
flex items-center justify-between
w-full
rounded-xl
border border-border
bg-card
p-6
text-foreground
shadow-sm
transition-all
hover:shadow-md
"
```

Group classes by:

1. Layout
2. Flex/Grid
3. Sizing
4. Spacing
5. Borders
6. Background
7. Typography
8. Effects
9. Animations
10. Responsive
11. State

---

# Responsive Design

Always build mobile-first.

Preferred

```tsx
className="
grid
grid-cols-1
gap-4
sm:grid-cols-2
lg:grid-cols-3
xl:grid-cols-4
"
```

Never build desktop-only layouts.

Always consider:

- Mobile
- Tablet
- Desktop

---

# Colors

Always use semantic colors.

Preferred

```tsx
bg-background
text-foreground
border-border

bg-card

text-muted-foreground

bg-primary
text-primary-foreground

bg-secondary
text-secondary-foreground

bg-destructive
text-destructive-foreground

bg-accent
text-accent-foreground
```

Avoid

```tsx
bg-white
text-black
text-blue-500
bg-gray-200
```

unless explicitly requested.

---

# Spacing

Use Tailwind spacing scale.

Preferred

```tsx
p-4

px-6

py-8

gap-4

space-y-6

mt-8

mb-4
```

Avoid arbitrary values like

```tsx
mt-[17px]
```

unless absolutely necessary.

---

# Typography

Use Tailwind typography utilities.

Preferred

```tsx
text-xs

text-sm

text-base

text-lg

text-xl

text-2xl

font-medium

font-semibold

tracking-tight

leading-relaxed
```

---

# Layout

Prefer Flexbox and Grid.

Examples

```tsx
flex

flex-col

items-center

justify-between

grid

grid-cols-2

gap-6
```

Avoid absolute positioning unless required.

---

# Border Radius

Use standard Tailwind radius.

Preferred

```tsx
rounded-md

rounded-lg

rounded-xl

rounded-2xl
```

---

# Shadows

Preferred

```tsx
shadow-sm

shadow

shadow-md

hover:shadow-lg
```

Avoid excessive shadows.

---

# Animations

Prefer Tailwind transitions.

```tsx
transition-all

transition-colors

duration-200

ease-in-out
```

Avoid unnecessary animations.

---

# Hover States

Interactive elements should include hover states.

Example

```tsx
hover:bg-primary

hover:text-primary-foreground

hover:shadow-md
```

---

# Focus States

Always include focus-visible styling.

```tsx
focus-visible:outline-none

focus-visible:ring-2

focus-visible:ring-ring
```

Never remove focus styles.

---

# Dark Mode

Every component must support dark mode.

Never hardcode light colors.

Use semantic theme variables.

Good

```tsx
bg-background
text-foreground
border-border
```

Bad

```tsx
bg-white
text-black
```

---

# shadcn/ui

Always prefer shadcn/ui components before creating custom components.

Preferred components

- Button
- Card
- Badge
- Avatar
- Alert
- Input
- Textarea
- Label
- Form
- Dialog
- Dropdown Menu
- Sheet
- Tooltip
- Popover
- Tabs
- Separator
- Skeleton
- Scroll Area
- Calendar

Do not recreate components that already exist in shadcn/ui.

---

# Buttons

Always use Button component.

Example

```tsx
<Button variant="default">
    Save Journal
</Button>
```

Variants

- default
- outline
- ghost
- secondary
- destructive
- link

Use correct variant.

---

# Cards

Use Card components.

Example

```tsx
<Card>

<CardHeader />

<CardContent />

<CardFooter />

</Card>
```

Avoid custom card implementations.

---

# Icons

Always use Lucide React.

Preferred

```tsx
import {

BookOpen,

Calendar,

Smile,

Settings,

User

} from "lucide-react";
```

Avoid random SVGs.

---

# Forms

Always use

- React Hook Form

- Zod

- shadcn Form Components

Never use uncontrolled forms.

Example

```tsx
<Form>

<FormField />

<FormItem />

<FormLabel />

<FormControl />

<FormMessage />

</Form>
```

---

# Validation

Always validate using Zod.

Example

```ts
const JournalSchema = z.object({

Title: z.string().min(1),

Content: z.string().min(10)

});
```

Display validation errors beneath inputs.

---

# Error Handling

Never ignore errors.

Every async operation should use try/catch.

Example

```ts
try {

// Operation

}
catch (Error) {

HandleApplicationError(Error);

}
```

Use centralized error utilities.

Display user-friendly messages.

Never expose raw database errors.

---

# Supabase

Never call Supabase directly inside components.

Correct flow

```text
Component

↓

Custom Hook

↓

Service

↓

Supabase
```

Every database operation belongs inside Services.

---

# Authentication

Use Supabase Authentication.

Email & Password only.

Authentication Context should provide

- User

- Session

- Login

- Logout

- Register

- Forgot Password

- Loading

Do not duplicate authentication logic.

---

# Database

Prefer strongly typed models.

Example

```ts
interface JournalEntry {

Id: string;

Title: string;

Content: string;

Mood: MoodType;

CreatedAt: string;

UpdatedAt: string;

}
```

Never use any.

---

# Loading States

Never leave blank screens.

Use

- Skeleton
- Spinner
- Placeholder

Example

```tsx
if (Loading) {

return <JournalSkeleton />;

}
```

---

# Empty States

Every list should include empty state.

Example

"No journal entries yet."

"Start writing today's journal."

---

# Confirmation Dialogs

Confirm destructive actions.

Examples

- Delete Journal

- Delete Account

- Reset Settings

Always use Alert Dialog.

---

# Toast Notifications

Use toast notifications for

- Success

- Errors

- Warnings

- Information

Avoid alert().

````
````markdown
---

# Daily Journal Application Rules

GitHub Copilot should always understand that this project is a **Daily Journal with Mood Tracker**, not a generic CRUD application.

Primary features include:

- User Authentication
- Dashboard
- Daily Journal Entries
- Mood Tracking
- Calendar View
- Journal Search
- Journal Filtering
- Profile Management
- Settings
- Statistics
- Dark Mode

All generated code should align with these features.

---

# Journal Feature

Journal entries should support:

- Title
- Content
- Mood
- Date
- Created At
- Updated At
- Favorite
- Tags (optional)
- Character Count

Every journal should belong to the authenticated user.

Never generate anonymous journal entries.

---

# Mood Tracker

Mood should be represented using a predefined enum.

Example

```ts
export enum MoodType {
  Amazing,
  Happy,
  Calm,
  Neutral,
  Sad,
  Angry
}
```

Do not use free-text moods.

Every journal entry should optionally store one mood.

---

# Dashboard

Dashboard should display:

- Today's Mood
- Recent Journals
- Total Journals
- Current Streak
- Mood Statistics
- Weekly Mood Chart
- Monthly Summary
- Quick Actions

Dashboard components should remain independent and reusable.

---

# Statistics

Statistics should be computed from journal data.

Examples

- Most Frequent Mood
- Longest Writing Streak
- Journal Count
- Entries This Week
- Entries This Month
- Average Mood
- Favorite Mood
- Writing Activity

Business calculations belong inside Services or utility functions.

Never place calculations directly inside UI components.

---

# Calendar

Calendar should support

- Daily journals
- Monthly view
- Mood indicators
- Click to open journal
- Highlight current day

Calendar components should be reusable.

---

# Search

Search should support

- Title
- Content
- Mood
- Date

Search should be case insensitive.

---

# Filtering

Support filtering by

- Mood
- Date
- Favorites
- Tags

Filtering logic should remain reusable.

---

# Sorting

Support sorting by

- Newest
- Oldest
- Alphabetical
- Mood

Avoid hardcoding sorting logic inside components.

---

# Profile

Profile should include

- Avatar
- Display Name
- Email
- Password Update
- Theme Preference

Profile should only display authenticated user's data.

---

# Settings

Settings should include

- Dark Mode
- Notifications
- Account
- Privacy

Settings should remain modular.

---

# Reusable Components

Prefer reusable components.

Examples

Button

Card

Input

Modal

Dialog

Loading Spinner

Skeleton

Badge

Avatar

Empty State

Confirmation Dialog

Mood Badge

Mood Selector

Journal Card

Journal Editor

Journal List

Search Bar

Statistics Card

Do not duplicate components.

---

# Component Size

Keep components focused.

Preferred

50–150 lines

Avoid

300–500 line components

Extract reusable logic.

---

# Business Logic

Business logic belongs in

Services

Utilities

Custom Hooks

Never inside JSX.

---

# API Calls

Never perform API calls during rendering.

Always use

useEffect

Custom Hooks

Service Layer

---

# Async Code

Prefer async/await.

Avoid promise chaining.

Good

```ts
const Journals = await JournalService.GetAll();
```

Avoid

```ts
JournalService.GetAll()
.then(...)
.catch(...)
```

---

# Error Messages

Use friendly messages.

Good

"Unable to save your journal."

Bad

"500 Internal Server Error"

---

# Empty States

Always include meaningful empty states.

Examples

"No journal entries yet."

"Write your first journal."

"No moods recorded."

"No search results."

---

# Loading States

Always provide loading indicators.

Examples

Skeleton

Spinner

Loading Cards

Avoid blank screens.

---

# Testing

Use

Vitest

React Testing Library

Generate tests for

Components

Hooks

Utilities

Services

Focus on user behavior instead of implementation details.

---

# Test Naming

Preferred

JournalCard.test.tsx

MoodSelector.test.tsx

UseJournal.test.ts

JournalService.test.ts

---

# Accessibility

Every generated component must:

Use semantic HTML

Support keyboard navigation

Have visible focus states

Use accessible labels

Use button instead of clickable div

Associate labels with inputs

Use aria-* only when needed

Support screen readers

Never sacrifice accessibility for styling.

---

# Performance

Prefer

React.memo

useMemo

useCallback

only when beneficial.

Do not optimize prematurely.

Avoid unnecessary re-renders.

---

# Lists

Always provide keys.

Good

```tsx
Journals.map((Journal) => (
    <JournalCard key={Journal.Id} />
))
```

Never use array index as key.

---

# Forms

Every form should include

Validation

Loading state

Disabled submit button while submitting

Error handling

Success feedback

Reset when appropriate

---

# Notifications

Use toast notifications.

Examples

Journal saved.

Journal deleted.

Profile updated.

Password changed.

Avoid alert().

---

# Logging

Do not leave console.log statements.

Remove debugging code before final output.

---

# Security

Never expose

Supabase keys

JWT tokens

Sensitive environment variables

Passwords

Secrets

Always use environment variables.

Example

```ts
import.meta.env.VITE_SUPABASE_URL

import.meta.env.VITE_SUPABASE_ANON_KEY
```

---

# Environment Variables

Always assume

.env

.env.local

Never hardcode secrets.

---

# Code Duplication

Before generating new code

Search for

Existing Components

Existing Hooks

Existing Services

Existing Utilities

Reuse existing implementations whenever possible.

---

# Documentation

Use comments only for

Complex business logic

Algorithms

Workarounds

Avoid obvious comments.

Bad

// Increment count

Count++;

Good

// Prevent duplicate journal creation when user double-clicks Save.
````
````markdown
---

# Code Generation Priorities

When generating code, always prioritize the following (highest priority first):

1. Correctness
2. Readability
3. Maintainability
4. Accessibility
5. Reusability
6. Performance
7. Simplicity
8. Consistency with existing codebase

Never sacrifice readability for shorter code.

---

# Copilot Behavior Rules

When generating code:

- Follow the existing project architecture.
- Reuse existing components before creating new ones.
- Reuse existing hooks before writing new logic.
- Reuse existing services before creating duplicate database operations.
- Prefer composition over inheritance.
- Generate production-ready code.
- Generate complete implementations instead of placeholders.
- Keep code modular and testable.
- Follow SOLID principles where appropriate.
- Keep components focused on a single responsibility.
- Prefer explicit, descriptive variable names.

---

# Before Generating New Code

Before creating any file, check whether an equivalent already exists.

Prefer extending existing files over duplicating functionality.

Examples:

✓ Add a new method to `JournalService`

instead of creating

`JournalDatabaseService`

if the functionality belongs in the existing service.

---

# Before Creating a Component

Ask yourself:

Can an existing component be reused?

If yes,

reuse it.

Avoid creating duplicate UI components.

---

# Before Creating a Hook

Check for existing hooks.

Examples

Good

UseJournal()

UseMood()

UseAuthentication()

Avoid

UseJournalData()

UseJournalList()

UseJournalManager()

if existing hooks already provide the functionality.

---

# Before Creating a Service

Services should represent domains.

Examples

AuthenticationService

JournalService

MoodService

ProfileService

SettingsService

Avoid multiple services handling the same domain.

---

# File Organization

Keep imports organized.

Preferred order

1. React
2. Third-party libraries
3. Internal aliases (@/)
4. Relative imports
5. Styles (if ever required)

Example

```tsx
import { useState } from "react";

import { useForm } from "react-hook-form";

import { Button } from "@/Components/UI/Button";
import { UseJournal } from "@/Hooks/UseJournal";

import "./Example.css";
```

Since this project uses Tailwind CSS, avoid CSS imports unless explicitly requested.

---

# TypeScript Best Practices

Always

Use strict typing.

Infer types where appropriate.

Prefer interfaces for objects.

Avoid `any`.

Use readonly where beneficial.

Export reusable types.

Never suppress type errors with

```ts
// @ts-ignore
```

unless explicitly instructed.

---

# React Best Practices

Always

- Use functional components.
- Use hooks.
- Keep JSX clean.
- Extract repeated JSX into reusable components.
- Use fragments instead of unnecessary wrapper divs.
- Avoid deeply nested JSX.
- Keep side effects inside `useEffect`.

---

# Tailwind CSS Best Practices

Always

- Use Tailwind utility classes.
- Prefer semantic theme colors.
- Build mobile-first layouts.
- Support dark mode.
- Keep class lists organized.
- Use Flexbox and Grid appropriately.
- Use spacing scale consistently.

Never

- Create custom CSS files without request.
- Hardcode colors.
- Use inline styles.

---

# shadcn/ui Best Practices

Prefer shadcn/ui components whenever available.

Examples

Button

Card

Input

Textarea

AlertDialog

Dialog

Popover

DropdownMenu

Tabs

Badge

Avatar

Separator

Tooltip

Skeleton

ScrollArea

Do not recreate components already provided by shadcn/ui.

---

# Accessibility Checklist

Every generated UI should:

- Use semantic HTML.
- Be keyboard accessible.
- Include visible focus states.
- Associate labels with inputs.
- Use accessible button text.
- Use proper heading hierarchy.
- Support screen readers.
- Maintain sufficient color contrast.

---

# Performance Checklist

Prefer

- Lazy loading for large pages.
- Memoization only when necessary.
- Efficient rendering.
- Reusable components.
- Optimized state updates.

Avoid

- Unnecessary re-renders.
- Duplicate API calls.
- Duplicate calculations.
- Heavy computations inside render methods.

---

# Error Handling Checklist

Every async operation should:

- Use try/catch.
- Return typed results.
- Display user-friendly error messages.
- Avoid exposing implementation details.
- Log errors only when appropriate.

---

# Testing Checklist

Generate tests for:

- Components
- Hooks
- Utilities
- Services

Use:

- Vitest
- React Testing Library

Prefer testing behavior over implementation details.

---

# Git Commit Readiness

Generated code should:

- Pass TypeScript type checking.
- Pass ESLint.
- Pass Prettier formatting.
- Avoid unused imports.
- Avoid unused variables.
- Avoid commented-out code.
- Avoid console.log statements.

---

# Do Not Generate

Unless explicitly requested, do NOT generate:

- Placeholder implementations
- Mock APIs
- Fake authentication
- Fake database layers
- Inline CSS
- CSS Modules
- SCSS
- Styled Components
- Emotion
- jQuery
- Class components
- Redux
- Unused utility functions
- Duplicate components
- Duplicate services
- Duplicate hooks
- Deprecated React APIs

---

# Preferred Libraries

UI

- Tailwind CSS v4
- shadcn/ui
- Lucide React

Forms

- React Hook Form
- Zod

Backend

- Supabase

Testing

- Vitest
- React Testing Library

State

- React Context API

---

# AI-Assisted Development Guidelines

When using GitHub Copilot:

- Follow existing naming conventions.
- Extend existing patterns instead of inventing new ones.
- Generate complete implementations.
- Avoid TODO comments unless explicitly requested.
- Prefer reusable abstractions over duplicated logic.
- Keep generated code production-ready.
- Ensure all new features integrate cleanly with the existing architecture.

---

# Repository Conventions

This repository should always follow these conventions:

- Feature-based architecture
- Functional React components
- TypeScript strict mode
- Tailwind CSS v4
- shadcn/ui components
- React Context API
- Service layer for Supabase interactions
- Custom hooks for reusable logic
- React Hook Form + Zod for forms
- Vitest + React Testing Library for testing
- Mobile-first responsive design
- WCAG accessibility best practices
- Absolute imports using `@/`
- ESLint + Prettier formatting
- Clean, readable, self-documenting code

---

# Final Instruction to GitHub Copilot

Assume you are contributing to a professional production-grade codebase.

Every generated file should:

- Match the project's architecture.
- Follow all conventions defined in this document.
- Be fully typed with TypeScript.
- Use Tailwind CSS for styling.
- Prefer shadcn/ui components.
- Be responsive by default.
- Support dark mode.
- Be accessible.
- Avoid duplication.
- Be maintainable.
- Be testable.
- Be ready for production without requiring major refactoring.

When uncertain, prefer consistency with the existing codebase over introducing new patterns.
````