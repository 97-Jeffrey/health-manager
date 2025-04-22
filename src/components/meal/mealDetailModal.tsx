
import { Modal } from 'react-bootstrap';
import { GroupedMealsArray } from '../../lib/util/meal';
import { formatDate } from '../../lib/util/date';
import MicronutrientBarChart from '../../elements/chart/nutrientsChart';
import NutrientsTable from '../../elements/table/NutritionTable';
import MealDetailEntry from './mealDetailEntry';

interface MealDetailModalInterface {
    meals: GroupedMealsArray,
    open: boolean,
    setOpen: (state: boolean)=> void
}

const MealDetailModal: React.FC<MealDetailModalInterface> = ({ meals, open, setOpen }) =>{

    console.log('meals', meals)
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
                    <h4 className='font-bold'>Meals Details At {formatDate(meals.date)}</h4>

                    <div className={`mt-[30px] w-100 flex flex-col justify-center items-center gap-[15px]`}>
                        <div 
                            className={' rounded-[10px] p-[15px] w-100 flex flex-row justify-between items-center gap-[15px]'}
                        >
                            <div className='font-bold w-[150px] '>Meal name</div>
                            <div className='font-bold '>Time to Finish </div>
                            <div className='font-bold w-[200px] '>Meal Note</div>

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