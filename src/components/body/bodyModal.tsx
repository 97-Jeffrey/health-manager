import ToggleModal from "../../elements/modal/modal"
import * as BODY from '../../constants/body'
import * as STYLES from '../../constants/styles'
import Dropdown from "../../elements/dropdown/dropdown"
import Progress from "../../elements/progressBar/progressBar"

import { BodySymptomInterface } from "../../types/bodySymptom"
import CheckBox from "../../elements/form/checkBox"


interface BodyModalInterface {
    open: boolean,
    isEdit: boolean,
    toDelete: boolean,
    handleClose: ()=> void,
    bodySymptom: BodySymptomInterface,
    handleFieldChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>void,
    handleRatingChange: (rating: number)=> void,
    handleResolvedStatus: (e: React.ChangeEvent<HTMLInputElement>)=> void,
    handleDropdownFieldChange: (name: string, value: string| null)=> void
    asyncAction: (e: React.FormEvent) => Promise<void>,
    asyncDeleteAction?: (e: React.FormEvent) => Promise<void>,

}

const BodyModal : React.FC<BodyModalInterface>= ({ 
    open,
    isEdit,
    toDelete,
    bodySymptom,
    handleClose,
    handleFieldChange,
    handleRatingChange,
    handleResolvedStatus,
    handleDropdownFieldChange,
    asyncAction,
    asyncDeleteAction

}) =>{


    return (
        <>
            <ToggleModal 
                title={`${isEdit? 'Update': 'Create'} A Body Symptom`}
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
                        <label className="block text-sm font-medium text-gray-700">Face or Body</label>
                        <Dropdown 
                            data={BODY.MainPart}
                            name={'mainPart'}
                            value={bodySymptom.mainPart}
                            onChange={handleDropdownFieldChange}
                            
                        />
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <label className="block text-sm font-medium text-gray-700">Select the area on your body you wish to report an issue for:</label>
                        <Dropdown 
                            data={BODY.BodyArea}
                            name={'area'}
                            value={bodySymptom.area}
                            onChange={handleDropdownFieldChange}
                        />
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <label className="block text-sm font-medium text-gray-700">What is the issue you face on this section of your body
                        </label>
                        <Dropdown 
                            data={BODY.Issues}
                            name={'symptom'}
                            value={bodySymptom.symptom}
                            onChange={handleDropdownFieldChange}
                        />
                    </div>

                    <div className='flex flex-col gap-2 '>
                        
                        <CheckBox
                           text={'Is the Symptom Resolved?'}
                           status={bodySymptom.isResolved}
                           onChange={handleResolvedStatus}

                        />
                    </div>
        
                    <div className='flex flex-col gap-2 '>
                        <label className="block text-sm font-medium text-gray-700">Rate the severity of the issue from a scale of 1 to 10:
                        </label>
                        <Progress 
                           value={bodySymptom.rating}
                           onChange={handleRatingChange}
                        />
                    </div>

                    <div className='flex flex-col gap-2 '>
                        <label className="block text-sm font-medium text-gray-700">Event Date</label>
                        <input
                            type='date'
                            value={bodySymptom.date}
                            name='date'
                            onBlur={()=>{}}
                            onChange={handleFieldChange}
                            className={STYLES.RECIPE_INPUT}
                        />
                    </div>
        
                    <div className='flex flex-col gap-2 '>
                        <label className="block text-sm font-medium text-gray-700">Optional: Add a note to provide some context for this entry</label>
                        <textarea
                            value={bodySymptom.description}
                            name='description'
                            placeholder='Reflext in detail about this symptom'
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

export default BodyModal