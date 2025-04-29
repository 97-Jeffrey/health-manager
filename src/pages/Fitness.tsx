import { useState } from "react"
import SectionSelector from "../elements/tab/SectionSelector"
import FitnessSport from "../components/fitness/fitnessSport"

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
            <></>
        }
            
        </>
    )
}


export default Fitness