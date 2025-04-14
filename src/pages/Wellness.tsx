import MindModal from '../components/Mind/mindModal';
import * as STYLES from '../constants/styles'
import { useState } from 'react';
import { useMind } from '../hooks/useMind';
import Success from '../elements/banner/success';
import { capitalizeFirstChar } from '../lib/util/string';

const Wellness: React.FC = () => {

  const [selectedSection, setSelectedSection] = useState<string>('meditation')
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
    handleFieldChange,
    handleMindTypeChange,
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

      <div className='w-100 flex flex-row justify-start items-center gap-2 mb-[20px]'>
      {['meditation', 'cognition', 'mood'].map(section=> (
          <div 
            key={section}
            className={
            `${selectedSection ===section? 'bg-black': "bg-[#edebeb]"} 
            ${selectedSection ===section? 'text-white': "text-black"}
            rounded-[10px] p-3 font-bold cursor-pointer`}
            onClick={()=> {
              setSelectedSection(section)
              handleMindTypeChange(section as 'meditation'| 'cognition' | 'mood')
            }}
          > 
            {capitalizeFirstChar(section)}
          </div>

        ))}

      </div>
      <div className='w-100 bg-white p-3 rounded-lg flex flex-col gap-3'>
         <div className='flex flex-row justify-between items-center w-100'>
              <div className='font-bold text-[30px]'>{selectedSection} Wellness</div> 
              <button 
                className={STYLES.ACTION_BUTTON} 
                onClick={()=>{
                  handleModalOpen()
                }}
              >
                {`Add ${selectedSection}`}
              </button>
            </div>

      </div>
    </>
  )
};

export default Wellness;
