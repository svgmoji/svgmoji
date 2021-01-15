import 'localstorage-polyfill';
import 'isomorphic-fetch';

import { fetchEmojis, generateEmoticonPermutations, minifyEmoji } from '@svgmoji/core';
import { mkdir, readdir, readFile, writeFile } from 'fs/promises';
import got from 'got';
import ms from 'ms';
import os from 'os';
import pLimit from 'p-limit';
import path from 'path';
import SVGO from 'svgo';
import tar from 'tar';

import { cliArgs, formatFiles, log } from '../helpers';
import { data, emojiLibraries, EmojiLibrary, getSvgDestination, packagesDirectory } from './utils';

async function download() {
  log.debug('\n⏬ Starting download...');
  const emojiFile = path.join(packagesDirectory, 'svgmoji', `emoji.json`);
  const minifiedEmojiFile = path.join(packagesDirectory, 'svgmoji', `emoji.min.json`);
  const emoticonsFile = path.join(packagesDirectory, 'svgmoji', `emoticons.json`);
  const tmpdir = path.join(os.tmpdir(), '__svgmoji__');

  log.debug('\n😊 Loading emojis from cdn');
  data.emojis = await fetchEmojis('en', { shortcodes: ['cldr'] });

  for (const emoji of data.emojis) {
    if (!emoji.emoticon) {
      continue;
    }

    data.emoticons[emoji.hexcode] = generateEmoticonPermutations(emoji.emoticon);
  }

  log.debug('\nWriting EMOJI to file');
  await writeFile(emojiFile, JSON.stringify(data.emojis, null, 2));

  log.debug('\nWriting MINIFIED EMOJI to file');
  await writeFile(minifiedEmojiFile, JSON.stringify(minifyEmoji(data.emojis), null, 2));

  log.debug('\nWriting EMOTICONS to file');
  await writeFile(emoticonsFile, JSON.stringify(data.emoticons, null, 2));

  await mkdir(tmpdir, { recursive: true });

  const limit = pLimit(os.cpus().length - 1);
  const promises: Array<Promise<void>> = [];

  for (const library of emojiLibraries) {
    if (cliArgs.library && library.name !== cliArgs.library) {
      continue;
    }

    const { directory, name, owner, repo, sha } = library;
    const tarName = `${name}.tar.gz`;
    const tarPath = path.join(tmpdir, tarName);
    const extractFolder = path.join(tmpdir, name);
    const url = `https://github.com/${owner}/${repo}/archive/${sha}.tar.gz`;

    log.debug(`Downloading repository into ${extractFolder}`);
    const promise = limit(extractSvg({ url, tarPath, extractFolder, directory, name, library }));
    promises.push(promise);
  }

  promises.push(limit(prettifyJson(emojiFile, minifiedEmojiFile, emoticonsFile)));

  await Promise.all(promises);
}

const svgo = new SVGO({
  plugins: [
    { cleanupAttrs: true },
    { removeDoctype: true },
    { removeXMLProcInst: true },
    { removeComments: true },
    { removeMetadata: true },
    { removeTitle: true },
    { removeDesc: true },
    { removeUselessDefs: true },
    { removeEditorsNSData: true },
    { removeEmptyAttrs: true },
    { removeHiddenElems: true },
    { removeEmptyText: true },
    { removeEmptyContainers: true },
    { removeViewBox: false },
    { cleanupEnableBackground: true },
    { convertStyleToAttrs: true },
    { convertColors: true },
    { convertPathData: true },
    { convertTransform: true },
    { removeUnknownsAndDefaults: true },
    { removeNonInheritableGroupAttrs: true },
    { removeUselessStrokeAndFill: true },
    { removeUnusedNS: true },
    { cleanupIDs: true },
    { cleanupNumericValues: true },
    { moveElemsAttrsToGroup: true },
    { moveGroupAttrsToElems: true },
    { collapseGroups: true },
    { removeRasterImages: true },
    { mergePaths: true },
    { convertShapeToPath: true },
    { sortAttrs: true },
    { removeDimensions: true },
    { minifyStyles: true },
  ],
});

download();

function prettifyJson(...files: string[]): () => void | PromiseLike<void> {
  return () => {
    return formatFiles([...files].join(' '), {
      formatter: 'prettier',
    });
  };
}

interface ExtractSvgProps {
  url: string;
  tarPath: string;
  extractFolder: string;
  directory: string;
  name: string;
  library: EmojiLibrary;
}

function extractSvg(props: ExtractSvgProps): () => void | PromiseLike<void> {
  const { url, tarPath, extractFolder, directory, name, library } = props;

  return async () => {
    const buffer = await got(url).buffer();
    await writeFile(tarPath, buffer);
    await mkdir(extractFolder, { recursive: true });
    await tar.extract({ cwd: extractFolder, file: tarPath });
    const folders = await readdir(extractFolder);
    const folder = folders.find((f) => !f.startsWith('.')) ?? '';
    const svgFolder = path.join(extractFolder, folder, directory);
    const destination = getSvgDestination(name);
    const innerLimit = pLimit(os.cpus().length - 1);
    const innerPromises: Array<Promise<void>> = [];

    log.debug(`\nOptimize svgs for emoji library ✨${name}✨\nDESTINATION: ${destination}`);
    const start = Date.now();

    for (const file of await readdir(svgFolder)) {
      if (!file.endsWith('.svg')) {
        continue;
      }

      const filepath = path.join(svgFolder, file);
      innerPromises.push(innerLimit(optimizeSvgFile({ filepath, destination, library, file })));
    }

    await Promise.all(innerPromises);
    log.debug(`\n✅ ✨${name}✨ completed in ${ms(Date.now() - start)}`);
  };
}

interface OptimizeSvgFileProps {
  filepath: string;
  destination: string;
  library: EmojiLibrary;
  file: string;
}

function optimizeSvgFile(props: OptimizeSvgFileProps): () => void | PromiseLike<void> {
  const { filepath, destination, library, file } = props;

  return async () => {
    const data = await readFile(filepath, 'utf-8');
    const result = await svgo.optimize(data, { path: filepath });

    await writeFile(path.join(destination, `${library.getHexcode(file)}.svg`), result.data);
  };
}
