import { EmojiGithubMeta, Moji } from '@svgmoji/core';
import { getVersion } from 'json.macro';

export class Notomoji extends Moji {
  name = 'noto' as const;
  version = getVersion();
}

export const NOTO_META: EmojiGithubMeta = {
  name: 'noto',
  owner: 'googlefonts',
  repo: 'noto-emoji',
  sha: 'v2020-09-16-unicode13_1',
  directory: 'svg',
};
