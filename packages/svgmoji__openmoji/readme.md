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

### html

<p align="center">
  <a href="#"><img width="55px" height="55px" src="https://cdn.jsdelivr.net/npm/@svgmoji/openmoji/svg/1F44D.svg" alt="thumbs up" title="thumbs up" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img width="55px" height="55px" src="https://cdn.jsdelivr.net/npm/@svgmoji/openmoji/svg/1F600.svg" alt="grinning" title="grinning" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img width="55px" height="55px" src="https://cdn.jsdelivr.net/npm/@svgmoji/openmoji/svg/2764.svg" alt="red heart" title="red heart" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img width="55px" height="55px" src="https://cdn.jsdelivr.net/npm/@svgmoji/openmoji/svg/1F602.svg" alt="face with tears of joy" title="face with tears of joy" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img width="55px" height="55px" src="https://cdn.jsdelivr.net/npm/@svgmoji/openmoji/svg/1F605.svg" alt="grinning face with sweat" title="grinning face with sweat" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img width="55px" height="55px" src="https://cdn.jsdelivr.net/npm/@svgmoji/openmoji/svg/1F97A.svg" alt="pleading face" title="pleading face" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img width="55px" height="55px" src="https://cdn.jsdelivr.net/npm/@svgmoji/openmoji/svg/1F4A9.svg" alt="pile of poo" title="pile of poo" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img width="55px" height="55px" src="https://cdn.jsdelivr.net/npm/@svgmoji/openmoji/svg/1F62D.svg" alt="loudly crying face" title="loudly crying face" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img width="55px" height="55px" src="https://cdn.jsdelivr.net/npm/@svgmoji/openmoji/svg/1F60E.svg" alt="smiling face with sunglasses" title="smiling face with sunglasses" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img width="55px" height="55px" src="https://cdn.jsdelivr.net/npm/@svgmoji/openmoji/svg/1F631.svg" alt="face screaming in fear" title="face screaming in fear" /></a>
</p>

```html
<!-- Individual -->
<img
  width="40px"
  height="40px"
  src="https://cdn.jsdelivr.net/npm/@svgmoji/openmoji/svg/1F44D.svg"
  alt="thumbs up"
  title="thumbs up"
/>

<!-- Subgroup Bundle 9KB -->
<img
  width="40px"
  height="40px"
  src="https://cdn.jsdelivr.net/npm/@svgmoji/openmoji/sprites/subgroups/face-affection.svg#1F385"
/>

<!-- Grouped Bundle 201KB -->
<img
  width="40px"
  height="40px"
  src="https://cdn.jsdelivr.net/npm/@svgmoji/openmoji/sprites/group/smileys-emotion.svg#1F441-FE0F-200D-1F5E8-FE0F"
/>

<!-- Full Sprite Bundle 6.6MB -->
<img
  width="40px"
  height="40px"
  src="https://cdn.jsdelivr.net/npm/@svgmoji/openmoji/sprites/all.svg#1F441-FE0F-200D-1F5E8-FE0F"
/>
```

> All emojis designed by [OpenMoji](https://openmoji.org/) – the open-source emoji and icon project. License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/#).
