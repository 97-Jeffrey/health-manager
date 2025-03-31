import { useState } from 'react';

import * as STYLES from '../constants/styles'
import Dropdown from '../elements/dropdown/dropdown'

import BodyModal from '../components/body/bodyModal';


const Body = () => {

  const [open,setOpen] = useState<boolean>(false)

  const handleModalOpen = ()=> {
    setOpen(true)
  }
  const handleModalClose = ()=> {
    setOpen(false)
  }

  return (
    <>
      <BodyModal open={open} handleClose={handleModalClose}/>

      <div className='w-100 bg-white p-3 rounded-lg flex flex-col gap-3'>
        <div className='flex flex-row justify-between items-center w-100'>
          <div className='font-bold text-[30px]'>Body Symptom</div> 
          <button className={STYLES.ACTION_BUTTON} onClick={handleModalOpen}>Update</button>
        </div>

        <Dropdown data={['Face', 'Body']}/>


        

        

       
      </div>
    </>
  )
};

export default Body;
