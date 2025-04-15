import { truncateString } from "../lib/util/string";

describe('truncateString', () => {
    it('remove extra characters by maxLength and replaced by Eclipsis:', () => {
      expect(truncateString('JavaScript', 5)).toBe('JavaS...');
    });
  
    it('returns original text if string is less than maxLength', () => {
      expect(truncateString('Abc', 10)).toBe('Abc');
    });
  
    it('return original text if maxLength is 0', () => {
      expect(truncateString('hello', 0)).toBe('hello');
    });
  
    it('return original text if string length is 0', () => {
      expect(truncateString('', 5)).toBe('');
    });
  });
