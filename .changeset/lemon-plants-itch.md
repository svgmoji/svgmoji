---
'@svgmoji/blob': minor
'@svgmoji/noto': minor
'@svgmoji/openmoji': minor
'@svgmoji/twemoji': minor
---

- Upgrade sha for `@svgmoji/openmoji` to include recently added emoji.
- Improve optimizations for generated SVG's in `@svgmoji/noto` and `@svgmoji/blob`.
- Add missing flag emojis to both `@svgmoji/noto` and `@svgmoji/blob`.
- Add json entry points for both `missing.json` and `extra.json`.
  - `missing.json` is a list of hexcodes from Emoji version 13 which are missing from the emoji set.
  - `extra.json` outlines all the non-standard emoji within this emoji set.
- Add a new group, and subgroup called `other` which includes the set of all emoji without a group / subgroup.
