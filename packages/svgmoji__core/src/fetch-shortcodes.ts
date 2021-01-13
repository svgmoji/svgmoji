import type { Locale, ShortcodePreset, ShortcodesDataset } from 'emojibase';
import { NON_LATIN_LOCALES } from 'emojibase';

import { fetchFromCDN, FetchFromCDNOptions } from './fetch-from-cdn';

const ALIASES: Partial<Record<ShortcodePreset, string>> = {
  discord: 'joypixels',
  slack: 'iamcal',
};

export function fetchShortcodes(
  locale: Locale,
  preset: ShortcodePreset,
  options?: FetchFromCDNOptions,
): Promise<ShortcodesDataset> {
  if (preset === 'cldr-native' && !NON_LATIN_LOCALES.includes(locale)) {
    return Promise.resolve({});
  }

  return fetchFromCDN(`${locale}/shortcodes/${ALIASES[preset] ?? preset}.json`, options);
}
