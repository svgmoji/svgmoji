import { EmojiGithubMeta, Moji } from '@svgmoji/core';
import { getVersion } from 'json.macro';

export class Twemoji extends Moji {
  name = 'twemoji';
  version = getVersion();
}

export const TWEMOJI_META: EmojiGithubMeta = {
  name: 'twemoji',
  owner: 'twitter',
  repo: 'twemoji',
  sha: 'v13.0.1',
  directory: 'assets/svg',
};
