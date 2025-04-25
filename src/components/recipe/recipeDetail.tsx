import { Modal } from "react-bootstrap"
import { RecipeInterface } from "../../types/recipe"
import { capitalizeFirstChar } from "../../lib/util/string"
import Tag from "../../elements/tag/tag"
import { IoIosClose } from "react-icons/io"

interface RecipeDetailInterface {
    recipe: RecipeInterface,
    open: boolean,
    setOpen: (state: boolean)=> void
}

const RecipeDetail: React.FC<RecipeDetailInterface> = ({ open, setOpen, recipe}) =>{
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
                        <h2 className='font-bold'>{capitalizeFirstChar(recipe.name)}</h2>
                        <IoIosClose  
                            className='text-[30px] cursor-pointer'
                            onClick={()=> setOpen(false)}
                        />
                    </div>

                    <div className={`mt-[30px]`}>
                        
                        {recipe.description}
                    </div>

                    {
                    recipe.image
                       &&
                    <img 
                        src={recipe.image}
                        alt={`${recipe.name} image`}
                        className="mt-[20px] w-50 rounded-[20px] object-cover"
                    />
                    }

                    <div className='mt-[20px] flex flex-row flex-wrap justify-start items-center gap-[15px]'>
                        {recipe.ingredients.map((ing, index)=>(
                            <Tag
                                key={index}
                                text={ing}
                                toDelete={false}
                            />
                        ))}
                        
                    </div>

                    <div className='border border-black rounded-[20px] p-[15px] mt-[20px] flex flex-col flex-wrap justify-center items-start gap-[10px]'>
                        {recipe.steps.map((step, index)=>(
                            <div key={index}><span className='font-bold'>{index+1}.</span> {step}</div>
                        ))}
                        
                    </div>

                
                </Modal.Body>
            </Modal>
        </>

    )
}

export default RecipeDetail