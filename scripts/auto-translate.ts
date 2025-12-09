import { localeNames, locales, type Locale } from "@/i18n/config";
import fs from "node:fs/promises";
import path from "node:path";
import OpenAI from "openai";

// --- Configuration ---
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_TRANSLATION_MODEL || "gpt-4o-mini";
const LOCALE_CONCURRENCY = 3; // Number of locales to translate in parallel
const CHUNK_CONCURRENCY = 4; // Number of chunks to translate in parallel per locale
const RETRY_LIMIT = 2; // Number of retries per chunk
const SOURCE_LOCALE: Locale = "es-cl";

// --- Types ---
type TranslationNode = string | string[] | { [key: string]: TranslationNode };

interface TranslationChunk {
  index: number;
  key: string;
  data: TranslationNode;
}

// --- Utils ---
const logger = {
  info: (msg: string) => console.log(`[INFO] ${msg}`),
  error: (msg: string) => console.error(`[ERROR] ${msg}`),
  warn: (msg: string) => console.warn(`[WARN] ${msg}`),
};

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// --- Logic ---

if (!OPENAI_API_KEY) {
  logger.error("OPENAI_API_KEY is missing from environment variables.");
  process.exit(1);
}

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

async function translateChunk(
  chunk: TranslationChunk,
  targetLocale: Locale,
  targetLanguageName: string
): Promise<TranslationChunk> {
  const systemPrompt = `You translate Chilean Spanish JSON values to ${targetLanguageName} and return only valid JSON with identical keys.`;
  const jsonString = JSON.stringify({ [chunk.key]: chunk.data });

  let attempts = 0;
  while (attempts <= RETRY_LIMIT) {
    try {
      const response = await openai.chat.completions.create({
        model: OPENAI_MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: jsonString },
        ],
        response_format: { type: "json_object" },
        temperature: 0,
      });

      const content = response.choices[0]?.message?.content;
      if (!content) throw new Error("Empty response from OpenAI");

      const parsed = JSON.parse(content);

      // Basic validation: check if the top-level key exists
      if (!(chunk.key in parsed)) {
        throw new Error(`Missing top-level key "${chunk.key}" in response`);
      }

      return {
        index: chunk.index,
        key: chunk.key,
        data: parsed[chunk.key],
      };
    } catch (error: any) {
      attempts++;
      logger.warn(
        `Failed to translate chunk "${
          chunk.key
        }" for ${targetLocale} (Attempt ${attempts}/${RETRY_LIMIT + 1}): ${
          error.message
        }`
      );
      if (attempts > RETRY_LIMIT) {
        logger.error(
          `Permanent failure for chunk "${chunk.key}" (${targetLocale}). Falling back to source.`
        );
        return chunk; // Fallback to source
      }
      await sleep(1000 * attempts); // Exponential backoff-ish
    }
  }
  return chunk; // Should be unreachable due to return in catch, but robust fallback
}

async function processLocale(targetLocale: Locale) {
  if (targetLocale === SOURCE_LOCALE) return;

  const sourcePath = path.resolve(
    process.cwd(),
    `locales/${SOURCE_LOCALE}.json`
  );
  const targetPath = path.resolve(
    process.cwd(),
    `locales/${targetLocale}.json`
  );

  logger.info(
    `Starting translation for: ${targetLocale} (${localeNames[targetLocale]})`
  );

  // 1. Read Source
  const sourceContent = await fs.readFile(sourcePath, "utf-8");
  const sourceData: Record<string, TranslationNode> = JSON.parse(sourceContent);

  // 2. Chunking (Top-level keys)
  const chunks: TranslationChunk[] = Object.entries(sourceData).map(
    ([key, value], index) => ({
      index,
      key,
      data: value as TranslationNode,
    })
  );

  // 3. Translate Chunks with Concurrency Limit
  const results: TranslationChunk[] = [];
  const queue = [...chunks];
  const activeWorkers = new Set<Promise<void>>();

  // Use a simple parallelism loop
  while (queue.length > 0 || activeWorkers.size > 0) {
    while (queue.length > 0 && activeWorkers.size < CHUNK_CONCURRENCY) {
      const chunk = queue.shift()!;
      const promise = translateChunk(
        chunk,
        targetLocale,
        localeNames[targetLocale]
      )
        .then((res) => {
          results.push(res);
        })
        .finally(() => {
          activeWorkers.delete(promise);
        });
      activeWorkers.add(promise);
    }
    if (activeWorkers.size > 0) {
      await Promise.race(activeWorkers);
    }
  }

  // 4. Reassembly
  results.sort((a, b) => a.index - b.index); // Restore order
  const translatedData: Record<string, TranslationNode> = {};
  for (const chunk of results) {
    translatedData[chunk.key] = chunk.data;
  }

  // 5. Write to file
  await fs.writeFile(
    targetPath,
    JSON.stringify(translatedData, null, 2) + "\n"
  );
  logger.info(`Completed translation for: ${targetLocale}`);
}

async function main() {
  logger.info("Starting auto-translation script...");
  const targetLocales = locales.filter((l) => l !== SOURCE_LOCALE);

  // Process locales with limited concurrency
  const queue = [...targetLocales];
  const activeWorkers = new Set<Promise<void>>();

  // Global failure tracker
  let hasFailure = false;

  while (queue.length > 0 || activeWorkers.size > 0) {
    while (queue.length > 0 && activeWorkers.size < LOCALE_CONCURRENCY) {
      const locale = queue.shift()!;
      const promise = processLocale(locale)
        .catch((err) => {
          logger.error(`Failed to translate locale ${locale}: ${err.message}`);
          hasFailure = true;
        })
        .finally(() => {
          activeWorkers.delete(promise);
        });
      activeWorkers.add(promise);
    }
    if (activeWorkers.size > 0) {
      await Promise.race(activeWorkers);
    }
  }

  if (hasFailure) {
    logger.error("Translation script finished with errors.");
    process.exitCode = 1;
  } else {
    logger.info("All translations completed successfully.");
  }
}

// Execution Guard
if (import.meta.main || require.main === module) {
  main().catch((err) => {
    logger.error(`Fatal script error: ${err}`);
    process.exit(1);
  });
}
