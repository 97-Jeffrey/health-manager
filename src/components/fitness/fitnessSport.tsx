
import { useState } from 'react'
import * as STYLES from '../../constants/styles'
import { useFitness } from '../../hooks/useFitness'
import Success from '../../elements/banner/success'
import SportModal from './sportModal'
import Info from '../../elements/info/info'
import LoadingSpinner from '../../elements/loading/loadingSpinner'
import SportCard from './sportCard'

const FitnessSport: React.FC= () =>{

    const [open,setOpen] = useState<boolean>(false)

    const {
        isEdit,
        sport,
        sports,
        loading,
        success,
        setSuccess,
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
                    <SportCard 
                        sport={sport}
                        handleSportSelect={handleSportSelect}
                        handleModalOpen={handleModalOpen}
                    />
                ))}
            </div>
        </>
    )
}

export default FitnessSport