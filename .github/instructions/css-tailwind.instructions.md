```md
---
applyTo: "**/*.css,**/*.ts,**/*.tsx"
---

# CSS & Tailwind Guidelines

## Tailwind-First
- Prefer Tailwind utility classes over custom CSS.
- Compose UI using utilities instead of creating reusable CSS classes.
- Use Tailwind design tokens (`theme`) for colors, spacing, typography, shadows, and radii.
- Avoid inline `style` attributes unless values are truly dynamic.

## Class Organization
Order utility classes consistently:

1. Layout (`container`, `flex`, `grid`, `block`, `hidden`)
2. Position (`relative`, `absolute`, `z-*`)
3. Sizing (`w-*`, `h-*`, `min-*`, `max-*`)
4. Spacing (`m-*`, `p-*`, `gap-*`)
5. Flex/Grid (`items-*`, `justify-*`, `order-*`)
6. Borders (`border`, `rounded-*`)
7. Background (`bg-*`)
8. Typography (`text-*`, `font-*`, `leading-*`, `tracking-*`)
9. Effects (`shadow-*`, `opacity-*`, `ring-*`)
10. Transitions & Animation (`transition-*`, `duration-*`, `animate-*`)
11. State variants (`hover:`, `focus:`, `active:`, `disabled:`)
12. Responsive variants (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`)

## Responsive Design
- Build mobile-first using Tailwind breakpoints.
- Prefer Flexbox/Grid over fixed dimensions.
- Avoid hardcoded widths where responsive utilities suffice.
- Test layouts across common viewport sizes.

## Accessibility
- Ensure sufficient color contrast.
- Interactive elements must have visible focus styles using `focus-visible:*`.
- Do not remove focus outlines without providing an accessible replacement.
- Maintain appropriate touch target sizes (minimum 44×44px where practical).
- Use semantic HTML before relying on styling.

## Custom CSS
Use custom CSS only when:
- Tailwind utilities cannot express the required styling.
- Creating reusable keyframe animations.
- Styling third-party libraries.
- Defining global styles, CSS variables, font-face declarations, or resets.

Avoid:
- Duplicating existing Tailwind utilities.
- Overriding Tailwind styles unnecessarily.
- Deep selector nesting or high-specificity rules.
```