import { ReactElement, ReactNode } from "react";
import ButtonStyles from "./Button.styles";

interface IButton {
  children: ReactNode;
  type?: "submit" | "reset" | "button";
  isDisabled?: boolean;
}

const Button = ({
  children,
  type,
  isDisabled = false,
}: IButton): ReactElement => {
  return (
    <ButtonStyles type={type} disabled={isDisabled}>
      {children}
    </ButtonStyles>
  );
};

export default Button;
