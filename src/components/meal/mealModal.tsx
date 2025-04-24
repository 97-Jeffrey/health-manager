import ToggleModal from "../../elements/modal/modal"
import * as STYLES from '../../constants/styles'
import { MealInterface } from "../../types/recipe"

interface MealModalInterface {
    open: boolean,
    isEdit: boolean,
    toDelete: boolean,
    handleClose: ()=> void,
    meal: MealInterface,
    handleFieldChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>void,
    handleUploadImage: (e:React.ChangeEvent<HTMLInputElement>) => void,
    asyncAction: (e: React.FormEvent) => Promise<void>,
    asyncDeleteAction?: (e: React.FormEvent) => Promise<void>,
}

const MealModal : React.FC<MealModalInterface>= ({ 
    open,
    isEdit,
    toDelete,
    handleClose,
    meal,
    handleFieldChange,
    handleUploadImage,
    asyncAction,
    asyncDeleteAction


})=>{


    return (
        <>
            <ToggleModal
                title={`${isEdit? `Update "${meal.name}"`: 'Create A Meal'}`}
                open={open}
                toDelete={toDelete}
                handleClose={handleClose}
                updateActionText={isEdit? 'Update':'Create'}
                deleteActionText={'Delete'}
                asyncAction={asyncAction}
                asyncDeleteAction={asyncDeleteAction}
            > 
                <div className='flex flex-col gap-3'>

                    <div className='flex flex-col gap-2 '>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <textarea
                            value={meal.name}
                            name='name'
                            onBlur={()=>{}}
                            onChange={handleFieldChange}
                            className={STYLES.RECIPE_INPUT}
                        />
                    </div>
                    
                    <div className='flex flex-col gap-2 '>
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                            type='date'
                            value={meal.date}
                            name='date'
                            onBlur={()=>{}}
                            onChange={handleFieldChange}
                            className={STYLES.RECIPE_INPUT}
                        />
                    </div>
        
                    <div className='flex flex-col gap-2 '>
                        <label className="block text-sm font-medium text-gray-700">Start Time</label>
                        <input
                            type='time'
                            value={meal.startTime}
                            name='startTime'
                            placeholder='when you start eating'
                            onBlur={()=>{}}
                            onChange={handleFieldChange}
                            className={STYLES.RECIPE_INPUT}
                        />
                    </div>

                    <div className='flex flex-col gap-2 '>
                        <label className="block text-sm font-medium text-gray-700">End Time</label>
                        <input
                            type='time'
                            value={meal.endTime}
                            name='endTime'
                            placeholder='When you finish your meal'
                            onBlur={()=>{}}
                            onChange={handleFieldChange}
                            className={STYLES.RECIPE_INPUT}
                        />
                    </div>

                    <div className='flex flex-col gap-2 '>
                        <label className="block text-sm font-medium text-gray-700">Note</label>
                        <textarea
                            value={meal.note}
                            name='note'
                            onBlur={()=>{}}
                            onChange={handleFieldChange}
                            className={STYLES.RECIPE_INPUT}
                        />
                    </div>

                    <div className='flex flex-col gap-2 '>
                        <input
                            type="file"
                            id="bootstrap-file-upload"
                            onChange={handleUploadImage}
                            className="d-none"
                        />
                    
                        <label
                            htmlFor="bootstrap-file-upload"
                            className="btn btn-secondary"
                        >
                            {meal.image? 'Change Image': 'Upload Image'}
                        </label>
                        {
                            meal.image   
                                &&
                            <img 
                                src={meal.image} 
                                alt="Meal Image" 
                                className="w-100 rounded-[20px] object-cover"
                            />
                        }
                    </div>

                </div>
            </ToggleModal>
        
        </>
    )

}

export default MealModal