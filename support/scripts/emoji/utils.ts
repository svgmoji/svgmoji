import { EmojiGithubMeta, Emoticon, FlatEmoji, stripHexcode } from '@svgmoji/core';
import path from 'path';
import { BLOB_META, NOTO_META, OPENMOJI_META, TWEMOJI_META } from 'svgmoji';
import emojis from 'svgmoji/emoji.json';

import { baseDir, log } from '../helpers';

interface EmojiConstantData {
  emojis: FlatEmoji[];
  emoticons: Record<string, Emoticon[]>;
}

export const data: EmojiConstantData = {
  emojis: (emojis as FlatEmoji[]) ?? [],
  emoticons: {},
};

/**
 * The library for emoji svg's.
 */
export interface EmojiLibrary extends EmojiGithubMeta {
  /**
   * Get the path relative to the directory from the provided compact emoji.
   */
  extractPath: (hexcode: string) => string;

  /**
   * Get the hexcode from the file path
   */
  getHexcode: (path: string) => string;
}

export const packagesDirectory = baseDir('packages');

/**
 * Get the destination directory for the emoji package.
 */
export function getSvgDestination(name: string) {
  return path.join(packagesDirectory, `svgmoji__${name}`, 'svg');
}

export const emojiLibraries: EmojiLibrary[] = [
  { ...NOTO_META, extractPath, getHexcode },
  { ...BLOB_META, extractPath, getHexcode },
  {
    ...OPENMOJI_META,
    extractPath: (hexcode) => `${hexcode}.svg`,
    getHexcode: (filePath) => filePath.replace('.svg', ''),
  },
  {
    ...TWEMOJI_META,
    extractPath: (hexcode) => `${hexcode.toLowerCase()}.svg`,
    getHexcode: (filePath) => filePath.replace('.svg', '').toUpperCase(),
  },
];

function extractPath(hexcode: string) {
  return `emoji_u${hexcode.replace(/-FE0F/, '').split('-').join('_').toLowerCase()}.svg`;
}

function getHexcode(filePath: string) {
  const maybeHexcode = filePath
    .replace('emoji_u', '')
    .replace('.svg', '')
    .split('_')
    .join('-')
    .toUpperCase();
  const found = data.emojis.find(
    (emoji) =>
      stripHexcode(emoji.hexcode) === stripHexcode(maybeHexcode) ||
      emoji.hexcode.replace(/-FE0F/, '') === maybeHexcode ||
      stripHexcode(emoji.hexcode) === `${maybeHexcode}-20E3`,
  );

  if (!found) {
    log.warn(`No hexcode could be found for the filePath: ${filePath}, hexcode: ${maybeHexcode}`);
  }

  return found?.hexcode ?? maybeHexcode;
}
