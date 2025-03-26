import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import  HealthJourney from './pages/HealthJourney';
import Wellness from './pages/Wellness';
import { ProtectedRoute } from './components/ProtectedRoute';
import useAppData from './hooks/useApp';

import { useCallback } from 'react';
import * as ROUTES from './constants/routes'
import Recipe from './pages/Recipe';


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
              path={ROUTES.DASHBOARD} 
              element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
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
              path={ROUTES.WELLNESS} 
              element={<ProtectedRoute><Wellness /></ProtectedRoute>} 
            />
            
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;