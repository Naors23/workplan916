// Plan Master icon — metallic silver ring badge, dark blueprint face, calendar+check.
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const ANDROID_RES = path.join(ROOT, 'android', 'app', 'src', 'main', 'res');

// Reusable circular badge centered at 512,512 in a 1024 canvas.
const badge = `
  <defs>
    <linearGradient id="chrome" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0"    stop-color="#F6F8F9"/>
      <stop offset="0.18" stop-color="#CBD2D7"/>
      <stop offset="0.46" stop-color="#828A91"/>
      <stop offset="0.54" stop-color="#666E76"/>
      <stop offset="0.82" stop-color="#AEB6BD"/>
      <stop offset="1"    stop-color="#E3E8EB"/>
    </linearGradient>
    <radialGradient id="face" cx="0.5" cy="0.42" r="0.65">
      <stop offset="0"   stop-color="#333A42"/>
      <stop offset="0.6" stop-color="#1E242B"/>
      <stop offset="1"   stop-color="#0C1014"/>
    </radialGradient>
    <linearGradient id="calBody" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#4A555F"/>
      <stop offset="1" stop-color="#28303A"/>
    </linearGradient>
    <linearGradient id="check" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#8FC0F2"/>
      <stop offset="1" stop-color="#2D7FF9"/>
    </linearGradient>
    <linearGradient id="silver" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#EDEFF1"/>
      <stop offset="1" stop-color="#9AA2A9"/>
    </linearGradient>
    <clipPath id="faceClip"><circle cx="512" cy="512" r="406"/></clipPath>
  </defs>

  <!-- chrome ring (thick, beveled) -->
  <circle cx="512" cy="512" r="500" fill="#23272C"/>
  <circle cx="512" cy="512" r="492" fill="url(#chrome)"/>
  <circle cx="512" cy="512" r="416" fill="#1B1F24"/>
  <!-- dark face -->
  <circle cx="512" cy="512" r="406" fill="url(#face)"/>

  <!-- blueprint grid clipped to face -->
  <g clip-path="url(#faceClip)" stroke="#5C86B0" stroke-width="3" opacity="0.22">
    <line x1="200" y1="0" x2="200" y2="1024"/>
    <line x1="306" y1="0" x2="306" y2="1024"/>
    <line x1="412" y1="0" x2="412" y2="1024"/>
    <line x1="518" y1="0" x2="518" y2="1024"/>
    <line x1="624" y1="0" x2="624" y2="1024"/>
    <line x1="730" y1="0" x2="730" y2="1024"/>
    <line x1="836" y1="0" x2="836" y2="1024"/>
    <line x1="0" y1="200" x2="1024" y2="200"/>
    <line x1="0" y1="306" x2="1024" y2="306"/>
    <line x1="0" y1="412" x2="1024" y2="412"/>
    <line x1="0" y1="518" x2="1024" y2="518"/>
    <line x1="0" y1="624" x2="1024" y2="624"/>
    <line x1="0" y1="730" x2="1024" y2="730"/>
    <line x1="0" y1="836" x2="1024" y2="836"/>
  </g>
  <!-- subtle inner top highlight on the glass face -->
  <ellipse cx="512" cy="380" rx="260" ry="120" fill="#FFFFFF" opacity="0.05" clip-path="url(#faceClip)"/>

  <!-- calendar tabs -->
  <rect x="430" y="384" width="28" height="48" rx="14" fill="url(#silver)"/>
  <rect x="566" y="384" width="28" height="48" rx="14" fill="url(#silver)"/>
  <!-- calendar body -->
  <rect x="368" y="406" width="288" height="248" rx="30" fill="url(#calBody)"
        stroke="#C3CBD1" stroke-width="7"/>
  <!-- header divider -->
  <line x1="375" y1="470" x2="649" y2="470" stroke="#C3CBD1" stroke-width="5" opacity="0.85"/>
  <!-- bold blue check (glass) -->
  <path d="M424 548 L486 612 L612 460" fill="none" stroke="url(#check)"
        stroke-width="50" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M424 548 L486 612 L612 460" fill="none" stroke="#FFFFFF"
        stroke-width="12" stroke-linecap="round" stroke-linejoin="round" opacity="0.35"
        transform="translate(0,-12)"/>
`;

