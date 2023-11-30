// import useAuth from 'app/hooks/useAuth';
import useAuth from '../../app/hooks/useAuth';


import { Navigate, useLocation } from 'react-router-dom';



const AuthGuard = ({ children }) => {
  let {
    isAuthenticated,
  } = useAuth();
  const { pathname } = useLocation();

  const authenticated = isAuthenticated;

  return (
    <>
      {authenticated ? (
        children
      ) : (
        <Navigate replace to="/session/signin" state={{ from: pathname }} />
      )}
    </>
  );
};

export default AuthGuard;
