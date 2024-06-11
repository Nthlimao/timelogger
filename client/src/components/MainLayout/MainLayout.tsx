import { ReactElement, ReactNode } from "react";
import MainLayoutStyles from "./MainLayout.styles";
import Navbar from "../Navbar";

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
