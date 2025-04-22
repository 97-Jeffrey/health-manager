
import MindMain from '../components/Mind/mindMain';
import { useState } from 'react';
import SectionSelector from '../elements/tab/SectionSelector';

const Wellness: React.FC = () => {


  const [selectedSection, setSelectedSection] = useState<'meditation'| 'cognition' | 'mood'>("meditation");

  return (
    <>

      <SectionSelector 
         sections={['meditation', 'cognition', 'mood']}
         selectedSection={selectedSection}
         setSelectedSection={setSelectedSection}
      />
      <MindMain 
          section={selectedSection}
      />
    </>
  )
};

export default Wellness;
