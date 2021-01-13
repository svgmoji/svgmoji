# @svgmoji/noto

> The svgmoji sprites for the [`noto-emoji`](https://github.com/googlefonts/noto-emoji) library provided by Google.

<br />

[![Version][version]][npm] [![Weekly Downloads][downloads-badge]][npm] [![Bundled size][size-badge]][size] [![Typed Codebase][typescript]](./src/index.ts) ![MIT License][license]

[version]: https://flat.badgen.net/npm/v/@svgmoji/noto
[npm]: https://npmjs.com/package/@svgmoji/noto
[license]: https://flat.badgen.net/badge/license/MIT/purple
[size]: https://bundlephobia.com/result?p=@svgmoji/noto
[size-badge]: https://flat.badgen.net/bundlephobia/minzip/@svgmoji/noto
[typescript]: https://flat.badgen.net/badge/icon/TypeScript?icon=typescript&label
[downloads-badge]: https://badgen.net/npm/dw/@svgmoji/noto/red?icon=npm

<br />

## Installation

```bash
# yarn
yarn add @svgmoji/noto

# pnpm
pnpm add @svgmoji/noto

# npm
npm install @svgmoji/noto
```

<br />

## Usage

The following code creates an image with a src applied from the cdn. The first it is used it loads the sprite of all the emojis.

```ts
import { Notomoji } from '@svgmoji/notomoji';
import data from 'svgmoji/emoji.json';

const notomoji = new Notomoji({ data, type: 'all' });
const image = document.createElement('img');
image.src = notomoji.getUrl('❤️');

document.body.append(image);
```
