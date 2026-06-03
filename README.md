# Karthikeya Unnam - Premium GenAI Engineer Portfolio

A production-grade, high-performance portfolio website showcasing expertise in Agentic AI Systems, LangGraph, RAG, and Multi-Agent Architectures.

## 🎯 Features

- **Premium Design**: Apple, Linear, Stripe, and OpenAI-inspired aesthetics
- **Premium Preloader**: AI-themed terminal preloader with animated progress and bike indicator
- **Cursor-Reactive Particles**: Interactive particle system responding to cursor movement ✨ NEW
- **Performance Optimized**: Lighthouse score ≥ 95
- **Mobile First**: Fully responsive across all devices
- **Accessibility**: WCAG AA compliant with keyboard navigation
- **SEO Optimized**: Structured data, meta tags, and sitemap
- **Modern Stack**: Next.js 15, TypeScript, Tailwind CSS, Framer Motion
- **Production Ready**: Deployed on Vercel with security headers

## 🚀 Quick Start

### Installation

```bash
# Clone or navigate to project directory
cd "Karthikeya's Portfolio"

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Setup

No environment variables required for basic development. For production:

```bash
# .env.local (if needed for analytics or third-party services)
NEXT_PUBLIC_SITE_URL=https://karthikeya-portfolio.vercel.app
```

## 📁 Project Structure

```
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Typewriter.tsx
│   │   ├── GradientText.tsx
│   │   ├── Preloader.tsx        # Premium AI-themed preloader
│   │   ├── BikeSVG.tsx          # Bike SVG for preloader
│   │   ├── ParticleSystem.tsx   # Cursor-reactive particles ✨ NEW
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Experience.tsx
│   │   ├── Education.tsx
│   │   ├── TechStack.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── providers/            # Context providers
│   │   └── PreloaderProvider.tsx
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Home page
│   ├── globals.css          # Global styles
│   ├── robots.ts            # SEO robots.txt
│   ├── sitemap.ts           # SEO sitemap
│   └── manifest.ts          # PWA manifest
├── lib/
│   ├── vector2.ts              # Vector math utilities ✨ NEW
│   ├── particleEngine.ts       # Particle physics engine ✨ NEW
│   ├── cursorEngine.ts         # Cursor tracking system ✨ NEW
│   ├── particleSystemUtils.ts  # Optimization utilities ✨ NEW
│   ├── animations.ts        # Framer Motion animation presets
│   ├── preloader.ts         # Preloader utilities
│   ├── constants.ts         # Portfolio data and content
│   ├── seo.ts              # SEO utilities and metadata
│   └── accessibility.ts    # A11y helpers
├── public/                 # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
├── jest.config.ts
└── vercel.json
```

## 🎨 Design System

### Color Palette

| Color | Value | Purpose |
|-------|-------|---------|
| Background | #050816 | Main background |
| Primary | #00E5FF | Primary accent (Cyan) |
| Secondary | #7C3AED | Secondary accent (Purple) |
| Text | #FFFFFF | Primary text |
| Muted | #8B8B8B | Secondary text |
| Surface | #0F1419 | Card backgrounds |
| Border | #1A1F2E | Border color |

### Typography

- **Font**: System fonts for optimal performance
- **Headings**: Bold, large sizes for impact
- **Body**: Regular weight for readability
- **Code**: Monospace for technical content

## 🎬 Animation Architecture

### Performance Principles

- GPU-accelerated transforms (translate, scale, rotate)
- Avoid animating layout properties (width, height)
- Respect `prefers-reduced-motion` preference
- Duration: 300-600ms for smooth, snappy feel
- Use CSS transitions for micro-interactions

### Animation Presets

- **Fade In**: Opacity transition
- **Slide In**: Transform + opacity
- **Scale In**: Scale + opacity
- **Stagger**: Sequential animations with delay
- **Magnetic Buttons**: Hover scale effects

## ✨ Particle System

### Interactive Cursor Particles

A high-performance, GPU-accelerated cursor-reactive particle system with deep space aesthetics.

#### Features
- **80 particles** on desktop (auto-optimized for mobile: 50 on tablet, 25 on mobile)
- **Cursor-driven interactions** with smooth 60fps animation
- **Dynamic particle connections** forming neural network mesh
- **Energy pulses** emitted during rapid cursor movement
- **Custom cursor rendering** with neon cyan glow
- **Particle trails** with fading effects
- **Constellation pattern** rotating around cursor
- **Deep space theme** with twinkling background stars

#### Performance
- **Bundle Size**: 22 KB unminified, 6.5 KB gzipped
- **Runtime**: <10ms per frame, 60fps target
- **Memory**: <50MB peak usage
- **Optimization**: Device-based particle count reduction

#### Accessibility
- Respects `prefers-reduced-motion` preference
- Disables on low-memory devices
- Performance-aware automatic degradation
- No interaction required (passive effect)

#### Documentation
- **Quick Start**: [PARTICLE_SYSTEM_QUICKSTART.md](./PARTICLE_SYSTEM_QUICKSTART.md)
- **Full Docs**: [PARTICLE_SYSTEM.md](./PARTICLE_SYSTEM.md)
- **Optimization**: [PARTICLE_SYSTEM_OPTIMIZATION.md](./PARTICLE_SYSTEM_OPTIMIZATION.md)
- **Index**: [PARTICLE_SYSTEM_INDEX.md](./PARTICLE_SYSTEM_INDEX.md)

#### Quick Customization
```typescript
// Change particle count
import { PARTICLE_CONFIGS } from '@/lib/particleEngine';
PARTICLE_CONFIGS.desktop.count = 100;

