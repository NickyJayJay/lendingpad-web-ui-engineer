// Reads the codepoints JSON emitted by fantasticon and writes a clean, modern
// Sass partial that:
//   - declares @font-face with absolute URLs served from Vite's public/ dir
//   - defines the `.icon` base class
//   - emits `.icon--{name}::before { content: … }` BEM modifiers
//
// Run via `npm run icons` (after `fantasticon`).

const fs = require('node:fs');
const path = require('node:path');

const publicFontDir = path.resolve(__dirname, '..', 'src', 'public', 'fonts', 'icons');
const jsonPath = path.join(publicFontDir, 'icons.json');
const scssPath = path.resolve(__dirname, '..', 'src', 'styles', 'utilities', '_icons.scss');

const codepoints = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const entries = Object.entries(codepoints)
  .map(([name, cp]) => `  "${name}": "\\${cp.toString(16)}"`)
  .join(',\n');

const scss = `// Auto-generated from src/public/fonts/icons/icons.json — do not edit.
// Regenerate via \`npm run icons\` after updating src/assets/svg/.

@font-face {
  font-family: "icons";
  src:
    url("/fonts/icons/icons.woff2") format("woff2"),
    url("/fonts/icons/icons.woff") format("woff");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

$icons-map: (
${entries}
);

.icon {
  display: inline-block;
  font-family: "icons";
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  line-height: 1;
  text-transform: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@each $name, $codepoint in $icons-map {
  .icon--#{$name}::before {
    content: $codepoint;
  }
}
`;

fs.writeFileSync(scssPath, scss);
console.log(`\u2713 Wrote ${path.relative(process.cwd(), scssPath)} (${Object.keys(codepoints).length} glyphs)`);
