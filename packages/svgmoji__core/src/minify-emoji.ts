import type { FlatEmoji,MinifiedEmoji } from './types';

/**
 * Minify emoji which can be useful for reducing the json bundlesize.
 */
export function minifyEmoji(emojis: readonly FlatEmoji[]): readonly MinifiedEmoji[] {
  return emojis.map((emoji) =>
    omitUndefined({
      a: emoji.annotation,
      e: emoji.emoji,
      u: emoji.emoticon,
      g: emoji.gender,
      b: emoji.group,
      h: emoji.hexcode,
      o: emoji.order,
      s: emoji.shortcodes,
      k: emoji.skins,
      c: emoji.subgroup,
      t: emoji.tags,
      d: emoji.text,
      f: emoji.tone,
      i: emoji.type,
      v: emoji.version,
    }),
  );
}

/**
 * Remove the undefined values from an object.
 */
export function omitUndefined<Type extends object>(object: Type): Type {
  return JSON.parse(JSON.stringify(object));
}
