import fs from "fs";
import path from "path";

interface LocaleFile {
  [key: string]:
    | string
    | number
    | boolean
    | LocaleFile
    | string[]
    | number[]
    | boolean[]
    | LocaleFile[]
    | undefined;
}

const localeFiles = {
  "en.json": "../locales/en.json",
  "es.json": "../locales/es.json",
  "es-cl.json": "../locales/es-cl.json",
  "es-es.json": "../locales/es-es.json",
  "de.json": "../locales/de.json",
  "en-gb.json": "../locales/en-gb.json",
};

const loadLocaleFile = (filePath: string): LocaleFile => {
  const fullPath = path.resolve(__dirname, filePath);
  const content = fs.readFileSync(fullPath, "utf-8");
  return JSON.parse(content);
};

const saveLocaleFile = (filePath: string, data: LocaleFile): void => {
  const fullPath = path.resolve(__dirname, filePath);
  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2) + "\n", "utf-8");
};

const mergeStructure = (
  reference: LocaleFile,
  target: LocaleFile
): LocaleFile => {
  const result: LocaleFile = {};

  for (const key in reference) {
    const refValue = reference[key];
    const targetValue = target[key];

    if (
      typeof refValue === "object" &&
      refValue !== null &&
      !Array.isArray(refValue)
    ) {
      // Recursively merge nested objects
      if (
        typeof targetValue === "object" &&
        targetValue !== null &&
        !Array.isArray(targetValue)
      ) {
        result[key] = mergeStructure(
          refValue as LocaleFile,
          targetValue as LocaleFile
        );
      } else {
        // Target doesn't have this nested object, use reference structure
        result[key] = refValue;
      }
    } else if (Array.isArray(refValue)) {
      // For arrays, use target if exists, otherwise use reference
      result[key] = Array.isArray(targetValue) ? targetValue : refValue;
    } else {
      // For primitive values, prefer target if exists, otherwise use reference
      result[key] = targetValue !== undefined ? targetValue : refValue;
    }
  }

  return result;
};

const syncLocaleStructure = (): void => {
  console.log("🔄 Syncing locale file structures...\n");

  const referenceFile = "en.json";
  const referencePath = localeFiles[referenceFile];

  if (!referencePath) {
    console.log(
      `❌ Reference file ${referenceFile} not found in configuration`
    );
    return;
  }

  let referenceData: LocaleFile;
  try {
    referenceData = loadLocaleFile(referencePath);
    console.log(`✅ Loaded reference file: ${referenceFile}\n`);
  } catch (error) {
    console.log(`❌ Failed to load reference file ${referenceFile}:`, error);
    return;
  }

  // Sync each locale file
  for (const [fileName, filePath] of Object.entries(localeFiles)) {
    if (fileName === referenceFile) {
      console.log(`⏭️  Skipping reference file: ${fileName}`);
      continue;
    }

    try {
      console.log(`🔄 Processing ${fileName}...`);

      let targetData: LocaleFile;
      try {
        targetData = loadLocaleFile(filePath);
      } catch {
        // If file doesn't exist or is invalid, start fresh
        targetData = {};
      }

      const mergedData = mergeStructure(referenceData, targetData);
      saveLocaleFile(filePath, mergedData);

      console.log(`  ✅ Successfully synced ${fileName}\n`);
    } catch (error) {
      console.log(`  ❌ Failed to sync ${fileName}:`, error, "\n");
    }
  }

  console.log("🎉 Locale structure sync complete!");
  console.log(
    '\n💡 Tip: Run "bun run scripts/check-locales.ts" to verify consistency'
  );
};

// Run the sync
syncLocaleStructure();
