import React from "react";
import { fireEvent, render } from "../../../shared/utils/customRender";
import { FormItem } from "../../../shared/types/Form";
import Form from "../Form";

describe("Form component", () => {
  const inputs: FormItem[] = [
    {
      id: "input1",
      name: "inputName1",
      label: "Input Label 1",
      inputType: "input",
      type: "text",
    },
    {
      id: "select1",
      name: "selectName1",
      label: "Select Label 1",
      inputType: "select",
      options: [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
      ],
    },
  ];

  const defaultProps = {
    inputs,
    values: {
      input1: "",
      select1: "",
    },
    errors: {},
    handleChange: jest.fn(),
    handleBlur: jest.fn(),
  };

  test("renders input and select fields", () => {
    const { getByLabelText } = render(<Form {...defaultProps} />);

    expect(getByLabelText("Input Label 1")).toBeInTheDocument();
    expect(getByLabelText("Select Label 1")).toBeInTheDocument();
  });

  test("calls handleChange and handleBlur on input change and blur", () => {
    const { getByLabelText } = render(<Form {...defaultProps} />);

    const input = getByLabelText("Input Label 1") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "new value" } });

    expect(defaultProps.handleChange).toHaveBeenCalledTimes(1);

    fireEvent.blur(input);

    expect(defaultProps.handleBlur).toHaveBeenCalledTimes(1);
  });

  test("calls handleChange on select change", () => {
    defaultProps.handleChange.mockClear();
    const { getByLabelText } = render(<Form {...defaultProps} />);

    const select = getByLabelText("Select Label 1") as HTMLSelectElement;
    fireEvent.change(select, { target: { value: "option1" } });

    expect(defaultProps.handleChange).toHaveBeenCalledTimes(1);
  });
});
