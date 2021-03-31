import React from "react";
import Input from "../../input/input";
import classes from "./Email.module.css";

const email = (props) => {
  return (
    <div className={classes.Container}>
      <div className={classes.Email}>
        <div
          style={{ paddingLeft: "10px", fontSize: "12px", fontWeight: "bold" }}
        >
          Email
        </div>
        <div style={{ marginTop: "-27px" }}>
          <Input
            className={classes.pos}
            key={"email"}
            changed={(event) => {
              props.inputChangeHandler(event, "email");
            }}
            visibility={props.penfaceForm["email"].visibility}
            elementType={props.penfaceForm["email"].elementtype}
            elementConfig={props.penfaceForm["email"].elemConfig}
            elementName={"email"}
            valid={props.penfaceForm["email"].valid}
            value={props.penfaceForm["email"].value}
          />
        </div>
      </div>
      <button className="btn btn-dark">{"NEXT >"}</button>
    </div>
  );
};

export default email;
