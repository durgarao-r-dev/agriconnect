# Deploy AgriConnect to GitHub Pages

Target URL example: **https://durgarao-r-dev.github.io/agriconnect/**

## 1. Upload
Put **all files from this folder** at the **root** of the GitHub repo `agriconnect`
(not inside another subfolder).

Include:
- All `.html` pages
- All `.css` and `.js` files at root
- `manifest.json`, `sw.js`, `.nojekyll`
- `assets/icons/`

## 2. Pages settings
1. Repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** (or **master**) · Folder: **/ (root)**
4. Save

## 3. Open
https://durgarao-r-dev.github.io/agriconnect/

If CSS/JS 404, confirm files are at repo root and paths in HTML are:
- `href="style.css"` (not `css/style.css`)
- `src="main.js"` (not `js/main.js`)

## 4. After path changes
Hard-refresh the browser (or clear site data) so the new service worker (`agriconnect-portal-v2`) can cache the flat paths.
