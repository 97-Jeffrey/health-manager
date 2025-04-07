import { useState } from 'react';
import * as STYLES from '../../constants/styles'
import BarChart from '../../elements/chart/barChart';
import Success from '../../elements/banner/success';
import LoadingSpinner from '../../elements/loading/loadingSpinner';
import Info from '../../elements/info/info';
import { analyzeBodyGlucose } from '../../lib/util/body';
import { useBodyGlucose } from '../../hooks/useBodyGlucose';
import BodyGlucoseModal from './bodyGlucoseModal';


const BodyGlucose: React.FC = () => {

    const [open,setOpen] = useState<boolean>(false)



    const  {
         isEdit,
         loading,
         success,
         setSuccess,
         bodyGlucose,  
         bodyGlucoses,
         handleFieldChange,
         handleGlucoseCreate,
         handleGlucoseUpdate,
         handleGlucoseRemove,
         handleGlucoseSelect,
    } = useBodyGlucose();

    const { dates, data } = analyzeBodyGlucose(bodyGlucoses)



    
  const handleModalOpen = ()=> {
    setOpen(true)
  }
  const handleModalClose = ()=> {
    setOpen(false)
  }


    
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
            <BodyGlucoseModal 
                toDelete={isEdit}
                isEdit={isEdit}
                open={open} 
                handleClose={handleModalClose}
                bodyGlucose={bodyGlucose}
                handleFieldChange={handleFieldChange}
                asyncAction={isEdit? handleGlucoseUpdate:handleGlucoseCreate}
                asyncDeleteAction={handleGlucoseRemove}
            />
           <div className='w-100 bg-white p-3 rounded-lg flex flex-col gap-3'>
                <div className='flex flex-row justify-between items-center w-100'>
                    <div className='font-bold text-[30px]'>Body Glucoses</div> 
                    <button 
                        className={STYLES.ACTION_BUTTON} 
                        onClick={()=>{
                            handleGlucoseSelect('')
                            handleModalOpen()
                        }}
                    >
                        Add Glucose
                    </button>
                </div>
                <Info 
                    text={`The Body Glucose Tracking feature allows
                       users to log, monitor, and analyze their blood 
                       glucose levels over time. This is particularly 
                       useful for individuals managing diabetes, 
                       prediabetes, or other metabolic conditions, 
                       as well as those who want to optimize their health 
                       through better glucose control.`}
                />
                {
                    loading
                    &&
                    <LoadingSpinner  text={'Loading Body Glucoses...'}/>
                }

                {bodyGlucoses.length>0 ?
                <BarChart 
                    text={'Body Glucoses'}
                    labels={dates}
                    values={data}
                    selectTargetData={handleGlucoseSelect}
                    handleOpen={handleModalOpen}
                />
                    :
                <Info text={'No Glucose data are found'}/>
                }
                
           </div>
        </>
    )

}


export default BodyGlucose;