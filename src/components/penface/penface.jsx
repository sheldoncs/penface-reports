import React from "react";
import classes from "./Penface.module.css";
import EmailInput from "./email/email";
import PayEndDateInput from "./payenddate/payenddate";
import SendSheet from "./emailspreadsheet/emailspreadsheet";
import ProcessSpreadSheet from "./processspreadsheet/processspreadsheet";
import FinalReport from "./finalreport/finalreport";

import Upload from "./penfaceupload/penfaceupload";

const penface = (props) => {
  let addSheet = true;
  let title = "ENTER EMAIL";

  return (
    <React.Fragment>
      <div className={classes.Penface}>
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
          onClick={() => props.clicked("buildspreadsheet")}
          id="spreadsheet"
          className={
            props.selectedOption == "buildspreadsheet"
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
          onClick={() => props.clicked("sendspreadsheet")}
          id="sendspreadsheet"
          className={
            props.selectedOption == "sendspreadsheet"
              ? classes.SequenceActive
              : classes.Sequence
          }
        >
          <div className="text-center pt-1">3</div>
        </div>
        <div className={classes.Arrow}>
          <div className={classes.Line}></div>
          <div className={classes.Point}></div>
        </div>
        <div
          id="uploadNewSpreadSheet"
          onClick={() => props.clicked("upload")}
          className={
            props.selectedOption == "upload"
              ? classes.SequenceActive
              : classes.Sequence
          }
        >
          <div className="text-center pt-1">4</div>
        </div>
        <div className={classes.Arrow}>
          <div className={classes.Line}></div>
          <div className={classes.Point}></div>
        </div>
        <div
          id="processNewSheet"
          onClick={() => props.clicked("processNewSheet")}
          className={
            props.selectedOption == "processNewSheet"
              ? classes.SequenceActive
              : classes.Sequence
          }
        >
          <div className="text-center pt-1">5</div>
        </div>
        <div className={classes.Arrow}>
          <div className={classes.Line}></div>
          <div className={classes.Point}></div>
        </div>
        <div
          id="sendNewEmail"
          onClick={() => props.clicked("finalreport")}
          className={
            props.selectedOption == "finalreport"
              ? classes.SequenceActive
              : classes.Sequence
          }
        >
          <div className="text-center pt-1">6</div>
        </div>
      </div>
      {props.selectedOption == "email" ? (
        <EmailInput
          inputChangeHandler={(eve, key) => props.inputChangeHandler(eve, key)}
          penfaceForm={props.penfaceForm.inputs}
        />
      ) : null}

      {props.selectedOption == "buildspreadsheet" ? (
        <PayEndDateInput
          clicked={() => props.buildSpreadSheet()}
          success={props.success}
          disableBuild={props.disableBuild}
          inputChangeHandler={(eve, key) => props.inputChangeHandler(eve, key)}
          penfaceForm={props.penfaceForm.inputs}
        />
      ) : null}
      {props.selectedOption == "sendspreadsheet" ? (
        <SendSheet
          disabled={props.disableBuild}
          emailSheet={() =>
            props.emailSheet(props.penfaceForm.inputs["email"].value)
          }
        />
      ) : null}
      {props.selectedOption == "upload" ? (
        <div>
          <label htmlFor="penfacefile"></label>
          <Upload
            onFileChange={(eve) => props.onFileChange(eve)}
            onFileUpload={props.onFileUpload}
            fileInput={props.fileInput}
            penfaceForm={props.penfaceForm.inputs}
          />
        </div>
      ) : null}
      {props.selectedOption == "processNewSheet" ? (
        <ProcessSpreadSheet
          disabled={props.disableProcess}
          processSheet={() => props.processSheet()}
        />
      ) : null}
      {props.selectedOption == "finalreport" ? (
        <FinalReport
          disabled={props.disableFinalReport}
          processFinalReport={() => props.processFinalReport()}
        />
      ) : null}
    </React.Fragment>
  );
};

export default penface;
