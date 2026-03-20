import React, { useContext, Fragment } from "react";
import RequestContext from "../store/RequestsProvider";
import Request from "../components/Request";

const RequestsPage: React.FC<{}> = () => {
  const requestCtx = useContext(RequestContext);
  return (
    <Fragment>
      {requestCtx.userRequests && (
        <div>
          <h1>הבקשות שלי</h1>
          <ul>
            {requestCtx.userRequests.map((request) => (
              <Request request={request} />
              // add key for each request
            ))}
          </ul>
        </div>
      )}
      {!requestCtx.userRequests && <h1>הבקשות ריקות כרגע</h1>}
    </Fragment>
  );
};

export default RequestsPage;