// Full square icon: dark carbon background + badge (legacy + PWA)
const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
  <defs>
    <radialGradient id="carbon" cx="0.5" cy="0.45" r="0.75">
      <stop offset="0" stop-color="#20242A"/>
      <stop offset="1" stop-color="#0A0C0F"/>
    </radialGradient>
  </defs>
  <rect width="1024" height="1024" fill="url(#carbon)"/>
  <g transform="translate(512,512) scale(0.93) translate(-512,-512)">${badge}</g>
</svg>`;

// Adaptive foreground: badge only, inset into the safe zone, transparent bg
const fgSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
  <g transform="translate(512,512) scale(0.78) translate(-512,-512)">${badge}</g>
</svg>`;

const launcherSizes = { mdpi: 48, hdpi: 72, xhdpi: 96, xxhdpi: 144, xxxhdpi: 192 };
const fgSizes       = { mdpi: 108, hdpi: 162, xhdpi: 216, xxhdpi: 324, xxxhdpi: 432 };

async function png(svg, size, outPath) {
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(outPath);
}

// Branded splash: navy background, badge + "PLAN MASTER" wordmark, sized W x H
function splashSvg(W, H) {
  const m = Math.min(W, H);
  const D = m * 0.42;                 // badge diameter
  const k = D / 1000;                 // badge native diameter ~1000
  const cx = W / 2, cy = H * 0.40;
  const fontSize = Math.min(H * 0.072, W * 0.10);
  const textY = cy + D / 2 + fontSize * 1.3;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs>
      <linearGradient id="bgS" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#102137"/>
        <stop offset="1" stop-color="#070F1B"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bgS)"/>
    <g transform="translate(${cx},${cy}) scale(${k}) translate(-512,-512)">${badge}</g>
    <text x="${W/2}" y="${textY}" text-anchor="middle"
          font-family="Arial, Roboto, sans-serif" font-weight="700"
          font-size="${fontSize}" letter-spacing="${fontSize*0.02}"
          fill="#FFFFFF">PLAN MASTER</text>
  </svg>`;
}

(async () => {
  // preview only first if PREVIEW env set
  if (process.env.PREVIEW) {
    await png(fullSvg, 512, path.join(ROOT, 'icons', 'preview-512.png'));
    console.log('preview written: icons/preview-512.png');
    return;
  }
  for (const [d, s] of Object.entries(launcherSizes)) {
    const dir = path.join(ANDROID_RES, 'mipmap-' + d);
    await png(fullSvg, s, path.join(dir, 'ic_launcher.png'));
    await png(fullSvg, s, path.join(dir, 'ic_launcher_round.png'));
  }
  for (const [d, s] of Object.entries(fgSizes)) {
    await png(fgSvg, s, path.join(ANDROID_RES, 'mipmap-' + d, 'ic_launcher_foreground.png'));
  }
  for (const dirName of ['icons', path.join('www', 'icons')]) {
    const dir = path.join(ROOT, dirName);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    await png(fullSvg, 192, path.join(dir, 'icon-192.png'));
    await png(fullSvg, 512, path.join(dir, 'icon-512.png'));
    await png(fullSvg, 1024, path.join(dir, 'icon-1024.png'));
  }
  fs.writeFileSync(path.join(ROOT, 'icons', 'plan-master-icon.svg'), fullSvg);

  // Branded splash screens — overwrite each existing splash.png at its own size
  const drawableDirs = fs.readdirSync(ANDROID_RES).filter(d => d.startsWith('drawable'));
  for (const d of drawableDirs) {
    const sp = path.join(ANDROID_RES, d, 'splash.png');
    if (!fs.existsSync(sp)) continue;
    const meta = await sharp(sp).metadata();
    await sharp(Buffer.from(splashSvg(meta.width, meta.height)))
      .png().toFile(sp + '.tmp');
    fs.renameSync(sp + '.tmp', sp);
    console.log('  splash ' + d + ' (' + meta.width + 'x' + meta.height + ')');
  }
  console.log('All icons + splashes written.');
})();
