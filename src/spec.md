# Specification

## Summary
**Goal:** Persist and surface anonymous visitor activity (journey node views, choices, and submitted text) so the site owner can review what each customer did via the Admin Dashboard.

**Planned changes:**
- Add backend storage for a chronological activity event log (timestamp, eventType, visitorId, payload) persisted in stable state and surviving upgrades.
- Add backend access controls so visitors can only write events for their own visitorId, while admins can list/filter events and clear/delete them.
- Generate and persist an anonymous visitorId on the frontend (stored locally) and include it with all tracking submissions.
- Send high-signal tracking events from the frontend for node/page views, option/answer submissions, ProposalQuestion decisions/attempts, and ThinkFlow step text submissions; buffer/retry sending without breaking the journey UX.
- Update the Admin Dashboard “Tracking” view to fetch backend-tracked events, filter/group by visitorId, show a per-visitor timeline, and export events as JSON (optionally including existing local journeyState).

**User-visible outcome:** Visitors’ key journey actions and submitted text are recorded under an anonymous visitorId, and the admin can view timelines per visitor, filter activity, export the data as JSON, and clear tracked events (admin-only).
