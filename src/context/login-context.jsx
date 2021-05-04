import React, { useState } from "react";

export const LoginContext = React.createContext({
  isAuth: false,
  login: () => {},
});

const LoginContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const loginHandler = () => {
    setIsAuthenticated(true);
  };
  return (
    <LoginContext.Provider
      value={{ login: loginHandler, isAuth: isAuthenticated }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
