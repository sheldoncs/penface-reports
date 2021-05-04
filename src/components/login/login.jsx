import React, { useState, useMemo, useEffect, useContext } from "react";
import Input from "../input/input";
import classes from "./Login.module.css";
import { LoginContext } from "../../context/login-context";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "../../store/actions/index";

const Login = () => {
  let loginContext = useContext(LoginContext);
  const auth = useSelector((state) => state.auth.result);
  const status = useSelector((state) => state.sheet.success);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [authInterval, setAuthInterval] = useState(null);
  const [password, setPassword] = useState("");
  const [loginForm, setLoginForm] = useState({
    username: {
      elementType: "input",
      visibility: "visible",
      elementConfig: { type: "text", placeholder: "" },
      elementName: "Username",
      value: "",
      validation: {
        required: true,
        minLength: 8,
      },
      exist: false,
      valid: false,
      touched: false,
    },

    password: {
      elementType: "input",
      elementConfig: { type: "password", placeholder: "" },
      value: "",
      elementName: "Password",
      validation: {
        required: true,
        minLength: 8,
      },
      valid: false,
      touched: false,
      exist: false,
    },
  });

  let btnClasses = [classes.Button];
  btnClasses.push("btn");
  btnClasses.push("btn-primary");

  const loginHandler = () => {
    dispatch(authenticateUser(username, password));
    setAuthInterval(
      setInterval(() => {
        console.log("auth", auth, "build", status);
        if (auth === true) {
          stopInterval();
        }
      }, 2000)
    );
  };

  const stopInterval = () => {
    clearInterval(authInterval);
  };
  useEffect(() => {
    if (auth === true) {
      stopInterval();
      loginContext.login();
    }
  }, [auth]);
  const changeHandler = (event, fieldName) => {
    event.preventDefault();
    if (fieldName == "password") {
      setPassword(event.target.value);
    } else {
      setUsername(event.target.value);
    }
  };
  const handleFocus = (e) => {};
  const setupForm = useMemo(() => {
    let formKeys = Object.keys(loginForm);
    let fields = formKeys.map((value, index) => {
      return (
        <div className={classes.Login} key={index}>
          <div style={{ paddingLeft: "10px", fontWeight: "bold" }}>
            {loginForm[value].elementName}
          </div>
          <Input
            defaultFocus={
              loginForm[value].elementName === "Username" ? true : false
            }
            handleFocus={(event) => handleFocus(event)}
            visibility={loginForm[value].visibility}
            elementType={loginForm[value].elementType}
            changed={(e) => changeHandler(e, loginForm[value].elementName)}
            elementName={loginForm[value].elementName}
            elementConfig={loginForm[value].elementConfig}
            id={index}
          />
        </div>
      );
    });

    return fields;
  }, []);

  return (
    <div className={classes.Container}>
      <div className={classes.Title}>PENFACE LOGIN</div>
      <div>
        <form>
          <div>{setupForm}</div>
          <div style={{ marginLeft: "20px" }}>
            <div onClick={loginHandler} className={btnClasses.join(" ")}>
              {"LOGIN"}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
