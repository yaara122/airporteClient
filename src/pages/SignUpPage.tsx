import { useContext, useRef, useState } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { postUsers } from "../api/api";
import classes from "./forms.module.css";
import user from "../models/user";
import UserContext from "../store/userProvider";
import Card from "../components/UI/Card";
import Button from "../components/UI/Button";

const validationFormInitial: {
  nameIsValid: boolean;
  emailIsValid: boolean;
  passwordIsValid: boolean;
} = { nameIsValid: true, emailIsValid: true, passwordIsValid: true };

const SignUpPage: React.FC<{}> = () => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const formRef = useRef<HTMLFormElement>(null);
  const userNameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const [formValidation, setFormValidation] = useState<{
    nameIsValid: boolean;
    emailIsValid: boolean;
    passwordIsValid: boolean;
  }>(validationFormInitial);

  const submitHandler = async (event: React.FormEvent) => {
    setFormValidation(validationFormInitial);
    event.preventDefault();
    if (userNameInput.current?.value.trim() === "") {
      setFormValidation((prevValidation) => {
        return { ...prevValidation, nameIsValid: false };
      });
    }
    if (
      emailInput.current?.value.trim() === "" ||
      !emailInput.current?.value.includes("@")
    ) {
      setFormValidation((prevValidation) => {
        return { ...prevValidation, emailIsValid: false };
      });
    }
    if (passwordInput.current) {
      if (passwordInput.current.value.trim().length < 7) {
        setFormValidation((prevValidation) => {
          return { ...prevValidation, passwordIsValid: false };
        });
      }
    }
    if (
      !(
        emailInput.current?.value.trim() === "" ||
        !emailInput.current?.value.includes("@") ||
        userNameInput.current?.value.trim() === "" ||
        !passwordInput.current ||
        passwordInput.current.value.trim().length < 7
      )
    ) {
      const userInputData = {
        userName: userNameInput.current?.value,
        email: emailInput.current?.value,
        password: passwordInput.current?.value,
      };

      try {
        const { data } = await postUsers(userInputData);
        const newUser: user = {
          userName: data.user.userName,
          auth: data.token,
          role: data.user.role,
        };

        if (
          newUser.auth === undefined ||
          newUser.role === undefined ||
          newUser.userName === undefined
        ) {
          throw new Error("the response is not full");
        }
        userCtx.updateUserStatus(newUser);
        navigate("/createRequest");
      } catch (err) {
        const error = err as AxiosError<{ messagesArry: string[] }>;
        if (error.response && error.response.data) {
          let errorString: string = "\n";
          error.response.data.messagesArry.forEach((message) => {
            errorString += `${message} \n\n`;
          });
          alert(errorString);
        } else {
          alert("משהו השתבש");
        }
      }
    }
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <Card classNames={classes.form}>
      <form onSubmit={submitHandler} ref={formRef}>
        <h1>הרשמה</h1>
        <label htmlFor="userName">אנא הכניסו שם משתמש</label>
        <input name="userName" type="text" ref={userNameInput}></input>
        {!formValidation?.nameIsValid && (
          <p className={classes.input_error}>השם משתמש פסול </p>
        )}
        <label htmlFor="email">אנא הכניסו מייל</label>
        <input name="email" type="text" ref={emailInput}></input>
        {!formValidation?.emailIsValid && (
          <p className={classes.input_error}>המייל פסול</p>
        )}
        <label htmlFor="password">אנא הכניסו סיסמה</label>
        <input name="password" type="password" ref={passwordInput}></input>
        {!formValidation?.passwordIsValid && (
          <p className={classes.input_error}>הסימסה פסולה</p>
        )}

        <Button type="submit">שליחה</Button>
      </form>
    </Card>
  );
};

export default SignUpPage;
