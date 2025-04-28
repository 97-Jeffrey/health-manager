import React, { useState, useEffect} from 'react';
import { BodySymptomInterface } from '../types/bodySymptom';
import getBodySymptoms from '../lib/api/body/getBodySymptoms';
import createBodySymptom from '../lib/api/body/createBodySymptom';
import updateBodySymptom from '../lib/api/body/updateBodySymptom';
import removeBodySymptom from '../lib/api/body/removeBodySymptom';
import { ImageInfo } from '../types/imageType';
import uploadImage from '../lib/api/image/uploadImage';


export const useBodySymptom = () => {

    const INITIAL_BODY_SYMPTOM: BodySymptomInterface = {
        id: "",
        mainPart: "",
        area: "",
        symptom: "",
        date: "",
        description: "",
        rating: 0,
        isResolved: false,
        image: ""
    }
    const [bodySymptom, setbodySymptom]=  useState(INITIAL_BODY_SYMPTOM)
    const [bodySymptoms, setbodySymptoms] = useState<BodySymptomInterface[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<string>("")
    const [trigger, setTrigger] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)

    const handleRefetchData = ()=>{
        setTrigger(prev=>!prev)
    }


    const handleFieldChange =(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
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

    const handleResolvedStatus = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setbodySymptom(prev=>({
            ...prev,
            isResolved: e.target.checked
        }))
    }


    const handleSymptomSelect= (id: string)=>{
        if(!id){
            setIsEdit(false)
            setbodySymptom(INITIAL_BODY_SYMPTOM)
            return;
        }
        const newSymptom: BodySymptomInterface= bodySymptoms.find(sym=> sym.id===id)!
        setbodySymptom(newSymptom)
        setIsEdit(true)
    }

    const handleUploadMealImage  = async (e:React.ChangeEvent<HTMLInputElement>) =>{
        const files = e.target.files;
        if (!files || files.length<1) return;
    
        const imageType = 'meal-image';
        const file: File = files[0];

    
        const res: ImageInfo = await uploadImage(imageType, file)
        setbodySymptom(prev=> ({ ...prev, ['image']: res.fileUrl}))
    
    }

    //Create a body symptom
    const handleSymptomCreate = async (e: React.FormEvent) =>{
        e.preventDefault()
        setLoading(true)
        try{
            await createBodySymptom(bodySymptom)
            setSuccess("Body Symptom Created Successfully")
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

    //update a body symptom
    const handleSymptomUpdate = async (e: React.FormEvent) =>{
        e.preventDefault()
        setLoading(true)
        try{
             await updateBodySymptom(bodySymptom)
             setSuccess("Body Symptom Updated Successfully")
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


     //remove a body Symptom
    const handleSymptomRemove = async (e: React.FormEvent) =>{

        e.preventDefault()
        setLoading(true)
        try{
             await removeBodySymptom(bodySymptom.id)
             setSuccess("Body Symptom Deleted Successfully")
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
                const data: BodySymptomInterface[] = await getBodySymptoms()
                setbodySymptoms(data)
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
        handleResolvedStatus,
        handleDropdownFieldChange,
        handleUploadMealImage,
        handleSymptomCreate,
        handleSymptomUpdate,
        handleSymptomRemove
       

    }
}
