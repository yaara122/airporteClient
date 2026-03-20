import classes from "./Request.module.css";
import { setRequestStatus } from "../api/api";
import RequestContext from "../store/RequestsProvider";
import requestItem from "../models/request";
import { useContext, useRef, useState } from "react";
import Button from "./UI/Button";

const Request: React.FC<{ request: requestItem; showBtnsOptions?: boolean }> = (
  props,
) => {
  const requestCtx = useContext(RequestContext);
  const [showDeclinceInput, setShowDeclinceInput] = useState<boolean>(false);
  const [isDeclinceEmpty, setIsDeclinceEmpty] = useState<boolean>(false);
  const declinceRef = useRef<HTMLInputElement | null>(null);

  const submitStatusChangeHandler = (event: any) => {
    let updateRequestData;
    if (event.target.id === "approveBtn") {
      updateRequestData = {
        requestId: props.request.id,
        status: "אושרה",
      };
      // no need to reset the showDeclinceInput because the request should disappere after submitted
    } else {
      if (declinceRef.current?.value === "") {
        setIsDeclinceEmpty(true);
        return;
      } else {
        updateRequestData = {
          requestId: props.request.id,
          status: "סורבה",
          declineReason: declinceRef.current?.value,
        };
      }
    }
    requestCtx.updateRequest(updateRequestData);
  };

  return (
    <div className={classes.request}>
      <h2>{props.request.title}</h2>
      <p>
        <span>סוג בקשה: </span>
        {props.request.type}
      </p>
      <p>
        <span>תיאור הבקשה: </span> {props.request.description}
      </p>
      <p>
        <span>סטטוס הבקשה: </span> {props.request.status}
      </p>
      <p>
        <span>יוצר הבקשה: </span> {props.request.creatorName}
      </p>

      <p>
        <span>תאריך יצירת הבקשה </span> {props.request.createdAt}
      </p>

      {props.request.examinerName && (
        <p>
          <span>בוחן הבקשה</span>
          {props.request.examinerName}
        </p>
      )}
      {props.request.declineReason && (
        <p>
          <span>סיבת הדחייה: </span>
          {props.request.declineReason}
        </p>
      )}

      {props.request.status === "בהמתנה" && props.showBtnsOptions && (
        <button id="approveBtn" onClick={submitStatusChangeHandler}>
          Approve
        </button>
      )}
      {props.request.status === "בהמתנה" && props.showBtnsOptions && (
        <button
          onClick={() => {
            setShowDeclinceInput(true);
          }}
        >
          Reject
        </button>
      )}
      {showDeclinceInput && props.showBtnsOptions && (
        <div>
          <label htmlFor="declinceInput">סיבת הדחייה</label>
          <input id="declinceInput" type="text" ref={declinceRef} />
          <Button onClick={submitStatusChangeHandler}>שליחה</Button>
          {isDeclinceEmpty && <p>סיבת הדחייה לא יכולה להיות ריקה</p>}
        </div>
      )}
    </div>
  );
};

export default Request;
