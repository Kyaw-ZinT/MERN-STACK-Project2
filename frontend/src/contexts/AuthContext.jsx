import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
const AuthContext = createContext();

let authReducer = (state, action) => {
  switch (action.type) {
    case "LOGOUT":
      return { user: null };
    case "LOGIN":
      return { user: action.payload };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  let [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    try {
      axios.get("http://localhost:4002/api/user/me", { withCredentials: true }).then((res) => {
        let user = res.data;

        if (user) {
          dispatch({ type: "LOGIN", payload: user });
        } else {
          dispatch({ type: "LOGOUT" });
        }
      });
    } catch (e) {
      dispatch({ type: "LOGOUT" });
    }
  }, []);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };
