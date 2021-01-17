import { generateEmoticonPermutations } from 'emojibase';
import { loadJson } from 'json.macro';
import { matchSorter, rankings } from 'match-sorter';

import type { SpriteCollectionType } from './constants';
import { SpriteCollection } from './constants';
import { isFlatEmoji, isMinifiedEmojiList } from './core-utils';
import { populateMinifiedEmoji } from './populate-minified-emoji';
import type { FlatEmoji, MinifiedEmoji } from './types';

const groups: Record<number, string> = loadJson('emojibase-data/meta/groups.json', 'groups');
const subgroups: Record<number, string> = loadJson('emojibase-data/meta/groups.json', 'subgroups');

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
  readonly data: FlatEmoji[];

  /**
   * Only data without tones included.
   */
  readonly tonelessData: FlatEmoji[];

  /**
   * The type of sprite to load.
   */
  type: SpriteCollectionType;

  /**
   * The fallback emoji to use when none can be found.
   */
  fallback: FlatEmoji;

  /**
   * Cache the results for finding an emoji.
   */
  readonly #findCache = new Map<string, FlatEmoji | undefined>();

  get cdn(): string {
    return `https://cdn.jsdelivr.net/npm/@svgmoji/${this.name}@${this.version}`;
  }

  get fallbackUrl(): string {
    return `${this.cdn}/svg/${this.fallback.hexcode}.svg`;
  }

  /**
   * @param data - data which is used to lookup the groups and subgroups for the emoji instance
   * @param fallback - the default hexcode to use when none can be found.
   */
  constructor({ data, type, fallback = '1F44D' }: MojiProps) {
    this.type = type;
    this.data = isMinifiedEmojiList(data) ? populateMinifiedEmoji(data) : data;
    this.tonelessData = this.data.filter((emoji) => !emoji.tone);

    const fallbackEmoji = this.find(fallback);

    if (!fallbackEmoji) {
      throw new Error(`❌ No emoji exists for the provided fallback value: '${fallback}'`);
    }

    this.fallback = fallbackEmoji;
  }

  /**
   * Get the CDN url from the provided emoji hexcode, emoticon or unicode string.
   */
  url(emoji: FlatEmoji): string;
  url(code: string, options: { fallback: false }): string | undefined;
  url(code: string, options?: { fallback?: true }): string;
  url(code: string | FlatEmoji, options: { fallback?: boolean } = {}): string | undefined {
    const { fallback = true } = options;
    const emoji = isFlatEmoji(code) ? code : this.find(code);
    const fallbackUrl = fallback ? this.fallbackUrl : undefined;

    if (!emoji) {
      return fallbackUrl;
    }

    if (this.type === SpriteCollection.All) {
      return `${this.cdn}/sprites/all.svg#${emoji.hexcode}`;
    }

    if (this.type === SpriteCollection.Individual) {
      return `${this.cdn}/svg/${emoji.hexcode}.svg`;
    }

    if (this.type === SpriteCollection.Group && emoji.group != null) {
      const name = groups[emoji.group] ?? 'other';
      return `${this.cdn}/sprites/group/${name}.svg#${emoji.hexcode}`;
    }

    if (this.type === SpriteCollection.Subgroup && emoji.subgroup != null) {
      const name = subgroups[emoji.subgroup] ?? 'other';
      return `${this.cdn}/sprites/subgroup/${name}.svg#${emoji.hexcode}`;
    }

    return fallbackUrl;
  }

  /**
   * Get an the emoji object of a value by it's hexcode, emoticon or unicode string.
   */
  find(code: string): FlatEmoji | undefined {
    if (this.#findCache.has(code)) {
      return this.#findCache.get(code);
    }

    for (const emoji of this.data) {
      if (
        // This is a native emoji match
        emoji.emoji === code ||
        // This uses the underlying text representation of the emoji
        emoji.text === code ||
        // This is a hexcode match.
        emoji.hexcode === code ||
        // There is a match for the shortcode
        emoji.shortcodes?.includes(code) ||
        // There is a match for the shortcode, but with surrounding braces.
        emoji.shortcodes?.map((shortcode) => `:${shortcode}:`).includes(code) ||
        // The provided code matches the emoticon.
        (emoji.emoticon && generateEmoticonPermutations(emoji.emoticon).includes(code))
      ) {
        this.#findCache.set(code, emoji);
        return emoji;
      }
    }

    // No matches were found in the data.
    // eslint-disable-next-line unicorn/no-useless-undefined
    this.#findCache.set(code, undefined);
    return;
  }

  /**
   * Search for the nearest emoji using the `match-sorter` algorithm.
   */
  search(query: string, options: BaseMojiProps = {}): FlatEmoji[] {
    const { excludeTone } = { ...DEFAULT_OPTIONS, ...options };
    const data = excludeTone ? this.tonelessData : this.data;

    if (!query) {
      return data;
    }

    return matchSorter(data, query, {
      threshold: rankings.WORD_STARTS_WITH,
      keys: [
        { threshold: rankings.STARTS_WITH, key: 'shortcodes' },
        'tags',
        'annotation',
        (item) => (item.subgroup ? subgroups[item.subgroup]?.split('-').join(' ') ?? '' : ''),
        (item) => (item.group ? groups[item.group]?.split('-').join(' ') ?? '' : ''),
      ],
    });
  }

  /**
   * Get skins from emoji
   */
  getTones(emoji: FlatEmoji): FlatEmoji[] {
    const skins: FlatEmoji[] = [];

    for (const skin of emoji.skins ?? []) {
      const skinEmoji = this.find(skin);

      if (skinEmoji) {
        skins.push();
      }
    }

    return skins;
  }
}

const DEFAULT_OPTIONS: Required<BaseMojiProps> = {
  excludeTone: false,
};

interface BaseMojiProps {
  /**
   * When true only emoji without tone data will be used.
   *
   * @default true;
   */
  excludeTone?: boolean;
}
