# AgriConnect Portal

Static Smart Agriculture & Farmer Management Portal (GitHub Pages ready).

**Live (example):** https://durgarao-r-dev.github.io/agriconnect/

## Structure (flat root)

```
agriconnect/
├── index.html
├── login.html
├── register.html
├── farmer-dashboard.html
├── admin-dashboard.html
├── style.css
├── dashboard.css
├── auth.css
├── agri-portal-background.css
├── main.js
├── data.js
├── dashboard-farmer.js
├── dashboard-admin.js
├── soil-data.js
├── soil-intelligence.js
├── manifest.json
├── sw.js
├── .nojekyll
└── assets/icons/
```

All CSS and JS live in the project root (no `css/` or `js/` folders).

## Features
- Home, Login, Register (demo auth)
- Farmer dashboard: Soil Intelligence, rates, produce listings
- Admin dashboard: rates, crops, farmer activity, soil reference
- PWA + basic offline cache

## Deploy to GitHub Pages
See **DEPLOY-GITHUB.md**. Upload all files in this folder to the **root** of repo `agriconnect`.

## Demo login
Any non-empty ID + password → Farmer or Admin tab.
