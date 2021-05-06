import React, { useCallback, useContext, useEffect, useState } from "react";
import classes from "./Menu.module.css";
import Logout from "../../assets/logout.png";
import Close from "../../assets/close.png";
import { LoginContext } from "../../context/login-context";
import { useHistory } from "react-router-dom";
import { FINAL_REPORT } from "../../store/actions/actionTypes";

const Menu = React.memo((props) => {
  const history = useHistory();
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
    
    history.push("/");
  };
  return (
    <div className={classes.Menu}>
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
