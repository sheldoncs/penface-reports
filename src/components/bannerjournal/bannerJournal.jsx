import React from "react";
import EmailInput from "./email/email";
import PayEndDate from "./payenddate/payenddate";
import Process from "./process/process";
import ErrorModal from "../../components/errorModalForm/errorModalForm";
import classes from "./BannerJournal.module.css";
import Cover from "../cover/cover";

const bannerJournal = (props) => {
  return (
    <React.Fragment>
      <div className={classes.BannerJournal}>
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
              props.bannerJournalOption == "email"
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
              props.bannerJournalOption == "payenddate"
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
            onClick={() => props.clicked("bannerJournalProcess")}
            id="bannerJournal"
            className={
              props.bannerJournalOption == "bannerJournalProcess"
                ? classes.SequenceActive
                : classes.Sequence
            }
          >
            <div className="text-center pt-1">3</div>
          </div>
        </div>
      </div>
      {props.bannerJournalOption == "email" ? (
        <EmailInput
          inputChangeHandler={(eve, key) => props.inputChangeHandler(eve, key)}
          penfaceForm={props.penfaceForm.inputs}
        />
      ) : null}
      {props.bannerJournalOption == "payenddate" ? (
        <PayEndDate
          inputChangeHandler={(eve, key) => props.inputChangeHandler(eve, key)}
          penfaceForm={props.penfaceForm.inputs}
        />
      ) : null}
      {props.bannerJournalOption === "bannerJournalProcess" ? (
        <Process disabled={props.disabled} processClick={props.processClick} />
      ) : null}
      {props.buildState === "failure" ? (
        <div>
          <Cover show={props.showCover} />
          <ErrorModal
            closeErrorModal={props.closeErrorModal}
            errorMessage={props.errorMessage}
          >
            FSSU Error
          </ErrorModal>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default bannerJournal;
