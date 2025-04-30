import { BodyWeightInterface } from "../../types/bodyWeight"
import { BodyGlucoseInterface } from "../../types/bodyGlucose"


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
    'bg-symptom-mild': 
    severity<= 7? 
    "bg-symptom-medium": 'bg-symptom-serious'

    return color
}



/** 
 *  Sort array of @param bodyWeights based on date string
 
 *   
*/

interface DateObject {
  date: string | Date; // Assuming date can be either a string or Date object
}

export const sortByAscendingDate = <T extends DateObject>(data: T[]): T[] =>{
    return [...data].sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }

/** 
  unit converter from pound to kg
 *   
*/

const poundsToKg=  (pounds: number): number => {
    const kg = pounds * 0.45359237;
    return parseFloat(kg.toFixed(2));
  }




/** 
 *  Analysize a given body weight data into readable format for chart.js 
 return with data and dates
 *   
*/


export const  analyzeBodyWeight = (weights: BodyWeightInterface[]) =>{

    const sortedWeights = sortByAscendingDate(weights);
    const convertedUnitWeight = sortedWeights.map(wei=> wei.unit ==='Pound'? {...wei, weight: poundsToKg(wei.weight) } : wei)
    const dates = convertedUnitWeight.map(wei=> wei.date);
    const data = convertedUnitWeight.map(wei=>wei.weight)


    return {
       dates,
       data
    }

}



/** 
 *  Analysize a given body glucose data into readable format for chart.js 
 return with data and dates
 *   
*/


export const  analyzeBodyGlucose = (glucoses: BodyGlucoseInterface[]) =>{

  const sortedGlucoses = sortByAscendingDate(glucoses);
  const dates = sortedGlucoses.map(glu=> glu.date);
  const data = sortedGlucoses.map(glu=>glu.glucose)


  return {
     dates,
     data
  }

}