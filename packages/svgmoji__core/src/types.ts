import type { Emoji as BaseEmoji, SkinTone } from 'emojibase';

export interface FlatEmoji extends Omit<BaseEmoji, 'skins' | 'tone'> {
  /**
   * The hexcodes for the skins contained.
   */
  skins?: string[];

  /**
   * The skin tone.
   */
  tone?: SkinToneTuple;
}

export interface Emoji extends Omit<FlatEmoji, 'skins'> {
  /**
   * The populated skin value.
   */
  skins?: FlatEmoji[];
}

export interface HexcodeWithTone {
  hexcode: string;
  tone: SkinToneTuple;
}

/**
 * The skin tone which allows a second tone for complex emoji that support multiple tones for
 * different characters.
 */
export type SkinToneTuple = [primary: SkinTone, secondary?: SkinTone];

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
