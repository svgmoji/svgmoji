import 'localstorage-polyfill';
import 'isomorphic-fetch';

import { fetchEmojis, generateEmoticonPermutations, minifyEmoji } from '@svgmoji/core';
import copy from 'cpy';
import { mkdir, readdir, readFile, writeFile } from 'fs/promises';
import got from 'got';
import ms from 'ms';
import os from 'os';
import pLimit from 'p-limit';
import path from 'path';
import SVGO from 'svgo';
import tar from 'tar';

import { cliArgs, formatFiles, log, rm } from '../helpers';
import { data, emojiLibraries, EmojiLibrary, getSvgDestination, packagesDirectory } from './utils';

async function run() {
  log.debug('\n⏬ Starting download...');
  const emojiFile = path.join(packagesDirectory, 'svgmoji', `emoji.json`);
  const githubEmojiFile = path.join(packagesDirectory, 'svgmoji', `emoji-github.json`);
  const discordEmojiFile = path.join(packagesDirectory, 'svgmoji', `emoji-discord.json`);
  const slackEmojiFile = path.join(packagesDirectory, 'svgmoji', `emoji-slack.json`);
  const minifiedEmojiFile = path.join(packagesDirectory, 'svgmoji', `emoji.min.json`);
  const minifiedGithubEmojiFile = path.join(packagesDirectory, 'svgmoji', `emoji-github.min.json`);
  const minifiedDiscordEmojiFile = path.join(
    packagesDirectory,
    'svgmoji',
    `emoji-discord.min.json`,
  );
  const minifiedSlackEmojiFile = path.join(packagesDirectory, 'svgmoji', `emoji-slack.min.json`);
  const emoticonsFile = path.join(packagesDirectory, 'svgmoji', `emoticons.json`);
  const tmpdir = path.join(os.tmpdir(), '__svgmoji__');

  log.debug('\n😊 Loading emojis from cdn');
  data.emojis = await fetchEmojis('en', { shortcodes: ['cldr'] });
  const githubEmoji = await fetchEmojis('en', { shortcodes: ['github'] });
  const discordEmoji = await fetchEmojis('en', { shortcodes: ['discord'] });
  const slackEmoji = await fetchEmojis('en', { shortcodes: ['slack'] });
  data.hexcodes = data.emojis.map((emoji) => emoji.hexcode);

  for (const emoji of data.emojis) {
    if (!emoji.emoticon) {
      continue;
    }

    data.emoticons[emoji.hexcode] = generateEmoticonPermutations(emoji.emoticon);
  }

  log.debug('\nWriting EMOJI to file');
  await writeFile(emojiFile, JSON.stringify(data.emojis, null, 2));
  await writeFile(githubEmojiFile, JSON.stringify(githubEmoji, null, 2));
  await writeFile(discordEmojiFile, JSON.stringify(discordEmoji, null, 2));
  await writeFile(slackEmojiFile, JSON.stringify(slackEmoji, null, 2));

  log.debug('\nWriting MINIFIED EMOJI to file');
  await writeFile(minifiedEmojiFile, JSON.stringify(minifyEmoji(data.emojis)));
  await writeFile(minifiedGithubEmojiFile, JSON.stringify(minifyEmoji(githubEmoji)));
  await writeFile(minifiedDiscordEmojiFile, JSON.stringify(minifyEmoji(discordEmoji)));
  await writeFile(minifiedSlackEmojiFile, JSON.stringify(minifyEmoji(slackEmoji)));

  log.debug('\nWriting EMOTICONS to file');
  await writeFile(emoticonsFile, JSON.stringify(data.emoticons, null, 2));

  await mkdir(tmpdir, { recursive: true });

  const limit = pLimit(os.cpus().length);
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

    log.debug(`\nDownloading repository into ${extractFolder}`);
    const promise = limit(extractSvg({ url, tarPath, extractFolder, directory, name, library }));
    promises.push(promise);
  }

  promises.push(limit(prettifyJson(emojiFile, minifiedEmojiFile, emoticonsFile)));

  await Promise.all(promises);

  const filePromises: Array<Promise<void>> = [];

  for (const library of emojiLibraries) {
    const json = (data.extra[library.name]?.sort() ?? []).map(
      (code) => library.transform?.(code) ?? code,
    );
    const extraJsonFile = getSvgDestination(library.name, 'extra.json');
    filePromises.push(
      limit(async () => {
        await rm(extraJsonFile);
        await writeFile(extraJsonFile, JSON.stringify(json, null, 2));
      }),
    );
  }

  await Promise.all(filePromises);
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
    { convertStyleToAttrs: false },
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

run();

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

    if (library.extraFolder) {
      const sourceFolder = path.join(extractFolder, folder, library.extraFolder, '*.svg');
      log.debug(`\nℹ️ An extra folder is being searched ${sourceFolder}`);
      await copy(sourceFolder, svgFolder);
    }

    const destination = getSvgDestination(name);
    const missingJsonFile = getSvgDestination(name, 'missing.json');
    await rm([destination, missingJsonFile].join(' '));
    const innerLimit = pLimit(os.cpus().length);
    const innerPromises: Array<Promise<void>> = [];
    const all: Set<string> = new Set();
    const missing: string[] = [];

    log.debug(`\nOptimize svgs for emoji library ✨${name}✨\nDESTINATION: ${destination}`);
    const start = Date.now();

    for (const file of await readdir(svgFolder)) {
      if (!file.endsWith('.svg')) {
        continue;
      }

      const filepath = path.join(svgFolder, file);
      innerPromises.push(
        innerLimit(optimizeSvgFile({ filepath, destination, library, file, all })),
      );
    }

    await Promise.all(innerPromises);

    for (const hexcode of data.hexcodes) {
      if (!all.has(hexcode)) {
        missing.push(hexcode);
      }
    }

    await writeFile(missingJsonFile, JSON.stringify(missing, null, 2));
    log.debug(`\n✅ ✨${name}✨ completed in ${ms(Date.now() - start)}`);
  };
}

interface OptimizeSvgFileProps {
  filepath: string;
  destination: string;
  library: EmojiLibrary;
  file: string;
  /** All the hexcodes for this library */
  all: Set<string>;
}

function optimizeSvgFile(props: OptimizeSvgFileProps): () => void | PromiseLike<void> {
  const { filepath, destination, library, file, all } = props;

  return async () => {
    const contents = await readFile(filepath, 'utf-8');
    const result = await svgo.optimize(contents, { path: filepath });
    const svgFileName = library.getSvgFile(file);
    const hexcode = svgFileName.replace('.svg', '');

    all.add(hexcode);
    await writeFile(path.join(destination, svgFileName), result.data);
  };
}
