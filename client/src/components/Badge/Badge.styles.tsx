import styled, { css } from "styled-components";

interface IBadgeStyles {
  appearance?: "error" | "alert" | "success" | "info";
}

const BadgeStyles = styled.button<IBadgeStyles>`
  align-self: flex-end;
  font-family: "Inter", sans-serif;
  letter-spacing: -0.2px;
  font-size: 11px;
  line-height: 12px;
  font-weight: 500;
  padding: 3.5px 7px;
  border: none;
  border-radius: 3px;
  color: #9ca3af;
  border: 1px solid #9ca3af33;
  background-color: #9ca3af1a;
  margin-top: 5px;

  ${({ appearance }) => {
    switch (appearance) {
      case "error":
        return css`
          background-color: #f871711a;
          border-color: #f8717133;
          color: #f87171;
        `;
      case "success":
        return css`
          background-color: #22c55e1a;
          border-color: #22c55e33;
          color: #4ade80;
        `;
      case "info":
        return css`
          background-color: #60a5fa1a;
          border-color: #60a5fa4d;
          color: #60a5fa;
        `;
    }
  }}
`;

export default BadgeStyles;
