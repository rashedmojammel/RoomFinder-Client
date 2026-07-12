# 🚀 RoomFinder Development Notes

> This document contains project setup steps, issues faced, solutions, and important notes during the development of the RoomFinder project. It serves as a personal knowledge base to avoid repeating the same mistakes in future projects.

---

# Project Information

**Project:** RoomFinder

Two separate repositories:

* **Roomfinder** (frontend) — Next.js 16, TypeScript, Tailwind CSS
* **Roomfinder-server** (backend) — Node.js, Express, TypeScript, native MongoDB driver

## Tech Stack

* Next.js 16 (App Router)
* TypeScript
* Tailwind CSS
* Better Auth
* MongoDB (native driver, no Mongoose)
* Express.js
* imgbb (image hosting)
* Framer Motion
* Lucide React
* Gravity UI Icons

---

# Initial Project Setup

## Installed Packages (frontend)

```bash
npm install better-auth
npm install mongodb
npm install framer-motion
npm install lucide-react
npm install @gravity-ui/icons
```

## Installed Packages (backend)

```bash
npm install express cors dotenv mongodb multer axios form-data
npm install -D typescript ts-node ts-node-dev @types/node @types/express @types/cors @types/multer
```

---

# Better Auth Configuration

Created:

```
src/lib/auth.ts
```

Purpose:

* Better Auth configuration
* MongoDB Adapter
* Email & Password Authentication
* Google OAuth
* Custom User Fields

---

Created:

```
src/lib/auth-client.ts
```

Exports:

* authClient
* signIn
* signUp
* signOut
* useSession

---

Created:

```
src/app/api/auth/[...all]/route.ts
```

```ts
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
```

---

Created:

```
src/lib/session.ts
```

Server-side helpers, deduped per-request with React's `cache()` so `getUserSession()` and `getUserToken()` don't trigger two separate `auth.api.getSession()` calls in the same render:

```ts
import { headers } from "next/headers";
import { cache } from "react";
import { auth } from "../auth";

const getSession = cache(async () => {
  return auth.api.getSession({ headers: await headers() });
});

export const getUserSession = async () => {
  const session = await getSession();
  return session?.user ?? null;
};

export const getUserToken = async () => {
  const session = await getSession();
  return session?.session?.token ?? null;
};
```

**Decision:** Authorization headers (`Bearer` tokens on API calls) were deliberately left out of `serverFetch`/`serverMutation` for now — auth exists for identifying the current user (`session.user.id`), but the Express backend doesn't verify requests yet. This is a known gap, tracked under Future Features.

---

# Environment Variables

## Frontend (`.env.local`)

```
MONGODB_URI=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_BASE_URL=http://localhost:5000
NEXT_PUBLIC_IMGBB_API_KEY=
```

## Backend (`.env`)

```
PORT=5000
MONGODB_URI=
FRONTEND_URL=http://localhost:3000
```

Always restart the development server after changing `.env.local` / `.env`. This applies to `next.config.ts` changes too — Turbopack does **not** hot-reload config file edits.

---

# Authentication Pages

Completed:

* Sign In Page
* Sign Up Page
* Google Authentication
* Better Auth Integration

---

# Navbar

Completed

* Responsive Navbar
* Desktop Navigation
* Mobile Navigation
* User Dropdown
* Better Auth Session
* Logout
* Dynamic Authentication Buttons

---

# Homepage Sections

Completed

* Hero Section
* Featured Rooms
* Platform Statistics
* Room Categories
* How It Works
* Footer

---

# Backend API (Roomfinder-server)

Built as a standalone Express + TypeScript service using the native `mongodb` driver (no Mongoose) — separate repo from the Next.js frontend, communicating only over HTTP/JSON.

## Structure

```
src/
├── lib/
│   ├── mongo.ts        // MongoClient, connect/close helpers
│   └── db.ts            // getDb() accessor
├── types/
│   ├── listing.ts
│   ├── booking.ts
│   └── savedRoom.ts
├── controllers/
│   ├── listing.controller.ts
│   ├── booking.controller.ts
│   └── savedRoom.controller.ts
├── routes/
│   ├── listing.routes.ts
│   ├── booking.routes.ts
│   └── savedRoom.routes.ts
├── middleware/
│   └── asyncHandler.ts
├── app.ts
└── server.ts
```

## Endpoints built

