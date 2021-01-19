import { EmojiGithubMeta, Moji, SpriteCollection } from '@svgmoji/core';
import { getVersion } from 'json.macro';

export class Notomoji extends Moji {
  name = 'noto' as const;
  version = VERSION;

  get cdn(): string {
    // Overwrite the cdn url, since `cdn.jsdeliver.net` restricts github assets of greater than 20MB.
    if (this.type === SpriteCollection.All) {
      return `https://cdn.jsdelivr.net/npm/@svgmoji/${this.name}@${this.version}`;
    }

    return super.cdn;
  }
}

export const NOTO_META: EmojiGithubMeta = {
  name: 'noto',
  owner: 'googlefonts',
  repo: 'noto-emoji',
  sha: 'v2020-09-16-unicode13_1',
  directory: 'svg',
};

const VERSION = getVersion();
