```md
---
applyTo: "**/*"
---

# General Engineering Instructions

## Core Principles
- Prioritize correctness, maintainability, and readability over clever implementations.
- Prefer simple, well-understood solutions.
- Keep code modular, reusable, and easy to extend.
- Avoid premature optimization.

---

## Naming Conventions
- Use descriptive, intention-revealing names.
- Follow the naming conventions of the language and framework.
- Avoid abbreviations unless they are widely recognized.
- Keep naming consistent across the repository.

---

## File Organization
- Keep related files together.
- Maintain a predictable and scalable folder structure.
- Each file should have a single clear responsibility.
- Remove unused or obsolete files promptly.

---

## Readability
- Write code for humans first.
- Keep functions, classes, and modules focused on one responsibility.
- Avoid deep nesting by returning early where appropriate.
- Prefer explicit logic over implicit behavior.

---

## Comments & Documentation
- Write self-explanatory code whenever possible.
- Use comments to explain *why*, not *what*.
- Remove outdated comments immediately.
- Keep documentation synchronized with implementation.

---

## Refactoring
- Leave the codebase cleaner than you found it.
- Eliminate duplicated logic.
- Extract reusable functionality when repetition appears.
- Do not mix refactoring with unrelated feature work unless necessary.

---

## Error Handling
- Fail fast with clear, actionable error messages.
- Handle expected failures gracefully.
- Never silently ignore errors.
- Validate inputs before processing.

---

## Dependencies & Imports
- Import only what is required.
- Remove unused dependencies and imports.
- Prefer standard libraries before introducing new dependencies.
- Avoid unnecessary dependency proliferation.

---

## Formatting
- Follow the project's formatter and linting rules.
- Keep consistent indentation and spacing.
- Avoid excessively long lines.
- Group related code logically.

---

## Code Quality
- Keep implementations simple and maintainable.
- Avoid magic numbers and hardcoded values.
- Replace duplicated logic with reusable abstractions.
- Minimize side effects whenever possible.

---

## Collaboration
- Produce deterministic and reviewable changes.
- Preserve backward compatibility unless explicitly changing behavior.
- Do not modify unrelated code.
- Keep commits and changes focused on a single concern.

---

## AI Assistant Guidelines
- Follow existing repository patterns before introducing new ones.
- Prefer modifying existing code over creating duplicate implementations.
- Do not invent APIs, configuration, or project structure.
- If requirements are ambiguous, make conservative assumptions and clearly document them.
```