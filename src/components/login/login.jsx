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
import ErrorModal from "../errorModalForm/errorModalForm";
import Spin from "../../assets/loading-gif.jpg";
import Cover from "../cover/cover";
import Penface from "../../assets/penface.png";
const Login = () => {
  const history = useHistory();
  const confirmed = useSelector((state) => state.auth.confirmed);
  const status = useSelector((state) => state.sheet.success);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const [btnClasses, setBtnClasses] = useState([
    classes.Button,
    "btn",
    "btn-success",
    "btn-login",
  ]);

  const [closeErrorModal, setCloseErrorModal] = useState({
    buildState: "",
    openCover: false,
  });
  const [errorMessage, setErrorMessage] = useState("Incorrect Login!");
  const [buildState, setBuildState] = useState("failure");
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
  let timer = null;

  const loginHandler = useCallback(async () => {
    setSpinner(true);
    setLoading(true);

    dispatch(authenticateUser(username, password));
    timer = setTimeout(() => {
      if (!confirmed) {
        setShowError(true);
        setLoading(false);
      }
    }, 5000);
  }, [username, password]);

  useEffect(() => {
    return () => clearTimeout(timer);
  }, [timer]);

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
  const closeErrorModalHandler = () => {
    setShowError(false);
    setLoading(false);
    setSpinner(false);
    setCloseErrorModal({ buildState: "", openCover: false });
  };
  const handleFocus = (e) => {};
  const setupForm = useMemo(() => {
    let formKeys = Object.keys(loginForm);
    let fields = formKeys.map((value, index) => {
      return (
        <div className={classes.Login} key={index}>
          <div className={classes.Label}>{loginForm[value].elementName}</div>
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
    <React.Fragment>
      <div className={classes.Penface}>
        <img src={Penface}></img>
      </div>
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
                className={btnClasses.join(" ")}
              >
                {"LOGIN"}
              </button>
            </div>

            <div className="text-center">
              {spinner && <img src={Spin} className={classes.Loading} />}
            </div>
            <div>
              <div>
                {showError && <Cover show={showError} />}
                {showError && (
                  <ErrorModal
                    closeErrorModal={closeErrorModalHandler}
                    errorMessage={errorMessage}
                    buildState={buildState}
                  >
                    Penface Error
                  </ErrorModal>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
