# GitHub Pages Deployment Guide

This portfolio is a **pure static site** — no build step required.

**Live URL:** https://shoaib11223344.github.io/Github-portfolio/

## Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Portfolio website - HTML CSS JS"
git branch -M main
git remote add origin https://github.com/shoaib11223344/Github-portfolio.git
git push -u origin main
```

## Step 2: Enable GitHub Pages

1. Open your repository on GitHub
2. Go to **Settings → Pages**
3. Under **Build and deployment**, set **Source** to **GitHub Actions**
4. Push to `main` — the workflow deploys automatically

## Step 3: Add Resume

Place your PDF at the project root as `resume.pdf`.

## Local Preview

```bash
python -m http.server 8000
# Open http://localhost:8000
```

## File Overview

| File | Purpose |
|------|---------|
| `index.html` | All page content and sections |
| `css/styles.css` | Styling, dark mode, responsive layout |
| `js/main.js` | Theme toggle, scroll effects, GitHub repos |
| `js/particles.js` | Animated particle background |

## Troubleshooting

| Issue | Solution |
|-------|----------|
| GitHub repos not loading | GitHub API rate limit — wait or retry |
| Resume download 404 | Add `resume.pdf` to project root |
| Theme not saving | Enable localStorage in browser |

## Custom Domain (Optional)

1. Add `CNAME` file with your domain name
2. Configure DNS with your domain provider
