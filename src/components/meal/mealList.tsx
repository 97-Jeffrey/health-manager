import * as STYLES from '../../constants/styles'
import MealModal from "./mealModal"
import { useState } from "react"
import { useMeal } from "../../hooks/useMeal"
import Success from "../../elements/banner/success"
import Info from "../../elements/info/info"
import LoadingSpinner from "../../elements/loading/loadingSpinner"
import { GroupedMealsArray, sortedMeals } from "../../lib/util/meal"
import { formatDate } from "../../lib/util/date"
import MealDetailModal from "./mealDetailModal"
import { FiEdit2 } from "react-icons/fi";



interface MealListInterface {
}


const MealList: React.FC<MealListInterface> = () =>{

    const [ open, setOpen] = useState<boolean>(false)
    const [ openDetail, setOpenDetail] = useState<boolean>(false)
    const [selectedMeal, setSelectedMeal] = useState<GroupedMealsArray>({ date:"", data:[] })

    const handleModalOpen = ()=> {
        setOpen(true)
    }

    const handleModalClose = ()=> {
        setOpen(false)
    }

    const  {
        isEdit,
        loading,
        success,
        meals,
        meal,
        setSuccess,
        handleFieldsChange,
        handleMealCreate,
        handleMealUpdate,
        handleMealRemove,
    } = useMeal();
    
    const mealSorted: GroupedMealsArray[] = sortedMeals(meals)
    console.log(mealSorted)
    
    return (
        <>
           <MealModal 
              toDelete={isEdit}
              isEdit={isEdit}
              open={open} 
              handleClose={handleModalClose}
              meal={meal}
              handleFieldChange={handleFieldsChange}
              asyncAction={isEdit? handleMealUpdate:handleMealCreate}
              asyncDeleteAction={handleMealRemove}  
           />

           <MealDetailModal 
              open={openDetail}
              setOpen={setOpenDetail}
              meals={selectedMeal}
           />

            {
                success 
                   &&
                <Success
                  text={success}
                  onClose={()=>setSuccess('')}
                />
            }


           <div className="w-full bg-white rounded-lg shadow-md p-8">
           
                          
                <div className=' flex flex-row justify-between items-center mb-3'>
                    <div className='font-bold text-[30px]'>My Meals 👨‍🍳</div>
                    <button className={STYLES.ACTION_BUTTON} onClick={handleModalOpen}>Create Meal</button>
                </div>

                <Info
                    text={`Save, organize, and recreate your favorite dishes 
                    effortlessly—whether it’s a family heirloom, 
                    a restaurant-inspired creation, or a healthy meal 
                    prep idea. A recipe that truly matters to you, and your health.
                   `}
                />

                {
                    loading ?
                    <LoadingSpinner text={"Loading Recipes ..."}/>
                        :
                    <div className='flex flex-row flex-wrap justify-left items-start gap-5 mt-[30px] '>

                    </div>
                }

                <div className='flex flex-row flex-wrap justify-start items-center gap-[20px]'>
                    {mealSorted.map((meal: GroupedMealsArray)=>(
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
                                    <div className='w-100 flex flex-row justify-start items-center gap-[15px] text-start mt-[15px] font-bold  pl-[20px]'>
                                        <div>"{meal.name}" </div>
                                        <div><FiEdit2 /></div>
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
                    ))}
                </div>
            </div>
        </>
    )

}


export default MealList