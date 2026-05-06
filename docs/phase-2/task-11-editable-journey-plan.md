# Admin Editable "Hopeful Beginning Journey" Plan

This plan details how we will allow administrators to dynamically update the text content and embedded video of the "Hopeful Beginning Journey" section without needing a code deployment.

## Proposed Changes

### 1. Backend Modifications (Django)

**Database Model:**
- Create a `JourneyContent` singleton model (only one row exists).
  - `title` (CharField)
  - `description` (TextField)
  - `video_embed_url` (URLField) - e.g., a YouTube or Vimeo embed link.
  - `updated_at` (DateTimeField)

**API Endpoints:**
- `GET /api/settings/journey-content/` (Public) - Retrieves the singleton data.
- `PUT /api/settings/journey-content/` (Admin-only) - Updates the data.

### 2. Frontend Modifications (Next.js)

**Admin Dashboard:**
- Create an interface at `src/app/admin/manage-journey-content`.
- Build a form with inputs for the Title, Description, and Video Embed URL.
- Show a live preview of the embedded video based on the URL provided.

**Public Page (`src/app/(public)/daily-hope/page.tsx` or similar):**
- Remove the hardcoded text and video iframe `src`.
- Fetch the data from `/api/settings/journey-content/` (using SSR or static generation with revalidation).
- Render the `title`, `description`, and inject the `video_embed_url` safely into the `<iframe>`.

## Verification Plan
1. Log into the admin panel and change the video link and description.
2. Navigate to the public Hopeful Beginning Journey page and verify the new video and text render correctly.
3. Ensure the video iframe is responsive and plays correctly.
