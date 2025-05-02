import TooltipGeneral from "../../elements/tooltip/tooltip"
import { convertTo12HourFormat, formatDate } from "../../lib/util/date"
import { calculateSleepHours } from "../../lib/util/sleep"
import { SleepInterface } from "../../types/sleep"

interface SleepCardInterface {
    sleep: SleepInterface,
    handleSleepSelect: (id: string) => void,
    handleModalOpen: ()=>void,
}

const SleepCard: React.FC<SleepCardInterface> = ({ 
    sleep,
    handleSleepSelect,
    handleModalOpen,
}) =>{
    return (
        <>
            <TooltipGeneral
                    key={sleep.id}
                    text={'Edit the Sleep'}
                    placement='top'
                >
                    <div 
                        key={sleep.id} 
                        className='flex flex-col justify-start items-start gap-[15px] bg-white w-[400px] h-[250px]  rounded-[20px] p-[20px] cursor-pointer'
                        onClick={()=>{
                            handleSleepSelect(sleep.id)
                            handleModalOpen()
                        }}
                    >
                        <div className={'flex flex-row justify-start items-center gap-[15px] w-100'}>
                            <div className='font-bold'>{formatDate(sleep.date)}</div>
                        
                        </div>

                        <div className={'flex flex-row justify-between items-center gap-[15px] w-100'}>
                            <div className="font-bold"><span className=' text-white bg-sleep-hours p-[5px] rounded-[6px]'>
                                {calculateSleepHours(sleep.startTime, sleep.endTime)}</span> hours
                            </div>
                            <div className="font-bold">Quality Score &nbsp;<span className=' text-white bg-sleep-hours py-[6px] px-[10px] rounded-[6px]'>{sleep.quality}</span></div>
                        </div>

                        <div className='flex flex-row justify-between items-center w-100'>
                            <div className=''>
                                From 
                                &nbsp;
                                <span className='font-bold'>{convertTo12HourFormat(sleep.startTime)}</span> 
                                &nbsp;
                                to 
                                &nbsp;
                                <span className='font-bold'>{convertTo12HourFormat(sleep.endTime)}</span>
                            </div>
                        </div>
                        <div className={`
                            flex flex-col justify-start items-center 
                            gap-[10px] bg-[#ebeaec] p-[10px] rounded-[10px]
                            h-[100px] overflow-y-scroll
                            `
                            }>
                            {sleep.note}
                        </div>

                    </div>
            </TooltipGeneral>
        </>
    )
}

export default SleepCard