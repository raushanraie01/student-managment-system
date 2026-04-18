# Student Management Portal - Deployment Guide

## 🚀 Production Deployment Guide

This comprehensive guide will walk you through deploying the Student Management Portal to production.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Database Setup](#database-setup)
3. [Backend Deployment](#backend-deployment)
4. [Frontend Deployment](#frontend-deployment)
5. [Environment Configuration](#environment-configuration)
6. [Post-Deployment](#post-deployment)
7. [Monitoring & Maintenance](#monitoring--maintenance)

## Prerequisites

Before deploying, ensure you have:

- [x] Git repository set up
- [x] Accounts created on deployment platforms
- [x] Domain names configured (optional)
- [x] Email service configured
- [x] SSL certificates (handled by platforms)

## Database Setup

### Option 1: Neon DB (Recommended - Free Tier Available)

1. **Create Account**
   - Visit https://neon.tech
   - Sign up with GitHub/Google

2. **Create Project**
   ```
   Project Name: student-management-prod
   Region: Choose closest to your users
   PostgreSQL Version: 16
   ```

3. **Get Connection String**
   ```
   Format: postgresql://user:password@host/database?sslmode=require
   ```

4. **Configure Database**
   ```bash
   # Update backend/.env
   DATABASE_URL="your-neon-connection-string"
   ```

### Option 2: Supabase (Alternative)

1. Create project at https://supabase.com
2. Navigate to Settings > Database
3. Copy Connection String (URI format)
4. Add to environment variables

### Option 3: Railway PostgreSQL

```bash
railway add --plugin postgresql
railway variables
```

## Backend Deployment

### Option A: Deploy to Render

#### 1. Create Web Service

1. Go to https://render.com
2. Click "New +" > "Web Service"
3. Connect your GitHub repository
4. Configure:

**Build Settings:**
```
Name: student-management-api
Region: Oregon (or closest)
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install && npx prisma generate && npm run build
Start Command: npm run start:prod
```

**Instance Type:**
```
Free or Starter ($7/month recommended)
```

#### 2. Environment Variables

Add in Render Dashboard:

```env
NODE_ENV=production
DATABASE_URL=<your-neon-connection-string>
JWT_ACCESS_SECRET=<generate-32-char-secret>
JWT_REFRESH_SECRET=<generate-32-char-secret>
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d
FRONTEND_URL=https://your-frontend-url.vercel.app
CORS_ORIGIN=https://your-frontend-url.vercel.app
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASSWORD=<gmail-app-password>
MAIL_FROM=Student Management Portal <noreply@yourdomain.com>
PORT=3001
```

#### 3. Deploy

Click "Create Web Service" - Render will automatically deploy.

**Your API will be available at:**
```
https://your-service-name.onrender.com
```

### Option B: Deploy to Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
cd backend
railway init

# Add PostgreSQL
railway add --plugin postgresql

# Deploy
railway up

# Get URL
railway domain
```

### Option C: Deploy with Docker

```bash
# Build image
docker build -t student-management-backend ./backend

# Push to registry
docker tag student-management-backend your-registry/student-management-backend
docker push your-registry/student-management-backend

# Deploy to your server
docker run -d -p 3001:3001 --env-file .env your-registry/student-management-backend
```

## Frontend Deployment

### Deploy to Vercel (Recommended)

#### 1. Install Vercel CLI

```bash
npm i -g vercel
```

#### 2. Deploy from Frontend Directory

```bash
cd frontend
vercel login
vercel
```

Follow the prompts:
```
? Set up and deploy "~/StudentManagement/frontend"? Y
? Which scope? Your Account
? Link to existing project? N
? What's your project's name? student-management-portal
? In which directory is your code located? ./
? Want to override the settings? N
```

#### 3. Configure Environment Variables

In Vercel Dashboard:
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api
```

#### 4. Deploy to Production

```bash
vercel --prod
```

**Your app will be available at:**
```
https://student-management-portal.vercel.app
```

### Alternative: Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build
cd frontend
npm run build

# Deploy
netlify deploy --prod
```

## Environment Configuration

### Generate Secure Secrets

```bash
# For JWT secrets (use different values for each)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Gmail App Password Setup

1. Go to Google Account Settings
2. Security > 2-Step Verification (enable if not already)
3. App Passwords > Generate new password
4. Use generated password in `MAIL_PASSWORD`

### Complete Environment Variables Checklist

**Backend (.env):**
```env
✓ NODE_ENV=production
✓ DATABASE_URL=<neon-or-supabase-url>
✓ JWT_ACCESS_SECRET=<32-char-random>
✓ JWT_REFRESH_SECRET=<32-char-random>
✓ JWT_ACCESS_EXPIRATION=15m
✓ JWT_REFRESH_EXPIRATION=7d
✓ FRONTEND_URL=<vercel-url>
✓ CORS_ORIGIN=<vercel-url>
✓ MAIL_HOST=smtp.gmail.com
✓ MAIL_PORT=587
✓ MAIL_USER=<your-email>
✓ MAIL_PASSWORD=<app-password>
✓ MAIL_FROM=<sender-name-email>
✓ PORT=3001
```

**Frontend (.env.local):**
```env
✓ NEXT_PUBLIC_API_URL=<render-or-railway-url>/api
```

## Post-Deployment

### 1. Run Database Migrations

```bash
# Connect to your deployed backend
# SSH or use Railway/Render shell

cd backend
npx prisma migrate deploy
npx prisma generate
```

### 2. Seed Initial Data

```bash
npm run prisma:seed
```

### 3. Verify Deployment

**Backend Health Check:**
```bash
curl https://your-backend-url.onrender.com/api
```

**Frontend:**
```bash
curl https://your-frontend-url.vercel.app
```

**API Documentation:**
```
https://your-backend-url.onrender.com/api/docs
```

### 4. Test Critical Flows

- [ ] User registration
- [ ] User login
- [ ] Password reset email
- [ ] Admin dashboard access
- [ ] Student creation
- [ ] Mark entry
- [ ] Attendance marking

## Monitoring & Maintenance

### Setup Monitoring

**1. Uptime Monitoring**
- Use Uptime Robot: https://uptimerobot.com
- Monitor both frontend and backend
- Set up email/SMS alerts

**2. Error Tracking**
- Sentry: https://sentry.io
- Add to both backend and frontend

**3. Analytics**
- Google Analytics for frontend
- Custom logging for backend

### Regular Maintenance Tasks

**Weekly:**
- Check error logs
- Monitor database size
- Review API response times

**Monthly:**
- Update dependencies
- Review security advisories
- Backup database
- Check disk usage

**Quarterly:**
- Performance audit
- Security audit
- Update documentation

### Backup Strategy

**Database Backups:**
```bash
# Automated with Neon/Supabase
# Or manual backup:
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql
```

**Code Backups:**
- Git repository (primary)
- GitHub backup to another service

### Scaling Considerations

**When to Scale:**
- Response time > 500ms consistently
- CPU usage > 80%
- Memory usage > 80%
- Database connections maxed out

**Scaling Options:**
1. Upgrade Render/Railway plan
2. Enable caching (Redis)
3. Database connection pooling
4. CDN for static assets
5. Load balancing for multiple instances

## Custom Domain Setup

### Frontend (Vercel)

1. Go to Project Settings > Domains
2. Add your domain: `app.yourdomain.com`
3. Configure DNS:
```
Type: CNAME
Name: app
Value: cname.vercel-dns.com
```

### Backend (Render)

1. Go to Service Settings > Custom Domains
2. Add domain: `api.yourdomain.com`
3. Configure DNS:
```
Type: CNAME
Name: api
Value: your-service.onrender.com
```

## SSL/HTTPS

Both Vercel and Render automatically provision SSL certificates via Let's Encrypt. No manual configuration needed.

## Troubleshooting

### Common Issues

**1. Database Connection Failed**
```
Solution: Check DATABASE_URL format, ensure IP whitelist includes 0.0.0.0/0
```

**2. CORS Errors**
```
Solution: Verify CORS_ORIGIN matches frontend URL exactly
```

**3. Email Not Sending**
```
Solution: Check MAIL_PASSWORD is App Password, not regular password
```

**4. JWT Token Invalid**
```
Solution: Ensure JWT secrets are the same across all backend instances
```

**5. Build Failures**
```
Solution: Check node version matches locally, verify all dependencies installed
```

### Getting Help

- Check logs in Render/Vercel dashboard
- Review GitHub Issues
- Contact support for your deployment platform

## Cost Estimates

### Free Tier (Hobby Projects)
- **Database**: Neon Free (512 MB)
- **Backend**: Render Free (sleeps after 15min inactivity)
- **Frontend**: Vercel Free (unlimited)
- **Total**: $0/month

### Production Tier (Recommended)
- **Database**: Neon Pro ($19/month)
- **Backend**: Render Starter ($7/month)
- **Frontend**: Vercel Pro ($20/month)
- **Total**: $46/month

### Enterprise Tier
- **Database**: Neon Scale ($69/month)
- **Backend**: Render Standard ($25/month)
- **Frontend**: Vercel Pro ($20/month)
- **CDN**: Cloudflare Pro ($20/month)
- **Total**: $134/month

## Security Checklist

- [ ] All environment variables set
- [ ] Strong JWT secrets (32+ characters)
- [ ] HTTPS enabled (automatic)
- [ ] CORS configured correctly
- [ ] Rate limiting enabled
- [ ] SQL injection protection (Prisma handles this)
- [ ] XSS protection (React handles this)
- [ ] Password hashing (bcrypt)
- [ ] Email verification enabled
- [ ] Activity logging enabled

## Next Steps

After successful deployment:

1. Update README with live URLs
2. Create user documentation
3. Setup monitoring dashboards
4. Plan regular maintenance schedule
5. Create disaster recovery plan

---

**Deployment Complete! 🎉**

Your Student Management Portal is now live and ready for production use.