**Listings** (`/api/rooms`)
* `GET /` — public feed; filter by `city`, `minRent`, `maxRent`, `bedrooms`; only returns `isAvailable: true` **and** `approvalStatus: "approved"`
* `GET /:id`
* `GET /owner/:ownerId` — owner's own listings, every approval status
* `GET /admin/pending` — admin review queue, oldest first
* `POST /` — always created with `approvalStatus: "pending"`; client cannot set approval status directly
* `PATCH /:id` — editing an already-approved listing resets it to `"pending"` (re-review), unless the only field changed is `isAvailable`
* `PATCH /:id/approval` — admin approves/rejects, optional `rejectionReason` on reject
* `DELETE /:id`

**Bookings** (`/api/bookings`)
* `POST /` — tenant creates a pending request with `tenantName`, `tenantPhone` (required), `moveInDate`, `message` (optional); blocks self-booking, duplicate pending requests, and booking unavailable/unapproved rooms
* `GET /tenant/:tenantId`
* `GET /owner/:ownerId`
* `PATCH /:id/status` — owner approves/rejects, tenant cancels (authorization checked against `ownerId`/`tenantId`)

**Saved Rooms** (`/api/saved-rooms`)
* `GET /:tenantId`
* `POST /` — idempotent, returns `"Already saved"` instead of erroring on duplicates
* `DELETE /:tenantId/:listingId`

Full request/response examples and a step-by-step Postman test sequence written up separately as `roomfinder-api-postman-guide.md`.

---

# Frontend Data Layer

Split into two layers by HTTP verb, matching Next.js's read/write conventions:

* `src/lib/fetch.ts` — low-level `serverFetch` (GET) / `serverMutation` (POST/PATCH/DELETE) wrapper, server-only (uses `redirect()` from `next/navigation` on 401/403)
* `src/lib/client-fetch.ts` — lightweight client-component-safe fetcher (no `redirect()`, just throws) for interactive pages like the search/filter grid
* `src/lib/api/*.ts` — all GET functions (`listings.ts`, `bookings.ts`, `savedRooms.ts`, `users.ts`)
* `src/lib/actions/*.ts` — all mutations, marked `"use server"` so they're callable directly from client components/forms (`listings.ts`, `bookings.ts`, `savedRooms.ts`)

---

# Features Completed

