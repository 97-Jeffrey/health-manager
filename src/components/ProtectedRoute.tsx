import { Navigate } from 'react-router-dom';
import { authconfig } from '../lib/Auth';
import { SIGN_IN } from '../constants/routes';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {

  if (authconfig.getUser() === null) {
    return <Navigate to={SIGN_IN} replace />;
  }

  return children;
};
