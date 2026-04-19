# LendingPad — Web UI Engineer Sample Task

A user management table built from a Figma mockup, using semantic HTML, SCSS (BEM), a custom-generated icon font, and light vanilla JavaScript. Bundled with Vite.

## Prerequisites

- Node.js 18+ and npm.

## Scripts

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies. |
| `npm run dev` | Start the Vite dev server at `http://localhost:5173`. |
| `npm run build` | Produce a static build in `dist/`. |
| `npm run preview` | Serve the contents of `dist/` locally. |
| `npm run icons` | Regenerate the icon font from the SVGs in `src/assets/svg/`. |

## Project structure

```
.
├── src/
│   ├── index.html            Page markup
│   ├── js/                   Light vanilla JS (dropdowns, select-all, sort toggle)
│   ├── assets/
│   │   └── svg/              Source icons (input to the icon-font pipeline)
│   ├── public/
│   │   └── fonts/icons/      Generated icon font (WOFF2/WOFF) served from the site root
│   └── styles/
│       ├── main.scss         Entry stylesheet
│       ├── tokens/           Design tokens (colors, type, spacing, radii, shadows, breakpoints)
│       ├── base/             Reset + element defaults
│       ├── themes/           Light theme — tokens exposed as CSS custom properties
│       ├── utilities/        Icon font + helpers
│       └── components/       One partial per UI component, BEM naming
├── vite.config.js
├── fantasticon.config.cjs    Icon font generator config
└── svgo.config.cjs           SVG optimization config
```

## Conventions

- **Naming**: [BEM](https://getbem.com/) — `.block`, `.block__element`, `.block--modifier`.
- **Tokens**: SCSS variables are exposed as CSS custom properties on `:root` inside a theme layer so themes can be swapped at runtime.
- **Icons**: All icons are served via a generated icon font. Add a new icon by dropping an optimized SVG into `src/assets/svg/` and running `npm run icons`.

## Browser support

Last 2 versions of Chrome, Firefox, Safari, and Edge.
