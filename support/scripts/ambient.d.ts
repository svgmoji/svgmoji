declare module '@babel/register' {
  import { TransformOptions } from '@babel/core';

  function babelRegister(
    config: TransformOptions & { extensions?: string[]; cache?: boolean },
  ): void;

  export = babelRegister;
}

declare module 'localstorage-polyfill';
declare module 'isomorphic-fetch';
declare module 'openmoji/data/openmoji.json' {
  interface OpenmojiItem {
    emoji: string;
    hexcode: string;
    group: string;
    subgroups: string;
    annotation: string;
    tags: string;
    openmoji_tags: string;
    openmoji_author: string;
    openmoji_date: string;
    skintone: string;
    skintone_combination: string;
    skintone_base_emoji: string;
    skintone_base_hexcode: string;
    unicode: number;
    order: number;
  }

  const emoji: OpenmojiItem[];
  export default emoji;
}
