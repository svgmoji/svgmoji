import type { ValueOf } from 'type-fest';

export const SpriteCollection = {
  /**
   * A larger bundle size with all the available emoji in one package.
   */
  All: 'all',

  /**
   * Break the emoji down into 10 separate groups.
   */
  Group: 'group',

  /**
   * Further break the emoji down into even smaller sub groups.
   */
  Subgroup: 'sub-group',

  /**
   * Get the direct url for the emoji
   */
  Individual: 'individual',
} as const;

export type SpriteCollectionType = ValueOf<typeof SpriteCollection>;

export interface EmojiGithubMeta {
  owner: string;
  repo: string;
  sha: string;

  /**
   * The name of the emoji library.
   */
  name: string;

  /**
   * The directory to the emoji directory.
   */
  directory: string;
}
