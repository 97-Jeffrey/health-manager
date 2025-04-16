
import { capitalizeFirstChar } from '../lib/util/string';
import MindMain from '../components/Mind/mindMain';
import { useState } from 'react';

const Wellness: React.FC = () => {


  const [selectedSection, setSelectedSection] = useState<'meditation'| 'cognition' | 'mood'>("meditation");


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
              setSelectedSection(section as 'meditation'| 'cognition' | 'mood')
            }}
          > 
            {capitalizeFirstChar(section)}
          </div>

        ))}
      </div>
      <MindMain 
          section={selectedSection}
      />
    </>
  )
};

export default Wellness;
