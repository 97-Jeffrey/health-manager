import { useState } from 'react';
import { useMind } from '../hooks/useMind';
import { capitalizeFirstChar } from '../lib/util/string';
import MindMeditation from '../components/Mind/mindMeditation';

const Wellness: React.FC = () => {

  const [selectedSection, setSelectedSection] = useState<string>('meditation')
  const { handleMindTypeChange } = useMind()

  return (
    <>

      <div className='w-100 flex flex-row justify-start items-center gap-2 mb-[20px]'>
        {['meditation', 'cognition', 'mood'].map(section=> (
          <div 
            key={section}
            className={
            `${selectedSection ===section? 'bg-black': "bg-[#edebeb]"} 
             ${selectedSection ===section? 'text-white': "text-black"}
             rounded-[10px] p-3 font-bold cursor-pointer`
            }
            onClick={()=> {
              setSelectedSection(section)
              handleMindTypeChange(section as 'meditation'| 'cognition' | 'mood')
            }}
          > 
            {capitalizeFirstChar(section)}
          </div>

        ))}
      </div>
      {selectedSection ==='meditation' && <MindMeditation section={selectedSection}/>}
    </>
  )
};

export default Wellness;
