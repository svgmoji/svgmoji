import type { Emoji, ShortcodesDataset, SkinTone } from 'emojibase';

import { joinShortcodesToEmoji as joinShortcodesToEmoji } from './join-shortcodes-to-emoji';

export interface FlatEmoji extends Omit<Emoji, 'skins' | 'tone'> {
  /**
   * The hexcodes for the skins contained.
   */
  skins?: string[];

  /**
   * The skin tone.
   */
  tone?: SkinToneTuple;
}

function createFlatEmoji(
  base: Omit<Emoji, 'skins' | 'tone'>,
  skins: Emoji[] | undefined,
  tone: SkinTone | SkinTone[] | undefined,
) {
  const flatEmoji: FlatEmoji = { ...base };

  if (tone) {
    flatEmoji.tone = Array.isArray(tone) ? [tone[0] as SkinTone, tone[1]] : [tone];
  }

  if (skins) {
    flatEmoji.skins = skins.map((skin) => skin.hexcode);
  }

  return flatEmoji;
}

/**
 * The skin tone which allows a second tone for complex emoji that support multiple tones for
 * different characters.
 */
export type SkinToneTuple = [primary: SkinTone, secondary?: SkinTone];

export function flattenEmojiData(
  data: Emoji[],
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
