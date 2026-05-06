# Dynamic Impact Tracker Plan

This plan details how we will make the "Our Current Impact" section on the frontend dynamic, fetching real-time data from the backend to calculate the "Lives Touched" metric.

## Proposed Changes

### 1. Backend Modifications (Django)
**API Aggregation Endpoint:**
- Create an open/public endpoint `GET /api/analytics/impact/` (can be placed in a core app like `apps/users` or `apps/prayers`).
- **Logic:**
  - `subscribers` = Count of `HopeJourney` where active=True.
  - `listeners` = Count of total plays from Hopecasts.
  - `journeys` = Count of total Hopeful Beginning Journeys initiated.
  - `carriers` = Count of users with `role='carrier'` and `is_active=True`.
  - `lives_touched` = `subscribers + listeners + journeys + carriers`
- **Response:** Return a JSON object with these exact numbers.

### 2. Frontend Modifications (Next.js)
**Component Updates (`src/components/shared/ImpactTracker.tsx` or similar):**
- **Copy Updates:**
  - Change header to: **"Our Current Impact"**
  - Change sub-header to: **"Every Hope Seed you plant, helps us reach more people. See our actual and current numbers by God's grace."**
  - Remove the "Countries Reached" stat card entirely.
- **Data Integration:**
  - Remove hardcoded statistics.
  - Fetch data from `/api/analytics/impact/` on component mount using React Query or a standard server fetch (if it's a Server Component, fetch directly with `fetch(..., { next: { revalidate: 3600 } })` to cache it for an hour).
  - Populate the UI cards with the dynamic numbers.

## Status
✅ **Completed** - 2026-05-06
- Backend aggregation endpoint implemented in `apps/analytics/views.py`.
- Frontend `ImpactStats` component updated to fetch and display real-time data.
- "Countries Reached" removed and copy updated per requirements.

## Verification Plan
1. Check the database to see the exact counts of carriers and subscribers.
2. Load the homepage and verify the "Lives Touched" total precisely matches the calculated sum of the parts.
3. Verify the "Countries Reached" block is no longer visible.
