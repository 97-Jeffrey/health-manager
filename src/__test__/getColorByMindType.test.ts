import { getBgColorByMindType } from "../lib/util/mind";

describe('getBgColorBySeverity', () => {
    it('return corresponding color with mind type', () => {
      expect(getBgColorByMindType('relaxed')).toBe('#fad3af');
    });
  
    it('return corresponding color with mind type', () => {
      expect(getBgColorByMindType('memory')).toBe('#9dfaae');
    });
  
    it('return corresponding color with mind type', () => {
      expect(getBgColorByMindType('socialability')).toBe('#f27cdb');
    });
  });


