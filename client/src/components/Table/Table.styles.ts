import styled from "styled-components";

export const TableWrapper = styled.div`
  width: 100%;
  border: 1px solid #6b728066;
  border-radius: 7px;
`;

const TableStyles = styled.table`
  width: 100%;
  font-family: "Inter", sans-serif;
`;

export const TableHeader = styled.thead`
  background-color: #ffffff12;
  tr {
    border-bottom: 1px solid #6b728066;
  }
  th {
    color: #ffffff;
    padding: 16px 20px;
    text-align: left;
  }
`;

export const TableBody = styled.tbody`
  color: #d1d5db;
  background-color: #ffffff0d;
  tr {
    border-bottom: 1px solid #6b728026;
  }
  td {
    padding: 14px 20px;
  }

  a {
    text-decoration: underline;
    font-weight: 500;
    cursor: pointer;
  }
`;

export const TableFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-top: 1px solid #6b728066;
  background-color: #ffffff12;

  p {
    font-family: "Inter", sans-serif;
    font-size: 13px;
    color: #d1d5db99;
  }
`;

export default TableStyles;
