import { ReactElement, ReactNode } from "react";
import BadgeStyles from "./Badge.styles";

interface IBadge {
  children: ReactNode;
  appearance?: "error" | "alert" | "success" | "info";
}

const Badge = ({ children, appearance }: IBadge): ReactElement => {
  return <BadgeStyles appearance={appearance}>{children}</BadgeStyles>;
};

export default Badge;
