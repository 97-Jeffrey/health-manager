import ToggleModal from "../../elements/modal/modal"
import * as STYLES from '../../constants/styles'
import { meditationInterface, mindInterface } from "../../types/mindInterface"
import MindProgress from "../../elements/progressBar/MindProgressBar"


interface MindModalInterface {
    open: boolean,
    isEdit: boolean,
    toDelete: boolean,
    mind: mindInterface,
    handleClose: ()=> void,
    handleFieldChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>void,
    handleMindValueChange: (name: string, rating: number)=> void,
    asyncAction: (e: React.FormEvent) => Promise<void>,
    asyncDeleteAction?: (e: React.FormEvent) => Promise<void>,

}

const MindModal : React.FC<MindModalInterface>= ({ 
    open,
    isEdit,
    toDelete,
    mind,
    handleClose,
    handleFieldChange,
    handleMindValueChange,
    asyncAction,
    asyncDeleteAction

}) =>{


    return (
        <>
            <ToggleModal 
                title={`${isEdit? 'Update': 'Create'} Meditation`}
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
                            value={mind.date}
                            name='date'
                            onBlur={()=>{}}
                            onChange={handleFieldChange}
                            className={STYLES.RECIPE_INPUT}
                        />
                    </div>

                    <div className='flex flex-col gap-2 '>
                        <label className="block text-sm font-medium text-gray-700">Rate the severity of the issue from a scale of 1 to 10:
                        </label>
                        <MindProgress 
                           name='calm'
                           value={(mind.data as meditationInterface).calm}
                           onChange={handleMindValueChange}
                        />
                    </div>

                    <div className='flex flex-col gap-2 '>
                        <label className="block text-sm font-medium text-gray-700">Rate the severity of the issue from a scale of 1 to 10:
                        </label>
                        <MindProgress 
                           name='relaxed'
                           value={(mind.data as meditationInterface).relaxed}
                           onChange={handleMindValueChange}
                        />
                    </div>

                    <div className='flex flex-col gap-2 '>
                        <label className="block text-sm font-medium text-gray-700">Rate the severity of the issue from a scale of 1 to 10:
                        </label>
                        <MindProgress 
                           name='energized'
                           value={(mind.data as meditationInterface).energized}
                           onChange={handleMindValueChange}
                        />
                    </div>
        
                    <div className='flex flex-col gap-2 '>
                        <label className="block text-sm font-medium text-gray-700">Optional: Add a note to provide some context for this entry</label>
                        <textarea
                            value={mind.note}
                            name='note'
                            placeholder='Reflext in detail about this mind info'
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

export default MindModal