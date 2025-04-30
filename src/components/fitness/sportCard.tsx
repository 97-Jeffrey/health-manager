import TooltipGeneral from "../../elements/tooltip/tooltip"
import { convertTo12HourFormat, formatDate } from "../../lib/util/date"
import { SportInterface } from "../../types/sport"

interface SportCardInterface {
    sport: SportInterface,
    handleSportSelect: (id: string) => void,
    handleModalOpen: ()=>void,
}

const SportCard: React.FC<SportCardInterface> = ({ 
    sport,
    handleSportSelect,
    handleModalOpen,
}) =>{
    return (
        <>
            <TooltipGeneral
                    key={sport.id}
                    text={'Edit the sport'}
                    placement='top'
                >
                    <div 
                        key={sport.id} 
                        className='flex flex-row justify-center items-start gap-[25px] bg-white w-[300px] h-[200px] rounded-[20px] p-[20px] cursor-pointer'
                        onClick={()=>{
                            handleSportSelect(sport.id)
                            handleModalOpen()
                        }}
                    >
                        <div className={'flex flex-col justify-start items-start gap-[5px]'}>
                            <div className='font-bold'>On {formatDate(sport.date)}</div>
                            <div className='font-bold text-[#ff4400]'>{sport.name}</div>
                            <div className=''>In <span className='font-bold'>{sport.intensity}</span> intensity</div>
                            <div className=''>From <span className='font-bold'>{convertTo12HourFormat(sport.startTime)}</span> to <span className='font-bold'>{convertTo12HourFormat(sport.endTime)}</span></div>
                        </div>
                        <div>
                            <div className='font-bold'>Consumed</div>
                            <div className={`bg-[#ff4400] w-[80px] h-[80px] 
                                rounded-[15px] flex flex-row justify-center 
                                items-center text-[35px] text-white font-bold`}>
                                {sport.calories}

                            </div>
                            <div className='font-bold'>Calories</div>
                        </div>

                    </div>
            </TooltipGeneral>
        </>
    )
}

export default SportCard