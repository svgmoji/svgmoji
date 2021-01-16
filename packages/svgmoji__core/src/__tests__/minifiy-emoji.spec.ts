import { minifyEmoji } from '../minify-emoji';
import type { FlatEmoji } from '../types';

const data = [
  {
    annotation: 'hot face',
    hexcode: '1F975',
    tags: ['feverish', 'heat stroke', 'hot', 'red-faced', 'sweating'],
    emoji: '🥵',
    text: '',
    type: 1,
    order: 58,
    group: 0,
    subgroup: 6,
    version: 11,
    shortcodes: ['hot_face'],
  },
] as FlatEmoji[];

describe('minifyEmoji', () => {
  it('minifies the json object', () => {
    expect(minifyEmoji(data)).toMatchSnapshot();
  });
});
