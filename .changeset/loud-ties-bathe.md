---
'@svgmoji/core': minor
---

While this library is in `0.x` breaking changes can occur during minor version upgrades. This release contains breaking changes.

- **BREAKING**: Rename `getUrl` method on `Moji` abstract class to `url`.
- **BREAKING**: Store `fallback` as a `FlatEmoji` rather than the provided string.
- Add `fallbackUrl` property to `Moji` abstract class.
- Add `find` method to `Moji` to allow searching for emoji by `unicode`, `hexcode` or `emoticon`.
- Add `search` method which allows fuzzy searching the emoji. The search algorithm is provided the library [`match-sorter`](https://github.com/kentcdodds/match-sorter) and may be adapted in future releases.
- Clean up dependencies.
