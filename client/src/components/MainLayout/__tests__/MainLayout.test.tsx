import "@testing-library/jest-dom";

import React from "react";
import { render } from "../../../shared/utils/customRender";
import MainLayout from "../MainLayout";

jest.mock("../../Navbar", () => () => (
  <div data-testid="navbar">Mocked Navbar</div>
));

describe("MainLayout component", () => {
  test("renders Navbar and children", () => {
    const { getByTestId, getByText } = render(
      <MainLayout>
        <div>Child Component</div>
      </MainLayout>
    );

    expect(getByTestId("navbar")).toBeInTheDocument();
    expect(getByText("Child Component")).toBeInTheDocument();
  });
});
