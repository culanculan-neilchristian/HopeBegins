# Random Engagement Pop-out Implementation Plan

This plan details the implementation of a dynamic, lower-left notification widget designed to encourage user engagement by showing randomized recent activities (e.g., "Someone just gave hope"). 

## Proposed Changes

### 1. Backend Modifications (Django)

**Database Models:**
To allow admin control, we will create two models (likely in a new `apps/site_settings` app or an existing core app):
1. **`PopoutSettings` (Singleton):**
   - `is_enabled` (BooleanField, default=True) - A master toggle to turn the entire feature on or off.
   - `interval_seconds` (IntegerField, default=15) - Allows the admin to change the 15-second timer if needed.
2. **`PopoutItem`:**
   - `message` (CharField) - e.g., "Someone just gave hope"
   - `button_text` (CharField) - e.g., "JOIN"
   - `link` (URLField) - e.g., `/be-carrier`
   - `is_active` (BooleanField, default=True)

**API Endpoint:**
- `GET /api/settings/popouts/` (Public): Returns `{ is_enabled: true, interval_seconds: 15, items: [...] }`. Only returns items where `is_active` is True.
- `GET/PUT/POST /api/settings/popouts/...` (Admin-only): Full CRUD operations for managing the messages.

*Note: We will initially seed the database with the 5 specific messages and links you provided.*

### 2. Frontend Modifications (Next.js)

**Global UI Component (`EngagementPopout.tsx`):**
- Create a floating component positioned fixed at `bottom-4 left-4`.
- **State Management:** Fetch the config from `/api/settings/popouts/` on mount. If `is_enabled` is false, do not render.
- **Animation Logic:** 
  - Use `framer-motion` for smooth slide-in (from bottom) and slide-out effects.
  - Implement a `setInterval` using the `interval_seconds` from the backend (default 15s).
  - Every 15 seconds, pick a random item from the active `items` array.
  - Keep the pop-out visible for ~5 seconds, then hide it, waiting for the next interval.

**Admin Dashboard:**
- Create a new admin settings page: `src/app/admin/manage-popouts`.
- Add a master toggle switch to enable/disable the feature globally.
- Add a data table to list all pop-out items.
- Provide a simple modal to edit existing text/links or add new custom pop-outs in the future.

## Verification Plan
1. **Frontend Rendering:** Verify the pop-out appears exactly in the lower left corner and animates smoothly without disrupting the user's view.
2. **Timing Logic:** Ensure the popup waits 15 seconds, shows a random message, disappears, and repeats correctly without memory leaks (proper cleanup of `setInterval`).
3. **Admin Control:** Toggle the master switch to "Off" in the admin dashboard and verify the frontend stops showing the pop-outs immediately upon refresh. Edit a link in the dashboard and verify it updates on the live site.
