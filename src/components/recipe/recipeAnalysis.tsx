import { useState, useEffect } from "react"
import { RecipeInterface } from "../../types/recipe"
import MicronutrientBarChart from "../../elements/chart/nutrientsChart"
import NutrientsTable from "../../elements/table/NutritionTable"
import { GroupedMealsArray } from "../../lib/util/meal"
import { formatDate } from "../../lib/util/date"
import SectionSelector from "../../elements/tab/SectionSelector"


interface RecipeAnalysisInterface {
    recipes: RecipeInterface[],
    meals: GroupedMealsArray[]
}

const RecipeAnalysis: React.FC<RecipeAnalysisInterface> = ({ recipes, meals }) =>{

    const [analyzeItem, setAnalyzeItem] = useState('recipe')

    const [selectedRecipe, setSelectedRecipe] = useState<string>(recipes[0].name) 
    const [selectedDate, setSelectedDate] = useState<string>(meals[0].date)
    const [selectedMealName, setSelectedMealName] =  useState<string>(meals[0].data[0].name)

    const recipesNames = recipes.map(recipe => recipe.name)
    const mealsDates = meals.map(meal=> meal.date)
    const mealsNames = meals.find(meal=> meal.date ===selectedDate)?.data.map(each=>each.name) ||[]


    const micronutrients = analyzeItem === 'recipe'? 
    (recipes.find(recipe=> recipe.name === selectedRecipe) || {}).micronutrients :
    (meals.find(meal=>meal.date ===selectedDate)?.data.find(entry=> entry.name ===selectedMealName))?.micronutrients;



    useEffect(()=>{
        setSelectedRecipe(recipesNames[0])
    },[recipes])

    useEffect(()=>{
        setSelectedMealName(mealsNames[0])
    },[selectedDate])

    return (
        <>
            <div className="w-full bg-white rounded-lg shadow-md p-8">
               
                <SectionSelector 
                   sections={['recipe', 'meal']}
                   selectedSection={analyzeItem}
                   setSelectedSection={setAnalyzeItem}
                />


                <SectionSelector 
                   sections={analyzeItem =='recipe'? recipesNames: mealsDates}
                   selectedSection={ analyzeItem =='recipe'?selectedRecipe: selectedDate}
                   setSelectedSection={ analyzeItem =='recipe'? setSelectedRecipe: setSelectedDate}
                />

                {analyzeItem ==='meal'
                     &&
                <SectionSelector 
                    sections={mealsNames}
                    selectedSection={selectedMealName}
                    setSelectedSection={setSelectedMealName}
                /> 
                } 

                {
                    micronutrients  
                        &&
                    <MicronutrientBarChart
                        name={selectedRecipe}
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