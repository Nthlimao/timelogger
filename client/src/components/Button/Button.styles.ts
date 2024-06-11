import styled, { css } from "styled-components";

interface IButtonStyles {
  size?: "small" | "normal" | "large";
}

const ButtonStyles = styled.button<IButtonStyles>`
  display: flex;
  align-items: center;
  width: 100%;
  font-family: "Inter", sans-serif;
  letter-spacing: -0.5px;
  font-size: 12.25px;
  font-weight: 700;
  padding: 7px 10.5px;
  border: none;
  border-radius: 4px;
  color: #0f172a;
  background-color: #7dd3fc;
  text-align: center;

  &:disabled,
  &:disabled:hover {
    opacity: 0.2;
    cursor: no-drop;
  }

  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }

  ${({ size }) => {
    switch (size) {
      case "small":
        return css`
          font-size: 10px;
          padding: 2px 4px;
        `;
      case "large":
        return css`
          display: flex;
          justify-content: center;
          letter-spacing: -0.7875px;
          font-size: 16px;
          padding: 12px 8px;
        `;
    }
  }}

  svg {
    margin-right: 6px;
  }
`;

export default ButtonStyles;
