import { useState } from 'react';

import * as STYLES from '../constants/styles'

import BodyModal from '../components/body/bodyModal';
import { useBodySymptom } from '../hooks/useBodySymptom';
import Success from '../elements/banner/success';


const Body: React.FC = () => {

  const [open,setOpen] = useState<boolean>(false)


  const  {
    success,
    setSuccess,
    bodySymptom,  
    handleFieldChange,
    handleRatingChange,
    handleDropdownFieldChange,
    hanldleSymptomCreate
} = useBodySymptom();

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
          text={`Journey Created Successfully`}
          onClose={()=>setSuccess(false)}
        />
      }
      <BodyModal 
          open={open} 
          handleClose={handleModalClose}
          bodySymptom={bodySymptom}
          handleFieldChange={handleFieldChange}
          handleRatingChange={handleRatingChange}
          handleDropdownFieldChange={handleDropdownFieldChange}
          hanldleSymptomCreate={hanldleSymptomCreate}
      />

      <div className='w-100 bg-white p-3 rounded-lg flex flex-col gap-3'>
        <div className='flex flex-row justify-between items-center w-100'>
          <div className='font-bold text-[30px]'>Body Symptom</div> 
          <button className={STYLES.ACTION_BUTTON} onClick={handleModalOpen}>Update</button>
        </div>

        {/* <Dropdown data={['Face', 'Body']}/> */}


        

        

       
      </div>
    </>
  )
};

export default Body;
