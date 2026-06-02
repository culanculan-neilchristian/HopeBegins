# Admin Editable Full "Hopeful Beginning" Page Plan

This plan expands the original Task 11 scope. The current implementation only lets administrators edit the Step 2 "A Word for You" title, description, and embedded video on the `/get-started` Hopeful Beginning journey page. The client now wants the whole page to be editable from the admin dashboard without requiring a code deployment.

## Current State

- Public page: `src/app/(public)/get-started/page.tsx`
- Admin page: `src/app/admin/daily-hope/journey/page.tsx`
- Existing editable fields:
  - Step 2 title
  - Step 2 description
  - Step 2 video embed URL
- Existing hardcoded content that still needs to become editable:
  - Page header title and subtitle
  - Progress step labels
  - Welcome step title, body copy, expectation list, and button text
  - Guided prayer intro copy and all 5 prayer cards
  - Devotional title, subtitle, body cards, verse, reference, "Good News" block, reflection prompt, and button text
  - Next steps title, description, action cards, links, and button labels
  - Crisis support footer heading, contact groups, phone numbers, and labels
  - Final "Back to Home" link label

## Proposed Changes

### 1. Backend Modifications

**Database Model:**
- Replace or expand the existing `JourneyContent` singleton into a full-page content model, for example `JourneyPageContent`.
- Keep it as a singleton record so the public page always reads one active page configuration.
- Suggested fields:
  - `page_title` (CharField)
  - `page_subtitle` (TextField)
  - `steps` (JSONField)
  - `welcome_section` (JSONField)
  - `word_section` (JSONField)
  - `prayer_section` (JSONField)
  - `devotional_section` (JSONField)
  - `next_steps_section` (JSONField)
  - `crisis_section` (JSONField)
  - `updated_at` (DateTimeField)

**Recommended JSON Shape:**

```json
{
  "steps": [
    { "key": "welcome", "label": "Welcome" },
    { "key": "word", "label": "A Word for You" },
    { "key": "prayer", "label": "Guided Prayer" },
    { "key": "devotional", "label": "Devotional" },
    { "key": "next-steps", "label": "Next Steps" }
  ],
  "welcome_section": {
    "title": "Your Hopeful Beginning",
    "body": "It's okay to feel this way...",
    "expectations_title": "What to expect:",
    "expectations": [
      "A short video message of encouragement",
      "A guided prayer to help you exhale"
    ],
    "button_text": "Continue"
  },
  "word_section": {
    "title": "A Word for You",
    "description": "Before anything else, we want you to hear this.",
    "video_embed_url": "https://www.youtube.com/embed/zHPaFDRZMUo?rel=0",
    "verse_text": "He heals the brokenhearted and binds up their wounds.",
    "verse_reference": "Psalm 147:3",
    "previous_button_text": "Previous",
    "next_button_text": "Continue"
  },
  "prayer_section": {
    "title": "Guided Prayer",
    "description": "Let's take a moment together. Follow each step at your own pace.",
    "steps": [
      { "title": "Be Still", "text": "Let's take a moment together..." }
    ],
    "back_button_text": "Back",
    "next_button_text": "Next",
    "final_button_text": "Continue to Devotional"
  },
  "devotional_section": {
    "title": "What is Hope?",
    "subtitle": "A short devotional to anchor your heart.",
    "content_cards": [
      "Hope is not the absence of pain..."
    ],
    "verse_text": "We have this hope as an anchor for the soul, firm and secure.",
    "verse_reference": "Hebrews 6:19",
    "good_news_title": "The Good News",
    "good_news_body": "You are loved...",
    "reflection_title": "Reflect on this:",
    "reflection_prompt": "What would it look like to believe...",
    "previous_button_text": "Previous",
    "next_button_text": "Continue"
  },
  "next_steps_section": {
    "title": "Your Next Step",
    "description": "You've made it through this journey...",
    "actions": [
      { "title": "I Need Someone to Pray for Me", "href": "/prayers", "icon": "heart" }
    ],
    "home_link_text": "Back to Home"
  },
  "crisis_section": {
    "heading": "If you're in crisis, please reach out:",
    "contacts": [
      {
        "title": "National Center for Mental Health 24/7 Crisis Hotline",
        "lines": [
          { "label": "Landline (nationwide):", "value": "1553" }
        ]
      }
    ]
  }
}
```

