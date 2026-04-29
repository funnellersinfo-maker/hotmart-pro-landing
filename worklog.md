# Worklog - Hotmart Infoproduct Mentorship Landing Page

## Date: 2026-07-11

## Task
Build a dopamine-style dark mode landing page for Hotmart Infoproduct Mentorship, following a "Dropper" reference design with glassmorphism, gradient accents, and scroll animations.

## Files Modified

### 1. `src/app/globals.css`
- Added custom CSS keyframe animations: `marquee`, `float`, `float-delayed`, `loadingBar`, `reveal`, `spin-slow`, `pulse-glow`, `gradient-shift`, `loading-fade`, `shimmer`
- Added utility classes: `.animate-marquee`, `.animate-float`, `.animate-float-delayed`, `.animate-reveal`, `.animate-spin-slow`, `.animate-pulse-glow`, `.animate-gradient-shift`, `.animate-shimmer`
- Added glass effect classes: `.liquid-glass`, `.liquid-glass-strong`
- Added gradient text classes: `.text-gradient-hotmart`, `.text-gradient-gold`, `.text-gradient-purple`
- Added dopamine button style: `.btn-dopamine` with hover glow effect and shimmer pseudo-element
- Added scroll reveal system: `.scroll-reveal` with `.visible` state transition
- Custom scrollbar styling for dark theme
- Smooth scroll behavior and selection color
- Set base dark theme colors on `:root` for consistent dark-first design

### 2. `src/app/page.tsx`
Complete single-page landing page with 11 sections:

#### Custom Hooks
- `useScrollReveal()` - IntersectionObserver-based scroll animation trigger
- `useLoadingScreen(duration)` - Auto-dismissing loading overlay with fade transition

#### Sections Built
1. **Loading Screen** - Full-screen black overlay with spinning ring, GraduationCap icon, brand name, subtitle, and green gradient loading bar. Auto-dismisses after 2.5s with fade-out transition.

2. **Navigation** - Fixed liquid-glass navbar (rounded-full), responsive with mobile hamburger menu. Logo + "HOTMART PRO" on left, nav links center (desktop), green CTA button right. Smooth scroll anchor links.

3. **Hero Section** - Full viewport height with radial gradient background blurs (green + purple). Floating decorative Lucide icons in glass bubbles (desktop). Badge with pulsing green dot. Multi-line headline with gradient text on final line. Subheadline, green CTA button, avatar social proof row, and infinite marquee strip at bottom.

4. **El Motor Hotmart (Bento Grid)** - 12-column responsive grid with 4 glass cards: Tienda de Infoproductos Pro (col-span-8, tags), Catálogo Digital (col-span-4, gold progress bar), Entrega Automática (col-span-4, badges), Cerebro de IA (col-span-8, AI chat mockup showing a sales conversation).

5. **Stats Section** - Green gradient top border, badge, colored title. 4 stat cards ($300B+, 73%, 0h, 100%) in glass effect with hover scale. 3 feature cards below (Vende Mientras Duermes, Opera Desde Cualquier Parte, Gana en Dólares).

6. **Sistema Automatizado** - Two-column layout: funnel diagram with decreasing width bars (Tráfico → Landing → Checkout → Entrega → Ganancias) and AI Chat Agent mockup with full sales conversation. 4-step flow at bottom with emoji icons.

7. **Pricing Section** - Centered large pricing card with shimmer overlay. Gold gradient badge, strikethrough old price ($700), gradient gold price ($350), 6 features with green checkmarks, urgency banner with orange accent, massive green CTA button.

8. **Testimonials** - 3 glass cards in a row with avatar images, names, revenue results, and testimonial text.

9. **FAQ** - 6 accordion items with useState-based open/close. Glass card buttons with rotate chevron animation. Smooth max-height transition for content reveal.

10. **Final CTA** - Full-width section with green glow background effect. Large headline, urgency text, massive WhatsApp CTA button.

11. **Footer** - Simple dark footer with brand, copyright, and legal links.

## Design System
- **Background**: Pure black (#000000)
- **Primary**: Hotmart green gradient (#1B1464 → #00B94C → #2DCE89)
- **Secondary**: Orange (#FF6B35) for urgency
- **Gold**: (#FFD700) for premium
- **Glass**: rgba(255,255,255,0.05) with backdrop-blur and white border
- **Typography**: Geist font, font-black headings, tracking-tighter

## Technical Details
- Single `page.tsx` file with `'use client'` directive
- All CSS in `globals.css` - no external dependencies needed
- Lucide React icons throughout (no icon library dependencies)
- Responsive: mobile-first with md/lg breakpoints
- Accessible: semantic HTML, aria attributes, keyboard navigable
- ESLint: passes with zero errors
- Dev server: compiles successfully, page renders at 200 status

## Result
Production-ready dark mode dopamine-style landing page with all 11 sections, glassmorphism effects, scroll animations, responsive design, and zero lint errors.
