import type { FlatEmoji, MinifiedEmoji } from './types';

export function isMinifiedEmoji(value: unknown): value is MinifiedEmoji {
  if (typeof value !== 'object' || value == null) {
    return false;
  }

  const keys = Object.keys(value);
  return keys.includes('h') && keys.includes('e');
}

export function isFlatEmoji(value: unknown): value is FlatEmoji {
  if (typeof value !== 'object' || value == null) {
    return false;
  }

  const keys = Object.keys(value);
  return keys.includes('hexcode') && keys.includes('emoji');
}

export function isMinifiedEmojiList(list: unknown[]): list is MinifiedEmoji[] {
  return isMinifiedEmoji(list[0]);
}

export function isFlatEmojiList(list: unknown[]): list is FlatEmoji[] {
  return isFlatEmoji(list[0]);
}
