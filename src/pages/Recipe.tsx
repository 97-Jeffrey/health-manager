// import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "../components/ProtectedRoute";
import * as ROUTES from "../constants/routes";
import Main from "../components/recipe/main";
import RecipeCreate from "../components/recipe/create";
import RecipeEdit from "../components/recipe/edit";

const Recipe = () =>{

    return (
        <>  
            <Routes>
                <Route              
                    path={ROUTES.RECIPES.MAIN}
                    element={<ProtectedRoute><Main /></ProtectedRoute>}
                />
                <Route
                    path={ROUTES.RECIPES.CREATE}
                    element={<ProtectedRoute><RecipeCreate/></ProtectedRoute>}
                />

                <Route
                    path={ROUTES.RECIPES.EDIT}
                    element={<ProtectedRoute><RecipeEdit/></ProtectedRoute>}
                />
            </Routes>
        </>
    )
}

export default Recipe;