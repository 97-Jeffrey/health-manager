
import { Modal } from 'react-bootstrap';
import { GroupedMealsArray } from '../../lib/util/meal';
import { convertTo12HourFormat, formatDate } from '../../lib/util/date';
import MealDetailEntry from './mealDetailEntry';
import SectionSelector from '../../elements/tab/SectionSelector';
import { IoIosClose } from "react-icons/io";
import { HydrationInterface } from '../../types/recipe';
import { useState } from 'react';
import { capitalizeFirstChar } from '../../lib/util/string';

interface MealDetailModalInterface {
    meals: GroupedMealsArray,
    open: boolean,
    setOpen: (state: boolean)=> void,
    hydrations: HydrationInterface[]
}

const MealDetailModal: React.FC<MealDetailModalInterface> = ({ meals, hydrations, open, setOpen }) =>{

    const sections = ['Meal', 'Hydration'];
    const [selectedSection, setSelectedSection] = useState('Meal');

    return (
        <>
           <Modal
                show={open}
                onHide={() => setOpen(false)}
                size="lg"  // This makes the modal large
                aria-labelledby="contained-modal-title-vcenter"
                centered 
            >
                <Modal.Body>
                    <SectionSelector 
                       sections={sections}
                       selectedSection={selectedSection}
                       setSelectedSection={setSelectedSection}
                    />
                    <div className='flex flex-row justify-between items-center'>
                        <h4 className='font-bold'>{selectedSection} Details At {formatDate(meals.date)}</h4>
                        <IoIosClose  
                            className='text-[30px] cursor-pointer'
                            onClick={()=>setOpen(false)}
                        />
                    </div>
                    {
                    selectedSection === 'Meal'?

                    <div className={`mt-[30px] w-100 flex flex-col justify-center items-center gap-[15px]`}>
                        <div 
                            className={' rounded-[10px] p-[15px] w-100 flex flex-row justify-between items-center gap-[15px]'}
                        >
                            <div className='font-bold w-[150px]'>Name </div>
                            <div className='font-bold w-[100px]'>Period </div> 
                            <div className='font-bold w-[200px]'> Note</div>
                            <div className='font-bold w-[150px]'> Image</div>

                        </div>
                        {meals.data.map(meal=> (
                            <MealDetailEntry 
                                key={meal.id} 
                                meal={meal}
                            />
                        ))}


                    </div>
                        :

                    <div className={`mt-[30px] w-100 flex flex-col justify-center items-center gap-[15px]`}>
                        <div 
                            className={' rounded-[10px] p-[15px] w-100 flex flex-row justify-between items-center gap-[15px]'}
                        >
                            <div className='font-bold w-[150px]'>Type </div>
                            <div className='font-bold w-[100px]'>Period </div> 
                            <div className='font-bold w-[200px]'> Note</div>
                            <div className='font-bold w-[150px]'> Volume</div>

                        </div>

                        {hydrations.map(hydration=> (
                             <div key={hydration.id} className='w-100' >
                         
                                 <div 
                                     
                                     className={' bg-[#f5f5f5] rounded-[10px] p-[15px] w-100 flex flex-row justify-between items-start gap-[15px]'}
                                 >
                                     <div className='font-bold w-[150px]'>{capitalizeFirstChar(hydration.type)}</div>
                                     <div className='font-bold w-[100px]'>{convertTo12HourFormat(hydration.time)}</div>
                                     <div className='w-[200px] h-[120px] overflow-y-scroll'>{capitalizeFirstChar(hydration.note)}</div>
                                     <div className='w-[150px]'>{hydration.volume} &nbsp; mL</div>
                              
             
                                 </div>
                             
             
                                             
                         </div>
                        ))}


                    </div>
                    }





                
                </Modal.Body>
            </Modal>
        </>
    )
}

export default MealDetailModal