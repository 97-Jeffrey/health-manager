import * as STYLES from '../../constants/styles'
import MealModal from "./mealModal"
import { useState } from "react"
import { useMeal } from "../../hooks/useMeal"
import Success from "../../elements/banner/success"
import Info from "../../elements/info/info"
import LoadingSpinner from "../../elements/loading/loadingSpinner"
import { GroupedMealsArray, sortedMeals } from "../../lib/util/meal"
import MealDetailModal from "./mealDetailModal"
import MealCard from './mealCard'



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
        handleMealSelect,
        handleUploadMealImage,
        handleMealCreate,
        handleMealUpdate,
        handleMealRemove,
    } = useMeal();
    
    const mealSorted: GroupedMealsArray[] = sortedMeals(meals)
    
    return (
        <>
           <MealModal 
              toDelete={isEdit}
              isEdit={isEdit}
              open={open} 
              handleClose={handleModalClose}
              meal={meal}
              handleFieldChange={handleFieldsChange}
              handleUploadImage={handleUploadMealImage}
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
                    <div className='font-bold text-[30px]'>My Meals 🍇 🍉 🍑 🥝 🍒</div>
                    <button 
                        className={STYLES.ACTION_BUTTON} 
                        onClick={()=>{
                            handleMealSelect('')
                            handleModalOpen()
                        }}
                    >
                        Create Meal
                    </button>
                </div>

                <Info
                    text={`
                        Log your meals effortlessly and stay on top of your dietary goals! 

                   `}
                />

                {
                    loading  
                        &&
                    <div className='mt-[25px] mb-[25px]'>
                        <LoadingSpinner text={"Loading Recipes ..."}/>
                    </div>
                }

                <div className='mt-[25px] flex flex-row flex-wrap justify-start items-center gap-[20px]'>
                    {mealSorted.map((meal: GroupedMealsArray)=>(
                        <MealCard 
                            meal={meal}
                            handleMealSelect={handleMealSelect}
                            handleModalOpen={handleModalOpen}
                            setSelectedMeal={setSelectedMeal}
                            setOpenDetail={setOpenDetail}
                        />
                    ))}
                </div>
            </div>
        </>
    )

}


export default MealList