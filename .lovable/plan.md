

# Wedding Invitation Website — Ramya & Raj Kishan K

A premium, mobile-first single-page wedding invitation with lush botanical aesthetics, smooth animations, and interactive features.

## Design System
- **Palette:** Blush pink (#F4A7B4), deep pink (#E06B82), botanical green (#4A7C59), gold (#C9A84C), warm cream (#FFF8F4)
- **Fonts:** Playfair Display (display), Cormorant Garamond (subheadings), DM Sans (body), Dancing Script (handwriting)
- **Aesthetic:** Botanical garden party — pressed flowers, gold shimmer, afternoon tropical light

## Sections to Build

### 1. Envelope Opening Animation
Full-screen gold shimmer envelope with wax seal, confetti particles, and floral stamp. On tap/click: seal cracks → flap opens → invitation card rises out → confetti burst → auto-scroll to hero.

### 2. Hero / Landing Card
Blush gradient card with inline SVG botanical corners (peonies, tiger lilies, mimosa, leaves). Polaroid-style couple photo placeholder, names "RAMYA & KISHAN" in deep pink, date, venue, and tagline. Staggered Framer Motion entrance.

### 3. Countdown Timer
Deep green background with botanical overlay. Live countdown to May 9, 2026 6:00 AM IST in 4-column grid (days/hours/minutes/seconds). Gold accents, subtle pulse animation on tick.

### 4. Events Timeline
8 event cards in a vertical timeline layout — from Wedding Ceremony (6 AM) through After Party (11:30 PM). Alternating left/right on desktop, left-aligned on mobile. Color-coded borders (pink for wedding, green for reception). Scroll-triggered slide-in animations.

### 5. Venue Cards + Map
Two venue cards (Wedding & Reception) with details. Embedded Google Maps iframe below. "Get Directions" CTA button linking to the provided Google Maps link.

### 6. RSVP Form
Dark green section with glass-morphism form inputs. Fields: name, phone, guest count, event checkboxes, dietary preference, message. Supabase integration for data storage. Success confetti animation on submit.

### 7. Thank You / Closing
Cream background with full botanical SVG border frame. Couple names, date, closing tagline, and animated heart. Footer credit.

## Cross-Cutting Features
- **Background Music:** Hidden YouTube embed (Song: "Site Kalyanam"), floating gold pill toggle button (bottom-right), default OFF
- **All floral elements:** Built as inline SVG components — no external image dependencies
- **Framer Motion:** AnimatePresence for envelope, whileInView for scroll sections, useAnimation for countdown
- **Mobile-first:** Max-width 480px centered, full-bleed backgrounds
- **Supabase RSVP:** Using VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY env vars

