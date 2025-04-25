import { useState } from "react"
import NutrientsTable from "../../elements/table/NutritionTable"
import { MealInterface } from "../../types/recipe"

import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { convertTo12HourFormat } from "../../lib/util/date";
import { capitalizeFirstChar } from "../../lib/util/string";

interface MealDetailEntryInterface {
    meal: MealInterface
}

const MealDetailEntry: React.FC<MealDetailEntryInterface> = ({ meal }) =>{

    const [openTable, setOpenTable] = useState<boolean>(false)

    const handleTableOpen = () =>{
       setOpenTable(prev=> !prev)
    }

    return (
        <>
            <div key={meal.id} className='w-100' >
                <div className="bg-[#f5f5f5] flex flex-col items-center">
                    <div 
                        
                        className={' rounded-[10px] p-[15px] w-100 flex flex-row justify-between items-center gap-[15px]'}
                    >
                        <div className='font-bold w-[150px]'>{capitalizeFirstChar(meal.name)}</div>
                        <div className='font-bold w-[100px]'>{convertTo12HourFormat(meal.startTime)} - {convertTo12HourFormat(meal.endTime)}</div>
                        <div className='w-[200px]'>{capitalizeFirstChar(meal.note)}</div>
                        {meal.image ?
                            <img 
                                src={meal.image} 
                                alt="Meal Image" 
                                className="w-[150px] rounded-[12px] object-cover"
                            />:
                            <div className='w-[150px]'>None</div>
                        }


                    </div>
                    <div
                        className='text-[30px] cursor-pointer'
                        onClick={handleTableOpen}
                    >
                        {openTable? <RiArrowDropUpLine/>: <RiArrowDropDownLine/>}
                    </div>
                </div>


                {
                    meal.micronutrients  && openTable
                        &&
                    <NutrientsTable
                        micronutrients={meal.micronutrients}
                    />
                    
                }
                                
            </div>
        </>
    )
}


export default MealDetailEntry