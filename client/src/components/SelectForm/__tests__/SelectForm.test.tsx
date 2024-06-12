import "@testing-library/jest-dom";

import React from "react";
import { fireEvent, render } from "../../../shared/utils/customRender";
import SelectForm from "../SelectForm";

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

describe("SelectForm component", () => {
  const defaultProps = {
    id: "test-select",
    name: "testName",
    label: "Test Label",
    value: "",
    placeholder: "Select an option",
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
    ],
    handleChange: jest.fn(),
  };

  test("renders select with label and options", () => {
    const { getByLabelText, getByDisplayValue, getByText } = render(
      <SelectForm {...defaultProps} />
    );

    expect(getByLabelText("Test Label")).toBeInTheDocument();
    expect(getByDisplayValue("Select an option")).toBeInTheDocument();
    expect(getByText("Option 1")).toBeInTheDocument();
    expect(getByText("Option 2")).toBeInTheDocument();
  });

  test("displays error message when error prop is provided", () => {
    const { getByText, getByTestId } = render(
      <SelectForm {...defaultProps} error="Error message" />
    );

    expect(getByText("Error message")).toBeInTheDocument();
    expect(getByTestId("badge")).toHaveClass("error");
  });

  test("calls handleChange when select value changes", () => {
    const { getByLabelText } = render(<SelectForm {...defaultProps} />);

    const select = getByLabelText("Test Label");

    fireEvent.change(select, { target: { value: "option1" } });

    expect(defaultProps.handleChange).toHaveBeenCalledTimes(1);
  });
});
