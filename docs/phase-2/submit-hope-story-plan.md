# Submit Your Hope Story - Implementation Plan

This plan details the implementation of the "Submit Your Hope Story" feature, which allows users to submit testimonials that can be reviewed by admins and subsequently displayed on the homepage.

## Proposed Changes

### 1. Backend Modifications (Django)

**New App & Model:**
- Create a new Django app called `apps/hope_stories`.
- Create a `HopeStory` model with the following fields:
  - `id` (UUID)
  - `full_name` (CharField)
  - `occupation` (CharField, optional)
  - `testimonial` (TextField)
  - `photo` (ImageField, uploads to the configured AWS S3 bucket)
  - `status` (CharField: `PENDING`, `APPROVED`, `REJECTED`, default=`PENDING`)
  - `created_at`, `updated_at` (DateTimeField)

**API Endpoints:**
- **Public Submit:** `POST /api/hope-stories/` - Accepts multipart form data (text + image). Includes the chosen anti-spam validation (Turnstile/Honeypot).
- **Public List:** `GET /api/hope-stories/approved/` - Returns only stories where `status='APPROVED'`, ordered by newest first.
- **Admin Management:** `GET/PUT/DELETE /api/hope-stories/` - Requires admin privileges. Allows changing status to `APPROVED` or `REJECTED`.

### 2. Frontend Modifications (Next.js)

**Homepage Updates:**
- Create a `HopeStoriesSection` on the homepage to fetch and display approved stories in a beautifully styled grid or carousel.
- Add a prominent "Submit Your Hope Story" button in this section.

**Submission Modal (`SubmitHopeStoryModal.tsx`):**
- **Trigger:** Opened by the "Submit Your Hope Story" button.
- **Header:** "Submit how HopeBegins helped you in your journey. Share your testimonial here."
- **Form Fields (React Hook Form + Zod):**
  - **Full Name for Display:** (Required)
  - **Occupation:** (Optional)
  - **Testimonial:** (Textarea). Implement Zod refinement to strictly enforce a maximum of 200 words. Show a dynamic word counter below the field.
  - **Upload Photo:** Add a file input that accepts `image/jpeg`, `image/png`, and `image/webp`. Show a helper note: *(Max size: 5MB. Clear, portrait photos work best)*.
- **State Management:** Display success state or error handling post-submission.

**Admin Dashboard:**
- Create a new admin section: `src/app/admin/manage-stories`.
- Build a table to view all submissions.
- Implement an approval workflow: Add "Approve" and "Reject" quick-action buttons.
- Display the uploaded photo in a thumbnail for admin review.

## Verification Plan
- **Frontend Submission:** Ensure users can upload an image, form enforces the 200-word limit, and submission is successful.
- **Admin Review:** Log into the admin panel, verify the new story appears as `PENDING`, and successfully change it to `APPROVED`.
- **Homepage Display:** Reload the homepage to verify the newly approved story renders correctly with its image.
