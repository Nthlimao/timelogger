import { ReactElement, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "@hooks/useAuth";

interface IProtectedRoute {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: IProtectedRoute): ReactElement => {
  const { user, token } = useAuth();

  if (!user && !token) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
