/**
 * @script
 *
 * This script registers `esbuild` as a pre transpilation step.
 *
 * Adapted from
 * https://github.com/egoist/esbuild-register/blob/0aa4077552b9f65ea1eb0734900d101c390cdaaa/src/node.ts#L1-L65
 */

import { transformSync } from 'esbuild';
import path from 'path';
import { addHook } from 'pirates';
import sourceMapSupport from 'source-map-support';

/** @type {{ [file: string]: import('source-map-support').UrlAndMap['map'] }} */
const map = {};

function installSourceMapSupport() {
  sourceMapSupport.install({
    handleUncaughtExceptions: false,
    environment: 'node',
    retrieveSourceMap(file) {
      const mappedFile = map[file];

      if (mappedFile) {
        return {
          url: file,
          map: mappedFile,
        };
      }

      return null;
    },
  });
}

/**
 * @typedef {'.js' | '.jsx' | '.ts' |'.tsx'|'.mjs'} Extension
 * @typedef {'js' | 'jsx' | 'ts' |'tsx'} Loader
 * @typedef {Record<Extension, Loader>} FileLoader
 */

/** @type {FileLoader } */
const FILE_LOADERS = {
  '.js': 'js',
  '.jsx': 'jsx',
  '.ts': 'ts',
  '.tsx': 'tsx',
  '.mjs': 'js',
};

const DEFAULT_EXTENSIONS = Object.keys(FILE_LOADERS);

/** @type {(filename: string) => Loader} */
function getLoader(filename) {
  return FILE_LOADERS[/** @type {Extension} */ (path.extname(filename))];
}

/**
 * @param {string} code
 * @param {string} filename
 *
 * @returns {string}
 */
function compile(code, filename) {
  const { code: js, warnings, map: jsSourceMap } = transformSync(code, {
    sourcefile: filename,
    sourcemap: true,
    loader: getLoader(filename),
    target: 'es2017',
  });

  map[filename] = jsSourceMap;

  if (warnings && warnings.length > 0) {
    for (const warning of warnings) {
      console.log(warning.location);
      console.log(warning.text);
    }
  }

  return js;
}

function register() {
  installSourceMapSupport();
  addHook(compile, {
    exts: DEFAULT_EXTENSIONS,
  });
}

register();
