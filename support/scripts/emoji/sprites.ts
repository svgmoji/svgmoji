import emojiMeta from 'emojibase-data/meta/groups.json';
import { mkdir, readdir, readFile, writeFile } from 'fs/promises';
import ms from 'ms';
import os from 'os';
import pLimit from 'p-limit';
import path from 'path';
import Sprite from 'svg-sprite';
import { FlatEmoji } from 'svgmoji';

import { cliArgs, log } from '../helpers';
import { data, emojiLibraries, EmojiLibrary, getSvgDestination, packagesDirectory } from './utils';

const { groups, subgroups } = emojiMeta;

interface WriteSpriteProps {
  folder: string;
  library: EmojiLibrary;
  output: string;
  subDirectory?: string;
  filterFn?: (emoji: FlatEmoji) => boolean;
}

async function writeSprite(props: WriteSpriteProps) {
  const { folder, library, output: output, subDirectory = '', filterFn = () => true } = props;
  const dest = path.join(
    packagesDirectory,
    `svgmoji__${library.name}`,
    'sprites',
    subDirectory ?? '',
  );

  const start = Date.now();
  log.debug(
    `GENERATING '${
      subDirectory ?? 'all'
    }' sprites for directory: ${dest}, with output name: ${output}`,
  );

  // Ensure that the destination directory exists.
  await mkdir(dest, { recursive: true });
  const files = await readdir(folder);
  const spriter = new Sprite({
    dest,
    mode: {
      // See http://betravis.github.io/icon-methods/svg-sprite-sheets.html#with-a-custom-view-box
      stack: { dest: '', bust: false, prefix: 'moji-%s', sprite: `${output}.svg` },
      defs: false,
      symbol: false,
      css: false,
      view: false,
    },
    shape: {
      id: {
        generator: (svg) => path.basename(svg).replace(/\.svg$/, ''),
      },
      transform: [{}],
    },
  });

  for (const file of files) {
    if (!file.endsWith('.svg')) {
      continue;
    }

    const emoji = data.emojis.find((emoji) => emoji.hexcode === file.replace('.svg', ''));

    if (!emoji || !filterFn(emoji)) {
      continue;
    }

    const filepath = path.join(folder, file);
    spriter.add(filepath, file, await readFile(filepath, { encoding: 'utf-8' }));
  }

  return new Promise<void>((resolve) =>
    spriter.compile((_, result) => {
      for (const resources of Object.values<any>(result)) {
        for (const data of Object.values<any>(resources)) {
          mkdir(path.dirname(data.path), { recursive: true }).then(async () => {
            await writeFile(data.path, data.contents);
            log.debug(
              `Duration for ${library.name} - ${output}${subDirectory ? ` - ${subDirectory}` : ''}`,
              ms(Date.now() - start),
            );
            resolve();
          });
        }
      }
    }),
  );
}

/**
 * Generate the sprites for each library.
 */
async function generateSprites() {
  const limit = pLimit(os.cpus().length - 1);
  const promises: Array<Promise<void>> = [];

  for (const library of emojiLibraries) {
    if (cliArgs.library && library.name !== cliArgs.library) {
      continue;
    }

    const svgFolder = getSvgDestination(library.name);

    promises.push(limit(() => writeSprite({ folder: svgFolder, library, output: 'all' })));

    for (const [group, output] of Object.entries(groups)) {
      promises.push(
        limit(() =>
          writeSprite({
            folder: svgFolder,
            library,
            output,
            subDirectory: 'group',
            filterFn: (emoji) => emoji.group === +group,
          }),
        ),
      );
    }

    for (const [subgroup, output] of Object.entries(subgroups)) {
      promises.push(
        limit(() =>
          writeSprite({
            folder: svgFolder,
            library,
            output,
            subDirectory: 'subgroup',
            filterFn: (emoji) => emoji.group === +subgroup,
          }),
        ),
      );
    }
  }

  await Promise.all(promises);
}

generateSprites();
