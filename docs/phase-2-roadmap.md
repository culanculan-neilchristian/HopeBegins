# Phase 2 Roadmap

This document serves as the central roadmap and tracking point for all features and tasks planned for Phase 2. It tracks our progress and ensures both the team and AI have a clear understanding of what is completed and what is pending.

## Current Tasks

### 1. Security Enhancements: Phishing Prevention
- **Status:** ✅ Completed (Option B)
- **Detailed Plan:** [phishing-prevention-plan.md](./phase-2/phishing-prevention-plan.md)
- **Description:** We are receiving a lot of phishing emails online via our forms, and the current setup is not fully secure.
- **Goal:** Tighten security for all public forms (specifically for prayers and subscribers).
- **Requirements:** 
  - Add anti-spam mechanisms to all public forms.
  - Stop automated bots from submitting fake entries.

### 2. Organization Dropdown & Admin Management
- **Status:** ✅ Completed
- **Detailed Plan:** [organization-management-plan.md](./phase-2/organization-management-plan.md)
- **Description:** Some partner organizations love to use our prayer portal. We need a way to easily segment which prayers are for which organizations.
- **Goal:** Add an Organization dropdown (for user selection) under the prayer category on the public form, and allow admins to manage these organizations.
- **Requirements:**
  - **Admin Panel:** Add the ability to add, update, or delete an organization.
  - **Frontend Form:** Add an "Organization" dropdown for users to select an organization when submitting a prayer.

### 3. Admin Dashboard Analytics & Filters
- **Status:** ✅ Completed
- **Detailed Plan:** [admin-analytics-filters-plan.md](./phase-2/admin-analytics-filters-plan.md)
- **Description:** Need more granular data insights and filtering capabilities in the admin dashboard.
- **Requirements:**
  - Date range filter across all relevant admin views.
  - Count of prayer requests per category.
  - Count of plays per Hope Cast category.
  - Count of daily subscribers for Daily Hope Drops.
  - Count of people who completed the 21-day campaign.
  - Additional beneficial filters based on data availability.

### 4. "Submit Your Hope Story" Feature
- **Status:** ✅ Completed
- **Detailed Plan:** [submit-hope-story-plan.md](./phase-2/submit-hope-story-plan.md)
- **Description:** Allow users to share their testimonies of how HopeBegins helped them.
- **Requirements:**
  - **Frontend:** Add a "Submit Your Hope Story" button.
  - **Form Popup:**
    - Header: "Submit how HopeBegins helped you in your journey. Share your testimonial here."
    - Fields: Full Name for Display, Occupation, Testimonial (Max 200 words with validation), Upload Photo (with size/type constraints note).
  - **Admin Panel:** Ability to review and approve submitted stories.
  - **Homepage Integration:** Display approved stories on the HopeBegins homepage.

### 5. Stripe Donations Integration
- **Status:** 🔴 Pending
- **Detailed Plan:** [stripe-donations-plan.md](./phase-2/stripe-donations-plan.md)
- **Description:** Implement a donation system using Stripe where donors can optionally cover the transaction costs.
- **Requirements:**
  - Set up Stripe integration for processing donations.
  - Add a feature to allow the donor to cover the Stripe processing fee.
  - Temporarily link to the provided UnionBank account until the final non-profit bank details are ready.

### 6. Random Engagement Pop-out (Lower Left)
- **Status:** ✅ Completed
- **Detailed Plan:** [engagement-popout-plan.md](./phase-2/engagement-popout-plan.md)
- **Description:** A small, randomly appearing notification pop-out in the lower left corner to encourage user engagement (similar to recent donation pop-ups).
- **Requirements:**
  - **Frontend Behavior:** Pops up randomly every 15 seconds with one of the following messages:
    - "Someone just gave hope" -> Button: **JOIN** -> Links to: `https://hopebegins.today/be-carrier`
    - "Someone has been prayed for" -> Button: **PRAY** -> Links to: `https://hopebegins.today/prayers`
    - "Someone listened to hope" -> Button: **LISTEN** -> Links to: `https://hopebegins.today/hopecasts`
    - "Someone supported hope" -> Button: **SUPPORT** -> Links to: `https://hopebegins.today/give-hope`
    - "Someone journeyed with hope" -> Button: **JOURNEY** -> Links to: `https://hopebegins.today/daily-hope`
  - **Admin Control:** Ability to manage this feature from the backend dashboard (e.g., toggle on/off, edit the content).

### 7. Clickable Social Media Icons
- **Status:** ✅ Completed
- **Detailed Plan:** [social-media-icons-plan.md](./phase-2/social-media-icons-plan.md)
- **Description:** Add clickable social media icons to the website to drive engagement to official channels.
- **Requirements:**
  - Add icons for Facebook, Instagram, and LinkedIn.
  - Links:
    - Facebook: `https://www.facebook.com/hopebeginstoday`
    - Instagram: `https://www.instagram.com/hopebeginstoday`
    - LinkedIn: `https://www.linkedin.com/company/hopebeginstoday/`

### 8. Admin Editable 21-Day Email Campaign
- **Status:** ✅ Completed
- **Detailed Plan:** [task-8-editable-campaign-plan.md](./phase-2/task-8-editable-campaign-plan.md)
- **Description:** Provide admins with the capability to edit the content and design of the 21-day email campaign directly from the dashboard.
- **Requirements:**
  - Build an interface in the admin panel to modify email content, subject lines, and visual look.
  - Ensure changes to the emails do not disrupt or break the automated sending logic for enrolled users.

### 9. Dynamic Impact Tracker ("Our Current Impact")
- **Status:** ✅ Completed
- **Detailed Plan:** [task-9-dynamic-impact-plan.md](./phase-2/task-9-dynamic-impact-plan.md)
- **Description:** Make the impact numbers section dynamic based on actual data, and update the section's copy.
- **Requirements:**
  - Remove the "Countries Reached" statistic.
  - Make "Lives Touched" a dynamic sum of: Subscribers + Listeners/Plays + Hopeful Beginning Journeys + Active Hope Carriers.
  - Update the Header text to: **"Our Current Impact"**
  - Update the Sub-header text to: **"Every Hope Seed you plant, helps us reach more people. See our actual and current numbers by God's grace."**

### 10. Integrate Bonfire AI Chat
- **Status:** 🔴 Pending
- **Detailed Plan:** [task-10-bonfire-chat-plan.md](./phase-2/task-10-bonfire-chat-plan.md)
- **Description:** Replace or integrate the current AI chat solution with Bonfire.
- **Requirements:**
  - Setup Bonfire AI chat widget on the frontend.

### 11. Admin Editable "Hopeful Beginning Journey"
- **Status:** 🔴 Pending
- **Detailed Plan:** [task-11-editable-journey-plan.md](./phase-2/task-11-editable-journey-plan.md)
- **Description:** Provide admin capabilities to edit the content of the "Hopeful Beginning Journey" section.
- **Requirements:**
  - Allow admin to update text content from the dashboard.
  - Allow admin to update or change the embedded video link directly from the dashboard.

---

## Completed Tasks

- [x] **1. Security Enhancements: Phishing Prevention** (Turnstile + Rate Limiting + Keyword Filtering)
- [x] **2. Organization Dropdown & Admin Management**
- [x] **3. Admin Dashboard Analytics & Filters**
- [x] **4. "Submit Your Hope Story" Feature**
- [x] **6. Random Engagement Pop-out (Lower Left)**
- [x] **7. Clickable Social Media Icons**
- [x] **8. Admin Editable 21-Day Email Campaign**
- [x] **9. Dynamic Impact Tracker ("Our Current Impact")**
