import styled, { css } from "styled-components";

interface ISelectFormStyles {
  error?: boolean;
}

const SelectFormStyles = styled.div<ISelectFormStyles>`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  label {
    font-family: "Inter", sans-serif;
    font-size: 12px;
    font-weight: 500;
    color: #111827;
    margin-bottom: 10px;
  }

  select {
    color: #111827;
    font-family: "Inter", sans-serif;
    font-size: 13px;
    padding: 5px 8px;
    height: 36px;
    border: none;
    border-radius: 4px;

    box-shadow: inset 0 0 0 0 #fff, inset 0 0 0 1px #d1d5db,
      0 1px 2px 0 #0000000d;

    &:active,
    &:focus {
      box-shadow: #0ea5e9 0px 0px 0px 2px inset;
    }

    ${({ error }) =>
      error &&
      css`
        box-shadow: #f87171 0px 0px 0px 2px inset;
      `}
  }
`;

export default SelectFormStyles;
