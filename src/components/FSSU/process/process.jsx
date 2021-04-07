import React from "react";
import classes from "./Process.module.css";

const process = (props) => {
  return (
    <div className={classes.Process}>
      <button
        disabled={props.disabled}
        onClick={props.processClick}
        className="btn btn-dark"
      >
        PROCESS
      </button>
    </div>
  );
};

export default process;
