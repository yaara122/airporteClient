import React, { useState } from "react";
import classes from "./forms.module.css"
import Card from "../components/UI/Card";
import AddRequestForm from "../components/AddRequestForm";

const REQUESTS_TYPES_DESCRIPTION = {
  passwordReset: "איפוס סיסמה עבור אנשים ששכחו את סיסמתם",
  hashcara: "העברת נתונים מרשת מסווגת לרשת פחות מסווגת",
  cardCoding: "קידוד החוגר לכניסה לבסיסים ו שימוש ברשתות מסוימות",
  confidentialityAgreement:
    "חתימה על מסמכים בהם החותם מאשר כי הוא מודע לכך שאסור לו לחשוף אינפורמציה על דברים מסווגיום",
};

const CreateRequestPage: React.FC<{}> = () => {
  const [typeInput, setTypeInput] = useState<string>("PasswordReset");
  const [requestDescription, setRequestDescription] = useState<string>(
    REQUESTS_TYPES_DESCRIPTION.passwordReset,
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
        <option value="passwordReset">איפוס סיסמה</option>
        <option value="hashcara">השחרה</option>
        <option value="cardCoding">קידוד חוגר</option>
        <option value="confidentialityAgreement">חתימה על שו"ס</option>
      </select>
      <p>{requestDescription}</p>
      <AddRequestForm requestType={typeInput} />
    </Card>
  );
};
export default CreateRequestPage;
