import * as  STYLES from '../../constants/styles'
import * as ROUTES from '../../constants/routes'
import Info from "../../elements/info/info";
import { useNavigate } from "react-router-dom";

import LoadingSpinner from "../../elements/loading/loadingSpinner";
import Tag from "../../elements/tag/tag";

import { RecipeInterface } from '../../types/recipe';

import { truncateString, capitalizeFirstChar } from "../../lib/util/string";
import { formatDate } from "../../lib/util/date";
import { FiEdit2 } from 'react-icons/fi';
import { useState } from 'react';
import RecipeDetail from './recipeDetail';
import TooltipGeneral from '../../elements/tooltip/tooltip';
import RecipeCard from './recipeCard';

interface RecipeListInterface {
    recipes: RecipeInterface[],
    loading: boolean
}

const RecipeList: React.FC<RecipeListInterface> = ({ recipes, loading }) =>{
    
    const [openDetail, setOpenDetail] = useState<boolean>(false)
    const [selectedRecipe, setSelectedRecipe] = useState<RecipeInterface>({
        id: "",
        name: "",
        description:"",
        ingredients: [],
        steps:[""],
        image: ""
    })

    const handleRecipeDetailOpen = ()=>{
        setOpenDetail(prev=>!prev)
    }

    const navigate = useNavigate();
    const handleCreateRecipeClick = () => {
            // Navigate to the "/recipes/create" path
            navigate(ROUTES.RECIPE_CREATE);
        };
    
    const handleEdit = (id: string|undefined ) =>{
        navigate(`/recipes/edit/${id}`);
    }
    
    return (
        <>

           <RecipeDetail 
              open={openDetail}
              setOpen={setOpenDetail}
              recipe={selectedRecipe}
           />
            
            <div className="w-full bg-white rounded-lg shadow-md p-8">

               
                <div className=' flex flex-row justify-between items-center mb-3'>
                    <div className='font-bold text-[30px]'>My Recipes 👨‍🍳</div>
                    <button className={STYLES.ACTION_BUTTON} onClick={handleCreateRecipeClick}>Create Recipe</button>
                </div>

                <Info 
                    text={`Save, organize, and recreate your favorite dishes 
                    effortlessly—whether it’s a family heirloom, 
                    a restaurant-inspired creation, or a healthy meal 
                    prep idea. A recipe that truly matters to you, and your health.
                    `}
                />

                {
                loading ?
                <LoadingSpinner text={"Loading Recipes ..."}/>
                    :
                <div className='flex flex-row flex-wrap justify-left items-start gap-5 mt-[30px] '>
                    {recipes.map(recipe=>(
                        <RecipeCard 
                            key={recipe.id}
                            recipes={recipes}
                            recipe={recipe}
                            handleEdit={handleEdit}
                            setSelectedRecipe={setSelectedRecipe}
                            handleRecipeDetailOpen={handleRecipeDetailOpen}
                        />
                    ))}
                </div>
                }

            </div>
        </>
    )
}


export default RecipeList