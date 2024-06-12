import { UserIcon as UserIconHI } from "@heroicons/react/24/solid";
import styled from "styled-components";

const LoginStyles = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

export const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  width: 100%;
  max-width: 340px;

  form {
    width: 100%;
    label {
      color: #fff;
    }
  }
`;

export const UserIcon = styled(UserIconHI)`
  width: 40px;
  height: auto;
  color: #7dd3fc;
  margin-bottom: 34px;
`;

export const LoginTitle = styled.h2`
  color: #f8fafc;
  font-family: "Inter", sans-serif;
  font-size: 21px;
  font-weight: 800;
  letter-spacing: -0.7875px;
  margin-bottom: 34px;
`;
export default LoginStyles;
