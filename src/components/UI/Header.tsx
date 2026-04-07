import { Fragment, useContext } from "react";
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
          <div className={classes.logo_text}>שדה תעופה </div>
        </div>
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

        {userCtx.isLogedIn && (
          <Fragment>
            <Link to="/userData" className={classes.trend_tag}>
              אזור אישי
            </Link>

            <Link to="/createRequest" className={classes.trend_tag}>
              יצירת בקשה
            </Link>
          </Fragment>
        )}

        {userCtx.user && userCtx.user.role === "admin" && (
          <Fragment>
            <Link to="/openRequests" className={classes.trend_tag}>
              בקשות פתוחות
            </Link>
            <Link to="/requestsHistory" className={classes.trend_tag}>
              היסטוריית בקשות
            </Link>
          </Fragment>
        )}

        {userCtx.user && <Button onClick={logoutHandler}>התנתקות</Button>}
      </div>
    </div>
  );
};

export default Header;
