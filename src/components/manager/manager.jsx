import React, { useEffect } from "react";
import classes from "./Manager.module.css";
import iconManager from "../../assets/manager.png";
import iconLogout from "../../assets/logout.png";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authResult } from "../../store/actions/index";
import Penface from "../../assets/penface.png";

const Manager = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const confirmed = useSelector((state) => state.auth.confirmed);
  const classFormat = [classes.Button];
  classFormat.push("btn");
  classFormat.push("btn-light");
  const reportHandler = () => {
    history.push("/payroll");
  };
  const logoutHandler = () => {
    dispatch(authResult(false));
    history.push("/");
  };
  useEffect(() => {
    if (!confirmed) {
      history.push("/");
    }
  });
  return (
    <React.Fragment>
      <div className={classes.Penface}>
        <img src={Penface}></img>
      </div>
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
    </React.Fragment>
  );
};

export default Manager;
