import React from "react";
import classes from "./RadioOptions.module.css";
import Input from "../input/input";

const RadioOptions = (props) => {
  return (
    <div className={classes.RadioOptions}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "30%",
          margin: "auto",
        }}
      >
        <label className="text-center" htmlFor="penface">
          Penface
        </label>
        <Input
          id="penface"
          key={"penface"}
          changed={(event) => {
            props.inputChangeHandler(event, "penfaceRadio");
          }}
          visibility={props.penfaceForm["penfaceRadio"].visibility}
          elementType={props.penfaceForm["penfaceRadio"].elementtype}
          elementConfig={props.penfaceForm["penfaceRadio"].elemConfig}
          elementName={props.penfaceForm["penfaceRadio"].name}
          dispValue={props.penfaceForm["penfaceRadio"].value}
          name={props.penfaceForm["penfaceRadio"].name}
          valid={props.penfaceForm["penfaceRadio"].valid}
          checked={props.reports === "penfaceRadio" ? true : false}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "30%",
          margin: "auto",
        }}
      >
        <label className="text-center" htmlFor="fssu">
          FSSU
        </label>
        <Input
          id="fssu"
          key={"fssu"}
          changed={(event) => {
            props.inputChangeHandler(event, "fssuRadio");
          }}
          visibility={props.penfaceForm["fssuRadio"].visibility}
          elementType={props.penfaceForm["fssuRadio"].elementtype}
          elementConfig={props.penfaceForm["fssuRadio"].elemConfig}
          elementName={props.penfaceForm["fssuRadio"].name}
          dispValue={props.penfaceForm["fssuRadio"].value}
          name={props.penfaceForm["fssuRadio"].name}
          valid={props.penfaceForm["fssuRadio"].valid}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "30%",
          margin: "auto",
        }}
      >
        <label className="text-center" htmlFor="bannerJournalRadio">
          Banner Journal
        </label>
        <Input
          id="bannerJournal"
          key={"bannerJournal"}
          changed={(event) => {
            props.inputChangeHandler(event, "bannerJournalRadio");
          }}
          visibility={props.penfaceForm["bannerJournalRadio"].visibility}
          elementType={props.penfaceForm["bannerJournalRadio"].elementtype}
          elementConfig={props.penfaceForm["bannerJournalRadio"].elemConfig}
          elementName={props.penfaceForm["bannerJournalRadio"].name}
          dispValue={props.penfaceForm["bannerJournalRadio"].value}
          name={props.penfaceForm["bannerJournalRadio"].name}
          valid={props.penfaceForm["bannerJournalRadio"].valid}
        />
      </div>
    </div>
  );
};

export default RadioOptions;
