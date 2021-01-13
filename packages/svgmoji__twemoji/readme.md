# @svgmoji/twemoji

> The svgmoji sprites for the [`twemoji`](https://github.com/twitter/twemoji) library provided by Twitter.

<br />

[![Version][version]][npm] [![Weekly Downloads][downloads-badge]][npm] [![Bundled size][size-badge]][size] [![Typed Codebase][typescript]](./src/index.ts) ![MIT License][license]

[version]: https://flat.badgen.net/npm/v/@svgmoji/twemoji
[npm]: https://npmjs.com/package/@svgmoji/twemoji
[license]: https://flat.badgen.net/badge/license/MIT/purple
[size]: https://bundlephobia.com/result?p=@svgmoji/twemoji
[size-badge]: https://flat.badgen.net/bundlephobia/minzip/@svgmoji/twemoji
[typescript]: https://flat.badgen.net/badge/icon/TypeScript?icon=typescript&label
[downloads-badge]: https://badgen.net/npm/dw/@svgmoji/twemoji/red?icon=npm

<br />

## Installation

```bash
# yarn
yarn add @svgmoji/twemoji

# pnpm
pnpm add @svgmoji/twemoji

# npm
npm install @svgmoji/twemoji
```

<br />

## Usage

The following code creates an image with a src applied from the cdn. The first it is used it loads the sprite of all the emojis.

```ts
import { Twemoji } from '@svgmoji/twemoji';
import data from 'svgmoji/emoji.json';

const twemoji = new Twemoji({ data, type: 'all' });
const image = document.createElement('img');
image.src = twemoji.getUrl('❤️');

document.body.append(image);
```
