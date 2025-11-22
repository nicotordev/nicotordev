/**
 * Recolor all profile pics using the theme OKLCH palette and emit compressed WEBP files.
 * Each source image name gets a stable random palette selection so outputs differ per file.
 *
 * Usage: node scripts/recolor-profile-pics.js
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const profilePicsDir = path.join(
  __dirname,
  "..",
  "public",
  "images",
  "profile-pics",
);
const baseImagePath = path.join(profilePicsDir, "1.jpg");

const lightPaletteStrings = [
  "oklch(98.5% 0.008 320)",
  "oklch(96% 0.01 320)",
  "oklch(18% 0.03 280)",
  "oklch(97.5% 0.015 330)",
  "oklch(0.985 0.005 106.475)",
  "oklch(0.145 0.02 286.075)",
  "oklch(68% 0.28 340)",
  "oklch(65% 0.3 300)",
  "oklch(72% 0.24 320)",
  "oklch(65% 0.28 25)",
  "oklch(90% 0.04 310)",
  "oklch(70% 0.28 340)",
  "oklch(68% 0.3 320)",
  "oklch(66% 0.3 300)",
  "oklch(72% 0.25 280)",
  "oklch(75% 0.22 260)",
  "oklch(0.975 0.01 120.575)",
  "oklch(0.6726 0.2904 341.4084)",
  "oklch(0.922 0.015 120.575)",
  "oklch(0.205 0.03 286.075)",
  "oklch(0.88 0.02 120.575)",
  "oklch(0.6217 0.3057 315.3431)",
];

const darkPaletteStrings = [
  "oklch(20% 0.02 300)",
  "oklch(24% 0.06 310)",
  "oklch(94% 0.03 320)",
  "oklch(24% 0.06 310)",
  "oklch(96% 0.02 320)",
  "oklch(0.6726 0.2904 341.4084)",
  "oklch(1 0 0)",
  "oklch(70% 0.3 340)",
  "oklch(68% 0.33 300)",
  "oklch(25% 0.1 305)",
  "oklch(80% 0.1 310)",
  "oklch(73% 0.28 320)",
  "oklch(0.6354 0.2541 15.4582)",
  "oklch(0.9683 0.0174 355.1015)",
  "oklch(30% 0.14 305)",
  "oklch(0.8238 0.1642 329.1141)",
  "oklch(0.6372 0.3087 318.1667)",
  "oklch(0.5636 0.2557 330.9144)",
  "oklch(0.6698 0.2872 343.0003)",
  "oklch(0.6793 0.3175 325.0733)",
  "oklch(0.1342 0.0617 328.3634)",
  "oklch(0.9509 0.0377 332.5817)",
  "oklch(0.6574 0.3128 321.5949)",
  "oklch(0.6834 0.3027 335.8629)",
  "oklch(0.4751 0.2288 319.2956)",
  "oklch(0.6217 0.3057 315.3431)",
];

const themePalette = [
  ...lightPaletteStrings,
  ...darkPaletteStrings,
].map(oklchStringToRgb);

function oklchStringToRgb(str) {
  const match = /oklch\(\s*([0-9.]+)(%)?\s+([0-9.]+)\s+([0-9.]+)\s*\)/i.exec(
    str,
  );
  if (!match) {
    throw new Error(`Cannot parse OKLCH color: ${str}`);
  }
  const lRaw = parseFloat(match[1]);
  const c = parseFloat(match[3]);
  const h = parseFloat(match[4]);
  const l = match[2] ? lRaw / 100 : lRaw;
  return oklchToRgb({ l, c, h });
}

function oklchToRgb({ l, c, h }) {
  const a = c * Math.cos((h * Math.PI) / 180);
  const b = c * Math.sin((h * Math.PI) / 180);

  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;

  const l3 = l_ ** 3;
  const m3 = m_ ** 3;
  const s3 = s_ ** 3;

  const r = 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  const g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  const bLin = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3;

  return [
    clamp255(r * 255),
    clamp255(g * 255),
    clamp255(bLin * 255),
  ];
}

function clamp255(value) {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function hashString(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i += 1) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return (h >>> 0) / 4294967296;
}

function mulberry32(seed) {
  let t = Math.floor(seed * 0xffffffff);
  return function rng() {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), t | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function pickColors(palette, count, rng) {
  const shuffled = [...palette];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

function quantizeBufferToPalette(buffer, info, palette) {
  const out = Buffer.alloc(buffer.length);
  const levels = palette.length;
  for (let i = 0; i < buffer.length; i += 4) {
    const r = buffer[i];
    const g = buffer[i + 1];
    const b = buffer[i + 2];
    const a = buffer[i + 3];
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const idx = Math.min(levels - 1, Math.floor((lum / 255) * levels));
    const [pr, pg, pb] = palette[idx];
    out[i] = pr;
    out[i + 1] = pg;
    out[i + 2] = pb;
    out[i + 3] = a;
  }
  return out;
}

async function run() {
  if (!fs.existsSync(baseImagePath)) {
    throw new Error(`Base image not found: ${baseImagePath}`);
  }

  const sourceFiles = fs
    .readdirSync(profilePicsDir)
    .filter((file) => /\.(jpe?g|png)$/i.test(file));

  if (sourceFiles.length === 0) {
    console.warn("No source images found to convert.");
    return;
  }

  const { data: basePixels, info } = await sharp(baseImagePath)
    .ensureAlpha()
    .toColorspace("srgb")
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (const file of sourceFiles) {
    const seed = hashString(file);
    const rng = mulberry32(seed);
    const colors = pickColors(themePalette, 6, rng);
    const recolored = quantizeBufferToPalette(basePixels, info, colors);
    const outputPath = path.join(
      profilePicsDir,
      `${path.parse(file).name}.webp`,
    );
    await sharp(recolored, {
      raw: { width: info.width, height: info.height, channels: 4 },
    })
      .toFormat("webp", { quality: 82, effort: 6, smartSubsample: true })
      .toFile(outputPath);
    console.log(`✔️  ${file} -> ${path.basename(outputPath)}`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
