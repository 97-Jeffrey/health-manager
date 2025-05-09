
import { Modal } from 'react-bootstrap';
import { GroupedMealsArray } from '../../lib/util/meal';
import { formatDate } from '../../lib/util/date';
import MealDetailEntry from './mealDetailEntry';
import { IoIosClose } from "react-icons/io";

interface MealDetailModalInterface {
    meals: GroupedMealsArray,
    open: boolean,
    setOpen: (state: boolean)=> void
}

const MealDetailModal: React.FC<MealDetailModalInterface> = ({ meals, open, setOpen }) =>{

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
                    <div className='flex flex-row justify-between items-center'>
                        <h4 className='font-bold'>Meals Details At {formatDate(meals.date)}</h4>
                        <IoIosClose  
                            className='text-[30px] cursor-pointer'
                            onClick={()=>setOpen(false)}
                        />
                    </div>

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

                
                </Modal.Body>
            </Modal>
        </>
    )
}

export default MealDetailModal