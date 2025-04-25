import { FiEdit2 } from "react-icons/fi"
import { formatDate } from "../../lib/util/date"
import { GroupedMealsArray } from "../../lib/util/meal"
import { capitalizeFirstChar } from "../../lib/util/string"
import TooltipGeneral from "../../elements/tooltip/tooltip"

interface MealCardInterface {
    meal: GroupedMealsArray,
    handleModalOpen: ()=> void,
    handleMealSelect: (id: string)=> void,
    setSelectedMeal: (meal: GroupedMealsArray)=> void,
    setOpenDetail: (open: boolean)=> void

}


const MealCard : React.FC<MealCardInterface>= ({ 
    meal,
    handleMealSelect,
    handleModalOpen,
    setSelectedMeal,
    setOpenDetail
}) =>{
    return (
        <>
            <div key={meal.date} className=' rounded-[20px] w-[300px] h-[240px] border border-1  border-lg shadow-custom bg-white'>
                <div className={`
                    flex flex-row justify-center items-center font-bold 
                    w-100 border border-black h-[40px] rounded-tl-[20px] rounded-tr-[20px] bg-black text-white`}
                >
                    {formatDate(meal.date)}
                </div>

                <div className='text-start mt-[15px] pl-[20px]'>
                    {meal.data.length} meal{meal.data.length==1? '':'s'}
                </div>

                <div className='h-[80px] overflow-y-scroll'>
                {
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
                                <TooltipGeneral text='Edit the meal'> 
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