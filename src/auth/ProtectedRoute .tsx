import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../store/userProvider";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = (props) => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userCtx.user) {
      return;
    }
    if (userCtx.user?.role !== "admin") {
      navigate("no-access");
    }
  });

  return <>{props.children}</>;
};
export default ProtectedRoute;
