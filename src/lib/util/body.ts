/** 
 *  return a background color hexocde based on a @param {string} severity
 *   which is from 0-10
 *   returned value is 
 * 
 *   '#b0f7bd' "#f7ddb0" "#f7b4b0"
 *   
*/


export const getBgColorBySeverity = (severity: number): string=> {
    const color = 
    severity<=4? 
    '#b0f7bd': 
    severity<= 7? 
    "#f7ddb0": '#f7b4b0'

    return color
}