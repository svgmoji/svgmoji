import { omitUndefined } from './minify-emoji';
import type { FlatEmoji, MinifiedEmoji } from './types';

/**
 * Populate the minified emoji into a readable format.
 */
export function populateMinifiedEmoji(minified: MinifiedEmoji[]): FlatEmoji[] {
  return minified.map((emoji) =>
    omitUndefined({
      annotation: emoji.a,
      emoji: emoji.e,
      emoticon: emoji.u,
      gender: emoji.g,
      group: emoji.b,
      hexcode: emoji.h,
      order: emoji.o,
      shortcodes: emoji.s,
      skins: emoji.k,
      subgroup: emoji.c,
      tags: emoji.t,
      text: emoji.d,
      tone: emoji.f,
      type: emoji.i,
      version: emoji.v,
    }),
  );
}
