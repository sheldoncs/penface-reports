import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <div>
      <button
        btntype={props.btntype}
        onClick={props.clicked}
        className={[classes.Button, classes[props.btntype]].join(" ")}
      >
        {props.children}
      </button>
    </div>
  );
};

export default Button;
