
import { MealInterface } from "../../types/recipe";


interface GroupedMeals {
    [date: string]: MealInterface[];
}

export interface GroupedMealsArray {
    date: string;
    data: MealInterface[];
}


/**
 * Sorts an array of meals by their `startTime` (ascending order).
 * `startTime` is in "HH:MM" format.
 * @param {MealInterface[]} meals
 */

const sortMealsByStartTime = (meals: MealInterface[]): MealInterface[] => {
    return meals.sort((a, b) => {
      // Convert "HH:MM" to minutes for comparison
      const timeToMinutes = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
      };
      return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
    });
  };


/** 
 *  group array of @param meals together based on the same date string
    @param {MealInterface[]} meals
 *   
*/
  
const groupMealsByDate = (meals: MealInterface[]): GroupedMealsArray[] => {
    const grouped = meals.reduce<GroupedMeals>((acc, meal) => {
      const { date } = meal;
      acc[date] = acc[date] || []; // Initialize if undefined
      acc[date].push(meal);
      return acc;
    }, {});
  
    return Object.entries(grouped).map(([date, data]) => ({ 
        date, 
        data: sortMealsByStartTime(data)
    }));
};

/** 
    sort array of grouped @param meals  in asending order
    @param {MealInterface[]} meals
   
*/

export const sortedMeals =(meals: MealInterface[]): GroupedMealsArray[]=>  groupMealsByDate(meals).sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
);
