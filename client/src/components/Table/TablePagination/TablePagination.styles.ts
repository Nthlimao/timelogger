import styled, { css } from "styled-components";

const TablePaginationStyles = styled.div`
  display: flex;
`;

interface IPaginationButton {
  isCurrentPage?: boolean;
}

export const PaginationButton = styled.button<IPaginationButton>`
  position: relative;
  border: none;
  color: #d1d5db;
  font-family: "Inter", sans-serif;
  font-size: 12.25px;
  line-height: 15px;
  padding: 7px 14px;
  background: #ffffff12;
  border-top: 1px solid #6b728066;
  border-bottom: 1px solid #6b728066;
  border-right: 1px solid #6b728066;
  cursor: pointer;

  &:hover {
    background-color: #ffffff03;
  }

  &:disabled {
    cursor: no-drop;
    background-color: #ffffff12;
  }

  &:first-of-type {
    border-left: 1px solid #6b728066;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  &:last-of-type {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  ${({ isCurrentPage }) => {
    if (isCurrentPage)
      return css`
        font-weight: 800;
        background-color: #7dd3fc;
        color: #0f172a;
      `;
  }}
`;

export const PaginationButtonIcon = styled.span`
  display: block;
  width: 10px;
  height: 15px;
  svg {
    position: absolute;
    top: 5px;
    left: 10px;
    width: auto;
    height: 20px;
  }
`;

export default TablePaginationStyles;
