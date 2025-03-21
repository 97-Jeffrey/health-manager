
import { useState } from "react"
import { RecipeInterface } from "../types/recipe"
import createRecipe from "../lib/api/recipe/createRecipe"

export const useRecipe = () =>{

    const [recipe, setRecipe] = useState<RecipeInterface>({
        name: "",
        description:"",
        ingredients: [],
        steps:[""],
    })

    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)


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

    const handleRecipeCreate = async (e: React.FormEvent) =>{
       e.preventDefault()
       setLoading(true)
       try{
            const res=  await createRecipe(recipe)
            console.log('recipe', res)
            setSuccess(true)
        }
        catch(err){
          console.log('create recipe failed:', err)
        }
        finally{
            setLoading(false)
        }
       
    }


    return {
        loading,
        success,
        recipe,
        setSuccess,
        handleRecipeFieldsChange,
        handleIngredientAdd,
        handleStepAdd,
        handleRecipeStep,
        handleRecipeCreate
    }
}


