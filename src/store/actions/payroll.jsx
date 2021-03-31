import * as actionTypes from "./actionTypes";
import axios from "axios";

export const spreadsheetCompleted = (success) => {
  return { type: actionTypes.BUILD_SPREADSHEET, success };
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
export const processFinalReport = (email, payEndDate) => {
  return (dispatch) => {
    dispatch(processStart());
    const params = { email: email, dteStr: payEndDate };
    let url = "http://localhost:49607/Payroll.asmx/FinancialDataExport";
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
      "http://localhost:49607/Payroll.asmx/ExecutePenfaceFinanceDataProcess";
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
    let url = "http://localhost:49607/services/spreadsheet.ashx";
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
    let url = "http://localhost:49607/Payroll.asmx/emailPenfaceSheet";
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
export const buildSpreadSheet = (payEndDate) => {
  return (dispatch) => {
    dispatch(buildStart());
    const params = { dteStr: payEndDate };

    let url =
      "http://localhost:49607/Payroll.asmx/ExecutePenfaceFinanceSpreadsheetProcess";

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
