import styled from "styled-components";
import { CubeTransparentIcon } from "@heroicons/react/24/solid";

const NavbarStyles = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 70px;
  background-color: #1f2937;
  margin-bottom: 30px;
`;

export const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NavbarInner = styled.div`
  display: flex;
  align-items: center;
`;

export const AppIcon = styled(CubeTransparentIcon)`
  width: auto;
  height: 34px;
  color: #7dd3fc;
`;

export const NavbarMenu = styled(NavbarInner)`
  margin-left: 30px;

  a {
    display: block;
    font-family: "Inter", sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -0.1px;
    padding: 10px 12px;
    margin-right: 14px;
    border-radius: 5px;
    color: #d1d5db;
    text-decoration: none;

    &:last-of-type {
      margin-right: 0;
    }

    &:hover {
      color: #ffffff;
      background-color: #374151;
    }

    &.active {
      color: #ffffff;
      background-color: #111827;
    }
  }
`;

export const NavbarProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  p {
    color: #d1d5db;
    font-family: "Inter", sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: -0.2px;
  }
`;

export const NavbarLogout = styled.a`
  color: #0f172a;
  padding: 5px 8px;
  background-color: #7dd3fc;
  border-radius: 3px;
  margin-left: 20px;
  cursor: pointer;
`;

export default NavbarStyles;
