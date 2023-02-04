import { createContext, useEffect, useState } from "react";
import { clientAxios } from "../config/clientAxios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const authUser = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return null;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      try {
        const { data } = await clientAxios.get("/users/profile", config);

        /* setLoading(false); */
        //console.log(data);
        setAuth(data.user);

      } catch (error) {
        console.error(error.response?.data);
        sessionStorage.removeItem("token");

       /*  setAuth({}); */
      } finally {
        setLoading(false);
      }
    };

    authUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
