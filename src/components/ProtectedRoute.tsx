import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {

  
  // if (!user.email) {
  //   return <Navigate to="/signin" replace />;
  // }

  return children;
};
