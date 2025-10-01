# 🎨 HOSTARA WEBSITE - FINAL DESIGN SPECIFICATION

**Version:** 1.0  
**Date:** October 1, 2025  
**Status:** Approved for Implementation  
**Based on:** WEBSITE_CONTEXT.md + DESIGN_RESEARCH.md  

---

## 📋 **DESIGN SPECIFICATION OVERVIEW**

This document defines the complete design system for the Hostara website, including:
- Finalized color palette and usage guidelines
- Typography system with all sizes and weights
- Component library with exact specifications
- Page-by-page layout designs
- Animation and interaction specifications
- Responsive breakpoints and mobile adaptations
- Asset requirements and specifications

---

## 🎨 **1. COLOR SYSTEM (FINAL)**

### **Primary Brand Colors**

```css
:root {
  /* Primary - Cyan (Trust, Technology, Action) */
  --cyan-50: #E6FAFF;           /* Lightest tint */
  --cyan-100: #B3F2FF;          /* Very light */
  --cyan-200: #80EBFF;          /* Light */
  --cyan-300: #4DE3FF;          /* Light-medium */
  --cyan-400: #1ADCFF;          /* Medium */
  --cyan-500: #00D4FF;          /* PRIMARY - Main brand color */
  --cyan-600: #00A8CC;          /* Dark */
  --cyan-700: #007A99;          /* Darker */
  --cyan-800: #004D66;          /* Very dark */
  --cyan-900: #002633;          /* Darkest */
  
  /* Secondary - Purple (Premium, Innovation, Growth) */
  --purple-50: #F5F3FF;         /* Lightest tint */
  --purple-100: #EDE9FE;        /* Very light */
  --purple-200: #DDD6FE;        /* Light */
  --purple-300: #C4B5FD;        /* Light-medium */
  --purple-400: #A78BFA;        /* Medium */
  --purple-500: #8B5CF6;        /* SECONDARY - Secondary brand */
  --purple-600: #7C3AED;        /* Dark */
  --purple-700: #6366F1;        /* Darker - matches logo */
  --purple-800: #4F46E5;        /* Very dark */
  --purple-900: #4338CA;        /* Darkest */
  
  /* Navy - Deep (Headings, Authority) */
  --navy-50: #F5F0FF;           /* Lightest tint */
  --navy-100: #E6DBFF;          /* Very light */
  --navy-200: #CCBBFF;          /* Light */
  --navy-300: #9977FF;          /* Light-medium */
  --navy-400: #6644DD;          /* Medium */
  --navy-500: #2D1B69;          /* PRIMARY - Logo text color */
  --navy-600: #251657;          /* Dark */
  --navy-700: #1D1145;          /* Darker */
  --navy-800: #150C33;          /* Very dark */
  --navy-900: #0D0721;          /* Darkest */
  
  /* Semantic Colors */
  --success-50: #ECFDF5;        /* Success background */
  --success-100: #D1FAE5;       /* Success light */
  --success-500: #10B981;       /* SUCCESS - M-Pesa green */
  --success-700: #047857;       /* Success dark */
  
  --warning-50: #FFFBEB;        /* Warning background */
  --warning-100: #FEF3C7;       /* Warning light */
  --warning-500: #F59E0B;       /* WARNING - Orange */
  --warning-700: #B45309;       /* Warning dark */
  
  --error-50: #FEF2F2;          /* Error background */
  --error-100: #FEE2E2;         /* Error light */
  --error-500: #EF4444;         /* ERROR - Red */
  --error-700: #B91C1C;         /* Error dark */
  
  --info-50: #EFF6FF;           /* Info background */
  --info-100: #DBEAFE;          /* Info light */
  --info-500: #3B82F6;          /* INFO - Blue */
  --info-700: #1D4ED8;          /* Info dark */
  
  /* Neutral Colors */
  --white: #FFFFFF;
  --gray-50: #F9FAFB;           /* Off-white background */
  --gray-100: #F3F4F6;          /* Light background */
  --gray-200: #E5E7EB;          /* Border color */
  --gray-300: #D1D5DB;          /* Divider */
  --gray-400: #9CA3AF;          /* Disabled text */
  --gray-500: #6B7280;          /* Secondary text */
  --gray-600: #4B5563;          /* Tertiary text */
  --gray-700: #374151;          /* Dark text */
  --gray-800: #1F2937;          /* Primary text */
  --gray-900: #111827;          /* Darkest text */
  --black: #000000;
  
  /* Gradients */
  --gradient-hero: linear-gradient(135deg, 
    rgba(99, 102, 241, 0.9) 0%, 
    rgba(0, 212, 255, 0.9) 100%);
  
  --gradient-soft: linear-gradient(135deg, 
    #F5E6FF 0%, 
    #E6F0FF 100%);
  
  --gradient-card: linear-gradient(145deg, 
    rgba(99, 102, 241, 0.03) 0%, 
    rgba(0, 212, 255, 0.03) 100%);
  
  --gradient-button-hover: linear-gradient(135deg, 
    var(--cyan-600) 0%, 
    var(--cyan-500) 100%);
  
  /* Shadows */
  --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  
  --shadow-cyan: 0 10px 30px -5px rgba(0, 212, 255, 0.3);
  --shadow-purple: 0 10px 30px -5px rgba(99, 102, 241, 0.3);
}
```

