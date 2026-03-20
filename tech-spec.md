# Alex Travis Portfolio - Technical Specification

## 1. Tech Stack Overview

| Category | Technology |
|----------|------------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS 3.4 |
| UI Components | shadcn/ui |
| Animation | Framer Motion |
| Icons | Lucide React |
| Fonts | Inter (Google Fonts) |

## 2. Tailwind Configuration

### Color Extensions

```javascript
// tailwind.config.js
colors: {
  primary: {
    yellow: '#F5C518',
    pink: '#FF6B9D',
    orange: '#FF8C42',
  },
  background: {
    DEFAULT: '#FFFFFF',
    alt: '#F8F9FA',
  },
  text: {
    primary: '#1A1A1A',
    secondary: '#6B7280',
    muted: '#9CA3AF',
  },
}
```

### Font Extensions

```javascript
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
}
```

## 3. Component Inventory

### Shadcn/UI Components (Pre-installed)

| Component | Usage | Style Overrides |
|-----------|-------|-----------------|
| Button | CTAs, actions | Custom gradient variant, rounded-full |
| Badge | Tags, status | Yellow background variant |
| Card | Service cards, portfolio | rounded-2xl, custom shadow |
| DropdownMenu | Pages dropdown | - |
| Sheet | Mobile menu | - |

### Custom Components

| Component | Props | Description |
|-----------|-------|-------------|
| `Navbar` | - | Fixed navigation with scroll effect |
| `HeroSection` | - | Two-column hero with animations |
| `StatsSection` | - | Animated counter stats |
| `AboutSection` | - | Text content with CTA |
| `ServicesSection` | - | Service cards grid |
| `ClientsSection` | - | Logo marquee |
| `PortfolioSection` | - | Project cards grid |
| `Footer` | - | Simple footer |
| `AnimatedCounter` | `end: number, suffix?: string` | Count-up animation |
| `GradientButton` | `children, variant` | Pink gradient button |
| `ServiceCard` | `icon, title, description, features, badge?` | Service item card |
| `PortfolioCard` | `image, title, year, tags` | Portfolio project card |

## 4. Animation Implementation Plan

| Interaction | Tech | Implementation |
|-------------|------|----------------|
| Page Load | Framer Motion | `staggerChildren` container, `y: 20 → 0` + `opacity: 0 → 1` |
| Navbar Scroll | React State + CSS | `useScroll` hook, toggle `scrolled` class for shadow |
| Hero Text Reveal | Framer Motion | `variants` with stagger, `transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }` |
| Hero Image | Framer Motion | `scale: 0.9 → 1`, `opacity: 0 → 1`, delay: 0.3s |
| Stats Counter | Framer Motion | `useInView` + `animate` from 0 to target |
| Button Hover | Tailwind | `hover:scale-[1.02]`, `transition-transform duration-200` |
| Card Hover | Tailwind | `hover:-translate-y-1`, `hover:shadow-lg` |
| Section Fade In | Framer Motion | `whileInView`, `viewport: { once: true, margin: "-100px" }` |
| Link Underline | CSS | `after` pseudo-element, `scaleX: 0 → 1` on hover |
| Badge Float | Framer Motion | Subtle `y` oscillation loop |

### Animation Timing Constants

```typescript
const ANIMATION = {
  duration: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
    hero: 0.6,
  },
  ease: {
    default: [0.4, 0, 0.2, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
    smooth: [0.25, 0.1, 0.25, 1],
  },
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
  },
};
```

## 5. Project File Structure

```
/mnt/okcomputer/output/app/
├── public/
│   ├── images/
│   │   ├── avatar.jpg
│   │   ├── hero-portrait.jpg
│   │   ├── project-dots.jpg
│   │   └── project-ongito.jpg
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn components
│   │   ├── AnimatedCounter.tsx
│   │   ├── GradientButton.tsx
│   │   ├── ServiceCard.tsx
│   │   └── PortfolioCard.tsx
│   ├── sections/
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── ClientsSection.tsx
│   │   ├── PortfolioSection.tsx
│   │   └── Footer.tsx
│   ├── hooks/
│   │   └── useScrolled.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   └── animations.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

## 6. Package Installation

```bash
# Initialize project
bash /app/.kimi/skills/webapp-building/scripts/init-webapp.sh "Alex Travis Portfolio"

# Install animation library
npm install framer-motion

# Install additional icons
npm install lucide-react
```

## 7. Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Mobile | < 640px | Single column, hamburger menu |
| Tablet | 640-1024px | 2 columns where applicable |
| Desktop | > 1024px | Full layout as designed |

## 8. Performance Considerations

- Use `will-change: transform` on animated elements
- Lazy load portfolio images
- Use `viewport: { once: true }` for scroll animations
- Optimize images before adding to public folder
- Use CSS transforms instead of layout properties
