# @svgmoji/noto

> The svgmoji sprites for the [`noto-emoji`](https://github.com/googlefonts/noto-emoji) library.

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

### html

<br />
<p align="center">
  <a href="#"><img width="40px" height="40px" src="https://cdn.jsdelivr.net/npm/@svgmoji/noto/svg/1F44D.svg" alt="thumbs up" title="thumbs up" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img width="40px" height="40px" src="https://cdn.jsdelivr.net/npm/@svgmoji/noto/svg/1F600.svg" alt="grinning" title="grinning" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img width="40px" height="40px" src="https://cdn.jsdelivr.net/npm/@svgmoji/noto/svg/2764.svg" alt="red heart" title="red heart" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img width="40px" height="40px" src="https://cdn.jsdelivr.net/npm/@svgmoji/noto/svg/1F602.svg" alt="face with tears of joy" title="face with tears of joy" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img width="40px" height="40px" src="https://cdn.jsdelivr.net/npm/@svgmoji/noto/svg/1F605.svg" alt="grinning face with sweat" title="grinning face with sweat" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img width="40px" height="40px" src="https://cdn.jsdelivr.net/npm/@svgmoji/noto/svg/1F97A.svg" alt="pleading face" title="pleading face" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img width="40px" height="40px" src="https://cdn.jsdelivr.net/npm/@svgmoji/noto/svg/1F4A9.svg" alt="pile of poo" title="pile of poo" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img width="40px" height="40px" src="https://cdn.jsdelivr.net/npm/@svgmoji/noto/svg/1F62D.svg" alt="loudly crying face" title="loudly crying face" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img width="40px" height="40px" src="https://cdn.jsdelivr.net/npm/@svgmoji/noto/svg/1F60E.svg" alt="smiling face with sunglasses" title="smiling face with sunglasses" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img width="40px" height="40px" src="https://cdn.jsdelivr.net/npm/@svgmoji/noto/svg/1F631.svg" alt="face screaming in fear" title="face screaming in fear" /></a>
</p>

```html
<!-- Individual 2KB -->
<img
  width="40px"
  height="40px"
  src="https://cdn.jsdelivr.net/npm/@svgmoji/noto/svg/1F44D.svg"
  alt="thumbs up"
  title="thumbs up"
/>

<!-- Subgroup Bundle 31KB -->
<img
  width="40px"
  height="40px"
  src="https://cdn.jsdelivr.net/npm/@svgmoji/noto/sprites/subgroups/face-affection.svg#1F385"
/>

<!-- Group Bundle 417KB -->
<img
  width="40px"
  height="40px"
  src="https://cdn.jsdelivr.net/npm/@svgmoji/noto/sprites/group/smileys-emotion.svg#1F441-FE0F-200D-1F5E8-FE0F"
/>

<!-- Full Bundle 23.6MB -->
<img
  width="40px"
  height="40px"
  src="https://cdn.jsdelivr.net/npm/@svgmoji/noto/sprites/all.svg#1F441-FE0F-200D-1F5E8-FE0F"
/>
```
