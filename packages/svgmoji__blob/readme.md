# @svgmoji/blob

> The svgmoji sprites for the [`blob-emoji`](https://github.com/googlefonts/blob-emoji) library provided by Google.

<br />

[![Version][version]][npm] [![Weekly Downloads][downloads-badge]][npm] [![Bundled size][size-badge]][size] [![Typed Codebase][typescript]](./src/index.ts) ![MIT License][license]

[version]: https://flat.badgen.net/npm/v/@svgmoji/blob
[npm]: https://npmjs.com/package/@svgmoji/blob
[license]: https://flat.badgen.net/badge/license/MIT/purple
[size]: https://bundlephobia.com/result?p=@svgmoji/blob
[size-badge]: https://flat.badgen.net/bundlephobia/minzip/@svgmoji/blob
[typescript]: https://flat.badgen.net/badge/icon/TypeScript?icon=typescript&label
[downloads-badge]: https://badgen.net/npm/dw/@svgmoji/blob/red?icon=npm

<br />

## Installation

```bash
# yarn
yarn add @svgmoji/blob

# pnpm
pnpm add @svgmoji/blob

# npm
npm install @svgmoji/blob
```

<br />

## Usage

The following code creates an image with a src applied from the cdn. The first it is used it loads the sprite of all the emojis.

```ts
import { Blobmoji } from '@svgmoji/blobmoji';
import data from 'svgmoji/emoji.json';

const blobmoji = new Blobmoji({ data, type: 'all' });
const image = document.createElement('img');
image.src = blobmoji.getUrl('❤️');

document.body.append(image);
```
