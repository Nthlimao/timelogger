import "@testing-library/jest-dom";

import React from "react";
import { render, fireEvent } from "../../../shared/utils/customRender";
import { BrowserRouter as Router } from "react-router-dom";

import { Role } from "../../../shared/types/User";
import useAuth from "../../../shared/hooks/useAuth";
import Navbar from "../Navbar";

jest.mock("../../../shared/hooks/useAuth");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

const mockedUseAuth = useAuth as jest.Mock;
const mockedUseLocation = require("react-router-dom").useLocation;
const mockedUseNavigate = require("react-router-dom").useNavigate;

describe("Navbar component", () => {
  beforeEach(() => {
    mockedUseAuth.mockReturnValue({
      user: {
        name: "John Doe",
        role: Role.Freelancer,
      },
      logout: jest.fn(),
    });

    mockedUseLocation.mockReturnValue({
      pathname: "/projects",
    });

    mockedUseNavigate.mockReturnValue(jest.fn());
  });

  test("renders correctly", () => {
    const { getByText } = render(
      <Router>
        <Navbar />
      </Router>
    );
    expect(getByText("Projects")).toBeInTheDocument();
    expect(getByText("Projects")).toBeInTheDocument();
  });

  test("applies active class to the correct link", () => {
    const { getByText } = render(
      <Router>
        <Navbar />
      </Router>
    );

    expect(getByText("Projects")).toHaveClass("active");
  });

  test("displays user information when authenticated", () => {
    const { getByText } = render(
      <Router>
        <Navbar />
      </Router>
    );

    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByText("Freelancer")).toBeInTheDocument();
  });

  test("calls logout and navigates to login on signOut", () => {
    const mockLogout = jest.fn();
    const mockNavigate = jest.fn();

    mockedUseAuth.mockReturnValue({
      user: {
        name: "John Doe",
        role: Role.Freelancer,
      },
      logout: mockLogout,
    });

    mockedUseNavigate.mockReturnValue(mockNavigate);

    const { getByRole } = render(
      <Router>
        <Navbar />
      </Router>
    );

    fireEvent.click(getByRole("button"));
    expect(mockLogout).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
