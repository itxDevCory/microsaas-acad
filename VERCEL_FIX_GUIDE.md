# Vercel Deployment Fix Guide

## Issues Fixed ✅

1. **Removed deprecated `experimental.serverActions`** from `next.config.js`
   - This was causing the warning during build
   - Server Actions are now enabled by default in Next.js 14

2. **Made OpenAI client initialization lazy** in `app/api/chat/route.ts`
   - Prevents build-time errors when environment variables aren't available
   - The client is now created only when actually needed (at runtime)

## Next Steps: Add Environment Variables to Vercel

### Step 1: Add OPENAI_API_KEY to Vercel

Run this command in your terminal (you'll be prompted to enter the value):

```bash
cd microsaas-academy
vercel env add OPENAI_API_KEY
```

When prompted:
- **What's the value of OPENAI_API_KEY?** → Paste your OpenAI API key
- **Add to which Environments?** → Select **Production, Preview, and Development** (use spacebar to select all)

### Step 2: Add Other Required Environment Variables (if needed)

Based on your error logs, these variables were removed. Add them back if your app needs them:

```bash
# NextAuth configuration (if using authentication)
vercel env add NEXTAUTH_SECRET
vercel env add NEXTAUTH_URL

# Database (if using)
vercel env add DATABASE_URL

# Stripe (if using payments)
vercel env add STRIPE_SECRET_KEY
vercel env add STRIPE_PUBLISHABLE_KEY
vercel env add STRIPE_WEBHOOK_SECRET

# Resend (if using email)
vercel env add RESEND_API_KEY

# Anthropic (if using Claude)
vercel env add ANTHROPIC_API_KEY
```

### Step 3: Verify Environment Variables

Check what environment variables are currently set:

```bash
vercel env ls
```

### Step 4: Pull Environment Variables Locally (Optional)

To update your local `.env.local` file with the Vercel environment variables:

```bash
vercel env pull .env.local
```

### Step 5: Deploy to Production

Now deploy your fixed code to Vercel:

```bash
vercel --prod
```

## Expected Result

Your deployment should now succeed! You should see:

```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization

✅ Production: https://your-app.vercel.app
```

## Troubleshooting

### If build still fails:

1. **Check environment variables are set:**
   ```bash
   vercel env ls
   ```

2. **Ensure OPENAI_API_KEY is added to Production environment:**
   - Go to https://vercel.com/dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Verify OPENAI_API_KEY exists for Production

3. **Clear build cache and redeploy:**
   ```bash
   vercel --prod --force
   ```

### If you see "OPENAI_API_KEY is not set" error at runtime:

This means the environment variable wasn't added to the correct environment. Make sure you selected "Production" when adding the variable.

## Quick Reference Commands

```bash
# Add environment variable
vercel env add VARIABLE_NAME

# List all environment variables
vercel env ls

# Remove environment variable
vercel env rm VARIABLE_NAME

# Pull environment variables to local
vercel env pull

# Deploy to production
vercel --prod

# Deploy with force (clears cache)
vercel --prod --force
```

## What Changed in the Code?

### `next.config.js`
- ❌ Removed: `experimental.serverActions: true`
- ✅ Why: Server Actions are now default in Next.js 14

### `app/api/chat/route.ts`
- ❌ Before: OpenAI client initialized at module level
- ✅ After: Lazy initialization with `getOpenAIClient()` function
- ✅ Why: Prevents build-time errors when env vars aren't available

## Additional Notes

- The lazy initialization pattern is a best practice for serverless functions
- Environment variables are only available at runtime in Vercel, not during build
- Always add sensitive keys to all environments (Production, Preview, Development)
- Never commit `.env.local` to git (it's already in `.gitignore`)

## Success Checklist

- [ ] Fixed `next.config.js` (deprecated config removed)
- [ ] Fixed `app/api/chat/route.ts` (lazy OpenAI initialization)
- [ ] Added `OPENAI_API_KEY` to Vercel (all environments)
- [ ] Added other required environment variables
- [ ] Deployed to production with `vercel --prod`
- [ ] Verified deployment is successful
- [ ] Tested the application in production

---

**Need help?** Check the Vercel documentation: https://vercel.com/docs/environment-variables
