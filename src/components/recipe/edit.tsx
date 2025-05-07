import { useState, useEffect }from 'react'
import * as STYLES from '../../constants/styles'
import * as COLORS from '../../constants/color';
import { useNavigate, useParams } from 'react-router-dom'
import Tag from '../../elements/tag/tag';
import { useRecipe } from '../../hooks/useRecipe';
import getRecipe from '../../lib/api/recipe/getRecipe';
import { RecipeInterface } from '../../types/recipe';
import Success from '../../elements/banner/success'
import DeleteIcon from '../../elements/remove/deleteIcon';



const RecipeEdit = () =>{

    const { id } = useParams()
    const { 
            loading,
            success,
            recipe, 
            setRecipe,
            setLoading,
            setSuccess,
            handleRecipeFieldsChange, 
            handleUploadRecipeImage,
            handleIngredientAdd,
            handleStepAdd,
            handleRecipeStep,
            handleRecipeUpdate,
            handleRecipeRemove,
            handleIngredientRemove,
            handleStepRemove
        } = useRecipe()
    const { name, description, ingredients, steps} = recipe;

    const [ingredient, setIngredient] = useState<string>('')

    const navigate = useNavigate()

    const handleGoBack =()=>{
        navigate("/recipes")
    }

    useEffect(()=>{


      const handleFetchRecipe = async()=>{
      
          try{
              setLoading(true)
              const res: RecipeInterface = await getRecipe(id)
              console.log('res',res)
              setRecipe(res)
          }catch(err){
              console.log('err:', err)
          }
          finally{
              setLoading(false)
          }
  
      
      }

      handleFetchRecipe()

    }, [])

    return (
        <>
          {
            success
              &&
            <Success  
                text='Recipe Updated Successfully' 
                onClose={()=> setSuccess(false)} 
            />
          }
           <div className="w-full bg-white rounded-lg shadow-md p-8">
                <div className=' flex flex-row justify-between items-center'>

                    <div className='font-bold text-xl'>Update the {recipe.name ?`"${recipe.name}"`:`recipe`}</div>
                    <button className={STYLES.ACTION_BUTTON} onClick={handleGoBack}>Go Back</button>

                    
                </div>


                <form className='mt-3 flex flex-col gap-5' onSubmit={handleRecipeUpdate}>
                        
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
                        <input
                            type="file"
                            id="bootstrap-file-upload"
                            onChange={handleUploadRecipeImage}
                            className="d-none"
                        />
                    
                        <label
                            htmlFor="bootstrap-file-upload"
                            className="btn btn-secondary"
                        >
                            {recipe.image? 'Change Recipe Image': 'Upload Recipe Image'}
                        </label>

                        {
                            recipe.image ?
                            <img 
                                src={recipe.image} 
                                alt="Recipe Image" 
                                className="mt-[20px] w-50 rounded-[20px] object-cover "
                            />
                                :
                            <div className="mt-[20px] font-bold w-50 h-[300px] rounded-[20px] object-cover border border-black flex flex-row justify-center items-center">
                                No Recipe Image Added
                            </div>
                            }
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
                                  <div key={index} className='flex flex-row justify-center items-center gap-2'>
                                      <input
                                          type="text"
                                          value={step}
                                          name='steps'
                                          placeholder={`Step ${index +1}`}
                                          onBlur={()=>{}}
                                          onChange={(e)=>{handleRecipeStep(index, e)}}
                                          className={STYLES.RECIPE_INPUT}
                                      />
                                      {steps.length >1
                                        &&
                                      <DeleteIcon 
                                        onDelete={()=>handleStepRemove(index)}
                                      />
                                      }
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
                                className={
                                `px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${COLORS.REMOVE_BG_COLOR} hover:bg-red-700`}
                                disabled={loading}
                                onClick={(e)=>handleRecipeRemove(e, recipe.id)}
                            >
                                {loading ? 'Deleting...':'Delete'}
                            </button>
                            <button
                                type="submit"
                                className={
                                `px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-action-create hover:bg-blue-700`}
                                disabled={loading}
                            >
                                {loading ? 'udpating...':'update'}
                            </button>
                        
                        </div>
                    </form>



            </div>
        </>
    )
}

export default RecipeEdit;