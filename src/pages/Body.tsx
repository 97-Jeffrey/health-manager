import { useState } from "react";
import BodySymptom from "../components/body/bodySymptom";
import BodyWeight from "../components/body/bodyWeight";
import BodyGlucose from "../components/body/bodyGlucose";
import SectionSelector from "../elements/tab/SectionSelector";


const Body: React.FC = () => {

  const [selectedSection, setSelectedSection] = useState<string>('Symptom')


  return (
    <>
      <SectionSelector 
         sections={['Symptom', 'Weight', 'Glucose']}
         selectedSection={selectedSection}
         setSelectedSection={setSelectedSection}
      />

      {selectedSection === 'Symptom'? 
       <BodySymptom />:
       selectedSection === 'Weight'?
       <BodyWeight /> :
       <BodyGlucose />
      }
      
    

      
        

       

   


        

        

       
   
    </>
  )
};

export default Body;
