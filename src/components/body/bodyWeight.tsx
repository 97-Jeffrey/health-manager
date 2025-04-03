

import * as STYLES from '../../constants/styles'
import BarChart from '../../elements/chart/barChart';


const BodyWeight: React.FC = () => {
    return (
        <>
           <div className='w-100 bg-white p-3 rounded-lg flex flex-col gap-3'>
              <div className='flex flex-row justify-between items-center w-100'>
                    <div className='font-bold text-[30px]'>Body Weights</div> 
                    <button 
                        className={STYLES.ACTION_BUTTON} 
                        onClick={()=>{
                        
                        }}
                    >
                        Create
                    </button>
                </div>
                <BarChart />
           </div>
        </>
    )

}


export default BodyWeight;