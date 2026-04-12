import React, {
  useContext,
  Fragment,
  useState,
  useEffect,
  useCallback,
} from "react";
import classes from "./pages.module.css";
import RequestContext from "../store/RequestsProvider";
import requestItem from "../models/request";
import UserContext from "../store/userProvider";
import Request from "../components/request";

const OpenRequestsPage: React.FC<{}> = () => {
  const requestCtx = useContext(RequestContext);
  const userCtx = useContext(UserContext);
  const [openRequests, setOpenRequests] = useState<requestItem[]>();
  const [typeInput, setTypeInput] = useState<string | null>(null);

  const HandelTypeChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    let currentEventValue: string = event.target.value;
    if (currentEventValue === "none") {
      setTypeInput(null);
    } else {
      setTypeInput(currentEventValue);
    }
  };

  const setOpenRequestsFunction = useCallback(async () => {
    const params = {
      status: "בהמתנה",
      type: typeInput,
    };
    setOpenRequests(await requestCtx.generalGetRequestsAdmin(params));
  }, [requestCtx, typeInput]);

  useEffect(() => {
    if (userCtx.user?.role === "admin") {
      setOpenRequestsFunction();
    }
  }, [typeInput, userCtx.user, setOpenRequestsFunction]);

  return (
    <Fragment>
      <div className={classes.page}>
       <div className={classes.data_container}>
         {openRequests && openRequests.length > 0 ? (
          <h1>בקשות הממתינות לאישור</h1>
        ) : (
          <h1>אין בקשות לאישור כרגע</h1>
        )}
        <select name="type" onChange={HandelTypeChange}>
          <option value="none">ללא</option>
          <option value="אישור_כניסה">בקשות אישור כניסה</option>
          <option value="השחרה">בקשות השחרה</option>
          <option value="קידוד_חוגר">בקשות קידוד חוגר</option>
          <option value="חתימה_שוס">בקשות חתימה על שו"ס</option>
        </select>
       </div>
      </div>
      {openRequests && (
        <div>
          <ul className={classes.container}>
            {openRequests.map((request) => (
              <Request
                showBtnsOptions={true}
                request={request}
                resetOpenRequest={setOpenRequestsFunction}
              />
            ))}
          </ul>
        </div>
      )}
    </Fragment>
  );
};

export default OpenRequestsPage;
