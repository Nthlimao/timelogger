import React, { ReactElement, ReactNode } from "react";
import BadgeStyles from "./Badge.styles";

interface IBadge {
  children: ReactNode;
  size?: "small" | "normal" | "large";
  appearance?: "error" | "alert" | "success" | "info";
}

const Badge = ({ children, appearance, size }: IBadge): ReactElement => {
  return (
    <BadgeStyles appearance={appearance} size={size}>
      {children}
    </BadgeStyles>
  );
};

export default Badge;
