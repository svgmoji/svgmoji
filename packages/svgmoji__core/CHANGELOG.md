# @svgmoji/core

## 3.2.0

> 2021-06-15

### Patch Changes

- 71bb8f85: Regenerate exported `.svg` and `.json` files with latest version of [**SVGO**](https://github.com/svg/svgo).

## 3.1.0

> 2021-02-15

### Minor Changes

- 7c81be1b: Add `popularEmoji` to the `BaseMoji` abstract class. Now when the provided query is absent in `Moji#search` the `popularEmoji` are returned. This can also be set in the constructor with an array of unicode / hexcode representations of the emoji. The default values are taken from the top **100** frequently used emoji as listed [here](https://home.unicode.org/emoji/emoji-frequency/).
- edd4a29c: Add `maxResults` to `Moji#search` options. The default value is `20`.

## 3.0.0

> 2021-01-19

### Minor Changes

- d91dfe0e: Default to using the GitHub CDN as a way around the 100MB size limit for npm packages.
- 485df41a: Improve search results by prioritizing shortcodes and the emoji annotation (description).

## 2.0.0

> 2021-01-17

### Major Changes

- 9599f2dd: Remove all `*_REGEXP` exports. Use `emojibase-regex` as an alternative. This also shaves 300B from the total build size.

### Minor Changes

- 192504eb: Add support for passing a flat emoji object to the `url` method of `Moji`. This can lead to a performance boost in some cases.
- 192504eb: Add caching to the `Moji#find` method. Now the second time a search is made for the same code, it will be retrieved from the cache.

## 1.0.0

> 2021-01-16

### Major Changes

- b549183a: This update contains breaking the following breaking changes.

  - **BREAKING**: Rename `getUrl` method on `Moji` abstract class to `url`.
  - **BREAKING**: Store `fallback` as a `FlatEmoji` rather than the provided string.

  The remaining changes are non-breaking.

  - Add `fallbackUrl` property to `Moji` abstract class.
  - Add `find` method to `Moji` to allow searching for emoji by `unicode`, `hexcode` or `emoticon`.
  - Add `search` method which allows fuzzy searching the emoji. The search algorithm is provided the library [`match-sorter`](https://github.com/kentcdodds/match-sorter) and may be adapted in future releases.
  - Clean up dependencies.

## 0.2.0

> 2021-01-16

### Minor Changes

- ff19a3c4: Improve `npm` package documentation and fix broken subgroup build.

## 0.1.0

> 2021-01-15

### Minor Changes

- aa3e427: Create the initial launch of the `svgmoji` project packages. Improvements will be added as it is used within the [`remirror`](https://remirror.io) codebase.
