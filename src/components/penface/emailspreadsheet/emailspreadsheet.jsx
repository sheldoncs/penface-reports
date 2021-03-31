import React from "react";
import classes from "./EmailSpreadSheet.module.css";

const emailspreadsheet = (props) => {
  return (
    <div className={classes.EmailSpreadSheet}>
      <button
        disabled={props.disabled}
        onClick={props.emailSheet}
        className="btn btn-dark"
      >
        EMAIL SPREADSHEET
      </button>
      <button className="btn btn-dark">{"NEXT >"}</button>
    </div>
  );
};

export default emailspreadsheet;
