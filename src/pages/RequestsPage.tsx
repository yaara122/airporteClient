import React, { useContext, Fragment, useEffect, useState } from "react";
import classes from"./pages.module.css"
import RequestContext from "../store/RequestsProvider";
import requestItem from "../models/request";
import Request from "../components/request"

const RequestsPage: React.FC<{}> = () => {
  const [requests, setRequests] = useState<requestItem[]>();
  const requestCtx = useContext(RequestContext);

  useEffect(() => {
    const setRequestsFunction = async () => {
      setRequests(await requestCtx.getCurrentUserRequests());
    };
    setRequestsFunction();
  }, [requestCtx]);

  return (
    <Fragment>
      {requests && requests.length > 0  && (
        <div className={classes.page}>
          <h1>הבקשות שלי</h1>
          <ul className={classes.container}>
            {requests.map((request) => (
              <Request request={request} />
            ))}
          </ul>
        </div>
      )}
      {(!requests || requests.length === 0 ) && <div className={classes.page}><h1>הבקשות ריקות כרגע</h1></div>}
    </Fragment>
  );
};

export default RequestsPage;
