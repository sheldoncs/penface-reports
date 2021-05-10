import React, {
  useState,
  useMemo,
  useEffect,
  useContext,
  useCallback,
} from "react";
import Input from "../input/input";
import classes from "./Login.module.css";
import { LoginContext } from "../../context/login-context";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "../../store/actions/index";
import { useHistory } from "react-router-dom";
import Spin from "../../assets/loading-gif.jpg";

const Login = () => {
  const history = useHistory();
  const confirmed = useSelector((state) => state.auth.confirmed);
  const status = useSelector((state) => state.sheet.success);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [authValue, setAuthValue] = useState(false);
  const [password, setPassword] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [loading, setLoading] = useState(true);
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

  const loginHandler = useCallback(async () => {
    setSpinner(true);
    setLoading(true);
    setTimeout(() => {
      dispatch(authenticateUser(username, password));
    }, 7000);
  }, [username, password]);

  useEffect(
    useCallback(() => {
      let formKeys = Object.keys(loginForm);
      let valid = true;
      formKeys.map((field, index) => {
        valid = loginForm[field].value === "" ? false : true && valid;
        if (index === 1 && valid) {
          if (!confirmed) {
            if (!spinner) {
              setLoading(false);
            }
            console.log("loading", loading);
          }
        }
      });

      if (confirmed) {
        console.log("auth", confirmed, "build", status);
        history.push("/manager");
      }
    })
  );

  const changeHandler = (event, fieldName) => {
    event.preventDefault();
    if (fieldName === "Password") {
      loginForm.password.value = event.target.value;
      setPassword(event.target.value);
    } else if (fieldName === "Username") {
      loginForm.username.value = event.target.value;
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
            <button
              disabled={loading}
              type="button"
              onClick={loginHandler}
              className="btn btn-primary"
            >
              {"LOGIN"}
            </button>
          </div>

          <div className="text-center">
            {spinner && <img src={Spin} className={classes.Loading} />}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
