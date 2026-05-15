# snapcss — Deployment Guide

---

## Part 1 — Publish snapcss to npm

### Prerequisites

- Node.js ≥ 18
- An npm account at [npmjs.com](https://www.npmjs.com)
- Logged in locally: `npm login`

---

### Step 1 — Decide the package name

**Option A — Plain public name** (e.g. `snapcss`)
The name must not already be taken on npm. Check first:
```bash
npm info snapcss
```
If it returns "404 Not Found", the name is available.

**Option B — Scoped name** (e.g. `@yourusername/snapcss`)
Scoped packages are always available under your username. Update `package.json`:
```json
{
  "name": "@yourusername/snapcss"
}
```
Scoped packages default to private — add `"publishConfig": { "access": "public" }` to publish publicly:
```json
{
  "name": "@yourusername/snapcss",
  "publishConfig": { "access": "public" }
}
```

---

### Step 2 — Fill in package metadata

Open `package.json` and complete the empty fields:

```json
{
  "author": "Your Name <your@email.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/snapcss"
  },
  "homepage": "https://your-docs-site.netlify.app",
  "bugs": {
    "url": "https://github.com/yourusername/snapcss/issues"
  }
}
```

---

### Step 3 — Set the version

Current version is `1.0.0`. Adjust if needed:

```bash
# Stable first release
npm version 1.0.0

# Early / beta release
npm version 0.1.0

# Bump patch/minor/major later
npm version patch   # 1.0.0 → 1.0.1
npm version minor   # 1.0.0 → 1.1.0
npm version major   # 1.0.0 → 2.0.0
```

---

### Step 4 — Add a `.npmignore` file

Create `.npmignore` in the root to keep the published package lean:

```
# Source & tests
packages/
tests/
playground/
docs-site/

# Config files
tsup.config.ts
tsconfig.json
vitest.config.ts
.eslintrc.json
.prettierrc

# Docs & misc
plan.md
prd.md
run.md
deploy.md
*.md

# Misc
node_modules/
.git/
```

Only `dist/`, `package.json`, `LICENSE`, and `README.md` will be published.

---

### Step 5 — Create a README.md (required for npm page)

npm displays the root `README.md` as the package page. Create one with at minimum:

```markdown
# snapcss

A lightweight utility-first runtime CSS engine. Scans the DOM for `snap-*` classes and applies them as inline styles — no build step needed.

## Install
\`\`\`bash
npm install snapcss
\`\`\`

## Usage
\`\`\`html
<script src="https://cdn.jsdelivr.net/npm/snapcss/dist/index.js"></script>
\`\`\`

Full docs: https://your-docs-site.netlify.app
```

---

### Step 6 — Build and dry-run

Always do a dry-run before publishing to see exactly what files will be included:

```bash
# Build the dist
npm run build

# Preview what will be published (no actual publish)
npm pack --dry-run
```

Check the output — it should list only `dist/`, `package.json`, `LICENSE`, and `README.md`.

---

### Step 7 — Publish

```bash
# Log in if not already
npm login

# Publish
npm publish

# Scoped public package
npm publish --access public
```

---

### Step 8 — Verify

```bash
npm info snapcss
```

The package is now installable by anyone:
```bash
npm install snapcss
```

---

### Updating the package later

```bash
# Bump the version
npm version patch   # or minor / major

# Rebuild
npm run build

# Publish the new version
npm publish
```

---

---

## Part 2 — Deploy docs site to Netlify

The docs site is a Vite + React app located in `docs-site/`.

### Build command: `npm run build`
### Publish directory: `docs-site/dist`

---

### Option A — Netlify CLI (recommended)

**Install the CLI once:**
```bash
npm install -g netlify-cli
```

**Login:**
```bash
netlify login
```

**Build the site:**
```bash
cd docs-site
npm run build
```

**Deploy a preview (no live URL yet):**
```bash
netlify deploy --dir=dist
```

**Deploy to production (public URL):**
```bash
netlify deploy --dir=dist --prod
```

Netlify will print a live URL like `https://snapcss-docs.netlify.app`.

---

### Option B — Drag and Drop (no CLI needed)

1. Build the site:
   ```bash
   cd docs-site
   npm run build
   ```
2. Go to [app.netlify.com](https://app.netlify.com)
3. Drag the `docs-site/dist/` folder onto the deploy drop zone.
4. Netlify assigns a URL immediately.

---

### Option C — GitHub + Netlify (auto-deploy on push)

1. Push the repo to GitHub.
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import from Git**.
3. Select your GitHub repo.
4. Set build settings:
   | Setting | Value |
   |---|---|
   | Base directory | `docs-site` |
   | Build command | `npm run build` |
   | Publish directory | `docs-site/dist` |
5. Click **Deploy site**.

Every `git push` to your main branch will trigger a new deploy automatically.

---

### Fix: SPA routing on Netlify

Because the docs site uses React Router (`/docs/:slug`), Netlify needs to redirect all routes to `index.html`. Create this file:

**`docs-site/public/_redirects`**
```
/*  /index.html  200
```

This file is automatically copied to `dist/` by Vite during build. Without it, refreshing a docs page (e.g. `/docs/padding`) returns a 404.

---

### Custom domain (optional)

1. In the Netlify dashboard → **Domain settings** → **Add custom domain**.
2. Point your DNS to Netlify's nameservers or add a CNAME record.
3. Netlify provisions a free SSL certificate automatically via Let's Encrypt.

---

### Environment variables (if needed later)

```bash
# Via CLI
netlify env:set VITE_API_URL https://api.example.com

# Or in the Netlify dashboard → Site settings → Environment variables
```

Access in the app with `import.meta.env.VITE_API_URL`.

---

## Quick Reference

| Task | Command |
|---|---|
| Build library | `npm run build` |
| Dry-run npm pack | `npm pack --dry-run` |
| Publish to npm | `npm publish` |
| Build docs site | `cd docs-site && npm run build` |
| Deploy docs (preview) | `netlify deploy --dir=docs-site/dist` |
| Deploy docs (production) | `netlify deploy --dir=docs-site/dist --prod` |
| Bump patch version | `npm version patch` |
