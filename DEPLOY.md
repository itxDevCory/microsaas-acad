# Deployment Guide - MicroSaaS Academy AI

Multiple deployment options to fit your needs.

## Option 1: Vercel (Recommended - Easiest)

### Why Vercel?
- ✅ Free tier available
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Zero configuration
- ✅ Perfect for Next.js

### Deploy Steps

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel deploy

# Follow prompts:
# - Project name: microsaas-academy
# - Framework: Next.js
# - Build command: (leave default)
# - Output directory: (leave default)
```

### Add Environment Variables

1. Go to: https://vercel.com/dashboard
2. Select your project
3. Go to: Settings → Environment Variables
4. Add:
   - `OPENAI_API_KEY` = your-key-here
   - `NEXTAUTH_SECRET` = generate-random-string
   - `NEXTAUTH_URL` = your-vercel-url

### Production Deploy

```bash
vercel --prod
```

Your app is now live! 🎉

## Option 2: Docker (Self-Hosted)

### Why Docker?
- ✅ Complete control
- ✅ Run anywhere
- ✅ Consistent environment
- ✅ Easy scaling

### Create Dockerfile

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Create docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - NEXTAUTH_URL=${NEXTAUTH_URL}
    volumes:
      - ./data:/app/data
      - ./projects:/app/projects
    restart: unless-stopped
```

### Deploy

```bash
# Build
docker-compose build

# Run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

## Option 3: VPS (DigitalOcean, AWS, etc.)

### Why VPS?
- ✅ Full control
- ✅ Custom domain
- ✅ Can run Ollama for offline mode
- ✅ Cost-effective at scale

### Setup Steps

```bash
# 1. SSH into your VPS
ssh root@your-server-ip

# 2. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# 3. Install PM2 (process manager)
npm install -g pm2

# 4. Clone your repo
git clone your-repo-url
cd microsaas-academy

# 5. Install dependencies
npm install

# 6. Create .env.local
nano .env.local
# Add your environment variables

# 7. Build
npm run build

# 8. Start with PM2
pm2 start npm --name "microsaas-academy" -- start

# 9. Save PM2 config
pm2 save
pm2 startup

# 10. Setup Nginx reverse proxy
apt-get install nginx

# Create Nginx config
nano /etc/nginx/sites-available/microsaas-academy
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
ln -s /etc/nginx/sites-available/microsaas-academy /etc/nginx/sites-enabled/

# Test Nginx config
nginx -t

# Restart Nginx
systemctl restart nginx

# Setup SSL with Let's Encrypt
apt-get install certbot python3-certbot-nginx
certbot --nginx -d your-domain.com
```

## Option 4: Railway

### Why Railway?
- ✅ Simple deployment
- ✅ Free tier
- ✅ GitHub integration
- ✅ Automatic deployments

### Deploy Steps

1. Go to: https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Add environment variables:
   - `OPENAI_API_KEY`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`
6. Deploy!

## Option 5: Netlify

### Why Netlify?
- ✅ Free tier
- ✅ Easy setup
- ✅ Great for static sites
- ✅ Built-in forms

### Deploy Steps

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Production deploy
netlify deploy --prod
```

## Option 6: AWS (Advanced)

### Why AWS?
- ✅ Enterprise-grade
- ✅ Highly scalable
- ✅ Many services
- ✅ Global infrastructure

### Services to Use

- **Amplify**: Easiest, similar to Vercel
- **ECS**: Docker containers
- **EC2**: Full VPS control
- **Lambda**: Serverless

### Amplify Deploy

```bash
# Install Amplify CLI
npm i -g @aws-amplify/cli

# Configure
amplify configure

# Initialize
amplify init

# Add hosting
amplify add hosting

# Publish
amplify publish
```

## Custom Domain Setup

### For Vercel

1. Go to: Project Settings → Domains
2. Add your domain
3. Update DNS records as shown
4. Wait for SSL certificate (automatic)

### For VPS

1. Point A record to your server IP
2. Setup Nginx (see above)
3. Get SSL with Let's Encrypt (see above)

## Environment Variables

Required for all deployments:

```bash
# OpenAI API
OPENAI_API_KEY=sk-your-key-here

# Authentication (if using NextAuth)
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=generate-random-32-char-string

# Optional: Stripe (for payments)
STRIPE_SECRET_KEY=sk_live_your-key
STRIPE_PUBLISHABLE_KEY=pk_live_your-key

# Optional: Database (if using PostgreSQL)
DATABASE_URL=postgresql://user:pass@host:5432/db
```

## Performance Optimization

### 1. Enable Caching

```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

### 2. Use CDN

- Vercel: Built-in
- Cloudflare: Free tier available
- AWS CloudFront: Pay-as-you-go

### 3. Optimize Images

```typescript
// next.config.js
module.exports = {
  images: {
    domains: ['your-domain.com'],
    formats: ['image/avif', 'image/webp'],
  },
};
```

### 4. Enable Compression

```typescript
// next.config.js
module.exports = {
  compress: true,
};
```

## Monitoring

### Vercel Analytics

```bash
npm install @vercel/analytics
```

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Sentry (Error Tracking)

```bash
npm install @sentry/nextjs
```

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

## Backup Strategy

### Database Backups

```bash
# PostgreSQL
pg_dump -U user -d database > backup.sql

# Restore
psql -U user -d database < backup.sql
```

### File Backups

```bash
# Backup data directory
tar -czf backup-$(date +%Y%m%d).tar.gz data/ projects/

# Restore
tar -xzf backup-20240101.tar.gz
```

### Automated Backups

```bash
# Add to crontab
0 2 * * * /path/to/backup-script.sh
```

## Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] API keys not in code
- [ ] Rate limiting enabled
- [ ] CORS configured
- [ ] Security headers set
- [ ] Input validation
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF tokens

## Cost Estimates

### Free Tier (Hobby)
- Vercel: Free
- Railway: $5/month
- Netlify: Free
- **Total: $0-5/month**

### Small Scale (100 users)
- Vercel Pro: $20/month
- Database: $10/month
- OpenAI API: $30/month
- **Total: $60/month**

### Medium Scale (1000 users)
- Vercel Pro: $20/month
- Database: $25/month
- OpenAI API: $200/month
- CDN: $10/month
- **Total: $255/month**

### Large Scale (10k users)
- AWS/GCP: $200/month
- Database: $100/month
- OpenAI API: $1000/month
- CDN: $50/month
- **Total: $1350/month**

## Scaling Strategy

### Phase 1: MVP (0-100 users)
- Deploy to Vercel
- Use SQLite
- Single region

### Phase 2: Growth (100-1k users)
- Migrate to PostgreSQL
- Add caching (Redis)
- Enable CDN

### Phase 3: Scale (1k-10k users)
- Multi-region deployment
- Load balancing
- Database replication

### Phase 4: Enterprise (10k+ users)
- Kubernetes
- Microservices
- Auto-scaling

## Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Deployment Fails
- Check environment variables
- Verify API keys
- Check logs: `vercel logs` or `docker logs`

### Performance Issues
- Enable caching
- Optimize images
- Use CDN
- Check database queries

## Next Steps

1. Choose deployment option
2. Deploy to staging
3. Test thoroughly
4. Deploy to production
5. Setup monitoring
6. Configure backups
7. Add custom domain
8. Enable SSL
9. Optimize performance
10. Scale as needed

Ready to deploy? Choose your option and follow the steps above! 🚀
