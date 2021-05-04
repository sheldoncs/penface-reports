import React, { useContext } from "react";
import "./App.css";
import Calendar from "./container/Calendar/Calendar";
import Payroll from "./container/payroll/payroll";
import Login from "./components/login/login";
import { LoginContext } from "./context/login-context";

const App = (props) => {
  const loginContext = useContext(LoginContext);
  let content = <Login />;
  if (loginContext.isAuth) {
    content = <Payroll />;
  }
  return <div>{content}</div>;
};
export default App;