### **Color Usage Guidelines**

**Cyan (#00D4FF) - Use for:**
- Primary CTA buttons ("Join as a Business", "Get Started")
- Active navigation states
- Links and interactive elements
- Icons representing actions
- Loading indicators
- Focus states
- Primary badges

**Purple (#8B5CF6, #6366F1) - Use for:**
- Secondary CTA buttons ("Find Services", "Learn More")
- Section accents and highlights
- Premium tier badges
- Hover states on interactive elements
- Background tints (very light)
- Decorative elements
- Secondary badges

**Navy (#2D1B69) - Use for:**
- All heading text (H1-H6)
- Logo text
- Footer content on light backgrounds
- Important callouts
- Card titles
- Navigation links (non-active)

**Green (#10B981) - Use for:**
- M-Pesa payment indicators
- Success messages and confirmations
- Growth statistics and metrics
- Positive trends
- Checkmarks and completion states
- Student Tier highlighting

**Neutral Gray - Use for:**
- Body text: --gray-800
- Secondary text: --gray-500
- Borders: --gray-200
- Backgrounds: --gray-50
- Disabled states: --gray-400

---

## 📝 **2. TYPOGRAPHY SYSTEM (FINAL)**

### **Font Stack**

```css
/* Primary Font: Inter (All purposes) */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  --font-mono: 'SF Mono', 'Monaco', 'Inconsolata', 'Courier New', monospace;
}

body {
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### **Type Scale**

```css
:root {
  /* Font sizes (fluid/responsive) */
  --text-xs: clamp(0.75rem, 0.7rem + 0.2vw, 0.875rem);      /* 12-14px */
  --text-sm: clamp(0.875rem, 0.8rem + 0.3vw, 1rem);         /* 14-16px */
  --text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);     /* 16-18px */
  --text-lg: clamp(1.125rem, 1rem + 0.5vw, 1.25rem);        /* 18-20px */
  --text-xl: clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem);        /* 20-24px */
  --text-2xl: clamp(1.5rem, 1.3rem + 0.8vw, 1.875rem);      /* 24-30px */
  --text-3xl: clamp(1.875rem, 1.6rem + 1.2vw, 2.25rem);     /* 30-36px */
  --text-4xl: clamp(2.25rem, 1.9rem + 1.5vw, 3rem);         /* 36-48px */
  --text-5xl: clamp(3rem, 2.5rem + 2vw, 3.75rem);           /* 48-60px */
  --text-6xl: clamp(3.75rem, 3rem + 3vw, 4.5rem);           /* 60-72px */
  
  /* Font weights */
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;
  
  /* Line heights */
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;
  
  /* Letter spacing */
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;
}
```

### **Typography Styles**

```css
/* Headings */
h1, .h1 {
  font-size: var(--text-6xl);
  font-weight: var(--font-extrabold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--navy-500);
  margin-bottom: 1.5rem;
}

h2, .h2 {
  font-size: var(--text-5xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--navy-500);
  margin-bottom: 1.25rem;
}

h3, .h3 {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-normal);
  color: var(--gray-800);
  margin-bottom: 1rem;
}

h4, .h4 {
  font-size: var(--text-3xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-snug);
  color: var(--gray-800);
  margin-bottom: 0.875rem;
}

h5, .h5 {
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-normal);
  color: var(--gray-700);
  margin-bottom: 0.75rem;
}

