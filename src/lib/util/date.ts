/** 
 *  convert a @param {string} dateString
 *   into readable format:
 *   ex: 2025-03-25T18:53:55.403Z ->  March 25, 2025 at 11:53AM
 *   ex: 2025-03-25 -> March 25, 2025
*/

export function formatDate(dateString: string| undefined): string {
    const date = dateString ? new Date(dateString): new Date()
    
   return dateString?.split('T').length ===2 ?
    
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