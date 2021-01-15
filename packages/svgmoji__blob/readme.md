# @svgmoji/blob

> The svgmoji sprites for the [`blobmoji`](https://github.com/c1710/blobmoji) library.

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
import { Blobmoji } from '@svgmoji/blob';
import data from 'svgmoji/emoji.json';

const blobmoji = new Blobmoji({ data, type: 'all' });
const image = document.createElement('img');
image.src = blobmoji.getUrl('❤️');

document.body.append(image);
```

### html

<br />
<p align="center">
  <a href="#"><img width="40px" height="40px" src="https://cdn.jsdelivr.net/npm/@svgmoji/blob/svg/1F44D.svg" alt="thumbs up" title="thumbs up" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img width="40px" height="40px" src="https://cdn.jsdelivr.net/npm/@svgmoji/blob/svg/1F600.svg" alt="grinning" title="grinning" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img width="40px" height="40px" src="https://cdn.jsdelivr.net/npm/@svgmoji/blob/svg/2764.svg" alt="red heart" title="red heart" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img width="40px" height="40px" src="https://cdn.jsdelivr.net/npm/@svgmoji/blob/svg/1F602.svg" alt="face with tears of joy" title="face with tears of joy" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img width="40px" height="40px" src="https://cdn.jsdelivr.net/npm/@svgmoji/blob/svg/1F605.svg" alt="grinning face with sweat" title="grinning face with sweat" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img width="40px" height="40px" src="https://cdn.jsdelivr.net/npm/@svgmoji/blob/svg/1F97A.svg" alt="pleading face" title="pleading face" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img width="40px" height="40px" src="https://cdn.jsdelivr.net/npm/@svgmoji/blob/svg/1F4A9.svg" alt="pile of poo" title="pile of poo" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img width="40px" height="40px" src="https://cdn.jsdelivr.net/npm/@svgmoji/blob/svg/1F62D.svg" alt="loudly crying face" title="loudly crying face" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img width="40px" height="40px" src="https://cdn.jsdelivr.net/npm/@svgmoji/blob/svg/1F60E.svg" alt="smiling face with sunglasses" title="smiling face with sunglasses" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img width="40px" height="40px" src="https://cdn.jsdelivr.net/npm/@svgmoji/blob/svg/1F631.svg" alt="face screaming in fear" title="face screaming in fear" /></a>
</p>

```html
<!-- Individual -->
<img
  width="40px"
  height="40px"
  src="https://cdn.jsdelivr.net/npm/@svgmoji/blob/svg/1F44D.svg"
  alt="thumbs up"
  title="thumbs up"
/>

<!-- Subgroup Bundle 36KB  -->
<img
  width="40px"
  height="40px"
  src="https://cdn.jsdelivr.net/npm/@svgmoji/blob/sprites/subgroups/face-affection.svg#1F385"
/>

<!-- Group Bundle 421KB -->
<img
  width="40px"
  height="40px"
  src="https://cdn.jsdelivr.net/npm/@svgmoji/blob/sprites/group/smileys-emotion.svg#1F441-FE0F-200D-1F5E8-FE0F"
/>

<!-- Full Bundle 13.2MB -->
<img
  width="40px"
  height="40px"
  src="https://cdn.jsdelivr.net/npm/@svgmoji/blob/sprites/all.svg#1F441-FE0F-200D-1F5E8-FE0F"
/>
```