h6, .h6 {
  font-size: var(--text-xl);
  font-weight: var(--font-medium);
  line-height: var(--leading-normal);
  color: var(--gray-700);
  margin-bottom: 0.625rem;
}

/* Body text */
body {
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: var(--leading-relaxed);
  color: var(--gray-800);
}

p {
  margin-bottom: 1.5rem;
  max-width: 65ch; /* Optimal line length for readability */
}

.lead {
  font-size: var(--text-xl);
  font-weight: var(--font-normal);
  line-height: var(--leading-relaxed);
  color: var(--gray-600);
}

.small, small {
  font-size: var(--text-sm);
  color: var(--gray-500);
}

/* Links */
a {
  color: var(--cyan-600);
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: var(--cyan-700);
  text-decoration: underline;
}

/* Lists */
ul, ol {
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}

li {
  margin-bottom: 0.5rem;
  line-height: var(--leading-relaxed);
}

/* Blockquote */
blockquote {
  border-left: 4px solid var(--cyan-500);
  padding-left: 1.5rem;
  margin: 2rem 0;
  font-style: italic;
  color: var(--gray-600);
}
```

---

## 🧩 **3. COMPONENT LIBRARY (COMPLETE)**

### **3.1 Buttons**

```css
/* Base button styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  line-height: 1;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: 0.75rem; /* 12px */
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  user-select: none;
  min-height: 3rem; /* 48px - touch-friendly */
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Primary button - Cyan */
.btn-primary {
  background: var(--cyan-500);
  color: var(--white);
  box-shadow: var(--shadow-cyan);
}

.btn-primary:hover {
  background: var(--cyan-600);
  box-shadow: 0 12px 35px -8px rgba(0, 212, 255, 0.4);
  transform: translateY(-2px);
}

.btn-primary:active {
  background: var(--cyan-700);
  transform: translateY(0);
}

/* Secondary button - Purple */
.btn-secondary {
  background: var(--purple-600);
  color: var(--white);
  box-shadow: var(--shadow-purple);
}

.btn-secondary:hover {
  background: var(--purple-700);
  box-shadow: 0 12px 35px -8px rgba(99, 102, 241, 0.4);
  transform: translateY(-2px);
}

.btn-secondary:active {
  background: var(--purple-800);
  transform: translateY(0);
}

/* Outline button */
.btn-outline {
  background: transparent;
  color: var(--cyan-600);
  border: 2px solid var(--cyan-500);
  box-shadow: none;
}

.btn-outline:hover {
  background: var(--cyan-500);
  color: var(--white);
}

/* Ghost button */
.btn-ghost {
  background: transparent;
  color: var(--gray-700);
  box-shadow: none;
}

.btn-ghost:hover {
  background: var(--gray-100);
}

/* Button sizes */
.btn-sm {
  padding: 0.5rem 1rem;
  font-size: var(--text-sm);
  min-height: 2.5rem; /* 40px */
}

.btn-lg {
  padding: 1.25rem 2.5rem;
  font-size: var(--text-lg);
  min-height: 3.5rem; /* 56px */
}

/* Button with icon */
.btn-icon {
  padding: 0.75rem;
  min-width: 3rem;
}

/* Button group */
.btn-group {
  display: inline-flex;
  gap: 1rem;
  flex-wrap: wrap;
}

@media (max-width: 640px) {
  .btn {
    width: 100%;
    justify-content: center;
  }
  
  .btn-group {
    flex-direction: column;
    width: 100%;
  }
}
```

### **3.2 Cards**

```css
/* Base card */
.card {
  background: var(--white);
  border-radius: 1rem; /* 16px */
  padding: 2rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-200);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  box-shadow: var(--shadow-xl);
  transform: translateY(-4px);
}

/* Card with gradient background */
.card-gradient {
  background: var(--gradient-card);
  border: 1px solid var(--gray-100);
}

