import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "../store/actions/index";

export const LoginContext = React.createContext({
  isAuth: false,
  login: () => {},
  resetLogin: () => {},
});

const LoginContextProvider = (props) => {
  const auth = useSelector((state) => state.auth.result);
  const dispatch = useDispatch();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const loginHandler = () => {
    setIsAuthenticated(true);
  };
  const resetLoginHandler = () => {
    setIsAuthenticated(false);
  };
  return (
    <LoginContext.Provider
      value={{
        login: loginHandler,
        resetLogin: resetLoginHandler,
        isAuth: isAuthenticated,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