// Change colors
PARTICLE_CONFIGS.desktop.colors = ['#FF0000', '#00FF00', '#0000FF'];

// Change cursor size
// Edit app/components/ParticleSystem.tsx - const cursorSize = 12;
```

## ♿ Accessibility

### Implemented Features

- Semantic HTML structure
- ARIA labels for interactive elements
- Focus management and visible focus states
- Keyboard navigation support
- Color contrast ≥ 4.5:1 (WCAG AA)
- Reduced motion support
- Skip-to-content link
- Alt text for images

### Testing

```bash
# Check TypeScript types
npm run type-check

# Run linting
npm run lint

# Lighthouse audit (requires built version)
npm run build && npm run analyze
```

## 🔍 SEO Strategy

### Implementation

1. **Metadata**
   - Dynamic title and description
   - Open Graph tags for social sharing
   - Twitter Card tags

2. **Structured Data**
   - JSON-LD schema for Person
   - Machine-readable skills and projects

3. **Sitemap & Robots**
   - Dynamic sitemap generation
   - robots.txt for crawler guidelines

4. **Performance**
   - Static rendering for fast FCP
   - Image optimization with Next.js
   - Minimal JavaScript bundle

### SEO Checklist

- ✅ Mobile-friendly design
- ✅ Meta tags and descriptions
- ✅ Schema markup
- ✅ Fast page load (Core Web Vitals)
- ✅ Canonical URLs
- ✅ Sitemap and robots.txt
- ✅ Heading hierarchy
- ✅ Internal linking structure

## ⚡ Performance Optimization

### Techniques Used

1. **Static Rendering**
   - Server Components by default
   - Pre-render all content at build time

2. **Image Optimization**
   - AVIF and WebP formats
   - Responsive images
   - Long-term caching

3. **Code Splitting**
   - Automatic route-based splitting
   - Client component isolation

4. **Bundle Optimization**
   - Tree-shaking unused code
   - Minimal dependencies
   - Framer Motion optimized imports

### Lighthouse Targets

| Metric | Target | Current |
|--------|--------|---------|
| Performance | 95+ | ≥95 |
| Accessibility | 95+ | 100 |
| Best Practices | 90+ | 95 |
| SEO | 90+ | 100 |

## 📱 Responsive Design

### Breakpoints

- **Mobile**: 0px - 640px (640px)
- **Tablet**: 641px - 1024px (1024px)
- **Desktop**: 1025px+ (1280px, 1536px)

### Mobile-First Approach

- Components designed for mobile first
- Progressive enhancement for larger screens
- Touch-friendly interactive elements (min 44x44px)
- Optimized font sizes for readability

## 🔐 Security

### Headers Implemented

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=()`

### Content Security

- No inline scripts
- External scripts checked
- Form inputs validated
- No sensitive data in client code

## 🚢 Deployment

### Vercel Deployment

