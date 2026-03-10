import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../api/api";
import user from "../models/user";

type userContextObject = {
  user?: user | null;
  isLogedIn: boolean;
  updateUserStatus: (user: user) => void;
  userLogout: () => void;
};

const UserContext = React.createContext<userContextObject>({
  isLogedIn: false,
  updateUserStatus: () => {},
  userLogout: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = (
  props,
) => {
  const navigate = useNavigate();
  const [isLogedIn, setIsLogedIn] = useState<boolean>(false);
  const [userState, setUserState] = useState<user | null>(null);

  useEffect(() => {
    if (
      localStorage.getItem("userName") &&
      localStorage.getItem("auth") &&
      localStorage.getItem("role")
    ) {
      setUserState({
        userName: localStorage.getItem("userName") || "",
        auth: localStorage.getItem("auth") || "",
        role: localStorage.getItem("roll") || "",
      });
      setIsLogedIn(true);
    }
  }, []);

  //is called with server respones by signup or login forms
  const HandleUpdateUser = (user: user) => {
    // try
    setIsLogedIn(true);
    setUserState({ ...user });
    localStorage.setItem("userName", user.userName);
    localStorage.setItem("auth", user.auth);
    localStorage.setItem("role", user.role);

    //logsout after an houer
    setTimeout(() => {
      alert("the session is over, you must login");
      HandleOnLogOut();
      navigate("/sginup");
    }, 3600000);
  };

  const HandleOnLogOut = () => {
    let token = {
      headers: {
        Authorization: "Bearer " + userContext.user?.auth,
      },
    };
    let data = userContext.user;

    userLogout(data, token);
    localStorage.removeItem("userName");
    localStorage.removeItem("auth");
    localStorage.removeItem("role");
    setIsLogedIn(false);
    setUserState(null);
  };

  const userContext: userContextObject = {
    isLogedIn: isLogedIn,
    user: userState,
    updateUserStatus: HandleUpdateUser,
    userLogout: HandleOnLogOut,
  };

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
