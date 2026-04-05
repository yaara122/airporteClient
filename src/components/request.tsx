import classes from "./Request.module.css";
import btnClasses from "./UI/Button.module.css";
import RequestContext from "../store/RequestsProvider";
import requestItem from "../models/request";
import { useContext, useRef, useState } from "react";
import Button from "./UI/Button";

const Request: React.FC<{
  request: requestItem;
  showBtnsOptions?: boolean;
  resetOpenRequest?: () => void;
}> = (props) => {
  const requestCtx = useContext(RequestContext);
  const [showDeclinceInput, setShowDeclinceInput] = useState<boolean>(false);
  const [isDeclinceEmpty, setIsDeclinceEmpty] = useState<boolean>(false);
  const declinceRef = useRef<HTMLInputElement | null>(null);

  const submitStatusChangeHandler = (event: any) => {
    let updateRequestData;
    if (event.target.innerText === "אישור") {
      updateRequestData = {
        requestId: props.request.id,
        status: "אושרה",
      };
    } else if (event.target.innerText === "שליחה") {
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
    if (props.resetOpenRequest) {
      props.resetOpenRequest();
    }
  };

  return (
    <div className={classes.request}>
      <h2>{props.request.title}</h2>
      <p>
        <span>סוג בקשה: </span>
        {props.request.type}
      </p>
      <p>
        <span>תיאור: </span> {props.request.description}
      </p>
      <p>
        <span>סטטוס הבקשה: </span>{" "}
        <span
          className={`${props.request.status === "אושרה" ? classes.approved : ""} ${props.request.status === "סורבה" ? classes.refused : ""}`}
        >
          {props.request.status}
        </span>
      </p>
      {!window.location.href.endsWith("userData") && (
        <p>
          <span>יוצר הבקשה: </span> {props.request.creatorName}
        </p>
      )}

      {props.request.examinerName && (
        <p>
          <span>בוחן הבקשה: </span>
          {props.request.examinerName}
        </p>
      )}
      {props.request.declineReason && (
        <p>
          <span>סיבת הדחייה: </span>
          {props.request.declineReason}
        </p>
      )}

      <p>
        <span>נוצר בתאריך:</span> {props.request.createdAt}
      </p>

      {showDeclinceInput && props.showBtnsOptions && (
        <div>
          <label htmlFor="declinceInput">סיבת הדחייה</label>
          <input id="declinceInput" type="text" ref={declinceRef} />
          <Button onClick={submitStatusChangeHandler}>שליחה</Button>
          {isDeclinceEmpty && <span>סיבת הדחייה לא יכולה להיות ריקה</span>}
        </div>
      )}

      {props.request.status === "בהמתנה" &&
        props.showBtnsOptions &&
        !showDeclinceInput && (
          <Button onClick={submitStatusChangeHandler}>אישור</Button>
        )}
      {props.request.status === "בהמתנה" &&
        props.showBtnsOptions &&
        !showDeclinceInput && (
          <Button
            onClick={() => {
              setShowDeclinceInput(true);
            }}
          >
            דחייה
          </Button>
        )}
    </div>
  );
};

export default Request;
