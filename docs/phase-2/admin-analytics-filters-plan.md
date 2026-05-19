# Admin Analytics & Filters Plan

This plan details how we will introduce deeper analytical capabilities and robust filtering across the admin dashboard. The objective is to provide a holistic and dynamic view of platform engagement using date ranges and category aggregations.

## Proposed Changes

### 1. Backend Modifications (Django API)

**Unified Analytics Endpoint (`/api/analytics/`):**
Create a new Django app or add a specific viewset in `apps/users/` (or similar dashboard logic area) that serves aggregated statistics.
- **Filters Required:** Accept `start_date` and `end_date` query parameters.
- **Data Points to Calculate (Aggregations):**
  - **Prayers by Category:** Group `Prayer` models by `category` within the date range and return counts.
  - **Hope Cast Plays:** Query the Hopecasts analytics model (or tracking data) to count total plays grouped by category.
  - **Daily Hope Subscribers:** Query `HopeJourney` where `created_at` falls inside the date range, returning a time-series array (e.g., count per day).
  - **21-Day Campaign Completions:** Count `HopeJourney` objects where `current_day >= 21` or status indicates completion within the date range.

**Existing API Enhancements:**
- Ensure endpoints serving table data (like `/api/prayers/requests/`, `/api/daily-hope/`) support robust `created_at__gte` and `created_at__lte` query parameters for date-range filtering.

### 2. Frontend Modifications (Next.js Admin Dashboard)

**Global Date Range Picker:**
- Implement a reusable `<DateRangePicker>` component (using `shadcn/ui` calendar or a date-fns wrapper).
- Place it at the top of the Admin Dashboard (`src/app/admin/dashboard/page.tsx`) to act as a global filter state.

**Dashboard Widgets & Charts (using Recharts):**
- **Prayer Categories Chart:** A bar or pie chart showing the count of prayer requests per category.
- **Hope Cast Plays:** A chart showing total plays categorized by episode genre or topic.
- **Subscriber Time Series:** A line chart plotting the number of new Daily Hope Drop subscribers for each day in the selected range.
- **Campaign Finishers Metric:** A summary card explicitly showing the number of users who successfully completed the 21-day journey.

**List Views / Tables:**
- Ensure all detail management pages (e.g., `manage-prayers`) incorporate the date range filter in their respective API fetches.

## Verification Plan
- Verify that selecting a date range updates all widgets on the dashboard via a unified API fetch.
- Compare manual counts in the database against the counts displayed in the dashboard metrics.
- Ensure the date-range picker correctly handles edge cases (like same-day start and end, or future dates).
