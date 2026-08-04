# 🏠 RoomFinder

A room and apartment rental marketplace connecting tenants directly with room owners — no brokers, verified listings, and a straightforward booking flow.

This is the **frontend** repository. Built with Next.js 16 (App Router), TypeScript, and Tailwind CSS. It talks to a separate Express + MongoDB backend ([`Roomfinder-server`](#)) over a REST API secured with JWTs ..
---

## ✨ Features

**For tenants**
- Search & filter rooms by city, bedrooms, and rent
- Save/wishlist rooms
- Request to book a room (with a contact-info modal, not an instant one-click request)
- Track booking status (pending / approved / rejected / cancelled)
- Leave a star rating + review after an approved booking
- Profile management (name, avatar, password)
- In-app notifications (bell icon with unread count)

**For owners**
- Post a new listing (photos via drag-and-drop upload to imgbb)
- Edit/delete listings, toggle availability
- Every new/edited listing requires admin approval before going public
- Approve or reject incoming booking requests
- Dashboard with live stats

**For admins**
- Review and approve/reject pending listings
- Manage all users (change role, ban/unban)
- View all listings and bookings across the platform, with filters
- Analytics dashboard (recharts: users by role, listings by status, bookings by status)

**Platform-wide**
- Email/password + Google OAuth (better-auth)
- Email verification required before sign-in
- JWT-based authorization between frontend and backend (no shared secrets)
- Route protection at the edge (`proxy.ts`) + real session checks per dashboard layout
- Public marketing pages: Home, Properties, About, Find Room

---

## 🧰 Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS (v4, CSS-import setup) |
| Auth | better-auth (email/password, Google OAuth, `admin` plugin, `jwt` plugin) |
| Database (auth) | MongoDB, via better-auth's MongoDB adapter |
| UI components | HeroUI **v3** (modals), Gravity UI Icons, Lucide React |
| Animation | Framer Motion |
| Charts | Recharts |
| Image hosting | imgbb (direct browser upload) |
| Email | Nodemailer + SMTP |

> **Note on HeroUI:** this project is on HeroUI **v3** (CSS-import setup, no `HeroUIProvider`, no `tailwind.config.ts`). Modal usage follows the compound-component pattern: `Modal` → `Modal.Trigger` / `Modal.Backdrop` → `Modal.Container` → `Modal.Dialog` → `Modal.Header` / `Modal.Body`. Do not mix in v2 syntax (`ModalContent`, `useDisclosure`, etc.) — see `docs/dev-notes.md` for the version-mismatch issues this caused during development.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/                # sign-in, sign-up, verify-email, resend-verification
│   ├── properties/            # public: browse by category/city
│   ├── about/                 # public: mission, how-it-works
│   ├── find-room/
│   │   ├── page.tsx           # search & filter grid
│   │   └── [id]/page.tsx      # listing details (login-gated)
│   ├── dashboard/
│   │   ├── owner/              # sidebar layout + listings, bookings, profile
│   │   ├── admin/               # sidebar layout + users, listings, analytics, settings
│   │   └── tenant/              # sidebar layout + saved rooms, bookings, profile
│   ├── api/
│   │   └── auth/[...all]/route.ts   # better-auth handler
│   ├── forbidden/page.tsx
│   ├── not-found.tsx
│   ├── layout.tsx
│   └── proxy.ts                # edge-level auth gate (Next.js 16+ replaces middleware.ts)
├── components/
│   ├── room/                  # RoomCard, RoomGallery, RoomDetails, BookRoomButton, etc.
│   ├── dashboard/              # sidebar, stat cards, status badges, charts
│   ├── notifications/          # NotificationBell
│   ├── marketing/              # public nav components
│   └── ui/                    # shadcn-style primitives (floating-navbar, tubelight-navbar)
├── lib/
│   ├── auth.ts                 # better-auth server config
│   ├── auth-client.ts           # better-auth client
│   ├── core/session.ts          # getUserSession() / getUserToken(), request-deduped
│   ├── fetch.ts                 # serverFetch / serverMutation (attaches JWT)
│   ├── client-fetch.ts          # client-component-safe fetch (no redirect())
│   ├── mailer.ts                 # Nodemailer verification emails
│   ├── api/                     # all GET functions, one file per resource
│   └── actions/                 # all mutations, "use server"
├── types/                     # Listing, Booking, Review, Notification, User, Role
└── config/
    └── dashboard-nav.ts        # per-role sidebar nav, dashboard/profile path maps
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- A MongoDB connection string (shared with, or separate from, the backend's database)
- Google OAuth credentials
- SMTP credentials (Gmail app password, or any SMTP provider)
- An imgbb API key ([api.imgbb.com](https://api.imgbb.com))
- The `Roomfinder-server` backend running and reachable

### Install
```bash
npm install
```

### Environment variables
Create `.env.local`:
```bash
# MongoDB (better-auth's user/session database)
MONGODB_URI=
AUTH_DB_NAME=roomfinder

# Better Auth
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Backend API
NEXT_PUBLIC_BASE_URL=http://localhost:5000

# Image upload
NEXT_PUBLIC_IMGBB_API_KEY=

# SMTP (email verification)
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM="RoomFinder <no-reply@roomfinder.com>"
```

### Run
```bash
npm run dev
```
App runs at `http://localhost:3000`.

### Build
```bash
npm run build
npm start
```

---

## 🔐 Auth Notes

- Custom user field is `userRole` (**not** `role`) — the better-auth `admin` plugin reserves `role`/`banned`/`banReason`/`banExpires` for its own access control, so a custom field with that exact name will always be rejected.
- Signup call passes `userRole` **flat**, alongside `email`/`password`/`name` — never nested inside an `additionalFields` object.
- Email verification is required before sign-in (`requireEmailVerification: true`). Google OAuth sign-ups skip this since Google already verifies emails.
- JWTs are short-lived (15 min) and verified by the backend against better-auth's public JWKS endpoint (`/api/auth/jwks`) — no shared secret between the two repos.

---

## 🧭 Route Protection

| Layer | Scope | Trust level |
|---|---|---|
| `proxy.ts` | `/dashboard/*`, `/find-room/:id`, auth pages | UX-only — cookie presence, not full validation |
| Dashboard layouts (`getUserSession()`) | Per-role sections | Real, authoritative check |
| Express `requireAuth`/`requireRole` | Every write endpoint | Real, JWT-verified |

---

## 📄 Known Limitations

- `banned` flag on users is a data field only — not yet wired into actual sign-in blocking (better-auth's `admin` plugin may cover this natively, worth checking before building custom logic)
- No pagination on listings/bookings/users lists yet
- `next.config.ts` image `remotePatterns` currently allows any hostname (`**`) — should be narrowed to imgbb's domain before wider launch
- No admin signup path — the first admin account must have its `userRole` set manually in MongoDB

---

## 📚 Related Docs
- `docs/dev-notes.md` — full build log: issues hit, root causes, fixes, and lessons learned
- `docs/postman-api-guide.md` — Postman collection guide for the backend REST API
- `docs/postman-jwt-guide.md` — step-by-step JWT auth flow testing in Postman
