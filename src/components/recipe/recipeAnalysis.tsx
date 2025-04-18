import { useState, useEffect } from "react"
import { RecipeInterface } from "../../types/recipe"
import MicronutrientBarChart from "../../elements/chart/nutrientsChart"
import NutrientsTable from "../../elements/table/NutritionTable"


interface RecipeAnalysisInterface {
    recipes: RecipeInterface[]
}

const RecipeAnalysis: React.FC<RecipeAnalysisInterface> = ({ recipes }) =>{

    const recipesNames = recipes.map(recipe => recipe.name)
    const [selectedSection, setSelectedSection] = useState<string>(recipesNames[0]) 

    const micronutrients = (recipes.find(recipe=> recipe.name ===selectedSection) || {}).micronutrients ;
    console.log('micronutrients', micronutrients)


    useEffect(()=>{
       setSelectedSection(recipesNames[0])
    },[recipes])

    return (
        <>
            <div className="w-full bg-white rounded-lg shadow-md p-8">

                <div className='w-100 flex flex-row justify-start items-center gap-2 mb-[20px]'>
                    {recipesNames.map(section=> (
                        <div 
                            key={section}
                            className={
                            `${selectedSection ===section? 'bg-black': "bg-[#edebeb]"} 
                            ${selectedSection ===section? 'text-white': "text-black"}
                            rounded-[10px] px-[15px] py-[10px] font-bold cursor-pointer`}
                            onClick={()=> setSelectedSection(section)}
                        > 
                            {section}
                        </div>
                    ))}
                </div>

                {
                    micronutrients  
                        &&
                    <MicronutrientBarChart
                        name={selectedSection}
                        micronutrients={micronutrients}
                    />
                }

                {
                micronutrients  
                    &&
                <NutrientsTable 
                   micronutrients={micronutrients}
                />
                }



            </div>
        </>
    )

}

export default RecipeAnalysis