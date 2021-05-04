import React from "react";
import Input from "../../input/input";
import classes from "./PayEndDate.module.css";

const payenddate = (props) => {
  return (
    <div className={classes.Container}>
      <div className={classes.PayEndDate}>
        <div
          style={{ paddingLeft: "10px", fontSize: "12px", fontWeight: "bold" }}
        >
          Pay End Date
        </div>
        <div style={{ marginTop: "-27px" }}>
          <Input
            className={classes.pos}
            key={"payenddate"}
            changed={(event) => {
              props.inputChangeHandler(event, "payenddate");
            }}
            visibility={props.penfaceForm["payenddate"].visibility}
            elementType={props.penfaceForm["payenddate"].elementtype}
            elementConfig={props.penfaceForm["payenddate"].elemConfig}
            elementName={"payenddate"}
            valid={props.penfaceForm["payenddate"].valid}
          />
        </div>
      </div>
      <button
        disabled={props.disableBuild}
        onClick={props.clicked}
        className="btn btn-dark"
      >
        {"NEXT  >"}
      </button>
    </div>
  );
};

export default payenddate;
