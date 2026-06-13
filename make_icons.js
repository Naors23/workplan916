// Generates Plan Master app icons (calendar + blue check on navy) at all densities.
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const ANDROID_RES = path.join(ROOT, 'android', 'app', 'src', 'main', 'res');

// ---- Calendar artwork, authored in a 1024x1024 master canvas, centered ----
const calendar = `
  <!-- white body -->
  <rect x="222" y="285" width="580" height="485" rx="56" fill="#FFFFFF"/>
  <!-- grid lines (faint) -->
  <g stroke="#DCE3EC" stroke-width="6" opacity="0.9">
    <line x1="338" y1="430" x2="338" y2="752"/>
    <line x1="454" y1="430" x2="454" y2="752"/>
    <line x1="570" y1="430" x2="570" y2="752"/>
    <line x1="686" y1="430" x2="686" y2="752"/>
    <line x1="240" y1="528" x2="784" y2="528"/>
    <line x1="240" y1="640" x2="784" y2="640"/>
  </g>
  <!-- blue header (rounded top, flat bottom) -->
  <path d="M278 285 H746 A56 56 0 0 1 802 341 V405 H222 V341 A56 56 0 0 1 278 285 Z" fill="#2D7FF9"/>
  <!-- binder rings -->
  <rect x="372" y="232" width="44" height="112" rx="22" fill="#6B7A90"/>
  <rect x="608" y="232" width="44" height="112" rx="22" fill="#6B7A90"/>
  <!-- bold blue check -->
  <path d="M360 575 L468 675 L690 455" fill="none" stroke="#2D7FF9"
        stroke-width="74" stroke-linecap="round" stroke-linejoin="round"/>
`;

// Full-bleed icon: navy gradient background + calendar (for legacy + PWA)
const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1C3A5C"/>
      <stop offset="1" stop-color="#0B1A2E"/>
    </linearGradient>
  </defs>
  <rect width="1024" height="1024" fill="url(#bg)"/>
  ${calendar}
</svg>`;

// Adaptive foreground: calendar only, scaled into the central safe zone, transparent bg
const fgSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
  <g transform="translate(112,112) scale(0.78)">
    ${calendar}
  </g>
</svg>`;

const launcherSizes = { mdpi: 48, hdpi: 72, xhdpi: 96, xxhdpi: 144, xxxhdpi: 192 };
const fgSizes       = { mdpi: 108, hdpi: 162, xhdpi: 216, xxhdpi: 324, xxxhdpi: 432 };

async function png(svg, size, outPath) {
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(outPath);
  console.log('  ' + path.relative(ROOT, outPath) + ' (' + size + 'px)');
}

(async () => {
  console.log('Android launcher + round icons:');
  for (const [d, s] of Object.entries(launcherSizes)) {
    const dir = path.join(ANDROID_RES, 'mipmap-' + d);
    await png(fullSvg, s, path.join(dir, 'ic_launcher.png'));
    await png(fullSvg, s, path.join(dir, 'ic_launcher_round.png'));
  }
  console.log('Android adaptive foregrounds:');
  for (const [d, s] of Object.entries(fgSizes)) {
    const dir = path.join(ANDROID_RES, 'mipmap-' + d);
    await png(fgSvg, s, path.join(dir, 'ic_launcher_foreground.png'));
  }

  console.log('PWA icons:');
  for (const dirName of ['icons', path.join('www', 'icons')]) {
    const dir = path.join(ROOT, dirName);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    await png(fullSvg, 192, path.join(dir, 'icon-192.png'));
    await png(fullSvg, 512, path.join(dir, 'icon-512.png'));
    await png(fullSvg, 1024, path.join(dir, 'icon-1024.png'));
  }

  // Save master SVG for future edits
  fs.writeFileSync(path.join(ROOT, 'icons', 'plan-master-icon.svg'), fullSvg);
  console.log('Done.');
})();
