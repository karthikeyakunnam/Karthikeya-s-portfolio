# Analytics & Monitoring Setup Guide

## Overview

This guide covers setting up analytics, monitoring, and observability for your production portfolio.

## 1. Vercel Analytics (Recommended - Free)

### Automatic Setup

Vercel Analytics is built-in and automatically tracks:
- Page views
- Navigation timing
- Web Vitals
- Device information

### Enable in Dashboard

1. **Log into Vercel**
   - https://vercel.com/dashboard

2. **Select Your Project**
   - karthikeya-portfolio

3. **Go to Settings → Analytics**
   - Enable "Web Analytics"

4. **View Analytics**
   - Dashboard → Analytics tab
   - Real-time visitor data
   - Page performance metrics

### Key Metrics to Monitor

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| LCP (Largest Contentful Paint) | < 2.5s | > 4s |
| FID (First Input Delay) | < 100ms | > 300ms |
| CLS (Cumulative Layout Shift) | < 0.1 | > 0.25 |
| Page Load | < 2s | > 5s |

## 2. Google Analytics 4 (Recommended - Free)

### Setup Process

1. **Create Google Analytics Account**
   ```
   https://analytics.google.com
   ```

2. **Create Property**
   - Property Name: Karthikeya Portfolio
   - Website URL: https://your-domain.com
   - Time Zone: Your location
   - Currency: USD

3. **Get Measurement ID**
   - Format: G-XXXXXXXXXX
   - Copy this ID

4. **Install Analytics in Your Site**

   Option A - Using Next.js GA Package:
   ```bash
   npm install @next/third-parties
   ```

   Add to `app/layout.tsx`:
   ```typescript
   import { GoogleAnalytics } from '@next/third-parties/google'

   export default function RootLayout({ children }) {
     return (
       <>
         {children}
         <GoogleAnalytics gaId="G-XXXXXXXXXX" />
       </>
     )
   }
   ```

   Option B - Using gtag script:
   ```typescript
   // app/layout.tsx
   import Script from 'next/script'

   export default function RootLayout({ children }) {
     return (
       <>
         <Script
           src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
           strategy="afterInteractive"
         />
         <Script id="google-analytics" strategy="afterInteractive">
           {`
             window.dataLayer = window.dataLayer || [];
             function gtag(){dataLayer.push(arguments);}
             gtag('js', new Date());
             gtag('config', 'G-XXXXXXXXXX');
           `}
         </Script>
         {children}
       </>
     )
   }
   ```

5. **Verify Installation**
   - Go to Google Analytics
   - Realtime → Overview
   - Visit your site
   - Should see traffic appear in realtime

### Track Custom Events

```typescript
// Track portfolio section views
useEffect(() => {
  if (window.gtag) {
    window.gtag('event', 'view_section', {
      section: 'projects',
      timestamp: new Date().toISOString()
    });
  }
}, []);

// Track CTA clicks
const handleCTAClick = (buttonName: string) => {
  if (window.gtag) {
    window.gtag('event', 'click_cta', {
      cta_name: buttonName,
      page_location: window.location.href
    });
  }
};

// Track form submissions
const handleFormSubmit = () => {
  if (window.gtag) {
    window.gtag('event', 'form_submission', {
      form_name: 'contact_form',
      timestamp: new Date().toISOString()
    });
  }
};
```

### Important Dashboards

1. **Realtime**
   - Active users right now
   - Pages being viewed
   - Traffic source

2. **Acquisition**
   - Where traffic comes from
   - Organic search performance
   - Referral traffic

3. **Engagement**
   - Popular pages
   - Time on page
   - Bounce rate

4. **Conversions**
   - Form submissions
   - CTA clicks
   - Goals

## 3. Sentry Error Tracking (Free Tier Available)

### Setup

1. **Create Sentry Account**
   ```
   https://sentry.io
   ```

2. **Create Project**
   - Platform: Next.js
   - Project name: karthikeya-portfolio

3. **Get DSN**
   - Format: https://xxxxx@xxxxx.ingest.sentry.io/xxxxx

4. **Install Package**
   ```bash
   npm install @sentry/nextjs
   ```

5. **Initialize in Your Project**

   Create `sentry.client.config.ts`:
   ```typescript
   import * as Sentry from "@sentry/nextjs";

   Sentry.init({
     dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
     environment: process.env.NODE_ENV,
     tracesSampleRate: 1.0,
     debug: false,
   });
   ```

   Create `sentry.server.config.ts`:
   ```typescript
   import * as Sentry from "@sentry/nextjs";

   Sentry.init({
     dsn: process.env.SENTRY_DSN,
     environment: process.env.NODE_ENV,
     tracesSampleRate: 1.0,
   });
   ```

6. **Update `next.config.ts`**
   ```typescript
   const { withSentryConfig } = require("@sentry/nextjs");

   const nextConfig = {
     // your config
   };

   export default withSentryConfig(nextConfig, {
     org: "your-org",
     project: "karthikeya-portfolio",
     authToken: process.env.SENTRY_AUTH_TOKEN,
   });
   ```

