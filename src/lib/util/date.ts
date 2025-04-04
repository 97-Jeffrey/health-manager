/** 
 *  convert a @param {string} dateString
 *   into readable format:
 *   ex: 2025-03-25T18:53:55.403Z ->  March 25, 2025 at 11:53AM
 *   ex: 2025-03-25 -> March 25, 2025
*/

export function formatDate(dateString: string| undefined): string {


  if (!dateString) {
    return new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
  }

    // Check if it's a date-only string (YYYY-MM-DD)
  const isDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(dateString);


  let date: Date;
    if (isDateOnly) {
        // Manually parse YYYY-MM-DD in local time (no timezone shift)
        const [year, month, day] = dateString.split('-').map(Number);
        date = new Date(year, month - 1, day); // months are 0-indexed
    } else {
        // Parse normally (for ISO strings with time)
        date = new Date(dateString);
    }
        
    
   return dateString?.includes('T')?
    
    date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
    :
    date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

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