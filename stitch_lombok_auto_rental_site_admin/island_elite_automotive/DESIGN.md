---
name: Island Elite Automotive
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#434653'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#737784'
  outline-variant: '#c3c6d5'
  surface-tint: '#1d59c1'
  primary: '#003c90'
  on-primary: '#ffffff'
  primary-container: '#0f52ba'
  on-primary-container: '#bcceff'
  inverse-primary: '#b0c6ff'
  secondary: '#954a00'
  on-secondary: '#ffffff'
  secondary-container: '#fc9342'
  on-secondary-container: '#693200'
  tertiary: '#3d4145'
  on-tertiary: '#ffffff'
  tertiary-container: '#54585d'
  on-tertiary-container: '#cbced3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d9e2ff'
  primary-fixed-dim: '#b0c6ff'
  on-primary-fixed: '#001945'
  on-primary-fixed-variant: '#00419c'
  secondary-fixed: '#ffdcc6'
  secondary-fixed-dim: '#ffb785'
  on-secondary-fixed: '#301400'
  on-secondary-fixed-variant: '#713700'
  tertiary-fixed: '#e0e3e8'
  tertiary-fixed-dim: '#c3c7cc'
  on-tertiary-fixed: '#181c20'
  on-tertiary-fixed-variant: '#43474c'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Manrope
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-sm:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

The design system is engineered to evoke a sense of **Corporate Modern** reliability blended with high-end travel aspirations. It targets premium travelers and business professionals visiting Lombok, Indonesia, who prioritize safety, comfort, and seamless service. 

The aesthetic is clean and structured, utilizing significant whitespace to suggest a premium experience. It avoids the clutter often found in rental marketplaces, opting instead for a "concierge" feel. The visual narrative balances the technical precision of the automotive industry with the inviting nature of high-end tourism. Surfaces are crisp, imagery is expansive, and the overall mood is one of quiet confidence and tropical sophistication.

## Colors

The palette is derived directly from the brand's identity, optimized for digital accessibility and a premium feel.

- **Primary (Lombok Blue):** A deep, trustworthy blue used for navigation, primary actions, and brand reinforcement. It represents the ocean and professional reliability.
- **Secondary (Sunset Orange):** An energetic, high-contrast accent used sparingly for calls-to-action (CTAs), alerts, and highlighting key value propositions. It reflects the vibrant Lombok landscape.
- **Tertiary (Onyx):** A sophisticated dark grey used for headings and high-contrast text. It provides the "heavy" anchor needed for an automotive brand.
- **Neutral:** A range of cool greys and off-whites that ensure the interface remains light, breathable, and modern.

The default mode is **Light**, utilizing white backgrounds to maximize the feeling of cleanliness and space.

## Typography

This design system employs a pairing of **Manrope** for headlines and **Hanken Grotesk** for body and UI elements. 

- **Manrope** provides a modern, geometric, and authoritative voice. High-level headers use extra-bold weights to mimic the strength of automotive engineering.
- **Hanken Grotesk** offers exceptional legibility for technical details (car specs, pricing, terms). 

Large display titles should use tighter letter-spacing for a more "designed" editorial look, while smaller labels use increased tracking to ensure clarity at a glance, especially on mobile devices.

## Layout & Spacing

The design system utilizes a **12-column fixed grid** for desktop and a **4-column fluid grid** for mobile. 

- **Rhythm:** An 8px base unit governs all spatial relationships. 
- **Desktop:** Content is centered within a 1280px container to ensure readability on ultra-wide monitors.
- **Mobile:** Margins are reduced to 16px, and components stack vertically.
- **Visual Breathability:** Vertical section spacing is generous (80px–120px on desktop) to maintain the premium, high-end positioning. Use white space as a functional tool to separate the "Search/Booking" fleet area from "Destinations" and "Testimonials."

## Elevation & Depth

Visual hierarchy is achieved through **Tonal Layering** and **Ambient Shadows**.

- **Surfaces:** The primary background is white (#FFFFFF). Cards and secondary sections use a very light neutral grey (#F8F9FA) to create subtle separation.
- **Shadows:** Use extremely soft, diffused shadows for interactive elements. A 10% opacity Onyx shadow with a 20px blur is preferred for "floating" booking widgets and car cards.
- **Borders:** Subtle 1px borders in a light grey (#E9ECEF) define form inputs and secondary containers, ensuring the design remains flat and modern rather than overly skeuomorphic.

## Shapes

The shape language is **Soft**, striking a balance between the precision of a machine (sharp) and the friendliness of a service (rounded).

- **Standard Radius:** 4px for buttons and small input fields.
- **Large Radius:** 8px for car cards and image containers.
- **Interactive Elements:** Use the soft radius to maintain a professional, structured appearance that feels modern but not overly "bubbly" or "playful."

## Components

- **Buttons:** Primary buttons use the Lombok Blue background with white text. Secondary buttons (view details) use a ghost style with a blue outline. The "Book Now" CTA uses the Sunset Orange for maximum conversion visibility.
- **Car Cards:** High-quality photography is essential. Use a grid layout showing the car image, title, price per day, and key specs (transmission, passengers, fuel) as clean icons.
- **Booking Widget:** A prominent, elevated horizontal bar on desktop (vertical on mobile) containing pick-up/drop-off locations and dates. This should be anchored or highly visible.
- **Chips:** Used for "Available," "Instant Confirmation," or "Premium Class" tags. These use low-saturation versions of the brand colors with dark text.
- **Inputs:** Clean, outlined boxes with clear labels. Focus states should use a 2px Lombok Blue border.
- **Fleet Filter:** A sidebar or top-bar filter system allowing users to sort by "Luxury," "SUV," "Economy," or "Automatic."