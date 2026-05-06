# Organization Management Plan

This plan outlines the steps needed to implement the Organization Dropdown feature for prayer requests. The goal is to allow users to select a partner organization when submitting a prayer, and for admins to manage these organizations from the backend dashboard.

## Proposed Changes

### 1. Backend Modifications (Django)

**Models:**
- Create a new `Organization` model in `apps/prayers/models.py` (or a dedicated `apps/organizations` app) with fields:
  - `id` (UUID)
  - `name` (CharField)
  - `description` (TextField, optional)
  - `is_active` (BooleanField, default=True)
  - `created_at`, `updated_at` (DateTimeField)
- Update the `Prayer` model to include a nullable Foreign Key to `Organization`.

**API Endpoints & Serializers:**
- Create `OrganizationSerializer`.
- Create a `ModelViewSet` for `Organization`:
  - `list` (publicly accessible if filtered to `is_active=True`, or custom `@action` for public dropdown fetching).
  - `create`, `update`, `destroy` (restricted to admin users only).
- Update `PrayerSerializer` and `AdminPrayerSerializer` to accept and return the `organization_id`.

### 2. Frontend Modifications (Next.js)

**Admin Dashboard:**
- Create a new admin section under `src/app/admin/manage-organizations`.
- Build a data table displaying all organizations.
- Add a modal form (using `react-hook-form` and `zod`) to create, update, and toggle the active status of organizations.

**Public Form (`PrayerForm.tsx`):**
- Fetch the list of active organizations on component mount using `react-query`.
- Add an "Organization (Optional)" dropdown field beneath the "Prayer Category" field.
- Update `prayerSchema` to accept `organizationId`.

## Verification Plan
- **Admin Flow:** Verify an admin can create, edit, disable, and delete an organization.
- **Public Flow:** Verify the public form correctly fetches only active organizations and submits the selected ID alongside the prayer data.
- **Data Integrity:** Verify the submitted prayer correctly links to the organization in the database and is visible to admins.
