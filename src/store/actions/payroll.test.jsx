import React from "react";
import * as actionTypes from "./actionTypes";
import * as actions from "./payroll";

import axios from "axios";
import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import mockAxios from "jest-mock-axios";

configure({ adapter: new Adapter() });

describe("Payroll Stored Actions", () => {
  it("creates an action to check completion of spreadsheet", () => {
    const success = true;
    const expectedAction = { type: actionTypes.BUILD_SPREADSHEET, success };
    expect(actions.spreadsheetCompleted(success)).toEqual(expectedAction);
  });
});
