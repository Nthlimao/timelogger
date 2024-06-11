import styled, { css } from "styled-components";

interface IInputFormStyles {
  error?: boolean;
}

const InputFormStyles = styled.div<IInputFormStyles>`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  label {
    font-family: "Inter", sans-serif;
    font-size: 12px;
    font-weight: 500;
    color: #94a3b8;
    margin-bottom: 10px;
  }

  input {
    color: #111827;
    font-family: "Inter", sans-serif;
    font-size: 13px;
    padding: 5px 8px;
    height: 26px;
    border: none;
    border-radius: 4px;

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

export default InputFormStyles;