### Monitor Errors

Sentry automatically captures:
- Unhandled exceptions
- JavaScript errors
- Network requests
- Performance metrics

## 4. Lighthouse CI (Performance Monitoring)

### Setup GitHub Actions

The project includes `.github/workflows/ci.yml` that runs Lighthouse CI.

### Configuration

Create `lighthouserc.json`:
```json
{
  "ci": {
    "collect": {
      "url": [
        "https://karthikeya-portfolio.vercel.app"
      ],
      "numberOfRuns": 3
    },
    "upload": {
      "target": "temporary-public-storage"
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }],
        "categories:best-practices": ["error", { "minScore": 0.9 }],
        "categories:seo": ["error", { "minScore": 0.9 }]
      }
    }
  }
}
```

### View Reports

- GitHub Actions tab
- Vercel deployment logs
- Lighthouse CI dashboard

## 5. Email Alerts Setup

### Vercel Alerts

1. **Project Settings → Alerts**
2. **Add alert for:**
   - Build failures
   - Deployment failures
   - Performance degradation

### Google Analytics Alerts

1. **Analytics → Admin → Alerts**
2. **Create alerts for:**
   - Traffic drop (>50% below average)
   - Traffic spike (>2x average)
   - Page not tracking

## 6. Monitoring Dashboard (Optional)

### Recommended Tools

| Tool | Purpose | Free | Cost |
|------|---------|------|------|
| Vercel Analytics | Built-in performance | ✅ | Included |
| Google Analytics 4 | User behavior | ✅ | Free |
| Sentry | Error tracking | ✅ | $29/mo+ |
| Datadog | Advanced monitoring | ❌ | $15/mo |
| New Relic | APM | ✅ Limited | $99/mo |

### Daily Monitoring Checklist

```markdown
- [ ] Check Vercel dashboard for errors
- [ ] Review Google Analytics for traffic
- [ ] Check Sentry for new errors
- [ ] Monitor Lighthouse scores
- [ ] Verify all pages loading
- [ ] Check contact form submissions
```

## 7. Performance Budgets

### Set Performance Targets

```typescript
// Performance budget recommendations
const budget = {
  "performance": {
    maxScore: 95,    // Lighthouse score
    maxLCP: 2.5,     // Seconds
    maxFID: 100,     // Milliseconds
    maxCLS: 0.1,     // Score
    maxLoadTime: 2,  // Seconds
  },
  "bundle": {
    javascript: 100,  // KB
    css: 50,         // KB
    images: 500,     // KB
  }
};
```

### Monthly Review

1. **Performance**
   - Check Lighthouse scores
   - Review Core Web Vitals
   - Identify bottlenecks

2. **Traffic**
   - Top pages
   - User behavior
   - Conversion rates

3. **Errors**
   - Error frequency
   - Error types
   - User impact

4. **User Experience**
   - Bounce rate
   - Session duration
   - Mobile vs desktop

## 8. Maintenance Schedule

### Daily
- Monitor Vercel deployments
- Check error logs (Sentry)

### Weekly
- Review traffic trends
- Check performance metrics
- Update analytics dashboards

### Monthly
- Detailed performance review
- User behavior analysis
- Error analysis
- Update content if needed

### Quarterly
- Performance audit
- SEO analysis
- User feedback review
- Plan improvements

## Environment Variables

Add to `.env.local`:

```bash
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Sentry
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
SENTRY_AUTH_TOKEN=xxxxx

# Site URL
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Add to Vercel environment variables:
- Same as above, but for production

## Useful Commands

```bash
# Build with analytics
npm run build

# Test analytics locally
npm run dev

# Check performance locally
npm run analyze

# Generate Lighthouse report
lighthouse https://your-domain.com --output-path=report.html
```

## Troubleshooting

### Google Analytics Not Tracking

1. Check if script loads
   - DevTools → Network → gtag
   - Should see requests to analytics.google.com

2. Disable ad blockers
   - Ad blockers may prevent tracking

3. Check settings
   - Enable tracking in GA
   - Check measurement ID

### Sentry Not Capturing Errors

1. Verify DSN is correct
2. Check network tab for errors
3. Verify source maps are uploaded

### Lighthouse Scores Low

1. Check image optimization
2. Reduce JavaScript bundle
3. Enable caching headers
4. Use CDN for assets

---

## Summary

✅ **Vercel Analytics** - Built-in, requires no setup
✅ **Google Analytics** - Install in 5 minutes
✅ **Sentry** - Optional, for error tracking
⏳ **Lighthouse CI** - Already configured
✅ **Performance Monitoring** - Ready to go

**Next**: Deploy to Vercel, then enable these analytics tools.

**Support**: 
- Vercel: https://vercel.com/docs
- Google Analytics: https://support.google.com/analytics
- Sentry: https://docs.sentry.io
