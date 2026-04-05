import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import classes from "./pages.module.css";
import requestItem from "../models/request";
import UserContext from "../store/userProvider";
import RequestContext from "../store/RequestsProvider";
import Request from "../components/Request";
import Button from "../components/UI/Button";

const AMOUNT_OF_REQUEST_PER_FETCH = 3;

const RequestsHistoryPage: React.FC<{}> = () => {
  const userCtx = useContext(UserContext);
  const requestCtx = useContext(RequestContext);
  const [requestsHistory, setRequestsHistory] = useState<requestItem[]>([]);
  const [fetcheAmount, setFetchedAmount] = useState<number>(0);
  const [noMoreRequests, setNoMoreRequests] = useState<boolean>(false);
  const [dateRangeError, setDateRangeError] = useState<{
    hasError: boolean;
    errorText: string;
  }>({ hasError: false, errorText: "" });

  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  const fetchMoreRequests = 
    async (fetchedAmountInput?: number) => {
      let timesFetched;
      if (fetchedAmountInput !== undefined) {
        timesFetched = fetchedAmountInput;
      } else {
        timesFetched = fetcheAmount;
      }

      if (
        startDateRef.current?.value &&
        new Date(startDateRef.current?.value) > new Date()
      ) {
        setDateRangeError({
          hasError: true,
          errorText: "תאריך התחלתי לא יכול להיות גדול יותר מהתאריך של היום",
        });
        return;
      }
      if (startDateRef.current?.value && endDateRef.current?.value) {
        if (
          new Date(endDateRef.current?.value) <
          new Date(startDateRef.current?.value)
        ) {
          setDateRangeError({
            hasError: true,
            errorText: "תאריך התחלתי לא יכול להיות גדול יותר מהתאריך המקסימלי",
          });
          return;
        }
      }

      let params = {
        limit: AMOUNT_OF_REQUEST_PER_FETCH,
        skip: timesFetched * AMOUNT_OF_REQUEST_PER_FETCH,
        startSerchDate: startDateRef.current?.value,
        endSerchDate: endDateRef.current?.value,
      };

      setDateRangeError({ hasError: false, errorText: "" });

      let requestsList: requestItem[] | undefined =
        await requestCtx.generalGetRequestsAdmin(params);
      if (requestsList && requestsList.length > 0) {
        if (fetchedAmountInput !== undefined) {
          setRequestsHistory(requestsList);
          setNoMoreRequests(false);
        } else {
          setRequestsHistory((prevHistory: requestItem[]) => {
            return [...prevHistory, ...(requestsList ?? [])];
          });
        }
        setFetchedAmount(timesFetched + 1);
      } else {
        setNoMoreRequests(true);
      }
    }
  ;

  useEffect(() => {
    setRequestsHistory([]);
    if (userCtx.user?.role === "admin") {
      fetchMoreRequests(0);
    }
  }, [userCtx.user]);

  return (
    <Fragment>
      {requestsHistory && (
        <div className={classes.page}>
         <div className={classes.data_container}>
           <h1>היסטוריית בקשות</h1>
          <div>
            <label htmlFor="startDate">תאריך התחלת חיפוש </label>
          <input
            id="startDate"
            type="date"
            ref={startDateRef}
            onChange={() => {
              fetchMoreRequests(0);
            }}
          />
          </div>
          <br/>
         <div>
           <label htmlFor="endDate">תאריך מקסימלי לחיפוש  </label>
          <input
            id="endDate"
            type="date"
            ref={endDateRef}
            onChange={() => {
              fetchMoreRequests(0);
            }}
          />
         
         </div>
          <br/>
          {dateRangeError.hasError && <p>{dateRangeError.errorText}</p>}
         </div>

          

          <ul className={classes.container}>
            {requestsHistory.map((request) => (
              <Request request={request} />
              // add key for each request
            ))}
          </ul>
          {noMoreRequests ? (
            <p className={classes.no_more_requests}>אין עוד בקשות</p>
          ) : (
            <Button onClick={() => fetchMoreRequests()}>טען עוד</Button>
          )}
        </div>
      )}
      {!requestsHistory && <h1>הבקשות ריקות כרגע</h1>}
    </Fragment>
  );
};

export default RequestsHistoryPage;
