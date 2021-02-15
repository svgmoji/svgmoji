---
'@svgmoji/core': minor
---

Add `popularEmoji` to the `BaseMoji` abstract class. Now when the provided query is absent in `Moji#search` the `popularEmoji` are returned. This can also be set in the constructor with an array of unicode / hexcode representations of the emoji. The default values are taken from the top **100** frequently used emoji as listed [here](https://home.unicode.org/emoji/emoji-frequency/).
