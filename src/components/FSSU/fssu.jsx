import React from "react";
import classes from "./FSSU.module.css";
import EmailInput from "./email/email";
import PayEndDate from "./payenddate/payenddate";
import Process from "./process/process";
import ErrorModal from "../../components/errorModalForm/errorModalForm";
import Cover from "../cover/cover";

const fssu = (props) => {
  return (
    <React.Fragment>
      <div className={classes.FSSU}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "60%",
            margin: "auto",
          }}
        >
          <div
            onClick={() => props.clicked("email")}
            id="email"
            className={
              props.fssuOption == "email"
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
              props.fssuOption == "payenddate"
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
            onClick={() => props.clicked("fssuProcess")}
            id="fssu"
            className={
              props.fssuOption == "fssuProcess"
                ? classes.SequenceActive
                : classes.Sequence
            }
          >
            <div className="text-center pt-1">3</div>
          </div>
        </div>
      </div>
      {props.fssuOption == "email" ? (
        <EmailInput
          inputChangeHandler={(eve, key) => props.inputChangeHandler(eve, key)}
          penfaceForm={props.penfaceForm.inputs}
        />
      ) : null}
      {props.fssuOption == "payenddate" ? (
        <PayEndDate
          inputChangeHandler={(eve, key) => props.inputChangeHandler(eve, key)}
          penfaceForm={props.penfaceForm.inputs}
        />
      ) : null}
      {props.fssuOption === "fssuProcess" ? (
        <Process disabled={props.disabled} processClick={props.processClick} />
      ) : null}
      {props.buildState === "failure" ? (
        <div>
          <Cover show={props.showCover} />
          <ErrorModal closeErrorModal={props.closeErrorModal}>
            FSSU Error
          </ErrorModal>
        </div>
      ) : null}
    </React.Fragment>
  );
};
export default fssu;
