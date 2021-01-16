export { default as EMOTICON_REGEX } from 'emojibase-regex/emoticon';
export { default as SHORTCODE_REGEX } from 'emojibase-regex/shortcode';

/**
 * Simple regexp for testing if a string passed in is a hexcode.
 */
export const HEXCODE_REGEX = /^[\dA-Fa-f][\dA-Fa-f-]+[\dA-Fa-f]$/;
