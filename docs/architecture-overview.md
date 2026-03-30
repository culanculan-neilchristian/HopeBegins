# Architecture & Library Overview

This document provides a high-level overview of the **HopeBegins** project structure, core libraries, and state management patterns.

---

## 🏗️ Core Framework & Architecture
- **Framework**: Next.js 16.1.6 (React 19) using the **App Router**.
- **Directory Structure**: 
    - `src/app`: Routes, layouts, and global styles. Uses group folders like `(public)` for better organization.
    - `src/components`: UI library (Shadcn-based) and logic-specific components.
    - `src/services`: API abstraction layer using native `fetch`.
    - `src/store`: Client-side global state management via Zustand.
    - `src/lib`: Shared utilities and Zod schemas.
- **Server-First Philosophy**: Components are Server Components by default. Interactivity is isolated to `"use client"` components only when necessary.

---

## ⚡ State Management
The project uses a multi-layered approach to state:

### 1. Global Client State (**Zustand**)
Used for state that needs to persist across routes or is globally relevant to the UI.
- **`useThemeStore`**: Manages the application's color theme (Red, Blue, Green) and persists it to the HTML `data-theme` attribute.
- **`useUserStore`**: Manages the local representation of the authenticated user.

### 2. Server State (**TanStack Query**)
Handles all server-side data fetching, caching, and synchronization.
- Configured in `src/components/Providers.tsx` with a default `staleTime` of 60 seconds.
- Reduces repetitive API calls and provides out-of-the-box loading/error states.

### 3. Form State (**React Hook Form**)
Manages complex form inputs and validation states.
- Integrated with **Zod** for schema-based validation.
- Provides high performance by minimizing re-renders during text input.

### 4. Component Deep-Drilling (**React Context**)
Used for data that needs to be accessed 4+ levels deep in a component tree to avoid excessive prop drilling.

---

## 🎨 UI & Styling
- **CSS Engine**: **Tailwind CSS v4**.
    - Uses the new `@theme` configuration in `globals.css`.
    - Leverages `oklch` color space for modern, vibrant branding.
- **Component Library**: **Radix UI** primitives styled with **Shadcn/ui**.
- **Icons**: **Lucide React**.
- **Animations**: **Framer Motion** for smooth transitions and interactive micro-animations.
- **Charts**: **Recharts** for data visualization.
- **Toasts**: **Sonner** for lightweight notifications.

---

## 🔐 Authentication & Data Flow
- **Authentication**: **NextAuth.js v5 (Beta)**. Integrated via `SessionProvider`.
- **API Interceptor**: A custom `fetchWithAuth` wrapper in `src/services/api.ts` handles:
    - Standardized error parsing.
    - Authentication headers.
    - Response payload extraction.

---

## 🧪 Development Standards
- **TDD (Test-Driven Development)**: Mandatory failing test before implementation.
- **Type Safety**: No use of `any`. Strict TypeScript interfaces and Zod schemas at all boundaries.
- **Performance**: Proactive use of `useMemo` and `useCallback` for expensive computations or stable prop references.
