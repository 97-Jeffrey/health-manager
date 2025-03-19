// import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { RECIPE_CREATE, RECIPE_EDIT, RECIPES } from "../constants/routes";
import Main from "../components/recipe/main";
import RecipeCreate from "../components/recipe/create";
import RecipeEdit from "../components/recipe/edit";

const Recipe = () =>{

    return (
        <>  
            <Routes>
                <Route              
                    path={"/"}
                    element={<ProtectedRoute><Main /></ProtectedRoute>}
                />
                <Route
                
                    path={'/create'}
                    element={<ProtectedRoute><RecipeCreate/></ProtectedRoute>}
                />

                <Route
                    path={'/edit/:id'}
                    element={<ProtectedRoute><RecipeEdit/></ProtectedRoute>}
                />
            </Routes>
        </>
    )
}

export default Recipe;