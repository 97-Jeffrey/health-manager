import ToggleModal from "../../elements/modal/modal"
import * as STYLES from '../../constants/styles'
import { SleepInterface } from "../../types/sleep"
import SleepProgress from "../../elements/progressBar/SleepProgressBar"


interface SleepModalInterface {
    open: boolean,
    isEdit: boolean,
    toDelete: boolean,
    sleep: SleepInterface,
    handleClose: ()=> void,
    handleSleepQualityChange: (name: string, quality: number)=> void,
    handleDropdownFieldChange: (name: string, value: string| null)=> void,
    handleFieldChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>void,
    asyncAction: (e: React.FormEvent) => Promise<void>,
    asyncDeleteAction?: (e: React.FormEvent) => Promise<void>,
}

const SleepModal: React.FC<SleepModalInterface> = ({
    open,
    isEdit,
    toDelete,
    sleep,
    handleClose,
    handleFieldChange,
    handleSleepQualityChange,
    asyncAction,
    asyncDeleteAction
}) =>{
    return (
        <>
            <ToggleModal
                title={`${isEdit? 'Update The': 'Add A'} Sleep Entry`}
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
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                            type='date'
                            value={sleep.date}
                            name='date'
                            onBlur={()=>{}}
                            onChange={handleFieldChange}
                            className={STYLES.RECIPE_INPUT}
                        />
                    </div>

                    <div className='flex flex-col gap-2 '>
                        <label className="block text-sm font-medium text-gray-700">Bed Time</label>
                        <input
                            type='time'
                            value={sleep.startTime}
                            name='startTime'
                            onBlur={()=>{}}
                            onChange={handleFieldChange}
                            className={STYLES.RECIPE_INPUT}
                        />
                    </div>

                    <div className='flex flex-col gap-2 '>
                        <label className="block text-sm font-medium text-gray-700">Wake Up Time</label>
                        <input
                            type='time'
                            value={sleep.endTime}
                            name='endTime'
                            onBlur={()=>{}}
                            onChange={handleFieldChange}
                            className={STYLES.RECIPE_INPUT}
                        />
                    </div>

                    <div className='flex flex-col gap-2 '>
                        <label className="block text-sm font-medium text-gray-700">Rate your sleep quality level from a scale of 1 to 10:
                        </label>
                        <SleepProgress 
                            name='quality'
                            value={sleep.quality}
                            onChange={handleSleepQualityChange}
                        />
                    </div>

                     <div className='flex flex-col gap-2 '>
                        <label className="block text-sm font-medium text-gray-700">Note</label>
                        <textarea
                            value={sleep.note}
                            name='note'
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

export default SleepModal