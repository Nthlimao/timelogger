import { ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";

import useAuth from "../../shared/hooks/useAuth";
import { Role } from "../../shared/types/User";
import Badge from "../Badge";

import NavbarStyles, {
  AppIcon,
  NavbarContainer,
  NavbarInner,
  NavbarMenu,
  NavbarProfile,
} from "./Navbar.styles";

const Navbar = (): ReactElement => {
  const { pathname } = useLocation();
  const { user } = useAuth();

  const getActiveClass = (url: string): string =>
    pathname === url ? "active" : "";

  return (
    <NavbarStyles>
      <NavbarContainer className="container">
        <NavbarInner>
          <AppIcon />
          <NavbarMenu>
            <Link to="/" className={getActiveClass("/")}>
              Home
            </Link>
            <Link to="/projects" className={getActiveClass("/projects")}>
              Projects
            </Link>
          </NavbarMenu>
        </NavbarInner>
        <NavbarInner>
          {user && (
            <NavbarProfile>
              <p>{user.name}</p>
              <Badge size="small" appearance="info">
                {Role[user.role]}
              </Badge>
            </NavbarProfile>
          )}
        </NavbarInner>
      </NavbarContainer>
    </NavbarStyles>
  );
};

export default Navbar;
