import React, { useState, useEffect} from 'react';
import { JourneyInterface } from '../types/journey';
import createJourney from '../lib/api/journey/createJourney';
import getJourneys from '../lib/api/journey/getJourneys';
import updateJourney from '../lib/api/journey/updateJourney';
import removeJourney from '../lib/api/journey/removeJourney';

export const useJourney = () => {

    const INITIAL_JOURNEY: JourneyInterface = {
        id: '',
        name: '',
        description:'',
        date: '',
        tags:[]
    }
    const [journey, setJourney]=  useState<JourneyInterface>(INITIAL_JOURNEY)
    const [journeys, setJourneys] = useState<JourneyInterface[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const [trigger, setTrigger] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)

    const handleRefetchData = ()=>{
        setTrigger(prev=>!prev)
    }


    const handleFieldChange =(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{

        const { name, value } = e.target;
        setJourney(prev=>({
            ...prev,
            [name]: value
        }))

    }


    const handleTagAdd =(tag: string)=>{
        setJourney(prev=> ({...prev, tags: [...prev.tags, tag]}))
    }

    const handleTagRemove = (index: number) =>{
        setJourney(prev=>({
            ...prev, tags: prev.tags.filter((_, idx)=> idx !==index)
        }))
    }

    const handleJourneySelect= (id: string)=>{
        if(isEdit && id===journey.id){
            setIsEdit(false)
            setJourney(INITIAL_JOURNEY)
            return;
        }
        const newJourney: JourneyInterface= journeys.find(journey=> journey.id===id)!
        setJourney(newJourney)
        setIsEdit(true)
    }

    //Create a health/wellness journey
    const handleJourneyCreate = async (e: React.FormEvent) =>{
        e.preventDefault()
        setLoading(true)
        try{
            await createJourney(journey)
             setSuccess(true)
             setJourney(INITIAL_JOURNEY)
             handleRefetchData()
             
         }
         catch(err){
           console.log('create recipe failed:', err)
         }
         finally{
             setLoading(false)
         }
        
    }

    //update a health/wellness journey
    const handleJourneyUpdate = async (e: React.FormEvent) =>{
        e.preventDefault()
        setLoading(true)
        try{
             await updateJourney(journey)
             setSuccess(true)
             setIsEdit(false)
             setJourney(INITIAL_JOURNEY)
             handleRefetchData()
             
         }
         catch(err){
           console.log('create recipe failed:', err)
         }
         finally{
             setLoading(false)
         }
        
    }


     //remove a health/wellness journey
     const handleJourneyRemove = async (e: React.FormEvent) =>{

        e.preventDefault()
        setLoading(true)
        try{
             await removeJourney(journey.id)
             setSuccess(true)
             setIsEdit(false)
             setJourney(INITIAL_JOURNEY)
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
            
        const handleFetchJourney = async()=>{
            try{
                setLoading(true)
                const data: JourneyInterface[] = await getJourneys()
                setJourneys(data)
            }catch(err){
                console.log('err:', err)
            }
            finally{
                setLoading(false)
            }
    
        }

        handleFetchJourney()


    },[trigger])



    return  {
        isEdit,
        journey,
        journeys,
        loading,
        success,
        setSuccess,
        setJourney,
        handleTagAdd,
        handleTagRemove,
        handleJourneySelect,
        handleFieldChange,
        handleJourneyCreate,
        handleJourneyUpdate,
        handleJourneyRemove
       

    }
}
