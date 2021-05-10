import React from "react";
import classes from "./ProcessSpreadSheet.module.css";

const processspreadsheet = (props) => {
  return (
    <div className={classes.ProcessSpreadSheet}>
      <button
        disabled={props.disabled}
        onClick={props.processSheet}
        className="btn btn-primary"
      >
        PROCESS SPREADSHEET
      </button>
    </div>
  );
};

export default processspreadsheet;
