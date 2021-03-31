import React from "react";
import Input from "../../input/input";
import classes from "./PenfaceUpload.module.css";
import UploadFile from "../../../assets/upload.png";

const penfaceupload = (props) => {
  return (
    <div className={classes.Container}>
      <div className={classes.Penface}>
        <form onSubmit={props.onFileUpload}>
          <div style={{ marginTop: "-27px" }}>
            <Input
              className={classes.pos}
              key={"penfacefile"}
              changed={props.onFileUpload}
              visibility={props.penfaceForm["penfacefile"].visibility}
              elementType={props.penfaceForm["penfacefile"].elementtype}
              elementConfig={props.penfaceForm["penfacefile"].elemConfig}
              message={props.penfaceForm["penfacefile"].message}
              elementName={"penfacefile"}
              valid={props.penfaceForm["penfacefile"].valid}
              value={props.penfaceForm["penfacefile"].value}
              fileInput={props.fileInput}
            />
          </div>
        </form>
        <div>
          <button className="btn btn-dark">{"NEXT >"}</button>
        </div>
      </div>
    </div>
  );
};

export default penfaceupload;
