# ⚡ Vercel Deployment - Quick Reference

## 🎯 THE ANSWER

### Framework Preset में क्या select करें?

```
✅ CORRECT:  Vite
❌ WRONG:    React
```

---

## 📝 Vercel Settings (Copy-Paste Ready)

```
Framework Preset:    Vite
Build Command:       npm run build
Output Directory:    dist
Install Command:     npm install
Root Directory:      ./
Node Version:        18.x (or latest)
```

---

## 🔧 3 Important Files

### 1. package.json (scripts)
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

### 2. vercel.json (root folder)
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 3. .gitignore
```
node_modules
dist
.env
.vercel
```

---

## ⚡ Ultra Quick Deploy

```bash
# Test build
npm run build

# If successful
git add .
git commit -m "Deploy to Vercel"
git push

# Then on Vercel:
# 1. Import repo
# 2. Select "Vite" framework
# 3. Click Deploy
# Done! ✅
```

---

## 🐛 Common Errors & Quick Fixes

| Error | Solution |
|-------|----------|
| Build Failed | Check Framework = Vite (not React) |
| 404 on routes | Add vercel.json with rewrites |
| Module not found | Run `npm install` locally first |
| TypeScript error | Run `npm run build` locally to debug |

---

## ✅ Pre-Deploy Checklist

Quick check before deploying:

```bash
# 1. Test build locally
npm run build
# Should see: ✓ built in X.XXs

# 2. Check files exist
ls dist/
# Should see: index.html, assets/

# 3. Check vercel.json exists
ls vercel.json
# Should exist ✅

# 4. Push to GitHub
git status
git push

# 5. Deploy on Vercel
# Framework = Vite ✅
```

---

## 🎯 The One Thing to Remember

```
╔═══════════════════════════════╗
║  FRAMEWORK PRESET = VITE  ✅  ║
║  NOT React ❌                 ║
╚═══════════════════════════════╝
```

---

## 📱 After Deployment Test

```
✓ Open URL
✓ Click around
✓ Test image upload
✓ Switch language
✓ Check mobile view
```

---

## 🚀 Deploy URL

After successful deployment:
```
https://your-project-name.vercel.app
```

Custom domain:
```
Settings → Domains → Add Domain
```

---

**That's it! Framework = Vite, Build = Success! 🎉**
