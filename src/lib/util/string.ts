
// captialize first character of a string:
export const capitalizeFirstChar = (str: string): string=> {
    if (!str) return ''; // handle empty string
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// remove extra characters by maxLength and replaced by Eclipsis:
export const truncateString = (str: string, maxLength: number): string =>{

    if(maxLength ===0) return str
    else if (str.length > maxLength) {
      return str.slice(0, maxLength) + '...';
    }
    return str;
  }
