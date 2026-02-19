import { useRef, useState } from "react";
import { postUsers } from "../api/api";
import classes from "./forms.module.css";
import Card from "../components/UI/Card";

const validationFormInitial: {
  nameIsValid: boolean;
  emailIsValid: boolean;
  passwordIsValid: boolean;
} = { nameIsValid: true, emailIsValid: true, passwordIsValid: true };

const SignUpPage: React.FC<{}> = () => {
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

    setFormValidation(validationFormInitial)
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
      formValidation.emailIsValid &&
      formValidation.nameIsValid &&
      formValidation.passwordIsValid
      && userNameInput.current?.value.trim() !== ""
    ) {
      const data = {
        userName: userNameInput.current?.value,
        email: emailInput.current?.value,
        password: passwordInput.current?.value,
      };

      const serverrespones = await postUsers(data);
      console.log(serverrespones);
      if (formRef.current) {
        formRef.current.reset();
        // setFormValidation(validationFormInitial);
      }      
      //navigate to users requests page
    }

  };

  return (
    <Card classNames={classes.form}>
      <form onSubmit={submitHandler} ref={formRef}>
        <h1>Sign Up</h1>
        <label htmlFor="userName">Please enter a user name</label>
        <input name="userName" type="text" ref={userNameInput}></input>
        {!formValidation?.nameIsValid && <p>userName is invalid</p>}
        <label htmlFor="email">Please enter your email</label>
        <input name="email" type="text" ref={emailInput}></input>
        {!formValidation?.emailIsValid && <p>email is invalid</p>}
        <label htmlFor="password">Please enter a password</label>
        <input name="password" type="text" ref={passwordInput}></input>
        {!formValidation?.passwordIsValid && <p>password is invalid</p>}

        <button type="submit">submit</button>
      </form>
    </Card>
  );
};

export default SignUpPage;
