import { useRecipe } from "../../hooks/useRecipe";
import { useState } from "react";
import RecipeList from "./recipeList";
import RecipeAnalysis from "./recipeAnalysis";

const Main = () =>{

    const { recipes, loading } =useRecipe()
    const [selectedSection, setSelectedSection] = useState<string>('Nutrient Analysis')


    return (
        <>

        {
        recipes.length>0 
          &&
        <div className='w-100 flex flex-row justify-start items-center gap-2 mb-[20px]'>
            {['Recipe', 'Nutrient Analysis'].map(section=> (
                <div 
                    key={section}
                    className={
                    `${selectedSection ===section? 'bg-black': "bg-[#edebeb]"} 
                    ${selectedSection ===section? 'text-white': "text-black"}
                    rounded-[10px] p-3 font-bold cursor-pointer`}
                    onClick={()=> setSelectedSection(section)}
                > 
                    {section}
                </div>
            ))}
         </div>
        }
        
        { selectedSection==='Recipe' && <RecipeList loading={loading} recipes={recipes}/>}
        { selectedSection==='Nutrient Analysis' && <RecipeAnalysis recipes={recipes}/>}

        </>
    )
}

export default Main;