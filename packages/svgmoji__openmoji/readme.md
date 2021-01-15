# @svgmoji/openmoji

> The svgmoji sprites for the [`openmoji`](https://github.com/hfg-gmuend/openmoji) library.

<br />

[![Version][version]][npm] [![Weekly Downloads][downloads-badge]][npm] [![Bundled size][size-badge]][size] [![Typed Codebase][typescript]](./src/index.ts) ![MIT License][license]

[version]: https://flat.badgen.net/npm/v/@svgmoji/openmoji
[npm]: https://npmjs.com/package/@svgmoji/openmoji
[license]: https://flat.badgen.net/badge/license/MIT/purple
[size]: https://bundlephobia.com/result?p=@svgmoji/openmoji
[size-badge]: https://flat.badgen.net/bundlephobia/minzip/@svgmoji/openmoji
[typescript]: https://flat.badgen.net/badge/icon/TypeScript?icon=typescript&label
[downloads-badge]: https://badgen.net/npm/dw/@svgmoji/openmoji/red?icon=npm

<br />

## Installation

```bash
# yarn
yarn add @svgmoji/openmoji

# pnpm
pnpm add @svgmoji/openmoji

# npm
npm install @svgmoji/openmoji
```

<br />

## Usage

The following code creates an image with a src applied from the cdn. The first it is used it loads the sprite of all the emojis.

```ts
import { Openmoji } from '@svgmoji/openmoji';
import data from 'svgmoji/emoji.json';

const openmoji = new Openmoji({ data, type: 'all' });
const image = document.createElement('img');
image.src = openmoji.getUrl('❤️');

document.body.append(image);
```

> All emojis designed by [OpenMoji](https://openmoji.org/) – the open-source emoji and icon project. License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/#).
