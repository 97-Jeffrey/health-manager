
import { useState, useEffect } from "react"
import { RecipeInterface } from "../types/recipe"
import { useNavigate } from "react-router-dom"

import getRecipes from "../lib/api/recipe/getRecipes"
import createRecipe from "../lib/api/recipe/createRecipe"
import updateRecipe from "../lib/api/recipe/updateRecipe"
import removeRecipe from "../lib/api/recipe/removeRecipe"
import uploadImage from "../lib/api/image/uploadImage"
import { ImageInfo } from "../types/imageType"

export const useRecipe = () =>{

    const navigate = useNavigate()

    const [recipe, setRecipe] = useState<RecipeInterface>({
        name: "",
        description:"",
        ingredients: [],
        steps:[""],
        image: ""
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

    const handleStepRemove = (index: number) =>{
        setRecipe(prev=>({
            ...prev, steps: prev.steps.filter((_, idx)=> idx !==index)
        }))
    }

    const handleUploadRecipeImage  = async (e:React.ChangeEvent<HTMLInputElement>) =>{
        const files = e.target.files;
        if (!files || files.length<1) return;
    
        const imageType = 'profile-photo';
        const file: File = files[0];
    
        const res: ImageInfo = await uploadImage(imageType, file)
        setRecipe(prev=> ({...prev, ['image']: res.fileUrl }))

    }

    const handleRecipeCreate = async (e: React.FormEvent) =>{
       e.preventDefault()
       setLoading(true)
       try{
            const res=  await createRecipe(recipe)
            console.log('recipe', res)
            setSuccess(true)

            setTimeout(()=>{
                navigate('/recipes')
            }, 1000)
            
        }
        catch(err){
          console.log('create recipe failed:', err)
        }
        finally{
            setLoading(false)
        }
       
    }

    const handleRecipeUpdate = async (e: React.FormEvent) =>{
        e.preventDefault()
        setLoading(true)
        try{
             const res=  await updateRecipe(recipe)
             console.log('recipe', res)
             setSuccess(true)
 
             setTimeout(()=>{
                 navigate('/recipes')
             }, 1000)
             
         }
         catch(err){
           console.log('update recipe failed:', err)
         }
         finally{
             setLoading(false)
         }
        
    }

    const handleRecipeRemove = async (e: React.FormEvent, id: string| undefined) =>{
        e.preventDefault()
        setLoading(true)
        try{
             const res=  await removeRecipe(id)
             console.log('res', res)
             setSuccess(true)
 
             setTimeout(()=>{
                 navigate('/recipes')
             }, 1000)
             
         }
         catch(err){
           console.log('remove recipe failed:', err)
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
        setRecipe,
        setLoading,
        setSuccess,
        handleRecipeFieldsChange,
        handleIngredientAdd,
        handleStepAdd,
        handleRecipeStep,
        handleIngredientRemove,
        handleUploadRecipeImage,
        handleStepRemove,
        handleRecipeCreate,
        handleRecipeUpdate,
        handleRecipeRemove,
    }
}


