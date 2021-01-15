declare module '@babel/register' {
  import { TransformOptions } from '@babel/core';

  function babelRegister(
    config: TransformOptions & { extensions?: string[]; cache?: boolean },
  ): void;

  export = babelRegister;
}

declare module 'localstorage-polyfill';
declare module 'isomorphic-fetch';
