import { useState } from 'react';

import * as STYLES from '../constants/styles'

import BodyModal from '../components/body/bodyModal';
import { useBodySymptom } from '../hooks/useBodySymptom';
import Success from '../elements/banner/success';
import LoadingSpinner from '../elements/loading/loadingSpinner';
import DropDown from '../elements/dropdown/dropdown';
import { getBgColorBySeverity } from '../lib/util/body';
import SymptomCard from '../components/body/symptomCard';
import Info from '../elements/info/info';


const Body: React.FC = () => {

  const [open,setOpen] = useState<boolean>(false)
  const [filteredBodyPart, setFilteredBodyPart] = useState<string>('Face');

  const handleFilteredBodyPart = (name: string, value: string| null) =>{

    if(!value) return
    setFilteredBodyPart(value)
  }


  const  {
    isEdit,
    loading,
    success,
    setSuccess,
    bodySymptom,  
    bodySymptoms,
    handleSymptomSelect,
    handleFieldChange,
    handleRatingChange,
    handleResolvedStatus,
    handleDropdownFieldChange,
    handleSymptomCreate,
    handleSymptomUpdate,
    handleSymptomRemove
} = useBodySymptom();

  const handleModalOpen = ()=> {
    setOpen(true)
  }
  const handleModalClose = ()=> {
    setOpen(false)
  }

  const filteredBodySymptoms =(resolved: boolean)=> bodySymptoms.filter(sym=> sym.mainPart === filteredBodyPart && sym.isResolved === resolved)

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
      <BodyModal 
          toDelete={isEdit}
          isEdit={isEdit}
          open={open} 
          handleClose={handleModalClose}
          bodySymptom={bodySymptom}
          handleFieldChange={handleFieldChange}
          handleRatingChange={handleRatingChange}
          handleResolvedStatus={handleResolvedStatus}
          handleDropdownFieldChange={handleDropdownFieldChange}
          asyncAction={isEdit? handleSymptomUpdate:handleSymptomCreate}
          asyncDeleteAction={handleSymptomRemove}
      />

      <div className='w-100 bg-white p-3 rounded-lg flex flex-col gap-3'>
        <div className='flex flex-row justify-between items-center w-100'>
          <div className='font-bold text-[30px]'>Body Symptoms 😷</div> 
          <button 
            className={STYLES.ACTION_BUTTON} 
            onClick={()=>{
              handleSymptomSelect('') 
              handleModalOpen()
            }}
          >
            Create
          </button>
        </div>

        <Info 
           text={`Effortlessly log and monitor your symptoms with our 
            intuitive body symptom tracker. Whether you're managing a 
            chronic condition, recovering from an illness, or just keeping 
            tabs on your health, this feature will definitely be a milestone for your health management. `}
        />

        {
          loading
            &&
          <LoadingSpinner  text={'Loading Body Symptoms...'}/>
        }

        <DropDown
          data={['Face', 'Body']}
          value={filteredBodyPart}
          name={'FilterBodyPart'}
          onChange={handleFilteredBodyPart}
        />

        <div className='w-100 flex flex-col items-start justify-center gap-3 mt-3'>

          <div className='font-bold text-[20px]'>{filteredBodySymptoms(false).length>0 && 'Current Issues:'}</div>
          {filteredBodySymptoms(false).map(sym=>{
            const color = getBgColorBySeverity(sym.rating)
            return (
              <SymptomCard 
                  key={sym.id}
                  color={color}
                  symptom={sym}
                  setOpen={setOpen}
                  handleSymptomSelect={handleSymptomSelect}
              />
            )
           
          })}

          <div className='font-bold text-[20px]'>{filteredBodySymptoms(true).length>0 && 'Past Issues:'}</div>
          {filteredBodySymptoms(true).map(sym=>{
            const color = getBgColorBySeverity(sym.rating)
            return (
              <SymptomCard 
                  key={sym.id}
                  color={color}
                  symptom={sym}
                  setOpen={setOpen}
                  handleSymptomSelect={handleSymptomSelect}
              />
            )
           
          })}

         
        </div>


        

        

       
      </div>
    </>
  )
};

export default Body;
