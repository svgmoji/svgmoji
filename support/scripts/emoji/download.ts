import 'localstorage-polyfill';
import 'isomorphic-fetch';

import { fetchEmojis, generateEmoticonPermutations, minifyEmoji } from '@svgmoji/core';
import cpy from 'cpy';
import { mkdir, readdir, writeFile } from 'fs/promises';
import got from 'got';
import os from 'os';
import path from 'path';
import tar from 'tar';

import { cliArgs, log } from '../helpers';
import { data, emojiLibraries, getSvgDestination, packagesDirectory } from './utils';

async function download() {
  log.debug('Starting downloads...');
  const emojiFile = path.join(packagesDirectory, 'svgmoji', `emoji.json`);
  const minifiedEmojiFile = path.join(packagesDirectory, 'svgmoji', `emoji.min.json`);
  const emoticonsFile = path.join(packagesDirectory, 'svgmoji', `emoticons.json`);
  const tmpdir = path.join(os.tmpdir(), '__svgmoji__');

  log.debug('Loading emojis from cdn');
  data.emojis = await fetchEmojis('en', { shortcodes: ['cldr'] });

  for (const emoji of data.emojis) {
    if (!emoji.emoticon) {
      continue;
    }

    data.emoticons[emoji.hexcode] = generateEmoticonPermutations(emoji.emoticon);
  }

  log.debug('Writing emojis to file');
  await writeFile(emojiFile, JSON.stringify(data.emojis, null, 2));
  await writeFile(minifiedEmojiFile, JSON.stringify(minifyEmoji(data.emojis), null, 2));
  await writeFile(emoticonsFile, JSON.stringify(data.emoticons, null, 2));

  await mkdir(tmpdir, { recursive: true });

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

    const promise = got(url)
      .buffer()
      .then(async (buffer) => {
        await writeFile(tarPath, buffer);
        await mkdir(extractFolder, { recursive: true });
        await tar.extract({ cwd: extractFolder, file: tarPath });

        const folders = await readdir(extractFolder);
        const folder = folders.find((f) => !f.startsWith('.')) ?? '';
        const svgFolder = path.join(extractFolder, folder, directory);
        const destination = getSvgDestination(name);

        // Copy files from the tar folder into the destination folder.
        log.debug(`Copying ${name} emoji to ${destination}`);
        await cpy(path.join(svgFolder, '*.svg'), destination, {
          rename: (basename) => `${library.getHexcode(basename)}.svg`,
        });
      });

    promises.push(promise);
  }

  await Promise.all(promises);
}

download();
