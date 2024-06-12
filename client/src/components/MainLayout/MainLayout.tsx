import React, { ReactElement, ReactNode } from "react";
import Navbar from "../Navbar";
import MainLayoutStyles from "./MainLayout.styles";

interface IMainLayout {
  children: ReactNode;
}

const MainLayout = ({ children }: IMainLayout): ReactElement => {
  return (
    <MainLayoutStyles>
      <Navbar />
      {children}
    </MainLayoutStyles>
  );
};

export default MainLayout;