* Find Room listing page — live search (city), filters (bedrooms, max rent), debounced API calls
* Room details page — gallery, amenities, owner info, related listings in the same city
* Add Listing form — owner-only, pulls `ownerId` from session (not manually typed), image upload via imgbb, amenities tag input
* Image upload — direct browser-to-imgbb via `NEXT_PUBLIC_IMGBB_API_KEY`, drag-and-drop, multi-file, per-file progress/error state
* Booking request modal — clicking "Book" opens a modal collecting tenant name, phone (required), move-in date and message (optional) instead of firing an instant request
* Booking system — tenant requests a room, owner approves/rejects from a dashboard table, tenant can cancel a pending request, owner blocked from booking their own listing
* Saved rooms (wishlist) — heart icon on room cards, optimistic UI, backed by a dedicated `savedRooms` collection
* Owner profile on room details — real name/avatar/email pulled from the `user` collection (better-auth's own MongoDB collection), queried directly from a Server Component
* Profile management page — update name/avatar (`authClient.updateUser`) and password (`authClient.changePassword`)
* Admin listing approval — every new/edited listing starts as `pending`; only `approved` listings appear in the public feed; admin queue page to approve/reject with an optional rejection reason
* Owner dashboard — sidebar layout (`dashboard-nav.ts` config), live stats (real listing/booking counts, not hardcoded), My Listings page with availability toggle + edit + delete, edit-triggers-reapproval logic, profile page moved to match `roleProfilePath`
* Add Listing as intercepting-route modal — clicking the sidebar link opens the form as a modal (via Next.js parallel + intercepting routes) while a direct visit/refresh of the same URL still renders the full page

---

# Issue #1

## Error

```
Module not found:
Can't resolve 'mongodb'
```

## Cause

Better Auth MongoDB adapter requires the official MongoDB driver.

## Solution

Install MongoDB package.

```bash
npm install mongodb
```

Restart Next.js.

---

# Issue #2

## Error

```
Unable to create account

Internal Server Error
```

## Cause

Backend authentication configuration problem.

Possible reasons

* MongoDB connection
* Better Auth configuration
* Missing environment variables
* Wrong adapter configuration

## Solution

Check

* auth.ts
* MongoDB URI
* API Route
* Environment variables

Always check the terminal because the browser only shows "Internal Server Error".

---

# Issue #3

## Error

```
The prop href expects a string or object,
but got undefined.
```

## Cause

Navbar Dashboard Link

```tsx
roleDashboard[role]
```

returned

```
undefined
```

because the role didn't exist inside the object.

## Solution

Use a fallback.

```tsx
href={roleDashboard[role] || "/dashboard"}
```

---

# Issue #4

## Selected Role Not Saving

### Expected

User selects

```
Tenant
```

or

```
Owner
```

Database should save

```json
{
  "role": "tenant"
}
```

or

```json
{
  "role": "owner"
}
```

---

### Actual

Database saved

```json
{
  "role": "user"
}
```

---

### Cause

Better Auth ignores custom fields unless configured correctly.

Wrong

```ts
signUp.email({
    role
})
```

---

### Correct

```ts
signUp.email({
    additionalFields:{
        role
    }
})
```

AND

```ts
user:{
    additionalFields:{
        role:{
            type:"string",
            defaultValue:"tenant",
            input:true
        }
    }
}
```

**Important**

```
input:true
```

is required.

---

# Issue #5

## Error

404 on every room details page (`/find-room/[id]`), even for slugs/ids that definitely existed.

## Cause

Next.js 15+ made route `params` a `Promise` instead of a plain object. The page was destructuring `params.id` directly:

```tsx
interface RoomPageProps {
  params: { id: string };
}

export default function RoomDetailsPage({ params }: RoomPageProps) {
  const room = getRoomBySlug(params.id); // params.id is undefined
```

`params.id` was `undefined` because `params` itself was a `Promise` object, so the lookup always failed and `notFound()` fired.

## Solution

Make the page `async` and `await` params:

```tsx
interface RoomPageProps {
  params: Promise<{ id: string }>;
}

export default async function RoomDetailsPage({ params }: RoomPageProps) {
  const { id } = await params;
  const room = getRoomBySlug(id);
```

---

# Issue #6

## Error

```
Invalid src prop (https://encrypted-tbn0.gstatic.com/...) on `next/image`,
hostname "encrypted-tbn0.gstatic.com" is not configured under images
in your `next.config.js`
```

...even after adding `remotePatterns` with `hostname: '**'`.

## Cause

The pattern included `search: ''`, which tells Next.js to **only** match URLs with no query string. The failing image URL had a query string (`?q=tbn:...&s=10`), so it never matched despite the wildcard hostname.

```ts
remotePatterns: [
  {
    protocol: 'https',
    hostname: '**',
    port: '',
    pathname: '**',
    search: '',   // ← this line blocks any URL with a query string
  },
],
```

## Solution

Drop `port`, `pathname`, and `search` — omitting them defaults to "match anything":

```ts
images: {
  remotePatterns: [
    { protocol: "https", hostname: "**" },
  ],
},
```

Then **restart the dev server** — `next.config.ts` edits are not hot-reloaded.

**Note:** `hostname: "**"` allows images from any domain, which is fine for early development but should be narrowed to actual image hosts (e.g. `i.ibb.co` for imgbb) before going further, since it currently lets any external image URL be rendered through the app.

---

# Issue #7

## Problem

Frontend `Room` type (mock data: `slug`, `roomType`, `rating`, `reviewsCount`, `owner: { name, avatar, phone, ... }`) did not match the real backend `Listing` schema (`rentPerMonth`, `ownerId` as a plain string, no slug/rating/roomType at all).

## Cause

The frontend components were originally built against static mock data before the real Express + MongoDB backend existed, using a richer/fictional schema (fake ratings, denormalized owner objects) that the real backend was never going to have.

## Solution

Rewrote `RoomCard`, `RoomDetails`, `OwnerCard`, `BookRoomButton` to match the actual `Listing` type field-for-field, and switched detail-page lookups from `slug` to MongoDB `_id`. Owner display info (name/avatar/email) is fetched separately, directly from the `user` collection, rather than being embedded in the listing document.

---

# Issue #8

## Problem

None of the Express controllers had `try/catch`, and nothing wrapped them — an unhandled promise rejection (bad query, dropped DB connection, etc.) would leave a request hanging with no response, or crash the process depending on Node version.

## Cause

Route handlers were passed directly to Express (`router.get("/", getListings)`), and Express 4 does not automatically catch rejected promises from `async` handlers.

## Solution

Added a small wrapper and applied it to every route:

```ts
export const asyncHandler =
  (fn: RequestHandler) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
```

```ts
router.get("/", asyncHandler(getListings));
```

Plus a global 404 handler and error-handling middleware at the bottom of `app.ts` so every unhandled error returns a proper `500` JSON response instead of hanging.

---

# Issue #9

## Problem

Owners could send a booking request on their own listing, and the room details page showed a placeholder "Owner profiles aren't available yet" message instead of real owner info.

## Cause

* `BookRoomButton` had no check comparing the logged-in user against the listing's `ownerId`.
* `OwnerCard` never actually fetched anything — it just rendered a static message.

## Solution

* `BookRoomButton` now reads `session.user.id` via `useSession()` and disables + relabels the button ("This is your listing") when it matches `listing.ownerId`. Same check added server-side in the backend's `createBooking` controller (`400` `"You cannot book your own listing"`) so it's enforced even if the frontend check is bypassed.
* `OwnerCard` converted to a Server Component that receives real owner data fetched directly from the `user` collection via `getUserById(ownerId)`, run in parallel with the listing/nearby-rooms fetches.

---

# Issue #10

## Problem

Direct one-click "Request to Book" had no way for the owner to actually contact the tenant — no name, no phone number, nothing to act on when reviewing a request.

## Cause

The original booking flow only ever sent `{ listingId, tenantId }` — enough to create a pending record, but not enough for an owner to make a real decision or get in touch.

## Solution

Added a `BookingRequestModal` that opens when "Book" is clicked, collecting `tenantName` and `tenantPhone` (required) plus `moveInDate` and `message` (optional) before calling `createBooking`. Backend `Booking` type and `createBooking` validation updated to require the two contact fields. Owner's booking dashboard now shows the tenant's actual name/phone/move-in date instead of a raw `tenantId` string.

---

# Issue #11

## Problem

Visiting `/dashboard/admin/listings` immediately redirected back to `/dashboard` instead of showing the approval queue.

## Cause

The page has:

```tsx
if (user.role !== "admin") redirect("/dashboard");
```

The logged-in user's `role` wasn't actually `"admin"` — either because no signup flow ever produces that value (every new user defaults to `"tenant"`), or because `role` wasn't coming through on `session.user` at all if the field wasn't correctly declared under `additionalFields` in `auth.ts`.

## Solution

* Manually set the role directly in MongoDB for a test account:
  ```js
  db.user.updateOne({ email: "you@example.com" }, { $set: { role: "admin" } })
  ```
* **Signed out and back in** afterward — an existing session doesn't pick up a role change until a new session is issued.
* Confirmed `role` is declared under `user.additionalFields` in `auth.ts`, not just referenced during signup, so it's actually included on every session fetch.
* Redirect target improved to route through `roleDashboardPath[getRole(user.role)]` instead of a hardcoded `/dashboard`, so a mis-permissioned visit lands somewhere role-appropriate instead of a dead end.

---

# Issue #12

## Error

```
Internal Server Error
```
...specifically when clicking **Approve** (or reject-with-no-reason) on a pending listing in the admin queue.

## Cause

`updateListingApproval` built its MongoDB update document like this:

```ts
const update: Partial<Listing> = { approvalStatus, updatedAt: new Date() };

if (approvalStatus === "rejected") {
  update.rejectionReason = ...;
} else {
  update.rejectionReason = undefined;   // key still exists, value is undefined
}

await collection.updateOne(
  { _id: new ObjectId(id) },
  { $set: update, $unset: { ...(update.rejectionReason === undefined ? { rejectionReason: "" } : {}) } }
);
```

Setting `update.rejectionReason = undefined` leaves the **key** present on the object (JS allows a key with an `undefined` value). That object went straight into `$set`, while the same field name was *also* added to `$unset` — putting `rejectionReason` in both `$set` and `$unset` in a single `updateOne` call. MongoDB rejects that outright:

```
MongoServerError: Updating the path 'rejectionReason' would create a conflict at 'rejectionReason'
```

This fired on essentially every **approve** click, since approving always took the `else` branch.

## Solution

Rebuilt the update as two genuinely separate objects (`setFields` / `unsetFields`), so `rejectionReason` is only ever placed in one of them, never both:

```ts
const setFields: Record<string, unknown> = { approvalStatus, updatedAt: new Date() };
const unsetFields: Record<string, ""> = {};

if (approvalStatus === "rejected" && rejectionReason?.trim()) {
  setFields.rejectionReason = rejectionReason.trim();
} else {
  unsetFields.rejectionReason = "";
}

const updateOperation: Record<string, unknown> = { $set: setFields };
if (Object.keys(unsetFields).length > 0) updateOperation.$unset = unsetFields;

await collection.updateOne({ _id: new ObjectId(id) }, updateOperation);
```

Fixed in `Roomfinder-server/src/controllers/listing.controller.ts`, inside `updateListingApproval` — no frontend changes needed, the bug was entirely in how the MongoDB update document was constructed.

---

# Debugging Checklist

Whenever something doesn't work

✔ Read terminal error

✔ Read browser console

✔ Check Network tab

✔ Check MongoDB

✔ Check auth.ts

✔ Check .env.local / .env

✔ Restart development server (required for both `.env` and `next.config.ts` changes)

✔ Delete old test users if testing authentication

✔ For Next.js dynamic routes: confirm `params` is awaited (Next 15+ makes it a Promise)

✔ For Express routes: confirm the handler is wrapped in `asyncHandler` — a hanging request with no error in the terminal usually means an unhandled rejection

---

# Git Commit History

Authentication

```bash
feat: configure Better Auth with MongoDB authentication
```

Authentication Pages

```bash
feat: add RoomFinder authentication pages
```

Navbar

```bash
feat: integrate Better Auth session with RoomFinder navbar
```

Role Selection

```bash
feat: add tenant and owner role selection during signup
```

MongoDB Fix

```bash
fix: install mongodb driver for Better Auth adapter
```

Navbar Fix

```bash
fix: prevent navbar dashboard link undefined href error
```

Find Room Pages

```bash
feat(find-room): add room listing and detail pages with search, filters, and static data
```

Backend API

```bash
feat(server): scaffold Express + TypeScript API with listings, bookings, and saved-rooms endpoints
```

Async Params Fix

```bash
fix(find-room): await params in detail page for Next.js 15 compatibility
```

Image Host Config Fix

```bash
fix(next-config): correct remotePatterns to allow images with query strings
```

Schema Alignment

```bash
refactor(room-components): align RoomCard, RoomDetails, OwnerCard, BookRoomButton with real Listing schema
```

Error Handling

```bash
fix(server): wrap all route handlers in asyncHandler and add global error middleware
```

Booking System

```bash
feat: add booking request flow with owner approve/reject and tenant cancel
```

Saved Rooms

```bash
feat: add saved/wishlist rooms with optimistic save/unsave UI
```

Owner Profile Card

```bash
feat: fetch real owner name/avatar/email from user collection for room details
```

Profile Management

```bash
feat: add profile settings page for name, avatar, and password updates
```

Image Upload

```bash
feat: add direct browser-to-imgbb image upload with drag-and-drop uploader
```

---

# Lessons Learned

* Always read the terminal error before debugging.
* Keep custom fields inside `additionalFields`.
* Restart Next.js after changing `.env.local` **or** `next.config.ts` — neither hot-reloads.
* Test authentication with a new user after changing the schema.
* Use fallback values for dynamic routes.
* Build UI first, then connect backend logic.
* In Next.js 15+, always type `params` as a `Promise` and `await` it — this bit twice in different pages before it became a habit.
* `next/image` `remotePatterns` matching is strict on every sub-field (`search`, `pathname`, `port`) — an empty string is a real constraint, not "unset."
* Design the real database schema **before** building UI components against mock data, or budget time to rewrite every component later. Mock data with fields that "would be nice" (fake ratings, denormalized owner profiles) creates rework once the real backend exists.
* Every Express async route handler needs to either be wrapped (`asyncHandler`) or have its own `try/catch` — otherwise failures are silent and requests just hang.
* Enforce business rules (like "can't book your own listing") on the backend, not just the frontend — the frontend check is a UX nicety, not a real guard.
* When two apps (frontend/backend) evolve independently, re-sync the shared type/schema explicitly rather than assuming they still match.

---

# Future Features

Completed (moved from the original list):

* ~~Room Posting~~ → Add Listing form
* ~~Room Details~~ → Room details page
* ~~Search & Filter~~ → Find Room page
* ~~Wishlist~~ → Saved Rooms
* ~~Booking System~~ → Request/approve/reject/cancel flow
* ~~Profile Management~~ → name, avatar, password

Still open:

* Protected Routes
* Role Based Dashboard (owner vs tenant views beyond current dashboard pages)
* Reviews & Ratings
* Notifications
* Chat Between Tenant & Owner
* Admin Dashboard
* Payment Integration
* Email Verification
* Forgot Password
* Authorization on the Express API (currently any request can act as any `tenantId`/`ownerId` — no token verification yet, tracked as a known gap)
* Narrow `next.config.ts` image `remotePatterns` from `hostname: "**"` down to actual image hosts (imgbb, etc.)

---

# Personal Rule

> Whenever I solve a bug that takes more than 15 minutes, I document it here before continuing development. Future me will thank present me.