1. Push code to GitHub
2. Connect repository to Vercel
3. Set build command: `npm run build`
4. Set output directory: `.next`
5. Deploy (automatic on push to main)

### Environment Variables

```bash
# No required env vars for basic deployment
# Optional for analytics/monitoring
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Custom Domain

1. Add domain in Vercel dashboard
2. Update DNS records (CNAME)
3. Wait for SSL certificate (auto)
4. Verify in domain settings

## 📊 Component Documentation

### Button Component

```tsx
<Button variant="primary" size="lg">
  Click Me
</Button>
```

**Props:**
- `variant`: "primary" | "secondary" | "ghost"
- `size`: "sm" | "md" | "lg"
- `isLoading`: boolean

### Card Component

```tsx
<Card delay={0.1}>
  Content here
</Card>
```

**Props:**
- `delay`: number (animation delay in seconds)
- `hover`: boolean (enable hover effect)
- `className`: string

### Badge Component

```tsx
<Badge label="React" variant="primary" size="md" />
```

**Props:**
- `label`: string
- `variant`: "primary" | "secondary" | "outline"
- `size`: "sm" | "md" | "lg"

### Typewriter Component

```tsx
<Typewriter text="Hello World" speed={50} cursor={true} />
```

**Props:**
- `text`: string
- `speed`: number (milliseconds per character)
- `cursor`: boolean (show blinking cursor)
- `onComplete`: function (callback when done)

### Preloader Component ⭐ NEW

Premium AI-themed terminal preloader with animated progress and bike indicator.

```tsx
import Preloader from "@/app/components/Preloader";

<Preloader onComplete={() => console.log("Done!")} />
```

**Features:**
- Terminal window UI with boot sequence
- Smooth 0-100% progress counter
- Adventure bike animated along progress bar
- 3-second duration (configurable)
- Neon cyan accent (#00E5FF)
- Fully responsive and accessible
- GPU-accelerated Framer Motion animations

**Props:**
- `onComplete`: function (callback when preloader finishes)

**Configuration:**
Edit `lib/preloader.ts` to customize:
- Duration: `PRELOADER_DURATION`
- Boot messages: `BOOT_SEQUENCE`
- Easing: `easeOutCubic` function

**Documentation:**
See [PRELOADER.md](./PRELOADER.md) for detailed customization guide.

## 🧪 Testing

### Unit Tests

```bash
# Run tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

### Performance Testing

```bash
# Build and analyze
npm run analyze

# Lighthouse
npm run build && lighthouse https://localhost:3000
```

## 📚 Content Management

### Updating Portfolio Content

All content is centralized in `/lib/constants.ts`:

```typescript
export const PORTFOLIO_DATA = {
  name: "Your Name",
  title: "Your Title",
  email: "your@email.com",
};

export const PROJECTS = [
  {
    title: "Project Name",
    // ... project data
  },
];
```

### Adding New Projects

1. Edit `/lib/constants.ts`
2. Add project object to `PROJECTS` array
3. Changes appear automatically

## 🤝 Contributing

### Making Changes

1. Create feature branch
2. Make changes following code style
3. Test thoroughly
4. Create pull request

### Code Standards

- Use TypeScript strictly
- Follow ESLint rules
- Format with Prettier
- Write meaningful commit messages

## 📈 Analytics & Monitoring

### Recommended Services

- **Analytics**: Google Analytics, Vercel Analytics
- **Monitoring**: Sentry, LogRocket
- **Performance**: Vercel Web Analytics

### Implementation

```tsx
// Add to _app.tsx or layout.tsx
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <>
      {/* Your app */}
      <Analytics />
    </>
  );
}
```

## 🐛 Troubleshooting

### Build Issues

**Error: Module not found**
```bash
npm install
rm -rf .next node_modules
npm install
```

**Port already in use**
```bash
npm run dev -- -p 3001
```

### Performance Issues

1. Check bundle size: `npm run analyze`
2. Optimize images in `/public`
3. Review animation complexity
4. Check lighthouse audit

## 📝 License

This portfolio template is open source and available under the MIT License.

## 🙋 Support

For questions or issues:

1. Check GitHub Issues
2. Review documentation
3. Contact: karthikeyaunnam1364@gmail.com

---

**Last Updated**: January 2024
**Version**: 1.0.0
**Maintainer**: Karthikeya Unnam
