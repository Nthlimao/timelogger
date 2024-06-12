import "@testing-library/jest-dom";

import React from "react";
import { render, fireEvent } from "../../../shared/utils/customRender";

import Modal from "../Modal";

describe("Modal component", () => {
  test("renders correctly when isOpen is true", () => {
    const { getByText } = render(
      <Modal isOpen={true} onClose={() => {}}>
        Modal Content
      </Modal>
    );

    expect(getByText("Modal Content")).toBeInTheDocument();
  });

  test("does not render when isOpen is false", () => {
    const { queryByText } = render(
      <Modal isOpen={false} onClose={() => {}}>
        Modal Content
      </Modal>
    );

    expect(queryByText("Modal Content")).not.toBeInTheDocument();
  });

  test("hides footer when hideFooter is true", () => {
    const { queryByText } = render(
      <Modal isOpen={true} hideFooter={true} onClose={() => {}}>
        Modal Content
      </Modal>
    );

    expect(queryByText("Close")).not.toBeInTheDocument();
  });

  test("shows footer when hideFooter is false", () => {
    const { getByText } = render(
      <Modal isOpen={true} hideFooter={false} onClose={() => {}}>
        Modal Content
      </Modal>
    );

    expect(getByText("Close")).toBeInTheDocument();
  });

  test("calls onClose when Close button is clicked", () => {
    const mockOnClose = jest.fn();

    const { getByText } = render(
      <Modal isOpen={true} onClose={mockOnClose}>
        Modal Content
      </Modal>
    );

    fireEvent.click(getByText("Close"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
