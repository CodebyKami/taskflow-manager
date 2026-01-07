# 🚀 Deployment Guide - TaskFlow Manager

Complete guide to deploy TaskFlow Manager to various platforms.

---

## 📋 Table of Contents

1. [Vercel Deployment](#vercel-deployment)
2. [Netlify Deployment](#netlify-deployment)
3. [GitHub Pages](#github-pages)
4. [Docker Deployment](#docker-deployment)
5. [Environment Variables](#environment-variables)
6. [Post-Deployment](#post-deployment)

---

## 🌐 Vercel Deployment (Recommended)

### Method 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/CodebyKami/taskflow-manager)

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Method 3: GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Click "Deploy"

### Vercel Configuration

The `vercel.json` file is already configured with:
- SPA routing support
- Asset caching optimization
- Build settings

---

## 🎯 Netlify Deployment

### Method 1: Drag and Drop

1. Build your project:
   ```bash
   npm run build
   ```
2. Go to [netlify.com](https://netlify.com)
3. Drag the `dist` folder to Netlify

### Method 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

### Method 3: GitHub Integration

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Choose your repository
5. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click "Deploy site"

### Netlify Configuration

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

## 📄 GitHub Pages

### Setup

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json`:
   ```json
   {
     "homepage": "https://yourusername.github.io/taskflow-manager",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. Update `vite.config.ts`:
   ```typescript
   export default defineConfig({
     base: '/taskflow-manager/',
     // ... rest of config
   })
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

---

## 🐳 Docker Deployment

### Dockerfile

Create `Dockerfile`:

```dockerfile
# Build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

Create `nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Build and Run

```bash
# Build image
docker build -t taskflow-manager .

# Run container
docker run -p 8080:80 taskflow-manager
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

Run:
```bash
docker-compose up -d
```

---

## 🔐 Environment Variables

### Development

Create `.env`:

```env
VITE_APP_NAME=TaskFlow Manager
VITE_APP_VERSION=2.0.0
VITE_APP_DESCRIPTION=Enterprise Project Management System
```

### Production

Set environment variables in your hosting platform:

**Vercel:**
- Go to Project Settings → Environment Variables
- Add variables

**Netlify:**
- Go to Site Settings → Build & Deploy → Environment
- Add variables

**Docker:**
```bash
docker run -p 8080:80 \
  -e VITE_APP_NAME="TaskFlow Manager" \
  -e VITE_APP_VERSION="2.0.0" \
  taskflow-manager
```

---

## ✅ Post-Deployment Checklist

### 1. Verify Deployment

- [ ] Application loads correctly
- [ ] All routes work (test navigation)
- [ ] Authentication works
- [ ] Data persists in localStorage
- [ ] Responsive design works on mobile
- [ ] No console errors

### 2. Performance Check

- [ ] Run Lighthouse audit
- [ ] Check page load speed
- [ ] Verify asset caching
- [ ] Test on slow 3G connection

### 3. SEO Optimization

- [ ] Verify meta tags
- [ ] Check Open Graph tags
- [ ] Submit sitemap to Google
- [ ] Add robots.txt

### 4. Security

- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] No sensitive data exposed
- [ ] CSP headers set

### 5. Monitoring

- [ ] Setup error tracking (Sentry)
- [ ] Configure analytics (Google Analytics)
- [ ] Setup uptime monitoring
- [ ] Configure alerts

---

## 🔧 Troubleshooting

### Build Fails

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Routes Don't Work (404 on Refresh)

Ensure SPA routing is configured:
- **Vercel**: Check `vercel.json` rewrites
- **Netlify**: Check `netlify.toml` redirects
- **Nginx**: Check `try_files` directive

### Assets Not Loading

Check base URL in `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/', // or '/your-subdirectory/'
})
```

### Environment Variables Not Working

- Prefix with `VITE_`
- Restart dev server after changes
- Rebuild for production

---

## 📊 Performance Optimization

### 1. Enable Compression

**Vercel/Netlify**: Automatic

**Nginx**:
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
```

### 2. CDN Configuration

Use Vercel Edge Network or Netlify CDN for global distribution.

### 3. Image Optimization

```bash
# Install image optimization
npm install --save-dev vite-plugin-imagemin
```

### 4. Code Splitting

Already configured in `vite.config.ts` with manual chunks.

---

## 🌍 Custom Domain

### Vercel

1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

### Netlify

1. Go to Domain Settings
2. Add custom domain
3. Configure DNS:
   ```
   Type: A
   Name: @
   Value: 75.2.60.5
   ```

---

## 📱 Progressive Web App (PWA)

### Add PWA Support

```bash
npm install --save-dev vite-plugin-pwa
```

Update `vite.config.ts`:
```typescript
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'TaskFlow Manager',
        short_name: 'TaskFlow',
        description: 'Enterprise Project Management',
        theme_color: '#3b82f6',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
```

---

## 🎉 Success!

Your TaskFlow Manager is now deployed and ready for production use!

### Next Steps

1. Share the URL with your team
2. Setup monitoring and analytics
3. Configure custom domain
4. Enable PWA features
5. Setup CI/CD pipeline

---

## 📞 Support

Need help? 
- 📧 Email: support@taskflow.com
- 💬 GitHub Issues: [Report Issue](https://github.com/CodebyKami/taskflow-manager/issues)
- 📚 Documentation: [Read Docs](https://github.com/CodebyKami/taskflow-manager)

---

<div align="center">

**Happy Deploying! 🚀**

</div>
