import React, { useState, useEffect} from 'react';
import { JourneyInterface } from '../types/journey';
import createJourney from '../lib/api/journey/createJourney';
import getJourneys from '../lib/api/journey/getJourneys';

export const useJourney = () => {

    const [journey, setJourney]=  useState<JourneyInterface>({
        id: '',
        name: '',
        description:'',
        date: '',
        tags:[]
    })
    const [journeys, setJourneys] = useState<JourneyInterface[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const [trigger, setTrigger] = useState<boolean>(false)

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

    const handleJourneyCreate = async (e: React.FormEvent) =>{
        e.preventDefault()
        setLoading(true)
        try{
             const res=  await createJourney(journey)
             console.log('journey', res)
             setSuccess(true)
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
                console.log('res', data)
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
        journey,
        journeys,
        loading,
        success,
        setSuccess,
        handleTagAdd,
        handleTagRemove,
        handleFieldChange,
        handleJourneyCreate,
       

    }
}
