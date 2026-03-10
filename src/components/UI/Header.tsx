import { Fragment, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import btnClasses from "./Button.module.css";
import UserContext from "../../store/userProvider";
import Button from "./Button";

const Header = () => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);

  const logoutHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    userCtx.userLogout();
    navigate("/signup");
  };

  return (
    <div className={classes.header}>
      <div className={classes.header_top}>
        <div className={classes.logo}>
          <div className={classes.logo_text}>AirPort</div>
          {userCtx.user && (
            <i className={classes.logo_text}>
              welcome {userCtx.user.userName}
            </i>
          )}
        </div>
        {/* אזור אישי מציג את הבקשות שלי */}
        {/* <div className={classes.user_icon}>
          <i>👤</i>
        </div> */}

        {!userCtx.isLogedIn &&
          (window.location.href.endsWith("signup") ? (
            <Link to="/login" className={btnClasses.button}>
              התחברות
            </Link>
          ) : (
            <Link to="/signup" className={btnClasses.button}>
              הרשמה
            </Link>
          ))}

        {userCtx.isLogedIn &&
          (window.location.href.endsWith("createRequest") ? (
            <Link to="/userData" className={btnClasses.button}>
              אזור אישי👤
            </Link>
          ) : (
            <Link to="/createRequest" className={btnClasses.button}>
              יצירת בקשה
            </Link>
          ))}

        {userCtx.user && userCtx.user.role === "מנהל" && (
          <Button>תפריט מנהל</Button>
        )}

        {userCtx.user && <Button onClick={logoutHandler}>התנתקות</Button>}
      </div>
    </div>
  );
};

export default Header;
