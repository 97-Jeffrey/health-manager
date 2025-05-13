import * as STYLES from '../../constants/styles'
import MealModal from "./mealModal"
import { useState } from "react"
import Success from "../../elements/banner/success"
import Info from "../../elements/info/info"
import LoadingSpinner from "../../elements/loading/loadingSpinner"
import { GroupedMealsArray, sortedMeals } from "../../lib/util/meal"
import MealDetailModal from "./mealDetailModal"
import MealCard from './mealCard'

import { useMeal } from "../../hooks/useMeal"
import { useHydration } from '../../hooks/useHydration'
import HydrationModal from '../hydration/hydrationModal'



interface MealListInterface {
}


const MealList: React.FC<MealListInterface> = () =>{
 
    const [openMeal, setOpenMeal] = useState<boolean>(false)
    const [openHydration, setOpenHydraton] = useState<boolean>(false)
    const [openMealDetail, setOpenMealDetail] = useState<boolean>(false)
    const [selectedMeal, setSelectedMeal] = useState<GroupedMealsArray>({ date:"", data:[] })

    const handleMealModalOpen = ()=> {
        setOpenMeal(true)
    }

    const handleMealModalClose = ()=> {
        setOpenMeal(false)
    }

    const handleHydrationModalOpen = ()=> {
        setOpenHydraton(true)
    }

    const handleHydrationModalClose = ()=> {
        setOpenHydraton(false)
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

    const {
        isEdit: isHydrationEdit,
        success: hydrationSuccess,
        hydrations,
        hydration,
        setSuccess: setHydrationSuccess,
        handleFieldsChange: handleHydrationFieldsChange,
        handleHydrationSelect,
        handleHydrationCreate,
        handleHydrationUpdate,
        handleHydrationRemove,
    } = useHydration()

    const mealSorted: GroupedMealsArray[] = sortedMeals(meals)
    
    return (
        <>
           <MealModal 
                toDelete={isEdit}
                isEdit={isEdit}
                open={openMeal} 
                handleClose={handleMealModalClose}
                meal={meal}
                handleFieldChange={handleFieldsChange}
                handleUploadImage={handleUploadMealImage}
                asyncAction={isEdit? handleMealUpdate:handleMealCreate}
                asyncDeleteAction={handleMealRemove}  
           />

            <HydrationModal
                toDelete={isHydrationEdit}
                isEdit={isHydrationEdit}
                open={openHydration} 
                hydration={hydration}
                handleClose={handleHydrationModalClose}
                handleFieldChange={handleHydrationFieldsChange}
                asyncAction={isHydrationEdit? handleHydrationUpdate:handleHydrationCreate}
                asyncDeleteAction={handleHydrationRemove}  
            />

           <MealDetailModal 
              open={openMealDetail}
              setOpen={setOpenMealDetail}
              meals={selectedMeal}
              hydrations={hydrations.filter(hydr=>hydr.date === selectedMeal.date)}
           />

            {
                success 
                   &&
                <Success
                  text={success}
                  onClose={()=>setSuccess('')}
                />
            }

            {   
                hydrationSuccess 
                   &&
                <Success
                  text={hydrationSuccess}
                  onClose={()=>setHydrationSuccess('')}
                />
            }


           <div className="w-full bg-white rounded-lg shadow-md p-8">
           
                          
                <div className=' flex flex-row justify-between items-center mb-3'>
                    <div className='font-bold text-[30px]'>My Meals 🍇 🍉 🍑 🥝 🍒</div>
                    <div className='flex flex-row gap-[20px]'>
                    <button 
                        className={STYLES.ACTION_BUTTON} 
                        onClick={()=>{
                            handleMealSelect('')
                            handleMealModalOpen()
                        }}
                    >
                        Add Meal
                    </button>
                    <button 
                        className={STYLES.ACTION_BUTTON} 
                        onClick={()=>{
                            handleHydrationSelect('')
                            handleHydrationModalOpen()
                        }}
                    >
                        Add Hydration
                    </button>
                    </div>
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
                    {mealSorted.map((meal: GroupedMealsArray)=>{
                        const hydration = hydrations.filter(hydra => hydra.date ===meal.date);

                        return (
                            <MealCard 
                                key={meal.date}
                                meal={meal}
                                hydrations={hydration}
                                handleHydrationSelect={handleHydrationSelect}
                                handleMealSelect={handleMealSelect}
                                handleModalOpen={handleMealModalOpen}
                                handleHydrationModalOpen={handleHydrationModalOpen}
                                setSelectedMeal={setSelectedMeal}
                                setOpenDetail={setOpenMealDetail}
                            />
                        )
                    })}
                </div>
            </div>
        </>
    )

}


export default MealList