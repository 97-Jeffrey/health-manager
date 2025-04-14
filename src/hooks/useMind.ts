import createMind from "../lib/api/mind/createMind"
import getMinds from "../lib/api/mind/getMinds"
import { mindInterface } from "../types/mindInterface"
import { useState, useEffect } from "react"



export const useMind = () => {

    const MIND_DEDFAULT = {
        meditation: { 
            "calm": 0,
            "relaxed": 0,
            "energized":0
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
        mood: {
            'stress':0,
            'positivity':0,
            'sensivity':0,
            "socialability":0,
            "calmness":0,
            "anxiety":0,
            "irritability":0
        }
    }

    const INITIAL_MIND: mindInterface = {
        date: '',
        mindType: 'meditation',
        data: {
            "calm": 0,
            "relaxed": 0,
            'energized':0
        },
        note: '',
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


    const handleMindTypeChange = (type: 'meditation'| 'cognition' | 'mood') =>{
        setMind(prev=>({
            ...prev,
            mindType: type,
            data: MIND_DEDFAULT[type]
            
        }))
    }

    const handleMindValueChange =(name: string, rating: number )=>{
        setMind(prev=>({
            ...prev,
            data: {
                ...prev.data,
                [name]: rating
            }
        
        }))

    }

    const handleFieldChange =(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
        const { name, value } = e.target;
        setMind(prev=>({
            ...prev,
            [name]: value
        }))
    }


    //Create a Mind Entry
    const handleMindCreate = async (e: React.FormEvent) =>{
        e.preventDefault()
        setLoading(true)
        try{
            await createMind(mind)
            setSuccess("Mind Entry Created Successfully")
            setMind(INITIAL_MIND)
            handleRefetchData()
                
            }
            catch(err){
                console.log('create mind failed:', err)
            }
            finally{
                setLoading(false)
            }
        
    }

    //update a Mind Entry
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


    //remove a Mind Entry
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
                const data: mindInterface[] = await getMinds(mind.mindType)
                console.log('data', data)
                setMinds([])
            }catch(err){
                console.log('err:', err)
            }
            finally{
                setLoading(false)
            }
    
        }

        handleFetchMinds()


    },[trigger, mind])


        return  {
            isEdit,
            mind,
            minds,
            loading,
            success,
            setSuccess,
            setMind,
            handleFieldChange,
            handleMindTypeChange,
            handleMindValueChange,
            handleMindCreate,
            handleMindUpdate,
            handleMindRemove
           
    
        }

}