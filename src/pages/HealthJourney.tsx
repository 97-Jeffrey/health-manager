import * as STYLES from '../constants/styles'

const HealthMetrics = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-5'>

        <div className='flex flex-row justify-start items-center w-100'>
          <div className='font-bold text-[30px]'>Wellness Journey ⛰️</div> 
        </div>

        <div className="flex flex-row justify-center items-start gap-2 w-100">
          <div className='rounded-lg border border-grey w-[55%] min-h-[500px] bg-white' >

            <form className='mt-3 flex flex-col gap-3 p-[20px]' onSubmit={()=>{}}>

              <div className='font-bold text-[25px]'>Add A Event</div>
              <div className='flex flex-col gap-2 '>
                <label className="block text-sm font-medium text-gray-700">Event Name</label>
                <input
                    type="name"
                    value={""}
                    name='name'
                    placeholder='phrase 1'
                    onBlur={()=>{}}
                    onChange={()=>{}}
                    className={STYLES.RECIPE_INPUT}
                />
              </div>

              <div className='flex flex-col gap-2 '>
                <label className="block text-sm font-medium text-gray-700">Event Description</label>
                <textarea
                    value={""}
                    name='name'
                    placeholder='it all starts with...'
                    onBlur={()=>{}}
                    onChange={()=>{}}
                    className={STYLES.RECIPE_INPUT}
                />
              </div>

              <div className='flex flex-col gap-2 '>
                <label className="block text-sm font-medium text-gray-700">Event Date</label>
                <input
                    type='date'
                    value={""}
                    name='name'
                    onBlur={()=>{}}
                    onChange={()=>{}}
                    className={STYLES.RECIPE_INPUT}
                />
              </div>

              <div className='flex flex-col gap-2 '>
                <label className="block text-sm font-medium text-gray-700">Event Tag</label>
                <input
                    value={""}
                    name='name'
                    placeholder='reborn'
                    onBlur={()=>{}}
                    onChange={()=>{}}
                    className={STYLES.RECIPE_INPUT}
                />
              </div>
                
            </form>


          </div>
          <div className='rounded-lg border border-grey w-[45%] h-[500px] bg-white'></div>

        </div>

    </div>
  );
};

export default HealthMetrics;
