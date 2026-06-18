---
applyTo: "**/*.ts,**/*.tsx"
---

# TypeScript & React Engineering Standards

## TypeScript

### General
- Assume `strict` mode is enabled.
- Do not use `any`. Prefer:
  - `unknown`
  - Generics
  - Type guards
  - Utility types
- Prefer `interface` for object contracts and public APIs.
- Use `type` for unions, intersections, mapped types, and utility compositions.
- Explicitly type exported functions, classes, hooks, and public APIs.
- Prefer inference for local variables when the type is obvious.
- Enable exhaustive type checking using `never`.

### Type Safety
- Model application state using discriminated unions.
- Prefer immutable data structures.
- Never mutate function parameters.
- Mark values as `readonly` whenever mutation is not intended.
- Avoid non-null assertions (`!`) unless absolutely unavoidable.
- Validate external data before use.

Example:

```ts
type Result =
  | { status: "success"; data: User }
  | { status: "error"; message: string };

switch (result.status) {
  case "success":
    break;
  case "error":
    break;
  default:
    const exhaustive: never = result;
    return exhaustive;
}
```

## React

### Components
- Use only functional components.
- Prefer named function declarations over anonymous arrow components.
- Keep components focused on a single responsibility.
- Split components exceeding ~200 lines.
- Avoid deeply nested JSX.
- Keep presentation separate from business logic.

### Props
- Explicitly type all props.
- Keep props minimal.
- Avoid boolean prop combinations that create ambiguous states.
- Prefer composition over inheritance.

Example:

```tsx
interface ButtonProps {
  label: string;
  onClick(): void;
}

export function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}
```

## Hooks

- Follow the Rules of Hooks.
- Never call hooks conditionally.
- Create custom hooks for reusable logic.
- Keep hooks focused on one concern.
- Return typed values from custom hooks.
- Memoize only when profiling demonstrates benefit.
- Include complete dependency arrays.

## State Management

### Local State
- Prefer `useState` for simple state.
- Use `useReducer` for complex state transitions.
- Keep state as small as possible.
- Derive computed values instead of storing them.

### Shared State
- Lift state only when necessary.
- Keep global state minimal.
- Store server state separately from UI state.
- Avoid unnecessary prop drilling through composition or context.

## Error Handling

- Never silently ignore errors.
- Catch errors at appropriate boundaries.
- Surface meaningful error messages.
- Throw typed errors for recoverable failures.
- Use React Error Boundaries for rendering failures.
- Handle loading, success, empty, and error states explicitly.
- Log unexpected errors through the application's monitoring solution.

## Async Code

- Prefer `async`/`await`.
- Handle promise rejections explicitly.
- Support request cancellation where applicable.
- Prevent race conditions during asynchronous updates.
- Clean up subscriptions, timers, and event listeners.

## Performance

- Avoid unnecessary re-renders.
- Memoize expensive computations with `useMemo` only when justified.
- Memoize callbacks with `useCallback` only when beneficial.
- Use stable keys for lists.
- Avoid inline object and function creation inside frequently rendered components when performance matters.

## Imports & Organization

- Group imports:
  1. External libraries
  2. Internal modules
  3. Relative imports
- Remove unused imports.
- Prefer absolute imports where configured.
- Avoid circular dependencies.

## Testing & Maintainability

- Write deterministic, pure business logic.
- Keep UI components easy to test.
- Avoid hidden side effects.
- Favor dependency injection over tightly coupled implementations.
- Refactor duplicated logic into reusable utilities or custom hooks.
```