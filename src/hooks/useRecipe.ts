
import { useState, useEffect } from "react"
import { RecipeInterface } from "../types/recipe"
import createRecipe from "../lib/api/recipe/createRecipe"
import getRecipes from "../lib/api/recipe/getRecipes"
import { useNavigate } from "react-router-dom"
import * as ROUTES from '../constants/routes'

export const useRecipe = () =>{

    const navigate = useNavigate()

    const [recipe, setRecipe] = useState<RecipeInterface>({
        name: "",
        description:"",
        ingredients: [],
        steps:[""],
    })
    const [recipes, setRecipes] = useState<RecipeInterface[]>([])

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

    const handleIngredientRemove = (index: number) =>{

        setRecipe(prev=>({
            ...prev, ingredients: prev.ingredients.filter((_, idx)=> idx !==index)
        }))

    }

    const handleRecipeCreate = async (e: React.FormEvent) =>{
       e.preventDefault()
       setLoading(true)
       try{
            const res=  await createRecipe(recipe)
            console.log('recipe', res)
            setSuccess(true)

            setTimeout(()=>{
                navigate(ROUTES.RECIPES.MAIN)
            }, 1000)
            
        }
        catch(err){
          console.log('create recipe failed:', err)
        }
        finally{
            setLoading(false)
        }
       
    }

    useEffect(()=>{
        
        const handleFetchRecipes = async()=>{
            try{
                setLoading(true)
                const res: RecipeInterface[] = await getRecipes()
                setRecipes(res)
            }catch(err){
                console.log('err:', err)
            }
            finally{
                setLoading(false)
            }
    
        }

        handleFetchRecipes()


    },[])


    return {
        loading,
        success,
        recipe,
        recipes,
        setSuccess,
        handleRecipeFieldsChange,
        handleIngredientAdd,
        handleStepAdd,
        handleRecipeStep,
        handleRecipeCreate,
        handleIngredientRemove
    }
}


