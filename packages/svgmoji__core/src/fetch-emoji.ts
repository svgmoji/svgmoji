import type { Emoji, Locale, ShortcodePreset, ShortcodesDataset } from 'emojibase';

import { fetchFromCDN, FetchFromCDNOptions } from './fetch-from-cdn';
import { fetchShortcodes } from './fetch-shortcodes';
import { FlatEmoji, flattenEmojiData } from './flatten-emoji-data';

export interface FetchEmojisOptions<Type extends Locale> extends FetchFromCDNOptions {
  shortcodes?: Array<EmojiShortcodeLocale<Type> | ShortcodePreset>;
}

export type EmojiShortcodeLocale<Type extends Locale> = `${Exclude<
  Locale,
  Type
>}/${ShortcodePreset}`;

export async function fetchEmojis<Type extends Locale>(
  locale: Type,
  options: FetchEmojisOptions<Type> = {},
): Promise<FlatEmoji[]> {
  const { shortcodes: presets = [], ...opts } = options;
  const emojis = await fetchFromCDN<Emoji[]>(`${locale}/data.json`, opts);
  let shortcodes: ShortcodesDataset[] = [];

  if (presets.length > 0) {
    shortcodes = await Promise.all(
      presets.map((preset) => {
        let promise: Promise<ShortcodesDataset>;

        if (preset.includes('/')) {
          const [customLocale, customPreset] = preset.split('/');

          promise = fetchShortcodes(customLocale as Locale, customPreset as ShortcodePreset, opts);
        } else {
          promise = fetchShortcodes(locale, preset as ShortcodePreset, opts);
        }

        // Ignore as the primary dataset should still load
        return promise.catch(() => ({}));
      }),
    );
  }

  return flattenEmojiData(emojis, shortcodes);
}
