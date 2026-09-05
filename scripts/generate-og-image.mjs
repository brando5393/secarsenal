// One-off generator for public/og-image.png (1200x630), the social-
// preview image used by Open Graph/Twitter Card tags (Discord, Slack,
// X, etc.). Not part of any build step — rerun manually
// (`node scripts/generate-og-image.mjs`) if the branding changes.
import { writeFileSync } from 'node:fs';
import sharp from 'sharp';

const WIDTH = 1200;
const HEIGHT = 630;

// Deterministic pseudo-random binary digits for the background texture,
// matching the header/footer's binary-digit motif (see global.css).
function binaryRow(seed, length) {
  let s = seed;
  let out = '';
  for (let i = 0; i < length; i++) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    out += s % 2;
  }
  return out;
}

const rows = Array.from({ length: 9 }, (_, i) =>
  Array.from({ length: 6 }, () => binaryRow(i * 97 + 13, 8)).join(' ')
);

const binaryTexture = rows
  .map(
    (row, i) =>
      `<text x="${i % 2 === 0 ? 0 : 40}" y="${70 * i + 60}" font-family="JetBrains Mono, monospace" font-size="22" fill="#34d399" fill-opacity="0.08">${row}</text>`
  )
  .join('\n');

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#030712"/>
  ${binaryTexture}
  <rect x="0" y="0" width="${WIDTH}" height="${HEIGHT}" fill="url(#vignette)"/>
  <defs>
    <radialGradient id="vignette" cx="50%" cy="45%" r="75%">
      <stop offset="0%" stop-color="#030712" stop-opacity="0"/>
      <stop offset="100%" stop-color="#030712" stop-opacity="0.65"/>
    </radialGradient>
  </defs>

  <!-- Shield logo, scaled up from public/logo.svg -->
  <g transform="translate(120, 175) scale(4.4)">
    <path d="M32 4 L56 13 V30 C56 45 46 56 32 60 C18 56 8 45 8 30 V13 Z"
          fill="#0f172a" stroke="#34d399" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M22 26 L30 33 L22 40" stroke="#34d399" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <line x1="33" y1="40" x2="43" y2="40" stroke="#34d399" stroke-width="3.5" stroke-linecap="round"/>
  </g>

  <text x="400" y="300" font-family="Arial, sans-serif" font-size="88" font-weight="700" fill="#ffffff">SecArsenal</text>
  <text x="404" y="365" font-family="Arial, sans-serif" font-size="34" fill="#9ca3af">Penetration-testing operating systems</text>
  <text x="404" y="410" font-family="Arial, sans-serif" font-size="34" fill="#9ca3af">and tools, cataloged from official sources</text>

  <rect x="404" y="450" width="640" height="2" fill="#34d399" fill-opacity="0.3"/>
  <text x="404" y="495" font-family="JetBrains Mono, monospace" font-size="24" fill="#34d399">secarsenal.org</text>
</svg>
`;

await sharp(Buffer.from(svg)).png().toFile('public/og-image.png');
console.log('Wrote public/og-image.png');
