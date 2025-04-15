import React, { useState } from 'react';
import * as STYLES from '../../constants/styles';
import { useMind } from '../../hooks/useMind';
import LoadingSpinner from '../../elements/loading/loadingSpinner';
import { getBgColorByMindType } from '../../lib/util/mind';
import { formatDate } from '../../lib/util/date';
import Success from '../../elements/banner/success';
import MindModal from './mindModal';
import { capitalizeFirstChar } from '../../lib/util/string';


interface MindMeditationInterface {
    section: string
}

const MindMeditation: React.FC<MindMeditationInterface> = ({ section }) =>{

    const [open,setOpen] = useState<boolean>(false)
    
    const handleModalOpen = ()=> {
        setOpen(true)
    }
    const handleModalClose = ()=> {
        setOpen(false)
    }
      const {
        isEdit,
        mind,
        minds,
        loading,
        success,
        setSuccess,
        handleMindSelect,
        handleFieldChange,
        handleMindValueChange,
        handleMindCreate,
        handleMindUpdate,
        handleMindRemove
    
      } = useMind()


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

                {
                    loading
                    &&
                    <LoadingSpinner  text={`Loading ${capitalizeFirstChar(section)}...`}/>
                }


                <div className='w-100 flex flex-col justify-center items-center gap-[15px]'>
                    {minds.map(mind=>(
                    <div 
                        key={mind.mindId} 
                        className=' cursor-pointer w-100 bg-[#eefceb] border border-black rounded-lg p-3 flex flex-col justify-center items-start gap-[10px]'
                        onClick={()=>{
                            handleMindSelect(mind.mindId)
                            handleModalOpen()
                        }}
                    >
                        <div className='font-bold text-white bg-[#000000] px-[10px] py-[5px] rounded-[10px]'>{formatDate(mind.date)}</div>
                        {Object.entries(mind.data).map(([key, value])=> (
                            <div key={key} className='w-100 flex flex-row justify-start items-center gap-[15px]'>
                                <div className='font-bold'>{capitalizeFirstChar(key)}</div>
                                <div className='w-100 h-[10px] bg-[#ffffff] border border-black rounded-[5px]'>
                                <div 
                                    style={{ 
                                    width : `${value * 10}%`,
                                    backgroundColor: getBgColorByMindType(key)
                                    }} 
                                    className={`h-[8px] rounded-[5px]` }
                                >
                                </div>
                                </div>
                            </div>
                        ))}
                        <div className='font-bold bg-white p-[10px] rounded-[10px]'>
                        {mind.note}

                        </div>
                        
                    </div>
                    ))}

                </div>

            </div>
        </>
    )
}


export default MindMeditation