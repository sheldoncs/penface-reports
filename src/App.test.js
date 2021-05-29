import React from "react";
import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import App from "./App";
import { mount } from "enzyme";

import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import SheetReducer from "./store/sheetReducer";
import AuthReducer from "./store/authReducer";
import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

configure({ adapter: new Adapter() });

describe("App", () => {
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

  it("should show Login component for / router (using memory router)", () => {
    const component = mount(
      <MemoryRouter initialentries="{['/']}">
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    expect(component.find("Login")).toHaveLength(1);
  });
  it("should show Login component for '/manager' router (using memory router)", () => {
    const component = mount(
      <MemoryRouter initialentries="{['/manager']}">
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    expect(component.find("Login")).toHaveLength(1);
  });
  it("should show Login component for '/payroll' router (using memory router)", () => {
    const component = mount(
      <MemoryRouter initialentries="{['/payroll']}">
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    expect(component.find("Login")).toHaveLength(1);
  });
});
