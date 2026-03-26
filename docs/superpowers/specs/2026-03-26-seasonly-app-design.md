# Seasonly Mobile App — Design Spec
Date: 2026-03-26

## Overview
A React Native (Expo) mobile app for Seasonly Paris — a facial fitness and skincare brand. The app guides users through onboarding, AI skin analysis, and a personalized facial fitness program. It also includes booking in-studio treatments, a rewards system, a product shop, and a user profile.

**Stack:** Expo + Expo Router + TypeScript
**Data:** Hardcoded mock data (no backend for skeleton)
**Target:** iOS and Android

---

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#FAF5F0` | All screen backgrounds |
| Primary | `#C4826A` | Buttons, progress bars, active states |
| Gold | `#C8960C` | Tagline, "Forgot password?", accent text |
| Green | `#4CAF50` | Book stepper completed/active steps |
| Purple | `#7C6FAE` | Rewards icons, skin concern tags |
| Dark text | `#1A1A1A` | Headings |
| Subtle text | `#888888` | Secondary labels, descriptions |
| Card background | `#FFFFFF` | Cards, input fields |

**Typography:** System font (SF Pro on iOS, Roboto on Android)
**Border radius:** 16px cards, 30px buttons, 12px pills

---

## Navigation Architecture

```
App Launch
  └─▶ (auth)
        └─ index.tsx — Login / Sign Up tab toggle

  └─▶ (onboarding)
        ├─ step1.tsx        — Select objectives (multi-select pills)
        ├─ step2.tsx        — Skin type (single-select cards)
        ├─ step3.tsx        — Social proof (before/after image)
        ├─ step4.tsx        — AI analysis intro (camera setup)
        ├─ step4-scan.tsx   — Camera scan in progress (42% circular)
        ├─ step5.tsx        — Results (78% score, "You did it!")
        ├─ program-ready.tsx — Personalized program summary
        └─ welcome-modal.tsx — 500 Skin Miles gift modal

  └─▶ (tabs)
        ├─ index.tsx        — Home
        ├─ book/
        │    ├─ index.tsx   — Studio selection (Step 1)
        │    ├─ service.tsx — Service selection (Step 2)
        │    ├─ people.tsx  — Number of people (Step 3)
        │    ├─ date.tsx    — Calendar + time slots (Step 4)
        │    └─ confirm.tsx — Booking summary (Step 5)
        ├─ rewards.tsx      — Rewards & Challenges
        ├─ shop.tsx         — Shop
        └─ profile.tsx      — Profile
```

---

## Screen Specifications

### Auth
**Login/Signup** (`(auth)/index.tsx`)
- Seasonly Paris logo + "Take your Skin to the Gym" tagline (gold)
- Tab toggle: Login | Sign Up (terracotta active tab)
- Email input with envelope icon
- Password input with lock icon + show/hide toggle
- "Forgot password?" link (gold)
- Login / Sign Up button (full-width terracotta)
- Divider "Or continue with"
- Google + Facebook social login buttons

---

### Onboarding

All onboarding screens share:
- Step counter "Step X of 5" (top left) + percentage (top right, gold)
- Progress bar (terracotta fill on beige track)
- "Continue" / CTA button (full-width, terracotta) at bottom

**Step 1** — Select objectives
- Multi-select pill chips (wrap layout)
- Options: Slim the jawline, Reduce double chin, Lift cheeks, Improve skin firmness, Reduce morning puffiness, Improve skin glow, Facial fat burning, Self-care routine, Build confidence
- Selected pills highlighted in terracotta

**Step 2** — Skin type
- Single-select cards with icon + title + subtitle
- Options: Normal (sparkles icon), Dry (wind icon), Oily (sun icon), Combination (droplet icon)

**Step 3** — Social proof
- Split before/after image with labels
- 5-star rating row
- CTA: "Yes, absolutely!"

**Step 4** — AI analysis intro
- Large circle with camera bracket graphic
- Feature bullets: "Takes only 10 seconds", "Adapted to your skin condition"
- CTA: "Start AI Analysis"

**Step 4 scan** — Camera scanning
- Live camera view with corner bracket overlay
- Circular progress indicator (0–100%)
- Status text: "Analyzing skin zones..."

**Step 5** — Results
- Trophy icon in purple circle
- "You did it!" heading
- Score card: "78% — better than 78% of people your age"
- Improvement message
- "However, we detected the following priorities:" section
- CTA: "See My Program"

**Program Ready**
- Sparkle icon + "Marie, your personalized program is ready!"
- Summary cards (icon + label + value):
  - Your Main Objectives — 1 goals selected
  - Daily Training Time — Under 5 minutes
  - Program Duration — 4 weeks to visible results
  - Personalized Exercises — 12 targeted routines
- CTA: "Start My Program Now"

**Welcome Modal**
- Bottom sheet modal over blurred background
- Gift icon in terracotta circle
- "Welcome to your Personalized Skin Coach!"
- 500 Skin Miles reward card
- CTA: "Claim Your Gift 🎉"

---

### Main Tabs

