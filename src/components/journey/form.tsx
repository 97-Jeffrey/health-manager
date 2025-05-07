import { JourneyInterface } from "../../types/journey"
import * as STYLES from '../../constants/styles'
import * as COLORS from '../../constants/color'
import { useState } from "react"
import Tag from "../../elements/tag/tag"

interface HealthJourneyFormInterface {
  loading: boolean,
  isEdit: boolean,
  handleJourneyUpdate: (e: React.FormEvent) => Promise<void>,
  handleJourneyCreate: (e: React.FormEvent) => Promise<void>,
  handleJourneyRemove: (e: React.FormEvent) => Promise<void>,
  handleFieldChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>void,
  handleTagAdd: (tag: string)=> void,
  handleTagRemove: (index:number)=> void,
  journey: JourneyInterface,

}

const HealthJourneyForm: React.FC<HealthJourneyFormInterface> = ({
    loading,
    isEdit, 
    journey,
    handleFieldChange,
    handleJourneyUpdate, 
    handleJourneyCreate,
    handleJourneyRemove,
    handleTagRemove,
    handleTagAdd

}) =>{

    const [tag, setTag] = useState<string>('')
    return (
        <>
             <form className='mt-3 flex flex-col gap-3 p-[20px]' 
                onSubmit={isEdit? handleJourneyUpdate:handleJourneyCreate}
              >

                <div className='font-bold text-[25px]'>{isEdit? `Edit "${journey.name}"`:'Add An Event'}</div>
                <div className='flex flex-col gap-2 '>
                  <label className="block text-sm font-medium text-gray-700">Journey Name</label>
                  <input
                      type="name"
                      value={journey.name}
                      name='name'
                      placeholder='phrase 1'
                      onBlur={()=>{}}
                      onChange={handleFieldChange}
                      className={STYLES.RECIPE_INPUT}
                  />
                </div>

                <div className='flex flex-col gap-2 '>
                  <label className="block text-sm font-medium text-gray-700">Journey Description</label>
                  <textarea
                      value={journey.description}
                      name='description'
                      placeholder='it all starts with...'
                      onBlur={()=>{}}
                      onChange={handleFieldChange}
                      className={STYLES.RECIPE_INPUT}
                  />
                </div>

                <div className='flex flex-col gap-2 '>
                  <label className="block text-sm font-medium text-gray-700">Journey Date</label>
                  <input
                      type='date'
                      value={journey.date}
                      name='date'
                      onBlur={()=>{}}
                      onChange={handleFieldChange}
                      className={STYLES.RECIPE_INPUT}
                  />
                </div>

                <div className='flex flex-col gap-2 '>
                  <label className="block text-sm font-medium text-gray-700">Journey Tag</label>
                  <input
                      value={tag}
                      name='tag'
                      placeholder='ex: reborn'
                      onBlur={()=>{}}
                      onChange={e=> setTag(e.target.value)}
                      className={STYLES.RECIPE_INPUT}
                  />
                  {
                        journey.tags.length>0
                        &&
                        <div className='flex flex-row flex-wrap gap-3'>
                            {journey.tags.map((tag, index)=>(
                                <Tag 
                                   key={index}
                                   text={tag}
                                   toDelete={true}
                                   onDelete={()=>handleTagRemove(index)}
                                />
                            ))}

                        </div>
                    }
                  <button 
                    className={STYLES.ACTION_BUTTON}
                    disabled={!tag}
                    onClick={(e)=>{
                      e.preventDefault()
                      handleTagAdd(tag)
                      setTag('')
                  }}
                  >
                    Add Tag
                  </button>
                </div>

                <div className="mt-8 flex justify-end space-x-4">    


                    { isEdit 
                      &&
                      <button
                          className={
                          `px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${COLORS.REMOVE_BG_COLOR} hover:bg-red-700`}
                          disabled={loading}
                          onClick={handleJourneyRemove}
                      >
                        {loading ? 'Removing': "Remove"}
                      </button> 
                    }          
                                        
                    <button
                        type="submit"
                        className={
                        `px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-action-create hover:bg-blue-700`}
                        disabled={loading}
                    >
                        {
                        isEdit?  
                        (loading ? "Updating":'Update'):
                        (loading ? 'Creating...':'Create')}
                    </button>
                
                </div>
                  
              </form>
        </>
    )
}

export default HealthJourneyForm