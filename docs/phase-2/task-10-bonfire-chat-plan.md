# Integrate Bonfire AI Chat Plan

This plan outlines the integration of the Bonfire AI chat widget into the HopeBegins frontend, replacing or enhancing the current AI solution.

## Proposed Changes

### 1. Frontend Modifications (Next.js)

**Widget Integration:**
- Bonfire AI typically provides an embed script (e.g., a `<script src="https://cdn.bonfire.ai/..."></script>` tag) and an initialization block.
- **Location:** Open `src/app/layout.tsx` (the root layout) or create a dedicated `<BonfireChatWidget />` component that is imported into the layout so it persists across all pages.
- Use Next.js `next/script` (`<Script strategy="afterInteractive" />`) to load the Bonfire AI script asynchronously so it doesn't block the initial page load.

**Cleanup:**
- Identify any existing AI chat widgets (e.g., the current "Hope AI Conversations" tool) and safely remove or disable their scripts/components from the codebase to prevent conflicts.

### 2. Styling and Configuration
- Configure the Bonfire AI widget settings (usually passed in an init object or configured via the Bonfire dashboard) to match the HopeBegins brand colors (e.g., using the primary green `#b4c392`).
- Ensure the floating button doesn't overlap with the new *Random Engagement Pop-out* (Task 6), adjusting z-indexes or positioning if necessary.

## Verification Plan
1. Load the site and verify the Bonfire chat bubble appears in the bottom right corner.
2. Ensure opening the chat works and styling matches the brand.
3. Ensure there are no console errors related to the script loading.
