import { formatDate } from "../../lib/util/date"
import { getBgColorByMindType } from "../../lib/util/mind"
import { capitalizeFirstChar } from "../../lib/util/string"
import { mindInterface } from "../../types/mindInterface"


interface MindDisplayInterface {
    mind: mindInterface
    handleMindSelect:(id: string)=> void,
    handleModalOpen: ()=> void
}

const MindDisplay: React.FC<MindDisplayInterface> =({
    mind, 
    handleMindSelect,
    handleModalOpen
}) =>{
    return (
        <>
            <div 
                key={mind.id} 
                className=' cursor-pointer w-100 bg-[#eefceb] border border-black rounded-lg p-3 flex flex-col justify-center items-start gap-[10px]'
                onClick={()=>{
                    handleMindSelect(mind.id)
                    handleModalOpen()
                }}
            >
                <div className='font-bold text-white bg-[#000000] px-[10px] py-[5px] rounded-[10px]'>{formatDate(mind.date)}</div>
                {Object.entries(mind.data).map(([key, value])=> (
                    <div key={key} className='w-100 flex flex-row justify-start items-center gap-[15px]'>
                        <div className='font-bold w-[100px]'>{capitalizeFirstChar(key)}</div>
                        <div className='w-100 h-[10px] bg-[#ffffff] border border-black rounded-[5px]'>
                        <div 
                            style={{ 
                            width : `${value * 10}%`,
                            backgroundColor: getBgColorByMindType(key)
                            }} 
                            className={`h-[8px] rounded-[5px]` }
                        >
                        </div>
                        </div>
                    </div>
                ))}
                <div className='font-bold bg-white p-[10px] rounded-[10px]'>
                {mind.note}

                </div>
                
            </div>
        </>
    )
}


export default MindDisplay