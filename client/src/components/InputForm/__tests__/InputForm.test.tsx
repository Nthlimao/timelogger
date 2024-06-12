import "@testing-library/jest-dom";

import React from "react";
import { fireEvent, render } from "../../../shared/utils/customRender";
import InputForm from "../InputForm";

jest.mock(
  "../../Badge",
  () =>
    ({
      appearance,
      children,
    }: {
      appearance: string;
      children: React.ReactNode;
    }) =>
      (
        <div data-testid="badge" className={appearance}>
          {children}
        </div>
      )
);

describe("InputForm component", () => {
  const defaultProps = {
    id: "test-input",
    name: "testName",
    label: "Test Label",
    value: "",
    placeholder: "Enter value",
    handleChange: jest.fn(),
    handleBlur: jest.fn(),
  };

  test("renders input with label", () => {
    const { getByLabelText, getByPlaceholderText } = render(
      <InputForm {...defaultProps} />
    );

    expect(getByLabelText("Test Label")).toBeInTheDocument();
    expect(getByPlaceholderText("Enter value")).toBeInTheDocument();
  });

  test("displays error message when error prop is provided", () => {
    const { getByText, getByTestId } = render(
      <InputForm {...defaultProps} error="Error message" />
    );

    expect(getByText("Error message")).toBeInTheDocument();
    expect(getByTestId("badge")).toHaveClass("error");
  });

  test("calls handleBlur when input loses focus", () => {
    const { getByLabelText } = render(<InputForm {...defaultProps} />);

    const input = getByLabelText("Test Label");
    fireEvent.blur(input);

    expect(defaultProps.handleBlur).toHaveBeenCalledTimes(1);
  });
});
