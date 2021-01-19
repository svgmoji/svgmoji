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

### html

<p align="center">
  <a href="#"><img width="40px" height="40px" src="https://cdn.jsdelivr.net/npm/@svgmoji/twemoji@2.0.0/svg/1F44D.svg" alt="thumbs up" title="thumbs up" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img width="40px" height="40px" src="https://cdn.jsdelivr.net/npm/@svgmoji/twemoji@2.0.0/svg/1F600.svg" alt="grinning" title="grinning" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img width="40px" height="40px" src="https://cdn.jsdelivr.net/npm/@svgmoji/twemoji@2.0.0/svg/2764.svg" alt="red heart" title="red heart" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img width="40px" height="40px" src="https://cdn.jsdelivr.net/npm/@svgmoji/twemoji@2.0.0/svg/1F602.svg" alt="face with tears of joy" title="face with tears of joy" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img width="40px" height="40px" src="https://cdn.jsdelivr.net/npm/@svgmoji/twemoji@2.0.0/svg/1F605.svg" alt="grinning face with sweat" title="grinning face with sweat" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img width="40px" height="40px" src="https://cdn.jsdelivr.net/npm/@svgmoji/twemoji@2.0.0/svg/1F97A.svg" alt="pleading face" title="pleading face" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img width="40px" height="40px" src="https://cdn.jsdelivr.net/npm/@svgmoji/twemoji@2.0.0/svg/1F4A9.svg" alt="pile of poo" title="pile of poo" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img width="40px" height="40px" src="https://cdn.jsdelivr.net/npm/@svgmoji/twemoji@2.0.0/svg/1F62D.svg" alt="loudly crying face" title="loudly crying face" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img width="40px" height="40px" src="https://cdn.jsdelivr.net/npm/@svgmoji/twemoji@2.0.0/svg/1F60E.svg" alt="smiling face with sunglasses" title="smiling face with sunglasses" /></a>&nbsp;&nbsp;&nbsp;<a href="#"><img width="40px" height="40px" src="https://cdn.jsdelivr.net/npm/@svgmoji/twemoji@2.0.0/svg/1F631.svg" alt="face screaming in fear" title="face screaming in fear" /></a>
</p>

```html
<!-- Individual -->
<img
  width="40px"
  height="40px"
  src="https://cdn.jsdelivr.net/npm/@svgmoji/twemoji@2.0.0/svg/1F44D.svg"
  alt="thumbs up"
  title="thumbs up"
/>

<!-- Subgroup Bundle 12KB  -->
<img
  width="40px"
  height="40px"
  src="https://cdn.jsdelivr.net/npm/@svgmoji/twemoji@2.0.0/sprites/subgroups/face-affection.svg#1F385"
/>

<!-- Grouped Bundle 182KB -->
<img
  width="40px"
  height="40px"
  src="https://cdn.jsdelivr.net/npm/@svgmoji/twemoji@2.0.0/sprites/group/smileys-emotion.svg#1F441-FE0F-200D-1F5E8-FE0F"
/>

<!-- Full Sprite Bundle 7.3MB -->
<img
  width="40px"
  height="40px"
  src="https://cdn.jsdelivr.net/npm/@svgmoji/twemoji@2.0.0/sprites/all.svg#1F441-FE0F-200D-1F5E8-FE0F"
/>
```
