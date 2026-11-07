import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import {AuthContext}  from "../context/AuthProvider";
import {useContext} from 'react'


function ProtectedRoute() {
  const { isLoggedIn, setIsLoggedIn,loading } = useContext(AuthContext);

   if (loading) {
    return <div>Checking authentication...</div>;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;