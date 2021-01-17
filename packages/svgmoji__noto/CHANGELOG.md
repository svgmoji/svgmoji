# @svgmoji/noto

## 2.0.0

> 2021-01-17

### Patch Changes

- Updated dependencies [9599f2dd]
- Updated dependencies [192504eb]
- Updated dependencies [192504eb]
  - @svgmoji/core@2.0.0

## 1.0.0

> 2021-01-16

### Minor Changes

- ca58f626: - Upgrade sha for `@svgmoji/openmoji` to include recently added emoji.
  - Improve optimizations for generated SVG's in `@svgmoji/noto` and `@svgmoji/blob`.
  - Add missing flag emojis to both `@svgmoji/noto` and `@svgmoji/blob`.
  - Add json entry points for both `missing.json` and `extra.json`.
    - `missing.json` is a list of hexcodes from Emoji version 13 which are missing from the emoji set.
    - `extra.json` outlines all the non-standard emoji within this emoji set.
  - Add a new group, and subgroup called `other` which includes the set of all emoji without a group / subgroup.
- 67a34b4f: - Make `@svgmoji/core` a peer dependency.
  - Improve type inference by setting the `name` to a `const` for `Blobmoji`, `Notomoji`, `Twemoji` and `Openmoji`

### Patch Changes

- Updated dependencies [b549183a]
  - @svgmoji/core@1.0.0

## 0.2.0

> 2021-01-16

### Minor Changes

- ff19a3c4: Improve `npm` package documentation and fix broken subgroup build.

### Patch Changes

- Updated dependencies [ff19a3c4]
  - @svgmoji/core@0.2.0

## 0.1.0

> 2021-01-15

### Minor Changes

- aa3e427: Create the initial launch of the `svgmoji` project packages. Improvements will be added as it is used within the [`remirror`](https://remirror.io) codebase.

### Patch Changes

- Updated dependencies [aa3e427]
  - @svgmoji/core@0.1.0
