import { fromUnicodeToHexcode } from 'emojibase';
import { groups, subgroups } from 'emojibase-data/meta/groups.json';

import type { SpriteCollectionType } from './constants';
import { SpriteCollection } from './constants';
import { isMinifiedEmojiList } from './core-utils';
import type { FlatEmoji } from './flatten-emoji-data';
import type { MinifiedEmoji } from './minify-emoji';
import { populateMinifiedEmoji } from './populate-minified-emoji';

interface MojiProps {
  /**
   * The data which is used to check the existing emoji.
   */
  data: FlatEmoji[] | MinifiedEmoji[];

  /**
   * The default sprite to use.
   */
  type: SpriteCollectionType;

  /**
   * The default emoji hexcode to use.
   *
   * @default `1F44D` // 👍
   */
  fallback?: string;
}

export abstract class Moji {
  /**
   * The name of the svgmoji.
   */
  abstract readonly name: string;

  /**
   * The version to retrieve from the cdn.
   */
  abstract readonly version: string;

  /**
   * All the available emoji.
   */
  data: FlatEmoji[];

  /**
   * The type of sprite to load.
   */
  type: SpriteCollectionType;

  /**
   * The fallback svg to use when none can be found.
   */
  fallback: string;

  /**
   * @param data - data which is used to lookup the groups and subgroups for the emoji instance
   * @param fallback - the default hexcode to use when none can be found.
   */
  constructor({ data, type, fallback = '1F44D' }: MojiProps) {
    this.data = isMinifiedEmojiList(data) ? populateMinifiedEmoji(data) : data;
    this.type = type;
    this.fallback = fallback;
  }

  get cdn(): string {
    return `https://cdn.jsdelivr.net/npm/@svgmoji/${this.name}@${this.version}/`;
  }

  /**
   * Get the CDN url from the provided emoji.
   */
  getUrl(emoji: string) {
    return this.getUrlFromHexcode(fromUnicodeToHexcode(emoji));
  }

  getUrlFromHexcode(hexcode: string): string {
    if (this.type === SpriteCollection.All) {
      return `${this.cdn}/sprites/all.svg#${hexcode}`;
    }

    if (this.type === SpriteCollection.Individual) {
      return `${this.cdn}/svg/${hexcode}.svg`;
    }

    const emoji = this.data.find((emoji) => emoji.hexcode === hexcode);

    if (this.type === SpriteCollection.Group && emoji?.group) {
      const name = groups[`${emoji.group}` as keyof typeof groups];
      return `${this.cdn}/sprites/group/${name}.svg#${hexcode}`;
    }

    if (this.type === SpriteCollection.Subgroup && emoji?.subgroup) {
      const name = subgroups[`${emoji.subgroup}` as keyof typeof subgroups];
      return `${this.cdn}/sprites/subgroup/${name}.svg#${hexcode}`;
    }

    return `${this.cdn}/svg/${this.fallback}.svg`;
  }
}
