import ToggleModal from "../../elements/modal/modal"
import { SportInterface } from "../../types/sport"
import * as STYLES from '../../constants/styles'
import * as SPORTS from '../../constants/sport'
import Dropdown from "../../elements/dropdown/dropdown"


interface SportModalInterface {
    open: boolean,
    isEdit: boolean,
    toDelete: boolean,
    sport: SportInterface,
    handleClose: ()=> void,
    handleDropdownFieldChange: (name: string, value: string| null)=> void,
    handleFieldChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>void,
    asyncAction: (e: React.FormEvent) => Promise<void>,
    asyncDeleteAction?: (e: React.FormEvent) => Promise<void>,
}

const SportModal: React.FC<SportModalInterface> = ({
    open,
    isEdit,
    toDelete,
    sport,
    handleClose,
    handleFieldChange,
    handleDropdownFieldChange,
    asyncAction,
    asyncDeleteAction
}) =>{
    return (
        <>
            <ToggleModal
                title={`${isEdit? 'Update The': 'Add A'} Sport`}
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
                        <label className="block text-sm font-medium text-gray-700">Select the Sport Type</label>
                        <Dropdown
                            data={SPORTS.sport}
                            name={'name'}
                            value={sport.name}
                            onChange={handleDropdownFieldChange}
                        />
                    </div>
                    
                    <div className='flex flex-col gap-2 '>
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                            type='date'
                            value={sport.date}
                            name='date'
                            onBlur={()=>{}}
                            onChange={handleFieldChange}
                            className={STYLES.RECIPE_INPUT}
                        />
                    </div>

                    <div className='flex flex-col gap-2 '>
                        <label className="block text-sm font-medium text-gray-700">Calories</label>
                        <input
                            type='number'
                            min={0}
                            value={sport.calories}
                            name='calories'
                            onBlur={()=>{}}
                            onChange={handleFieldChange}
                            className={STYLES.RECIPE_INPUT}
                        />
                    </div>

                    <div className='flex flex-col gap-2 '>
                        <label className="block text-sm font-medium text-gray-700">Start Time</label>
                        <input
                            type='time'
                            value={sport.startTime}
                            name='startTime'
                            onBlur={()=>{}}
                            onChange={handleFieldChange}
                            className={STYLES.RECIPE_INPUT}
                        />
                    </div>

                    <div className='flex flex-col gap-2 '>
                        <label className="block text-sm font-medium text-gray-700">End Time</label>
                        <input
                            type='time'
                            value={sport.endTime}
                            name='endTime'
                            onBlur={()=>{}}
                            onChange={handleFieldChange}
                            className={STYLES.RECIPE_INPUT}
                        />
                    </div>

                    <div className='flex flex-col gap-2 '>
                        <label className="block text-sm font-medium text-gray-700">Intensity</label>
                        <Dropdown
                            data={SPORTS.intensity}
                            name={'intensity'}
                            value={sport.intensity}
                            onChange={handleDropdownFieldChange}
                        />
                    </div>
        
                  

                </div>
            </ToggleModal>
        </>
    )
}

export default SportModal