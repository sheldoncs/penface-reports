import * as actionTypes from "./actions/actionTypes";
const initialState = { success: null };

const SHEET_RESULT = "SHEET_RESULT";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.BUILD_START:
      state = { ...state, success: "start" };
      break;
    case actionTypes.BUILD_SUCCESS:
      state = { ...state, success: action.success };
      break;
    case actionTypes.BUILD_FAILED:
      state = { ...state, success: action.success };
      break;
    case actionTypes.BUILD_SPREADSHEET:
      state = { ...state, success: action.success };
      break;
    case actionTypes.SEND_SPREADSHEET:
      state = { ...state, success: action.success };
      break;
    case actionTypes.UPLOAD_SPREADSHEET:
      state = { ...state, success: action.success };
      break;
    case actionTypes.PROCESS_SPREADSHEET:
      state = { ...state, success: action.success };
      break;
    case actionTypes.FINAL_REPORT:
      state = { ...state, success: action.success };
      break;
    default:
      state = JSON.parse(sessionStorage.getItem(SHEET_RESULT)) || state;
      break;
  }
  sessionStorage.setItem(SHEET_RESULT, JSON.stringify(state));

  return state;
};

export default reducer;
