import { EmojiGithubMeta, Moji } from '@svgmoji/core';
import { getVersion } from 'json.macro';

export class Blobmoji extends Moji {
  name = 'blob' as const;
  version = getVersion();
}

export const BLOB_META: EmojiGithubMeta = {
  name: 'blob',
  owner: 'c1710',
  repo: 'blobmoji',
  sha: 'v2019-06-14-Emoji-12',
  directory: 'svg',
};
