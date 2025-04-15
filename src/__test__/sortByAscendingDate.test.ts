import { sortByAscendingDate } from '../lib/util/body'

describe('sortByAscendingDate', () => {
    it('sorts an array of objects by date in ascending order', () => {
      const testData = [
        { id: 1, date: '2023-03-25' },
        { id: 2, date: '2023-01-10' },
        { id: 3, date: '2023-02-15' },
      ];
  
      const expected = [
        { id: 2, date: '2023-01-10' },
        { id: 3, date: '2023-02-15' },
        { id: 1, date: '2023-03-25' },
      ];
  
      const result = sortByAscendingDate(testData);
      expect(result).toEqual(expected);
    });


    it('handles Date objects as well as strings', () => {
        const testData = [
          { id: 1, date: new Date('2023-03-25') },
          { id: 2, date: '2023-01-10' },
          { id: 3, date: new Date('2023-02-15') },
        ];
    
        const expected = [
          { id: 2, date: '2023-01-10' },
          { id: 3, date: new Date('2023-02-15') },
          { id: 1, date: new Date('2023-03-25') },
        ];
    
        const result = sortByAscendingDate(testData);
        expect(result).toEqual(expected);
    });

    it('returns an empty array when input is empty', () => {
        expect(sortByAscendingDate([])).toEqual([]);
    });


    it('handles invalid dates by sorting them to the beginning', () => {
        const testData = [
          { id: 1, date: 'invalid-date' },
          { id: 2, date: '2023-01-10' },
          { id: 3, date: 'another-invalid-date' },
        ];
    
        const result = sortByAscendingDate(testData);
        // Invalid dates will be converted to NaN and sorted first
        expect(result[1].id).toBe(2); // The valid date should come after invalid ones
    });
    
})