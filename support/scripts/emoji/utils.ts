import { EmojiGithubMeta, Emoticon, FlatEmoji, stripHexcode } from '@svgmoji/core';
import openmojiJson from 'openmoji/data/openmoji.json';
import path from 'path';
import { BLOB_META, fromUnicodeToHexcode, NOTO_META, OPENMOJI_META, TWEMOJI_META } from 'svgmoji';
import emojis from 'svgmoji/emoji.json';

import { baseDir } from '../helpers';

interface EmojiConstantData {
  emojis: FlatEmoji[];
  /** A set of all the valid hexcodes in the emoji data set */
  hexcodes: string[];
  emoticons: Record<string, Emoticon[]>;

  /** The non-standard emoji provided by each library */
  extra: Record<string, string[]>;
}

export const data: EmojiConstantData = {
  emojis: (emojis as FlatEmoji[]) ?? [],
  hexcodes: [],
  emoticons: {},
  extra: {},
};

/**
 * The library for emoji svg's.
 */
export interface EmojiLibrary extends EmojiGithubMeta {
  /**
   * Convert the default file path name to a hexcode file path.
   */
  getSvgFile: (path: string) => string;

  /**
   * Optional method for transforming the extra hexcode into a flat emoji that can be used as if it were standard.
   */
  transform?: (hexcode: string) => FlatEmoji;

  /**
   * An extra folder where svg are also stored. Will be copied into the primary folder.
   */
  extraFolder?: string;
}

export const packagesDirectory = baseDir('packages');

/**
 * Get the destination directory for the emoji package.
 */
export function getSvgDestination(name: string, folder = 'svg') {
  return path.join(packagesDirectory, `svgmoji__${name}`, folder);
}

const extraFolder = 'third_party/region-flags/svg';

export const emojiLibraries: EmojiLibrary[] = [
  { ...NOTO_META, getSvgFile: createGetSvgFile('noto'), extraFolder },
  { ...BLOB_META, getSvgFile: createGetSvgFile('blob'), extraFolder },
  { ...OPENMOJI_META, getSvgFile: getOpenmojiSvgFile, transform: openmojiTransform },
  { ...TWEMOJI_META, getSvgFile: getTwemojiSvgfile },
];

function openmojiTransform(hexcode: string): FlatEmoji {
  const emoji = openmojiJson.find((value) => value.hexcode === hexcode);

  if (!emoji) {
    throw new Error(`no openmoji found for the hexcode ${hexcode}`);
  }

  return {
    annotation: emoji.annotation,
    emoji: emoji.emoji,
    hexcode,
    text: '',
    type: 1,
    version: -1,
    tags: emoji.openmoji_tags?.split(', '),
  };
}

function getOpenmojiSvgFile(filePath: string) {
  const maybeHexcode = filePath.replace('.svg', '');
  const found = data.emojis.find(
    (emoji) => stripHexcode(emoji.hexcode) === stripHexcode(maybeHexcode),
  );

  if (!found) {
    data.extra.openmoji ??= [];
    data.extra.openmoji.push(maybeHexcode);
  }

  return filePath;
}

function getTwemojiSvgfile(filePath: string) {
  const maybeHexcode = filePath.replace('.svg', '').toUpperCase();
  const found = data.emojis.find(
    (emoji) =>
      stripHexcode(emoji.hexcode) === stripHexcode(maybeHexcode) ||
      emoji.hexcode.replace(/-FE0F/, '') === maybeHexcode ||
      stripHexcode(emoji.hexcode) === `${maybeHexcode}-20E3`,
  );

  if (!found) {
    data.extra.twemoji ??= [];
    data.extra.twemoji.push(maybeHexcode);

    return `${maybeHexcode}.svg`;
  }

  return `${found.hexcode}.svg`;
}

function createGetSvgFile(library: string) {
  return (filePath: string) => {
    let maybeHexcode = filePath
      .replace('emoji_u', '')
      .replace('.svg', '')
      .split('_')
      .join('-')
      .toUpperCase();

    const countryEmoji = COUNTRY_CODES[maybeHexcode];

    if (countryEmoji) {
      maybeHexcode = fromUnicodeToHexcode(countryEmoji);
    }

    const found = data.emojis.find(
      (emoji) =>
        stripHexcode(emoji.hexcode) === stripHexcode(maybeHexcode) ||
        emoji.hexcode.replace(/-FE0F/, '') === maybeHexcode ||
        stripHexcode(emoji.hexcode) === `${maybeHexcode}-20E3`,
    );

    if (!found) {
      const missing = data.extra[library] ?? [];
      missing.push(maybeHexcode);
      data.extra[library] = missing;

      return `${maybeHexcode}.svg`;
    }

    return `${found.hexcode}.svg`;
  };
}