/* Feature card */
.feature-card {
  text-align: center;
  padding: 2.5rem 2rem;
}

.feature-card__icon {
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-soft);
  border-radius: 1rem;
  color: var(--purple-600);
  font-size: 2rem;
}

.feature-card__title {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--gray-800);
  margin-bottom: 0.75rem;
}

.feature-card__description {
  font-size: var(--text-base);
  color: var(--gray-600);
  line-height: var(--leading-relaxed);
}

/* Tier pricing card */
.tier-card {
  position: relative;
  background: var(--white);
  border-radius: 1.5rem;
  padding: 2.5rem 2rem;
  border: 2px solid var(--gray-200);
  transition: all 0.3s ease;
}

.tier-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--purple-600), var(--cyan-500));
  border-radius: 1.5rem 1.5rem 0 0;
}

.tier-card:hover {
  border-color: var(--cyan-500);
  box-shadow: 0 20px 40px -10px rgba(0, 212, 255, 0.2);
  transform: translateY(-8px);
}

.tier-card--featured {
  transform: scale(1.05);
  border-color: var(--purple-600);
  box-shadow: 0 20px 50px -10px rgba(99, 102, 241, 0.3);
  z-index: 1;
}

.tier-card--featured::before {
  height: 6px;
}

.tier-card__badge {
  display: inline-block;
  padding: 0.375rem 0.75rem;
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  background: var(--purple-100);
  color: var(--purple-800);
  border-radius: 9999px;
  margin-bottom: 1rem;
}

.tier-card__name {
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--navy-500);
  margin-bottom: 0.5rem;
}

.tier-card__price {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tier-card__price-currency {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--gray-600);
}

.tier-card__price-amount {
  font-size: var(--text-5xl);
  font-weight: var(--font-extrabold);
  color: var(--cyan-600);
}

.tier-card__price-period {
  font-size: var(--text-lg);
  color: var(--gray-500);
}

.tier-card__description {
  font-size: var(--text-base);
  color: var(--gray-600);
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--gray-200);
}

.tier-card__features {
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
}

.tier-card__feature {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
  font-size: var(--text-sm);
  color: var(--gray-700);
}

.tier-card__feature-icon {
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  color: var(--success-500);
}

/* Testimonial card */
.testimonial-card {
  background: var(--white);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: var(--shadow-lg);
  border-left: 4px solid var(--cyan-500);
}

.testimonial-card__quote {
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
  color: var(--gray-700);
  margin-bottom: 1.5rem;
  font-style: italic;
}

.testimonial-card__author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.testimonial-card__avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  object-fit: cover;
}

.testimonial-card__author-info {
  flex: 1;
}

.testimonial-card__author-name {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--gray-800);
}

.testimonial-card__author-role {
  font-size: var(--text-sm);
  color: var(--gray-500);
}
```

### **3.3 Navigation**

```css
/* Main navigation */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--gray-200);
  transition: all 0.3s ease;
}

.navbar--scrolled {
  box-shadow: var(--shadow-md);
}

.navbar__container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.navbar__logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.navbar__logo:hover {
  opacity: 0.8;
}

.navbar__logo-image {
  height: 2.5rem;
  width: auto;
}

.navbar__logo-text {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--navy-500);
}

.navbar__menu {
  display: flex;
  align-items: center;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar__menu-item {
  margin: 0;
}

.navbar__menu-link {
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: var(--gray-700);
  text-decoration: none;
  transition: color 0.2s ease;
  position: relative;
}

.navbar__menu-link::after {
  content: '';
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--cyan-500);
  transition: width 0.3s ease;
}

.navbar__menu-link:hover {
  color: var(--cyan-600);
}

.navbar__menu-link:hover::after {
  width: 100%;
}

.navbar__menu-link--active {
  color: var(--cyan-600);
}

.navbar__menu-link--active::after {
  width: 100%;
}

.navbar__cta {
  margin-left: auto;
}

/* Mobile menu toggle */
.navbar__toggle {
  display: none;
  flex-direction: column;
  gap: 0.375rem;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
}

.navbar__toggle-line {
  width: 1.5rem;
  height: 2px;
  background: var(--gray-800);
  transition: all 0.3s ease;
}

