
import { useContext } from "react";
import { Navigate, useLocation,  } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthProvider";
import Loader from "../common/Loader";


const PrivateRoutes = ({ children }:any) => {
  const {user,loading} = useContext(AuthContext)
  
  const { pathname } = useLocation();
  


  if (loading) {
    return <>
  <Loader />
    </>;
}


  if (!loading && !user?.email) {
    return <Navigate to='/signin' state={{ path: pathname }} />;
  }

  return children;
};

export default PrivateRoutes;