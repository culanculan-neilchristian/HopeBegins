# HopeBegins Form Design System

This document outlines the standardized design patterns for forms within the HopeBegins platform, ensuring consistency across all public and authenticated pages.

## Core Principles

1. **Peaceful Aesthetic**: Use the Sage/Earth color palette (`#fcfdfa` background, `#6b634d` primary accents, `#b4c392` success/action buttons).
2. **Clarity & Focus**: Minimalist layouts with clear labels and helpful placeholders.
3. **Consistency**: Standardized spacing, typography (Poppins for headers, DM Sans for body), and component styling.
4. **Logic Separation**: Every form MUST have its own custom hook (stored in a `hooks/` subdirectory) to handle validation, state, and submission.

## Component Specifications

### 1. Form Container (Card)

- **Background**: `bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm`
- **Border**: `border-zinc-100 dark:border-zinc-800`
- **Shadow**: `shadow-sm`
- **Padding**: `p-8` (on `CardContent`)

### 2. Form Labels

- **Typography**: `text-xs font-bold uppercase tracking-wider text-zinc-500`
- **Spacing**: Standardized gap between label and input.

### 3. Input Fields (`Input`, `Textarea`, `Select`)

- **Background**: `bg-zinc-50/50 dark:bg-zinc-950/50`
- **Border**: `border-zinc-200 dark:border-zinc-800`
- **Height**: `h-12` for standard inputs and select triggers.
- **Focus State**: Standardized focus ring using the brand color.

### 4. Action Buttons

- **Primary Action**: `bg-[#b4c392] hover:bg-[#a3b281] text-white font-bold text-sm h-12 rounded-lg`
- **Secondary Action**: `bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-lg` (for dark backgrounds).

### 5. Checkboxes & Toggles

- **Style**: Custom styled to match the brand palette.
- **Labeling**: `text-sm text-zinc-500 font-medium`

## Pattern: Logic Separation

All forms must follow the separation of UI and logic using a custom hook.

### Hook Structure (`hooks/use[FormName].ts`)

The hook should return the `form` object from `react-hook-form`, the `onSubmit` handler, and any submission status states.

```typescript
export function useMyForm() {
  const form = useForm({
    resolver: zodResolver(mySchema),
    defaultValues: { ... }
  });

  const onSubmit = (data) => {
    // Handle submission
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting: ...
  };
}
```

## Environment Configuration

Use the centralized config in `src/config/index.ts` for all API URLs and environment-specific logic.

```typescript
import { config } from '@/config';

// Use config.API_URL instead of hardcoding strings
const url = `${config.API_URL}/endpoint`;
```

## Implementation Example: Admin Login Form

The Admin Login form serves as another reference implementation for these patterns.

- UI: `src/app/admin/login/components/AdminLoginForm.tsx`
- Logic: `src/app/admin/login/hooks/useAdminLogin.ts`
- Service: `src/services/adminService.ts`
- Config: `src/config/index.ts`

### Component Structure (`components/[FormName].tsx`)

The component should focus purely on the JSX layout and use the hook for all logic.

```tsx
export function MyForm() {
  const { form, onSubmit, isSubmitting } = useMyForm();

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>{/* Render fields */}</form>
    </Form>
  );
}
```

## Implementation Example: Prayer Request Form

The Prayer Request form serves as the reference implementation for these patterns.

- UI: `src/app/(public)/prayers/components/PrayerForm.tsx`
- Logic: `src/app/(public)/prayers/hooks/usePrayerForm.ts`

```tsx
<FormItem>
  <FormLabel className="text-xs font-bold uppercase tracking-wider text-zinc-500">
    Field Label *
  </FormLabel>
  <FormControl>
    <Input
      className="bg-zinc-50/50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 h-12"
      {...field}
    />
  </FormControl>
</FormItem>
```

## Accessibility (a11y)

- Always include `htmlFor` and `id` for labels and inputs.
- Ensure sufficient color contrast for text.
- Provide clear error messages using `FormMessage`.
