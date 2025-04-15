import createMind from "../lib/api/mind/createMind"
import removeMind from "../lib/api/mind/deleteMind"
import getMinds from "../lib/api/mind/getMinds"
import updateMind from "../lib/api/mind/updateMind"
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
        mindId: '',
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
    const [minds, setMinds] = useState<mindInterface[]>([])
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

     const handleMindSelect= (id: string)=>{
        if(!id){
            setIsEdit(false)
            setMind(INITIAL_MIND)
            return;
        }
        const newMind: mindInterface= minds.find(mind=> mind.mindId===id)!
        setMind(newMind)
        setIsEdit(true)
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
            await updateMind(mind)
            setSuccess("Mind Updated Successfully")
            setIsEdit(false)
            setMind(INITIAL_MIND)
            handleRefetchData()
            
        }
        catch(err){
            console.log('update mind failed:', err)
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
            await removeMind(mind.mindId, mind.mindType)
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
                setMinds(data)
            }catch(err){
                console.log('err:', err)
            }
            finally{
                setLoading(false)
            }
    
        }

        handleFetchMinds()


    },[trigger, mind.mindType])


        return  {
            isEdit,
            mind,
            minds,
            loading,
            success,
            setSuccess,
            setMind,
            handleMindSelect,
            handleFieldChange,
            handleMindTypeChange,
            handleMindValueChange,
            handleMindCreate,
            handleMindUpdate,
            handleMindRemove
           
    
        }

}