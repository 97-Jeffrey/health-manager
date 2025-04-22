import { useRecipe } from "../../hooks/useRecipe";
import { useState } from "react";
import RecipeList from "./recipeList";
import RecipeAnalysis from "./recipeAnalysis";
import MealList from "../meal/mealList";
import { useMeal } from "../../hooks/useMeal";
import SectionSelector from "../../elements/tab/SectionSelector";

const Main = () =>{

    const { recipes, loading } =useRecipe()
    const { meals } = useMeal()
    const [selectedSection, setSelectedSection] = useState<string>('Meal')

    const sections = recipes.length>0 ? 
    ['Meal','Recipe', 'Nutrient Analysis']:
    ['Meal','Recipe']

    return (
        <>
            <SectionSelector 
                sections={sections}
                selectedSection={selectedSection}
                setSelectedSection={setSelectedSection}
            />
        
            { selectedSection==='Meal' && <MealList/>}
            { selectedSection==='Recipe' && <RecipeList loading={loading} recipes={recipes}/>}
            { selectedSection==='Nutrient Analysis' && <RecipeAnalysis recipes={recipes}/>}

        </>
    )
}

export default Main;