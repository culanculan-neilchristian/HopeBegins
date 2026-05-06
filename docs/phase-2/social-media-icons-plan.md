# Clickable Social Media Icons Implementation Plan

This plan details the addition of clickable social media icons to the HopeBegins website to drive user engagement toward official channels.

## Proposed Changes

### 1. Frontend Modifications (Next.js)

**Component Updates:**
- Update the `Footer.tsx` (located in `src/components/layout/Footer.tsx`) to include a new "Follow Us" section, or integrate the icons into the existing design.
- (Optional but recommended) Add the icons to the mobile navigation menu or header if space permits, so they are always accessible.

**Icon Implementation:**
- Utilize the `lucide-react` library (which is already installed in the project) to fetch crisp, scalable SVG icons for:
  - `Facebook`
  - `Instagram`
  - `Linkedin`
- Style the icons using Tailwind CSS classes to match the brand's primary/muted colors and add smooth hover transitions (e.g., `text-zinc-400 hover:text-brand transition-colors`).

**Link Configuration:**
- Facebook: `https://www.facebook.com/hopebeginstoday`
- Instagram: `https://www.instagram.com/hopebeginstoday`
- LinkedIn: `https://www.linkedin.com/company/hopebeginstoday/`
- Ensure all links are wrapped in anchor tags with `target="_blank"` and `rel="noopener noreferrer"` to securely open the links in a new browser tab without losing the user's place on the HopeBegins site.

## Verification Plan
1. Render the site locally and scroll to the Footer.
2. Verify all three icons are visible and aligned correctly.
3. Hover over the icons to verify the color transition effects.
4. Click each icon to ensure it successfully opens the correct social media profile in a new tab.
