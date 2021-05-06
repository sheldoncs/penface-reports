import React, { useCallback, useContext } from "react";
import "./App.css";
import Calendar from "./container/Calendar/Calendar";
import Payroll from "./container/payroll/payroll";
import Login from "./components/login/login";
import Manager from "./components/manager/manager";
import { LoginContext } from "./context/login-context";
import { Route, Switch } from "react-router-dom";
const App = React.memo((props) => {
  return (
    <div>
      <Switch>
        <Route exact path="/payroll" component={Payroll} />
        <Route exact path="/manager" component={Manager} />
        <Route exact path="/" component={Login} />
      </Switch>
    </div>
  );
});

export default App;
