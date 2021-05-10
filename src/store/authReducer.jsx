import * as actionTypes from "./actions/actionTypes";

const AUTH_RESULT = "AUTH_RESULT";
const initialState = { confirmed: false };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHENTICATE_USER:
      state = { ...state, confirmed: action.result };
      break;
    default:
      state = JSON.parse(sessionStorage.getItem(AUTH_RESULT)) || state;
      break;
  }
  sessionStorage.setItem(AUTH_RESULT, JSON.stringify(state));
  return state;
};

export default reducer;
