import { useEffect, useState } from "react"
import { MealInterface } from "../types/recipe"
import createMeal from "../lib/api/meal/createMeal"
import updateMeal from "../lib/api/meal/updateMeal"
import removeMeal from "../lib/api/meal/removeMeal"
import getMeals from "../lib/api/meal/getMeals"
import { ImageInfo } from "../types/imageType"
import uploadImage from "../lib/api/image/uploadImage"



export const useMeal = () =>{

    const INITIAL_MEAL ={
        id: "",
        name: "", 
        note: "",
        date: "",
        startTime: "",
        endTime: "",
        image: ""
    }
    const [meal, setMeal] = useState<MealInterface>(INITIAL_MEAL)
    const [meals, setMeals] =useState<MealInterface[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<string>('')
    const [trigger, setTrigger] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)


    const handleRefetchData = ()=>{
        setTrigger(prev=>!prev)
    }



    const handleFieldsChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
        const {name, value} = e.target;
        setMeal(prev=> ({ ...prev, [name]: value}))
 
    }

    const handleMealSelect= (id: string)=>{
        if(!id){
            setIsEdit(false)
            setMeal(INITIAL_MEAL)
            return;
        }
        const newMeal: MealInterface= meals.find(meal=> meal.id===id)!
        setMeal(newMeal)
        setIsEdit(true)
    }

    const handleUploadMealImage  = async (e:React.ChangeEvent<HTMLInputElement>) =>{
        const files = e.target.files;
        if (!files || files.length<1) return;
    
        const imageType = 'meal-image';
        const file: File = files[0];

    
        const res: ImageInfo = await uploadImage(imageType, file)
        setMeal(prev=> ({ ...prev, ['image']: res.fileUrl}))
    
    }

    const handleMealCreate = async (e: React.FormEvent)=>{
        e.preventDefault()
        setLoading(true)
        try{
            await createMeal(meal)
            setSuccess("A Meal Entry Created Successfully")
            setMeal(INITIAL_MEAL)
            handleRefetchData()
             
         }
         catch(err){
           console.log('create meal failed:', err)
         }
         finally{
             setLoading(false)
         }

    }

    const handleMealUpdate = async (e: React.FormEvent)=>{
        e.preventDefault()
        setLoading(true)
        try{
             await updateMeal(meal)
            setSuccess("Meal Updated Successfully")
            setIsEdit(false)
            setMeal(INITIAL_MEAL)
            handleRefetchData()
             
        }
         catch(err){
           console.log('update meal failed:', err)
        }
         finally{
            setLoading(false)
        }

    }

    const handleMealRemove = async (e: React.FormEvent)=>{

        e.preventDefault()
        setLoading(true)
        try{
             await removeMeal(meal.id)
             setSuccess("Meal Deleted Successfully")
             setIsEdit(false)
             setMeal(INITIAL_MEAL)
             handleRefetchData()
             
         }
         catch(err){
           console.log('delete meal failed:', err)
         }
         finally{
             setLoading(false)
         }

    }

    useEffect(()=>{
            
        const handleFetchMeals = async()=>{
            try{
                setLoading(true)
                const data: MealInterface[] = await getMeals()
                setMeals(data)
            }catch(err){
                console.log('err:', err)
            }
            finally{
                setLoading(false)
            }
    
        }

        handleFetchMeals()


    },[trigger])





    return {
        loading,
        success,
        isEdit,
        meal,
        meals,
        setSuccess,
        handleFieldsChange,
        handleMealSelect,
        handleUploadMealImage,
        handleMealCreate,
        handleMealUpdate,
        handleMealRemove

    }
}