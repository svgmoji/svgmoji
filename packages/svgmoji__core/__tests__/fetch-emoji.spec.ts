/**
 * @jest-environment node
 */

import 'isomorphic-fetch';

import { Notomoji } from 'svgmoji';

import { fetchEmojis } from '../';

describe('fetchEmojis', () => {
  // TODO Test is slow, I should mock `fetch`
  it('can fetch in different languages', async () => {
    const data = await fetchEmojis('de', { shortcodes: ['cldr', 'ja/cldr'] });

    const moji = new Notomoji({ data, type: 'all' });
    expect(moji.find('❤️').shortcodes).toMatchInlineSnapshot(`
      Array [
        "rotes_herz",
        "akai_hato",
      ]
    `);
  });
});
