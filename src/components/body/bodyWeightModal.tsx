import ToggleModal from "../../elements/modal/modal"
import { BodyWeightInterface } from "../../types/bodyWeight"
import * as STYLES from '../../constants/styles'
import * as BODY from '../../constants/body'
import DropDown from "../../elements/dropdown/dropdown"

interface BodyWeightModalInterface {
    open: boolean,
    isEdit: boolean,
    toDelete: boolean,
    handleClose: ()=> void,
    bodyWeight: BodyWeightInterface,
    handleFieldChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>void,
    handleDropdownFieldChange: (name: string, value: string| null)=> void,
    asyncAction: (e: React.FormEvent) => Promise<void>,
    asyncDeleteAction?: (e: React.FormEvent) => Promise<void>,
}

const BodyWeightModal : React.FC<BodyWeightModalInterface>= ({ 
    open,
    isEdit,
    toDelete,
    handleClose,
    bodyWeight,
    handleFieldChange,
    handleDropdownFieldChange,
    asyncAction,
    asyncDeleteAction


})=>{


    return (
        <>
            <ToggleModal
                title={`${isEdit? 'Update': 'Create'} A Body Weight`}
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
                            value={bodyWeight.date}
                            name='date'
                            onBlur={()=>{}}
                            onChange={handleFieldChange}
                            className={STYLES.RECIPE_INPUT}
                        />
                    </div>
        
                    <div className='flex flex-col gap-2 '>
                        <label className="block text-sm font-medium text-gray-700">Weight</label>
                        <input
                            value={bodyWeight.weight}
                            name='weight'
                            placeholder='Your Actual Weight'
                            onBlur={()=>{}}
                            onChange={handleFieldChange}
                            className={STYLES.RECIPE_INPUT}
                        />
                    </div>

                    <div className='flex flex-col gap-2 '>
                        <label className="block text-sm font-medium text-gray-700">Unit</label>
                        <DropDown 
                            data={BODY.Weight_Units}
                            name={'unit'}
                            value={bodyWeight.unit}
                            onChange={handleDropdownFieldChange}
                            
                        />
                    </div>
                </div>
            </ToggleModal>
        
        </>
    )

}

export default BodyWeightModal