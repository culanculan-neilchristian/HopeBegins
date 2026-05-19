# Phishing & Spam Prevention Plan

The current setup includes a basic honeypot (`website` field), but modern bots are easily bypassing it. To definitively stop phishing emails and automated spam on public forms, we need a multi-layered approach.

## Open Questions & Decision Needed

**Which CAPTCHA solution do you prefer?**
- **Option A: Cloudflare Turnstile (SELECTED)** - It's invisible, privacy-preserving, and very effective. Users won't have to solve puzzles, it just runs a background check. You will need to create a free Cloudflare account to get the Site Key and Secret Key.
- **Option B: Advanced Custom Honeypot + Time-based Validation (Discarded)** - We can implement a check that rejects forms submitted too quickly (under 3 seconds) and uses dynamically named hidden fields. This doesn't require any third-party accounts but is slightly less bulletproof against advanced botnets.

## Proposed Changes

### 1. Frontend Modifications (Next.js)
- **Honeypot Fields:** Add hidden fields `website` and `lastNameHoney` to all public forms (`PrayerForm.tsx`, `DailyHopeForm.tsx`, and `CarrierForm.tsx`).
- **Time-based Validation:** 
  - Record `startTime` using `Date.now()` when the form initializes.
  - Pass `startTime` (or `start_time`) to the backend on submission.

### 2. Backend Enhancements (Django)
- **Multi-Layered Validation:** Update `PrayerSerializer`, `HopeJourneySerializer`, and the Carrier submission serializer to:
  - **Honeypot Check:** Reject requests where any hidden honeypot field is filled.
  - **Time Check:** Verify that the form submission took at least 3 seconds (using `validate_form_time` utility).
  - **Keyword Filtering:** Check the `content` or `carrier_reason` fields for common phishing keywords (e.g., "crypto", "seo", "marketing").
- **Strict Submission Throttling:** Add a dedicated `StrictPublicFormThrottle` (5 requests per hour per IP) for create actions on public forms.

## Verification Plan

### Automated Tests
- Verify the backend correctly rejects submissions without a valid token.
- Verify the backend rejects submissions containing restricted spam keywords.
- Verify that rate limiting properly blocks an IP after 5 rapid requests.

### Manual Verification
- Test submitting a prayer normally to ensure the form works for real users.
- Test the daily hope form submission.
