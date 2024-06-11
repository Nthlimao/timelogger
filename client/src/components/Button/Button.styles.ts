import styled from "styled-components";

const ButtonStyles = styled.button`
  width: 100%;
  font-family: "Inter", sans-serif;
  letter-spacing: -0.7875px;
  font-size: 16px;
  font-weight: 700;
  padding: 12px 8px;
  border: none;
  border-radius: 4px;
  color: #0f172a;
  background-color: #7dd3fc;

  &:disabled,
  &:disabled:hover {
    opacity: 0.2;
    cursor: no-drop;
  }

  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
`;

export default ButtonStyles;
