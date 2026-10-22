import fs from "node:fs/promises";
import path from "node:path";
import sharp from "/home/nicotordev/.bun/install/global/node_modules/sharp";

const rootDir = process.cwd();
const publicDir = path.join(rootDir, "public");
const logoPath = path.join(publicDir, "logo.png");

// 1. Helper to build ICO binary buffer from PNG buffers
function createIco(pngBuffers: Buffer[], sizes: number[]): Buffer {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // 1 = ICO
  header.writeUInt16LE(pngBuffers.length, 4);

  let offset = 6 + 16 * pngBuffers.length;
  const entries: Buffer[] = [];

  for (let i = 0; i < pngBuffers.length; i++) {
    const size = sizes[i] ?? 0;
    const buf = pngBuffers[i];
    if (!buf) continue;
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // Width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // Height
    entry.writeUInt8(0, 2); // Palette colors (0 = none)
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(buf.length, 8); // Image size in bytes
    entry.writeUInt32LE(offset, 12); // Offset
    entries.push(entry);
    offset += buf.length;
  }

  return Buffer.concat([header, ...entries, ...pngBuffers]);
}

async function main() {
  console.log("Loading source logo:", logoPath);
  const baseImg = sharp(logoPath);
  const meta = await baseImg.metadata();
  console.log(`Source dimensions: ${meta.width}x${meta.height}`);

  // Base logo: black circle, white lines, transparent outer background
  // Inverted logo (light theme logo for dark background):
  // white circle, black lines, transparent outer background
  const invertedBuf = await baseImg
    .clone()
    .negate({ alpha: false })
    .toBuffer();

  const invertedImg = sharp(invertedBuf);

  // 1. Generate Favicon ICO (16, 32, 48)
  console.log("Generating favicon.ico...");
  const icoSizes = [16, 32, 48];
  const icoPngBuffers = await Promise.all(
    icoSizes.map((s) =>
      baseImg.clone().resize(s, s).png({ quality: 100 }).toBuffer()
    )
  );
  const icoBuffer = createIco(icoPngBuffers, icoSizes);
  await fs.writeFile(path.join(publicDir, "favicon.ico"), icoBuffer);
  console.log("✓ Created public/favicon.ico");

  // 2. Generate SVG Favicon with prefers-color-scheme support
  console.log("Generating favicon.svg...");
  const favDarkPng = await baseImg
    .clone()
    .resize(500, 500)
    .png({ quality: 95 })
    .toBuffer();
  const favLightPng = await invertedImg
    .clone()
    .resize(500, 500)
    .png({ quality: 95 })
    .toBuffer();

  const favDarkB64 = favDarkPng.toString("base64");
  const favLightB64 = favLightPng.toString("base64");

  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 500" width="100%" height="100%">
  <style>
    .icon-light { display: block; }
    .icon-dark { display: none; }
    @media (prefers-color-scheme: dark) {
      .icon-light { display: none; }
      .icon-dark { display: block; }
    }
  </style>
  <g class="icon-light">
    <image width="500" height="500" xlink:href="data:image/png;base64,${favDarkB64}" />
  </g>
  <g class="icon-dark">
    <image width="500" height="500" xlink:href="data:image/png;base64,${favLightB64}" />
  </g>
</svg>
`;
  await fs.writeFile(path.join(publicDir, "favicon.svg"), faviconSvg, "utf-8");
  console.log("✓ Created public/favicon.svg");

  // 3. Generate standard Favicons (96x96)
  console.log("Generating 96x96 favicons...");
  await baseImg
    .clone()
    .resize(96, 96)
    .webp({ quality: 95 })
    .toFile(path.join(publicDir, "favicon-96x96.webp"));
  await baseImg
    .clone()
    .resize(96, 96)
    .png({ quality: 95 })
    .toFile(path.join(publicDir, "favicon-96x96.png"));
  console.log("✓ Created public/favicon-96x96.webp and .png");

  // 4. Generate Apple Touch Icons (180x180)
  console.log("Generating apple-touch-icon (180x180)...");
  await baseImg
    .clone()
    .resize(180, 180)
    .webp({ quality: 95 })
    .toFile(path.join(publicDir, "apple-touch-icon.webp"));
  await baseImg
    .clone()
    .resize(180, 180)
    .png({ quality: 95 })
    .toFile(path.join(publicDir, "apple-touch-icon.png"));
  console.log("✓ Created public/apple-touch-icon.webp and .png");

  // 5. Generate Web App Manifest Icons (192x192, 512x512)
  console.log("Generating web-app-manifest icons...");
  await baseImg
    .clone()
    .resize(192, 192)
    .webp({ quality: 95 })
    .toFile(path.join(publicDir, "web-app-manifest-192x192.webp"));
  await baseImg
    .clone()
    .resize(192, 192)
    .png({ quality: 95 })
    .toFile(path.join(publicDir, "web-app-manifest-192x192.png"));
  await baseImg
    .clone()
    .resize(512, 512)
    .webp({ quality: 95 })
    .toFile(path.join(publicDir, "web-app-manifest-512x512.webp"));
  await baseImg
    .clone()
    .resize(512, 512)
    .png({ quality: 95 })
    .toFile(path.join(publicDir, "web-app-manifest-512x512.png"));
  console.log("✓ Created web-app-manifest-192x192 and 512x512 (webp + png)");

  // 6. Generate SVG Logos for components and assets
  console.log("Generating only-logo and full logo SVGs...");
  const logoDir = path.join(publicDir, "images", "logo");
  await fs.mkdir(logoDir, { recursive: true });

  const logoDirAlt = path.join(publicDir, "logo");
  await fs.mkdir(logoDirAlt, { recursive: true });

  // High-res (800x800) PNG for SVGs
  const highResDarkPng = await baseImg
    .clone()
    .resize(800, 800)
    .png({ quality: 100 })
    .toBuffer();
  const highResLightPng = await invertedImg
    .clone()
    .resize(800, 800)
    .png({ quality: 100 })
    .toBuffer();

  const darkSvgContent = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 800 800" width="100%" height="100%">
  <image width="800" height="800" xlink:href="data:image/png;base64,${highResDarkPng.toString("base64")}" />
</svg>
`;

  const lightSvgContent = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 800 800" width="100%" height="100%">
  <image width="800" height="800" xlink:href="data:image/png;base64,${highResLightPng.toString("base64")}" />
</svg>
`;

  // Write only-logo-dark.svg and only-logo-light.svg
  await fs.writeFile(path.join(logoDir, "only-logo-dark.svg"), darkSvgContent, "utf-8");
  await fs.writeFile(path.join(logoDir, "only-logo-light.svg"), lightSvgContent, "utf-8");
  console.log("✓ Created public/images/logo/only-logo-dark.svg & only-logo-light.svg");

  // Write logo-dark.svg and logo-light.svg in both places
  await fs.writeFile(path.join(logoDir, "logo-dark.svg"), darkSvgContent, "utf-8");
  await fs.writeFile(path.join(logoDir, "logo-light.svg"), lightSvgContent, "utf-8");
  await fs.writeFile(path.join(logoDirAlt, "logo-dark.svg"), darkSvgContent, "utf-8");
  await fs.writeFile(path.join(logoDirAlt, "logo-light.svg"), lightSvgContent, "utf-8");
  console.log("✓ Created public/images/logo/logo-*.svg and public/logo/logo-*.svg");

  console.log("All icons and logos generated successfully!");
}

main().catch((err) => {
  console.error("Error generating icons:", err);
  process.exit(1);
});
