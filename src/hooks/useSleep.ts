import { useEffect, useState } from "react"
import getSleeps from "../lib/api/fitness/getSleeps"
import removeSleep from "../lib/api/fitness/removeSleep"
import updateSleep from "../lib/api/fitness/updateSleep"
import createSleep from "../lib/api/fitness/createSleep"
import { SleepInterface } from "../types/sleep"


export const useSleep = () => {

    const INITIAL_SLEEP: SleepInterface = {
        id: "",
        date: "",
        startTime: "",
        endTime: "",
        note: "",
        quality: 0,
    
    }



    const [sleep, setSleep]=  useState(INITIAL_SLEEP)
    const [sleeps, setSleeps] = useState<SleepInterface[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<string>("")
    const [trigger, setTrigger] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)

    const handleRefetchData = ()=>{
        setTrigger(prev=>!prev)
    }
    
    
    const handleFieldChange =(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
        const { name, value } = e.target;
        setSleep(prev=>({
            ...prev,
            [name]: value
        }))

    }

    const handleDropdownFieldChange = (name: string, value: string| null) =>{
        setSleep(prev=>({
            ...prev,
            [name]: value
        }))
    }

    const handleSleepQualityChange = (name: string, quality: number )=>{
        setSleep(prev=>({
            ...prev,
            [name]: quality
        }))
        

    }


    const handleSleepSelect= (id: string)=>{
        if(!id){
            setIsEdit(false)
            setSleep(INITIAL_SLEEP)
            return;
        }
        const newSleep: SleepInterface= sleeps.find(sleep=> sleep.id===id)!
        setSleep(newSleep)
        setIsEdit(true)
    }


    //Create a sleep
    const handleSleepCreate = async (e: React.FormEvent) =>{
        e.preventDefault()
        setLoading(true)
        try{
            await createSleep(sleep)
            setSuccess("A Sleep Entry Created Successfully")
            setSleep(INITIAL_SLEEP)
            handleRefetchData()
                
        }
        catch(err){
            console.log('create Sleep failed:', err)
        }
        finally{
            setLoading(false)
        }
        
    }

    //update a sleep
    const handleSleepUpdate = async (e: React.FormEvent) =>{
        e.preventDefault()
        setLoading(true)
        try{
            await updateSleep(sleep)
            setSuccess("Sleep Entry Updated Successfully")
            setIsEdit(false)
            setSleep(INITIAL_SLEEP)
            handleRefetchData()
            
        }
        catch(err){
            console.log('Update Sleep failed:', err)
        }
        finally{
            setLoading(false)
        }
        
    }


        //remove a sleep
    const handleSleepRemove = async (e: React.FormEvent) =>{

        e.preventDefault()
        setLoading(true)
        try{
            await removeSleep(sleep.id)
            setSuccess("Sleep Deleted Successfully")
            setIsEdit(false)
            setSleep(INITIAL_SLEEP)
            handleRefetchData()
                
        }
        catch(err){
            console.log('delete sleep failed:', err)
        }
        finally{
            setLoading(false)
        }
        
    }


    useEffect(()=>{
            
        const handleFetchSleeps = async()=>{
            try{
                setLoading(true)
                const data: SleepInterface[] = await getSleeps()
                setSleeps(data)
            }catch(err){
                console.log('err:', err)
            }
            finally{
                setLoading(false)
            }
    
        }

        handleFetchSleeps()


    },[trigger])

    return {
        isEdit,
        sleep,
        sleeps,
        loading,
        success,
        setSuccess,
        handleSleepSelect,
        handleFieldChange,
        handleDropdownFieldChange,
        handleSleepQualityChange,
        handleSleepCreate,
        handleSleepUpdate,
        handleSleepRemove
    }
    


    
}
