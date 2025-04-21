export interface RecipeInterface {
    id?: string,
    name: string, 
    description: string,
    ingredients: string[],
    steps: string[],
    lastUpdatedAt?: string,
    micronutrients?:MicronutrientsInterface
}


export interface MealInterface {
    id: string,
    name: string, 
    note: string,
    date: string,
    startTime: string,
    endTime: string,
    lastUpdatedAt?: string,
    micronutrients?:MicronutrientsInterface
}

export interface MicronutrientsInterface {
    [nutrientName: string]: [number, string]; // [quantity, unit]
}

