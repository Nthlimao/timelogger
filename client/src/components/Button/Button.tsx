import { ReactElement, ReactNode } from "react";
import ButtonStyles from "./Button.styles";

interface IButton {
  children: ReactNode;
  type?: "submit" | "reset" | "button";
  size?: "small" | "normal" | "large";
  isDisabled?: boolean;
}

const Button = ({
  children,
  type,
  size = "normal",
  isDisabled = false,
}: IButton): ReactElement => {
  return (
    <ButtonStyles type={type} size={size} disabled={isDisabled}>
      {children}
    </ButtonStyles>
  );
};

export default Button;
