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
          valid: true,
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
          valid: true,
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
    openCover: false,
    disableProcess: true,
    disableFinalReport: true,
    buildState: null,
    buildStart: false,
    myref: null,
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
    this.state.myVar = setInterval(this.checkUpload, 5000);
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
  setFileInput = (r) => {
    this.state.myref = r;
  };
  changeHandler = (event, key) => {
    let tempState = { ...this.state.penfaceForm };
    console.log(key);
    if (key.indexOf("Radio") < 0) {
      let isValid = this.checkValidity(
        event.target.value,
        tempState.inputs[key].validation
      );

      if (isValid) {
        tempState.inputs[key].value =
          key == "payenddate"
            ? this.formattedDate(event.target.value)
            : event.target.value;

        this.setState({ ...tempState, disableBuild: false });
      }
    } else {
      /*penfaceRadio undefined
 fssuRadio
fssuRadio undefined */
      this.setState({ reports: key });
    }
  };

  buildSpreadSheet = () => {
    let tempState = { ...this.state };

    this.props.onBuildSheet(this.state.penfaceForm.inputs.payenddate.value);
    this.setState({ buildStart: true, openCover: true });
    this.state.myVar = setInterval(this.checkBuild, 5000);
  };
  checkUpload = () => {
    console.log("checkUpload", this.props.success);
    if (this.props.success) {
      if (this.props.success == "success") {
        this.stopInterval();
        this.setState({ buildStart: false, disableProcess: false });
      } else if (this.props.success.indexOf("failure") > -1) {
        this.props.onBuildFailed("failure");
        this.stopInterval();
        this.setState({ buildStart: false, disableProcess: true });
      }
    }
  };
  checkProcess = () => {
    console.log("checkProcess", this.props.success);
    if (this.props.success) {
      if (this.props.success == "success") {
        this.stopInterval();
        this.setState({ buildStart: false, disableFinalReport: false });
      } else if (this.props.success.indexOf("failure") > -1) {
        this.props.onBuildFailed("failure");
        this.stopInterval();
        this.setState({ buildStart: false, disableFinalReport: true });
      }
    }
  };
  checkFinalProcess = () => {
    console.log("checkFinalProcess", this.props.success);
    if (this.props.success) {
      if (this.props.success == "success") {
        this.setState({ disableFinalReport: true });
        this.stopInterval();
      } else if (this.props.success.indexOf("failure") > -1) {
        this.props.onBuildFailed("failure");
        this.stopInterval();
        this.setState({ buildStart: false, disableFinalReport: true });
      }
    }
  };
  checkBuild = () => {
    console.log("checkBuild", this.props.success);
    if (this.props.success) {
      if (this.props.success == "success") {
        this.stopInterval();
        this.setState({ buildStart: false });
      } else if (this.props.success.indexOf("failure") > -1) {
        this.props.onBuildFailed("failure");
        this.stopInterval();
        this.setState({ buildStart: false });
      }
    }
  };
  emailSheet = (email) => {
    this.setState({ buildStart: true });
    this.props.onEmailSheet(email);
    this.setState({ buildStart: true, openCover: true });
    this.state.myVar = setInterval(this.checkBuild, 5000);
  };
  processSheet = () => {
    this.setState({ buildStart: true });
    this.props.onProcessSheet();
    this.setState({ buildStart: true, openCover: true });
    this.state.myVar = setInterval(this.checkProcess, 5000);
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
      this.setState({ buildStart: false, openCover: false });
    }
  };
  stopInterval() {
    clearInterval(this.state.myVar);
    this.setState({ openCover: false });
  }

  render() {
    return (
      <React.Fragment>
        <Cover show={this.state.openCover} />
        <div className={classes.CenterSpinner}>
          {this.state.buildStart ? <Spinner /> : null}
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
              disableProcess={this.state.disableProcess}
              disableFinalReport={this.state.disableFinalReport}
              emailSheet={(email) => this.emailSheet(email)}
              processFinalReport={() => this.processFinalReport()}
              processSheet={() => this.processSheet()}
              clicked={(val) => this.penfaceHandler(val)}
              buildSpreadSheet={() => this.buildSpreadSheet()}
              success={this.state.buildState}
              onFileChange={(event) => this.onFileChange(event)}
              onFileUpload={this.onFileUpload}
              fileInput={this.setFileInput}
              inputChangeHandler={(eve, key) => this.changeHandler(eve, key)}
            />
          ) : this.state.reports === "fssuRadio" ? (
            <FSSU />
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
