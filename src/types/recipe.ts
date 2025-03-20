export interface RecipeInterface {
    id?: string | number,
    name: string, 
    description: string,
    ingredients: string[],
    steps: string[]
}