import { useState } from "react"
import SectionSelector from "../elements/tab/SectionSelector"
import FitnessSport from "../components/fitness/fitnessSport"
import FitnessSleep from "../components/fitness/fitnessSleep"

const Fitness: React.FC = () =>{

     const [selectedSection, setSelectedSection] = useState<string>('Sport')
    return (
        <>
           <SectionSelector
                sections={['Sport', 'Sleep']}
                selectedSection={selectedSection}
                setSelectedSection={setSelectedSection}
            />


        {selectedSection === 'Sport'? 
            <FitnessSport />:
            <FitnessSleep />
        }
            
        </>
    )
}


export default Fitness