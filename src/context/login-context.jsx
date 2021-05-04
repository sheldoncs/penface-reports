import React, { useState } from "react";

export const LoginContext = React.createContext({
  isAuth: false,
  login: () => {},
  resetLogin: () => {},
});

const LoginContextProvider = (props) => {
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
