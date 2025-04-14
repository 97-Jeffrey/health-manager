import { getBgColorBySeverity } from "../lib/util/body";

describe('getBgColorBySeverity', () => {
    it('return green color if severity is <= 4', () => {
      expect(getBgColorBySeverity(4)).toBe('#b0f7bd');
    });
  
    it('return yellow color if severity is > 4 and <=7', () => {
      expect(getBgColorBySeverity(5)).toBe('#f7ddb0');
    });
  
    it('return red color if seerity is >7', () => {
      expect(getBgColorBySeverity(8)).toBe('#f7b4b0');
    });
  });


