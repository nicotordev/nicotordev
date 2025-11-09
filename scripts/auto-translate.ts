import { locales, type Locale } from '@/lib/locales';
import chileanTranslation from '../locales/es-cl.json';
import translate from 'deepl';
import * as fs from 'fs';
import * as path from 'path';

// Map our locales to DeepL language codes
const localeToDeepLMap: Record<Locale, translate.DeeplLanguages> = {
  'en': 'EN-US',
  'en-gb': 'EN-GB',
  'es': 'ES',
  'es-cl': 'ES',
  'es-es': 'ES',
  'de': 'DE',
} as const;

type TranslationValue = string | number | boolean | null | undefined;

type TranslationObject = {
  [key: string]: TranslationValue | TranslationObject | TranslationArray;
};

type TranslationArray = (TranslationValue | TranslationObject | TranslationArray)[];

type Translation = TranslationValue | TranslationObject | TranslationArray;

async function translateText(text: string, targetLang: translate.DeeplLanguages): Promise<string> {
  try {
    const result = await translate({
      free_api: false,
      auth_key: process.env.DEEPL_API_KEY!,
      text: text,
      target_lang: targetLang,
      preserve_formatting: '1'
    });
    
    const first = result.data?.translations?.[0]?.text;
    return first ?? text;
  } catch (error) {
    console.warn(`Failed to translate text: "${text}". Using original text.`, error);
    return text;
  }
}

async function translateObject(obj: Translation, targetLang: translate.DeeplLanguages): Promise<Translation> {
  if (typeof obj === 'string') {
    return await translateText(obj, targetLang);
  }
  
  if (Array.isArray(obj)) {
    const translationPromises = obj.map(item => translateObject(item, targetLang));
    return await Promise.all(translationPromises);
  }
  
  if (typeof obj === 'object' && obj !== null) {
    const entries = Object.entries(obj);
    const translationPromises = entries.map(async ([key, value]) => {
      const translatedValue = await translateObject(value, targetLang);
      return [key, translatedValue] as const;
    });
    
    const translatedEntries = await Promise.all(translationPromises);
    return Object.fromEntries(translatedEntries);
  }
  
  // Return primitive values as-is (number, boolean, null, undefined)
  return obj;
}

async function translateChileanTranslation(): Promise<void> {
  if (!process.env.DEEPL_API_KEY) {
    throw new Error('DEEPL_API_KEY environment variable is required');
  }

  console.log('🌍 Starting translation process...');
  console.log(`📝 Total locales to process: ${locales.length - 1} (excluding source es-cl)`);

  const translationPromises = locales
    .filter(locale => locale !== 'es-cl')
    .map(async (locale): Promise<{ locale: Locale; success: boolean }> => {
      const targetLang = localeToDeepLMap[locale];
      console.log(`🔄 Translating to ${locale} (${targetLang})...`);
      
      try {
        const translatedContent = await translateObject(chileanTranslation, targetLang);
        
        const outputPath = path.join(__dirname, '..', 'locales', `${locale}.json`);
        fs.writeFileSync(outputPath, JSON.stringify(translatedContent, null, 2), 'utf8');
        
        console.log(`✅ Translation completed for ${locale}`);
        return { locale, success: true };
      } catch (error) {
        console.error(`❌ Error translating to ${locale}:`, error);
        return { locale, success: false };
      }
    });

  const results = await Promise.all(translationPromises);

  // Summary
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log('\n📊 Translation Summary:');
  console.log(`✅ Successful: ${successful}`);
  console.log(`❌ Failed: ${failed}`);
  
  if (failed > 0) {
    console.log('❌ Failed locales:', results.filter(r => !r.success).map(r => r.locale).join(', '));
  }
}

// Execute the translation if run directly
if (require.main === module) {
  translateChileanTranslation().catch(console.error);
}
