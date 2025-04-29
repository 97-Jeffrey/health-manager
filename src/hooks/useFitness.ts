import { useEffect, useState } from "react"
import { SportInterface } from "../types/sport"
import getSports from "../lib/api/fitness/getSports"
import removeSport from "../lib/api/fitness/removeSport"
import updateSport from "../lib/api/fitness/updateSport"
import createSport from "../lib/api/fitness/createSport"




export const useFitness = () => {

    const INITIAL_SPORT: SportInterface = {
        id: "",
        date: "",
        name: "",
        calories: 0, 
        startTime: "",
        endTime: "",
        intensity: "",
    }



    const [sport, setSport]=  useState(INITIAL_SPORT)
    const [sports, setSports] = useState<SportInterface[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<string>("")
    const [trigger, setTrigger] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)

    const handleRefetchData = ()=>{
        setTrigger(prev=>!prev)
    }
    
    
    const handleFieldChange =(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
        const { name, value } = e.target;
        setSport(prev=>({
            ...prev,
            [name]: value
        }))

    }

    const handleDropdownFieldChange = (name: string, value: string| null) =>{
        setSport(prev=>({
            ...prev,
            [name]: value
        }))
    }


    const handleSportSelect= (id: string)=>{
        if(!id){
            setIsEdit(false)
            setSport(INITIAL_SPORT)
            return;
        }
        const newSport: SportInterface= sports.find(sport=> sport.id===id)!
        setSport(newSport)
        setIsEdit(true)
    }


    //Create a sport
    const handleSportCreate = async (e: React.FormEvent) =>{
        e.preventDefault()
        setLoading(true)
        try{
            await createSport(sport)
            setSuccess("A Sport Entry Created Successfully")
            setSport(INITIAL_SPORT)
            handleRefetchData()
                
            }
            catch(err){
            console.log('create sport failed:', err)
            }
            finally{
                setLoading(false)
            }
        
    }

    //update a sport
    const handleSportUpdate = async (e: React.FormEvent) =>{
        e.preventDefault()
        setLoading(true)
        try{
            await updateSport(sport)
            setSuccess("Sport Entry Updated Successfully")
            setIsEdit(false)
            setSport(INITIAL_SPORT)
            handleRefetchData()
            
        }
        catch(err){
            console.log('Update Sport failed:', err)
        }
        finally{
            setLoading(false)
        }
        
    }


        //remove a sport
    const handleSportRemove = async (e: React.FormEvent) =>{

        e.preventDefault()
        setLoading(true)
        try{
                await removeSport(sport.id)
                setSuccess("Sport Deleted Successfully")
                setIsEdit(false)
                setSport(INITIAL_SPORT)
                handleRefetchData()
                
            }
            catch(err){
            console.log('create sport failed:', err)
            }
            finally{
                setLoading(false)
            }
        
    }


    useEffect(()=>{
            
        const handleFetchSports = async()=>{
            try{
                setLoading(true)
                const data: SportInterface[] = await getSports()
                setSports(data)
            }catch(err){
                console.log('err:', err)
            }
            finally{
                setLoading(false)
            }
    
        }

        handleFetchSports()


    },[trigger])

    return {
        isEdit,
        sport,
        sports,
        loading,
        success,
        setSuccess,
        setSport,
        handleSportSelect,
        handleFieldChange,
        handleDropdownFieldChange,
        handleSportCreate,
        handleSportUpdate,
        handleSportRemove
    }
    


    
}
