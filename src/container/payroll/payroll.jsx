import React, { Component } from "react";
import RadioOptions from "../../components/radiooptions/radiooptions";
import Penface from "../../components/penface/penface";
import Spinner from "../../components/Spinner/Spinner";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import classes from "./Payroll.module.css";
import Cover from "../../components/cover/cover";
import FSSU from "../../components/FSSU/fssu";
import BannerJournal from "../../components/bannerjournal/bannerJournal";
import Menu from "../../components/menu/menu";

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
          originalValue: "",
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
    bannerJournalOption: "email",
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
    if (!this.props.confirmed) {
      console.log("confirmed", this.props.confirmed);
      this.props.history.push("/");
    }
  }
  penfaceHandler = (val) => {
    let tempState = { ...this.state };

    this.setState({ ...tempState, option: val });
  };
  closeErrorModalHandler = () => {
    this.setState({ buildState: "", openCover: false });
  };
  fssuHandler = (val) => {
    let tempState = { ...this.state };
    this.setState({ ...tempState, fssuOption: val });
  };
  bannerJournalHandler = (val) => {
    let tempState = { ...this.state };
    this.setState({ ...tempState, bannerJournalOption: val });
  };
  processBannerJournalHandler = () => {
    let tempState = { ...this.state };
    this.setState({ buildStart: true, openCover: true });
    this.props.onProcessBannerJournal(
      tempState.penfaceForm.inputs["email"].value,
      tempState.penfaceForm.inputs["payenddate"].value
    );
    this.state.myVar = setInterval(() => {
      this.checkBuild("banner");
    }, 5000);
  };
  processFSSUHandler = () => {
    let tempState = { ...this.state };
    this.setState({ buildStart: true, openCover: true });

    this.props.onProcessFSSUReport(
      tempState.penfaceForm.inputs.email.value,
      tempState.penfaceForm.inputs.payenddate.value
    );
    this.state.myVar = setInterval(() => {
      this.checkBuild("fssu");
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
          key === "payenddate"
            ? this.formattedDate(event.target.value)
            : event.target.value;
        if (key === "payenddate") {
          tempState.inputs[key].originalValue = event.target.value;
        }
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

    this.props.onBuildSheet(
      this.state.penfaceForm.inputs.email.value,
      this.state.penfaceForm.inputs.payenddate.value
    );
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
      tempState.buildStart = false;
      tempState.errorMessage = "Network Service Issue!";
      this.props.onBuildFailed("failure");
      this.stopInterval(tempState);
    }
    if (this.props.success === "success") {
      tempState.buildStart = false;
      tempState.openCover = false;
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
      if (tempState.nextProcess == "emailFile") {
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
      if (tempState.nextProcess == "emailFile") {
        tempState.disableSend = true;
      } else if (tempState.nextProcess == "processSheet") {
        tempState.disableProcess = true;
      } else if (tempState.nextProcess == "finalReport") {
        tempState.disableFinalReport = true;
      } else if (tempState.nextProcess == "last") {
        tempState.disableFinalReport = true;
        tempState.disableSend = true;
        tempState.disableProcess = true;
      } else if (tempState.nextProcess == "fssu") {
        tempState.disableFSSUReport = true;
      }
    }
    clearInterval(this.state.myVar);
    this.setState({
      openCover: false,
      buildStart: false,
      ...tempState,
    });
  };

  render() {
    return (
      <React.Fragment>
        <Menu />
        {this.state.openCover ? <Cover show={this.state.openCover} /> : null}
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
              showCover={this.state.showCover}
              processClick={this.processFSSUHandler}
              disabled={this.state.disableFSSUReport}
              inputChangeHandler={this.changeHandler}
              reports={this.state.reports}
              buildState={this.state.buildState}
              closeErrorModal={this.closeErrorModalHandler}
              errorMessage={this.state.errorMessage}
            />
          ) : this.state.reports === "bannerJournalRadio" ? (
            <BannerJournal
              penfaceForm={this.state.penfaceForm}
              clicked={this.bannerJournalHandler}
              inputChangeHandler={this.changeHandler}
              openCover={this.props.openCover}
              disabled={this.state.disableBannerJournalReport}
              bannerJournalOption={this.state.bannerJournalOption}
              closeErrorModal={this.closeErrorModalHandler}
              processClick={this.processBannerJournalHandler}
              closeErrorModal={this.closeErrorModalHandler}
              buildState={this.state.buildState}
              errorMessage={this.state.errorMessage}
            />
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    success: state.sheet.success,
    confirmed: state.auth.confirmed,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onProcessBannerJournal: (dateStr, email) =>
      dispatch(actionCreators.processBannerJournal(dateStr, email)),
    onProcessFinalReport: (email, dateStr) =>
      dispatch(actionCreators.processFinalReport(email, dateStr)),
    onProcessFSSUReport: (email, dateStr) =>
      dispatch(actionCreators.processFSSUReport(email, dateStr)),
    onProcessSheet: () => dispatch(actionCreators.processSpreadSheet()),
    onUploadSheet: (formdata) =>
      dispatch(actionCreators.uploadSpreadSheet(formdata)),
    onBuildStart: () => dispatch(actionCreators.buildStart()),
    onEmailSheet: (email) => dispatch(actionCreators.emailSpreadSheet(email)),
    onBuildSheet: (email, dateStr) =>
      dispatch(actionCreators.buildSpreadSheet(email, dateStr)),
    onBuildFailed: (result) => dispatch(actionCreators.buildFailed(result)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Payroll);
