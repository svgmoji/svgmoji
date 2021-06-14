import { EmojiGithubMeta, Moji } from '@svgmoji/core';
import { getVersion } from 'json.macro';

export class Twemoji extends Moji {
  name = 'twemoji' as const;
  version = VERSION;
}

export const TWEMOJI_META: EmojiGithubMeta = {
  name: 'twemoji',
  owner: 'twitter',
  repo: 'twemoji',
  sha: 'v13.1.0',
  directory: 'assets/svg',
};

const VERSION = getVersion();
