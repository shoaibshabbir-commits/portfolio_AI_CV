# Muhammad Shoaib — AI Engineer Portfolio

A modern, premium, responsive portfolio website built with **HTML**, **CSS**, and **JavaScript**. Designed for AI engineers with dark/light mode, glassmorphism effects, and GitHub Pages deployment.

## Features

- Modern AI-themed UI with dark/light mode toggle
- CSS animations and smooth scroll transitions
- Glassmorphism design with particle background (canvas)
- Fully responsive (desktop, tablet, mobile)
- SEO optimized with meta tags and JSON-LD
- Interactive skill proficiency charts
- GitHub repositories integration
- Contact form (opens email client)
- Visitor counter, scroll progress indicator
- No build step required — pure static files

## Project Structure

```
├── index.html          # Main page (all sections)
├── css/
│   └── styles.css      # All styles
├── js/
│   ├── main.js         # Theme, nav, animations, GitHub API, contact
│   └── particles.js    # Particle background canvas
├── favicon.svg
├── resume.pdf          # Add your resume here
├── robots.txt
├── sitemap.xml
└── .github/workflows/
    └── deploy.yml      # GitHub Pages deployment
```

## Getting Started

No installation required. Open `index.html` in a browser, or use a local server:

```bash
# Python
python -m http.server 8000

# Node (if installed)
npx serve .
```

Visit `http://localhost:8000`

## Customization

Edit `index.html` directly for content updates. Styles are in `css/styles.css` and interactivity in `js/main.js`.

## Add Your Resume

Place your PDF at `resume.pdf` in the project root.

## Deploy to GitHub Pages

1. Push to GitHub repository `Github-portfolio`
2. Go to **Settings → Pages → Source → GitHub Actions**
3. Site live at: **https://shoaib11223344.github.io/Github-portfolio/**

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full instructions.

## License

MIT
