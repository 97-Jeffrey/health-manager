import Success from '../elements/banner/success';
import { useJourney } from '../hooks/useJourney';

import JourneyVertcialTimeLine from '../elements/timeline/JourneyTimeLine';
import HealthJourneyForm from '../components/journey/form';

const HealthMetrics: React.FC= () => {

  const {
    isEdit,
    loading,
    success,
    journey, 
    journeys,
    setSuccess,
    handleFieldChange, 
    handleJourneyCreate,
    handleJourneyUpdate,
    handleJourneyRemove,
    handleTagAdd,
    handleTagRemove,
    handleJourneySelect
   } = useJourney()

  return (
    <>
      {
        success
           &&
        <Success
          text={`Journey ${isEdit? 'Updated':'Created'} Successfully`}
          onClose={()=>setSuccess(false)}
        />

      }
      <div className='flex flex-col justify-center items-center gap-5'>

          <div className='flex flex-row justify-start items-center w-100'>
            <div className='font-bold text-[30px]'>Wellness Journey ⛰️</div> 
          </div>

          <div className="flex flex-row justify-center items-start gap-2 w-100">
            <div className='flex-1 rounded-lg border border-grey w-[40%] min-h-[680px] bg-white' >

              <HealthJourneyForm 
                 loading={loading}
                 isEdit={isEdit}
                 journey={journey}
                 handleFieldChange={handleFieldChange}
                 handleJourneyUpdate={handleJourneyUpdate}
                 handleJourneyCreate={handleJourneyCreate}
                 handleJourneyRemove={handleJourneyRemove}
                 handleTagRemove={handleTagRemove}
                 handleTagAdd={handleTagAdd}
              />


            </div>


            <div className='flex-1 rounded-lg border border-grey w-[60%] h-[680px] bg-white overflow-y-scroll'>
              <JourneyVertcialTimeLine
                journeys={journeys} 
                handleOpen={handleJourneySelect}
              />
            </div>

          </div>

      </div>
    </>
  );
};

export default HealthMetrics;
