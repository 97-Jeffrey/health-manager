import { MealInterface } from "../../types/recipe"
import * as STYLES from '../../constants/styles'
import MealModal from "./mealModal"
import { useState } from "react"
import { useMeal } from "../../hooks/useMeal"
import Success from "../../elements/banner/success"
import Info from "../../elements/info/info"
import LoadingSpinner from "../../elements/loading/loadingSpinner"



interface MealListInterface {
    meals: MealInterface[],
}


const MealList: React.FC<MealListInterface> = ({ meals }) =>{

    const [ open, setOpen] = useState<boolean>(false)

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
            setSuccess,
            meal,
            handleFieldsChange,
            handleMealCreate,
            handleMealUpdate,
            handleMealRemove,
        } = useMeal();
    
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
            </div>
        </>
    )

}


export default MealList