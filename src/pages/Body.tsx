import { useState } from "react";
import BodySymptom from "../components/body/bodySymptom";
import BodyWeight from "../components/body/bodyWeight";
import BodyGlucose from "../components/body/bodyGlucose";


const Body: React.FC = () => {

  const [selectedSection, setSelectedSection] = useState<string>('Symptom')


  return (
    <>
      <div className='w-100 flex flex-row justify-start items-center gap-2 mb-[20px]'>

        {['Symptom', 'Weight', 'Glucose'].map(section=> (
          <div 
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
