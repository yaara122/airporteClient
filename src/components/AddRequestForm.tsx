import { useContext, useRef, useState, Fragment } from "react";
import UserContext from "../store/userProvider";
import RequestContext from "../store/RequestsProvider";
import classes from "../pages/forms.module.css";
import Button from "./UI/Button";
import requestItem from "../models/request";

const AddRequestForm: React.FC<{ requestType: string }> = (props) => {
  const userCtx = useContext(UserContext);
  const requestCtx = useContext(RequestContext);
  const formRef = useRef<HTMLFormElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);
  const [formValidation, setFormValidation] = useState<{
    titleIsValid: boolean;
    descriptionIsValid: boolean;
  }>({ titleIsValid: true, descriptionIsValid: true });

  if (formRef.current) {
    formRef.current.reset();
  }

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (titleInputRef.current?.value === "") {
      setFormValidation((prevValidation) => {
        return {
          ...prevValidation,
          titleIsValid: false,
        };
      });
    }
    if (descriptionInputRef.current?.value === "") {
      setFormValidation((prevValidation) => {
        return {
          ...prevValidation,
          descriptionIsValid: false,
        };
      });
    }

    if (
      descriptionInputRef.current?.value === "" ||
      titleInputRef.current?.value === "" ||
      !userCtx.user
    ) {
      return;
    }

    const data: requestItem = {
      title: titleInputRef.current?.value || "",
      type: props.requestType,
      description: descriptionInputRef.current?.value || "",
    };
    requestCtx.addRequest(data);

    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <Fragment>
      <form onSubmit={submitHandler} ref={formRef} className={classes.form}>
        <h1>{props.requestType}</h1>
        <label htmlFor="title">אנא הכניסו כותרת לבקשה</label>
        <input name="title" type="text" ref={titleInputRef}></input>
        {!formValidation?.titleIsValid && <p  className={classes.input_error}>הכותרת לא יכולה להיות ריקה</p>}

        <label htmlFor="ddescriptions">אנא הכניסו פירוט בנוגע לבקשה</label>
        <input name="description" type="text" ref={descriptionInputRef}></input>
        {!formValidation?.descriptionIsValid && (
          <p className={classes.input_error}>התיאור לא יכול להיות ריק</p>
        )}

        <Button type="submit">שלח</Button>
      </form>
    </Fragment>
  );
};

export default AddRequestForm;
