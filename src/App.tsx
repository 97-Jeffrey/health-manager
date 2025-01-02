import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import HealthMetrics from './pages/HealthMetrics';
import Wellness from './pages/Wellness';
import { UserProvider } from './context/UserContext';
import { ProtectedRoute } from './components/ProtectedRoute';


function App() {


  return (

    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="metrics" element={<ProtectedRoute><HealthMetrics /></ProtectedRoute>} />
            <Route path="wellness" element={<ProtectedRoute><Wellness /></ProtectedRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;