import type { Emoji as BaseEmoji, ShortcodesDataset, SkinTone } from 'emojibase';

import { joinShortcodesToEmoji as joinShortcodesToEmoji } from './join-shortcodes-to-emoji';
import type { FlatEmoji,SkinToneTuple } from './types';

/**
 * Throws an error if the tone is undefined.
 */
function getTone(tone: SkinTone | SkinTone[] | undefined): SkinToneTuple {
  if (!tone) {
    throw new Error('A tone is required when using `getTone`');
  }

  return Array.isArray(tone) ? [tone[0] as SkinTone, tone[1]] : [tone];
}

function createFlatEmoji(
  base: Omit<BaseEmoji, 'skins' | 'tone'>,
  skins: BaseEmoji[] | undefined,
  tone: SkinTone | SkinTone[] | undefined,
) {
  const flatEmoji: FlatEmoji = { ...base };

  if (tone) {
    flatEmoji.tone = getTone(tone);
  }

  if (skins) {
    flatEmoji.skins = skins.map((skin) => skin.hexcode);
  }

  return flatEmoji;
}

export function flattenEmojiData(
  data: BaseEmoji[],
  shortcodeDatasets: ShortcodesDataset[] = [],
): FlatEmoji[] {
  const emojis: FlatEmoji[] = [];

  for (const emoji of data) {
    const emojiWithShortcodes = joinShortcodesToEmoji(emoji, shortcodeDatasets);
    const { skins, tone, ...base } = emojiWithShortcodes;

    emojis.push(createFlatEmoji(base, skins, tone));

    if (!skins) {
      continue;
    }

    for (const skin of skins) {
      const { tone, ...baseSkin } = { ...skin };

      if (base.tags) {
        baseSkin.tags = [...base.tags];
      }

      emojis.push(createFlatEmoji(baseSkin, undefined, tone));
    }
  }

  return emojis;
}
