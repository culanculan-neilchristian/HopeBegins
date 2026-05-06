# Stripe Donations Integration Plan

This document outlines the detailed plan to implement a seamless donation experience using Stripe, encompassing the UI flows, the "cover transaction costs" feature, and the backend tracking logic.

## Overview of Use Cases

### 1. One-Time and Monthly Donations
- **Flow:** User selects an amount (e.g., $10, $50, $100, Custom) and chooses between "Give Once" or "Give Monthly".
- **Action:** Clicking "Donate" triggers a Stripe Checkout Session.

### 2. Donor Covers Transaction Costs
- **Flow:** User toggles a checkbox: "I'd like to cover the transaction fees so 100% of my donation goes to HopeBegins."
- **Logic:** The frontend dynamically calculates the Stripe fee (typically `2.9% + $0.30`) and adds it to the total amount.
- **Backend:** Tracks both the `base_amount` and the `fee_covered` amount in the database to keep reporting accurate.

### 3. Stripe Checkout & Success/Failure Routing
- **Flow:** User is securely redirected to Stripe's hosted checkout page.
- **Success:** Redirected back to `https://hopebegins.today/give-hope/success`.
- **Cancel/Fail:** Redirected back to the donation page with an error state.

### 4. Direct Bank Transfer Fallback
- **Flow:** Instead of a credit card, the user selects "Direct Bank Transfer".
- **Action:** The UI displays the temporary UnionBank details.
- **Tracking:** User fills out a form to log their pledge. Admin reviews the bank statement later and manually marks the donation as "Received" in the dashboard.

## Proposed Technical Implementation

### 1. Backend Modifications (Django)

**Dependencies:**
- Install `stripe` Python library.
- Configure `STRIPE_PUBLIC_KEY`, `STRIPE_SECRET_KEY`, and `STRIPE_WEBHOOK_SECRET` in `.env`.

**Model Updates (`apps/donations/models.py`):**
- Expand the `Donation` model to handle Stripe data:
  - `email` (EmailField, optional)
  - `base_amount` (Decimal)
  - `covered_fee` (Decimal, default=0)
  - `status` (Choices: `PENDING`, `COMPLETED`, `FAILED`, `MANUAL_BANK_TRANSFER`)
  - `stripe_session_id` (CharField, unique, optional)
  - `stripe_payment_intent_id` (CharField, optional)

**API Endpoints:**
- `POST /api/donations/create-checkout-session/`: Accepts the `amount`, `donation_type` (One-Time/Monthly), and `covers_fee` boolean. Creates a Stripe Checkout Session and returns the `checkout_url`. It also creates a `PENDING` Donation record.
- `POST /api/donations/webhook/`: Listens to Stripe events (e.g., `checkout.session.completed`). Verifies the webhook signature and securely marks the corresponding `Donation` as `COMPLETED`.
- Update `DonationViewSet` permissions so public users can submit (`create`), but only admins can `list`/`update`.

### 2. Frontend Modifications (Next.js)

**Donation UI Page (`src/app/(public)/give-hope/page.tsx`):**
- Create an engaging UI showing the impact of donations.
- Build the donation form with pre-defined amount buttons, custom amount input, and the "Cover Fees" toggle.
- Add a tab or toggle to switch between "Pay with Card (Stripe)" and "Direct Bank Transfer (UnionBank)".

**Stripe Integration:**
- Use `@stripe/stripe-js` to safely redirect users to the Checkout Session URL returned by the backend.

**Admin Dashboard:**
- Update `src/app/admin/donations` to display the new fields (`status`, `covered_fee`, `stripe_session_id`).
- Allow admins to manually mark `MANUAL_BANK_TRANSFER` pledges as `COMPLETED` once the UnionBank deposit is verified.

## Verification Plan
1. **Test Mode Checkout:** Process a test payment using Stripe's test credit cards. Verify the Stripe webhook fires and updates the Django database status to `COMPLETED`.
2. **Fee Calculation:** Verify that checking the "Cover Fees" box accurately calculates the Stripe formula and charges the correct total.
3. **UnionBank Display:** Ensure the bank transfer route gracefully shows the details and logs the intent as `MANUAL_BANK_TRANSFER`.
