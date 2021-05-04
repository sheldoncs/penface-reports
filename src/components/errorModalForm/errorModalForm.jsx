import React, { useState, useEffect } from "react";
import classes from "./ErrorModalForm.module.css";

const ErrorModalForm = React.memo((props) => {
  const { errorMessage } = props;
  const [error, setError] = useState("");

  useEffect(() => {
    setError(props.errorMessage);
  }, [error, errorMessage]);

  return (
    <div className={classes.ErrorModalForm}>
      <div className={classes.Title}>{props.children}</div>
      <div className={classes.Body}>{error}</div>
      <div className={classes.Button}>
        <div onClick={props.closeErrorModal} className="btn btn-danger">
          Close
        </div>
      </div>
    </div>
  );
});

export default ErrorModalForm;
