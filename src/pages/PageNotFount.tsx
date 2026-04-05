import React from "react";
import classes from "./pages.module.css";

const PageNotFound: React.FC<{}> = () => {
  return (
    <div className={classes.page}>
      <h1>העמוד לא נמצא</h1>
    </div>
  );
};

export default PageNotFound;
