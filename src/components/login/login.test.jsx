import React from "react";
import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { shallow, mount } from "enzyme";
import Login from "./login";
import Input from "../input/input";
import { Provider } from "react-redux";
import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import SheetReducer from "../../store/sheetReducer";
import AuthReducer from "../../store/authReducer";
import { authenticateUser } from "../../store/actions/index";

configure({ adapter: new Adapter() });

describe("login", () => {
  const initialState = { confirmed: false };
  const rootReducer = combineReducers({
    sheet: SheetReducer,
    auth: AuthReducer,
  });

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  describe("when user clicks 'LOGIN'", () => {
    const getWrapper = () =>
      mount(
        <Provider store={store}>
          <Login />
        </Provider>
      );

    describe("should call dispatch to authenticate after button click", () => {
      const getWrapper = (mockStore = store) =>
        mount(
          <Provider store={mockStore}>
            <Login />
          </Provider>
        );

      it("calls dispatch", () => {
        const mockStore = store;
        mockStore.dispatch = jest.fn();
        mockStore.dispatch(authenticateUser("sheldoncs", "weatherballoon@48"));
        const wrapper = getWrapper(mockStore);
        expect(wrapper.find(".btn-login")).toHaveLength(1);
        wrapper.find(".btn-login").simulate("click");
        expect(mockStore.dispatch).toHaveBeenCalled();
      });
    });
    describe("", () => {
      /* on change check to see if useState has been called */
    });
  });
});
