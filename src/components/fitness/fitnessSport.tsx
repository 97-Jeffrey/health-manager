
import { useState } from 'react'
import * as STYLES from '../../constants/styles'
import { useFitness } from '../../hooks/useFitness'
import Success from '../../elements/banner/success'
import SportModal from './sportModal'
import Info from '../../elements/info/info'
import LoadingSpinner from '../../elements/loading/loadingSpinner'
import { convertTo12HourFormat, formatDate } from '../../lib/util/date'
import TooltipGeneral from '../../elements/tooltip/tooltip'

const FitnessSport: React.FC= () =>{

    const [open,setOpen] = useState<boolean>(false)

    const {
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
    } = useFitness()

    const handleModalOpen = ()=> {
        setOpen(true)
      }
    const handleModalClose = ()=> {
    setOpen(false)
    }

    console.log('sport', sports)

    
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

            <SportModal 
                toDelete={isEdit}
                isEdit={isEdit}
                open={open} 
                handleClose={handleModalClose}
                sport={sport}
                handleFieldChange={handleFieldChange}
                handleDropdownFieldChange={handleDropdownFieldChange}
                asyncAction={isEdit? handleSportUpdate:handleSportCreate}
                asyncDeleteAction={handleSportRemove}
            />
           <div className='w-100 bg-white p-3 rounded-lg flex flex-col gap-3'>
                   <div className='flex flex-row justify-between items-center w-100'>
                     <div className='font-bold text-[30px]'>Sport 🏃🏻</div> 
                     <button 
                       className={STYLES.ACTION_BUTTON} 
                       onClick={()=>{
                            handleSportSelect('')
                            handleModalOpen()
                       }}
                     >
                       Create
                     </button>
                   </div>
                    <Info
                       text={`Effortlessly log your workouts, 
                        monitor progress, and stay motivated with our 
                        Fitness Activity Tracker. Whether you're running, 
                        lifting weights, cycling, or doing yoga, record 
                        every session with ease.`}
                    />
                    {
                        loading
                            &&
                        <LoadingSpinner  text={'Loading Fitness Sport...'}/>
                    
                    }
            </div>

            <div className='mt-[20px] w-100 flex flex-row flex-wrap justify-start items-center gap-[20px]'>
                {sports.map(sport=>(
                    <TooltipGeneral
                        key={sport.id}
                        text={'Edit the sport'}
                        placement='top'
                    >
                        <div 
                            key={sport.id} 
                            className='flex flex-row justify-center items-start gap-[25px] bg-white w-[300px] h-[200px] rounded-[20px] p-[20px] cursor-pointer'
                            onClick={()=>{
                                handleSportSelect(sport.id)
                                handleModalOpen()
                            }}
                        >
                            <div className={'flex flex-col justify-start items-start gap-[5px]'}>
                                <div className='font-bold'>On {formatDate(sport.date)}</div>
                                <div className='font-bold text-[#ff4400]'>{sport.name}</div>
                                <div className=''>In <span className='font-bold'>{sport.intensity}</span> intensity</div>
                                <div className=''>From <span className='font-bold'>{convertTo12HourFormat(sport.startTime)}</span> to <span className='font-bold'>{convertTo12HourFormat(sport.endTime)}</span></div>
                            </div>
                            <div>
                                <div className='font-bold'>Consumed</div>
                                <div className={`bg-[#ff4400] w-[80px] h-[80px] 
                                    rounded-[15px] flex flex-row justify-center 
                                    items-center text-[35px] text-white font-bold`}>
                                    {sport.calories}

                                </div>
                                <div className='font-bold'>Calories</div>
                            </div>

                        </div>
                    </TooltipGeneral>
                ))}
            </div>
        </>
    )
}

export default FitnessSport