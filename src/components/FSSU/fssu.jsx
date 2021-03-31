import React from "react";
import classes from "../penface/Penface.module.css";

const fssu = (props) => {
  return (
    <div className={classes.fssu}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <div
          onClick={() => props.clicked("email")}
          id="email"
          className={
            props.selectedOption == "email"
              ? classes.SequenceActive
              : classes.Sequence
          }
        >
          <div className="text-center pt-1">1</div>
        </div>
        <div className={classes.Arrow}>
          <div className={classes.Line}></div>
          <div className={classes.Point}></div>
        </div>
        <div
          onClick={() => props.clicked("payenddate")}
          id="payenddate"
          className={
            props.selectedOption == "payenddate"
              ? classes.SequenceActive
              : classes.Sequence
          }
        >
          <div className="text-center pt-1">2</div>
        </div>
        <div className={classes.Arrow}>
          <div className={classes.Line}></div>
          <div className={classes.Point}></div>
        </div>
        <div
          onClick={() => props.clicked("fssu")}
          id="fssu"
          className={
            props.selectedOption == "fssu"
              ? classes.SequenceActive
              : classes.Sequence
          }
        >
          <div className="text-center pt-1">3</div>
        </div>
      </div>
    </div>
  );
};
export default fssu;
