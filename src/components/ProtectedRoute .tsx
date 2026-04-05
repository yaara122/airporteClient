import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../store/userProvider";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = (props) => {
  const userCtx = useContext(UserContext);

  if (userCtx.user?.role !== "admin") {
    return <Navigate to="/no-access" />;
  }
  return <>{props.children}</>;
};
export default ProtectedRoute;
