import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Body from './pages/Body';
import Profile from './pages/Profile';
import  HealthJourney from './pages/HealthJourney';
import Wellness from './pages/Wellness';
import { ProtectedRoute } from './components/ProtectedRoute';
import Recipe from './pages/Recipe';
import VitaBot from './pages/VitaBot';

import useAppData from './hooks/useApp';
import { useCallback } from 'react';
import * as ROUTES from './constants/routes'


function App() {


  const { state, setIsAuth } = useAppData()

  const { isAuth } = state


  const validateAuth = useCallback(() => setIsAuth(), [])

  const signOutApp = useCallback(() => setIsAuth(), [])



  return (


      <BrowserRouter>
        <Routes>
            <Route 
              path={ROUTES.SIGN_IN}
              element={
                <SignIn 
                  isAuthenticated={isAuth}
                  handleAuthentication={validateAuth}
                />
              } 

            />

            <Route 
              path={ROUTES.SIGN_UP} 
              element={
                <SignUp   
                  isAuthenticated={isAuth}
                />} 
            />

            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <MainLayout signOutApp={signOutApp} />
                </ProtectedRoute>}
            >


            <Route 
              path={'/recipes/*'} 
              element={<ProtectedRoute><Recipe /></ProtectedRoute>} 
            />    

            <Route 
              path={ROUTES.BODY} 
              element={<ProtectedRoute><Body /></ProtectedRoute>} 
            />


            <Route 
              path={ROUTES.PROFILE} 
              element={<ProtectedRoute><Profile /></ProtectedRoute>} 
            />
            
           
            <Route 
              path={ROUTES.HEALTH_JOURNEY} 
              element={<ProtectedRoute><HealthJourney /></ProtectedRoute>} 
            />

            <Route 
              path={ROUTES.MIND_WELLNESS} 
              element={<ProtectedRoute><Wellness /></ProtectedRoute>} 
            />

            <Route 
              path={ROUTES.VITA_BOT} 
              element={<ProtectedRoute><VitaBot /></ProtectedRoute>} 
            />
            
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;