import { getVersion } from 'json.macro';
import { Notomoji } from 'svgmoji';
import data from 'svgmoji/emoji.json';
import minifiedData from 'svgmoji/emoji.min.json';

describe('constructor', () => {
  it('can construct with minified emoji', () => {
    const moji = new Notomoji({ data: minifiedData, type: 'all', fallback: 'thumbs_up' });
    expect(moji.data[0].emoji).toBe(`🇦`);
  });
});

describe('find', () => {
  const moji = new Notomoji({ data, type: 'all', fallback: 'thumbs_up' });

  it('can find by emoji', () => {
    expect(moji.find('❤️').emoji).toBe('❤️');
  });

  it('can find by hexcode', () => {
    expect(moji.find('2764').emoji).toBe('❤️');
  });

  it('can find by emoticon', () => {
    expect(moji.find(':-)').emoji).toBe('🙂');
  });

  it('can find by shortcode', () => {
    expect(moji.find('red_heart').emoji).toBe('❤️');
  });

  it('can find by colon wrapped shortcode', () => {
    expect(moji.find(':red_heart:').emoji).toBe('❤️');
  });
});

describe('url', () => {
  it('can generate a url with the full sprite', () => {
    const moji = new Notomoji({ data, type: 'all', fallback: 'thumbs_up' });
    expect(moji.url('red_heart').replace(`@${getVersion()}`, '')).toMatchInlineSnapshot(
      `"https://cdn.jsdelivr.net/npm/@svgmoji/noto/sprites/all.svg#2764"`,
    );
  });

  it('can generate a url with the group sprite', () => {
    const moji = new Notomoji({ data, type: 'group', fallback: 'thumbs_up' });
    expect(moji.url('red_heart').replace(`@${getVersion()}`, '')).toMatchInlineSnapshot(
      `"https://cdn.jsdelivr.net/gh/svgmoji/svgmoji/packages/svgmoji__noto/sprites/group/smileys-emotion.svg#2764"`,
    );
  });

  it('can generate a url with the subgroup sprite', () => {
    const moji = new Notomoji({ data, type: 'sub-group', fallback: 'thumbs_up' });
    expect(moji.url('red_heart').replace(`@${getVersion()}`, '')).toMatchInlineSnapshot(
      `"https://cdn.jsdelivr.net/gh/svgmoji/svgmoji/packages/svgmoji__noto/sprites/subgroup/emotion.svg#2764"`,
    );
  });

  it('can generate a url with the individual sprite', () => {
    const moji = new Notomoji({ data, type: 'individual', fallback: 'thumbs_up' });
    expect(moji.url('red_heart').replace(`@${getVersion()}`, '')).toMatchInlineSnapshot(
      `"https://cdn.jsdelivr.net/gh/svgmoji/svgmoji/packages/svgmoji__noto/svg/2764.svg"`,
    );
  });
});

describe('search', () => {
  const moji = new Notomoji({ data, type: 'individual', fallback: 'thumbs_up' });

  it('can search for emoji by shortcode', () => {
    expect(moji.search('heart').length > 1).toBe(true);
  });

  it('can exclude tones', () => {
    const values = moji.search('index pointing up', { excludeTone: true });
    expect(values.some((emoji) => emoji.hexcode === '261D-1F3FF')).toBe(false);
  });

  it('bypasses searching when no query is empty', () => {
    expect(moji.search('')).toBe(moji.data);
    expect(moji.search('', { excludeTone: true })).toBe(moji.tonelessData);
  });
});
