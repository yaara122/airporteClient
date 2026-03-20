import React, { useContext, Fragment, useState } from "react";
import RequestContext from "../store/RequestsProvider";
import Request from "../components/Request";
import Button from "../components/UI/Button";

const OpenRequestsPage: React.FC<{}> = () => {
  const requestCtx = useContext(RequestContext);
  const [typeInput, setTypeInput] = useState<string | null>(null);

  const HandelTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let currentEventValue: string = event.target.value;
    if (currentEventValue === "none") {
      setTypeInput(null);
    } else {
      setTypeInput(currentEventValue);
    }
  };

  const filterSubmitHandlker = () => {
    // if filter current !== last val{
    // call ctx.getopenreq (type = ...)
    //so it wont call fetch if not neccery
    //}
    requestCtx.getOpenRequests(typeInput);
  };
  return (
    <Fragment>
      <div>
        {requestCtx.openRequests ? (
          <h1>בקשות הממתינות לאישור</h1>
        ) : (
          <h1>אין בקשות לאישור כרגע</h1>
        )}
        {/* make sure when changeing rout the option value dosent change or rest the requests list */}
        <select name="type" onChange={HandelTypeChange}>
          <option value="none">ללא</option>
          <option value="אישור_כניסה">בקשות אישור כניסה</option>
          <option value="השחרה">בקשות השחרה</option>
          <option value="קידוד_חוגר">בקשות קידוד חוגר</option>
          <option value="חתימה_שוס">בקשות חתימה על שו"ס</option>
        </select>
        <Button onClick={filterSubmitHandlker}>סינון</Button>
      </div>
      {requestCtx.openRequests && (
        <div>
          <ul>
            {requestCtx.openRequests.map((request) => (
              <Request showBtnsOptions={true} request={request} />
              // add key for each request
            ))}
          </ul>
        </div>
      )}
    </Fragment>
  );
};

export default OpenRequestsPage;
