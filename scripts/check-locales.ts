import fs from 'fs';
import path from 'path';

interface LocaleFile {
    [key: string]: string | number | boolean | LocaleFile | string[] | number[] | boolean[] | LocaleFile[] | undefined;
}

const localeFiles = {
    'en.json': '../locales/en.json',
    'es.json': '../locales/es.json',
    'es-cl.json': '../locales/es-cl.json',
    'es-es.json': '../locales/es-es.json',
    'de.json': '../locales/de.json',
    'en-gb.json': '../locales/en-gb.json'
};

const loadLocaleFile = (filePath: string): LocaleFile => {
    const fullPath = path.resolve(__dirname, filePath);
    const content = fs.readFileSync(fullPath, 'utf-8');
    return JSON.parse(content);
};

const getAllKeys = (obj: LocaleFile, prefix = ''): string[] => {
    const keys: string[] = [];

    for (const key in obj) {
        const fullKey = prefix ? `${prefix}.${key}` : key;

        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            keys.push(...getAllKeys(obj[key], fullKey));
        } else {
            keys.push(fullKey);
        }
    }

    return keys.sort();
};

const checkLocaleKeys = (): void => {
    console.log('🔍 Checking locale files for key consistency...\n');

    const locales: Record<string, LocaleFile> = {};
    const allKeys: Record<string, string[]> = {};

    // Load all locale files
    for (const [fileName, filePath] of Object.entries(localeFiles)) {
        try {
            locales[fileName] = loadLocaleFile(filePath);
            allKeys[fileName] = getAllKeys(locales[fileName]);
            console.log(`✅ Loaded ${fileName}: ${allKeys[fileName].length} keys`);
        } catch (error) {
            console.log(`❌ Failed to load ${fileName}:`, error);
            return;
        }
    }

    // Use English as the reference
    const referenceFile = 'en.json';
    const referenceKeys = allKeys[referenceFile];

    if (!referenceKeys) {
        console.log(`❌ Reference file ${referenceFile} not found`);
        return;
    }

    console.log(`\n📋 Using ${referenceFile} as reference (${referenceKeys.length} keys)\n`);

    let hasErrors = false;

    // Check each locale against the reference
    for (const [fileName, keys] of Object.entries(allKeys)) {
        if (fileName === referenceFile) continue;

        console.log(`🔍 Checking ${fileName}...`);

        const missingKeys = referenceKeys.filter(key => !keys.includes(key));
        const extraKeys = keys.filter(key => !referenceKeys.includes(key));

        if (missingKeys.length === 0 && extraKeys.length === 0) {
            console.log(`  ✅ Perfect match! All ${keys.length} keys are consistent`);
        } else {
            hasErrors = true;

            if (missingKeys.length > 0) {
                console.log(`  ❌ Missing ${missingKeys.length} keys:`);
                missingKeys.forEach(key => console.log(`    - ${key}`));
            }

            if (extraKeys.length > 0) {
                console.log(`  ⚠️  Extra ${extraKeys.length} keys:`);
                extraKeys.forEach(key => console.log(`    + ${key}`));
            }
        }

        console.log('');
    }

    if (hasErrors) {
        console.log('❌ Locale files have inconsistent keys!');
        process.exit(1);
    } else {
        console.log('🎉 All locale files have consistent keys!');
    }
};

// Run the check
checkLocaleKeys();