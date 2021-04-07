import React, { Component } from "react";
import RadioOptions from "../../components/radiooptions/radiooptions";
import Penface from "../../components/penface/penface";
import Spinner from "../../components/Spinner/Spinner";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import classes from "./Payroll.module.css";
import Cover from "../../components/cover/cover";
import FSSU from "../../components/FSSU/fssu";

class Payroll extends Component {
  state = {
    myVar: null,
    penfaceForm: {
      inputs: {
        email: {
          elementtype: "input",
          visibility: "visible",
          elemConfig: { type: "text", placeholder: "" },
          value: "",
          name: "email",
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
          exist: false,
        },
        penfacefile: {
          elementtype: "file",
          visibility: "visible",
          elemConfig: { type: "file", placeholder: "" },
          value: "",
          name: "penfacefile",
          selectedFile: null,
          fileInput: null,
          message: "no file chosen",
          validation: {
            required: true,
          },
          valid: true,
          touched: false,
          exist: false,
        },
        payenddate: {
          elementtype: "date",
          visibility: "visible",
          elemConfig: { type: "date", placeholder: "date" },
          value: "",
          name: "payenddate",
          validation: {
            required: true,
            regExpression: /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/,
          },
          valid: false,
          touched: false,
          exist: false,
        },
      },
      penfaceRadio: {
        elementtype: "radio",
        elemConfig: { type: "radio" },
        value: "Penface",
        name: "reportOptions",
        validation: {
          required: true,
        },
        valid: true,
        touched: false,
        exist: false,
        // checked: false,
      },
      fssuRadio: {
        elementtype: "radio",
        elemConfig: { type: "radio" },
        value: "FSSU",
        name: "reportOptions",
        validation: {
          required: true,
        },
        valid: true,
        touched: false,
        exist: false,
        // checked: false,
      },
      bannerJournalRadio: {
        elementtype: "radio",
        elemConfig: { type: "radio" },
        value: "BannerJournal",
        name: "reportOptions",
        validation: {
          required: true,
        },
        valid: true,
        touched: false,
        exist: false,
        // checked: false,
      },
    },
    reports: "penfaceRadio",
    option: "email",
    disableBuild: true,
    disableSend: true,
    openCover: false,
    disableProcess: true,
    disableFinalReport: true,
    buildState: null,
    buildStart: false,
    myref: null,
    fssuOption: "email",
    disableFSSUReport: true,
    disableBannerJournalReport: true,
    errorMessage: null,
    nextProcess: "",
  };
  handleChange = (e) => {
    let tempState = { ...this.state };

    if (e.target.files.length) {
      tempState.setImage.preview = URL.createObjectURL(e.target.files[0]);
      tempState.setImage.raw = e.target.files[0];
      tempState.imageSet = true;
      this.setState({
        setImage: tempState.setImage,
        imageSet: tempState.imageSet,
      });
    }
  };
  onFileChange = (event) => {
    let tempState = { ...this.state };
    tempState.penfaceForm.inputs["penfacefile"].selectedFile =
      event.target.files[0];
    console.log("event.target.files[0]", event.target.files[0]);
    this.setState({ ...tempState });

    // Update the state
  };
  onFileUpload = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.target.files[0]);

    // Create an object of formData
    let tempState = { ...this.state };
    tempState.penfaceForm.inputs["penfacefile"].selectedFile =
      e.target.files[0];

    const formData = new FormData();

    // Update the formData object
    formData.append(
      "penfacefile",
      tempState.penfaceForm.inputs["penfacefile"].selectedFile,
      tempState.penfaceForm.inputs["penfacefile"].selectedFile.name
    );
    tempState.penfaceForm.inputs["penfacefile"].message =
      tempState.penfaceForm.inputs["penfacefile"].selectedFile.name;
    this.props.onUploadSheet(formData);
    this.setState({ buildStart: true, openCover: true });
    this.state.myVar = setInterval(() => {
      this.checkBuild("processSheet");
    }, 5000);
  };
  handleFiles() {
    const fileList = this.files; /* now you can work with the file list */
  }
  checkValidity(value, rules) {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    let dte = this.formattedDate(value);
    if (rules.regExpression) {
      const testExpress = new RegExp(rules.regExpression);
      let regexValid = testExpress.test(dte);
      isValid = regexValid && isValid;
    }

    return isValid;
  }
  formattedDate(value) {
    let d = new Date(value);
    let mth = this.appendLeadingZeroes(d.getMonth() + 1);
    let day = this.appendLeadingZeroes(d.getDate() + 1);
    let year = d.getFullYear();

    let dte = mth + "/" + day + "/" + year;
    return dte;
  }
  appendLeadingZeroes(n) {
    if (n <= 9) {
      return "0" + n;
    }
    return n;
  }
  componentDidMount() {
    let tempState = { ...this.state };
    this.setState({ ...tempState });
  }
  penfaceHandler = (val) => {
    let tempState = { ...this.state };

    this.setState({ ...tempState, option: val });
  };
  closeErrorModalHandler = () => {
    this.setState({ buildState: "" });
  };
  fssuHandler = (val) => {
    let tempState = { ...this.state };
    this.setState({ ...tempState, fssuOption: val });
  };
  processFSSUHandler = () => {
    let tempState = { ...this.state };
    this.setState({ buildStart: true, openCover: true });
    this.onProcessFSSUReport(tempState.penfaceForm.inputs.payenddate.value);
    this.state.myVar = setInterval(() => {
      this.checkBuild("last");
    }, 5000);
  };
  setFileInput = (r) => {
    this.state.myref = r;
  };
  changeHandler = (event, key) => {
    let tempState = { ...this.state.penfaceForm };

    if (key.indexOf("Radio") < 0) {
      let isValid = this.checkValidity(
        event.target.value,
        tempState.inputs[key].validation
      );

      tempState.inputs[key].valid = isValid;
      if (isValid) {
        tempState.inputs[key].value =
          key == "payenddate"
            ? this.formattedDate(event.target.value)
            : event.target.value;
        this.setState({ ...tempState, disableBuild: false });
      }
    } else if (key.indexOf("Radio") >= 0) {
      this.setState({ reports: key });
    }

    if (
      this.state.reports.indexOf("fssuRadio") >= 0 ||
      this.state.reports.indexOf("bannerJournalRadio") >= 0
    ) {
      if (
        tempState.inputs["email"].valid &&
        tempState.inputs["payenddate"].valid
      ) {
        if (this.state.reports == "fssuRadio") {
          this.setState({ disableFSSUReport: false });
        } else if (this.state.reports == "bannerJournalRadio") {
          this.setState({ disableBannerJournalReport: false });
        }
      }
    }
  };

  buildSpreadSheet = () => {
    let tempState = { ...this.state };

    this.props.onBuildSheet(this.state.penfaceForm.inputs.payenddate.value);
    this.setState({ buildStart: true, openCover: true });
    this.state.myVar = setInterval(() => {
      this.checkBuild("emailFile");
    }, 5000);
  };

  checkBuild = (nextProcess) => {
    let tempState = { ...this.state };
    tempState.nextProcess = nextProcess;
    console.log("checkBuild", this.props.success);
    tempState.buildState = "success";

    if (this.props.success === "failure") {
      console.log(this.props.success);
      tempState.buildState = "failure";
      tempState.errorMessage = "Network Service Issue!";
      this.props.onBuildFailed("failure");
      this.stopInterval(tempState);
    }
    if (this.props.success === "success") {
      this.stopInterval(tempState);
    }
  };
  emailSheet = (email) => {
    this.setState({ buildStart: true });
    this.props.onEmailSheet(email);
    this.setState({ buildStart: true, openCover: true });
    this.state.myVar = setInterval(() => {
      this.checkBuild("upload");
    }, 5000);
  };
  processSheet = () => {
    this.setState({ buildStart: true });
    this.props.onProcessSheet();
    this.setState({ buildStart: true, openCover: true });
    this.state.myVar = setInterval(() => {
      this.checkBuild("finalReport");
    }, 5000);
  };
  processFinalReport = () => {
    let tempState = { ...this.state };
    this.setState({ buildStart: true, openCover: true });
    let inputs = tempState.penfaceForm.inputs;
    if (inputs["email"].value != "" && inputs["payenddate"].value != "") {
      this.props.onProcessFinalReport(
        inputs["email"].value,
        inputs["payenddate"].value
      );
      this.setState({ buildStart: true, openCover: true });
      this.state.myVar = setInterval(() => {
        this.checkBuild("last");
      }, 5000);
    }
  };
  stopInterval = (tempState) => {
    if (tempState.buildState == "success") {
      if (tempState.nextProcess == "sendFile") {
        tempState.disableSend = false;
      } else if (tempState.nextProcess == "processSheet") {
        tempState.disableProcess = false;
      } else if (tempState.nextProcess == "finalReport") {
        tempState.disableFinalReport = false;
      } else if (tempState.nextProcess == "last") {
        tempState.disableFinalReport = false;
        tempState.disableSend = false;
        tempState.disableProcess = false;
      }
    } else if (tempState.buildState == "failure") {
      if (tempState.nextProcess == "sendFile") {
        tempState.disableSend = true;
      } else if (tempState.nextProcess == "processSheet") {
        tempState.disableProcess = true;
      } else if (tempState.nextProcess == "finalReport") {
        tempState.disableFinalReport = true;
      } else if (tempState.nextProcess == "last") {
        tempState.disableFinalReport = true;
        tempState.disableSend = true;
        tempState.disableProcess = true;
      }
    }
    clearInterval(this.state.myVar);
    this.setState({
      openCover: false,
      buildStart: false,
      disableFSSUReport: true,
      ...tempState,
    });
  };

  render() {
    return (
      <React.Fragment>
        <Cover show={this.state.openCover} />
        <div className={classes.CenterSpinner}>
          {this.state.buildStart === true ? <Spinner /> : null}
        </div>
        <div className={classes.Payroll}>
          <RadioOptions
            inputChangeHandler={this.changeHandler}
            penfaceForm={this.state.penfaceForm}
            reports={this.state.reports}
          />
          {this.state.reports === "penfaceRadio" ? (
            <Penface
              penfaceForm={this.state.penfaceForm}
              selectedOption={this.state.option}
              disableBuild={this.state.disableBuild}
              disableSend={this.state.disableSend}
              disableProcess={this.state.disableProcess}
              disableFinalReport={this.state.disableFinalReport}
              emailSheet={(email) => this.emailSheet(email)}
              processFinalReport={() => this.processFinalReport()}
              processSheet={() => this.processSheet()}
              clicked={(val) => this.penfaceHandler(val)}
              buildSpreadSheet={() => this.buildSpreadSheet()}
              buildState={this.state.buildState}
              onFileChange={(event) => this.onFileChange(event)}
              onFileUpload={this.onFileUpload}
              fileInput={this.setFileInput}
              closeErrorModal={this.closeErrorModalHandler}
              errorMessage={this.state.errorMessage}
              inputChangeHandler={(eve, key) => this.changeHandler(eve, key)}
            />
          ) : this.state.reports === "fssuRadio" ? (
            <FSSU
              fssuOption={this.state.fssuOption}
              penfaceForm={this.state.penfaceForm}
              clicked={this.fssuHandler}
              processClick={this.processFSSUHandler}
              disabled={this.state.disableFSSUReport}
              inputChangeHandler={this.changeHandler}
              reports={this.state.reports}
              buildState={this.state.buildState}
              closeErrorModal={this.closeErrorModalHandler}
            />
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    success: state.success,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onProcessFinalReport: (email, dateStr) =>
      dispatch(actionCreators.processFinalReport(email, dateStr)),
    onProcessFSSUReport: (dateStr) =>
      dispatch(actionCreators.processFSSUReport(dateStr)),
    onProcessSheet: () => dispatch(actionCreators.processSpreadSheet()),
    onUploadSheet: (formdata) =>
      dispatch(actionCreators.uploadSpreadSheet(formdata)),
    onBuildStart: () => dispatch(actionCreators.buildStart()),
    onEmailSheet: (email) => dispatch(actionCreators.emailSpreadSheet(email)),
    onBuildSheet: (dateStr) =>
      dispatch(actionCreators.buildSpreadSheet(dateStr)),
    onBuildFailed: (result) => dispatch(actionCreators.buildFailed(result)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Payroll);
