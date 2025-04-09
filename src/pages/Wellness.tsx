import * as STYLES from '../constants/styles'
import { useState } from 'react';

const Wellness: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string>('Meditation')
  return (
    <>
      <div className='w-100 flex flex-row justify-start items-center gap-2 mb-[20px]'>
      {['Meditation', 'Cognition', 'Mood'].map(section=> (
          <div 
            key={section}
            className={
            `${selectedSection ===section? 'bg-black': "bg-[#edebeb]"} 
            ${selectedSection ===section? 'text-white': "text-black"}
            rounded-[10px] p-3 font-bold cursor-pointer`}
            onClick={()=> setSelectedSection(section)}
          > 
            {section}
          </div>

        ))}

      </div>
      <div className='w-100 bg-white p-3 rounded-lg flex flex-col gap-3'>
         <div className='flex flex-row justify-between items-center w-100'>
              <div className='font-bold text-[30px]'>{selectedSection} Wellness</div> 
              <button 
                className={STYLES.ACTION_BUTTON} 
                onClick={()=>{
                  
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
