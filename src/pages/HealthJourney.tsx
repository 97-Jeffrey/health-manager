import { useState } from 'react';
import * as STYLES from '../constants/styles'
import * as COLORS from '../constants/color'
import Success from '../elements/banner/success';
import { useJourney } from '../hooks/useJourney';
import Tag from '../elements/tag/tag';
import JourneyVertcialTimeLine from '../elements/timeline/JourneyTimeLine';

const HealthMetrics: React.FC= () => {

  const {
    loading,
    success,
    journey, 
    journeys,
    setSuccess,
    handleFieldChange, 
    handleJourneyCreate,
    handleTagAdd,
    handleTagRemove
   } = useJourney()

  const {
    name,
    description,
    date,
    tags
  }= journey;

  const [tag, setTag] = useState<string>('')

  return (
    <>
      {
        success
           &&
        <Success
          text='Journey Created Successfully'
          onClose={()=>setSuccess(false)}
        />

      }
      <div className='flex flex-col justify-center items-center gap-5'>

          <div className='flex flex-row justify-start items-center w-100'>
            <div className='font-bold text-[30px]'>Wellness Journey ⛰️</div> 
          </div>

          <div className="flex flex-row justify-center items-start gap-2 w-100">
            <div className='rounded-lg border border-grey w-[40%] min-h-[600px] bg-white' >

              <form className='mt-3 flex flex-col gap-3 p-[20px]' onSubmit={handleJourneyCreate}>

                <div className='font-bold text-[25px]'>Add A Event</div>
                <div className='flex flex-col gap-2 '>
                  <label className="block text-sm font-medium text-gray-700">Event Name</label>
                  <input
                      type="name"
                      value={name}
                      name='name'
                      placeholder='phrase 1'
                      onBlur={()=>{}}
                      onChange={handleFieldChange}
                      className={STYLES.RECIPE_INPUT}
                  />
                </div>

                <div className='flex flex-col gap-2 '>
                  <label className="block text-sm font-medium text-gray-700">Event Description</label>
                  <textarea
                      value={description}
                      name='description'
                      placeholder='it all starts with...'
                      onBlur={()=>{}}
                      onChange={handleFieldChange}
                      className={STYLES.RECIPE_INPUT}
                  />
                </div>

                <div className='flex flex-col gap-2 '>
                  <label className="block text-sm font-medium text-gray-700">Event Date</label>
                  <input
                      type='date'
                      value={date}
                      name='date'
                      onBlur={()=>{}}
                      onChange={handleFieldChange}
                      className={STYLES.RECIPE_INPUT}
                  />
                </div>

                <div className='flex flex-col gap-2 '>
                  <label className="block text-sm font-medium text-gray-700">Event Tag</label>
                  <input
                      value={tag}
                      name='tag'
                      placeholder='reborn'
                      onBlur={()=>{}}
                      onChange={e=> setTag(e.target.value)}
                      className={STYLES.RECIPE_INPUT}
                  />
                  {
                        tags.length>0
                        &&
                        <div className='flex flex-row flex-wrap gap-3'>
                            {tags.map((tag, index)=>(
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
                                        
                    <button
                        type="submit"
                        className={
                        `px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${COLORS.ACTIONS_BG_COLOR} hover:bg-blue-700`}
                        disabled={loading}
                    >
                        {loading ? 'Creating...':'Create'}
                    </button>
                
                </div>
                  
              </form>


            </div>


            <div className='rounded-lg border border-grey w-[60%] h-[680px] bg-white overflow-y-scroll'>
              <JourneyVertcialTimeLine
                 journeys={journeys} 
              />
            </div>

          </div>

      </div>
    </>
  );
};

export default HealthMetrics;