**Home** (`(tabs)/index.tsx`)
- "Welcome back, Marie" heading + Pro badge
- "Let's take care of your skin today" subtitle
- Streak card: "7 days 🔥 | 1,245 Skin Miles 🏆"
- Daily Wellness Tip card (purple tint bg, "New" badge, earn points)
- "Quick Actions" 2×2 grid: Book Massage, Daily Challenge, Shop, Borrow Device
- Bottom tab bar: Home, Book, Rewards, Shop, Profile

**Book — Step 1: Studio** (`book/index.tsx`)
- "Book Treatment" title
- 5-step stepper header (Studio → Service → People → Date → Confirm)
- Studio cards: image, name, address, phone, email
- Mock data: "Seasonly Paris – Marais", "Seasonly Paris – Saint-Germain"

**Book — Step 2: Service** (`book/service.tsx`)
- Service list cards: name, description, duration (gold), price, chevron
- Mock: Sculpting Facial Massage (30 min, €69), Anti-Aging Treatment (1hr, €138), Lymphatic Drainage (30 min, €69)

**Book — Step 3: People** (`book/people.tsx`)
- Circular display showing selected count with prev/next arrows
- 2×3 grid of person count options (1–6), selected in terracotta
- Continue button

**Book — Step 4: Date** (`book/date.tsx`)
- Month calendar (prev/next navigation)
- Available days selectable (today highlighted in blue border, selected in terracotta)
- Time slots grid (09:00–18:00 in 30-min increments) appears after date selection

**Book — Step 5: Confirm** (`book/confirm.tsx`)
- "Booking Summary" card with all selections
- Studio, Service, People, Date & Time rows with icons
- Price breakdown: Service Price × People = Total (gold)
- Confirm booking button

**Rewards** (`rewards.tsx`)
- "Rewards & Challenges" title
- Stats row: Day Streak 🔥 | Skin Miles 🏆 | Rewards 🎁
- "Today's Progress" card with progress bar (2/4)
- "Self-Massage Routines" section with "See All"
  - Routine cards: icon, name, description, points, completion status
- "Redeem Your Points" section: voucher cards (10% Off Voucher, Free Face Serum)

**Shop** (`shop.tsx`)
- "Shop" title + cart icon
- Search bar
- Category filter pills: All, Serums, Creams, Oils, Tools
- Skin Miles banner (purple gradient): "1,245 Skin Miles — Use Points"
- "Best Sellers" section with 2-column product grid
  - Product card: image, "Best Seller" badge (orange), name, star rating, price (€)
- "All Products" section below

**Profile** (`profile.tsx`)
- Avatar circle (initials) + name + Pro badge
- Email + phone number
- "Edit Profile" button (outlined)
- "Premium Membership" card (tan/gold bg): active date, Manage + Upgrade buttons
- "Skin Analysis" section:
  - "Your Skin Profile" card with diagnostic date
  - Skin Type: tags (e.g., "Combination • Dehydrated")
  - Skin Concerns: pill tags in purple (Fine Lines, Dark Circles, Dullness)

---

## Folder Structure

```
seasonly-app/
├── app/
│   ├── (auth)/
│   │   └── index.tsx
│   ├── (onboarding)/
│   │   ├── step1.tsx
│   │   ├── step2.tsx
│   │   ├── step3.tsx
│   │   ├── step4.tsx
│   │   ├── step4-scan.tsx
│   │   ├── step5.tsx
│   │   ├── program-ready.tsx
│   │   └── welcome-modal.tsx
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── book/
│   │   │   ├── _layout.tsx
│   │   │   ├── index.tsx
│   │   │   ├── service.tsx
│   │   │   ├── people.tsx
│   │   │   ├── date.tsx
│   │   │   └── confirm.tsx
│   │   ├── rewards.tsx
│   │   ├── shop.tsx
│   │   └── profile.tsx
│   └── _layout.tsx
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── ProgressBar.tsx
│   │   └── StepperHeader.tsx
│   ├── onboarding/
│   │   ├── ObjectivePill.tsx
│   │   └── SkinTypeCard.tsx
│   └── book/
│       ├── StudioCard.tsx
│       └── ServiceCard.tsx
├── constants/
│   ├── colors.ts
│   └── mockData.ts
├── assets/
│   └── images/
└── package.json
```

---

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `expo-router` | File-based navigation |
| `@expo/vector-icons` | Ionicons, Feather icons |
| `react-native-safe-area-context` | Safe area insets |
| `expo-camera` | AI scan screen |
| `@react-native-async-storage/async-storage` | Persist onboarding completion |
| `expo-linear-gradient` | Purple gradient in Shop banner |

---

## Data Model (Mock)

All data lives in `constants/mockData.ts`:
- `studios[]` — id, name, address, phone, email, image
- `services[]` — id, name, description, duration, price
- `routines[]` — id, name, description, points, completed
- `products[]` — id, name, category, price, rating, isBestSeller, image
- `user` — name, email, phone, skinType, skinConcerns, streak, skinMiles, membershipTier