const COUNTRY_CODES: Record<string, string> = {
  AC: '🇦🇨',
  AD: '🇦🇩',
  AE: '🇦🇪',
  AF: '🇦🇫',
  AG: '🇦🇬',
  AI: '🇦🇮',
  AL: '🇦🇱',
  AM: '🇦🇲',
  AO: '🇦🇴',
  AQ: '🇦🇶',
  AR: '🇦🇷',
  AS: '🇦🇸',
  AT: '🇦🇹',
  AU: '🇦🇺',
  AW: '🇦🇼',
  AX: '🇦🇽',
  AZ: '🇦🇿',
  BA: '🇧🇦',
  BB: '🇧🇧',
  BD: '🇧🇩',
  BE: '🇧🇪',
  BF: '🇧🇫',
  BG: '🇧🇬',
  BH: '🇧🇭',
  BI: '🇧🇮',
  BJ: '🇧🇯',
  BL: '🇧🇱',
  BM: '🇧🇲',
  BN: '🇧🇳',
  BO: '🇧🇴',
  BQ: '🇧🇶',
  BR: '🇧🇷',
  BS: '🇧🇸',
  BT: '🇧🇹',
  BV: '🇧🇻',
  BW: '🇧🇼',
  BY: '🇧🇾',
  BZ: '🇧🇿',
  CA: '🇨🇦',
  CC: '🇨🇨',
  CD: '🇨🇩',
  CF: '🇨🇫',
  CG: '🇨🇬',
  CH: '🇨🇭',
  CI: '🇨🇮',
  CK: '🇨🇰',
  CL: '🇨🇱',
  CM: '🇨🇲',
  CN: '🇨🇳',
  CO: '🇨🇴',
  CP: '🇨🇵',
  CR: '🇨🇷',
  CU: '🇨🇺',
  CV: '🇨🇻',
  CW: '🇨🇼',
  CX: '🇨🇽',
  CY: '🇨🇾',
  CZ: '🇨🇿',
  DE: '🇩🇪',
  DG: '🇩🇬',
  DJ: '🇩🇯',
  DK: '🇩🇰',
  DM: '🇩🇲',
  DO: '🇩🇴',
  DZ: '🇩🇿',
  EA: '🇪🇦',
  EC: '🇪🇨',
  EE: '🇪🇪',
  EG: '🇪🇬',
  EH: '🇪🇭',
  ER: '🇪🇷',
  ES: '🇪🇸',
  ET: '🇪🇹',
  EU: '🇪🇺',
  FI: '🇫🇮',
  FJ: '🇫🇯',
  FK: '🇫🇰',
  FM: '🇫🇲',
  FO: '🇫🇴',
  FR: '🇫🇷',
  GA: '🇬🇦',
  GB: '🇬🇧',
  'GB-ENG': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  'GB-WLS': '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
  'GB-SCT': '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  GD: '🇬🇩',
  GE: '🇬🇪',
  GF: '🇬🇫',
  GG: '🇬🇬',
  GH: '🇬🇭',
  GI: '🇬🇮',
  GL: '🇬🇱',
  GM: '🇬🇲',
  GN: '🇬🇳',
  GP: '🇬🇵',
  GQ: '🇬🇶',
  GR: '🇬🇷',
  GS: '🇬🇸',
  GT: '🇬🇹',
  GU: '🇬🇺',
  GW: '🇬🇼',
  GY: '🇬🇾',
  HK: '🇭🇰',
  HM: '🇭🇲',
  HN: '🇭🇳',
  HR: '🇭🇷',
  HT: '🇭🇹',
  HU: '🇭🇺',
  IC: '🇮🇨',
  ID: '🇮🇩',
  IE: '🇮🇪',
  IL: '🇮🇱',
  IM: '🇮🇲',
  IN: '🇮🇳',
  IO: '🇮🇴',
  IQ: '🇮🇶',
  IR: '🇮🇷',
  IS: '🇮🇸',
  IT: '🇮🇹',
  JE: '🇯🇪',
  JM: '🇯🇲',
  JO: '🇯🇴',
  JP: '🇯🇵',
  KE: '🇰🇪',
  KG: '🇰🇬',
  KH: '🇰🇭',
  KI: '🇰🇮',
  KM: '🇰🇲',
  KN: '🇰🇳',
  KP: '🇰🇵',
  KR: '🇰🇷',
  KW: '🇰🇼',
  KY: '🇰🇾',
  KZ: '🇰🇿',
  LA: '🇱🇦',
  LB: '🇱🇧',
  LC: '🇱🇨',
  LI: '🇱🇮',
  LK: '🇱🇰',
  LR: '🇱🇷',
  LS: '🇱🇸',
  LT: '🇱🇹',
  LU: '🇱🇺',
  LV: '🇱🇻',
  LY: '🇱🇾',
  MA: '🇲🇦',
  MC: '🇲🇨',
  MD: '🇲🇩',
  ME: '🇲🇪',
  MF: '🇲🇫',
  MG: '🇲🇬',
  MH: '🇲🇭',
  MK: '🇲🇰',
  ML: '🇲🇱',
  MM: '🇲🇲',
  MN: '🇲🇳',
  MO: '🇲🇴',
  MP: '🇲🇵',
  MQ: '🇲🇶',
  MR: '🇲🇷',
  MS: '🇲🇸',
  MT: '🇲🇹',
  MU: '🇲🇺',
  MV: '🇲🇻',
  MW: '🇲🇼',
  MX: '🇲🇽',
  MY: '🇲🇾',
  MZ: '🇲🇿',
  NA: '🇳🇦',
  NC: '🇳🇨',
  NE: '🇳🇪',
  NF: '🇳🇫',
  NG: '🇳🇬',
  NI: '🇳🇮',
  NL: '🇳🇱',
  NO: '🇳🇴',
  NP: '🇳🇵',
  NR: '🇳🇷',
  NU: '🇳🇺',
  NZ: '🇳🇿',
  OM: '🇴🇲',
  PA: '🇵🇦',
  PE: '🇵🇪',
  PF: '🇵🇫',
  PG: '🇵🇬',
  PH: '🇵🇭',
  PK: '🇵🇰',
  PL: '🇵🇱',
  PM: '🇵🇲',
  PN: '🇵🇳',
  PR: '🇵🇷',
  PS: '🇵🇸',
  PT: '🇵🇹',
  PW: '🇵🇼',
  PY: '🇵🇾',
  QA: '🇶🇦',
  RE: '🇷🇪',
  RO: '🇷🇴',
  RS: '🇷🇸',
  RU: '🇷🇺',
  RW: '🇷🇼',
  SA: '🇸🇦',
  SB: '🇸🇧',
  SC: '🇸🇨',
  SD: '🇸🇩',
  SE: '🇸🇪',
  SG: '🇸🇬',
  SH: '🇸🇭',
  SI: '🇸🇮',
  SJ: '🇸🇯',
  SK: '🇸🇰',
  SL: '🇸🇱',
  SM: '🇸🇲',
  SN: '🇸🇳',
  SO: '🇸🇴',
  SR: '🇸🇷',
  SS: '🇸🇸',
  ST: '🇸🇹',
  SV: '🇸🇻',
  SX: '🇸🇽',
  SY: '🇸🇾',
  SZ: '🇸🇿',
  TA: '🇹🇦',
  TC: '🇹🇨',
  TD: '🇹🇩',
  TF: '🇹🇫',
  TG: '🇹🇬',
  TH: '🇹🇭',
  TJ: '🇹🇯',
  TK: '🇹🇰',
  TL: '🇹🇱',
  TM: '🇹🇲',
  TN: '🇹🇳',
  TO: '🇹🇴',
  TR: '🇹🇷',
  TT: '🇹🇹',
  TV: '🇹🇻',
  TW: '🇹🇼',
  TZ: '🇹🇿',
  UA: '🇺🇦',
  UG: '🇺🇬',
  UM: '🇺🇲',
  UN: '🇺🇳',
  US: '🇺🇸',
  UY: '🇺🇾',
  UZ: '🇺🇿',
  VA: '🇻🇦',
  VC: '🇻🇨',
  VE: '🇻🇪',
  VG: '🇻🇬',
  VI: '🇻🇮',
  VN: '🇻🇳',
  VU: '🇻🇺',
  WF: '🇼🇫',
  WS: '🇼🇸',
  XK: '🇽🇰',
  YE: '🇾🇪',
  YT: '🇾🇹',
  ZA: '🇿🇦',
  ZM: '🇿🇲',
  ZW: '🇿🇼',
};
