import { useState, useEffect } from "react"
import { BodyWeightInterface } from "../types/bodyWeight"
import createBodyWeight from "../lib/api/body/createBodyWeight";
import getBodyWeights from "../lib/api/body/getBodyWeights";
import updateBodyWeight from "../lib/api/body/updateBodyWeight";
import removeBodyWeight from "../lib/api/body/removeBodyWeight";

export const useBodyWeight = () => {


    const INITIAL_BODY_WEIGHT: BodyWeightInterface = {
        id: "",
        date: '',
        weight: 0,
        unit: 'Kg',
    }
    const [bodyWeight, setBodyWeight] = useState(INITIAL_BODY_WEIGHT);
    const [bodyWeights, setBodyWeights] = useState<BodyWeightInterface []>([]);
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<string>("")
    const [trigger, setTrigger] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)

    const handleRefetchData = ()=>{
        setTrigger(prev=>!prev)
    }

    const handleFieldChange =(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
        const { name, value } = e.target;
        setBodyWeight(prev=>({
            ...prev,
            [name]: value
        }))
    }

    const handleDropdownFieldChange = (name: string, value: string| null) =>{
        setBodyWeight(prev=>({
            ...prev,
            [name]: value
        }))
    }

    const handleWeightSelect = (date: string)=>{

        if(!date){
           setIsEdit(false)
           setBodyWeight(INITIAL_BODY_WEIGHT)
           return;
        }
  
        const targetWeight: BodyWeightInterface = bodyWeights.find(weight=> weight.date ===date) ?? INITIAL_BODY_WEIGHT;
        setBodyWeight(targetWeight)
        setIsEdit(true)
    }

    //Create a body weight
    const handleWeightCreate = async (e: React.FormEvent) =>{
        e.preventDefault()
        setLoading(true)
        try{
            await createBodyWeight(bodyWeight)
            setSuccess("Body Weight Created Successfully")
            setBodyWeight(INITIAL_BODY_WEIGHT)
            handleRefetchData()
                
            }
            catch(err){
            console.log('create weight failed:', err)
            }
            finally{
                setLoading(false)
            }
        
    }
    
    //update a body weight
    const handleWeightUpdate = async (e: React.FormEvent) =>{
        e.preventDefault()
        setLoading(true)
        try{
            await updateBodyWeight(bodyWeight)
            setSuccess("Body weight Updated Successfully")
            setIsEdit(false)
            setBodyWeight(INITIAL_BODY_WEIGHT)
            handleRefetchData()
                
        }
        catch(err){
            console.log('update symptom failed:', err)
        }
        finally{
            setLoading(false)
        }
        
    }
    
    
    //remove a body Weight
    const handleWeightRemove = async (e: React.FormEvent) =>{

        e.preventDefault()
        setLoading(true)
        try{
            await removeBodyWeight(bodyWeight.id)
            setSuccess("Body Weight Deleted Successfully")
            setIsEdit(false)
            setBodyWeight(INITIAL_BODY_WEIGHT)
            handleRefetchData()
                
        }
        catch(err){
            console.log('delete weight failed:', err)
        }
        finally{
            setLoading(false)
        }
        
    }


    
    useEffect(()=>{
            
        const handleFetchSymptoms = async()=>{
            try{
                setLoading(true)
                const data: BodyWeightInterface[] = await getBodyWeights()
                setBodyWeights(data)
            }catch(err){
                console.log('err:', err)
            }
            finally{
                setLoading(false)
            }
    
        }

        handleFetchSymptoms()


    },[trigger])


    return {
        isEdit,
        setIsEdit,
        bodyWeight,
        bodyWeights,
        loading,
        success,
        setSuccess,
        handleWeightSelect,
        handleFieldChange,
        handleDropdownFieldChange,
        handleWeightCreate,
        handleWeightUpdate,
        handleWeightRemove


    }



}

