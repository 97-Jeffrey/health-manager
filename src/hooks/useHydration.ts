import { useEffect, useState } from "react"
import { HydrationInterface } from "../types/recipe"
import createHydration from "../lib/api/hydration/createHydration"
import updateHydration from "../lib/api/hydration/updateHydration"
import removeHydration from "../lib/api/hydration/removeHydration"
import getHydrations from "../lib/api/hydration/getHydrations"

export const useHydration = () =>{

    const INITIAL_HYDRATION ={
        id: "",
        type: "",
        date:'',
        time: "",
        volume: 0,
        note: ""
    }

    const [hydration, setHydration] = useState<HydrationInterface>(INITIAL_HYDRATION)
    const [hydrations, setHydrations] =useState<HydrationInterface[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<string>('')
    const [trigger, setTrigger] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)

    const handleRefetchData = ()=>{
        setTrigger(prev=>!prev)
    }

    const handleFieldsChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
        const {name, value} = e.target;
        setHydration(prev=> ({ ...prev, [name]: value}))
 
    }

     const handleHydrationSelect= (id: string)=>{
        if(!id){
            setIsEdit(false)
            setHydration(INITIAL_HYDRATION)
            return;
        }
        const newHydration: HydrationInterface= hydrations.find(hy=> hy.id===id)!
        setHydration(newHydration)
        setIsEdit(true)
    }



    const handleHydrationCreate = async (e: React.FormEvent)=>{
        e.preventDefault()
        setLoading(true)
        try{
            await createHydration(hydration)
            setSuccess("A Hydration Added Successfully")
            setHydration(INITIAL_HYDRATION)
            handleRefetchData()
             
         }
         catch(err){
           console.log('create hydration failed:', err)
         }
         finally{
             setLoading(false)
         }

    }

    const handleHydrationUpdate = async (e: React.FormEvent)=>{
        e.preventDefault()
        setLoading(true)
        try{
            await updateHydration(hydration)
            setSuccess("Hydration Updated Successfully")
            setIsEdit(false)
            setHydration(INITIAL_HYDRATION)
            handleRefetchData()
             
        }
         catch(err){
           console.log('update hydration failed:', err)
        }
         finally{
            setLoading(false)
        }

    }

    const handleHydrationRemove = async (e: React.FormEvent)=>{

        e.preventDefault()
        setLoading(true)
        try{
             await removeHydration(hydration.id)
             setSuccess("Hydration Deleted Successfully")
             setIsEdit(false)
             setHydration(INITIAL_HYDRATION)
             handleRefetchData()
             
         }
         catch(err){
           console.log('delete hydration failed:', err)
         }
         finally{
             setLoading(false)
         }

    }

    useEffect(()=>{
            
        const handleFetchHydrations = async()=>{
            try{
                setLoading(true)
                const data: HydrationInterface[] = await getHydrations()
                setHydrations(data)
            }catch(err){
                console.log('err:', err)
            }
            finally{
                setLoading(false)
            }
    
        }

        handleFetchHydrations()


    },[trigger])



    return {
        loading,
        success,
        isEdit,
        hydration,
        hydrations,
        setSuccess,
        handleFieldsChange,
        handleHydrationSelect,
        handleHydrationCreate,
        handleHydrationUpdate,
        handleHydrationRemove
    }
}