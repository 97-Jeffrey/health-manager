import React, { useState, useEffect} from 'react';
import { BodyGlucoseInterface } from '../types/bodyGlucose';
import getBodyGlucoses from '../lib/api/body/getBodyGlucoses';
import createBodyGlucose from '../lib/api/body/createBodyGlucose';
import updateBodyGlucose from '../lib/api/body/updateBodyGlucose';
import removeBodyGlucose from '../lib/api/body/removeBodyGlucose';


export const useBodyGlucose = () => {

    const INITIAL_BODY_GLUCOSE: BodyGlucoseInterface = {
        id: "",
        date: "",
        glucose: 0,
    }
    const [bodyGlucose, setBodyGlucose]=  useState(INITIAL_BODY_GLUCOSE)
    const [bodyGlucoses, setBodyGlucoses] = useState<BodyGlucoseInterface[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<string>("")
    const [trigger, setTrigger] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)

    const handleRefetchData = ()=>{
        setTrigger(prev=>!prev)
    }


    const handleFieldChange =(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
        const { name, value } = e.target;
        setBodyGlucose(prev=>({
            ...prev,
            [name]: value
        }))

    }



    const handleGlucoseSelect= (date: string)=>{
        if(!date){
            setIsEdit(false)
            setBodyGlucose(INITIAL_BODY_GLUCOSE)
            return;
        }
        const newGlucose: BodyGlucoseInterface= bodyGlucoses.find(glu=> glu.date===date)!
        setBodyGlucose(newGlucose)
        setIsEdit(true)
    }

    //Create a body glucose
    const handleGlucoseCreate = async (e: React.FormEvent) =>{
        e.preventDefault()
        setLoading(true)
        try{
            await createBodyGlucose(bodyGlucose)
            setSuccess("Body Glucose Created Successfully")
            setBodyGlucose(INITIAL_BODY_GLUCOSE)
            handleRefetchData()
             
         }
         catch(err){
           console.log('create glucose failed:', err)
         }
         finally{
             setLoading(false)
         }
        
    }

    //update a body glucose
    const handleGlucoseUpdate = async (e: React.FormEvent) =>{
        e.preventDefault()
        setLoading(true)
        try{
             await updateBodyGlucose(bodyGlucose)
             setSuccess("Body Glucose Updated Successfully")
             setIsEdit(false)
             setBodyGlucose(INITIAL_BODY_GLUCOSE)
             handleRefetchData()
             
         }
         catch(err){
           console.log('update Glucose failed:', err)
         }
         finally{
             setLoading(false)
         }
        
    }


     //remove a body Glucose
    const handleGlucoseRemove = async (e: React.FormEvent) =>{

        e.preventDefault()
        setLoading(true)
        try{
             await removeBodyGlucose(bodyGlucose.id)
             setSuccess("Body Glucose Deleted Successfully")
             setIsEdit(false)
             setBodyGlucose(INITIAL_BODY_GLUCOSE)
             handleRefetchData()
             
         }
         catch(err){
           console.log('create glucose failed:', err)
         }
         finally{
             setLoading(false)
         }
        
    }


    useEffect(()=>{
            
        const handleFetchBodyGlucoses = async()=>{
            try{
                setLoading(true)
                const data: BodyGlucoseInterface[] = await getBodyGlucoses()
                setBodyGlucoses(data)
            }catch(err){
                console.log('err:', err)
            }
            finally{
                setLoading(false)
            }
    
        }

        handleFetchBodyGlucoses()


    },[trigger])



    return  {
        isEdit,
        bodyGlucose,
        bodyGlucoses,
        loading,
        success,
        setSuccess,
        setBodyGlucose,
        handleGlucoseSelect,
        handleFieldChange,
        handleGlucoseCreate,
        handleGlucoseUpdate,
        handleGlucoseRemove
       

    }
}
