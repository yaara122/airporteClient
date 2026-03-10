import classes from "./Request.module.css"
import requestItem from "../models/request";

const Request: React.FC<{request:requestItem}> = (props) => {
// depending on the user ctx and the url? show the  btn of approve and decline
    return (
        <div className={classes.request}>
            <h2>{props.request.title}</h2>
            <p><span>סוג בקשה: </span>{props.request.type}</p>
            <p><span>תיאור הבקשה: </span> {props.request.description}</p>
            <p><span>סטטוס הבקשה: </span> {props.request.status}</p>
            <p><span>יוצר הבקשה: </span> {props.request.creatorName}</p>
            <p><span>בוחן הבקשה (במידה וקיים): </span></p>
            <p><span>סיבת הדחייה (במידה וקיימת): </span></p>

            {/* <p>{props.request.examinedBy?.name}</p> */}

            {/* {props.request.status === "pending" && props.request.examinedBy === null && <button>Approve</button>}
            {props.request.status === "pending" && props.request.examinedBy === null && <button>Reject</button>} */}
        </div>
    );
}

export default Request;