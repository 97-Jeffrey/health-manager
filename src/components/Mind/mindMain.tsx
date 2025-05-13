import React, { useState } from 'react';
import * as STYLES from '../../constants/styles';
import { useMind } from '../../hooks/useMind';
import LoadingSpinner from '../../elements/loading/loadingSpinner';
import Success from '../../elements/banner/success';
import MindModal from './mindModal';
import { capitalizeFirstChar } from '../../lib/util/string';
import Info from '../../elements/info/info';
import MindDisplay from './mindDisplay';


interface MindMeditationInterface {
   section:  'meditation'| 'cognition' | 'mood'
}

const MindMeditation: React.FC<MindMeditationInterface> = ({  section }) =>{

    const [open,setOpen] = useState<boolean>(false)
    
    const handleModalOpen = ()=> {
        setOpen(true)
    }
    const handleModalClose = ()=> {
        setOpen(false)
    }
    const {
        mind,
        minds,
        isEdit,
        loading,
        success,
        setSuccess,
        handleMindSelect,
        handleFieldChange,
        handleMindValueChange,
        handleMindCreate,
        handleMindUpdate,
        handleMindRemove
    } = useMind(section)

    return (
        <>
            {
                success 
                    &&
                <Success
                    text={success}
                    onClose={()=>setSuccess('')}
                />
            }

            <MindModal
                section={section}
                isEdit={isEdit}
                toDelete={isEdit}
                open={open} 
                mind={mind}
                handleClose={handleModalClose}
                handleFieldChange={handleFieldChange}
                handleMindValueChange={handleMindValueChange}
                asyncAction={isEdit? handleMindUpdate:handleMindCreate}
                asyncDeleteAction={handleMindRemove}
            />

            <div className='w-100 bg-white p-3 rounded-lg flex flex-col gap-3'>
                <div className='flex flex-row justify-between items-center w-100'>
                    <div className='font-bold text-[30px]'>{capitalizeFirstChar(section)} Wellness</div> 
                    <button 
                    className={STYLES.ACTION_BUTTON} 
                    onClick={()=>{
                        handleMindSelect('')
                        handleModalOpen()
                    }}
                    >
                    {`Add ${section}`}
                    </button>
                </div>

                <Info
                    text={`
                        Log your ${section} entry effortlessly and stay on top of your mental-health goals! 

                   `}
                />

                {
                    loading
                    &&
                    <LoadingSpinner  text={`Loading ${capitalizeFirstChar(section)}...`}/>
                }
                {
                    minds.length ===0 
                      &&
                    <Info 
                        text={`No ${section} records are found. `}
                    />
                }


                <div className='w-100 flex flex-col justify-center items-center gap-[15px]'>
                    {minds.map(mind=>(
                       <MindDisplay 
                          key={mind.id}
                          mind={mind} 
                          handleMindSelect={handleMindSelect}
                          handleModalOpen={handleModalOpen}
                       />
                    ))}

                </div>

            </div>
        </>
    )
}


export default MindMeditation