import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { userLogin } from "../api/api";
import classes from "./forms.module.css";
import user from "../models/user";
import UserContext from "../store/userProvider";
import Card from "../components/UI/Card";
import Button from "../components/UI/Button";

const validationFormInitial: {
  nameIsValid: boolean;
  passwordIsValid: boolean;
} = { nameIsValid: true, passwordIsValid: true };

const LoginPage: React.FC<{}> = () => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const formRef = useRef<HTMLFormElement>(null);
  const userNameInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const [formValidation, setFormValidation] = useState<{
    nameIsValid: boolean;
    passwordIsValid: boolean;
  }>(validationFormInitial);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormValidation(validationFormInitial);

    if (userNameInput.current?.value.trim() === "") {
      setFormValidation((prevValidation) => {
        return { ...prevValidation, nameIsValid: false };
      });
    }
    if (passwordInput.current?.value.trim() === "") {
      setFormValidation((prevValidation) => {
        return { ...prevValidation, passwordIsValid: false };
      });
    }

    if (
      passwordInput.current?.value.trim() !== "" &&
      userNameInput.current?.value.trim() !== ""
    ) {
      const userData = {
        userName: userNameInput.current?.value,
        password: passwordInput.current?.value,
      };

      try {
        const { data } = await userLogin(userData);
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
          console.log("the response is not full");
          throw new Error();
        }
        userCtx.updateUserStatus(newUser);
        navigate("/createRequest");
      } catch (err) {
        // const error = err as AxiosError<{
        //   status: "error";
        //   statusCode: number;
        //   message: string;
        // }>;
        // console.log(error);
        // if (error.response) {
        //   console.error("API Error:", error.response.data.message);
        // }
        // //set error to error.response.data.message
        // console.error(error);
        alert("משהו השתבש")
      }
    }
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <Card classNames={classes.form}>
      <form onSubmit={submitHandler} ref={formRef}>
        <h1>התחברות</h1>
        <label htmlFor="userName">אנא הכניסו שם משתמש</label>
        <input name="userName" type="text" ref={userNameInput}></input>
        {!formValidation?.nameIsValid && <p  className={classes.input_error}>שם משתמש לא יכול להיות ריק</p>}
        <label htmlFor="email">אנא הכניסו סיסמה</label>
        <input name="email" type="text" ref={passwordInput}></input>
        {!formValidation?.passwordIsValid && <p  className={classes.input_error}>סיסמה לא יכולה להיות ריקה</p>}
        
        <Button type="submit">התחברות</Button>
      </form>
    </Card>
  );
};

export default LoginPage;
