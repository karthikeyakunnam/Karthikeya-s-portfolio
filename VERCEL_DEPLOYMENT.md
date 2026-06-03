# Vercel Deployment Guide

## Pre-Deployment Checklist

✅ Dependencies installed
✅ Development server running successfully
✅ Config warnings resolved
⏳ Next: Deploy to Vercel

## Step 1: Prepare for Deployment

### Build Verification

```bash
# Test production build locally
npm run build

# Start production server
npm start
```

### Git Setup

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: GenAI Engineer Portfolio"

# Rename branch to main if needed
git branch -M main

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/karthikeya-portfolio.git

# Push to GitHub
git push -u origin main
```

## Step 2: Connect to Vercel

### Option A: Using Vercel Web Dashboard (Recommended)

1. **Visit Vercel**
   - Go to https://vercel.com/new
   - Sign in with GitHub account

2. **Select Repository**
   - Choose your GitHub repository
   - Authorize Vercel

3. **Configure Project**
   - **Project Name**: karthikeya-portfolio
   - **Framework**: Next.js
   - **Root Directory**: ./ (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

4. **Environment Variables**
   - Leave empty for now (not required)
   - Can add later: `NEXT_PUBLIC_SITE_URL`

5. **Click Deploy**
   - Vercel automatically builds
   - Deploy to production

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Navigate to project
cd "/Users/karthikeyaunnam/Karthikeya's Portfolio"

# Deploy
vercel

# Follow the prompts:
# - Link to existing project? No
# - Set up and deploy? Yes
# - Select project name: karthikeya-portfolio
# - Scope: Your personal account

# For production deployment
vercel --prod
```

## Step 3: Add Custom Domain (Optional)

### If you own a domain:

1. **In Vercel Dashboard**
   - Go to Settings → Domains
   - Click "Add Domain"
   - Enter your domain (e.g., karthikeya.dev)

2. **Update DNS**
   - Get CNAME value from Vercel
   - Update DNS provider (GoDaddy, Namecheap, etc.)
   - Add CNAME record pointing to Vercel

3. **Verify**
   - Wait 24-48 hours for propagation
   - SSL certificate auto-issued

### Example DNS Configuration

```
Type:  CNAME
Name:  @ (or leave blank for root)
Value: cname.vercel-dns.com.
TTL:   3600
```

## Step 4: Verify Deployment

### Check Deployment Status

```bash
# View deployments
vercel ls

# Check build logs
vercel logs

# Open in browser
vercel env pull  # Pull environment
open https://karthikeya-portfolio.vercel.app
```

### Run Lighthouse Audit

1. **Open Site**
   - https://your-domain.vercel.app

2. **Run Chrome DevTools Audit**
   - Open DevTools (F12)
   - Go to Lighthouse tab
   - Click "Analyze"

3. **Verify Scores**
   - Performance: ≥ 95
   - Accessibility: ≥ 95
   - Best Practices: ≥ 90
   - SEO: ≥ 95

### Test Mobile

- Open on mobile phone
- Check responsive design
- Test navigation
- Verify forms work

## Step 5: Set Up Automatic Deployments

### GitHub Integration (Automatic)

Vercel automatically deploys when you:
- Push to main branch
- Create pull requests

### Preview Deployments

- Every pull request gets a preview URL
- Share with team for review
- Automatic cleanup after merge

### Production Deployment

```bash
# Make changes locally
git checkout -b feature/your-feature

# Commit changes
git commit -am "Add new feature"

# Create pull request
git push origin feature/your-feature

# After review, merge to main
# Vercel automatically deploys to production
```

## Step 6: Monitor Performance

### Vercel Analytics

1. **Enable in Dashboard**
   - Settings → Analytics
   - Web Vitals: Enabled

2. **Track Metrics**
   - Page load time
   - Web Vitals scores
   - Error rates
   - Visitor data

### Google Analytics (Optional)

```bash
# Install GA package
npm install next-ga

# Add to app/layout.tsx
import GA from 'next-ga';

export default function RootLayout({children}) {
  return (
    <>
      <GA id="G-XXXXXXXX" />
      {children}
    </>
  );
}
```

## Step 7: Continuous Integration

### GitHub Actions

The project includes `.github/workflows/ci.yml` that:
- Runs on every push
- Tests TypeScript types
- Runs linting
- Builds the project

View results in GitHub → Actions tab

### Manual Testing

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build
npm run build

# Unit tests (if added)
npm run test
```

## Troubleshooting

### Build Fails

1. **Check logs**
   - Vercel dashboard → Deployments → Failed build → View build logs

2. **Common issues**
   - Missing environment variables
   - TypeScript errors
   - Image optimization errors

3. **Local testing**
   ```bash
   npm run build
   npm start
   ```

### Slow Performance

1. **Check Lighthouse**
   - Run audit on production URL
   - Identify bottlenecks

2. **Optimize images**
   - Compress larger images
   - Use next/image component

3. **Check bundle size**
   ```bash
   npm run analyze
   ```

### Domain Issues

1. **DNS not resolving**
   - Wait 24-48 hours for propagation
   - Check DNS records in provider

2. **SSL certificate error**
   - Wait for auto-issuance (~5 mins)
   - Force refresh browser cache

## Rollback

If something goes wrong:

```bash
# View deployment history
vercel ls

# View specific deployment
vercel env pull --yes

# Promote previous deployment to production
vercel promote <deployment-url>
```

## Next Steps

1. ✅ Deploy to Vercel
2. ⏳ Set up analytics (Google Analytics, Vercel Analytics)
3. ⏳ Configure monitoring (Sentry for errors)
4. ⏳ Set up email notifications
5. ⏳ Regular content updates

---

**Deployment Summary**

| Step | Status | Time |
|------|--------|------|
| GitHub setup | ⏳ TODO | 5 min |
| Vercel connection | ⏳ TODO | 2 min |
| Initial deploy | ⏳ TODO | 1 min |
| Domain setup | ⏳ TODO | 10 min |
| Performance verification | ⏳ TODO | 5 min |

**Total Time**: ~23 minutes

**Support**: https://vercel.com/docs
