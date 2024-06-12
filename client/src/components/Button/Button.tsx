import React, { ReactElement, ReactNode } from "react";
import ButtonStyles from "./Button.styles";

interface IButton {
  children: ReactNode;
  type?: "submit" | "reset" | "button";
  size?: "small" | "normal" | "large";
  isDisabled?: boolean;
  onClick?: () => void;
}

const Button = ({
  children,
  type,
  size = "normal",
  isDisabled = false,
  onClick,
}: IButton): ReactElement => {
  return (
    <ButtonStyles
      type={type}
      size={size}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </ButtonStyles>
  );
};

export default Button;
