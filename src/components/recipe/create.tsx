import { useState }from 'react'
import * as STYLES from '../../constants/styles'
import * as COLORS from '../../constants/color';
import * as ROUTES from '../../constants/routes'
import { useRecipe } from '../../hooks/useRecipe'
import Success from '../../elements/banner/success'
import { useNavigate } from 'react-router-dom'
import Tag from '../../elements/tag/tag';



const RecipeCreate = () =>{

    const { 
        loading,
        success,
        recipe, 
        setSuccess,
        handleRecipeFieldsChange, 
        handleIngredientAdd,
        handleStepAdd,
        handleRecipeStep,
        handleRecipeCreate,
        handleIngredientRemove,
    } = useRecipe()
    const { name, description, ingredients, steps} = recipe;

    console.log('recipe',recipe)

    const [ingredient, setIngredient] = useState<string>('')

    const navigate = useNavigate()

    const handleGoBack =()=>{
         navigate("/")
    }
    return (
        <>
            {
                success
                &&
                <Success  
                    text='Recipe Created Successfully' 
                    onClose={()=> setSuccess(false)} 
                />
            }
            <div className="w-full bg-white rounded-lg shadow-md p-8">
                <div className=' flex flex-row justify-between items-center'>

                    <div className='font-bold text-xl'>Create A Recipe</div>
                    <button className={STYLES.ACTION_BUTTON} onClick={handleGoBack}>Go Back</button>

                    
                </div>


                <form className='mt-3 flex flex-col gap-5' onSubmit={handleRecipeCreate}>
                        
                    <div className='flex flex-col gap-3'>
                        <label className="block text-sm font-medium text-gray-700">Recipe Name</label>
                        <input
                            type="name"
                            value={name}
                            name='name'
                            placeholder='ex:(pinapple smoothie)'
                            onBlur={()=>{}}
                            onChange={handleRecipeFieldsChange}
                            className={STYLES.RECIPE_INPUT}
                        />
                    </div>
                
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={description}
                            name='description'
                            rows={3}
                            placeholder='How to make your recipe attractive to others'
                            onBlur={()=>{}}
                            onChange={handleRecipeFieldsChange}
                            className={STYLES.RECIPE_INPUT}
                        />
                    </div>

                    

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ingredients</label>
                        <input
                            type="text"
                            value={ingredient}
                            name='ingredients'
                            placeholder='Basic Ingredient'
                            onBlur={()=>{}}
                            onChange={(e)=> setIngredient(e.target.value)}
                            className={STYLES.RECIPE_INPUT}
                        />
                    </div>

                    {
                        ingredients.length>0
                        &&
                        <div className='flex flex-row flex-wrap gap-3'>
                            {ingredients.map((ing, index)=>(
                                <Tag 
                                   key={index}
                                   text={ing}
                                   toDelete={true}
                                   onDelete={()=>handleIngredientRemove(index)}
                                />
                            ))}

                        </div>
                    }

                            <button 
                                className={STYLES.ACTION_BUTTON}
                                onClick={(e)=>{
                                    e.preventDefault()
                                    handleIngredientAdd(ingredient)
                                    setIngredient('')
                                }}
                                disabled={!ingredient}
                            >
                                Add Ingredient
                            </button>


                            <div>

                                <label className="block text-sm font-medium text-gray-700">Steps</label>
                                {
                                    steps.map((step, index)=>(
                                    <div key={index}>
                                        <input
                                            type="text"
                                            value={step}
                                            name='steps'
                                            placeholder={`Step ${index +1}`}
                                            onBlur={()=>{}}
                                            onChange={(e)=>{handleRecipeStep(index, e)}}
                                            className={STYLES.RECIPE_INPUT}
                                        />
                                    </div>

                                ))
                                }
                            </div>

                            <button 
                                className={STYLES.ACTION_BUTTON}
                                onClick={(e)=>{
                                    e.preventDefault()
                                    handleStepAdd()

                                }}
                                disabled={steps[steps.length-1]===''}
                            >
                                Add Step
                            </button>
                        

                    
                
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
        </>
    )
}

export default RecipeCreate;