import React from "react";
import classes from "./Manager.module.css";
import iconManager from "../../assets/manager.png";
import iconLogout from "../../assets/logout.png";
import { useHistory } from "react-router-dom";

const Manager = (props) => {
  const history = useHistory();

  const classFormat = [classes.Button];
  classFormat.push("btn");
  classFormat.push("btn-light");
  const reportHandler = () => {
    console.log("payroll");
    history.push("/payroll");
  };
  const logoutHandler = () => {
    history.push("/login");
  };
  return (
    <div className={classes.Manager}>
      <div>
        <button onClick={reportHandler} className={classFormat.join(" ")}>
          <img src={iconManager} /> REPORT MANAGER
        </button>
      </div>
      <div>
        <button onClick={logoutHandler} className={classFormat.join(" ")}>
          <img src={iconLogout} /> LOGOUT
        </button>
      </div>
    </div>
  );
};

export default Manager;
