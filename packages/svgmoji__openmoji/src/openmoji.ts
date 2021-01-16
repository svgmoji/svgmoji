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
  sha: '93513a3832db7c36bf0be119746456907972b262',
  directory: 'color/svg',
};
