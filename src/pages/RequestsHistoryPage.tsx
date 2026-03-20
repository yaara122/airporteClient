import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Request from "../components/Request";
import requestItem from "../models/request";
import Button from "../components/UI/Button";
import UserContext from "../store/userProvider";
import { getAllRequests } from "../api/api";
import RequestContext from "../store/RequestsProvider";

const AMOUNT_OF_REQUEST_PER_FETCH = 3;

const RequestsHistoryPage: React.FC<{}> = () => {
  const userCtx = useContext(UserContext);
  const requestCtx = useContext(RequestContext);
  const [requestsHistory, setRequestsHistory] = useState<requestItem[]>([]);
  const [fetcheAmount, setFetchedAmount] = useState<number>(0);
  const [useDatesRange, setUseDatesRange] = useState<boolean>(false);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  // console.log(requestsHistory);
  // console.log(fetcheAmount);

  const fetchMoreRequests1 = async (fetchedAmountParam: number) => {

  }

  const fetchMoreRequests0 = async () => {
    return fetchMoreRequests1(fetcheAmount)

  }

  const fetchMoreRequests = async () => {
    console.log("in fetch");

    // let startDate = startDateRef.current?.value;
    // let endDate = endDateRef.current?.value;

    // if (useDatesRange) {
    // console.log("setting range");
    //   startDate = startDateRef.current?.value;
    //   endDate = endDateRef.current?.value;
    // }

    // console.log("the fetched amount is :");
    // console.log(fetcheAmount);

    // console.log("start date is");
    // console.log(startDate);
    // console.log("end date is");
    // console.log(endDate);

    console.log(endDateRef.current?.value);
    console.log(endDateRef.current?.value);

    console.log("BB in fetchMoreRequests, fetcheAmount = " + fetcheAmount);
    let data = {
      limit: AMOUNT_OF_REQUEST_PER_FETCH,
      skip: fetcheAmount * AMOUNT_OF_REQUEST_PER_FETCH,
      startSerchDate: startDateRef.current?.value,
      endSerchDate: endDateRef.current?.value,
    };

    console.log(data);

    let requestsList: requestItem[] | undefined =
      await requestCtx.generalGetRequests(data);
    if (requestsList) {
      setRequestsHistory((prevHistory: requestItem[]) => {
        return [...prevHistory, ...(requestsList ?? [])];
      });
      setFetchedAmount((prevAmount: number) => {
        return prevAmount + 1;
      });
    }
    // create an else that if its empty there are no more requests to fetch and remove the btn
  };

  const fetchByRange = () => {
    console.log("in func fetch range");

    if (startDateRef.current?.value || endDateRef.current?.value) {
      setRequestsHistory([]);
      // // not resetting before moving to the fetch func
      console.log("Current fetchedamount before setting zero:" + fetcheAmount);
      setFetchedAmount(0);
      console.log(
        "AA in fetchBy range, setting fetchedAmount to zero " + fetcheAmount,
      );

      console.log("therre is a value in at least one calander");
      if (
        startDateRef.current?.value &&
        new Date(startDateRef.current?.value) > new Date()
      ) {
        console.log("error start date canot be greater than today");
        //error start date canot be greater than today
        return;
      }
      if (startDateRef.current?.value && endDateRef.current?.value) {
        // console.log(typeof startDateRef.current?.value)
        // console.log(startDateRef.current?.value)
        if (
          new Date(endDateRef.current?.value) <
          new Date(startDateRef.current?.value)
        ) {
          console.log("error start date cannot be grater then end date");
          // error start date cannot be grater then end date
          // allow it to be equles
          return;
        }
      }
    }
    console.log("sending request");
    console.log(startDateRef.current?.value);
    console.log(endDateRef.current?.value);

    // setUseDatesRange(true);

    fetchMoreRequests();
  };

  useEffect(() => {
    setRequestsHistory([]);
    if (userCtx.user?.role === "admin") {
      console.log("in usestate fetching");
      fetchMoreRequests();
    }
  }, [userCtx.user]);

  return (
    <Fragment>
      {requestsHistory && (
        <div>
          <h1>היסטוריית בקשות</h1>
          {/* validate max date is not after today and that the min is not greater then the max and the opposite */}
          <label htmlFor="startDate">תאריך התחלת חיפוש</label>
          <input id="startDate" type="date" ref={startDateRef} />
          <label htmlFor="endDate">תאריך מקסימלי לחיפוש</label>
          <input id="endDate" type="date" ref={endDateRef} />
          <Button onClick={fetchByRange}>חיפוש בטווח</Button>
          {/*!Error && <p>start date cannot be grater than end date</p> */}
          <ul>
            {requestsHistory.map((request) => (
              <Request request={request} />
              // add key for each request
            ))}
          </ul>
          <Button onClick={fetchMoreRequests}>טען עוד</Button>
        </div>
      )}
      {!requestsHistory && <h1>הבקשות ריקות כרגע</h1>}
    </Fragment>
  );
};

export default RequestsHistoryPage;
