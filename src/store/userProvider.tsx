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
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (
      localStorage.getItem("userName") &&
      localStorage.getItem("auth") &&
      localStorage.getItem("role")
    ) {
      setUserState({
        userName: localStorage.getItem("userName") || "",
        auth: localStorage.getItem("auth") || "",
        role: localStorage.getItem("role") || "",
      });
      setIsLogedIn(true);
    }
  }, []);

  const HandleOnLogOut = (userAuth?: string) => {
    try{let config = {
      headers: {
        Authorization: `Bearer ${userAuth ? userAuth : userState?.auth}`,
      },
    };

    userLogout(config);
    localStorage.removeItem("userName");
    localStorage.removeItem("auth");
    localStorage.removeItem("role");
    setIsLogedIn(false);
    setUserState(null);

    if(timeoutId){
      clearTimeout(timeoutId)
    }
    }catch{
      alert("משהו השתבש בתהליך ההתנתקות")
    }
  };

  const HandleUserStausUpdate = (user: user) => {
    setIsLogedIn(true);
    setUserState({ ...user });
    localStorage.setItem("userName", user.userName);
    localStorage.setItem("auth", user.auth);
    localStorage.setItem("role", user.role);

    // logsout after an houer 3600000
    setTimeoutId( setTimeout(() => {
      navigate("/signup");
      alert("the session is over, you must relogin");
      HandleOnLogOut(user.auth);
    }, 3600000));
  };

  const userContext: userContextObject = {
    isLogedIn: isLogedIn,
    user: userState,
    updateUserStatus: HandleUserStausUpdate,
    userLogout: HandleOnLogOut,
  };

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
