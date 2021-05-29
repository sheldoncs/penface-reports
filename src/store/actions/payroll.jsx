import * as actionTypes from "./actionTypes";
import axios from "axios";

const abortController = new AbortController();
const signal = abortController.signal;

export const spreadsheetCompleted = (success) => {
  return { type: actionTypes.BUILD_SPREADSHEET, success };
};
export const authResult = (result) => {
  abortController.abort();
  return { type: actionTypes.AUTHENTICATE_USER, result: result };
};
export const buildStart = () => {
  return { type: actionTypes.BUILD_START };
};
export const processStart = () => {
  return { type: actionTypes.BUILD_START };
};
export const uploadStart = () => {
  return { type: actionTypes.UPLOAD_START };
};
export const buildFailed = (result) => {
  return { type: actionTypes.BUILD_FAILED, success: result };
};
export const buildSuccess = (result) => {
  return { type: actionTypes.BUILD_SUCCESS, success: result };
};
export const authenticateUser = (username, password) => {
  return (dispatch) => {
    dispatch(processStart());
    const params = { username: username, password: password };
    let url = "http://owl2/penface/Payroll.asmx/isAuthenticated";
    axios
      .post(url, params, { signal: signal })
      .then((response) => {
        console.log("called successfully");
        dispatch(buildSuccess("success"));
        dispatch(authResult(response.data.d));
        console.log("response.data.d", response.data.d);
      })
      .catch((err) => {
        console.log(err);
        dispatch(buildFailed("failure"));
      });
  };
};
export const processFinalReport = (email, payEndDate) => {
  return (dispatch) => {
    dispatch(processStart());
    const params = { email: email, dteStr: payEndDate };
    let url = "http://owl2/penface/Payroll.asmx/FinancialDataExport";
    axios
      .post(url, params)
      .then((response) => {
        console.log(response);
        dispatch(buildSuccess("success"));
      })
      .catch((err) => {
        console.log(err);
        dispatch(buildFailed("failure"));
      });
  };
};
export const processSpreadSheet = () => {
  return (dispatch) => {
    dispatch(processStart());
    let url =
      "http://owl2/penface/Payroll.asmx/ExecutePenfaceFinanceDataProcess";
    // let url =
    //   "http://localhost:49607/Payroll.asmx/ExecutePenfaceFinanceDataProcess";
    axios
      .post(url)
      .then((response) => {
        console.log(response);
        dispatch(buildSuccess("success"));
      })
      .catch((err) => {
        console.log(err);
        dispatch(buildFailed("failure"));
      });
  };
};
export const uploadSpreadSheet = (formdata) => {
  return (dispatch) => {
    dispatch(buildStart());
    let url = "http://owl2/penface/services/spreadsheet.ashx";
    axios
      .post(url, formdata)
      .then((response) => {
        console.log(response);
        dispatch(buildSuccess("success"));
      })
      .catch((err) => {
        console.log(err);
        dispatch(buildFailed("failure"));
      });
  };
};
export const emailSpreadSheet = (email) => {
  return (dispatch) => {
    dispatch(buildStart());
    const params = { email: email };
    let url = "http://owl2/penface/Payroll.asmx/emailPenfaceSheet";
    axios
      .post(url, params)
      .then((response) => {
        console.log(response);
        dispatch(buildSuccess(response.data.d));
      })
      .catch((err) => {
        console.log(err);
        dispatch(buildFailed("failure"));
      });
  };
};
export const buildSpreadSheet = (email, payEndDate) => {
  return (dispatch) => {
    dispatch(buildStart());
    const params = { email: email, dteStr: payEndDate };

    let url =
      "http://owl2/penface/Payroll.asmx/ExecutePenfaceFinanceSpreadsheetProcess";

    axios
      .post(url, params)
      .then((response) => {
        console.log(response);
        dispatch(buildSuccess(response.data.d));
      })
      .catch((err) => {
        console.log(err);
        dispatch(buildFailed("failure"));
      });
  };
};
export const processBannerJournal = (email, payEndDate) => {
  return (dispatch) => {
    dispatch(buildStart());
    const params = { dteStr: payEndDate, email: email };

    let url = "http://owl2/penface/Payroll.asmx/ExecuteBannerJournal";
    axios
      .post(url, params)
      .then((response) => {
        dispatch(buildSuccess("success"));
      })
      .catch((err) => {
        console.log(err);
        dispatch(buildFailed("failure"));
      });
  };
};
export const processFSSUReport = (email, payEndDate) => {
  return (dispatch) => {
    dispatch(buildStart());

    const params = { email: email, dte: payEndDate };
    let url = "http://owl2/penface/Payroll.asmx/getFSSUData";

    axios
      .post(url, params)
      .then((response) => {
        console.log("response.data.d", response.data.d);
        if (response.data.d.indexOf("failure") >= 0) {
          dispatch(buildFailed("failure"));
        } else {
          dispatch(buildSuccess(response.data.d));
        }
      })
      .catch((err) => {
        dispatch(buildFailed("failure"));
      });
  };
};
