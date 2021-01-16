import { EmojiGithubMeta, Moji } from '@svgmoji/core';
import { getVersion } from 'json.macro';

export class Openmoji extends Moji {
  name = 'openmoji' as const;
  version = getVersion();
}

export const OPENMOJI_META: EmojiGithubMeta = {
  name: 'openmoji',
  owner: 'hfg-gmuend',
  repo: 'openmoji',
  sha: '13.0.0',
  directory: 'color/svg',
};
