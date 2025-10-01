# ASSET PLACEHOLDERS & SPECIFICATIONS

This document specifies all image, video, and media assets needed for the Hostara website. Use this as a guide for creating or sourcing the required assets.

---

## 1. LOGO ASSETS

### Primary Logo (Full Color)
- **Location**: `/assets/images/logo/`
- **Filename**: `hostara-logo.svg` (vector), `hostara-logo.png` (raster backup)
- **Current Status**: ✅ Existing - "Generated Image August 29, 2025 - 8_56PM.jpeg" and "Generated Image October 01, 2025 - 11_10AM.png"
- **Specifications**:
  - Format: SVG (preferred) + PNG (2x retina, 3x retina)
  - SVG: Scalable, optimize with SVGO
  - PNG: 512x512px @2x (1024x1024px), 768x768px @3x (1536x1536px)
  - Colors: Cyan (#00D4FF), Purple (#6366F1), Navy (#2D1B69)
  - Background: Transparent
  - Usage: Navbar, footer, hero section

### Logo Variations Needed
1. **White Logo** (`hostara-logo-white.svg`)
   - For dark backgrounds
   - All elements in white (#FFFFFF)
   
2. **Icon Only** (`hostara-icon.svg`, `hostara-icon.png`)
   - Just the "H" symbol without text
   - 128x128px, 256x256px, 512x512px
   - For favicons and app icons
   
3. **Favicon Set**
   - `favicon.ico` (16x16, 32x32, 48x48 multi-resolution)
   - `favicon-16x16.png`
   - `favicon-32x32.png`
   - `apple-touch-icon.png` (180x180px)
   - `android-chrome-192x192.png`
   - `android-chrome-512x512.png`

---

## 2. HERO SECTION ASSETS

### Hero Background Image
- **Location**: `/assets/images/hero/`
- **Filename**: `hero-background.webp`, `hero-background.jpg` (fallback)
- **Current Status**: ⚠️ NEEDS CREATION
- **Specifications**:
  - Dimensions: 1920x1080px (16:9 aspect ratio)
  - Format: WebP (primary), JPG (fallback)
  - File size: <200KB (WebP), <300KB (JPG)
  - Content: Modern Nairobi street scene or abstract tech pattern
  - Style: Vibrant but not distracting, gradient overlay-friendly
  - Color palette: Should complement cyan/purple brand colors
  - Mobile version: 768x1024px (portrait)

### Hero Phone Mockup
- **Location**: `/assets/images/hero/`
- **Filename**: `app-mockup-phone.png`, `app-mockup-phone.webp`
- **Current Status**: ⚠️ NEEDS CREATION
- **Specifications**:
  - Dimensions: 800x1600px (mobile screen proportion)
  - Format: PNG with transparency + WebP
  - File size: <150KB
  - Content: Hostara mobile app interface showing:
    - Service discovery screen OR business dashboard
    - Clean UI with cyan/purple accent colors
    - Realistic Kenya context (KES currency, +254 numbers)
  - Device: Modern smartphone frame (iPhone or generic)
  - Angle: Straight-on or slight 3D tilt for depth

### Hero Decorative Elements
- **Location**: `/assets/images/hero/`
- **Filenames**: `hero-gradient-orb-1.svg`, `hero-gradient-orb-2.svg`
- **Current Status**: ⚠️ NEEDS CREATION
- **Specifications**:
  - Format: SVG with gradients
  - Size: Scalable, ~500x500px reference
  - Content: Abstract circular gradient blobs
  - Colors: Cyan to purple gradients
  - Opacity: 30-50% for background decoration

---

## 3. SERVICE CATEGORY ICONS

### Icon Set (8 categories)
- **Location**: `/assets/images/services/`
- **Filenames**: `service-[name].svg`
- **Current Status**: ⚠️ NEEDS CREATION
- **Categories**:
  1. `service-cleaning.svg` - Cleaning Services
  2. `service-plumbing.svg` - Plumbing & Repairs
  3. `service-beauty.svg` - Beauty & Wellness
  4. `service-tutoring.svg` - Tutoring & Education
  5. `service-events.svg` - Event Services
  6. `service-tech.svg` - Tech Support
  7. `service-delivery.svg` - Delivery & Logistics
  8. `service-professional.svg` - Professional Services

**Specifications for All Icons**:
- Format: SVG (optimized)
- Dimensions: 128x128px (scalable)
- Style: Line icons with 2px stroke
- Colors: Single color (will be styled with CSS)
  - Default: `currentColor` or navy (#2D1B69)
  - Hover: Cyan (#00D4FF)
- Padding: 16px internal padding for consistency
- Background: Transparent
- Export: Optimize with SVGO, remove unnecessary metadata

---

## 4. BUSINESS TIER ICONS

### Tier Badge Icons
- **Location**: `/assets/images/icons/`
- **Filenames**: `tier-[name].svg`
- **Current Status**: ⚠️ NEEDS CREATION
- **Tiers**:
  1. `tier-student.svg` - Graduation cap or book icon
  2. `tier-starter.svg` - Rocket or spark icon
  3. `tier-growth.svg` - Upward arrow or graph icon
  4. `tier-enterprise.svg` - Building or crown icon

**Specifications**:
- Format: SVG
- Dimensions: 64x64px
- Style: Filled icons with gradient
- Colors: Gradient from cyan to purple
- Usage: Displayed on pricing tier cards

---

## 5. TEAM/ABOUT IMAGES

### Placeholder Team Photos
- **Location**: `/assets/images/team/`
- **Filenames**: `team-member-[1-6].jpg`
- **Current Status**: ⚠️ NEEDS CREATION
- **Specifications**:
  - Dimensions: 400x400px (square)
  - Format: JPG (WebP version recommended)
  - File size: <80KB each
  - Content: Professional headshots or placeholder avatars
  - Style: Consistent lighting and background
  - Diversity: Represent Kenya's diverse workforce
  - Compression: Optimize for web

### Kenya Map Graphic
- **Location**: `/assets/images/icons/`
- **Filename**: `kenya-map.svg`
- **Current Status**: ⚠️ NEEDS CREATION
- **Specifications**:
  - Format: SVG
  - Dimensions: 600x800px (Kenya's approximate shape)
  - Style: Simplified outline, single color
  - Color: Navy (#2D1B69) or gradient
  - Marker: Nairobi location pin
  - Usage: About page showing service area

---

## 6. FEATURE/BENEFIT ICONS

### Icon Set (6-8 icons)
- **Location**: `/assets/images/icons/`
- **Filenames**: `icon-[name].svg`
- **Current Status**: ⚠️ NEEDS CREATION
- **Icons Needed**:
  1. `icon-verified.svg` - Checkmark/shield (Verified businesses)
  2. `icon-secure.svg` - Lock/padlock (Secure payments)
  3. `icon-fast.svg` - Lightning bolt (Fast matching)
  4. `icon-support.svg` - Headset/chat (24/7 support)
  5. `icon-rating.svg` - Star (5-star ratings)
  6. `icon-mobile.svg` - Smartphone (Mobile-first)
  7. `icon-mpesa.svg` - M (M-Pesa integration)
  8. `icon-growth.svg` - Graph/chart (Business growth)

**Specifications**:
- Format: SVG
- Dimensions: 96x96px
- Style: Outline icons with 2px stroke
- Colors: Use `currentColor` for CSS control
- Background: Transparent
- Usage: Feature cards, benefits section

---

## 7. M-PESA LOGO

### Official M-Pesa Brand Asset
- **Location**: `/assets/images/partners/`
- **Filename**: `mpesa-logo.svg`, `mpesa-logo.png`
- **Current Status**: ⚠️ NEEDS SOURCING
- **Source**: [Safaricom Brand Center](https://www.safaricom.co.ke/about/brand-guidelines) (official)
- **Specifications**:
  - Format: As provided by Safaricom
  - Dimensions: Maintain aspect ratio
  - Colors: Use official M-Pesa green (#00A651)
  - Usage: Payment methods section, footer
  - **IMPORTANT**: Follow Safaricom brand guidelines strictly
  - **Legal**: Ensure proper usage rights before launch

---

## 8. APP STORE BADGES

### Download Badges
- **Location**: `/assets/images/badges/`
- **Filenames**: `google-play-badge.svg`, `app-store-badge.svg`
- **Current Status**: ⚠️ NEEDS SOURCING
- **Sources**:
  - Google Play: [Official Assets](https://play.google.com/intl/en_us/badges/)
  - Apple App Store: [Official Guidelines](https://developer.apple.com/app-store/marketing/guidelines/)
- **Specifications**:
  - Format: SVG (preferred) or PNG @2x
  - Dimensions: As per official guidelines
  - Languages: English (primary)
  - Usage: Hero section, services page, footer
  - **IMPORTANT**: Use official badges only, no custom versions

---

## 9. TESTIMONIAL AVATARS

### Customer Placeholder Avatars
- **Location**: `/assets/images/testimonials/`
- **Filenames**: `avatar-[1-8].jpg`
- **Current Status**: ⚠️ NEEDS CREATION
- **Specifications**:
  - Dimensions: 80x80px (circular crop)
  - Format: JPG (WebP recommended)
  - File size: <15KB each
  - Content: Diverse Kenya professionals/customers
  - Style: Friendly, professional headshots
  - Alternative: Use abstract avatars if real photos unavailable
  - Compression: Highly optimized for mobile

---

## 10. BACKGROUND PATTERNS

### Decorative SVG Patterns
- **Location**: `/assets/images/patterns/`
- **Filenames**: Various
- **Current Status**: ⚠️ NEEDS CREATION

**Patterns Needed**:
1. **Dot Grid Pattern** (`pattern-dots.svg`)
   - Small dots in 20px grid
   - Color: Navy 10% opacity
   - Usage: Background texture

2. **Wave Pattern** (`pattern-waves.svg`)
   - Subtle wave curves
   - Color: Cyan 5% opacity
   - Usage: Section dividers

3. **Circuit Pattern** (`pattern-circuit.svg`)
   - Tech-inspired lines/nodes
   - Color: Purple 10% opacity
   - Usage: Tech-focused sections

**Specifications**:
- Format: SVG
- Tiling: Seamless repeating patterns
- Colors: Low opacity (5-15%)
- File size: <10KB each
- Usage: `background-image: url(...)` in CSS

---

## 11. VIDEO ASSETS (OPTIONAL)

### Hero Background Video
- **Location**: `/assets/videos/`
- **Filename**: `hero-background.mp4`, `hero-background.webm`
- **Current Status**: ⚠️ OPTIONAL - Consider for future enhancement
- **Specifications**:
  - Duration: 10-15 seconds (looping)
  - Resolution: 1920x1080px (Full HD)
  - Formats: MP4 (H.264), WebM (VP9)
  - File size: <2MB (heavily compressed)
  - Content: Subtle motion (Nairobi cityscape, abstract shapes)
  - Frame rate: 24fps or 30fps
  - No audio
  - **Note**: Implement with caution - may impact mobile performance

---

## 12. SOCIAL MEDIA IMAGES

### Open Graph & Social Sharing
- **Location**: `/assets/images/social/`
- **Filenames**: Various
- **Current Status**: ⚠️ NEEDS CREATION

**Images Needed**:
1. **OG Default** (`og-default.jpg`)
   - Dimensions: 1200x630px
   - Content: Hostara logo + tagline + gradient background
   - Usage: Default social share image

2. **Twitter Card** (`twitter-card.jpg`)
   - Dimensions: 1200x600px
   - Content: Similar to OG but optimized for Twitter

3. **LinkedIn Share** (`linkedin-share.jpg`)
   - Dimensions: 1200x627px
   - Content: Professional-focused messaging

**Specifications**:
- Format: JPG (optimized)
- File size: <300KB each
- Colors: Brand colors (cyan/purple/navy)
- Text: Large, readable typography
- Logo: Prominently displayed

---

## 13. MISCELLANEOUS ICONS

### Utility Icons
- **Location**: `/assets/images/icons/`
- **Current Status**: ⚠️ NEEDS CREATION

**Icons Needed**:
- `icon-menu.svg` - Hamburger menu (mobile)
- `icon-close.svg` - Close X icon
- `icon-arrow-right.svg` - Right arrow
- `icon-arrow-down.svg` - Down arrow
- `icon-check.svg` - Checkmark
- `icon-star.svg` - Star (for ratings)
- `icon-phone.svg` - Phone
- `icon-email.svg` - Email
- `icon-location.svg` - Map pin
- `icon-calendar.svg` - Calendar
- `icon-search.svg` - Magnifying glass

**Specifications**:
- Format: SVG
- Dimensions: 24x24px (scalable)
- Style: 2px stroke, outline style
- Colors: `currentColor` for CSS control
- Consistent style across all icons

---

## ASSET CREATION PRIORITY

### 🔴 HIGH PRIORITY (Needed immediately)
1. Logo variations (SVG + PNG)
2. Favicon set
3. Hero background image
4. Service category icons (8)
5. M-Pesa logo (source from official)

### 🟡 MEDIUM PRIORITY (Needed for Phase 2-3)
6. Hero phone mockup
7. Business tier icons (4)
8. Feature/benefit icons (8)
9. App store badges (source official)
10. Social media OG images

### 🟢 LOW PRIORITY (Can use placeholders initially)
11. Team photos (can use avatar placeholders)
12. Testimonial avatars
13. Background patterns
14. Kenya map graphic
15. Hero video (optional enhancement)

---

## ASSET OPTIMIZATION CHECKLIST

Before adding any asset to the website:

- [ ] **Images**: Compressed with TinyPNG, Squoosh, or ImageOptim
- [ ] **SVGs**: Optimized with SVGO, remove unnecessary metadata
- [ ] **WebP**: Create WebP versions for all JPG/PNG images
- [ ] **Responsive**: Create @2x and @3x versions for retina displays
- [ ] **Alt text**: Document required alt text for each image
- [ ] **Lazy loading**: All images below-the-fold should use `loading="lazy"`
- [ ] **Dimensions**: Specify width/height in HTML to prevent layout shift
- [ ] **File size**: Verify total page weight stays under 500KB
- [ ] **Accessibility**: Ensure decorative images have `alt=""` or `aria-hidden="true"`

---

## PLACEHOLDER STRATEGY

Until real assets are created, use:

1. **Logo**: Convert existing PNG to SVG, optimize
2. **Photos**: Use [Unsplash](https://unsplash.com) Kenya-themed stock photos
3. **Icons**: Use [Heroicons](https://heroicons.com) or [Phosphor Icons](https://phosphoricons.com)
4. **Avatars**: Use [UI Avatars](https://ui-avatars.com) or [DiceBear](https://dicebear.com)
5. **Patterns**: CSS gradients as temporary backgrounds

---

## ASSET SOURCES & TOOLS

### Free Icon Libraries
- [Heroicons](https://heroicons.com) - MIT license
- [Phosphor Icons](https://phosphoricons.com) - MIT license
- [Lucide Icons](https://lucide.dev) - ISC license

### Stock Photos (Kenya-themed)
- [Unsplash](https://unsplash.com) - Free to use
- [Pexels](https://pexels.com) - Free to use
- Search terms: "nairobi", "kenya business", "african entrepreneur"

### Optimization Tools
- [TinyPNG](https://tinypng.com) - Image compression
- [Squoosh](https://squoosh.app) - Advanced image optimization
- [SVGO](https://github.com/svg/svgo) - SVG optimization
- [Cloudinary](https://cloudinary.com) - Image CDN (for future)

### Design Tools
- [Figma](https://figma.com) - UI design (free tier)
- [Canva](https://canva.com) - Social media images
- [Remove.bg](https://remove.bg) - Background removal

---

## NOTES FOR DESIGNER

- **Brand Colors**: Cyan (#00D4FF), Purple (#6366F1), Navy (#2D1B69), Green (#10B981 for M-Pesa)
- **Typography**: Inter font family (already loaded via Google Fonts)
- **Style**: Modern, clean, tech-forward, Kenya-relevant
- **Cultural Considerations**: Ensure images represent Kenya's diversity, use local context (KES currency, +254 numbers, M-Pesa prominence)
- **Mobile-First**: All assets must work on mobile screens (320px-480px width)
- **Accessibility**: High contrast, clear imagery, alt text for all meaningful images

---

**Last Updated**: October 1, 2025  
**Status**: Asset specifications complete, awaiting creation  
**Next Steps**: Begin with HIGH PRIORITY assets, source official brand assets (M-Pesa, app store badges)
