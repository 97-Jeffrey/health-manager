import { capitalizeFirstChar } from "../lib/util/string";

describe('capitalizeFirstChar', () => {
    it('capitalizes the first character of a string', () => {
      expect(capitalizeFirstChar('hello')).toBe('Hello');
    });
  
    it('returns an empty string if input is empty', () => {
      expect(capitalizeFirstChar('')).toBe('');
    });
  
    it('handles a single-character string', () => {
      expect(capitalizeFirstChar('a')).toBe('A');
    });
  
    it('does not change an already capitalized string', () => {
      expect(capitalizeFirstChar('Hello')).toBe('Hello');
    });
  });