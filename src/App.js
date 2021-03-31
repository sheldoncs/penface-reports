import React, { Component } from "react";
import "./App.css";
import Calendar from "./container/Calendar/Calendar";
import Payroll from "./container/payroll/payroll";

class App extends Component {
  render() {
    return (
      <div>
        <Payroll />
      </div>
    );
  }
}
export default App;
