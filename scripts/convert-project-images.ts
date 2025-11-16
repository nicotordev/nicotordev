import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.join(process.cwd(), "public", "images", "projects");
const exts = new Set([".png", ".jpg", ".jpeg", ".avif"]);

async function* walk(dir: string): AsyncGenerator<string> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else {
      yield full;
    }
  }
}

async function convertOne(inputPath: string) {
  const ext = path.extname(inputPath).toLowerCase();
  if (!exts.has(ext)) return;
  const outPath = inputPath.slice(0, -ext.length) + ".webp";

  try {
    const [inStat, outStat] = await Promise.allSettled([
      fs.stat(inputPath),
      fs.stat(outPath),
    ]);
    if (
      outStat.status === "fulfilled" &&
      inStat.status === "fulfilled" &&
      outStat.value.mtimeMs >= inStat.value.mtimeMs
    ) {
      return; // up-to-date
    }
  } catch {}

  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await sharp(inputPath)
    .webp({ quality: 82, effort: 6 })
    .toFile(outPath);
  console.log(`Converted -> ${path.relative(process.cwd(), outPath)}`);
}

async function main() {
  let processed = 0;
  for await (const file of walk(root)) {
    const ext = path.extname(file).toLowerCase();
    if (!exts.has(ext)) continue;
    await convertOne(file);
    processed++;
  }
  console.log(`Done. Processed ${processed} file(s).`);
}

await main();
