import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const publicRoot = path.join(projectRoot, "public");

const sourceExtensions = new Set([".png", ".jpg", ".jpeg"]);
const textExtensions = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".mts",
  ".cts",
  ".json",
  ".md",
  ".mdx",
  ".yml",
  ".yaml",
  ".css",
  ".scss",
  ".sass",
  ".less",
  ".html",
  ".txt",
  ".xml",
  ".webmanifest",
]);
const ignoredDirectories = new Set([
  ".git",
  ".next",
  "node_modules",
  "dist",
  "build",
  "coverage",
  ".turbo",
  ".vercel",
  "tmp",
]);

const args = new Set(process.argv.slice(2));
const removeOriginals = args.has("--remove-originals");
const skipRewrite = args.has("--no-rewrite");

type Conversion = {
  fromRel: string;
  toRel: string;
  converted: boolean;
};

const toPosix = (value: string) => value.split(path.sep).join(path.posix.sep);

async function* walk(dir: string): AsyncGenerator<string> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (ignoredDirectories.has(entry.name)) continue;
      yield* walk(path.join(dir, entry.name));
    } else {
      yield path.join(dir, entry.name);
    }
  }
}

async function* walkTextFiles(dir: string): AsyncGenerator<string> {
  for await (const file of walk(dir)) {
    const ext = path.extname(file).toLowerCase();
    if (textExtensions.has(ext)) {
      yield file;
    }
  }
}

async function ensureWebp(inputPath: string, ext: string): Promise<Conversion> {
  const rel = toPosix(path.relative(publicRoot, inputPath));
  const outputRel = rel.slice(0, -ext.length) + ".webp";
  const outputPath = path.join(publicRoot, outputRel);

  const [inputStat, outputStat] = await Promise.allSettled([
    fs.stat(inputPath),
    fs.stat(outputPath),
  ]);

  const needsConversion =
    outputStat.status !== "fulfilled" ||
    (inputStat.status === "fulfilled" &&
      outputStat.status === "fulfilled" &&
      outputStat.value.mtimeMs < inputStat.value.mtimeMs);

  if (needsConversion) {
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await sharp(inputPath)
      .webp({ quality: 82, effort: 6 })
      .toFile(outputPath);

    if (removeOriginals) {
      await fs.unlink(inputPath);
    }
  }

  return {
    fromRel: rel,
    toRel: outputRel,
    converted: needsConversion,
  };
}

function buildReplacementMap(conversions: Conversion[]): Map<string, string> {
  const replacements = new Map<string, string>();

  for (const { fromRel, toRel } of conversions) {
    const fromFile = path.posix.basename(fromRel);
    const toFile = path.posix.basename(toRel);

    const variants = [
      fromRel,
      `/${fromRel}`,
      fromFile,
      path.posix.join("public", fromRel),
      path.posix.join("@public", fromRel),
    ];

    for (const from of variants) {
      replacements.set(from, from.replace(fromFile, toFile));
    }
  }

  return new Map(
    Array.from(replacements.entries()).sort(
      ([a], [b]) => b.length - a.length
    )
  );
}

async function rewriteReferences(replacements: Map<string, string>) {
  let updatedFiles = 0;
  let totalReplacements = 0;

  for await (const file of walkTextFiles(projectRoot)) {
    const original = await fs.readFile(file, "utf8");
    let updated = original;

    for (const [from, to] of replacements) {
      if (!updated.includes(from)) continue;

      const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escaped, "g");
      const matches = updated.match(regex)?.length ?? 0;

      if (matches > 0) {
        updated = updated.replace(regex, to);
        totalReplacements += matches;
      }
    }

    if (updated !== original) {
      await fs.writeFile(file, updated, "utf8");
      updatedFiles++;
      console.log(
        `Updated references in ${path.relative(projectRoot, file)}`
      );
    }
  }

  return { updatedFiles, totalReplacements };
}

async function main() {
  const conversions: Conversion[] = [];

  for await (const file of walk(publicRoot)) {
    const ext = path.extname(file).toLowerCase();
    if (!sourceExtensions.has(ext)) continue;

    try {
      const conversion = await ensureWebp(file, ext);
      conversions.push(conversion);
      if (conversion.converted) {
        console.log(
          `Converted ${conversion.fromRel} -> ${conversion.toRel}`
        );
      }
    } catch (error) {
      console.error(`Failed to convert ${file}:`, error);
    }
  }

  if (!conversions.length) {
    console.log("No source images found in /public.");
    return;
  }

  const replacements = buildReplacementMap(conversions);

  if (skipRewrite) {
    console.log("Skipping reference rewrite (--no-rewrite).");
    console.log("Apply these replacements manually:", replacements);
    return;
  }

  const { updatedFiles, totalReplacements } = await rewriteReferences(
    replacements
  );

  console.log(
    `Finished. Converted ${conversions.filter((c) => c.converted).length
    } file(s). Updated ${updatedFiles} file(s) with ${totalReplacements} replacement(s).`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
