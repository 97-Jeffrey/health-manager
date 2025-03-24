import { useNavigate } from "react-router-dom";

import { useRecipe } from "../../hooks/useRecipe";
import { truncateString } from "../../lib/util/string/truncateString";
import Tag from "../../elements/tag/tag";
import LoadingSpinner from "../../elements/loading/loadingSpinner";

import * as STYLES from '../../constants/styles'
import * as ROUTES from '../../constants/routes'

const Main = () =>{
    const navigate = useNavigate();
    const { recipes, loading } =useRecipe()

    const handleCreateRecipeClick = () => {
        // Navigate to the "/recipes/create" path
        navigate(ROUTES.RECIPE_CREATE);
    };

    


    return (
        <>
           <div className="w-full bg-white rounded-lg shadow-md p-8">
               <div className=' flex flex-row justify-between items-center'>

                  <div className='font-bold text-xl'>My Recipes</div>
                  <button className={STYLES.ACTION_BUTTON} onClick={handleCreateRecipeClick}>Create Recipe</button>
                   
               </div>

               {
                loading ?
                <LoadingSpinner text={"Loading Recipes ..."}/>
                    :
                <div className='flex flex-row flex-wrap justify-left items-start gap-5 mt-[30px] '>
                    {recipes.map(recipe=>(
                        <div 
                            key={recipe.id} 
                            className={
                                `p-3 bg-[#E7DDFF] w-[300px] min-h-[300px] rounded-lg cursor-pointer flex flex-col justify-around`
                            }
                        >

                            <div className=' text-[30px] font-bold'>{recipe.name}</div>
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

                        </div>
                    ))}
                </div>
               }

               

           </div>
        </>
    )
}

export default Main;