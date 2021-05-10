import React from "react";
import classes from "./FinalReport.module.css";

const finalreport = (props) => {
  console.log("finalreport", props.disabled);
  return (
    <div className={classes.FinalReport}>
      <button
        disabled={props.disabled}
        onClick={props.processFinalReport}
        className="btn btn-primary"
      >
        PROCESS FINAL REPORT
      </button>
    </div>
  );
};

export default finalreport;
