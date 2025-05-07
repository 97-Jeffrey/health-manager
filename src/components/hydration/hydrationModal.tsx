import ToggleModal from "../../elements/modal/modal"
import * as STYLES from '../../constants/styles'
import { HydrationInterface } from "../../types/recipe"

interface HydrationModalInterface {
    open: boolean,
    isEdit: boolean,
    toDelete: boolean,
    hydration: HydrationInterface,
    handleClose: ()=> void,
    handleFieldChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>void,
    asyncAction: (e: React.FormEvent) => Promise<void>,
    asyncDeleteAction?: (e: React.FormEvent) => Promise<void>,
}

const HydrationModal : React.FC<HydrationModalInterface>= ({ 
    open,
    isEdit,
    toDelete,
    hydration,
    handleClose,
    handleFieldChange,
    asyncAction,
    asyncDeleteAction


})=>{


    return (
        <>
            <ToggleModal
                title={`${isEdit? `Update Hydration`: 'Add A Hydration'}`}
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
                        <label className="block text-sm font-medium text-gray-700">Type</label>
                        <input
                            value={hydration.type}
                            name='type'
                            onBlur={()=>{}}
                            onChange={handleFieldChange}
                            className={STYLES.RECIPE_INPUT}
                        />
                    </div>
                    
                    <div className='flex flex-col gap-2 '>
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                            type='date'
                            value={hydration.date}
                            name='date'
                            onBlur={()=>{}}
                            onChange={handleFieldChange}
                            className={STYLES.RECIPE_INPUT}
                        />
                    </div>
        
                    <div className='flex flex-col gap-2 '>
                        <label className="block text-sm font-medium text-gray-700"> Time</label>
                        <input
                            type='time'
                            value={hydration.time}
                            name='time'
                            placeholder='Time to hydrate'
                            onBlur={()=>{}}
                            onChange={handleFieldChange}
                            className={STYLES.RECIPE_INPUT}
                        />
                    </div>

                    <div className='flex flex-col gap-2 '>
                        <label className="block text-sm font-medium text-gray-700">Volume</label>
                        <input
                            type='number'
                            value={hydration.volume}
                            min={0}
                            name='volume'
                            placeholder='How much you drink (in ml)'
                            onBlur={()=>{}}
                            onChange={handleFieldChange}
                            className={STYLES.RECIPE_INPUT}
                        />
                    </div>

                    <div className='flex flex-col gap-2 '>
                        <label className="block text-sm font-medium text-gray-700">Note</label>
                        <textarea
                            value={hydration.note}
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

export default HydrationModal