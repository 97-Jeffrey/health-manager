import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useUser();
  
  if (!user.email) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
