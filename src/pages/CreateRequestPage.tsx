import React, { useState } from "react";
import classes from "./forms.module.css";
import Card from "../components/UI/Card";
import AddRequestForm from "../components/AddRequestForm";

const REQUESTS_TYPES_DESCRIPTION = {
  אישור_כניסה: "אישור כניסה לבסיס עם רכב או באופן רגלי",
  השחרה: "העברת נתונים מרשת מסווגת לרשת פחות מסווגת",
  קידוד_חוגר: "קידוד החוגר לכניסה לבסיסים ו שימוש ברשתות מסוימות",
  חתימה_שוס:
    "חתימה על מסמכים בהם החותם מאשר כי הוא מודע לכך שאסור לו לחשוף אינפורמציה על דברים מסווגיום",
};

const CreateRequestPage: React.FC<{}> = () => {
  const [typeInput, setTypeInput] = useState<string>("השחרה");
  const [requestDescription, setRequestDescription] = useState<string>(
    REQUESTS_TYPES_DESCRIPTION.השחרה,
  );

  const HandelTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let currentEventValue: string = event.target.value;
    setTypeInput(currentEventValue);

    setRequestDescription(
      REQUESTS_TYPES_DESCRIPTION[
        currentEventValue as keyof typeof REQUESTS_TYPES_DESCRIPTION
      ],
    );
  };

  return (
    <Card classNames={classes.form}>
      <label htmlFor="email">בבקשה בחרו את סוג הבקשה - </label>
      <select name="type" onChange={HandelTypeChange} defaultValue={typeInput}>
        <option value="אישור_כניסה">אישור כניסה</option>
        <option value="השחרה">השחרה</option>
        <option value="קידוד_חוגר">קידוד חוגר</option>
        <option value="חתימה_שוס">חתימה על שו"ס</option>
      </select>
      <p>{requestDescription}</p>
      <AddRequestForm requestType={typeInput} />
    </Card>
  );
};
export default CreateRequestPage;
