/** 
 *  convert a @param {string} dateString
 *   into readable format:
 *   ex: 2025-03-25T18:53:55.403Z ->  March 25, 2025 at 11:53AM
 *   ex: 2025-03-25 -> March 25, 2025
*/

export function formatDate(dateString: string | undefined): string {
  if (!dateString) {
    // Return local date without time
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC' // Force UTC to avoid timezone shifts
    });
  }

  const isDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(dateString);
  let date: Date;

  if (isDateOnly) {
    // Parse as UTC date to avoid timezone issues
    date = new Date(dateString + 'T00:00:00Z');
  } else {
    // Parse ISO string directly
    date = new Date(dateString);
  }

  // Format with explicit UTC timezone
  return dateString.includes('T')
    ? date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC'
      })
    : date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
      });
}


// Helper function to format dates  in chart.js x axis;

export function formatDateToMonthDayYear(date: Date): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  // Add ordinal suffix (1st, 2nd, 3rd, 4th, etc.)
  const suffix = 
    (day === 1 || day === 21 || day === 31) ? 'st' :
    (day === 2 || day === 22) ? 'nd' :
    (day === 3 || day === 23) ? 'rd' : 'th';
    
  return `${month} ${day}${suffix}, ${year}`;
}