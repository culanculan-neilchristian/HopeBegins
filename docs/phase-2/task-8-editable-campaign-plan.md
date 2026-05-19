# Admin Editable 21-Day Email Campaign Plan

This plan details how we will give administrators the ability to edit the content and design of the 21-day email campaign without disrupting the automated Celery sending logic.

## Proposed Changes

### 1. Backend Modifications (Django)

**Database Models:**
- Create an `EmailTemplate` model in `apps/daily_hope/models.py`:
  - `day_number` (IntegerField, unique, 1-21)
  - `subject` (CharField)
  - `html_content` (TextField)
  - `is_active` (BooleanField, default=True)

**Celery Task Update:**
- Modify `apps.daily_hope.tasks.send_daily_hope_emails`. Currently, it likely uses hardcoded strings or template files. We will update it to query the `EmailTemplate` model based on the user's `current_day`. If a template exists, it sends it; if not, it skips or falls back to a default.

**API Endpoint:**
- `GET/PUT /api/daily-hope/templates/` - Admin-only endpoints to list and update the email templates.

### 2. Frontend Modifications (Next.js Admin)**
- **UI Management:** Create `src/app/admin/daily-hope/templates`.
- **WYSIWYG Editor:** Integrate `react-simple-wysiwyg` or `react-quill-new` (both are already in `package.json`) to allow admins to edit the `html_content` visually, maintaining bolding, links, and formatting.
- **Preview:** Add a "Preview Email" button that renders the HTML safely in a modal or sends a test email to the admin's email address.

## Status
✅ **Completed** - 2026-05-06
- Backend model and API implemented.
- Celery tasks updated to use database-driven templates.
- Frontend admin interface created with WYSIWYG editor and preview.
- Seed command created and executed to migrate existing content.

## Verification Plan
1. **Admin Edits:** Ensure the WYSIWYG editor correctly saves HTML content to the backend.
2. **Auto-Sending Test:** Trigger the celery task manually (`dev:celery:beat`) and verify that enrolled users receive the newly updated HTML content.
