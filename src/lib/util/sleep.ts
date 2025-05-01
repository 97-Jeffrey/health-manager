

/** 
 *  return sleep hours  between bedTime and WakeUpTime
 *  
 *  @param {string} bedTime
 *  @param {string} wakeUpTime
 *   
*/
export const  calculateSleepHours = (bedTime: string, wakeUpTime: string)=> {
    // Parse bedtime and wake-up time into hours and minutes
    const [bedHour, bedMinute] = bedTime.split(':').map(Number);
    const [wakeHour, wakeMinute] = wakeUpTime.split(':').map(Number);
  
    // Convert both times to total minutes since midnight
    const bedTotalMinutes = bedHour * 60 + bedMinute;
    const wakeTotalMinutes = wakeHour * 60 + wakeMinute;
  
    // Calculate the difference (handle overnight sleep)
    let sleepMinutes;
    if (wakeTotalMinutes >= bedTotalMinutes) {
      // Same-day sleep (e.g., 22:00 to 6:00 → next day)
      sleepMinutes = wakeTotalMinutes - bedTotalMinutes;
    } else {
      // Overnight sleep (e.g., 23:00 to 7:00)
      sleepMinutes = (24 * 60 - bedTotalMinutes) + wakeTotalMinutes;
    }
  
    // Convert minutes to hours + minutes (e.g., 7.5 hours)
    const sleepHours = sleepMinutes / 60;
  
    return sleepHours;
  }