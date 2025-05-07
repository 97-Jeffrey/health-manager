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
                        className='flex flex-row justify-start items-start gap-[30px] bg-white w-[420px] rounded-[20px] p-[20px] cursor-pointer'
                        onClick={()=>{
                            handleSportSelect(sport.id)
                            handleModalOpen()
                        }}
                    >
                        <div className={'flex flex-col justify-center items-start gap-[5px]'}>
                            <div className='font-bold text-black text-[30px] leading-[35px]'>{sport.name}</div>
                            <div>On <span className='font-bold'>{formatDate(sport.date)}</span></div>
                            <div className=''>
                                <span className='font-bold'>{convertTo12HourFormat(sport.startTime)}</span> 
                                &nbsp;
                                to 
                                &nbsp;
                                <span className='font-bold'>{convertTo12HourFormat(sport.endTime)}</span>
                            </div>
                            <div className=''>In <span className='font-bold'>{sport.intensity}</span> intensity</div>
                        </div>

                        
                        <div className='flex flex-col justify-center items-start gap-[10px]'>
                            <div className='flex flex-row  justify-start items-center gap-[10px]'>
                                <div className={`bg-sport-calories  h-[40px] 
                                    rounded-[15px] flex flex-row justify-center 
                                    items-center text-[25px] text-white font-bold px-[8px]`}>
                                    {sport.calories}

                                </div>
                                <div className='font-bold'>Calories</div>
                            </div>

                            {sport.steps>0 

                              &&
                            <div className='flex flex-row justify-start items-center gap-[10px]'>
                                <div className={`bg-sport-steps  h-[40px] 
                                    rounded-[15px] flex flex-row justify-center 
                                    items-center text-[25px] text-white font-bold px-[8px]`}>
                                    {sport.steps}

                                </div>
                                <div className='font-bold'>Steps</div>
                            </div>}
                        </div>

                    </div>
            </TooltipGeneral>
        </>
    )
}

export default SportCard