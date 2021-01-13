import type { Emoji, MaybeEmoji, ShortcodesDataset } from 'emojibase';

export function joinShortcodesToEmoji<Type extends MaybeEmoji>(
  emoji: Type,
  shortcodeDatasets: ShortcodesDataset[],
): Type {
  if (shortcodeDatasets.length === 0) {
    return emoji;
  }

  const list = new Set(emoji.shortcodes);

  for (const dataset of shortcodeDatasets) {
    const shortcodes = dataset[emoji.hexcode];

    if (Array.isArray(shortcodes)) {
      shortcodes.forEach((code) => list.add(code));
    } else if (shortcodes) {
      list.add(shortcodes);
    }
  }

  emoji.shortcodes = [...list];

  if (!emoji.skins) {
    return emoji;
  }

  for (const skin of emoji.skins) {
    joinShortcodesToEmoji(skin as Emoji, shortcodeDatasets);
  }

  return emoji;
}
