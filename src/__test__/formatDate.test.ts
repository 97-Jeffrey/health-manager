import { formatDate } from '../lib/util/date';
import { jest } from '@jest/globals'; 


describe('formatDate',  () => {
    beforeAll(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2023-01-01'));
    });
    
    afterAll(() => {
        jest.useRealTimers();
    });

    test('handles undefined input by returning current date', () => {
        expect(formatDate(undefined)).toBe('January 1, 2023');
    });

    test('formats date-only string (YYYY-MM-DD)', () => {
        expect(formatDate('2025-03-25')).toBe('March 25, 2025');
    });


});