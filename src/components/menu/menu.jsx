import React, { useCallback, useContext, useEffect, useState } from "react";
import classes from "./Menu.module.css";
import Logout from "../../assets/logout.png";
import Close from "../../assets/close.png";
import { LoginContext } from "../../context/login-context";
import { useHistory } from "react-router-dom";
import { FINAL_REPORT } from "../../store/actions/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { authResult } from "../../store/actions/index";

const Menu = React.memo((props) => {
  const confirmed = useSelector((state) => state.auth.confirmed);
  const history = useHistory();
  const dispatch = useDispatch();
  let loginContext = useContext(LoginContext);
  const formatClasses = [classes.Button];
  formatClasses.push("btn");
  formatClasses.push("btn-light");

  const [auth, setAuth] = useState(true);

  useEffect(
    useCallback(() => {
      loginContext.logout();
    })
  );
  const closeHandler = () => {
    history.push("/manager");
  };
  const logoutHandler = () => {
    dispatch(authResult(false));
    history.push("/");
  };
  return (
    <div className={classes.Menu}>
      <div className={classes.TitleContainer}>
        <div className={classes.Title}>REPORT MANAGER</div>
        <div className={classes.SubTitle}>PENFACE, FSSU, BANNER JOURNAL</div>
      </div>
      <div className={classes.IconContainer}>
        <button onClick={logoutHandler} className={formatClasses.join(" ")}>
          <img src={Logout} />
          LOGOUT
        </button>
        <button onClick={closeHandler} className={formatClasses.join(" ")}>
          <img src={Close} />
          CLOSE
        </button>
      </div>
    </div>
  );
});
export default Menu;
