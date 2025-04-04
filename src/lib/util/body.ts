import { BodyWeightInterface } from "../../types/bodyWeight"


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



/** 
 *  Sort array of @param bodyWeights based on date string
 
 *   
*/

const sortByAscendingDate = (weights: BodyWeightInterface[]): BodyWeightInterface[] =>{
    return [...weights].sort((a, b) => {
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