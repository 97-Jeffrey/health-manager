import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import HealthMetrics from './pages/HealthMetrics';
import Wellness from './pages/Wellness';
import { ProtectedRoute } from './components/ProtectedRoute';
import useAppData from './hooks/useApp';

import { useCallback } from 'react';


function App() {


  const { state, setIsAuth } = useAppData()

  const { isAuth } = state

  const validateAuth = useCallback(() => setIsAuth(), [])

  const signOutApp = useCallback(() => setIsAuth(), [])


  return (


      <BrowserRouter>
        <Routes>
            <Route 
              path="/signin" 
              element={
                <SignIn 
                  isAuthenticated={isAuth}
                  handleAuthentication={validateAuth}
                />
              } 

            />

            <Route 
              path="/signup" 
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
            <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="metrics" element={<ProtectedRoute><HealthMetrics /></ProtectedRoute>} />
            <Route path="wellness" element={<ProtectedRoute><Wellness /></ProtectedRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;