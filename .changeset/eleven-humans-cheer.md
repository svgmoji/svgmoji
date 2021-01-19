---
'@svgmoji/blob': major
'@svgmoji/noto': major
'@svgmoji/openmoji': major
'@svgmoji/twemoji': major
---

Remove `svg` assets from npm distribution. This will reduce install times. The default cdn will also be moved to **GitHub**.

The exception is with the `noto` package which still includes the `/sprites/all.svg` asset since it is greater than **20MB** and not supported via via the JSDeliver GitHub CDN.
