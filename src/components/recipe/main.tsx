import React from "react";
import { useNavigate } from "react-router-dom";
import { RECIPE_CREATE } from "../../constants/routes";

const Main = () =>{
    const navigate = useNavigate();

    const handleCreateRecipeClick = () => {
        // Navigate to the "/recipes/create" path
        navigate(RECIPE_CREATE);
    };


    return (
        <>
           <div className="w-full bg-white rounded-lg shadow-md p-8">
               <div className=' flex flex-row justify-between items-center'>

                  <div className='font-bold text-xl'>My Recipes</div>
                  <button onClick={handleCreateRecipeClick}>Create Recipe</button>
                   
               </div>

           </div>
        </>
    )
}

export default Main;