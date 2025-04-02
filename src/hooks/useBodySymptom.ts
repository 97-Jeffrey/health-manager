import React, { useState, useEffect} from 'react';
import { BodySymptomInterface } from '../types/bodySymptom';
import createBodySymptom from '../lib/api/body/createBodySymptom';



export const useBodySymptom = () => {

    const INITIAL_BODY_SYMPTOM: BodySymptomInterface = {
        id: "",
        mainPart: "",
        area: "",
        symptom: "",
        date: "",
        description: "",
        rating: 0,
        isResolved: false
    }
    const [bodySymptom, setbodySymptom]=  useState<BodySymptomInterface>(INITIAL_BODY_SYMPTOM)
    const [bodySymptoms, setbodySymptoms] = useState<BodySymptomInterface[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const [trigger, setTrigger] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)

    const handleRefetchData = ()=>{
        setTrigger(prev=>!prev)
    }


    const handleFieldChange =(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{

        console.log(e.target)
        const { name, value } = e.target;
        setbodySymptom(prev=>({
            ...prev,
            [name]: value
        }))

    }

    const handleDropdownFieldChange = (name: string, value: string| null) =>{
        setbodySymptom(prev=>({
            ...prev,
            [name]: value
        }))
    }
    
    const handleRatingChange = (rating: number) =>{
        setbodySymptom(prev=>({
            ...prev,
            rating
        }))

    }


    const handleSymptomSelect= (id: string)=>{
        if(isEdit && id===bodySymptom.id){
            setIsEdit(false)
            setbodySymptom(INITIAL_BODY_SYMPTOM)
            return;
        }
        const newSymptom: BodySymptomInterface= bodySymptoms.find(sym=> sym.id===id)!
        setbodySymptom(newSymptom)
        setIsEdit(true)
    }

    //Create a health/wellness journey
    const hanldleSymptomCreate = async (e: React.FormEvent) =>{
        e.preventDefault()
        setLoading(true)
        try{
            await createBodySymptom(bodySymptom)
            setSuccess(true)
            setbodySymptom(INITIAL_BODY_SYMPTOM)
            handleRefetchData()
             
         }
         catch(err){
           console.log('create symptom failed:', err)
         }
         finally{
             setLoading(false)
         }
        
    }

    //update a health/wellness journey
    const handleSymptomUpdate = async (e: React.FormEvent) =>{
        e.preventDefault()
        setLoading(true)
        try{
            //  await updateJourney(journey)
             setSuccess(true)
             setIsEdit(false)
             setbodySymptom(INITIAL_BODY_SYMPTOM)
             handleRefetchData()
             
         }
         catch(err){
           console.log('update symptom failed:', err)
         }
         finally{
             setLoading(false)
         }
        
    }


     //remove a health/wellness journey
     const handleSymptomRemove = async (e: React.FormEvent) =>{

        e.preventDefault()
        setLoading(true)
        try{
            //  await removeJourney(journey.id)
             setSuccess(true)
             setIsEdit(false)
             setbodySymptom(INITIAL_BODY_SYMPTOM)
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
            
        const handleFetchSymptoms = async()=>{
            try{
                setLoading(true)
                // const data: BodySymptomInterface[] = await getJourneys()
                // setJourneys(data)
            }catch(err){
                console.log('err:', err)
            }
            finally{
                setLoading(false)
            }
    
        }

        handleFetchSymptoms()


    },[trigger])



    return  {
        isEdit,
        bodySymptom,
        bodySymptoms,
        loading,
        success,
        setSuccess,
        setbodySymptom,
        handleSymptomSelect,
        handleRatingChange,
        handleFieldChange,
        handleDropdownFieldChange,
        hanldleSymptomCreate,
        handleSymptomUpdate,
        handleSymptomRemove
       

    }
}
