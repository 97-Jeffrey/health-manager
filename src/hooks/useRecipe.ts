
import { useState } from "react"
import { RecipeInterface } from "../types/recipe"

export const useRecipe = () =>{

    const [recipe, setRecipe] = useState<RecipeInterface>({
        name: "",
        description:"",
        ingredients: [],
        steps:[""],
    })


    const handleRecipeFieldsChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
       const {name, value} = e.target;
       setRecipe(prev=> ({ ...prev, [name]: value}))

    }

    const handleIngredientAdd =(ingredient: string)=>{
        setRecipe(prev=> ({...prev, ingredients: [...prev.ingredients, ingredient]}))
    }

    const handleStepAdd = () =>{
        setRecipe(prev=> ({...prev, steps: [...prev.steps, '']}))
    }

    const handleRecipeStep =(index: number, e: React.ChangeEvent<HTMLInputElement>)=>{
        const { value } = e.target;
        const newSteps = [...recipe.steps];
        newSteps[index] = value

        setRecipe(prev=> ({...prev, steps: newSteps}))


    }


    return {
        recipe,
        handleRecipeFieldsChange,
        handleIngredientAdd,
        handleStepAdd,
        handleRecipeStep
    }
}


