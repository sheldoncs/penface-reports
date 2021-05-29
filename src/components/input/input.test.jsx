import React from "react";
import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { shallow, mount } from "enzyme";
import Input from "./input";
import Login from "../login/login";

configure({ adapter: new Adapter() });

describe("Input", () => {
  let mockHandleFocus = jest.fn();
  let mockChanged = jest.fn();
  let myForm = {
    username: {
      defaultFocus: true,
      handleFocus: mockHandleFocus,
      changed: mockChanged,
      visibility: "visible",
      elementType: "input",
      elementName: "Username",
      elementConfig: { type: "text", placeholder: "" },
      name: "Username",
      id: "Username",
    },
    password: {
      changed: mockChanged,
      elementName: "password",
      elementConfig: { type: "text", placeholder: "" },
      name: "Username",
      id: "Username",
    },
  };

  let props = myForm.username;

  let input = shallow(<Input {...props} />);
  it("renders properly", () => {
    expect(input).toMatchSnapshot();
  });
  describe("when user types into username input", () => {
    const username = "20003569";
    beforeEach(() => {
      input
        .find(".form-control")
        .simulate("change", { target: { value: username } });
    });
    it("executes the change function", () => {
      expect(mockChanged).toHaveBeenCalled();
    });
  });
});
