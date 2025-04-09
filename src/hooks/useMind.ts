import { mindInterface } from "../types/mindInterface"
import { useState, useEffect } from "react"



export const useMind = () => {

    const INITIAL_MIND: mindInterface = {
        meditation: {
            "calm": 0,
            "relaxed": 0,
            'energized':0
        },
        cognition: {
            'focus':0,
            'productivity':0,
            'memory':0,
            'problem solving':0,
            'creativity':0,
            'alertness':0,
            'brain fog':0

        },
        mood:{
            'stress':0,
            'positivity':0,
            'sensivity':0,
            "socialability":0,
            "calmness":0,
            "anxiety":0,
            "irritability":0
        }
    }

    const [mind, setMind]=  useState(INITIAL_MIND)
    const [minds, setMinds] = useState<[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<string>("")
    const [trigger, setTrigger] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)

    const handleRefetchData = ()=>{
        setTrigger(prev=>!prev)
    }

    const handleValueChange =(
        name: string,
        groupName: keyof mindInterface,
        value: number,
    )=>{
        setMind(prev=>({
            ...prev,
            [groupName]: {
                ...prev[groupName],
                [name]: Number(value)

            }
        
        }))

    }


        //Create a body symptom
        const handleMindCreate = async (e: React.FormEvent) =>{
            e.preventDefault()
            setLoading(true)
            try{
                // await createBodySymptom(bodySymptom)
                setSuccess("Body Symptom Created Successfully")
                setMind(INITIAL_MIND)
                handleRefetchData()
                 
             }
             catch(err){
               console.log('create symptom failed:', err)
             }
             finally{
                 setLoading(false)
             }
            
        }
    
        //update a body symptom
        const handleMindUpdate = async (e: React.FormEvent) =>{
            e.preventDefault()
            setLoading(true)
            try{
                //  await updateBodySymptom(bodySymptom)
                 setSuccess("Mind Updated Successfully")
                 setIsEdit(false)
                 setMind(INITIAL_MIND)
                 handleRefetchData()
                 
             }
             catch(err){
               console.log('update symptom failed:', err)
             }
             finally{
                 setLoading(false)
             }
            
        }
    
    
         //remove a body Symptom
        const handleMindRemove = async (e: React.FormEvent) =>{
    
            e.preventDefault()
            setLoading(true)
            try{
                //  await removeBodySymptom(bodySymptom.id)
                 setSuccess("Mind Deleted Successfully")
                 setIsEdit(false)
                 setMind(INITIAL_MIND)
                 handleRefetchData()
                 
             }
             catch(err){
               console.log('create recipe failed:', err)
             }
             finally{
                 setLoading(false)
             }
            
        }
    
    
        useEffect(()=>{
                
            const handleFetchMinds = async()=>{
                try{
                    setLoading(true)
                    // const data: BodySymptomInterface[] = await getBodySymptoms()
                    setMinds([])
                }catch(err){
                    console.log('err:', err)
                }
                finally{
                    setLoading(false)
                }
        
            }
    
            handleFetchMinds()
    
    
        },[trigger])


        return  {
            isEdit,
            mind,
            minds,
            loading,
            success,
            setSuccess,
            setMind,
            handleValueChange,
            handleMindCreate,
            handleMindUpdate,
            handleMindRemove
           
    
        }

}