.navbar__toggle--open .navbar__toggle-line:nth-child(1) {
  transform: rotate(45deg) translateY(0.5rem);
}

.navbar__toggle--open .navbar__toggle-line:nth-child(2) {
  opacity: 0;
}

.navbar__toggle--open .navbar__toggle-line:nth-child(3) {
  transform: rotate(-45deg) translateY(-0.5rem);
}

/* Mobile navigation */
@media (max-width: 768px) {
  .navbar__menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 80%;
    max-width: 400px;
    height: 100vh;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    background: var(--white);
    padding: 5rem 2rem 2rem;
    box-shadow: var(--shadow-2xl);
    transition: right 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  
  .navbar__menu--open {
    right: 0;
  }
  
  .navbar__menu-item {
    border-bottom: 1px solid var(--gray-200);
  }
  
  .navbar__menu-link {
    display: block;
    padding: 1.25rem 1rem;
    font-size: var(--text-lg);
  }
  
  .navbar__menu-link::after {
    display: none;
  }
  
  .navbar__cta {
    margin-left: 0;
    margin-top: 1rem;
  }
  
  .navbar__toggle {
    display: flex;
  }
}
```

### **3.4 Forms**

```css
/* Form group */
.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--gray-700);
  margin-bottom: 0.5rem;
}

.form-label--required::after {
  content: '*';
  color: var(--error-500);
  margin-left: 0.25rem;
}

/* Input fields */
.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: var(--text-base);
  font-family: inherit;
  line-height: var(--leading-normal);
  color: var(--gray-800);
  background: var(--white);
  border: 2px solid var(--gray-300);
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  min-height: 3rem; /* 48px - touch-friendly */
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--cyan-500);
  box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.1);
}

.form-input::placeholder {
  color: var(--gray-400);
}

.form-input--error,
.form-select--error,
.form-textarea--error {
  border-color: var(--error-500);
}

.form-input--error:focus,
.form-select--error:focus,
.form-textarea--error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.form-textarea {
  min-height: 8rem;
  resize: vertical;
}

/* Form help text */
.form-help {
  display: block;
  margin-top: 0.5rem;
  font-size: var(--text-sm);
  color: var(--gray-500);
}

.form-error {
  display: block;
  margin-top: 0.5rem;
  font-size: var(--text-sm);
  color: var(--error-500);
}

