import React from "react";
import { useAppSelector } from "../store/features/hooks";
import { RootState } from "../store/store";
import { Navigate } from "react-router-dom";

interface AuthCheckProps {
  children: React.ReactNode;
}

const AuthCheck: React.FC<AuthCheckProps> = ({ children }) => {
  const user = useAppSelector((state: RootState) => state.users.email);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default AuthCheck;
