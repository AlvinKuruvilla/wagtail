import { cleanForSlug } from './cleanForSlug';

// eslint-disable-next-line no-unused-expressions
require('../../../wagtail/admin/static_src/wagtailadmin/js/vendor/urlify')
  .default;

describe('page-editor tests', () => {
  describe('cleanForSlug without unicode slugs enabled', () => {
    beforeEach(() => {
      window.unicodeSlugsEnabled = false;
    });

    it('should return a correct slug which is escaped by urlify', () => {
      /* true triggers to use django's urlify */
      expect(cleanForSlug('Before', true)).toBe('before');
      expect(cleanForSlug('The', true)).toBe('the');
      expect(cleanForSlug('Before the sun rises', true)).toBe(
        'before-the-sun-rises',
      );
      expect(cleanForSlug('ON', true)).toBe('on');
      expect(cleanForSlug('ON this day in november', true)).toBe(
        'on-this-day-in-november',
      );
      expect(cleanForSlug('This & That', true)).toBe('this-that');
    });

    it('should return a correct slug which is escaped by urlify', () => {
      /* false triggers ignores django's urlify */
      expect(cleanForSlug('Before', false)).toBe('before');
      expect(cleanForSlug('The', false)).toBe('the');
      expect(cleanForSlug('Before the sun rises', false)).toBe(
        'before-the-sun-rises',
      );
      expect(cleanForSlug('ON', false)).toBe('on');
      expect(cleanForSlug('ON this day in november', false)).toBe(
        'on-this-day-in-november',
      );
      expect(cleanForSlug('This & That', false)).toBe('this--that');
    });
  });
});