/* Checkbox and radio */
.form-checkbox,
.form-radio {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.form-checkbox__input,
.form-radio__input {
  width: 1.25rem;
  height: 1.25rem;
  margin-top: 0.125rem;
  border: 2px solid var(--gray-300);
  cursor: pointer;
}

.form-checkbox__input {
  border-radius: 0.25rem;
}

.form-radio__input {
  border-radius: 9999px;
}

.form-checkbox__input:checked,
.form-radio__input:checked {
  background: var(--cyan-500);
  border-color: var(--cyan-500);
}

.form-checkbox__label,
.form-radio__label {
  flex: 1;
  font-size: var(--text-base);
  color: var(--gray-700);
  cursor: pointer;
}
```

---

## 📱 **4. RESPONSIVE BREAKPOINTS**

```css
:root {
  /* Breakpoint values */
  --screen-sm: 640px;   /* Mobile landscape / Small tablet */
  --screen-md: 768px;   /* Tablet portrait */
  --screen-lg: 1024px;  /* Desktop / Tablet landscape */
  --screen-xl: 1280px;  /* Large desktop */
  --screen-2xl: 1536px; /* Extra large desktop */
}

/* Mobile first approach - styles cascade up */

/* Extra small devices (< 640px) - Default styles */

/* Small devices (≥ 640px) */
@media (min-width: 640px) {
  /* Tablet landscape / Small tablet */
}

/* Medium devices (≥ 768px) */
@media (min-width: 768px) {
  /* Tablet portrait */
}

/* Large devices (≥ 1024px) */
@media (min-width: 1024px) {
  /* Desktop / Tablet landscape */
}

/* Extra large devices (≥ 1280px) */
@media (min-width: 1280px) {
  /* Large desktop */
}

/* 2X large devices (≥ 1536px) */
@media (min-width: 1536px) {
  /* Extra large desktop */
}
```

---

## 🎬 **5. ANIMATION SPECIFICATIONS**

### **Animation Timing**

```css
:root {
  /* Durations */
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 400ms;
  --duration-slower: 600ms;
  
  /* Easing functions */
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### **Scroll Animations**

```css
/* Fade in from bottom */
[data-animate="fade-in"] {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity var(--duration-slow) var(--ease-out),
              transform var(--duration-slow) var(--ease-out);
}

[data-animate="fade-in"].animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Fade in from left */
[data-animate="fade-left"] {
  opacity: 0;
  transform: translateX(-30px);
  transition: opacity var(--duration-slow) var(--ease-out),
              transform var(--duration-slow) var(--ease-out);
}

[data-animate="fade-left"].animate-in {
  opacity: 1;
  transform: translateX(0);
}

/* Fade in from right */
[data-animate="fade-right"] {
  opacity: 0;
  transform: translateX(30px);
  transition: opacity var(--duration-slow) var(--ease-out),
              transform var(--duration-slow) var(--ease-out);
}

[data-animate="fade-right"].animate-in {
  opacity: 1;
  transform: translateX(0);
}

/* Scale up */
[data-animate="scale-up"] {
  opacity: 0;
  transform: scale(0.9);
  transition: opacity var(--duration-slow) var(--ease-out),
              transform var(--duration-slow) var(--ease-out);
}

[data-animate="scale-up"].animate-in {
  opacity: 1;
  transform: scale(1);
}

/* Stagger children */
[data-animate="fade-in"]:nth-child(1) { transition-delay: 0ms; }
[data-animate="fade-in"]:nth-child(2) { transition-delay: 100ms; }
[data-animate="fade-in"]:nth-child(3) { transition-delay: 200ms; }
[data-animate="fade-in"]:nth-child(4) { transition-delay: 300ms; }
[data-animate="fade-in"]:nth-child(5) { transition-delay: 400ms; }
[data-animate="fade-in"]:nth-child(6) { transition-delay: 500ms; }
```

### **Loading Animations**

```css
/* Spinner */
.spinner {
  width: 3rem;
  height: 3rem;
  border: 3px solid var(--gray-200);
  border-top-color: var(--cyan-500);
  border-radius: 9999px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Skeleton loader */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--gray-200) 0%,
    var(--gray-100) 50%,
    var(--gray-200) 100%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s ease-in-out infinite;
  border-radius: 0.5rem;
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

## 📄 **6. PAGE LAYOUTS**

### **Hero Page (hero.html)**

```
Layout: Full-screen (100vh)
Grid: Two-column (60/40) on desktop, stacked on mobile

Desktop (1024px+):
┌─────────────────────────────────────────────────────┐
│  [Logo]                      [Menu Items]    [CTA]  │ ← Nav (70px)
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────────┐   ┌──────────────────┐      │
│  │                  │   │                  │      │
│  │  Content Area    │   │  Phone Mockup    │      │
│  │  • H1 Headline   │   │  with App UI     │      │
│  │  • Subheadline   │   │                  │      │
│  │  • CTAs (2)      │   │                  │      │
│  │                  │   │                  │      │
│  └──────────────────┘   └──────────────────┘      │
│                                                     │
│               [Scroll Indicator]                    │
└─────────────────────────────────────────────────────┘

Mobile (< 768px):
┌───────────────────┐
│ [Logo]    [Menu]  │ ← Nav (60px)
├───────────────────┤
│                   │
│   Phone Mockup    │
│                   │
├───────────────────┤
│   H1 Headline     │
│   Subheadline     │
│   [CTA Primary]   │
│   [CTA Secondary] │
│                   │
│  [Scroll Indicator]│
└───────────────────┘
```

### **Main Pages (index.html, business.html, services.html)**

```
Standard layout structure:

┌─────────────────────────────────────────┐
│         Navigation (Fixed)              │ ← 70px height
├─────────────────────────────────────────┤
│                                         │
│         Hero Section (Smaller)          │ ← 60vh height
│         (Page-specific content)         │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│         Content Section 1               │ ← Varies
│         (Full-width or container)       │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│         Content Section 2               │ ← Varies
│         (Grid/Flex layouts)             │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│         CTA Section                     │ ← 300px
│         (Final conversion push)         │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│         Footer                          │ ← Varies
│         (Links, legal, contact)         │
│                                         │
└─────────────────────────────────────────┘
```

---

## 📐 **7. SPACING SYSTEM**

```css
:root {
  /* Spacing scale (rem-based, responsive) */
  --space-0: 0;
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */
  
  /* Container widths */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1536px;
}

/* Container utility */
.container {
  width: 100%;
  max-width: var(--container-xl);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}

@media (min-width: 640px) {
  .container { padding-left: var(--space-6); padding-right: var(--space-6); }
}

@media (min-width: 1024px) {
  .container { padding-left: var(--space-8); padding-right: var(--space-8); }
}
```

---

## 🖼️ **8. ASSET SPECIFICATIONS**

### **Logo Assets**

```
Primary Logo:
- Format: SVG (preferred), PNG with transparency fallback
- Sizes: 
  - Desktop nav: 120px x 40px
  - Mobile nav: 100px x 32px
  - Footer: 150px x 50px
- Variations needed:
  1. Full color on light background
  2. White on dark/gradient background
  3. Icon only (favicon) - 32x32, 64x64, 128x128, 256x256
```

### **Hero Section**

```
Background Image:
- Description: Nairobi street scene with bustling market/business activity
- Size: 1920x1080px (16:9 aspect ratio)
- Format: WebP (primary), JPG fallback
- Optimization: <300KB compressed
- Overlay: Dark gradient overlay for text contrast
- Mobile: 1080x1920px (vertical crop) or solid color fallback

Phone Mockup:
- Description: iPhone mockup showing Hostara app interface
- Size: 800x1600px (2:1 aspect ratio)
- Format: PNG with transparency
- Content: App screens showing service listings (Campus Laundry, Tech Repairs, Freelance Design)
- Multiple screens needed for carousel/slider
```

### **Service Category Icons**

```
Categories needed (8):
1. 🍔 Food Delivery
2. 👕 Laundry Services
3. 💻 Tech Repairs
4. 🎨 Freelance Design
5. 📚 Tutoring
6. 🏠 Home Services
7. 🚚 Delivery Services
8. ➕ More (Plus icon)

Specifications:
- Format: SVG (scalable)
- Size: 128x128px base
- Style: Line icons with 2px stroke OR filled icons
- Colors: Single color (will be styled with CSS)
- Consistency: Same style across all icons
```

### **Business Tier Images**

```
Testimonial Photos:
- Description: Diverse Kenyan business owners using the platform
- Size: 800x800px (square)
- Format: WebP (primary), JPG fallback
- Quantity: 5-6 testimonials
- Style: Professional but authentic, natural lighting
- Context: Business environment, holding phone with app

Success Story Images:
- Description: Before/after business growth visuals
- Size: 1200x800px (3:2 aspect ratio)
- Format: WebP (primary), JPG fallback
- Quantity: 3 case studies
```

### **General Assets**

```
M-Pesa Logo:
- Official M-Pesa logo from brand guidelines
- Format: PNG with transparency
- Size: 200x80px
- Usage: Payment section, trust badges

App Store Badges:
- Google Play badge (official)
- Apple App Store badge (official)
- Format: SVG or PNG
- Size: 200x60px each

Kenya Flag/Map:
- Description: Kenya map showing coverage areas (Nairobi highlighted)
- Format: SVG for scalability
- Colors: Brand colors (cyan/purple) not traditional flag colors
- Usage: About page, coverage section
```

---

## ✅ **DESIGN SPECIFICATION COMPLETION**

**Status:** ✅ **APPROVED FOR IMPLEMENTATION**

This design specification is complete and ready for development. All components, colors, typography, animations, and layouts have been finalized based on:
- Brand guidelines (logo analysis)
- Modern web design research
- Kenyan market considerations
- Performance optimization
- Accessibility standards

---

**Next Step:** Create IMPLEMENTATION_TASKS.md with detailed build plan

**Last Updated:** October 1, 2025  
**Approved by:** Design Team  
**Implementation Start:** October 1, 2025  
**Target Launch:** November 1, 2025  

---

*This specification serves as the authoritative design reference for the Hostara marketing website. All development work should strictly follow these guidelines to ensure brand consistency and quality.*
