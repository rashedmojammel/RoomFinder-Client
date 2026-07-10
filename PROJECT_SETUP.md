# 🚀 RoomFinder Development Notes

> This document contains project setup steps, issues faced, solutions, and important notes during the development of the RoomFinder project. It serves as a personal knowledge base to avoid repeating the same mistakes in future projects.

---

# Project Information

**Project:** RoomFinder

## Tech Stack

* Next.js 16 (App Router)
* TypeScript
* Tailwind CSS
* Better Auth
* MongoDB
* Framer Motion
* Lucide React
* Gravity UI Icons

---

# Initial Project Setup

## Installed Packages

```bash
npm install better-auth
npm install mongodb
npm install framer-motion
npm install lucide-react
npm install @gravity-ui/icons
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

# Environment Variables

```
MONGODB_URI=

BETTER_AUTH_SECRET=

BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

Always restart the development server after changing `.env.local`.

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

# Debugging Checklist

Whenever something doesn't work

✔ Read terminal error

✔ Read browser console

✔ Check Network tab

✔ Check MongoDB

✔ Check auth.ts

✔ Check .env.local

✔ Restart development server

✔ Delete old test users if testing authentication

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

---

# Lessons Learned

* Always read the terminal error before debugging.
* Keep custom fields inside `additionalFields`.
* Restart Next.js after changing `.env.local`.
* Test authentication with a new user after changing the schema.
* Use fallback values for dynamic routes.
* Build UI first, then connect backend logic.

---

# Future Features

* Protected Routes
* Role Based Dashboard
* Room Posting
* Room Details
* Search & Filter
* Wishlist
* Booking System
* Reviews & Ratings
* Notifications
* Chat Between Tenant & Owner
* Admin Dashboard
* Payment Integration
* Email Verification
* Forgot Password
* Profile Management

---

# Personal Rule

> Whenever I solve a bug that takes more than 15 minutes, I document it here before continuing development. Future me will thank present me.