**API Endpoints:**
- `GET /api/settings/journey-page-content/` (Public) - Returns the singleton page content.
- `PATCH /api/settings/journey-page-content/` (Admin-only) - Updates any subset of the page content.
- Preserve the existing `journey-content` endpoint temporarily or add a migration layer so the current frontend does not break during deployment.

**Validation:**
- Validate video URLs as safe embeddable URLs.
- Validate internal links in next-step actions.
- Require at least one prayer step and one next-step action.
- Limit free-text field lengths enough to protect layout.
- Restrict icon values to a known allowlist used by the frontend.

### 2. Frontend Modifications

**Admin Dashboard:**
- Expand `src/app/admin/daily-hope/journey/page.tsx` from a Step 2 editor into a full journey page editor.
- Use a sectioned interface, preferably tabs or accordions:
  - Page Header
  - Welcome
  - Video Word
  - Guided Prayer
  - Devotional
  - Next Steps
  - Crisis Contacts
- Support repeatable fields for:
  - Expectations
  - Prayer steps
  - Devotional content cards
  - Next-step action cards
  - Crisis contact lines
- Keep a live preview, but expand it to preview each page step instead of only the video section.
- Add "Reset to defaults" only if backend supports restoring the seeded default content.

**Public Page (`src/app/(public)/get-started/page.tsx`):**
- Replace hardcoded copy with content from the new full-page API.
- Keep frontend defaults as a fallback so the page still renders if the API fails.
- Map editable icon keys to approved Lucide icons instead of storing raw component names from the API.
- Keep the existing step behavior unchanged:
  - Users move through the same five-step flow.
  - Prayer still has sub-steps.
  - Completion still fires after the devotional step.

**Types and Service Layer:**
- Replace `JourneyContent` with a broader `JourneyPageContent` type in `src/services/siteSettingsService.ts`.
- Add `getJourneyPageContent` and `updateJourneyPageContent` service methods.
- Keep old methods only as compatibility aliases if the backend still exposes the original endpoint.

### 3. Data Migration and Defaults

- Seed the database with the current hardcoded `/get-started` content so the live page does not visually change after deployment.
- Migrate the existing `title`, `description`, and `video_embed_url` values into `word_section`.
- Add a management command or migration helper to restore default content safely.
- Confirm production has exactly one active singleton row.

## Acceptance Criteria

- Admin can edit all visible text on the `/get-started` Hopeful Beginning page.
- Admin can edit the embedded video URL.
- Admin can edit all prayer cards and devotional cards.
- Admin can edit next-step action labels and links.
- Admin can edit crisis contact names, labels, and numbers.
- Public users see the updated content immediately after saving.
- Existing journey progress behavior and completion tracking continue to work.
- The page has safe fallbacks if the content API fails.
- Mobile and desktop layouts remain clean with realistic long text.

## Verification Plan

1. Log into the admin dashboard and update content in every editor section.
2. Save changes and reload `/get-started`.
3. Verify every updated field appears on the public page.
4. Walk through all five steps and verify navigation still works.
5. Verify the video iframe renders with the updated embed URL.
6. Add, remove, and reorder repeatable items where supported.
7. Confirm completion tracking still fires after the devotional step.
8. Test long text on mobile and desktop to catch layout overflow.
9. Confirm invalid video URLs, unsafe links, and empty required sections are rejected.

## Status

Completed - 2026-06-01

- Frontend public page now reads full-page journey content with safe defaults.
- Admin dashboard now includes a full Journey Page Editor with sectioned editing and repeatable fields.
- Backend now exposes full-page journey content through the expanded singleton content API.
- Legacy Step 2 journey content remains supported during the endpoint transition.
