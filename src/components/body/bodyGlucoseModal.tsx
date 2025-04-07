import ToggleModal from "../../elements/modal/modal"
import * as STYLES from '../../constants/styles'
import { BodyGlucoseInterface } from "../../types/bodyGlucose"

interface BodyGlucoseModalInterface {
    open: boolean,
    isEdit: boolean,
    toDelete: boolean,
    handleClose: ()=> void,
    bodyGlucose: BodyGlucoseInterface,
    handleFieldChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>void,
    asyncAction: (e: React.FormEvent) => Promise<void>,
    asyncDeleteAction?: (e: React.FormEvent) => Promise<void>,
}

const BodyGlucoseModal : React.FC<BodyGlucoseModalInterface>= ({ 
    open,
    isEdit,
    toDelete,
    handleClose,
    bodyGlucose,
    handleFieldChange,
    asyncAction,
    asyncDeleteAction


})=>{


    return (
        <>
            <ToggleModal
                title={`${isEdit? 'Update': 'Create'} A Body Glucose`}
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
                        <label className="block text-sm font-medium text-gray-700">Event Date</label>
                        <input
                            type='date'
                            value={bodyGlucose.date}
                            name='date'
                            onBlur={()=>{}}
                            onChange={handleFieldChange}
                            className={STYLES.RECIPE_INPUT}
                        />
                    </div>
        
                    <div className='flex flex-col gap-2 '>
                        <label className="block text-sm font-medium text-gray-700">Glucose (mg/dL)</label>
                        <input
                            value={bodyGlucose.glucose}
                            name='glucose'
                            placeholder='Your Measured Glucose Level'
                            onBlur={()=>{}}
                            onChange={handleFieldChange}
                            className={STYLES.RECIPE_INPUT}
                        />
                    </div>

                </div>
            </ToggleModal>
        
        </>
    )

}

export default BodyGlucoseModal