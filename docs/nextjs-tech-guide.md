# Next.js Technical Guide for HopeBegins

This document serves as a reference for the core Next.js concepts and patterns used in the HopeBegins project.

---

## 📂 The API Directory (`src/app/api`)

The `src/app/api` folder contains **Route Handlers**, which are server-side endpoints that your application can call via HTTP (GET, POST, etc.).

### Current Usage in HopeBegins
1. **Authentication**: `api/auth/[...nextauth]/route.ts`
   - Handles login, logout, and session management using **NextAuth.js**.
2. **Future Case - Webhooks**: If you later integrate payments (like Stripe), you would add a webhook endpoint here.
3. **Future Case - Heavy Logic**: If you need to generate a PDF or interact with a third-party API using secret keys, you would create an endpoint here to keep your secrets hidden from the client.

---

## 🚀 Rendering Strategies

Next.js allows you to choose the best rendering method for each part of your application. Here's how we use them in this project:

### 1. SSG (Static Site Generation)
The HTML is pre-generated at **build time**. This is the fastest method.
- **Example**: `src/app/(public)/page.tsx` (Home Landing Page)
- **Why?** The content (like "Stories of Hope") doesn't change every second. By pre-building it, the browser gets it instantly.

### 2. CSR (Client-Side Rendering)
The page content is fetched and rendered in the **user's browser**.
- **Example**: `src/app/(public)/hopecasts/page.tsx`
- **Why?** This page uses `'use client'` and React Query (`useQuery`) to fetch podcasts from the backend. This allows for features like loading skeletons and interactive audio playback without refreshing the page.

### 3. SSR (Server-Side Rendering)
The page is generated on the **server for every single request**.
- **Example Strategy**: If you need to show very specific, private user data that must be fresh (like a personal profile or a "Prayer Response Detail"), you can write a Server Component (without `'use client'`) and fetch the data inside it.

### 4. ISR (Incremental Static Regeneration)
A "hybrid" that is static but **re-generates automatically** in the background at regular intervals.
- **Hypothetical Implementation**:
  ```typescript
  // You could add this to a future podcast listing to make it super fast but still updated:
  const podcasts = await fetch('https://api.hopebegins.ph/hopecasts/', { 
    next: { revalidate: 3600 } // Recalculate every 1 hour
  });
  ```

---

## 🛠️ When to use 'use client'?

| Situation | Use `'use client'`? |
| :--- | :---: |
| Page with simple text/images (Marketing) | ❌ No |
| Form with validation (e.g., `PrayerForm.tsx`) | ✅ Yes |
| Using hooks like `useState` or `useEffect` | ✅ Yes |
| Fetching public data for SEO (Blogs) | ❌ No |
| Handling user interaction (Click, Play, Modal) | ✅ Yes |
