import { ReactElement } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";

import useAuth from "../../shared/hooks/useAuth";
import { Role } from "../../shared/types/User";
import Badge from "../Badge";

import NavbarStyles, {
  AppIcon,
  NavbarContainer,
  NavbarInner,
  NavbarLogout,
  NavbarMenu,
  NavbarProfile,
} from "./Navbar.styles";

const Navbar = (): ReactElement => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const getActiveClass = (url: string): string =>
    pathname === url ? "active" : "";

  const signOut = () => {
    logout();
    navigate("/login");
  };

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
            <>
              <NavbarProfile>
                <p>{user.name}</p>
                <Badge size="small" appearance="info">
                  {Role[user.role]}
                </Badge>
              </NavbarProfile>
              <NavbarLogout onClick={() => signOut()}>
                <ArrowRightStartOnRectangleIcon width={24} height={24} />
              </NavbarLogout>
            </>
          )}
        </NavbarInner>
      </NavbarContainer>
    </NavbarStyles>
  );
};

export default Navbar;
