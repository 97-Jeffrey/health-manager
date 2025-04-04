import { useState } from 'react';
import * as STYLES from '../../constants/styles'
import BarChart from '../../elements/chart/barChart';
import { useBodyWeight } from '../../hooks/useBodyWeight';
import Success from '../../elements/banner/success';
import BodyWeightModal from './bodyWeightModal';
import LoadingSpinner from '../../elements/loading/loadingSpinner';
import Info from '../../elements/info/info';
import { analyzeBodyWeight } from '../../lib/util/body';


const BodyWeight: React.FC = () => {

     const [open,setOpen] = useState<boolean>(false)



    const  {
         isEdit,
         loading,
         success,
         setSuccess,
         bodyWeight,  
         bodyWeights,
         handleFieldChange,
         handleDropdownFieldChange,
         handleWeightCreate,
         handleWeightUpdate,
         handleWeightRemove,
         handleWeightSelect,
    } = useBodyWeight();

    const { dates, data} = analyzeBodyWeight(bodyWeights)



    
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
            <BodyWeightModal 
                toDelete={isEdit}
                isEdit={isEdit}
                open={open} 
                handleClose={handleModalClose}
                bodyWeight={bodyWeight}
                handleFieldChange={handleFieldChange}
                handleDropdownFieldChange={handleDropdownFieldChange}
                asyncAction={isEdit? handleWeightUpdate:handleWeightCreate}
                asyncDeleteAction={handleWeightRemove}
            />
           <div className='w-100 bg-white p-3 rounded-lg flex flex-col gap-3'>
                <div className='flex flex-row justify-between items-center w-100'>
                    <div className='font-bold text-[30px]'>Body Weights</div> 
                    <button 
                        className={STYLES.ACTION_BUTTON} 
                        onClick={()=>{
                            handleWeightSelect('')
                            handleModalOpen()
                        }}
                    >
                        Add Weight
                    </button>
                </div>
                <Info 
                    text={`Logging your daily body weight helps you monitor 
                        progress, identify trends, and stay accountable 
                        to your health and fitness goals. Whether you're 
                        aiming for weight loss, muscle gain, or simply 
                        maintaining a healthy lifestyle, consistent 
                        tracking provides valuable insights into your 
                        body's changes over time. `}
                />
                {
                    loading
                    &&
                    <LoadingSpinner  text={'Loading Body Weights...'}/>
                }

                {bodyWeights.length>0 ?
                <BarChart 
                    text={'Body Weight'}
                    labels={dates}
                    values={data}
                    selectTargetData={handleWeightSelect}
                    handleOpen={handleModalOpen}
                />
                    :
                <Info text={'No Weight data are found'}/>
                }
                
           </div>
        </>
    )

}


export default BodyWeight;