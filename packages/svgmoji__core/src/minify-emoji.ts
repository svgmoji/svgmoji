import omit from 'object.omit';

import type { FlatEmoji } from './flatten-emoji-data';

/**
 * A minified emoji object which takes the flattened emoji value and minifies all the keys to
 * prevent a bloated json file.
 */
export interface MinifiedEmoji {
  /**
   * Alias for `annotation` property.
   */
  a: FlatEmoji['annotation'];

  /**
   * Alias for `emoji` property.
   */
  e: FlatEmoji['emoji'];

  /**
   * Alias for `emoticon` property.
   */
  u?: FlatEmoji['emoticon'];

  /**
   * Alias for `gender` property.
   */
  g?: FlatEmoji['gender'];

  /**
   * Alias for `group` property.
   */
  b?: FlatEmoji['group'];

  /**
   * Alias for `hexcode` property.
   */
  h: FlatEmoji['hexcode'];

  /**
   * Alias for `order` property.
   */
  o?: FlatEmoji['order'];

  /**
   * Alias for `shortcodes` property.
   */
  s?: FlatEmoji['shortcodes'];

  /**
   * Alias for `skins` property.
   */
  k?: FlatEmoji['skins'];

  /**
   * Alias for `subgroup` property.
   */
  c?: FlatEmoji['subgroup'];

  /**
   * Alias for `tags` property.
   */
  t?: FlatEmoji['tags'];

  /**
   * Alias for `text` property.
   */
  d: FlatEmoji['text'];

  /**
   * Alias for `tone` property.
   */
  f?: FlatEmoji['tone'];

  /**
   * Alias for `type` property.
   */
  i: FlatEmoji['type'];

  /**
   * Alias for `version` property.
   */
  v: FlatEmoji['version'];
}

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
  return omit(object, (value) => value !== undefined) as Type;
}
