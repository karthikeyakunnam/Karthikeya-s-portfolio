# Deployment & Performance Guide

## Production Deployment

### Pre-Deployment Checklist

- [ ] Verify Lighthouse score ≥ 95
- [ ] Test on mobile devices
- [ ] Check all links and routing
- [ ] Validate SEO metadata
- [ ] Review security headers
- [ ] Test contact form integration
- [ ] Verify sitemap generation
- [ ] Check image optimization

### Vercel Deployment Steps

1. **Initialize Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: GenAI portfolio"
   git branch -M main
   git remote add origin https://github.com/karthikeyaunnam/karthikeya-portfolio.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com/new
   - Select GitHub repository
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Configure Domain**
   - Add custom domain in Vercel dashboard
   - Update DNS CNAME records
   - Wait for SSL certificate (auto-issued)

4. **Environment Variables**
   ```
   No required variables for basic setup
   Optional for analytics/monitoring
   ```

5. **Deploy**
   - Push to main branch
   - Automatic deployment to production
   - Monitor build logs in dashboard

### Continuous Deployment

Vercel automatically deploys on push to main:

```bash
# Development
git checkout -b feature/new-section
# Make changes
git commit -am "Add new section"
git push origin feature/new-section
# Create Pull Request → Vercel creates preview deployment
# Merge → Automatic production deployment
```

## Performance Optimization Guide

### Lighthouse Audit

```bash
# Local audit
npm run build
lighthouse https://localhost:3000

# Or use Vercel Analytics dashboard
```

### Optimization Techniques

#### 1. Image Optimization
- Use Next.js Image component
- Provide multiple formats (AVIF, WebP, PNG)
- Set proper width/height
- Use priority loading for above-fold images

#### 2. Font Optimization
- Use system fonts (already optimized)
- No custom fonts in base configuration
- Font loading is non-blocking

#### 3. Code Splitting
- Server Components by default
- Lazy load Client Components with dynamic()
- Split large libraries

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(
  () => import('@/components/HeavyComponent'),
  { loading: () => <p>Loading...</p> }
);
```

#### 4. CSS Optimization
- Tailwind purges unused CSS
- Only loads used utility classes
- Global CSS in globals.css

#### 5. JavaScript Bundle
- Minimal dependencies
- Tree-shaking enabled
- No polyfills needed for modern browsers

### Core Web Vitals Targets

| Metric | Target | How to Achieve |
|--------|--------|-----------------|
| LCP | < 2.5s | Optimize Hero image, defer non-critical JS |
| FID | < 100ms | Minimize JS execution, use Server Components |
| CLS | < 0.1 | Reserve space for dynamic content, no layout shifts |

### Monitoring in Production

1. **Vercel Analytics**
   ```typescript
   import { Analytics } from "@vercel/analytics/react";
   
   export default function App() {
     return (
       <>
         {children}
         <Analytics />
       </>
     );
   }
   ```

2. **Google Analytics** (optional)
   - Add tracking script to head
   - Track events and conversions

3. **Sentry** (error tracking, optional)
   - Monitor runtime errors
   - Track performance metrics

## Maintenance & Updates

### Regular Tasks

**Weekly:**
- Monitor analytics
- Check error logs
- Test contact form

**Monthly:**
- Update dependencies
- Run security audit: `npm audit`
- Review Lighthouse scores

**Quarterly:**
- Update content in constants.ts
- Review design system
- Optimize images if needed

### Updating Dependencies

```bash
# Check outdated packages
npm outdated

# Update all
npm update

# Update to latest (including breaking changes)
npm install -g npm-check-updates
ncu -u

# Test thoroughly
npm run build
npm run type-check
npm run lint
```

### Performance Regression Testing

```bash
# Create baseline
lighthouse https://karthikeya-portfolio.vercel.app --output-path=./lighthouse-baseline.json

# After changes
lighthouse https://karthikeya-portfolio.vercel.app --output-path=./lighthouse-new.json

# Compare
```

## Content Updates

### Quick Update Workflow

1. **Edit Content**
   ```typescript
   // lib/constants.ts
   export const PROJECTS = [
     {
       id: 1,
       title: "New Project",
       // ... update fields
     }
   ];
   ```

2. **Test Locally**
   ```bash
   npm run dev
   # Visit http://localhost:3000
   # Verify changes
   ```

3. **Deploy**
   ```bash
   git commit -am "Update portfolio content"
   git push origin main
   # Automatic deployment to production
   ```

## Security Best Practices

### Content Security Policy
Currently using Next.js security headers (see next.config.ts)

### Input Validation
Contact form validates:
- Email format
- Required fields
- Message length

### API Security (if added)
- Validate all inputs server-side
- Rate limiting on endpoints
- Never expose sensitive data to client

## Troubleshooting Production Issues

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next
npm run build

# Check for TypeScript errors
npm run type-check

# Check for ESLint errors
npm run lint
```

### Performance Degrades

1. Check latest deployment in Vercel
2. Review bundle size: `npm run analyze`
3. Check for new images without optimization
4. Review animation complexity

### Contact Form Not Working

1. Check browser console for errors
2. Verify email service integration (if added)
3. Check form validation

## Migration & Backups

### Git Backup
```bash
# Push to GitHub
git push origin main

# Create release tag
git tag -a v1.0.0 -m "Production release"
git push origin v1.0.0
```

### Database/CMS Integration (Future)

When adding a backend:

1. Create API routes in `/app/api`
2. Use Server Actions for form submissions
3. Implement proper error handling
4. Add authentication if needed

Example:
```typescript
// app/api/contact/route.ts
export async function POST(req: Request) {
  const data = await req.json();
  
  // Validate
  // Process
  // Store in database
  // Send email
  
  return Response.json({ success: true });
}
```

## Analytics & Monitoring

### Key Metrics to Track

1. **Traffic**
   - Daily/weekly visitors
   - Traffic sources
   - Geographic distribution

2. **User Behavior**
   - Pages visited
   - Scroll depth
   - Time on page

3. **Conversions**
   - Contact form submissions
   - Click-through rates
   - CTA engagement

4. **Technical**
   - Page load time
   - Error rate
   - Device breakdown

### Setting Up Google Analytics

1. Create GA account
2. Add tracking ID to layout.tsx
3. Track custom events

```typescript
gtag.event('form_submission', {
  'event_category': 'engagement',
  'event_label': 'contact_form'
});
```

## Disaster Recovery

### Rollback Procedure

```bash
# View deployment history
vercel deployments list

# Rollback to previous
vercel promote <deployment-url>

# Or revert code
git revert <commit-hash>
git push origin main
```

### Data Loss Prevention

- GitHub as primary backup
- Vercel automatic backups
- Regular local backups

```bash
# Create backup
cp -r "Karthikeya's Portfolio" "Karthikeya's Portfolio-backup-$(date +%Y%m%d)"
```

---

**Next Steps:**
1. Deploy to Vercel
2. Configure custom domain
3. Set up analytics
4. Monitor performance
5. Regular maintenance
