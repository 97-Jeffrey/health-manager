import { FiEdit2 } from "react-icons/fi"
import Tag from "../../elements/tag/tag"
import TooltipGeneral from "../../elements/tooltip/tooltip"
import { formatDate } from "../../lib/util/date"
import { capitalizeFirstChar, truncateString } from "../../lib/util/string"
import { RecipeInterface } from "../../types/recipe"


interface RecipeCardInterface {
    recipes: RecipeInterface[],
    recipe: RecipeInterface,
    handleEdit: (id: string|undefined ) => void,
    setSelectedRecipe: (recipe: RecipeInterface)=> void,
    handleRecipeDetailOpen: ()=> void
}

const RecipeCard: React.FC<RecipeCardInterface> = ({ 
    recipes, 
    recipe, 
    handleEdit, 
    setSelectedRecipe ,
    handleRecipeDetailOpen
}) =>{
    return (
        <>
              <div 
                    key={recipe.id} 
                    className={
                        `p-3 border border-1  border-lg shadow-custom bg-white w-[300px] min-h-[350px] rounded-lg cursor-pointer flex flex-col justify-around`
                    }
                    onClick={()=>{
                        setSelectedRecipe(recipes.find(rec=> rec.id ===recipe.id) as RecipeInterface)
                        handleRecipeDetailOpen()
                    }}
                >
                <div className='flex flex-row justify-start items-center gap-[15px]'>
                    <div className=' text-[25px] font-bold'>{truncateString(capitalizeFirstChar(recipe.name), 15)}</div>
                    <div 
                        className='cursor-pointer'
                        onClick={()=>{
                            handleEdit(recipe.id)
                        }}
                    >
                        <TooltipGeneral 
                            text='Edit the recipe'
                            placement="right"
                        > 
                            <div>
                                <FiEdit2 />
                            </div>
                        </TooltipGeneral>
                    </div>
                </div>
                <div className=''>{truncateString(recipe.description, 30)}</div>

                <div className='flex flex-row flex-wrap justify-start items-start gap-2 mt-2 h-[100px] overflow-y-scroll'>
                    {recipe.ingredients.map((ing, index)=>(
                        <Tag
                            key={index}
                            text={ing}
                            toDelete={false}
                        />
                    ))}
                </div>
                <div className='font-bold'>{formatDate(recipe.lastUpdatedAt)}</div>

            </div>
        
        </>
    )
}

export default RecipeCard