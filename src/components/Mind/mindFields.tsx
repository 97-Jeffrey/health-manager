import MindProgress from "../../elements/progressBar/MindProgressBar"
import { mindInterface } from "../../types/mindInterface"
import { 
    meditationInterface, 
    cognitionInterface,  
    moodInterface
} from "../../types/mindInterface"

interface MindFieldsInterface {
    section: 'meditation'| 'cognition' | 'mood',
    mind: mindInterface,
    handleMindValueChange: (name: string, rating: number) => void
}

const MindFields: React.FC<MindFieldsInterface> = ({ 
    section,
    mind, 
    handleMindValueChange 
}) =>{



    
    if(section === 'meditation'){
        const meditationData = mind.data as meditationInterface;

        return (
            <>
              {
                Object.keys(meditationData).map(item=>(
                    <div className='flex flex-col gap-2 ' key={item}>
                        <label className="block text-sm font-medium text-gray-700">Rate the "{item}" level from a scale of 1 to 10:
                        </label>
                        <MindProgress 
                            name={item}
                            value={meditationData[item as keyof meditationInterface]}
                            onChange={handleMindValueChange}
                        />
                    </div>
    
                ))
              }
                
            </>
        )

    } 

    else if(section === 'cognition') return (
        <>
          {
            Object.keys(mind.data).map(item=>(
                <div className='flex flex-col gap-2 ' key={item}>
                    <label className="block text-sm font-medium text-gray-700">Rate the "{item}" level from a scale of 1 to 10:
                    </label>
                    <MindProgress 
                        name={item}
                        value={(mind.data as cognitionInterface)[item as keyof cognitionInterface]}
                        onChange={handleMindValueChange}
                    />
                </div>

            ))
          }
            
        </>
    )

    else return (

        <>
          {
            Object.keys(mind.data).map(item=>(
                <div className='flex flex-col gap-2 ' key={item}>
                    <label className="block text-sm font-medium text-gray-700">Rate the "{item}" level from a scale of 1 to 10:
                    </label>
                    <MindProgress 
                        name={item}
                        value={(mind.data as moodInterface)[item as keyof moodInterface]}
                        onChange={handleMindValueChange}
                    />
                </div>

            ))
          }
            
        </>

    )

    
}

export default MindFields