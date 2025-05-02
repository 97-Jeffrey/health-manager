import { useState } from 'react'
import * as STYLES from '../../constants/styles'
import Success from '../../elements/banner/success'
import { useSleep } from '../../hooks/useSleep'
import SleepModal from './sleepModal'
import Info from '../../elements/info/info'
import LoadingSpinner from '../../elements/loading/loadingSpinner'
import SleepCard from './sleepCard'


const FitnessSleep: React.FC = () =>{

    const [open,setOpen] = useState<boolean>(false)

    const handleModalOpen = ()=> {
        setOpen(true)
      }
    const handleModalClose = ()=> {
        setOpen(false)
    }

     const {
            isEdit,
            sleep,
            sleeps,
            loading,
            success,
            setSuccess,
            handleSleepSelect,
            handleSleepQualityChange,
            handleFieldChange,
            handleDropdownFieldChange,
            handleSleepCreate,
            handleSleepUpdate,
            handleSleepRemove
        } = useSleep()


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
            <SleepModal 
                toDelete={isEdit}
                isEdit={isEdit}
                open={open} 
                handleClose={handleModalClose}
                sleep={sleep}
                handleFieldChange={handleFieldChange}
                handleDropdownFieldChange={handleDropdownFieldChange}
                handleSleepQualityChange={handleSleepQualityChange}
                asyncAction={isEdit? handleSleepUpdate:handleSleepCreate}
                asyncDeleteAction={handleSleepRemove}
            />
            <div className='w-100 bg-white p-3 rounded-lg flex flex-col gap-3'>
                   <div className='flex flex-row justify-between items-center w-100'>
                     <div className='font-bold text-[30px]'>Sleep 😴</div> 
                     <button 
                       className={STYLES.ACTION_BUTTON} 
                       onClick={()=>{
                            handleSleepSelect('')
                            handleModalOpen()
                       }}
                     >
                       Create
                     </button>
                   </div>
                    <Info
                       text={`Effortlessly log your sleep patterns and gain 
                        insights into your nightly rest with our Sleep Recording feature. 
                        Whether you want to monitor duration, quality, or bedtime habits, 
                        this tool helps you understand your sleep like never before.`}
                    />
                    {
                        loading
                            &&
                        <LoadingSpinner  text={'Loading Sleep data...'}/>
                    
                    }
            </div>

            <div className='mt-[20px] w-100 flex flex-row flex-wrap justify-start items-center gap-[20px]'>
                {sleeps.map(sleep=>(
                    <SleepCard 
                        key={sleep.id}
                        sleep={sleep}
                        handleSleepSelect={handleSleepSelect}
                        handleModalOpen={handleModalOpen}
                    />
                ))}
            </div>
        </>
    )
}


export default FitnessSleep