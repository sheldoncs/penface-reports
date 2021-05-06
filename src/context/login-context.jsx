import React, { useState } from "react";

export const LoginContext = React.createContext({
  isAuth: false,
  login: () => {},
  logout: () => {},
});

const LoginContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const loginHandler = () => {
    setIsAuthenticated(true);
  };
  const logoutHandler = () => {
    setIsAuthenticated(false);
  };

  return (
    <LoginContext.Provider
      value={{
        login: loginHandler,
        logout: logoutHandler,
        isAuth: isAuthenticated,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
