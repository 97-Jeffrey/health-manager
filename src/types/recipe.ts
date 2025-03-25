export interface RecipeInterface {
    id?: string,
    name: string, 
    description: string,
    ingredients: string[],
    steps: string[],
    lastUpdatedAt?: string
}