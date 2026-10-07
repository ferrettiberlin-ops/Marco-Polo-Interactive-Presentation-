# The Long Way East

A static, GitHub Pages-ready base template for an interactive Marco Polo story and cartography experience.

## Run locally

```bash
npm install
npm run dev
```

## Publish on GitHub Pages

1. Create or open the Marco Polo repository on GitHub.
2. Add this folder as the repository contents and push the `main` branch.
3. In **Settings > Pages**, select **GitHub Actions** as the source.

The workflow in `.github/workflows/deploy.yml` builds the Vite site and deploys `dist` automatically on every push to `main`.

The site uses no runtime API, map provider, or hosted asset dependency. The map surface is intentionally a local visual placeholder for the real cartographic data and story content that will be added next.

## Audience reference

Each route chapter includes a brief quotation from Nigel Cliff's 2015 translation of
*The Travels of Marco Polo*, followed by a presentation translation, a plain-language
summary, and a historical note. The site intentionally does not reproduce complete
copyrighted passages; use the supplied book or speaker notes for extended reading.