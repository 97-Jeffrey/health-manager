import ToggleModal from "../../elements/modal/modal"
import * as BODY from '../../constants/body'
import * as STYLES from '../../constants/styles'
import Dropdown from "../../elements/dropdown/dropdown"
import Progress from "../../elements/progressBar/progressBar"

interface BodyModalInterface {
    open: boolean,
    handleClose: ()=> void

}

const BodyModal : React.FC<BodyModalInterface>= ({ open, handleClose }) =>{
    return (
        <>
            <ToggleModal 
                    title={'Update A Body Symptom'}
                    open={open}
                    handleClose={handleClose}
                    updateActionText={'Update'}
                 >
                   <div className='flex flex-col gap-3'>
                    <div className='flex flex-col gap-2 '>
                       <label className="block text-sm font-medium text-gray-700">Face or Body</label>
                       <Dropdown data={BODY.MainPart}/>
                     </div>
                     <div className='flex flex-col gap-2 '>
                       <label className="block text-sm font-medium text-gray-700">Select the area on your body you wish to report an issue for:
                       </label>
                       <Dropdown data={BODY.BodyArea}/>
                     </div>
                     <div className='flex flex-col gap-2 '>
                       <label className="block text-sm font-medium text-gray-700">What is the issue you face on this section of your body
                       </label>
                       <Dropdown data={BODY.Issues}/>
                     </div>
           
                     <div className='flex flex-col gap-2 '>
                       <label className="block text-sm font-medium text-gray-700">Rate the severity of the issue from a scale of 1 to 10:
                       </label>
                       <Progress />
                     </div>
           
                     <div className='flex flex-col gap-2 '>
                         <label className="block text-sm font-medium text-gray-700">Optional: Add a note to provide some context for this entry</label>
                         <textarea
                             value={''}
                             name='description'
                             placeholder='Reflext in detail about this symptom'
                             onBlur={()=>{}}
                             onChange={()=>{}}
                             className={STYLES.RECIPE_INPUT}
                         />
                       </div>
                    </div>
                 </ToggleModal>
        </>
    )
}

export default BodyModal