import "@testing-library/jest-dom";

import React from "react";
import { render, fireEvent } from "../../../shared/utils/customRender";
import Button from "../Button";

describe("Button component", () => {
  test("renders children correctly", () => {
    const { getByText } = render(<Button>Click Me</Button>);
    expect(getByText("Click Me")).toBeInTheDocument();
  });

  test("applies correct type", () => {
    const { getByText } = render(<Button type="submit">Submit</Button>);
    expect(getByText("Submit")).toHaveAttribute("type", "submit");
  });

  test("applies correct size", () => {
    const { getByText } = render(<Button size="large">Large Button</Button>);
    expect(getByText("Large Button")).toHaveStyle("font-size: 16px");
  });

  test("disables the button", () => {
    const { getByText } = render(<Button isDisabled={true}>Disabled</Button>);
    expect(getByText("Disabled")).toBeDisabled();
  });

  test("calls onClick handler", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Click Me</Button>
    );

    fireEvent.click(getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
