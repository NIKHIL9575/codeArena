import { createContext, useState,useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchProfile } from "../Redux/profileSlice";
import { useNavigate } from "react-router-dom";
import API from "../config/api";



export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [DisplayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
  const checkAuth = async () => {
    try {
      const response = await axios.get(
        `${API}/api/auth/checkAuth`,
        { withCredentials: true }
      );

      setIsLoggedIn(true);
      setDisplayName(response.data.displayName);
      await dispatch(fetchProfile());
    } catch (error) {
      setIsLoggedIn(false);
      setDisplayName("");
    } finally {
      setLoading(false);
    }
  };

  checkAuth();
}, []);

  const logout = async () => {
    try {


      const response = await axios.post(
        `${API}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      setIsLoggedIn(false);
      setDisplayName("");

    } catch (error) {
      console.error("Logout failed:", error);
    }
  };


  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        DisplayName,
        setDisplayName,
        loading,
        setLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;