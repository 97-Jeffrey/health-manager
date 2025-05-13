import { FiEdit2 } from "react-icons/fi"
import { formatDate } from "../../lib/util/date"
import { GroupedMealsArray } from "../../lib/util/meal"
import { capitalizeFirstChar } from "../../lib/util/string"
import TooltipGeneral from "../../elements/tooltip/tooltip"
import { HydrationInterface } from "../../types/recipe"
import { useState } from "react"

interface MealCardInterface {
    meal: GroupedMealsArray,
    hydrations: HydrationInterface[],
    handleModalOpen: ()=> void,
    handleHydrationModalOpen: ()=> void,
    handleMealSelect: (id: string)=> void,
    handleHydrationSelect: (id: string)=> void,
    setSelectedMeal: (meal: GroupedMealsArray)=> void,
    setOpenDetail: (open: boolean)=> void

}


const MealCard : React.FC<MealCardInterface>= ({ 
    meal,
    hydrations,
    handleMealSelect,
    handleHydrationSelect,
    handleModalOpen,
    handleHydrationModalOpen,
    setSelectedMeal,
    setOpenDetail
}) =>{

    const [selectedEntry, setSelectedEntry] = useState<string>(meal?.data.length? 'meal': 'hydration')

    return (
        <>
            <div key={meal.date} className=' rounded-[20px] w-[300px] h-[240px] border border-1  border-lg shadow-custom bg-white'>
                <div className={`
                    flex flex-row justify-center items-center font-bold 
                    w-100 border border-black h-[40px] rounded-tl-[20px] rounded-tr-[20px] bg-black text-white`}
                >
                    {formatDate(meal.date)}
                </div>

                <div className="flex flex-row justiy-start gap-[10px] pl-[20px] mt-[15px]">

                    {
                    meal.data.length> 0
                      &&
                    <div 
                        className={`cursor-pointer ${selectedEntry === 'meal'? 'font-bold': ""} `}
                        onClick={()=>{
                            setSelectedEntry('meal')
                        }}
                    >
                        {meal.data.length} meal{meal.data.length==1? '':'s'}
                    </div>
                    }
                    
                    {
                    hydrations.length>0
                       &&
                    <div 
                        className={`cursor-pointer ${selectedEntry === 'hydration'? 'font-bold': ""} `}
                        onClick={()=>{
                            setSelectedEntry('hydration')
                        }}
                    >
                        {hydrations.length} hydration{hydrations.length==1? '':'s'}
                    </div>
                    }
                </div>

                <div className='h-[80px] overflow-y-scroll'>
                {
                   selectedEntry === 'meal' ? 
                    meal.data.map(meal=>(
                        <div key={meal.id} className='w-100 flex flex-row justify-start items-center gap-[15px] text-start mt-[15px] font-bold  pl-[20px]'>
                            <div>"{capitalizeFirstChar(meal.name)}" </div>
                            <div 
                                className='cursor-pointer'
                                onClick={()=>{
                                    handleMealSelect(meal.id)
                                    handleModalOpen()
                                }}
                            >
                                <TooltipGeneral 
                                    text='Edit the meal'
                                    placement="right"
                                > 
                                    <div>
                                        <FiEdit2 />
                                    </div>
                                </TooltipGeneral>
                            </div>
                        </div>

                    )):
                    hydrations.map(hydration=>(
                        <div key={hydration.id} className='w-100 flex flex-row justify-start items-center gap-[15px] text-start mt-[15px] font-bold  pl-[20px]'>
                            <div>"{capitalizeFirstChar(hydration.type)}" </div>
                            <div 
                                className='cursor-pointer'
                                onClick={()=>{
                                    handleHydrationSelect(hydration.id)
                                    handleHydrationModalOpen()
                                }}
                            >
                                <TooltipGeneral 
                                    text='Edit the hydration'
                                    placement="right"
                                > 
                                    <div>
                                        <FiEdit2 />
                                    </div>
                                </TooltipGeneral>
                            </div>
                        </div>

                    ))
            
                }
                </div>

                <div className='text-center mt-[20px] flex flex-row justify-center items-center gap-[10px]'>
                    <button 
                        className='border-none bg-[#edebeb] text-center rounded-[20px]'
                        onClick={()=> {
                            setSelectedMeal(meal)
                            setOpenDetail(true)
                        }}
                    >
                        View Detail
                    </button>
                </div>


            </div>
        </>
    )
}


export default MealCard