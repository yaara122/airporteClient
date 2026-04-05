import React, { useContext, Fragment, useEffect, useState } from "react";
import classes from"./pages.module.css"
import RequestContext from "../store/RequestsProvider";
import requestItem from "../models/request";
import Request from "../components/Request";

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
      {requests && (
        <div className={classes.page}>
          <h1>הבקשות שלי</h1>
          <ul className={classes.container}>
            {requests.map((request) => (
              <Request request={request} />
              // add key for each request
            ))}
          </ul>
        </div>
      )}
      {!requests && <h1>הבקשות ריקות כרגע</h1>}
    </Fragment>
  );
};

export default RequestsPage;
