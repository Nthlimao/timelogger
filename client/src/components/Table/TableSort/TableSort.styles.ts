import styled from "styled-components";

const TableSortStyles = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const SortIcon = styled.div`
  display: inline-block;
`;

interface IChevronSort {
  direction?: "asc" | "desc";
}

export const ChevronSort = styled.div<IChevronSort>`
  position: relative;
  display: block;
  width: 8px;
  height: 10px;
  margin-left: 5px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #ffffff;
    border-bottom-width: 4px;
    border-bottom-style: solid;
    border-bottom-color: ${({ direction }) => {
      if (!direction || (direction && direction === "asc")) return "#FFFFFF";
      return "#FFFFFF33";
    }};
  }
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top-width: 4px;
    border-top-style: solid;
    border-top-color: ${({ direction }) => {
      if (!direction || (direction && direction === "desc")) return "#FFFFFF";
      return "#FFFFFF33";
    }};
  }
`;

export default TableSortStyles;
